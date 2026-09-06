(() => {
  'use strict';
  const DATA = window.SUGAR_PROMPT_DATA;
  if (!DATA) throw new Error('ไม่พบข้อมูล prompt-options.js');

  const STORAGE_KEY = 'sugarPromptBuilderStateV1';
  const PRESET_KEY = 'sugarPromptBuilderPresetsV1';
  const LARGE_TEXT_KEY = 'sugarPromptBuilderLargeTextV1';
  const HISTORY_KEY = 'sugarPromptBuilderHistoryV1';
  const MAX_HISTORY = 15;
  const MAX_UNDO = 50;
  function createDefaultState() {
    return { subject: '', action: '', customDetails: '', subjectTh: '', actionTh: '', customDetailsTh: '', customNegative: '', customNegativeTh: '', selections: {}, selectionOrder: [], openSections: {} };
  }
  const safeParse = (value, fallback) => { try { return JSON.parse(value) ?? fallback; } catch { return fallback; } };
  const restoredState = safeParse(localStorage.getItem(STORAGE_KEY), {});
  let state = { ...createDefaultState(), ...restoredState };
  const containsThai = value => /[ก-๙]/.test(String(value || ''));
  function moveHiddenPromptFieldsToVisibleFields() {
    [['subject','subjectTh'],['action','actionTh'],['customDetails','customDetailsTh']].forEach(([hiddenKey, visibleKey]) => {
      if (!state[visibleKey] && state[hiddenKey]) state[visibleKey] = state[hiddenKey];
      state[hiddenKey] = '';
    });
  }
  moveHiddenPromptFieldsToVisibleFields();
  if (!state.customNegativeTh && containsThai(state.customNegative)) {
    state.customNegativeTh = state.customNegative;
    state.customNegative = '';
  }
  // Keep older/corrupted saved state from breaking option clicks and the preview.
  if (!state.selections || typeof state.selections !== 'object' || Array.isArray(state.selections)) state.selections = {};
  // Older saves did not have selectionOrder. Object key order is the closest
  // available record of the order in which their categories were first used.
  if (!Array.isArray(restoredState.selectionOrder)) state.selectionOrder = Object.keys(state.selections);
  let presets = safeParse(localStorage.getItem(PRESET_KEY), {});
  let promptHistory = safeParse(localStorage.getItem(HISTORY_KEY), []);
  if (!Array.isArray(promptHistory)) promptHistory = [];
  let undoStack = [];
  let redoStack = [];
  let saveTimer;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const normalize = (value = '') => String(value).toLocaleLowerCase('th').normalize('NFKC').trim();
  const categoryMap = new Map(DATA.categories.map(category => [category.id, category]));
  const positiveCategoryIds = DATA.categories.filter(category => category.section !== 'negative').map(category => category.id);
  const selectionIds = categoryId => Array.isArray(state.selections[categoryId]) ? state.selections[categoryId] : [];
  const selectionOptions = categoryId => {
    const category = categoryMap.get(categoryId);
    if (!category) return [];
    const optionsById = new Map(category.options.map(option => [option.id, option]));
    return selectionIds(categoryId).map(id => optionsById.get(id)).filter(option => option && !option.isEmptyChoice);
  };
  function normalizeSelectionsToSingle() {
    Object.keys(state.selections).forEach(categoryId => {
      state.selections[categoryId] = selectionIds(categoryId).slice(0, 1);
    });
  }
  function reconcileSelectionOrder(preferredOrder = state.selectionOrder) {
    const ordered = [];
    [...preferredOrder, ...positiveCategoryIds].forEach(id => {
      if (positiveCategoryIds.includes(id) && selectionOptions(id).length && !ordered.includes(id)) ordered.push(id);
    });
    state.selectionOrder = ordered;
  }
  function syncCategorySelectionOrder(categoryId) {
    if (!positiveCategoryIds.includes(categoryId)) return;
    const hasSelection = selectionOptions(categoryId).length > 0;
    if (hasSelection && !state.selectionOrder.includes(categoryId)) state.selectionOrder.push(categoryId);
    if (!hasSelection) state.selectionOrder = state.selectionOrder.filter(id => id !== categoryId);
  }
  function clearCategorySelection(categoryId) {
    state.selections[categoryId] = [];
    syncCategorySelectionOrder(categoryId);
  }
  function stateSnapshot() {
    return { subject: state.subject || '', action: state.action || '', customDetails: state.customDetails || '', subjectTh: state.subjectTh || '', actionTh: state.actionTh || '', customDetailsTh: state.customDetailsTh || '', customNegative: state.customNegative || '', customNegativeTh: state.customNegativeTh || '', selections: structuredClone(state.selections), selectionOrder: [...state.selectionOrder] };
  }
  function snapshotSignature(value) { return JSON.stringify(value); }
  function recordUndoCheckpoint() {
    const current = stateSnapshot();
    if (undoStack.at(-1) && snapshotSignature(undoStack.at(-1)) === snapshotSignature(current)) return;
    undoStack.push(current);
    if (undoStack.length > MAX_UNDO) undoStack.shift();
    redoStack = [];
    updateUndoButtons();
  }
  normalizeSelectionsToSingle();
  reconcileSelectionOrder();
  const searchable = option => normalize([option.term, option.thaiTranslation, option.thaiExplanation, option.usageNote, ...(option.notes || [])].join(' '));
  const promptLearningGuide = {
    style: { level: 'ขั้นที่ 2 · เลือกสไตล์', kind: 'essential', note: 'เริ่มจากเลือกสไตล์ภาพหลักเพียง 1 แบบ เช่น ภาพถ่าย ภาพยนตร์ หรือภาพวาด หากยังไม่แน่ใจให้เลือกเฉพาะ STYLE แล้วข้ามสไตล์เสริมได้' },
    composition: { level: 'ขั้นที่ 3 · จัดองค์ประกอบ', kind: 'visual', note: 'เลือกวิธีจัดวางตัวแบบในภาพ 1 แบบ เพื่อช่วยกำหนดว่าผู้ชมจะมองเห็นอะไรเป็นอันดับแรก' },
    environment: { level: 'ขั้นที่ 4 · กำหนดฉาก', kind: 'visual', note: 'เลือกสถานที่และช่วงเวลาที่เข้ากับเรื่อง ไม่จำเป็นต้องใส่รายละเอียดทุกชนิด หากเขียนฉากไว้ในหัวข้อหลักแล้วสามารถข้ามได้' },
    color: { level: 'ขั้นที่ 5 · เลือกโทนสี', kind: 'visual', note: 'เลือกโทนสีหลัก 1 แบบให้ภาพดูเป็นชุดเดียวกัน เช่น อบอุ่น เย็น พาสเทล หรือสีสด' },
    lighting: { level: 'ขั้นที่ 6 · วางแสง', kind: 'visual', note: 'เลือกแสงหลักที่ช่วยให้อารมณ์และรูปทรงชัดขึ้น ผู้เริ่มต้นใช้แสงธรรมชาติหรือแสงนุ่มได้ง่ายที่สุด' },
    camera: { level: 'ขั้นที่ 7 · กล้องและเลนส์', kind: 'advanced', note: 'ใช้เมื่อต้องการควบคุมมุมมองแบบงานถ่ายภาพ หากยังไม่รู้เรื่องเลนส์ให้เลือกเพียงระยะภาพหรือข้ามขั้นนี้ได้' },
    focus: { level: 'ขั้นที่ 8 · ระยะชัด', kind: 'advanced', note: 'เลือกจุดที่ต้องการให้คมชัดและระดับความเบลอของฉากหลัง หากภาพทั่วไปยังไม่จำเป็นต้องกำหนดก็ข้ามได้' },
    mood: { level: 'ขั้นที่ 9 · อารมณ์ภาพ', kind: 'performance', note: 'เลือกความรู้สึกหลักเพียง 1 แบบ เช่น สงบ ลึกลับ โรแมนติก หรือดราม่า เพื่อให้ทุกองค์ประกอบไปในทิศทางเดียวกัน' },
    details: { level: 'ขั้นที่ 10 · เก็บรายละเอียด', kind: 'advanced', note: 'ใช้เพิ่มความละเอียดหรือข้อควบคุมเฉพาะเมื่อจำเป็น อย่าเลือกเพราะอยากให้ Prompt ยาว เพราะคำที่มากเกินไปอาจทำให้ผลลัพธ์สับสน' },
    output: { level: 'ขั้นที่ 11 · เลือกการใช้งาน', kind: 'essential', note: 'ทำเป็นขั้นสุดท้าย เลือกประเภทงานและอัตราส่วนภาพให้ตรงกับปลายทาง เช่น 9:16 สำหรับวิดีโอแนวตั้ง หรือ 1:1 สำหรับโพสต์สี่เหลี่ยม' }
  };

  function saveState() {
    $('#saveStatus').textContent = 'กำลังบันทึก…';
    $('#saveStatus').classList.add('saving');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#saveStatus').textContent = 'บันทึกอัตโนมัติแล้ว';
      $('#saveStatus').classList.remove('saving');
    }, 180);
  }

  function saveStateImmediately() {
    clearTimeout(saveTimer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#saveStatus').textContent = 'บันทึกอัตโนมัติแล้ว';
    $('#saveStatus').classList.remove('saving');
  }

  function optionDescription(option) {
    return [option.thaiTranslation, option.thaiExplanation, option.usageNote && `ใช้เมื่อ: ${option.usageNote}`, ...(option.notes || [])].filter(Boolean).join(' · ');
  }

  function optionThaiTitle(option) {
    if (option.isEmptyChoice) return 'ไม่กำหนด';
    // Keep established style, technique, brand, artist, and proper names intact.
    // A Thai explanation is supporting copy, not a replacement name.
    return option.thaiTranslation || option.term || 'ไม่ระบุ';
  }

  function optionThaiDetail(option) {
    const title = optionThaiTitle(option);
    return [option.thaiExplanation && option.thaiExplanation !== title ? option.thaiExplanation : '', option.usageNote && `เหมาะสำหรับ: ${option.usageNote}`, ...(option.notes || [])].filter(Boolean).join(' · ');
  }

  function optionOriginalName(option) {
    const title = optionThaiTitle(option);
    return option.term && option.term !== title ? option.term : '';
  }

  function optionThaiFinal(option) {
    const title = optionThaiTitle(option);
    const explanation = String(option.thaiExplanation || '').trim();
    return explanation && explanation !== title ? `${title} — ${explanation}` : title;
  }

  function createCategory(category) {
    const selected = selectionOptions(category.id);
    const isMulti = category.id === 'negative';
    const el = document.createElement('article');
    el.className = `category-card ${isMulti ? 'multi-category' : 'single-category'}`;
    el.dataset.category = category.id;
    el.innerHTML = `
      <div class="category-top">
        <div class="category-title"><strong>${escapeHtml(category.labelTh)} / ${escapeHtml(category.label)}</strong><small>${isMulti ? 'เลือกได้หลายรายการ' : 'เลือกได้ 1 รายการ'} และค้นหาได้ทั้งภาษาไทยหรืออังกฤษ</small></div>
      </div>
      <div class="select-control">
        <input class="category-search" type="search" placeholder="— เลือกหรือค้นหา ${escapeHtml(category.labelTh)} —" aria-label="เลือกหรือค้นหา ${escapeHtml(category.labelTh)}" autocomplete="off">
        <span class="select-hint">⌕</span>
        <div class="option-menu" role="listbox" aria-multiselectable="${isMulti}"></div>
      </div>
      <div class="tags"></div>
      <p class="selected-description"></p>`;
    renderCategorySelection(el, category, selected);
    const input = $('.category-search', el);
    input.addEventListener('focus', () => {
      $$('.select-control.open').forEach(control => control.classList.remove('open'));
      $$('.has-open-menu').forEach(item => item.classList.remove('has-open-menu'));
      $('.select-control', el).classList.add('open');
      el.classList.add('has-open-menu');
      el.closest('.accordion')?.classList.add('has-open-menu');
      renderOptionMenu(el, category, input.value);
    });
    input.addEventListener('input', () => renderOptionMenu(el, category, input.value));
    return el;
  }

  function renderOptionMenu(card, category, query = '') {
    const menu = $('.option-menu', card);
    const q = normalize(query);
    const matches = category.options.filter(option => !q || searchable(option).includes(q));
    menu.innerHTML = matches.length ? matches.map(option => {
      const selected = selectionIds(category.id).includes(option.id);
      return `<button class="option-item ${selected ? 'selected' : ''}" type="button" role="option" aria-selected="${selected}" data-option="${escapeHtml(option.id)}">
        <span><strong>${escapeHtml(optionThaiTitle(option))}</strong>${optionOriginalName(option) ? `<small class="option-english">${escapeHtml(optionOriginalName(option))}</small>` : ''}${optionThaiDetail(option) ? `<small class="option-explanation">${escapeHtml(optionThaiDetail(option))}</small>` : ''}</span>
      </button>`;
    }).join('') : '<p class="empty-state" style="padding:10px">ไม่พบคำที่ค้นหา</p>';
    $$('.option-item', menu).forEach(button => button.addEventListener('click', () => {
      selectOption(category.id, button.dataset.option);
      if (category.id !== 'negative') {
        $('.select-control', card).classList.remove('open');
        card.classList.remove('has-open-menu');
        card.closest('.accordion')?.classList.remove('has-open-menu');
      }
    }));
  }

  function selectOption(categoryId, optionId) {
    const category = categoryMap.get(categoryId);
    const option = category?.options.find(item => item.id === optionId);
    if (!category || !option) return;
    recordUndoCheckpoint();
    if (option.isEmptyChoice) clearCategorySelection(categoryId);
    else if (categoryId === 'negative') {
      const selected = new Set(selectionIds(categoryId));
      selected.has(optionId) ? selected.delete(optionId) : selected.add(optionId);
      state.selections[categoryId] = [...selected];
    } else state.selections[categoryId] = [optionId];
    syncCategorySelectionOrder(categoryId);
    // Update the final output first so every click is reflected immediately,
    // even if a later UI refresh encounters an unexpected rendering problem.
    updatePreview();
    refreshCategory(categoryId);
    updateAll();
  }

  function renderCategorySelection(card, category, selected) {
    $('.tags', card).innerHTML = selected.map(option => `<span class="tag"><span><b>${escapeHtml(optionThaiTitle(option))}</b>${optionOriginalName(option) ? `<small>${escapeHtml(optionOriginalName(option))}</small>` : ''}</span><button type="button" aria-label="ลบ ${escapeHtml(option.term)}" data-remove="${escapeHtml(option.id)}">×</button></span>`).join('');
    const searchInput = $('.category-search', card);
    if (searchInput) {
      const selectedNames = selected.map(optionThaiTitle).join(', ');
      searchInput.placeholder = selected.length
        ? selectedNames
        : `— เลือกหรือค้นหา ${category.labelTh} —`;
    }
    $$('[data-remove]', card).forEach(button => button.addEventListener('click', () => {
      recordUndoCheckpoint();
      if (category.id === 'negative') state.selections[category.id] = selectionIds(category.id).filter(id => id !== button.dataset.remove);
      else clearCategorySelection(category.id);
      syncCategorySelectionOrder(category.id);
      refreshCategory(category.id);
      updateAll();
    }));
    $('.selected-description', card).textContent = selected.length ? selected.map(option => `${optionThaiTitle(option)} / ${option.term}${optionThaiDetail(option) ? ` — ${optionThaiDetail(option)}` : ''}`).join('\n') : '';
  }

  function refreshCategory(categoryId) {
    const card = $(`[data-category="${categoryId}"]`);
    const category = categoryMap.get(categoryId);
    if (!card || !category) return;
    renderCategorySelection(card, category, selectionOptions(categoryId));
    if ($('.select-control', card).classList.contains('open')) renderOptionMenu(card, category, $('.category-search', card).value);
    refreshSectionCounts();
  }

  function renderSections() {
    const root = $('#sections');
    DATA.sections.forEach((section, index) => {
      if (section.id === 'negative') return;
      const categories = DATA.categories.filter(category => category.section === section.id);
      if (!categories.length) return;
      const el = document.createElement('section');
      const guide = promptLearningGuide[section.id];
      const open = state.openSections[section.id] ?? index < 2;
      el.className = `accordion builder-section ${guide ? `learning-${guide.kind}` : ''} ${open ? '' : 'collapsed'}`;
      el.dataset.section = section.id;
      el.innerHTML = `<button class="accordion-header builder-section-head" type="button" aria-expanded="${open}"><span>${String(index + 2).padStart(2,'0')}</span><div><h2>${escapeHtml(section.label)}</h2><p>${escapeHtml(section.labelTh)}</p>${guide ? `<small class="section-learning-level">${escapeHtml(guide.level)}</small>` : ''}</div><b>⌄</b></button><div class="accordion-body builder-section-body">${guide ? `<aside class="section-learning-note"><strong>คำแนะนำสำหรับผู้เรียน</strong><p>${escapeHtml(guide.note)}</p></aside>` : ''}<div class="category-grid"></div></div>`;
      categories.forEach(category => $('.category-grid', el).appendChild(createCategory(category)));
      root.appendChild(el);
    });
    $$('.accordion-header').forEach(button => button.addEventListener('click', () => {
      const accordion = button.closest('.accordion');
      accordion.classList.toggle('collapsed');
      const open = !accordion.classList.contains('collapsed');
      button.setAttribute('aria-expanded', String(open));
      state.openSections[accordion.dataset.section] = open;
      saveState();
    }));
  }

  function refreshSectionCounts() {
    let total = 0;
    $$('#sections .accordion').forEach(sectionEl => {
      const count = DATA.categories.filter(c => c.section === sectionEl.dataset.section).reduce((sum, c) => sum + selectionOptions(c.id).length, 0);
      total += count;
      const badge = $('.count-badge', sectionEl);
      if (badge) badge.textContent = count ? `เลือก ${count} รายการ` : 'ยังไม่เลือก';
    });
    total += selectionOptions('negative').length;
    $('#selectionSummary').textContent = '';
  }

  function promptText() {
    const lines = [];
    const subject = String(state.subjectTh || '').trim() || String(state.subject || '').trim();
    const action = String(state.actionTh || '').trim() || String(state.action || '').trim();
    const customDetails = String(state.customDetailsTh || '').trim() || String(state.customDetails || '').trim();
    if (subject) lines.push(`SUBJECT: ${subject}`);
    if (action) lines.push(`ACTION / MOVEMENT: ${action}`);
    if (customDetails) lines.push(`CUSTOM DETAILS: ${customDetails}`);
    reconcileSelectionOrder();
    state.selectionOrder.forEach(id => {
      const category = categoryMap.get(id);
      const terms = selectionOptions(id).map(option => option.term);
      if (category && terms.length) lines.push(`${category.label}: ${terms.join(', ')}`);
    });
    return lines.join('\n');
  }
  function negativeText() {
    return selectionOptions('negative').map(option => option.term).filter(Boolean).join(', ');
  }
  function thaiPromptText() {
    const lines = [];
    const subject = String(state.subjectTh || '').trim();
    const action = String(state.actionTh || '').trim();
    const customDetails = String(state.customDetailsTh || '').trim();
    if (subject) lines.push(`หัวข้อหลัก: ${subject}`);
    if (action) lines.push(`การกระทำและการเคลื่อนไหว: ${action}`);
    if (customDetails) lines.push(`รายละเอียดเพิ่มเติม: ${customDetails}`);
    reconcileSelectionOrder();
    state.selectionOrder.forEach(id => {
      const category = categoryMap.get(id);
      const terms = selectionOptions(id).map(optionThaiFinal);
      if (category && terms.length) lines.push(`${category.labelTh}: ${terms.join(', ')}`);
    });
    return lines.join('\n');
  }
  function thaiNegativeText() {
    return selectionOptions('negative').map(optionThaiFinal).filter(Boolean).join(', ');
  }
  function updatePreview() {
    const prompt = promptText();
    const negative = negativeText();
    const combined = [prompt, negative && `NEGATIVE PROMPT: ${negative}`].filter(Boolean).join('\n\n');
    $('#promptPreview').textContent = combined || 'เริ่มจากเขียน Subject หรือเลือกคำศัพท์จากคลัง';
    $('#promptPreview').classList.toggle('empty', !combined);
    $('#negativePreview').textContent = negative || 'ยังไม่ได้ระบุ';
    $('#negativePreview').classList.toggle('empty', !negative);
    const thaiPrompt = thaiPromptText();
    const thaiNegative = thaiNegativeText();
    const thaiCombined = [thaiPrompt, thaiNegative && `สิ่งที่ไม่ต้องการ: ${thaiNegative}`].filter(Boolean).join('\n\n');
    $('#thaiPromptPreview').textContent = thaiCombined || 'เริ่มจากเขียนหัวข้อหลักหรือเลือกคำศัพท์จากคลัง';
    $('#thaiPromptPreview').classList.toggle('empty', !thaiCombined);
    updatePromptLength(combined);
  }
  function updateAll() { updatePreview(); refreshSectionCounts(); saveState(); }

  function countWords(text) {
    if (!text.trim()) return 0;
    if (typeof Intl.Segmenter === 'function') return [...new Intl.Segmenter(['th', 'en'], { granularity: 'word' }).segment(text)].filter(item => item.isWordLike).length;
    return text.trim().split(/\s+/).length;
  }
  function updatePromptLength(text) {
    const characters = text.length;
    const words = countWords(text);
    $('#promptLength').innerHTML = `<strong>${characters.toLocaleString('th-TH')}</strong> ตัวอักษร · <strong>${words.toLocaleString('th-TH')}</strong> คำ`;
    const warning = $('#lengthWarning');
    warning.hidden = characters < 800;
    warning.classList.toggle('danger', characters >= 1200);
    warning.textContent = characters >= 1200 ? 'Prompt ยาวมาก อาจมีรายละเอียดซ้ำหรือลดความชัดเจนของผลลัพธ์' : characters >= 800 ? 'Prompt เริ่มยาว ลองตรวจคำหรือรายละเอียดที่ซ้ำกัน' : '';
  }

  function saveHistoryEntry() {
    const prompt = promptText(); const negative = negativeText();
    const output = [prompt, negative && `NEGATIVE PROMPT: ${negative}`].filter(Boolean).join('\n\n');
    if (!output) return;
    const entry = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, createdAt: new Date().toISOString(), output, state: stateSnapshot() };
    promptHistory = [entry, ...promptHistory.filter(item => item.output !== output)].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(promptHistory));
    window.AICreativeLab?.addRecent({ id: entry.id, name: output.split('\n')[0].replace(/^SUBJECT:\s*/, '').slice(0, 70) || 'Prompt ล่าสุด', type: 'Prompt', preview: output });
    renderHistory();
  }

  function renderGlobalResults(query) {
    const root = $('#globalResults');
    if (!root) return;
    const q = normalize(query);
    if (!q) { root.hidden = true; root.innerHTML = ''; return; }
    const matches = [];
    DATA.categories.forEach(category => category.options.forEach(option => {
      if (!option.isEmptyChoice && searchable(option).includes(q)) matches.push({ category, option });
    }));
    root.innerHTML = matches.length ? matches.slice(0, 80).map(({ category, option }) => `<button class="global-result" data-category-id="${category.id}" data-option-id="${option.id}"><span>${escapeHtml(category.labelTh)} / ${escapeHtml(category.label)}</span><strong>${escapeHtml(optionThaiTitle(option))}</strong><small>${optionOriginalName(option) ? `${escapeHtml(optionOriginalName(option))} · ` : ''}${escapeHtml(optionThaiDetail(option))}</small></button>`).join('') + (matches.length > 80 ? `<p class="empty-state" style="padding:10px">แสดง 80 จาก ${matches.length.toLocaleString('th-TH')} ผลลัพธ์ — พิมพ์เพิ่มเพื่อเจาะจง</p>` : '') : '<p class="empty-state" style="padding:14px">ไม่พบคำที่ค้นหา</p>';
    root.hidden = false;
    $$('.global-result', root).forEach(button => button.addEventListener('click', () => {
      selectOption(button.dataset.categoryId, button.dataset.optionId); root.hidden = true; const globalSearch = $('#globalSearch'); if (globalSearch) globalSearch.value = ''; showToast('เพิ่มลง Prompt แล้ว');
    }));
  }

  async function copyText(text, message) {
    if (!text) return showToast('ยังไม่มีข้อความให้คัดลอก');
    try { await navigator.clipboard.writeText(text); }
    catch { const area = document.createElement('textarea'); area.value = text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
    showToast(message);
  }
  function showToast(message) { $('#toast').textContent = message; clearTimeout(showToast.timer); showToast.timer = setTimeout(() => $('#toast').textContent = '', 1800); }

  function snapshot() { return stateSnapshot(); }
  function savePreset() {
    const input = $('#presetName'); const name = input.value.trim();
    if (!name) { input.focus(); return showToast('กรุณาตั้งชื่อ Preset'); }
    presets[name] = { ...snapshot(), updatedAt: new Date().toISOString() };
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets)); input.value = ''; renderPresets(); showToast('บันทึก Preset แล้ว');
  }
  function loadPreset(name) {
    const preset = presets[name]; if (!preset) return;
    recordUndoCheckpoint();
    const openSections = structuredClone(state.openSections || {});
    state = { ...createDefaultState(), openSections, ...structuredClone(preset) };
    if (!state.selections || typeof state.selections !== 'object' || Array.isArray(state.selections)) state.selections = {};
    moveHiddenPromptFieldsToVisibleFields();
    normalizeSelectionsToSingle();
    reconcileSelectionOrder(Array.isArray(state.selectionOrder) ? state.selectionOrder : []);
    hydrateInputs(); DATA.categories.forEach(c => refreshCategory(c.id)); updateAll(); showToast(`โหลด “${name}” แล้ว`);
  }
  function renamePreset(name) {
    const next = prompt('ชื่อใหม่', name)?.trim(); if (!next || next === name) return;
    presets[next] = { ...presets[name], updatedAt: new Date().toISOString() }; delete presets[name]; localStorage.setItem(PRESET_KEY, JSON.stringify(presets)); renderPresets();
  }
  function deletePreset(name) {
    if (!confirm(`ลบ Preset “${name}” หรือไม่?`)) return;
    delete presets[name]; localStorage.setItem(PRESET_KEY, JSON.stringify(presets)); renderPresets();
  }
  function renderPresets() {
    const entries = Object.entries(presets).sort((a,b) => String(b[1].updatedAt).localeCompare(String(a[1].updatedAt)));
    $('#presetCount').textContent = `${entries.length} รายการ`;
    $('#presetList').innerHTML = entries.length ? entries.map(([name, preset]) => `<div class="preset-item"><button class="preset-load" data-load="${escapeHtml(name)}"><strong>${escapeHtml(name)}</strong><small>${new Date(preset.updatedAt).toLocaleString('th-TH')}</small></button><button class="icon-button" data-rename="${escapeHtml(name)}" aria-label="เปลี่ยนชื่อ">✎</button><button class="icon-button" data-delete="${escapeHtml(name)}" aria-label="ลบ">×</button></div>`).join('') : '<p class="empty-state">Preset ที่บันทึกจะอยู่บนอุปกรณ์นี้</p>';
    $$('[data-load]').forEach(b => b.addEventListener('click', () => loadPreset(b.dataset.load)));
    $$('[data-rename]').forEach(b => b.addEventListener('click', () => renamePreset(b.dataset.rename)));
    $$('[data-delete]').forEach(b => b.addEventListener('click', () => deletePreset(b.dataset.delete)));
  }

  function hydrateInputs() {
    $('#subjectTh').value = state.subjectTh || ''; $('#actionTh').value = state.actionTh || ''; $('#customDetailsTh').value = state.customDetailsTh || '';
  }
  function restoreSnapshot(value, message) {
    const openSections = structuredClone(state.openSections || {});
    state = { ...createDefaultState(), openSections, ...structuredClone(value) };
    if (!state.selections || typeof state.selections !== 'object' || Array.isArray(state.selections)) state.selections = {};
    moveHiddenPromptFieldsToVisibleFields();
    normalizeSelectionsToSingle();
    reconcileSelectionOrder(Array.isArray(state.selectionOrder) ? state.selectionOrder : []);
    hydrateInputs(); DATA.categories.forEach(category => refreshCategory(category.id)); updateAll(); showToast(message);
  }
  function updateUndoButtons() {
    $('#undoButton').disabled = undoStack.length === 0;
    $('#redoButton').disabled = redoStack.length === 0;
  }
  function undo() {
    if (!undoStack.length) return;
    redoStack.push(stateSnapshot());
    restoreSnapshot(undoStack.pop(), 'ย้อนกลับแล้ว'); updateUndoButtons();
  }
  function redo() {
    if (!redoStack.length) return;
    undoStack.push(stateSnapshot());
    restoreSnapshot(redoStack.pop(), 'ทำซ้ำแล้ว'); updateUndoButtons();
  }
  function renderHistory() {
    $('#historyCount').textContent = `${promptHistory.length} รายการ`;
    $('#clearHistory').disabled = promptHistory.length === 0;
    $('#historyList').innerHTML = promptHistory.length ? promptHistory.map(item => `<div class="history-item"><button class="history-load" type="button" data-history-load="${escapeHtml(item.id)}"><strong>${escapeHtml(item.output.split('\n')[0].slice(0, 75))}</strong><small>${new Date(item.createdAt).toLocaleString('th-TH')}</small></button><button class="icon-button" type="button" data-history-delete="${escapeHtml(item.id)}" aria-label="ลบจากประวัติ">×</button></div>`).join('') : '<p class="empty-state">ประวัติจะปรากฏเมื่อเริ่มสร้าง Prompt</p>';
    $$('[data-history-load]').forEach(button => button.addEventListener('click', () => {
      const item = promptHistory.find(entry => entry.id === button.dataset.historyLoad); if (!item) return;
      recordUndoCheckpoint(); restoreSnapshot(item.state, 'โหลด Prompt จากประวัติแล้ว');
    }));
    $$('[data-history-delete]').forEach(button => button.addEventListener('click', () => {
      promptHistory = promptHistory.filter(item => item.id !== button.dataset.historyDelete);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(promptHistory)); renderHistory();
    }));
  }
  function clearAll() {
    recordUndoCheckpoint();
    const openSections = structuredClone(state.openSections || {});
    state = { ...createDefaultState(), openSections };
    hydrateInputs();
    const globalSearch = $('#globalSearch');
    if (globalSearch) { globalSearch.value = ''; renderGlobalResults(''); }
    $$('.category-search').forEach(input => { input.value = ''; });
    $$('.select-control.open').forEach(control => control.classList.remove('open'));
    $$('.has-open-menu').forEach(item => item.classList.remove('has-open-menu'));
    DATA.categories.forEach(category => refreshCategory(category.id));
    updatePreview();
    refreshSectionCounts();
    saveStateImmediately();
    showToast('ล้างค่าปัจจุบันแล้ว · กด Undo เพื่อย้อนกลับ');
  }

  function bindEvents() {
    $$('.prompt-static-toggle').forEach(button => button.addEventListener('click', () => {
      const section = button.closest('.builder-section');
      section.classList.toggle('collapsed');
      button.setAttribute('aria-expanded', String(!section.classList.contains('collapsed')));
    }));
    [['subjectTh','subjectTh'],['actionTh','actionTh'],['customDetailsTh','customDetailsTh']].forEach(([id,key]) => {
      const input = $(`#${id}`); let editing = false;
      input.addEventListener('input', event => { if (!editing) { recordUndoCheckpoint(); editing = true; } state[key] = event.target.value; updateAll(); });
      input.addEventListener('blur', () => { editing = false; });
    });
    const globalSearch = $('#globalSearch');
    if (globalSearch) globalSearch.addEventListener('input', event => renderGlobalResults(event.target.value));
    document.addEventListener('keydown', event => { if (globalSearch && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); globalSearch.focus(); } });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      $$('.select-control.open').forEach(el => el.classList.remove('open'));
      $$('.has-open-menu').forEach(item => item.classList.remove('has-open-menu'));
      const globalResults = $('#globalResults'); if (globalResults) globalResults.hidden = true;
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.select-control')) {
        $$('.select-control.open').forEach(el => el.classList.remove('open'));
        $$('.has-open-menu').forEach(item => item.classList.remove('has-open-menu'));
      }
      const globalResults = $('#globalResults'); if (globalResults && !event.target.closest('.search-panel')) globalResults.hidden = true;
    });
    $('#expandAll').addEventListener('click', () => setAllSections(true)); $('#collapseAll').addEventListener('click', () => setAllSections(false));
    $('#largeTextToggle').addEventListener('click', () => {
      const enabled = !document.body.classList.contains('large-text');
      document.body.classList.toggle('large-text', enabled);
      $('#largeTextToggle').setAttribute('aria-pressed', String(enabled));
      localStorage.setItem(LARGE_TEXT_KEY, JSON.stringify(enabled));
      showToast(enabled ? 'เปิดโหมดตัวอักษรใหญ่แล้ว' : 'กลับสู่ขนาดตัวอักษรปกติแล้ว');
    });
    $('#clearAll').addEventListener('click', clearAll); $('#clearAllThai').addEventListener('click', clearAll); $('#savePreset').addEventListener('click', savePreset); $('#presetName').addEventListener('keydown', e => { if (e.key === 'Enter') savePreset(); });
    $('#undoButton').addEventListener('click', undo); $('#redoButton').addEventListener('click', redo);
    document.addEventListener('keydown', event => {
      if (!(event.metaKey || event.ctrlKey) || event.target.matches('input, textarea')) return;
      if (event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); }
    });
    $('#clearHistory').addEventListener('click', () => {
      if (!promptHistory.length || !confirm(`ล้างประวัติ Prompt ทั้งหมด ${promptHistory.length} รายการหรือไม่?`)) return;
      promptHistory = []; localStorage.setItem(HISTORY_KEY, JSON.stringify(promptHistory)); renderHistory(); showToast('ล้างประวัติแล้ว');
    });
    $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
      const type = button.dataset.copy; const prompt = promptText(); const negative = negativeText();
      if (type === 'prompt' && prompt) { await copyText(prompt, 'Copied Prompt!'); saveHistoryEntry(); }
      if (type === 'negative') await copyText(negative, 'Copied Negative Prompt!');
      if (type === 'thai') {
        const thaiPrompt = thaiPromptText();
        if (thaiPrompt) await copyText(thaiPrompt, 'คัดลอกพรอมต์ภาษาไทยแล้ว');
        else await copyText(thaiPrompt, 'คัดลอกพรอมต์ภาษาไทยแล้ว');
      }
      if (type === 'all-th') {
        const thaiPrompt = thaiPromptText(); const thaiNegative = thaiNegativeText();
        const thaiCombined = [thaiPrompt, thaiNegative && `สิ่งที่ไม่ต้องการ: ${thaiNegative}`].filter(Boolean).join('\n\n');
        await copyText(thaiCombined, 'คัดลอก Final ภาษาไทยแล้ว');
      }
      if (type === 'all') {
        const combined = [prompt, negative && `NEGATIVE PROMPT: ${negative}`].filter(Boolean).join('\n\n');
        if (combined) { await copyText(combined, 'Copied All!'); saveHistoryEntry(); }
        else await copyText(combined, 'Copied All!');
      }
    }));
  }
  function setAllSections(open) {
    $$('.accordion').forEach(el => { el.classList.toggle('collapsed', !open); $('.accordion-header', el).setAttribute('aria-expanded', String(open)); state.openSections[el.dataset.section] = open; }); saveState();
  }

  const pendingParts = [localStorage.getItem('aiCreativeLabPendingCharacter'), localStorage.getItem('aiCreativeLabPendingScene')].filter(Boolean);
  if (pendingParts.length) {
    const existing = String(state.customDetailsTh || '').trim();
    state.customDetailsTh = [existing, ...pendingParts].filter(Boolean).join('\n\n');
    localStorage.removeItem('aiCreativeLabPendingCharacter');
    localStorage.removeItem('aiCreativeLabPendingScene');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  const requestedHistoryId = new URLSearchParams(location.search).get('load');
  if (requestedHistoryId) {
    const requestedHistory = promptHistory.find(item => item.id === requestedHistoryId);
    if (requestedHistory?.state) state = { ...createDefaultState(), ...structuredClone(requestedHistory.state) };
  }
  const largeTextEnabled = safeParse(localStorage.getItem(LARGE_TEXT_KEY), false) === true;
  document.body.classList.toggle('large-text', largeTextEnabled);
  $('#largeTextToggle').setAttribute('aria-pressed', String(largeTextEnabled));
  hydrateInputs(); renderSections();
  $('#negativeCategory').appendChild(createCategory(categoryMap.get('negative')));
  renderPresets(); renderHistory(); bindEvents(); updatePreview(); refreshSectionCounts(); updateUndoButtons();
})();

(() => {
  'use strict';
  const DATA = window.UNITY_HELPER;
  if (!DATA) throw new Error('ไม่พบข้อมูล unity-options.js');

  const lab = window.AICreativeLab;
  const STORAGE_KEY = 'unityAiHelperStateV2';
  const PRESET_KEY = 'unityAiHelperPresetsV1';
  const HISTORY_KEY = 'unityAiHelperHistoryV1';
  const MAX_HISTORY = 15;
  const VERSION = DATA.engineVersion;

  const defaultText = () => Object.fromEntries(DATA.textFields.map(field => [field.id, '']));
  const defaultValues = () => ({
    dimension: '3D first-person',
    genre: 'Survival horror',
    scope: 'Single mechanic, production-ready',
    sessionLength: '3–8 minute encounter',
    complexity: 'Intermediate modular components',
    renderPipeline: 'URP (Universal Render Pipeline) with Render Graph enabled',
    scriptingBackend: 'IL2CPP, .NET Standard 2.1 compatible C#',
    packages: ['com.unity.inputsystem (New Input System)', 'com.unity.render-pipelines.universal (URP)'],
    apiPolicy: 'Unity 6 modern APIs only; never use deprecated APIs',
    pattern: 'Finite State Machine (class-per-state)',
    messaging: 'Interface callbacks (IDamageable, IInteractable)',
    lifetime: 'Scene-local objects only',
    folders: 'Simple Assets/_Project/{Scripts,Art,Prefabs,ScriptableObjects}',
    namespaceStyle: 'Project.Feature.Type PascalCase; private fields _camelCase',
    inputSystem: 'New Input System: Input Action Asset + PlayerInput',
    devices: ['Keyboard and mouse'],
    inputMap: ['Move (Vector2)', 'Look (Vector2)', 'Interact (Button)'],
    mover: 'CharacterController.Move with gravity and slope limit',
    physicsQueries: ['SphereCast / CapsuleCast grounded check', 'LayerMask serialized in Inspector', 'CompareTag only, never tag == "Player" string compare'],
    cameraRig: 'Cinemachine 3 First Person PoV',
    animation: 'No animation; use debug primitives and logs',
    aiBrain: 'No AI in this request',
    combat: ['IInteractable prompt + hold to use'],
    uiSystem: 'uGUI Canvas + TextMeshPro',
    audio: ['No audio assets; expose AudioClip fields only'],
    data: ['Serialized inspector tuning, no magic numbers', 'ScriptableObject definitions for items/stats/enemies'],
    scenes: 'Single demo scene with named hierarchy',
    performance: ['Cache GetComponent; never in Update', 'No allocations in Update/FixedUpdate (no new, no LINQ, no string concat)', 'Logic in FixedUpdate for physics, input read in Update'],
    platform: ['Editor play-mode only for this task'],
    multiplayer: 'Single-player only',
    codeQuality: ['XML doc summaries on public types/methods', 'SerializeField private fields; no public gameplay fields', 'Null-safe references; Guard clauses', 'RequireComponent / DisallowMultipleComponent where needed', 'Editor gizmos for radii, FOV, ground check'],
    forbidden: ['FindObjectOfType / FindObjectsOfType (deprecated)', 'GameObject.Find or FindWithTag inside Update', 'OnGUI for gameplay HUD', 'BinaryFormatter / insecure serialization', 'Hardcoded KeyCode if New Input System is selected', 'Fake placeholder APIs that do not exist in Unity 6000.5.4f1'],
    deliverables: ['Complete C# scripts, copy-paste ready', 'Exact GameObject hierarchy and rename list', 'Inspector wiring table (field → drag target)', 'Input Actions asset setup steps', 'Layer / Tag / Physics matrix steps', 'Play Mode test checklist', 'Common mistakes and how to fix them']
  });

  const safeParse = (value, fallback) => { try { return JSON.parse(value) ?? fallback; } catch { return fallback; } };
  const state = {
    text: { ...defaultText(), ...(safeParse(localStorage.getItem(STORAGE_KEY), {}).text || {}) },
    values: { ...defaultValues(), ...(safeParse(localStorage.getItem(STORAGE_KEY), {}).values || {}) }
  };
  let presets = safeParse(localStorage.getItem(PRESET_KEY), {});
  let history = safeParse(localStorage.getItem(HISTORY_KEY), []);
  if (!Array.isArray(history)) history = [];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const fieldMap = new Map(DATA.sections.flatMap(section => section.fields.map(field => [field.id, field])));
  const optionThai = (fieldId, english) => {
    const pair = fieldMap.get(fieldId)?.options.find(([en]) => en === english);
    return pair ? pair[1] : english;
  };
  const list = id => {
    const value = state.values[id];
    return Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];
  };
  const joinEn = id => list(id).join('; ');
  const joinTh = id => list(id).map(value => optionThai(id, value)).join('; ');
  const text = id => String(state.text[id] || '').trim();

  function save() {
    const status = $('#saveStatus');
    if (status) {
      status.textContent = 'กำลังบันทึก…';
      status.classList.add('saving');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ text: state.text, values: state.values }));
    requestAnimationFrame(() => {
      if (!status) return;
      status.textContent = 'บันทึกอัตโนมัติแล้ว';
      status.classList.remove('saving');
    });
  }

  function alwaysOnEnglish() {
    return [
      `Engine lock: Unity ${VERSION} (${DATA.engineName}). Use only APIs, packages, and inspector workflows that exist in this version.`,
      'Modern API replacements: FindFirstObjectByType / FindAnyObjectByType / FindObjectsByType instead of FindObjectOfType; CompareTag instead of tag string equality; Time.deltaTime / Time.fixedDeltaTime correctly; Awaitable or Coroutine with a clear stop condition.',
      'Lifecycle: read input in Update, apply physics in FixedUpdate, camera follow in LateUpdate unless Cinemachine owns the camera.',
      'Inspector-first: every tunable value is [SerializeField] with a tooltip. No unexplained magic numbers.',
      'Hierarchy: name GameObjects clearly (Player, Systems, Level, UI). Prefer Prefabs for repeated actors.',
      'Safety: null checks after serialized refs, disable scripts if a required reference is missing, log a clear error once.',
      'Do not invent Unity APIs, package names, or menu paths. If something is uncertain, say so and use a supported alternative.'
    ];
  }

  function alwaysOnThai() {
    return [
      `ล็อกเอนจิน: Unity ${VERSION} (${DATA.engineName}) ใช้เฉพาะ API แพ็กเกจ และขั้นตอนในอินสเปกเตอร์ที่มีในเวอร์ชันนี้`,
      'แทน API เก่า: ใช้ FindFirstObjectByType / FindAnyObjectByType แทน FindObjectOfType ใช้ CompareTag แทนการเทียบสตริงแท็ก ใช้ Time.deltaTime ให้ถูกวงจร และ Awaitable หรือ Coroutine ที่หยุดได้',
      'วงจรชีวิต: อ่านอินพุตใน Update ใส่ฟิสิกส์ใน FixedUpdate ตามกล้องใน LateUpdate เว้นแต่ Cinemachine จัดการกล้อง',
      'จูนในอินสเปกเตอร์: ค่าที่ปรับได้ต้องเป็น [SerializeField] พร้อม Tooltip ห้ามเลขลอยโดยไม่มีคำอธิบาย',
      'ลำดับฮายเออร์อาร์คี: ตั้งชื่อ GameObject ให้ชัด ใช้พรีแฟบสำหรับตัวที่ซ้ำ',
      'ความปลอดภัย: ตรวจ null ของเรฟที่ลากมา ถ้าขาดของจำเป็นให้ปิดสคริปต์และล็อกผิดพลาดครั้งเดียว',
      'ห้ามสมมติ API ชื่อแพ็กเกจ หรือพาธเมนูที่ไม่มี ถ้าไม่แน่ใจให้บอกและใช้ทางเลือกที่รองรับ'
    ];
  }

  function numbered(lines) {
    return lines.filter(Boolean).map((line, index) => `${index + 1}. ${line}`).join('\n');
  }

  function generateEnglish() {
    const idea = text('idea');
    if (!idea) return '';
    const extra = [
      text('playerFantasy') && `Player fantasy / feel: ${text('playerFantasy')}`,
      text('stateFlow') && `State & trigger flow: ${text('stateFlow')}`,
      text('winLose') && `Success / fail conditions: ${text('winLose')}`,
      text('edgeCases') && `Edge cases that must work: ${text('edgeCases')}`
    ].filter(Boolean);

    const tech = [
      `Render pipeline: ${joinEn('renderPipeline')}.`,
      `Scripting backend: ${joinEn('scriptingBackend')}.`,
      joinEn('packages') && `Required packages (install via Package Manager if missing): ${joinEn('packages')}.`,
      `API policy: ${joinEn('apiPolicy')}.`,
      `Architecture: ${joinEn('pattern')}.`,
      `Cross-system messaging: ${joinEn('messaging')}.`,
      `Object lifetime: ${joinEn('lifetime')}.`,
      `Project structure: ${joinEn('folders')}.`,
      `Naming: ${joinEn('namespaceStyle')}.`,
      `Input: ${joinEn('inputSystem')}.`,
      joinEn('devices') && `Devices: ${joinEn('devices')}.`,
      joinEn('inputMap') && `Input Actions to create: ${joinEn('inputMap')}.`,
      `Locomotion: ${joinEn('mover')}.`,
      joinEn('physicsQueries') && `Physics / queries: ${joinEn('physicsQueries')}.`,
      `Camera: ${joinEn('cameraRig')}.`,
      `Animation: ${joinEn('animation')}.`,
      joinEn('animParams') && `Animator contract: ${joinEn('animParams')}.`,
      `AI: ${joinEn('aiBrain')}.`,
      joinEn('aiSensors') && `AI sensors: ${joinEn('aiSensors')}.`,
      joinEn('combat') && `Gameplay systems: ${joinEn('combat')}.`,
      `UI: ${joinEn('uiSystem')}.`,
      joinEn('hud') && `HUD: ${joinEn('hud')}.`,
      joinEn('audio') && `Audio: ${joinEn('audio')}.`,
      joinEn('feedback') && `Feedback / VFX: ${joinEn('feedback')}.`,
      joinEn('data') && `Data & save: ${joinEn('data')}.`,
      `Scenes: ${joinEn('scenes')}.`,
      joinEn('performance') && `Performance: ${joinEn('performance')}.`,
      joinEn('platform') && `Platforms: ${joinEn('platform')}.`,
      `Multiplayer: ${joinEn('multiplayer')}.`,
      joinEn('codeQuality') && `Code quality: ${joinEn('codeQuality')}.`,
      joinEn('forbidden') && `Forbidden: ${joinEn('forbidden')}.`,
      text('customConstraints') && `User constraints: ${text('customConstraints')}.`,
      ...alwaysOnEnglish()
    ];

    const output = [
      joinEn('deliverables') || 'Production-ready C# plus step-by-step Unity setup.',
      'Expand the short user idea into a complete mechanic: classes, fields, states, inspector values, and a playable test path.',
      'Each C# file must include: namespace, using list, XML summary, serialized fields with tooltips, Init/cache in Awake or OnEnable, and comments on non-obvious gameplay math.',
      'Setup must be a numbered Unity Editor checklist: create objects, add components in order, assign layers/tags, create Input Actions, wire Inspector fields, press Play, and expected result.',
      'If animation/audio assets are missing, still compile: use primitives, colored materials, Debug.Draw, and empty AudioClip slots.',
      'End with: how to test, likely setup mistakes, and what to tune in the Inspector first.'
    ];

    return [
      'Role:',
      `You are a senior Unity gameplay engineer and C# specialist for Unity ${VERSION} (${DATA.engineName}), 2D and 3D. You write production-ready, Inspector-friendly, allocation-aware C#. You also act as a prompt-complete implementer: turn a short designer idea into a full, buildable system.`,
      '',
      'Context & Goal:',
      `Unity version: ${VERSION}`,
      `Project paradigm: ${joinEn('dimension')}; genre: ${joinEn('genre')}.`,
      `Scope: ${joinEn('scope')}. Session: ${joinEn('sessionLength')}. Depth: ${joinEn('complexity')}.`,
      `User idea (expand this, do not ignore details): ${idea}`,
      extra.join('\n'),
      'Assume a new or clean feature slice unless the user said to integrate into existing scripts. Prefer small cohesive scripts over one god-object.',
      '',
      'Technical Requirements:',
      numbered(tech),
      '',
      'Output Format:',
      numbered(output)
    ].filter(line => line !== undefined).join('\n').replace(/\n{3,}/g, '\n\n');
  }

  function generateThai() {
    const idea = text('idea');
    if (!idea) return '';
    const extra = [
      text('playerFantasy') && `ความรู้สึกของผู้เล่น: ${text('playerFantasy')}`,
      text('stateFlow') && `ลำดับสถานะ: ${text('stateFlow')}`,
      text('winLose') && `สำเร็จ/ล้มเหลว: ${text('winLose')}`,
      text('edgeCases') && `เคสพิเศษ: ${text('edgeCases')}`
    ].filter(Boolean);
    const tech = [
      `ไปป์ไลน์เรนเดอร์: ${joinTh('renderPipeline')}`,
      `แบ็กเอนด์สคริปต์: ${joinTh('scriptingBackend')}`,
      joinEn('packages') && `แพ็กเกจที่ต้องมี: ${joinEn('packages')}`,
      `นโยบาย API: ${joinTh('apiPolicy')}`,
      `สถาปัตยกรรม: ${joinTh('pattern')}`,
      `การสื่อสาร: ${joinTh('messaging')}`,
      `อายุอ็อบเจ็กต์: ${joinTh('lifetime')}`,
      `โครงสร้างโปรเจกต์: ${joinTh('folders')}`,
      `การตั้งชื่อ: ${joinTh('namespaceStyle')}`,
      `อินพุต: ${joinTh('inputSystem')}`,
      joinEn('devices') && `อุปกรณ์: ${joinTh('devices')}`,
      joinEn('inputMap') && `แอ็กชันที่ต้องสร้าง: ${joinTh('inputMap')}`,
      `การเคลื่อนที่: ${joinTh('mover')}`,
      joinEn('physicsQueries') && `ฟิสิกส์/คิวรี: ${joinTh('physicsQueries')}`,
      `กล้อง: ${joinTh('cameraRig')}`,
      `อนิเมชัน: ${joinTh('animation')}`,
      joinEn('animParams') && `สัญญา Animator: ${joinTh('animParams')}`,
      `AI: ${joinTh('aiBrain')}`,
      joinEn('aiSensors') && `เซนเซอร์ AI: ${joinTh('aiSensors')}`,
      joinEn('combat') && `ระบบเกมเพลย์: ${joinTh('combat')}`,
      `UI: ${joinTh('uiSystem')}`,
      joinEn('hud') && `HUD: ${joinTh('hud')}`,
      joinEn('audio') && `เสียง: ${joinTh('audio')}`,
      joinEn('feedback') && `ฟีดแบ็ก: ${joinTh('feedback')}`,
      joinEn('data') && `ข้อมูลและการเซฟ: ${joinTh('data')}`,
      `ซีน: ${joinTh('scenes')}`,
      joinEn('performance') && `ประสิทธิภาพ: ${joinTh('performance')}`,
      joinEn('platform') && `แพลตฟอร์ม: ${joinTh('platform')}`,
      `มัลติเพลย์: ${joinTh('multiplayer')}`,
      joinEn('codeQuality') && `คุณภาพโค้ด: ${joinTh('codeQuality')}`,
      joinEn('forbidden') && `สิ่งที่ห้าม: ${joinTh('forbidden')}`,
      text('customConstraints') && `ข้อจำกัดจากผู้ใช้: ${text('customConstraints')}`,
      ...alwaysOnThai()
    ];
    const output = [
      joinTh('deliverables') || 'ส่งสคริปต์ C# พร้อมขั้นตอนติดตั้งใน Unity',
      'ขยายไอเดียสั้นให้เป็นระบบที่ประกอบในเอดิเตอร์ได้จริง',
      'แต่ละไฟล์ C# ต้องมีเนมสเปซ XML สรุป SerializeField พร้อม Tooltip แคชคอมโพเนนต์ และคอมเมนต์จุดคำนวณที่ไม่ชัด',
      'ขั้นตอนติดตั้งเป็นข้อๆ: สร้างอ็อบเจ็กต์ ใส่คอมโพเนนต์ ตั้งเลเยอร์/แท็ก สร้าง Input Actions ลากฟิลด์ กด Play และผลที่ควรเห็น',
      'ถ้ายังไม่มีอนิเมชันหรือเสียง ให้คอมไพล์ได้ด้วยรูปทรง กิซโม และช่อง AudioClip ว่าง',
      'จบด้วยวิธีทดสอบ ข้อผิดพลาดตอนติดตั้ง และค่าที่ควรจูนในอินสเปกเตอร์ก่อน'
    ];
    return [
      'บทบาท:',
      `คุณคือวิศวกรเกมเพลย์ Unity และผู้เชี่ยวชาญ C# สำหรับ Unity ${VERSION} (${DATA.engineName}) ทั้ง 2D และ 3D เขียนโค้ดพร้อมใช้งาน จูนในอินสเปกเตอร์ได้ และขยายไอเดียสั้นให้เป็นระบบที่ประกอบได้ทันที`,
      '',
      'บริบทและเป้าหมาย:',
      `เวอร์ชัน Unity: ${VERSION}`,
      `รูปแบบโปรเจกต์: ${joinTh('dimension')}; ประเภทเกม: ${joinTh('genre')}`,
      `ขอบเขต: ${joinTh('scope')} · เซสชัน: ${joinTh('sessionLength')} · ความลึก: ${joinTh('complexity')}`,
      `ไอเดียของผู้ใช้ (ต้องขยาย ไม่ทิ้งรายละเอียด): ${idea}`,
      extra.join('\n'),
      '',
      'ข้อกำหนดทางเทคนิค:',
      numbered(tech),
      '',
      'รูปแบบผลลัพธ์:',
      numbered(output)
    ].join('\n').replace(/\n{3,}/g, '\n\n');
  }

  function toast(message) {
    const el = $('#builderToast');
    if (!el) return;
    el.textContent = message;
    setTimeout(() => { if (el.textContent === message) el.textContent = ''; }, 2200);
  }

  function renderField(field) {
    const values = list(field.id);
    const bilingual = `${field.labelTh} / ${field.label}`;
    const explanation = field.help ? `<p class="field-explanation">${escapeHtml(field.help)}</p>` : '';
    const thaiOf = english => optionThai(field.id, english);
    if (field.multi) {
      const summary = values.length
        ? `<span class="option-th">เลือกแล้ว ${values.length} รายการ: ${escapeHtml(values.map(thaiOf).join(', '))}</span><small>${escapeHtml(values.join(', '))}</small>`
        : `<span class="option-th">— เลือก ${escapeHtml(field.labelTh)} —</span><small>เลือกได้หลายรายการ</small>`;
      return `<fieldset class="choice-field dropdown-choice-field"><legend>${escapeHtml(bilingual)}<small>เลือกได้หลายรายการ · ${field.options.length} ตัวเลือก</small></legend>${explanation}<details class="multi-dropdown"><summary>${summary}</summary><div class="multi-dropdown-menu">${field.options.map(([en, th]) => `<label><input type="checkbox" data-multi-field="${field.id}" value="${escapeHtml(en)}" ${values.includes(en) ? 'checked' : ''}><span><b>${escapeHtml(th)}</b><small>${escapeHtml(en)}</small></span></label>`).join('')}<button class="dropdown-done" type="button">เสร็จสิ้น <small>Done</small></button></div></details></fieldset>`;
    }
    const selected = values[0] || '';
    const summary = selected
      ? `<span class="option-th">${escapeHtml(thaiOf(selected))}</span><small>${escapeHtml(selected)}</small>`
      : `<span class="option-th">— เลือก ${escapeHtml(field.labelTh)} —</span><small>เลือก 1 รายการ</small>`;
    return `<fieldset class="choice-field dropdown-choice-field"><legend>${escapeHtml(bilingual)}<small>${field.options.length} ตัวเลือก</small></legend>${explanation}<details class="single-dropdown"><summary>${summary}</summary><div class="multi-dropdown-menu"><label><input type="radio" name="${field.id}" data-radio-field="${field.id}" value="" ${selected ? '' : 'checked'}><span><b>ไม่กำหนด</b><small>เว้นว่างถ้ายังไม่ต้องการล็อกข้อนี้</small></span></label>${field.options.map(([en, th]) => `<label><input type="radio" name="${field.id}" data-radio-field="${field.id}" value="${escapeHtml(en)}" ${selected === en ? 'checked' : ''}><span><b>${escapeHtml(th)}</b><small>${escapeHtml(en)}</small></span></label>`).join('')}</div></details></fieldset>`;
  }

  function renderSections() {
    const root = $('#builderSections');
    const ideaBlock = `<article class="builder-section learning-essential"><button class="builder-section-head" type="button" aria-expanded="true"><span>00</span><div><h2>ไอเดียสั้นๆ / Short Idea</h2><p>พิมพ์ความต้องการสั้นๆ ระบบจะขยายเป็น Prompt เต็มสำหรับ Unity ${VERSION}</p><small class="section-learning-level">เริ่มจากตรงนี้</small></div><b>⌄</b></button><div class="builder-section-body"><aside class="section-learning-note"><strong>ผู้ใช้ต้องพิมพ์ละเอียดแค่ไหน</strong><p>พิมพ์ประโยคเดียวก็ได้ เช่น “ไฟฉายชาร์จมือแล้วมอนได้ยินเสียง” จากนั้นเลือกประเภทเกม อินพุต ฟิสิกส์ และระบบที่เกี่ยวข้อง ยิ่งเลือกมาก Prompt ยิ่งล็อกสเปกให้ AI เขียนโค้ดตรงขึ้น ช่องว่างด้านล่างใช้เมื่อต้องการกำหนดความรู้สึก ลำดับสถานะ หรือเคสพิเศษ</p></aside>${DATA.textFields.map(field => `<label class="field">${escapeHtml(field.label)}<textarea id="text-${field.id}" rows="${field.rows}" placeholder="${escapeHtml(field.placeholder)}">${escapeHtml(state.text[field.id] || '')}</textarea></label>`).join('')}</div></article>`;
    root.innerHTML = ideaBlock + DATA.sections.map((section, index) => `<article class="builder-section ${section.kind ? `learning-${section.kind}` : ''} collapsed"><button class="builder-section-head" type="button" aria-expanded="false"><span>${section.n}</span><div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.subtitle)}</p>${section.level ? `<small class="section-learning-level">${escapeHtml(section.level)}</small>` : ''}</div><b>⌄</b></button><div class="builder-section-body">${section.note ? `<aside class="section-learning-note"><strong>คำแนะนำ</strong><p>${escapeHtml(section.note)}</p></aside>` : ''}${section.fields.map(renderField).join('')}</div></article>`).join('');
    bind();
    updatePreview();
  }

  function bind() {
    $$('.builder-section-head').forEach(button => button.addEventListener('click', () => {
      const card = button.closest('.builder-section');
      card.classList.toggle('collapsed');
      button.setAttribute('aria-expanded', String(!card.classList.contains('collapsed')));
    }));
    DATA.textFields.forEach(field => {
      $(`#text-${field.id}`)?.addEventListener('input', event => {
        state.text[field.id] = event.target.value;
        updatePreview();
      });
    });
    $$('[data-radio-field]').forEach(input => input.addEventListener('change', event => {
      const id = event.target.dataset.radioField;
      if (event.target.value) state.values[id] = event.target.value;
      else delete state.values[id];
      const dropdown = event.target.closest('.single-dropdown');
      dropdown.querySelector('summary').innerHTML = event.target.value
        ? `<span class="option-th">${escapeHtml(optionThai(id, event.target.value))}</span><small>${escapeHtml(event.target.value)}</small>`
        : '<span class="option-th" >ไม่กำหนด</span><small>Blank</small>';
      dropdown.removeAttribute('open');
      updatePreview();
    }));
    $$('[data-multi-field]').forEach(input => input.addEventListener('change', event => {
      const id = event.target.dataset.multiField;
      state.values[id] = $$(`[data-multi-field="${id}"]:checked`).map(item => item.value);
      const summary = event.target.closest('.multi-dropdown').querySelector('summary');
      const values = list(id);
      summary.innerHTML = values.length
        ? `<span class="option-th">เลือกแล้ว ${values.length} รายการ: ${escapeHtml(values.map(value => optionThai(id, value)).join(', '))}</span><small>${escapeHtml(values.join(', '))}</small>`
        : `<span class="option-th">— ยังไม่ได้เลือก —</span><small>No selection</small>`;
      updatePreview();
    }));
    $$('.dropdown-done').forEach(button => button.addEventListener('click', () => button.closest('details').removeAttribute('open')));
    $$('.single-dropdown > summary, .multi-dropdown > summary').forEach(summary => summary.addEventListener('click', () => {
      $$('.single-dropdown[open], .multi-dropdown[open]').forEach(dropdown => {
        if (dropdown !== summary.parentElement) dropdown.removeAttribute('open');
      });
    }));
  }

  function wordStats(value) {
    const chars = value.length;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    return { chars, words };
  }

  function updatePreview() {
    save();
    const english = generateEnglish();
    const thai = generateThai();
    const enOut = $('#promptOutput');
    const thOut = $('#thaiPromptOutput');
    if (english) {
      enOut.textContent = english;
      enOut.classList.remove('empty');
      thOut.textContent = thai;
      thOut.classList.remove('empty');
    } else {
      enOut.textContent = 'พิมพ์ไอเดียสั้นๆ ในขั้น 00 เพื่อสร้าง Prompt สำหรับ Unity 6000.5.4f1';
      enOut.classList.add('empty');
      thOut.textContent = 'เมื่อมีไอเดีย ระบบจะสร้างพรอมต์ภาษาไทยสำหรับตรวจสอบโครงสร้าง';
      thOut.classList.add('empty');
    }
    const stats = wordStats(english);
    const length = $('#promptLength');
    if (length) length.innerHTML = `<strong>${stats.chars}</strong> ตัวอักษร · <strong>${stats.words}</strong> คำ`;
    renderPresets();
    renderHistory();
  }

  async function copyText(value, okMessage) {
    if (!value) return toast('ยังไม่มีข้อความให้คัดลอก');
    try {
      await navigator.clipboard.writeText(value);
      pushHistory(value);
      toast(okMessage);
    } catch {
      toast('ไม่สามารถคัดลอกได้');
    }
  }

  function pushHistory(prompt) {
    const idea = text('idea') || 'Unity prompt';
    history = [{ id: Date.now(), name: idea.slice(0, 48), prompt, savedAt: new Date().toISOString() }, ...history.filter(item => item.prompt !== prompt)].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    lab?.addRecent({ type: 'Unity', id: String(Date.now()), name: idea.slice(0, 48) });
    renderHistory();
  }

  function renderPresets() {
    const listEl = $('#presetList');
    const count = $('#presetCount');
    const names = Object.keys(presets);
    if (count) count.textContent = `${names.length} รายการ`;
    if (!listEl) return;
    listEl.innerHTML = names.length
      ? names.map(name => `<div class="preset-item"><button class="preset-load" data-load="${escapeHtml(name)}"><strong>${escapeHtml(name)}</strong><small>โหลดชุดนี้</small></button><button class="icon-button" data-delete="${escapeHtml(name)}" type="button" aria-label="ลบ">✕</button></div>`).join('')
      : '<p class="empty-state">Preset ที่บันทึกจะอยู่บนอุปกรณ์นี้</p>';
    $$('[data-load]', listEl).forEach(button => button.addEventListener('click', () => {
      const pack = presets[button.dataset.load];
      if (!pack) return;
      state.text = { ...defaultText(), ...(pack.text || {}) };
      state.values = { ...defaultValues(), ...(pack.values || {}) };
      renderSections();
      toast('โหลด Preset แล้ว');
    }));
    $$('[data-delete]', listEl).forEach(button => button.addEventListener('click', () => {
      delete presets[button.dataset.delete];
      localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
      renderPresets();
    }));
  }

  function renderHistory() {
    const listEl = $('#historyList');
    const count = $('#historyCount');
    if (count) count.textContent = `${history.length} รายการ`;
    if (!listEl) return;
    listEl.innerHTML = history.length
      ? history.map(item => `<div class="preset-item"><button class="preset-load" data-history="${item.id}"><strong>${escapeHtml(item.name)}</strong><small>${new Date(item.savedAt).toLocaleString('th-TH')}</small></button></div>`).join('')
      : '<p class="empty-state">ประวัติจะปรากฏเมื่อคัดลอก Prompt</p>';
    $$('[data-history]', listEl).forEach(button => button.addEventListener('click', async () => {
      const item = history.find(entry => String(entry.id) === button.dataset.history);
      if (item?.prompt) await copyText(item.prompt, 'คัดลอกจากประวัติแล้ว');
    }));
  }

  $('#copyPrompt')?.addEventListener('click', () => copyText(generateEnglish(), 'คัดลอก Prompt ภาษาอังกฤษแล้ว'));
  $('#copyThaiPrompt')?.addEventListener('click', () => copyText(generateThai(), 'คัดลอกพรอมต์ภาษาไทยแล้ว'));
  $('#savePreset')?.addEventListener('click', () => {
    const name = ($('#presetName')?.value || '').trim();
    if (!name) return toast('ตั้งชื่อ Preset ก่อน');
    presets[name] = { text: structuredClone(state.text), values: structuredClone(state.values) };
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
    toast('บันทึก Preset แล้ว');
    renderPresets();
  });
  $('#resetBuilder')?.addEventListener('click', () => {
    if (!confirm('ล้างไอเดียและรีเซ็ตตัวเลือกเป็นค่าแนะนำสำหรับ Unity 6000.5.4f1 หรือไม่?')) return;
    state.text = defaultText();
    state.values = defaultValues();
    renderSections();
  });
  $('#expandAll')?.addEventListener('click', () => {
    $$('.builder-section').forEach(card => {
      card.classList.remove('collapsed');
      card.querySelector('.builder-section-head')?.setAttribute('aria-expanded', 'true');
    });
  });
  $('#collapseAll')?.addEventListener('click', () => {
    $$('.builder-section').forEach((card, index) => {
      if (!index) return;
      card.classList.add('collapsed');
      card.querySelector('.builder-section-head')?.setAttribute('aria-expanded', 'false');
    });
  });
  $('#clearHistory')?.addEventListener('click', () => {
    history = [];
    localStorage.setItem(HISTORY_KEY, '[]');
    renderHistory();
  });

  renderSections();
})();

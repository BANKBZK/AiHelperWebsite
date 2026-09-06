(() => {
  'use strict';
  const config = {
    Prompt: { icon: '✨', label: 'PROMPT' }
  };
  const builtInPrompts = [{
    id: 'template-character-sheet-sugar',
    type: 'Prompt',
    name: 'Prompt สร้าง Character Sheet',
    isTemplate: true,
    image: 'assets/character-sheet-example.png',
    imageAlt: 'ตัวอย่าง Character Sheet ของ BANKBZK แสดงเครื่องแต่งกายสี่มุมและภาพใบหน้าด้านขวา',
    prompt: `สร้าง Character Sheet จากภาพอ้างอิงที่แนบมา โดยใช้ภาพเป็นข้อมูลหลักทั้งหมด

นี่คืองานรักษาความสอดคล้องของตัวละคร ไม่ใช่การออกแบบตัวละครใหม่ ให้ถอดลักษณะที่มองเห็นได้จากภาพอ้างอิงอย่างแม่นยำ ทั้งรูปลักษณ์ อายุที่มองเห็นได้ รูปร่าง สัดส่วน ทรงผม สีผิว เครื่องแต่งกาย วัสดุ สี รอยสึก รายละเอียดเฉพาะ และบุคลิกโดยรวม ห้ามระบุตัวตนหรือคาดเดาข้อมูลส่วนตัวของบุคคลในภาพ

หากส่วนใดมองไม่เห็น ให้ต่อเติมอย่างเรียบง่าย สมเหตุสมผล และเข้ากับสิ่งที่เห็น ห้ามเพิ่มลวดลาย เครื่องประดับ ตราสัญลักษณ์ หรือรายละเอียดที่ไม่มีหลักฐานจากภาพ

จัดทำภาพแนวนอนอัตราส่วน 16:9 ตามรูปแบบ Character Sheet ของ BANKBZK:

ด้านซ้ายประมาณ 72–75% แสดงตัวละครเต็มตัว 4 มุม เรียงจากซ้ายไปขวา:

1. ด้านหน้าตรง
2. ด้านหน้าเฉียงสามส่วน
3. ด้านข้างตรง
4. ด้านหลังตรง

ตัวเต็มทั้ง 4 มุมต้องไม่มีศีรษะ โดยสิ้นสุดบริเวณคออย่างสะอาดเหมือนหุ่นสำหรับแสดงเครื่องแต่งกาย ใช้รูปร่าง สัดส่วน ความสูง ขนาด และท่ายืนเดียวกัน ยืนตรงในท่าธรรมชาติ วางบนเส้นพื้นเดียวกัน เห็นมือ เท้า รองเท้า และขอบเครื่องแต่งกายครบทุกส่วน แต่ละตัวต้องแยกออกจากกันและไม่ซ้อนทับ

ด้านขวาประมาณ 25–28% แสดงภาพใบหน้าและช่วงไหล่ขนาดใหญ่เพียงหนึ่งภาพ ใช้เป็นใบหน้าอ้างอิงหลัก ต้องรักษาโครงหน้า ดวงตา จมูก ริมฝีปาก กราม ริ้วรอย อายุที่มองเห็นได้ สีผิว แนวไรผม และทรงผมจากภาพแนบให้ใกล้เคียงที่สุด พร้อมแสดงคอ ปกเสื้อ ไหล่ และเสื้อส่วนบนที่ตรงกับตัวเต็มด้านซ้าย

รักษาโครงสร้างเสื้อผ้า ลำดับชั้น วัสดุ สี ตะเข็บ กระเป๋า สายรัด อุปกรณ์ ร่องรอยการใช้งาน และตำแหน่งรายละเอียดให้เหมือนกันทุกมุม ห้ามสลับซ้าย–ขวาโดยไม่ตั้งใจ

ใช้แสงสตูดิโอที่เป็นกลาง มุมมองบิดเบือนน้อย พื้นหลังขาว เทาอ่อน หรือสีกลางเรียบ มีพื้นที่ว่างเพียงพอ ภาพคมชัด รายละเอียดวัสดุสมจริง และจัดวางแบบเอกสารออกแบบตัวละครระดับงานผลิต

ห้ามเปลี่ยนหน้าตา อายุ รูปร่าง ทรงผม หรือโครงสร้างเครื่องแต่งกายระหว่างแต่ละมุม ห้ามมีใบหน้าหลายใบ ตัวละครซ้อนกัน ขนาดไม่เท่ากัน เท้าลอย แขนขาเกิน มือผิดรูป อวัยวะขาด ขอบภาพตัดมือหรือตัดเท้า ตัวหนังสือ โลโก้ ลายน้ำ กรอบ ตาราง และฉากตกแต่ง`
  }, {
    id: 'template-environment-sheet',
    type: 'Prompt',
    name: 'Prompt สร้าง ENVIRONMENT SHEET',
    isTemplate: true,
    image: 'assets/environment-sheet-example.png',
    imageAlt: 'ตัวอย่าง Environment Sheet หกมุมมองของหมู่บ้านริมคลองในทะเลทราย',
    prompt: `ต้องการสร้าง Environment Sheet แบบ 6 มุมมอง โดยอ้างอิงจากภาพต้นฉบับที่แนบมา เพื่อให้ได้สภาพแวดล้อมเดียวกันจากหลายทิศทาง

ภาพทั้งหมดต้องแสดงสถานที่เดียวกัน มีโครงสร้าง ภูมิประเทศ และองค์ประกอบเหมือนกันทุกประการ

แผ่นภาพต้องจัดเป็น 2 แถว × 3 คอลัมน์ (2 rows, 3 columns) และแสดงเฉพาะสภาพแวดล้อม ไม่มีตัวละครหรือวัตถุเพิ่มเติม

กำหนดมุมมองดังนี้:

1. มุมด้านหน้าตรง (Front View) แบบภาพกว้าง เห็นภาพรวมของสถานที่
2. มุมด้านขวา (Right Side View) แสดงโครงสร้างและภูมิประเทศจากด้านข้าง
3. มุมด้านซ้าย (Left Side View)
4. มุมด้านหลัง (Rear View) แสดงด้านหลังของสถานที่
5. มุมสูงเฉียง (Elevated Aerial 3/4 View) เพื่อให้เห็นผังและความสัมพันธ์ของพื้นที่
6. มุมระยะใกล้ (Close Environmental Detail View) เน้นรายละเอียดสถาปัตยกรรม พื้นผิว และองค์ประกอบรอบ ๆ

ทุกภาพต้องรักษาความสม่ำเสมอของสภาพแวดล้อม ได้แก่:

• โครงสร้างอาคารเหมือนกัน
• ผังพื้นที่เหมือนกัน
• ภูมิประเทศเหมือนกัน
• ตำแหน่งแลนด์มาร์กเหมือนกัน
• แสง สี และบรรยากาศเหมือนกัน

ห้ามเพิ่มบุคคล ยานพาหนะ ตัวอักษร โลโก้ หรือสิ่งปลูกสร้างใหม่`
  }];
  const root = document.querySelector('#libraryGrid');
  const search = document.querySelector('#librarySearch');
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  const normalize = value => String(value || '').toLocaleLowerCase('th').normalize('NFKC');
  let items = [];

  function collectItems() {
    items = [...builtInPrompts];
  }

  function showToast(message) {
    const toast = document.querySelector('#libraryToast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  async function copyPrompt(item) {
    if (!item?.prompt) return showToast('รายการนี้ยังไม่มีข้อความ Prompt');
    try { await navigator.clipboard.writeText(item.prompt); }
    catch {
      const area = document.createElement('textarea'); area.value = item.prompt; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove();
    }
    showToast('คัดลอก Prompt แล้ว');
  }

  function render() {
    const query = normalize(search.value.trim());
    const visible = items.filter(item => !query || normalize(`${item.name} ${item.prompt}`).includes(query));
    document.querySelector('#librarySummary').textContent = `${visible.length.toLocaleString('th-TH')} Prompt`;
    root.innerHTML = visible.length ? visible.map(item => {
      const type = config[item.type];
      const date = 'เทมเพลตพร้อมใช้';
      const preview = item.prompt || 'ยังไม่มีข้อความ Prompt';
      const actions = `<button class="library-copy-full" type="button" data-copy="${escapeHtml(item.id)}" data-type="${item.type}">คัดลอก Prompt</button>`;
      const exampleImage = item.image ? `<a class="library-example-image" href="${escapeHtml(item.image)}" target="_blank" aria-label="เปิดภาพตัวอย่างขนาดเต็ม"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" loading="lazy"><span>ดูภาพตัวอย่างขนาดเต็ม ↗</span></a>` : '';
      return `<article class="library-card${item.isTemplate ? ' library-template-card' : ''}" data-type="${item.type}">${exampleImage}<div class="library-card-top"><span class="library-type-icon">${type.icon}</span><div><small>${item.isTemplate ? 'PROMPT TEMPLATE' : type.label}</small><time>${escapeHtml(date)}</time></div></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(preview)}</p><div class="library-card-actions">${actions}</div></article>`;
    }).join('') : '<div class="library-empty"><span>🔎</span><h3>ไม่พบ Prompt ที่ค้นหา</h3><p>ลองใช้คำค้นหาอื่น</p></div>';
    root.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copyPrompt(items.find(item => item.id === button.dataset.copy && item.type === button.dataset.type))));
  }

  search.addEventListener('input', render);
  collectItems(); render();
})();

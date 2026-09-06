(() => {
  'use strict';
  const RECENT_KEY = 'aiCreativeLabRecentV1';
  const safeParse = (value, fallback) => { try { return JSON.parse(value) ?? fallback; } catch { return fallback; } };

  window.AICreativeLab = {
    recentKey: RECENT_KEY,
    read(key, fallback) { return safeParse(localStorage.getItem(key), fallback); },
    write(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
    addRecent(item) {
      const recent = safeParse(localStorage.getItem(RECENT_KEY), []);
      const next = [{ ...item, savedAt: new Date().toISOString() }, ...recent.filter(entry => !(entry.type === item.type && entry.id === item.id))].slice(0, 9);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    }
  };

  const FACEBOOK_URL = 'https://www.facebook.com/people/SyntaxErr0r/61594200537782/';
  const LOGO_SRC = 'assets/syntaxerr0r-logo.png';

  const siteBrand = document.querySelector('.site-brand');
  if (siteBrand) {
    siteBrand.innerHTML = `<img class="site-brand-logo" src="${LOGO_SRC}" alt="SyntaxErr0r"><span class="site-brand-text">AiHelperWebsite — BY BANKBZK</span>`;
    siteBrand.setAttribute('aria-label', 'AiHelperWebsite by BANKBZK — Home');
  }
  document.title = document.title.replace(/AI Creative Lab|AiHelperWebsite/gi, 'AiHelperWebsite — BY BANKBZK').replace(/BY SUGAR/gi, 'BY BANKBZK');

  const navigation = document.querySelector('.nav-links');
  const navigationOrder = ['index.html', 'character-builder.html', 'scene-builder.html', 'prompt-builder.html', 'unity-builder.html', 'prompt-library.html'];
  navigation?.querySelectorAll('a[href="mygpt.html"], a[href="MyGPT.html"]').forEach(link => link.remove());
  if (navigation && !navigation.querySelector('[href="prompt-library.html"]')) {
    const libraryLink = document.createElement('a');
    libraryLink.href = 'prompt-library.html';
    libraryLink.textContent = 'Prompt Library';
    navigation.append(libraryLink);
  }
  if (navigation && !navigation.querySelector('[href="unity-builder.html"]')) {
    const unityLink = document.createElement('a');
    unityLink.href = 'unity-builder.html';
    unityLink.textContent = 'Unity AI Helper';
    navigation.append(unityLink);
  }
  navigationOrder.forEach(fileName => {
    const link = [...(navigation?.querySelectorAll('a') || [])].find(item => item.getAttribute('href') === fileName);
    if (link) navigation.append(link);
  });

  const builderHero = document.querySelector('.builder-hero');
  if (builderHero && !builderHero.querySelector('.social-link')) {
    const pageActions = document.createElement('div');
    pageActions.className = 'prompt-hero-actions';
    pageActions.innerHTML = `<a class="social-link" href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="เปิดเพจ Facebook SyntaxErr0r ในแท็บใหม่"><img src="${LOGO_SRC}" alt=""><span>f</span> SyntaxErr0r</a>`;
    const heroIcon = builderHero.querySelector('.builder-hero-icon');
    if (heroIcon) builderHero.insertBefore(pageActions, heroIcon);
    else builderHero.append(pageActions);
  }

  if (document.body.classList.contains('prompt-builder-page')) {
    const promptLesson = document.createElement('aside');
    promptLesson.className = 'section-learning-note prompt-builder-lesson';
    promptLesson.innerHTML = '<strong>Prompt Builder สอนอะไร</strong><p><b>1. แยกความคิดเป็นส่วน:</b> เริ่มจากสิ่งหลักในภาพ แล้วเติมตัวละคร ฉาก การกระทำ แสง สี และรูปแบบภาพทีละขั้น เพื่อให้ตรวจสอบได้ว่าคำแต่ละกลุ่มทำหน้าที่อะไร</p><p><b>2. เขียนสิ่งที่มองเห็นได้:</b> คำอย่าง “สวย” หรือ “น่าสนใจ” เปิดกว้างมาก ควรอธิบายต่อด้วยสี วัสดุ รูปทรง พื้นผิว แสง ท่าทาง หรือสภาพอากาศที่ทำให้ผู้ชมรู้สึกเช่นนั้น</p><p><b>3. รายละเอียดช่วยให้ภาพเฉพาะเจาะจง:</b> เมื่อบอกข้อมูลสำคัญครบ เช่น ใครหรืออะไรอยู่ในภาพ อยู่ที่ไหน กำลังทำอะไร เป็นช่วงเวลาใด ใช้แสงแบบไหน และต้องการรูปแบบภาพอย่างไร AI จะมีขอบเขตในการตีความชัดขึ้น จึงมีโอกาสได้ภาพที่ตรงแนวคิด มีรายละเอียดสัมพันธ์กัน และมีเอกลักษณ์มากกว่าคำสั่งสั้นหรือกว้าง แต่ไม่จำเป็นต้องใส่ทุกอย่างหรือใส่คำซ้ำ รายละเอียดที่เกี่ยวข้องและสนับสนุนกันสำคัญกว่าจำนวนคำ</p><p><b>4. เลนส์และมุมกล้องเปลี่ยนวิธีมองภาพ:</b> เลนส์มุมกว้างช่วยให้เห็นสถานที่มากและขยายความลึก เลนส์ระยะไกลช่วยบีบฉากหลังให้ดูใกล้ตัวแบบ ส่วนภาพมุมต่ำให้ความรู้สึกทรงพลัง และภาพมุมสูงทำให้ตัวแบบดูเล็กหรือเปราะบาง การเลือกกล้องจึงเปลี่ยนสัดส่วน ระยะ และความรู้สึกของภาพ แม้ใช้ตัวละครหรือสถานที่เดิม</p><p><b>5. อารมณ์และบรรยากาศเปลี่ยนการตีความ:</b> คำว่าอบอุ่น สงบ ลึกลับ สนุก หรือกดดัน อาจทำให้ AI เปลี่ยนแสง สี เงา สภาพอากาศ และรายละเอียดรอบฉาก หากต้องการให้อารมณ์เห็นชัด ควรเติมสิ่งที่มองเห็นได้ เช่น แสงทอง สีสด หมอกหนา เงามืด หรือวัตถุรูปทรงขี้เล่น</p><p><b>6. ทดลองอย่างเป็นระบบ:</b> เก็บพรอมต์หลักไว้ แล้วเปลี่ยนครั้งละหนึ่งค่าเพื่อเปรียบเทียบผล วิธีนี้ช่วยให้รู้ว่าโมเดลตอบสนองต่อคำใดและภาษาใดได้ชัดที่สุด</p><small>A strong prompt is not simply a long prompt. Relevant details, lens choices, camera position, and visible mood cues all shape how the model constructs the image.</small>';
    document.querySelector('.builder-hero')?.after(promptLesson);
  }

  const mainContent = document.querySelector('main');
  if (document.body.classList.contains('unity-helper-page') && mainContent && !document.querySelector('.ai-tool-launcher')) {
    const launcher = document.createElement('section');
    launcher.className = 'ai-tool-launcher';
    launcher.setAttribute('aria-labelledby', 'aiToolLauncherTitle');
    launcher.innerHTML = `
      <div class="ai-tool-launcher-heading">
        <p class="eyebrow">COPY • OPEN • PASTE • GENERATE C#</p>
        <h2 id="aiToolLauncherTitle">นำไปสั่ง AI ให้เขียนโค้ด Unity</h2>
        <p>คัดลอก Final Prompt ภาษาอังกฤษ แล้ววางในโมเดลที่รองรับการเขียน C# สำหรับ Unity 6000.5.4f1</p>
      </div>
      <div class="ai-tool-links">
        <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer"><b>ChatGPT</b><small>เขียน C# และอธิบายขั้นตอนในเอดิเตอร์</small></a>
        <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer"><b>Claude</b><small>โค้ดยาว หลายไฟล์ และสถาปัตยกรรม</small></a>
        <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer"><b>Gemini</b><small>ขยายไอเดียและเจนสคริปต์</small></a>
      </div>`;
    const preview = document.querySelector('.builder-preview');
    if (preview) preview.append(launcher);
    else mainContent.append(launcher);
  } else if (mainContent && !document.querySelector('.ai-tool-launcher')) {
    const launcher = document.createElement('section');
    launcher.className = 'ai-tool-launcher';
    launcher.setAttribute('aria-labelledby', 'aiToolLauncherTitle');
    launcher.innerHTML = `
      <div class="ai-tool-launcher-heading">
        <p class="eyebrow">COPY • OPEN • PASTE • COMPARE</p>
        <h2 id="aiToolLauncherTitle">นำ Prompt ไปทดลองกับ AI</h2>
        <p>คัดลอกพรอมต์ภาษาไทยหรืออังกฤษ แล้วเปิดเว็บที่ต้องการเพื่อวางคำสั่งและเปรียบเทียบผลลัพธ์</p>
      </div>
      <div class="ai-tool-links">
        <a href="https://labs.google/fx/tools/flow" target="_blank" rel="noopener noreferrer"><b>Flow</b><small>สร้างวิดีโอและงานภาพ</small></a>
        <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer"><b>Gemini</b><small>สนทนาและสร้างสื่อด้วย Google</small></a>
        <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer"><b>ChatGPT</b><small>พัฒนาพรอมต์และสร้างภาพ</small></a>
        <a href="https://www.meta.ai/" target="_blank" rel="noopener noreferrer"><b>Meta AI</b><small>สนทนาและทดลองสร้างภาพ</small></a>
        <a href="https://higgsfield.ai/" target="_blank" rel="noopener noreferrer"><b>Higgsfield</b><small>สร้างภาพและวิดีโอแบบภาพยนตร์</small></a>
        <a href="https://www.magnific.com/" target="_blank" rel="noopener noreferrer"><b>Magnific</b><small>สร้าง ปรับแต่ง และเพิ่มรายละเอียดภาพหรือวิดีโอ</small></a>
        <a href="https://www.dola.com/" target="_blank" rel="noopener noreferrer"><b>Dola</b><small>สร้างและทดลองงานวิดีโอด้วย AI</small></a>
      </div>`;
    const promptFinal = document.querySelector('.prompt-builder-page .final-output-block');
    const bilingualFinal = document.querySelector('.builder-preview .bilingual-output');
    if (promptFinal) promptFinal.insertAdjacentElement('afterend', launcher);
    else if (bilingualFinal) bilingualFinal.insertAdjacentElement('afterend', launcher);
    else mainContent.append(launcher);
  }

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    links?.classList.toggle('open', open);
  });
})();

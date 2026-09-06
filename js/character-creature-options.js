(() => {
  'use strict';
  window.CHARACTER_CREATURE_OPTIONS = {
    face: [
      ['Elongated spectral face','ใบหน้าผียาวผิดสัดส่วน'],['Insectoid face','ใบหน้าคล้ายแมลง'],['Reptilian face','ใบหน้าคลายสัตว์เลื้อยคลาน'],['Feline humanoid face','ใบหน้ามนุษย์คล้ายแมว'],['Skull-like face','ใบหน้าคล้ายกะโหลก'],['Mask-like expressionless face','ใบหน้าเรียบไร้อารมณ์เหมือนหน้ากาก'],['Split-symmetry face','ใบหน้าสองซีกมีรูปทรงต่างกัน'],['Melting wax-like face','ใบหน้าคล้ายขี้ผึ้งกำลังละลาย']
    ],
    faceWidth: [
      ['Extremely narrow otherworldly face','ใบหน้าแคบมากแบบสิ่งมีชีวิตต่างโลก'],['Unnaturally broad face','ใบหน้ากว้างผิดธรรมชาติ'],['Top-heavy facial proportions','ใบหน้าช่วงบนกว้างกว่าช่วงล่างมาก'],['Bottom-heavy facial proportions','ใบหน้าช่วงล่างกว้างกว่าช่วงบนมาก'],['Compressed short face','ใบหน้าสั้นและดูถูกบีบ'],['Vertically stretched face','ใบหน้าถูกยืดในแนวตั้ง']
    ],
    cheekbones: [
      ['Blade-like cheekbones','โหนกแก้มคมเหมือนใบมีด'],['Hollow skeletal cheeks','แก้มตอบลึกคล้ายโครงกระดูก'],['Asymmetrically swollen cheek','แก้มข้างหนึ่งบวมใหญ่ไม่สมมาตร'],['Ridged cheek armor','มีสันเกราะตามแนวแก้ม'],['Multiple small cheek ridges','มีสันนูนเล็กหลายแนวบนแก้ม'],['No visible cheek contour','ไม่มีแนวแก้มที่เห็นชัด']
    ],
    forehead: [
      ['Oversized domed forehead','หน้าผากโค้งนูนขนาดใหญ่'],['Horned forehead','มีเขางอกจากหน้าผาก'],['Single central forehead horn','มีเขาเดี่ยวกลางหน้าผาก'],['Forehead eye socket','มีเบ้าตาเพิ่มกลางหน้าผาก'],['Bony forehead ridges','มีสันกระดูกบนหน้าผาก'],['Cracked stone-like forehead','หน้าผากแตกร้าวคล้ายหิน']
    ],
    chin: [
      ['Elongated pointed chin','คางแหลมยาวผิดสัดส่วน'],['Double-split chin','คางแยกเป็นสองปลาย'],['Recessed absent-looking chin','คางถอยจนแทบมองไม่เห็น'],['Armored chin plate','มีแผ่นเกราะปกคลุมคาง'],['Tentacled chin','มีหนวดเส้นยาวใต้คาง'],['Crystal growth on the chin','มีผลึกงอกจากคาง']
    ],
    jawline: [
      ['Oversized predatory jaw','กรามนักล่าขนาดใหญ่'],['Unhinged expandable jaw','กรามอ้าแยกและขยายได้'],['Split lower jaw','กรามล่างแยกเป็นสองส่วน'],['Mandible-like side jaws','มีกรามข้างคล้ายแมลง'],['Exposed skeletal jaw','แนวกรามเป็นกระดูกเปลือย'],['Asymmetrically twisted jaw','แนวกรามบิดไม่สมมาตร']
    ],
    eyes: [
      ['Three vertically aligned eyes','มีดวงตาสามดวงเรียงแนวตั้ง'],['Four symmetrical eyes','มีดวงตาสี่ดวงเรียงสมมาตร'],['Cluster of many small eyes','มีกลุ่มดวงตาเล็กจำนวนมาก'],['Single cyclopean eye','มีดวงตาเดียวขนาดใหญ่'],['Empty eye sockets','มีเบ้าตาว่างเปล่า'],['Completely black eyes','ดวงตาดำสนิททั้งลูก'],['Completely white eyes','ดวงตาขาวสนิททั้งลูก'],['Compound insect eyes','ดวงตารวมคล้ายแมลง'],['Vertical slit eyes','ดวงตารูม่านตาเป็นเส้นตั้ง'],['Horizontal pupil eyes','ดวงตารูม่านตาเป็นแนวนอน'],['Glowing pupil-less eyes','ดวงตาเรืองแสงไร้รูม่านตา'],['Floating eyes detached from the face','ดวงตาลอยแยกออกจากใบหน้า']
    ],
    eyeSize: [
      ['Enormous eyes covering much of the face','ดวงตาใหญ่มากกินพื้นที่ใบหน้าส่วนใหญ่'],['Tiny bead-like eyes','ดวงตาเล็กเหมือนเม็ดลูกปัด'],['One large eye and one tiny eye','ดวงตาข้างหนึ่งใหญ่และอีกข้างเล็กมาก'],['Uneven mismatched eye sizes','ดวงตาสองข้างมีขนาดต่างกันชัดเจน'],['Deep miniature eyes','ดวงตาเล็กและจมลึก'],['Bulging oversized eyes','ดวงตาโปนขนาดใหญ่']
    ],
    eyeColor: [
      ['Glowing red eyes','ดวงตาเรืองแสงสีแดง'],['Acid-green eyes','ดวงตาสีเขียวเรืองสด'],['Electric-blue glowing eyes','ดวงตาเรืองแสงสีฟ้าสด'],['Molten-gold eyes','ดวงตาสีทองคล้ายโลหะหลอม'],['Milky translucent eyes','ดวงตาขุ่นโปร่งแสงคล้ายน้ำนม'],['Rainbow iridescent eyes','ดวงตาเหลือบสีรุ้ง'],['Void-black eyes with star-like specks','ดวงตาดำว่างเปล่ามีจุดคล้ายดาว'],['Two different glowing eye colors','ดวงตาสองข้างเรืองแสงคนละสี']
    ],
    eyebrows: [
      ['No eyebrows','ไม่มีคิ้ว'],['Feathered eyebrows','คิ้วเป็นขนนก'],['Scale-covered brow ridges','แนวคิ้วปกคลุมด้วยเกล็ด'],['Glowing eyebrow markings','ลวดลายเหนือคิ้วเรืองแสง'],['Extremely long arched eyebrows','คิ้วยาวโค้งมากผิดสัดส่วน'],['Asymmetric broken eyebrow ridges','สันคิ้วขาดและไม่สมมาตร']
    ],
    eyelashes: [
      ['No eyelashes','ไม่มีขนตา'],['Feather-like eyelashes','ขนตาคล้ายขนนก'],['Needle-like eyelashes','ขนตาแหลมคล้ายเข็ม'],['Glowing eyelashes','ขนตาเรืองแสง'],['Uneven lashes on one eye only','มีขนตาเพียงดวงตาข้างเดียว'],['Extremely long spider-leg lashes','ขนตายาวคล้ายขาแมงมุม']
    ],
    nose: [
      ['No visible nose','ไม่มีจมูกที่มองเห็น'],['Two simple nasal slits','มีเพียงช่องจมูกสองช่อง'],['Bat-like nose','จมูกคล้ายค้างคาว'],['Beak-like nose','จมูกคล้ายจะงอยปาก'],['Trunk-like nose','จมูกยาวคล้ายงวง'],['Multiple nostrils','มีรูจมูกหลายช่อง'],['Skeletal nasal cavity','จมูกเป็นโพรงคล้ายกะโหลก'],['Crystal nose ridge','สันจมูกเป็นผลึก']
    ],
    lips: [
      ['No visible lips','ไม่มีริมฝีปากที่มองเห็น'],['Blackened cracked lips','ริมฝีปากดำและแตกร้าว'],['Glowing lips','ริมฝีปากเรืองแสง'],['Stitched-looking lips','ริมฝีปากดูเหมือนถูกเย็บปิด'],['Extremely wide mouth line','แนวปากกว้างเกือบถึงข้างแก้ม'],['Vertical mouth opening','ช่องปากเปิดในแนวตั้ง'],['Multiple layered lips','มีริมฝีปากซ้อนหลายชั้น'],['Beak replacing the lips','มีจะงอยปากแทนริมฝีปาก']
    ],
    mouthDetails: [
      ['Rows of needle-like teeth','มีฟันแหลมเล็กเรียงหลายแถว'],['Oversized tusks','มีงาขนาดใหญ่'],['Long exposed fangs','มีเขี้ยวยาวโผล่พ้นริมฝีปาก'],['Forked tongue','มีลิ้นสองแฉก'],['Long serpentine tongue','มีลิ้นยาวคล้ายงู'],['Glowing mouth interior','ภายในช่องปากเรืองแสง'],['Second smaller mouth inside','มีปากขนาดเล็กอีกหนึ่งปากอยู่ด้านใน'],['Mouth extending across both cheeks','ช่องปากยาวพาดถึงแก้มทั้งสองข้าง'],['Drooling black fluid','มีของเหลวสีดำไหลจากปาก'],['Smoke leaking from the mouth','มีควันไหลออกจากปาก']
    ],
    ears: [
      ['Long pointed ears','ใบหูยาวและแหลม'],['Fin-like ears','ใบหูคล้ายครีบ'],['Bat-like ears','ใบหูคล้ายค้างคาว'],['Multiple pairs of ears','มีใบหูหลายคู่'],['No visible ears','ไม่มีใบหูที่มองเห็น'],['Horn-shaped ears','ใบหูมีรูปทรงคล้ายเขา'],['Transparent ears with visible veins','ใบหูโปร่งใสและเห็นเส้นเลือด'],['Asymmetric mismatched ears','ใบหูสองข้างมีรูปทรงต่างกัน']
    ],
    skinTone: [
      ['Ghostly translucent white skin','ผิวขาวโปร่งแสงแบบวิญญาณ'],['Ash-gray skin','ผิวสีเทาขี้เถ้า'],['Deep charcoal-black skin','ผิวดำเข้มคล้ายถ่าน'],['Blood-red skin','ผิวสีแดงเลือด'],['Moss-green skin','ผิวสีเขียวมอส'],['Deep ocean-blue skin','ผิวสีน้ำเงินเข้มแบบทะเลลึก'],['Violet alien skin','ผิวสีม่วงแบบสิ่งมีชีวิตต่างดาว'],['Bioluminescent cyan skin','ผิวสีฟ้าอมเขียวเรืองแสง'],['Porcelain-doll white skin','ผิวขาวเหมือนตุ๊กตากระเบื้อง'],['Color-shifting iridescent skin','ผิวเหลือบสีและเปลี่ยนตามมุมแสง']
    ],
    undertone: [
      ['Cold blue spectral undertone','อันเดอร์โทนฟ้าเย็นแบบวิญญาณ'],['Sickly green undertone','อันเดอร์โทนเขียวซีดผิดธรรมชาติ'],['Bruised purple undertone','อันเดอร์โทนม่วงคล้ายรอยช้ำ'],['Ember-red undertone','อันเดอร์โทนแดงคล้ายถ่านไฟ'],['Metallic silver undertone','อันเดอร์โทนเงินแบบโลหะ'],['Bioluminescent glowing undertone','อันเดอร์โทนเรืองแสงจากภายใน']
    ],
    skinDetails: [
      ['Reptilian scales','ผิวปกคลุมด้วยเกล็ดสัตว์เลื้อยคลาน'],['Fish-like iridescent scales','ผิวมีเกล็ดปลาเหลือบสี'],['Cracked stone skin','ผิวแตกร้าวคล้ายหิน'],['Rough tree-bark skin','ผิวหยาบคล้ายเปลือกไม้'],['Translucent skin showing veins','ผิวโปร่งใสจนเห็นเส้นเลือด'],['Glowing veins beneath the skin','เส้นเลือดใต้ผิวเรืองแสง'],['Wet amphibian skin','ผิวเปียกชื้นคลายสัตว์สะเทินน้ำสะเทินบก'],['Fungal growth across the skin','มีเห็ดและเส้นใยราขึ้นบนผิว'],['Crystal growths emerging from skin','มีผลึกงอกออกจากผิว'],['Moving shadow patterns under skin','มีลวดลายเงาเคลื่อนไหวอยู่ใต้ผิว'],['Patchwork stitched skin','ผิวเป็นรอยต่อหลายส่วนคล้ายถูกเย็บ'],['Smoke-like skin edges','ขอบผิวสลายเป็นควัน']
    ],
    distinctiveMarks: [
      ['Glowing ritual symbols','มีสัญลักษณ์พิธีกรรมเรืองแสง'],['Cursed black markings','มีรอยอาคมสีดำ'],['Constellation-like facial markings','มีลวดลายบนใบหน้าคล้ายกลุ่มดาว'],['Cracks leaking colored light','มีรอยแตกที่ปล่อยแสงสีจากภายใน'],['Handprints burned into the skin','มีรอยฝ่ามือไหม้ติดบนผิว'],['Extra closed eye on the forehead','มีดวงตาที่สามปิดอยู่บนหน้าผาก'],['Symmetrical horn stubs','มีโคนเขาสั้นสองข้างอย่างสมมาตร'],['One broken horn','มีเขาข้างหนึ่งหัก'],['Exposed mechanical face panel','มีแผงกลไกเปิดอยู่บนใบหน้า'],['Possessed shadow across half the face','มีเงาสิงอยู่บนใบหน้าครึ่งหนึ่ง'],['Ancient carved facial runes','มีอักขระโบราณสลักบนใบหน้า'],['Floating fragments around the face','มีเศษชิ้นส่วนลอยรอบใบหน้า'],
      ['Crescent birthmark on the left cheek','มีปานรูปพระจันทร์เสี้ยวบนแก้มซ้าย'],['Star-shaped birthmark on the forehead','มีปานรูปดาวบนหน้าผาก'],['Large light-brown birthmark on one cheek','มีปานสีน้ำตาลอ่อนขนาดใหญ่บนแก้มข้างหนึ่ง'],['Cluster of small moles along the neck','มีกลุ่มไฝเล็กเรียงตามลำคอ'],['Freckles concentrated on one side of the face','มีกระหนาแน่นเฉพาะใบหน้าข้างหนึ่ง'],['Pitted acne scars across both cheeks','มีหลุมแผลเป็นจากสิวบนแก้มทั้งสองข้าง'],['Diagonal scar across the right cheek','มีแผลเป็นแนวทแยงพาดแก้มขวา'],['Vertical scar crossing the upper lip','มีแผลเป็นแนวตั้งพาดริมฝีปากบน'],['Short scar across the nose bridge','มีแผลเป็นสั้นพาดสันจมูก'],['Healed torn-ear scar','มีแผลเป็นจากใบหูฉีกที่หายแล้ว'],['Healed burn patch along the jaw','มีรอยแผลไฟไหม้ที่หายแล้วตามแนวกราม'],['Raised keloid scar on one shoulder','มีแผลเป็นนูนบนไหล่ข้างหนึ่ง'],['Fine surgical stitch marks at the temple','มีรอยเย็บผ่าตัดละเอียดบริเวณขมับ'],['Single tattooed teardrop below one eye','มีรอยสักรูปหยดน้ำใต้ตาข้างหนึ่ง'],['Geometric tattoo across one temple','มีรอยสักเรขาคณิตพาดขมับข้างหนึ่ง'],['White depigmented patch around one eye','มีรอยผิวขาวรอบดวงตาข้างหนึ่ง'],['Dark crescent-shaped mark beneath both eyes','มีรอยสีเข้มรูปพระจันทร์เสี้ยวใต้ตาทั้งสองข้าง']
    ],
    hairLength: [
      ['Floor-dragging hair','ผมยาวลากพื้น'],['Hair floating far above the head','ผมยาวลอยสูงเหนือศีรษะ'],['Completely hairless scalp','ศีรษะไม่มีเส้นผมเลย']
    ],
    hairStyle: [
      ['Living snake hair','เส้นผมเป็นงูมีชีวิต'],['Tentacle hair','เส้นผมเป็นหนวดเส้นยาว'],['Flame-shaped hair','เส้นผมมีรูปทรงคล้ายเปลวไฟ'],['Ghost hair floating without wind','ผมผีลอยได้โดยไม่มีลม'],['Mushroom-covered hair','เส้นผมปกคลุมด้วยเห็ด']
    ],
    hairTexture: [
      ['Smoke-like hair','เส้นผมคล้ายกลุ่มควัน'],['Wet stringy hair','เส้นผมเปียกจับตัวเป็นเส้น'],['Metal-wire hair','เส้นผมแข็งคล้ายลวดโลหะ']
    ],
    hairColor: [
      ['Bioluminescent cyan hair','ผมสีฟ้าอมเขียวเรืองแสง'],['Blood-red hair','ผมสีแดงเลือด'],['Transparent glass-like hair','เส้นผมโปร่งใสคล้ายแก้ว'],['Color-shifting iridescent hair','ผมเหลือบสีและเปลี่ยนตามมุมแสง']
    ],
    hairPart: [
      ['Spiral hair part','แนวแสกผมหมุนเป็นเกลียว'],['No visible scalp or hair part','มองไม่เห็นหนังศีรษะหรือแนวแสกผม']
    ],
    bangs: [
      ['Bangs covering the entire face','ผมหน้าม้าปิดใบหน้าทั้งหมด'],['Jagged blade-like bangs','ผมหน้าม้าแหลมไม่เท่ากันคล้ายใบมีด']
    ],
    facialHair: [
      ['Tentacle beard','เคราเป็นหนวดเส้นยาว'],['Living moss beard','เคราเป็นมอสมีชีวิต'],['Crystal stubble','ตอหนวดเป็นผลึก']
    ],
    hairDetails: [
      ['Tiny insects crawling through the hair','มีแมลงตัวเล็กคลานอยู่ในเส้นผม'],['Hair drifting as if underwater','เส้นผมลอยพลิ้วเหมือนอยู่ใต้น้ำ'],['Black liquid dripping from the hair','มีของเหลวสีดำหยดจากเส้นผม'],['Sparks flickering between hair strands','มีประกายไฟวาบระหว่างช่อผม']
    ],
    height: [
      ['Doll-sized humanoid','รูปร่างคล้ายมนุษย์ขนาดเท่าตุ๊กตา'],['Towering giant height','สูงใหญ่ราวกับยักษ์'],['Unstable spectral height','ความสูงของร่างผีเปลี่ยนแปลงไม่คงที่']
    ],
    bodyType: [
      ['Skeletal emaciated body','ร่างผอมแห้งเห็นแนวกระดูก'],['Extremely elongated thin body','ร่างผอมบางและยืดยาวผิดสัดส่วน'],['Massive hulking monster body','ร่างมอนสเตอร์ใหญ่หนาและทรงพลัง'],['Asymmetrically swollen body','ร่างกายบวมใหญ่ไม่สมมาตร'],['Amorphous shifting body','ร่างไร้รูปทรงแน่นอนและเปลี่ยนรูปร่างได้']
    ],
    proportion: [
      ['Arms reaching below the knees','แขนยาวลงไปต่ำกว่าหัวเข่า'],['Oversized head with a tiny torso','ศีรษะใหญ่และลำตัวเล็กมาก'],['Tiny head on a massive body','ศีรษะเล็กบนร่างกายขนาดใหญ่'],['Reverse-jointed legs','ขามีข้อต่องอกลับทิศ'],['Serpentine lower body','ร่างกายท่อนล่างยาวคล้ายงู']
    ],
    hands: [
      ['Long clawed fingers','นิ้วยาวพร้อมกรงเล็บ'],['Six fingers on each hand','มือแต่ละข้างมีหกนิ้ว'],['Skeletal hands with exposed bone','มือโครงกระดูกที่เห็นกระดูกเปลือย'],['Webbed amphibian hands','มือมีพังผืดคลายสัตว์สะเทินน้ำสะเทินบก'],['Oversized stone-like fists','กำปั้นใหญ่คล้ายก้อนหิน']
    ],
    physicalFeatures: [
      ['Two extra arms','มีแขนเพิ่มอีกสองข้าง'],['Large folded bat wings','มีปีกค้างคาวขนาดใหญ่พับอยู่ด้านหลัง'],['Long spiked tail','มีหางยาวพร้อมหนาม'],['Exposed glowing rib cage','มองเห็นโครงซี่โครงเรืองแสง']
    ],
    posture: [
      ['Low spider-like crouch','หมอบต่ำคล้ายแมงมุม'],['Unnaturally backward-arched posture','แอ่นร่างไปด้านหลังผิดธรรมชาติ']
    ]
  };
})();

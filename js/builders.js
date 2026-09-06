(() => {
  'use strict';
  const type = document.body.dataset.builder;
  const isCharacter = type === 'character';
  const lab = window.AICreativeLab;
  const storageKey = isCharacter ? 'aiCreativeLabCharactersV1' : 'aiCreativeLabScenesV1';
  const draftKey = `${storageKey}Draft`;
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  const field = (id, label, options, multi = false, help = '') => ({ id, label, options, multi, help });
  const fieldThaiLabels = {
    gender:'อัตลักษณ์ทางเพศ', age:'ช่วงอายุ', nationality:'สัญชาติ', ethnicity:'เชื้อชาติและชาติพันธุ์', birthplace:'บริบทสถานที่เติบโต', language:'ภาษาและสำเนียง', occupation:'อาชีพและบทบาท', socialBackground:'ภูมิหลังทางสังคม',
    face:'รูปหน้า', faceWidth:'ความกว้างและสัดส่วนใบหน้า', cheekbones:'โหนกแก้มและแก้ม', forehead:'หน้าผาก', chin:'คาง', jawline:'แนวกราม', eyes:'รูปทรงดวงตา', eyeSize:'ขนาดดวงตา', eyeColor:'สีตา', eyebrows:'คิ้ว', eyelashes:'ขนตา', nose:'รูปทรงจมูก', lips:'รูปทรงริมฝีปาก', mouthDetails:'รายละเอียดปาก', ears:'รายละเอียดใบหู',
    skinTone:'ระดับสีผิว', undertone:'อันเดอร์โทนผิว', skinDetails:'พื้นผิว', distinctiveMarks:'ตำหนิและจุดจดจำ', hairLength:'ความยาวผม', hairStyle:'ทรงผม', hairTexture:'ลักษณะเส้นผม', hairColor:'สีผม', hairPart:'แสกผมและแนวไรผม', bangs:'หน้าม้า', facialHair:'หนวดและเครา', hairDetails:'รายละเอียดเส้นผม',
    height:'ความสูง', bodyType:'รูปร่าง', proportion:'สัดส่วนร่างกาย', hands:'มือ', physicalFeatures:'ลักษณะทางกายภาพ', posture:'ท่าทาง', movement:'ลักษณะการเคลื่อนไหว', era:'ยุคและช่วงเวลา', fashion:'สไตล์แฟชั่น', top:'เสื้อท่อนบน', bottom:'เสื้อผ้าท่อนล่าง', dress:'ชุดเดรส', outerwear:'เสื้อคลุม', shoes:'รองเท้า', accessories:'เครื่องประดับ', mainColor:'สีหลัก', accentColor:'สีเสริม', material:'วัสดุหลัก', fit:'รูปทรงเสื้อผ้า',
    personality:'บุคลิกหลัก', archetype:'ต้นแบบตัวละคร', strength:'จุดแข็ง', flaw:'จุดอ่อน', motivation:'แรงจูงใจ', fear:'ความกลัวลึกที่สุด', energy:'พลังในการเข้าสังคม', expression:'สีหน้าหลัก', gaze:'ทิศทางและลักษณะสายตา', gesture:'ท่าทางประจำตัว', emotionalState:'อารมณ์ปัจจุบัน', voice:'ลักษณะเสียง', signatureFeature:'จุดเด่นประจำตัว', signatureProp:'พร็อพประจำตัว',
    realismLevel:'ระดับความสมจริง', facialAsymmetry:'ความไม่สมมาตรตามธรรมชาติ', microTexture:'รายละเอียดผิวระดับเล็ก', underEye:'รายละเอียดใต้ตา', complexionVariation:'ความแปรผันของสีผิว', teethRealism:'ความสมจริงของฟัน', eyeRealism:'ความสมจริงของดวงตา', makeupFinish:'การแต่งหน้าและพื้นผิว', retouching:'ระดับการรีทัช', captureStyle:'รูปแบบการถ่ายภาพธรรมชาติ',
    coreValues:'คุณค่าหลักในชีวิต', coreWound:'บาดแผลทางใจหลัก', attachmentStyle:'รูปแบบความผูกพัน', emotionalRegulation:'การจัดการอารมณ์', stressResponse:'การตอบสนองต่อความเครียด', defenseMechanisms:'กลไกป้องกันตนเอง', copingStrategies:'วิธีรับมือปัญหา', decisionStyle:'รูปแบบการตัดสินใจ', socialTrust:'ความไว้วางใจและขอบเขตส่วนตัว', selfImage:'ภาพที่มีต่อตนเอง', psychologicalConflict:'ความขัดแย้งภายในใจ', diagnosedMentalHealth:'ภาวะสุขภาพจิตที่ได้รับการวินิจฉัย', neurodivergence:'ความหลากหลายทางระบบประสาท', chronicCondition:'โรคหรือภาวะเรื้อรัง', disability:'การเข้าถึงและอุปกรณ์ช่วย', painFatigue:'อาการปวดและความเหนื่อยล้า', allergies:'อาการแพ้', sleepPattern:'รูปแบบการนอน', visibleHealthImpact:'สุขภาพและผลที่มองเห็น', supportNeeds:'การดูแลและความช่วยเหลือ'
    ,storyRole:'บทบาทในเรื่อง', externalGoal:'เป้าหมายภายนอก', internalNeed:'ความต้องการภายใน', stakes:'สิ่งที่เสี่ยงจะสูญเสีย', secret:'ความลับ', falseBelief:'ความเชื่อผิดที่ยึดถือ', relationshipPattern:'รูปแบบความสัมพันธ์', conflictSource:'ต้นตอความขัดแย้ง', moralLine:'เส้นศีลธรรมที่ไม่ยอมข้าม', characterArc:'เส้นทางการเปลี่ยนแปลง', lieBehavior:'พฤติกรรมเมื่อโกหก', pressureBehavior:'พฤติกรรมเมื่อถูกกดดัน', currentHealthCondition:'อาการหรือภาวะสุขภาพปัจจุบัน'
  };
  const fieldThaiHelp = {
    gender:'เลือกภาพลักษณ์ทางเพศที่ต้องการให้เห็นในภาพ', age:'เลือกอายุที่ตัวละครควรดูเหมือนจากภายนอก', nationality:'สัญชาติของตัวละคร ใช้กำหนดภูมิหลัง ไม่ได้ใช้แทนเชื้อชาติ', ethnicity:'ลักษณะทางชาติพันธุ์และรากทางครอบครัว', birthplace:'สภาพแวดล้อมและวัฒนธรรมที่ตัวละครเติบโตมา', language:'ภาษาหลักหรือสำเนียงที่ใช้ในการพูด', occupation:'งานหรือหน้าที่หลักของตัวละคร', socialBackground:'ฐานะและสภาพแวดล้อมทางครอบครัว',
    face:'รูปทรงโดยรวมของใบหน้าเมื่อมองตรง', faceWidth:'ความกว้างและความยาวของใบหน้า', cheekbones:'ระดับความเด่นของโหนกแก้มและเนื้อแก้ม', forehead:'ความสูงและความกว้างของหน้าผาก', chin:'รูปทรงส่วนปลายของคาง', jawline:'ความโค้งหรือความคมของแนวกราม', eyes:'รูปทรงและองศาของดวงตา', eyeSize:'ขนาดดวงตาเมื่อเทียบกับใบหน้า', eyeColor:'สีของม่านตา', eyebrows:'รูปทรง ความหนา และความโค้งของคิ้ว', eyelashes:'ความยาวและความหนาของขนตา', nose:'รูปทรงสันและปลายจมูก', lips:'รูปทรงและความอิ่มของริมฝีปาก', mouthDetails:'รายละเอียดเล็ก ๆ ที่ทำให้รอยยิ้มมีเอกลักษณ์', ears:'ขนาดและรูปทรงของใบหู',
    skinTone:'ระดับความสว่างหรือเข้มของสีผิว', undertone:'โทนสีที่อยู่ใต้ผิว เช่น อุ่น เย็น หรืออมมะกอก', skinDetails:'ลักษณะพื้นผิวที่ช่วยให้ผิวไม่เรียบเหมือนพลาสติก', distinctiveMarks:'ตำหนิถาวรที่ช่วยให้จดจำตัวละครได้', hairLength:'ความยาวโดยรวมของเส้นผม', hairStyle:'รูปทรงและวิธีจัดแต่งทรงผม', hairTexture:'ลักษณะเส้นผม เช่น ตรง หยักศก หรือขด', hairColor:'สีหลักของเส้นผม', hairPart:'ตำแหน่งแสกและลักษณะแนวไรผม', bangs:'รูปแบบผมหน้าม้า', facialHair:'ลักษณะหนวดและเครา', hairDetails:'รายละเอียดเล็ก ๆ ของเส้นผมที่ช่วยให้ดูเป็นธรรมชาติ',
    height:'ความสูงโดยรวมเมื่อเทียบกับคนทั่วไป', bodyType:'รูปร่างและมวลกล้ามเนื้อโดยรวม', proportion:'ความสัมพันธ์ระหว่างลำตัว ไหล่ สะโพก และช่วงขา', hands:'ลักษณะมือ นิ้ว และเล็บ', physicalFeatures:'ลักษณะทางกายภาพเพิ่มเติม', posture:'ท่าทางของร่างกายขณะอยู่นิ่ง', movement:'จังหวะและลักษณะการเคลื่อนไหว', era:'ช่วงเวลาหรือโลกที่ตัวละครอาศัยอยู่', fashion:'ภาพรวมของแนวการแต่งตัว', top:'เสื้อผ้าชิ้นหลักของท่อนบน', bottom:'เสื้อผ้าชิ้นหลักของท่อนล่าง', dress:'รูปแบบชุดเดรส หากไม่ได้ใส่ให้เลือกไม่มีชุดเดรส', outerwear:'เสื้อคลุมหรือเสื้อชั้นนอก', shoes:'รองเท้าที่สวมใส่', accessories:'สิ่งของตกแต่งที่สวมติดตัว', mainColor:'สีที่เห็นเด่นที่สุดในชุด', accentColor:'สีรองที่ใช้เพิ่มจุดสนใจ', material:'วัสดุหลักของเสื้อผ้า', fit:'ความพอดีและรูปทรงของเสื้อผ้าเมื่ออยู่บนร่างกาย',
    personality:'นิสัยหลักที่แสดงออกเป็นประจำ', archetype:'บทบาทต้นแบบที่ช่วยกำหนดทิศทางของตัวละคร', strength:'คุณสมบัติเด่นที่ช่วยให้ตัวละครผ่านปัญหา', flaw:'ข้อบกพร่องที่ทำให้ตัวละครมีความเป็นมนุษย์', motivation:'สิ่งสำคัญที่ผลักดันให้ตัวละครลงมือทำ', fear:'สิ่งที่ตัวละครกลัวมากที่สุดภายในใจ', energy:'ความรู้สึกที่ผู้อื่นได้รับเมื่ออยู่ใกล้ตัวละคร', expression:'สีหน้าหลักในภาพ', gaze:'ทิศทางและน้ำหนักของสายตา', gesture:'ท่าทางที่ตัวละครใช้เป็นประจำ', emotionalState:'ความรู้สึกของตัวละครในช่วงเวลานั้น', voice:'น้ำหนักและคุณภาพของเสียงพูด', signatureFeature:'จุดเด่นที่ช่วยให้จดจำตัวละครได้', signatureProp:'สิ่งของที่ตัวละครพกหรือใช้เป็นประจำ',
    realismLevel:'เลือกลักษณะความสมจริงของภาพถ่าย', facialAsymmetry:'ความแตกต่างเล็กน้อยระหว่างใบหน้าซ้ายและขวาช่วยให้ดูเป็นมนุษย์', microTexture:'รายละเอียดรูขุมขน ขนอ่อน และรอยเล็ก ๆ บนผิว', underEye:'รายละเอียดใต้ตาตามธรรมชาติ ไม่เรียบหรือสว่างเกินจริง', complexionVariation:'ความแตกต่างเล็กน้อยของสีผิวในแต่ละส่วนของใบหน้า', teethRealism:'ฟันควรมีสีและรูปทรงเป็นธรรมชาติ ไม่ขาวเท่ากันทุกซี่', eyeRealism:'เพิ่มรายละเอียดม่านตา ความชื้น และเส้นเลือดเล็ก ๆ ในตา', makeupFinish:'กำหนดระดับการแต่งหน้าและพื้นผิวเครื่องสำอาง', retouching:'กำหนดว่าต้องการเก็บรายละเอียดผิวไว้มากเพียงใด', captureStyle:'ลักษณะภาพจากกล้องและวิธีถ่ายที่ช่วยลดความรู้สึกแบบภาพเรนเดอร์',
    coreValues:'สิ่งที่ตัวละครให้ความสำคัญและใช้เป็นหลักในการเลือกทางเดินชีวิต', coreWound:'เหตุการณ์หรือความรู้สึกในอดีตที่ยังมีผลต่อความคิดและความสัมพันธ์', attachmentStyle:'รูปแบบการสร้างความใกล้ชิดและความไว้วางใจในความสัมพันธ์', emotionalRegulation:'วิธีรับรู้ แสดงออก และฟื้นตัวจากอารมณ์ที่รุนแรง', stressResponse:'ปฏิกิริยาที่มักเกิดขึ้นเมื่อเผชิญแรงกดดันหรืออันตราย', defenseMechanisms:'วิธีที่จิตใจใช้ลดความไม่สบายใจโดยอาจเกิดขึ้นโดยไม่รู้ตัว', copingStrategies:'วิธีที่ตัวละครใช้จัดการปัญหา ความเครียด และอารมณ์', decisionStyle:'ลักษณะการพิจารณาและเลือกเมื่อต้องตัดสินใจ', socialTrust:'ระดับความไว้วางใจผู้อื่นและการรักษาพื้นที่ส่วนตัว', selfImage:'ความรู้สึกและความเชื่อที่ตัวละครมีต่อตนเอง', psychologicalConflict:'ความต้องการหรือคุณค่าสองด้านที่ขัดแย้งกันภายในใจ', diagnosedMentalHealth:'ใช้เป็นบริบทชีวิต ไม่ใช่คำแทนบุคลิก ผู้มีภาวะเดียวกันสามารถมีนิสัยและการตอบสนองต่างกันมาก', neurodivergence:'รูปแบบการทำงานของสมองและระบบประสาท ไม่ใช่ข้อบกพร่องทางบุคลิก', chronicCondition:'โรคเรื้อรังอาจส่งผลต่อรูปร่าง ผิว น้ำหนัก พลังงาน การเคลื่อนไหว และกิจวัตร แต่ไม่กำหนดนิสัยโดยอัตโนมัติ', disability:'เลือกเฉพาะอุปกรณ์หรือการปรับตัวที่ควรปรากฏในภาพ เช่น วีลแชร์ ไม้เท้า เครื่องช่วยฟัง หรืออวัยวะเทียม', painFatigue:'อาการปวดหรือเหนื่อยล้าอาจเปลี่ยนท่าทาง จังหวะการเคลื่อนไหว สมาธิ และพฤติกรรมในขณะนั้น', allergies:'สิ่งกระตุ้นที่อาจทำให้เกิดอาการแพ้', sleepPattern:'การนอนอาจส่งผลต่อสีหน้า ใต้ตา พลังงาน และสมาธิ แต่ไม่ใช่ตัวกำหนดคุณค่าหรือนิสัยทั้งหมด', visibleHealthImpact:'เลือกเฉพาะสิ่งที่ต้องการให้เห็นจริงในภาพ เช่น สีหน้าอ่อนล้า ผิวซีด รอยแผล อาการสั่น หรืออุปกรณ์ทางการแพทย์', supportNeeds:'การรักษา เครื่องช่วย การพัก หรือการปรับสภาพแวดล้อมที่ช่วยให้ตัวละครใช้ชีวิตได้'
    ,storyRole:'หน้าที่ของตัวละครต่อโครงเรื่อง เช่น ตัวเอก คู่ปรับ ผู้ให้ข้อมูล หรือผู้จุดชนวนเหตุการณ์', externalGoal:'สิ่งที่ตัวละครพยายามทำให้สำเร็จและผู้ชมมองเห็นได้', internalNeed:'สิ่งที่ตัวละครจำเป็นต้องเรียนรู้หรือยอมรับภายในใจ', stakes:'ผลเสียที่เกิดขึ้นหากตัวละครล้มเหลว', secret:'ข้อมูลที่ตัวละครปิดบังและอาจเปลี่ยนความสัมพันธ์หรือเนื้อเรื่อง', falseBelief:'ความเชื่อเกี่ยวกับตนเองหรือโลกที่ไม่จริงและขัดขวางการเติบโต', relationshipPattern:'วิธีที่ตัวละครมักสร้าง รักษา หรือทำลายความสัมพันธ์', conflictSource:'บุคคล ระบบ สถานการณ์ หรือข้อจำกัดภายในที่ต่อต้านเป้าหมาย', moralLine:'การกระทำที่ตัวละครเชื่อว่าจะไม่ทำแม้ถูกกดดัน', characterArc:'ทิศทางการเปลี่ยนแปลงตั้งแต่ต้นเรื่องถึงตอนจบ', lieBehavior:'สัญญาณทางคำพูด สีหน้า หรือร่างกายที่เกิดขึ้นเมื่อปิดบังความจริง', pressureBehavior:'พฤติกรรมที่ปรากฏชัดเมื่อเผชิญแรงกดดันสูง', currentHealthCondition:'อาการเฉียบพลันหรือภาวะชั่วคราวที่กำลังมีผลต่อตัวละครในช่วงเวลาของเรื่อง'
  };
  const thaiExact = {
    Woman:'ผู้หญิง', Man:'ผู้ชาย', 'Non-binary person':'บุคคลนอนไบนารี', 'Androgynous person':'บุคคลลักษณะก้ำกึ่งทางเพศ', 'Non-specified':'ไม่ระบุ', Thai:'ไทย', Chinese:'จีน', Japanese:'ญี่ปุ่น', 'South Korean':'เกาหลีใต้', Vietnamese:'เวียดนาม', Filipino:'ฟิลิปปินส์', Indonesian:'อินโดนีเซีย', Malaysian:'มาเลเซีย', Singaporean:'สิงคโปร์', Indian:'อินเดีย', British:'อังกฤษ', French:'ฝรั่งเศส', Italian:'อิตาลี', Spanish:'สเปน', German:'เยอรมัน', Russian:'รัสเซีย', American:'อเมริกัน', Canadian:'แคนาดา', Brazilian:'บราซิล', Mexican:'เม็กซิกัน', Nigerian:'ไนจีเรีย', 'South African':'แอฟริกาใต้', Australian:'ออสเตรเลีย', 'Mixed nationality':'หลายสัญชาติ',
    Baby:'ทารก', Contemporary:'ร่วมสมัย', Casual:'ลำลอง', Elegant:'สง่างาม', Professional:'มืออาชีพ', Confident:'มั่นใจ', Friendly:'เป็นมิตร', Mysterious:'ลึกลับ', Playful:'ขี้เล่น', Calm:'สุขุม', Serious:'จริงจัง', Happy:'มีความสุข', Focused:'มีสมาธิ', Sad:'เศร้า', Angry:'โกรธ', Hopeful:'มีความหวัง', Curious:'อยากรู้อยากเห็น', Vulnerable:'เปราะบาง', White:'ขาว', Black:'ดำ', Beige:'เบจ', Brown:'น้ำตาล', Red:'แดง', Green:'เขียว', Purple:'ม่วง', Gold:'ทอง', None:'ไม่มี', 'No makeup':'ไม่แต่งหน้า', 'Natural makeup':'แต่งหน้าแบบธรรมชาติ', 'No beauty retouching':'ไม่รีทัชเพื่อความงาม', 'Minimal retouching':'รีทัชน้อยที่สุด', 'Natural photorealism':'สมจริงแบบภาพถ่ายธรรมชาติ', 'Documentary realism':'สมจริงแบบสารคดี', 'Editorial portrait realism':'สมจริงแบบภาพพอร์ตเทรตนิตยสาร', 'Candid snapshot realism':'สมจริงแบบภาพแคนดิด', 'Unretouched RAW-photo realism':'สมจริงแบบภาพ RAW ไม่รีทัช'
  };
  Object.assign(thaiExact, {
    'Subtle natural facial asymmetry':'ใบหน้าซ้ายและขวาแตกต่างกันเล็กน้อยตามธรรมชาติ', 'Slightly uneven eyebrows':'คิ้วสองข้างสูงไม่เท่ากันเล็กน้อย', 'Slightly asymmetric eyes':'รูปทรงดวงตาสองข้างต่างกันเล็กน้อย', 'Subtle uneven smile':'มุมปากสองข้างยกไม่เท่ากันเล็กน้อย', 'Naturally asymmetric jawline':'แนวกรามซ้ายและขวาไม่สมมาตรตามธรรมชาติ',
    'Visible natural pores':'มองเห็นรูขุมขนตามธรรมชาติ', 'Fine facial hair and peach fuzz':'มีขนอ่อนละเอียดบนใบหน้า', 'Subtle skin texture variation':'พื้นผิวแต่ละส่วนแตกต่างกันเล็กน้อย', 'Tiny natural blemishes':'มีรอยผิวเล็ก ๆ ตามธรรมชาติ', 'Realistic pores and fine lines':'มีรูขุมขนและริ้วเส้นเล็กที่สมจริง', 'Natural under-eye texture':'มีพื้นผิวใต้ตาตามธรรมชาติ', 'Subtle under-eye shadows':'มีเงาใต้ตาบาง ๆ', 'Fine under-eye lines':'มีริ้วเส้นละเอียดใต้ตา', 'Slight natural eye bags':'มีถุงใต้ตาเล็กน้อยตามธรรมชาติ', 'Minimal under-eye detail':'รายละเอียดใต้ตาเพียงเล็กน้อย',
    'Subtle redness around nose and cheeks':'มีสีแดงระเรื่อบริเวณจมูกและแก้ม', 'Natural uneven skin tone':'สีผิวไม่สม่ำเสมอเล็กน้อยตามธรรมชาติ', 'Faint sun spots':'มีจุดแดดจาง ๆ', 'Subtle capillaries':'มองเห็นเส้นเลือดฝอยบาง ๆ', 'Natural color variation':'สีผิวแต่ละบริเวณแตกต่างกันตามธรรมชาติ', 'Natural off-white teeth':'ฟันสีขาวนวลตามธรรมชาติ', 'Slightly imperfect teeth':'แนวฟันไม่สมบูรณ์แบบเล็กน้อย', 'Subtle tooth-size variation':'ขนาดฟันแต่ละซี่ต่างกันเล็กน้อย', 'Natural smile with realistic gums':'รอยยิ้มธรรมชาติและเห็นเหงือกอย่างสมจริง', 'Closed-mouth expression':'สีหน้าที่ปิดริมฝีปาก',
    'Natural moist eyes':'ดวงตามีความชุ่มชื้นตามธรรมชาติ', 'Visible iris texture':'มองเห็นลวดลายของม่านตา', 'Subtle sclera veins':'เห็นเส้นเลือดเล็ก ๆ บริเวณตาขาว', 'Natural catchlights':'มีแสงสะท้อนในดวงตาตามธรรมชาติ', 'Slight eye color variation':'สีม่านตาไล่ระดับเล็กน้อย', 'Barely-there makeup':'แต่งหน้าอ่อนมากจนเกือบเหมือนไม่แต่ง', 'Realistic textured makeup':'เห็นพื้นผิวเครื่องสำอางอย่างสมจริง', 'Unretouched skin finish':'คงพื้นผิวจริงโดยไม่รีทัช', 'Preserve pores and fine lines':'เก็บรูขุมขนและริ้วเส้นละเอียดไว้', 'Preserve blemishes and asymmetry':'เก็บรอยผิวและความไม่สมมาตรไว้', 'Avoid skin smoothing':'ไม่ปรับผิวให้เรียบเนียนเกินจริง',
    'Real camera portrait':'ภาพพอร์ตเทรตจากกล้องจริง', 'Candid available-light photo':'ภาพแคนดิดที่ใช้แสงจากสถานที่จริง', '85mm portrait photograph':'ภาพพอร์ตเทรตจากเลนส์ 85 มม.', '50mm environmental portrait':'ภาพบุคคลพร้อมสภาพแวดล้อมจากเลนส์ 50 มม.', 'Documentary photograph':'ภาพถ่ายสไตล์สารคดี', 'Unposed snapshot':'ภาพถ่ายทันทีโดยไม่จัดท่า',
    'Oval face':'ใบหน้ารูปไข่', 'Round face':'ใบหน้ากลม', 'Square face':'ใบหน้าเหลี่ยม', 'Heart-shaped face':'ใบหน้ารูปหัวใจ', 'Diamond-shaped face':'ใบหน้ารูปเพชร', 'Oblong face':'ใบหน้ายาวทรงสี่เหลี่ยมผืนผ้า', 'Triangular face':'ใบหน้ารูปสามเหลี่ยม', 'Almond-shaped eyes':'ดวงตาทรงอัลมอนด์', 'Round eyes':'ดวงตากลม', 'Hooded eyes':'ดวงตาที่มีชั้นเปลือกตาคลุม', 'Monolid eyes':'ดวงตาชั้นเดียว', 'Deep-set eyes':'ดวงตาลึก', 'Wide-set eyes':'ดวงตาอยู่ห่างกัน', 'Close-set eyes':'ดวงตาอยู่ใกล้กัน', 'Upturned eyes':'หางตายกขึ้น', 'Downturned eyes':'หางตาลง',
    'Porcelain skin':'ผิวขาวมาก', 'Fair skin':'ผิวขาว', 'Light skin':'ผิวขาวอ่อน', 'Light-medium skin':'ผิวขาวปานกลาง', 'Medium skin tone':'ผิวสีกลาง', 'Olive skin':'ผิวโทนมะกอก', 'Tan skin':'ผิวสีแทน', 'Brown skin':'ผิวสีน้ำตาล', 'Deep brown skin':'ผิวสีน้ำตาลเข้ม', 'Deep skin tone':'ผิวสีเข้ม'
  });
  const thaiReplacements = [['years old','ปี'],['Natural','เป็นธรรมชาติ'],['natural','ธรรมชาติ'],['Subtle','เล็กน้อย'],['Slightly','เล็กน้อย'],['Realistic','สมจริง'],['realistic','สมจริง'],['Visible','มองเห็น'],['Fine','ละเอียด'],['Soft','นุ่มนวล'],['Defined','คมชัด'],['Long','ยาว'],['Short','สั้น'],['Average','ปานกลาง'],['Large','ใหญ่'],['Small','เล็ก'],['Deep','เข้ม'],['Light','อ่อน'],['Dark','เข้ม'],['Warm','อบอุ่น'],['Cool','โทนเย็น'],['Straight','ตรง'],['Round','กลม'],['Oval','รูปไข่'],['Square','เหลี่ยม'],['Wide','กว้าง'],['Narrow','แคบ'],['Thick','หนา'],['Thin','บาง'],['High','สูง'],['Low','ต่ำ'],['Face','ใบหน้า'],['face','ใบหน้า'],['Eyes','ดวงตา'],['eyes','ดวงตา'],['Eye','ดวงตา'],['eye','ดวงตา'],['Skin','ผิว'],['skin','ผิว'],['Hair','ผม'],['hair','ผม'],['Lips','ริมฝีปาก'],['lips','ริมฝีปาก'],['Nose','จมูก'],['nose','จมูก'],['Teeth','ฟัน'],['teeth','ฟัน'],['Smile','รอยยิ้ม'],['smile','รอยยิ้ม'],['Texture','พื้นผิว'],['texture','พื้นผิว'],['Portrait','พอร์ตเทรต'],['portrait','พอร์ตเทรต'],['Photo','ภาพถ่าย'],['photo','ภาพถ่าย'],['Black','ดำ'],['Brown','น้ำตาล'],['Blue','ฟ้า'],['Green','เขียว'],['White','ขาว'],['Gray','เทา'],['Gold','ทอง'],['Silver','เงิน']];
  function thaiOption(value, fieldId = '') {
    if (!value) return '';
    const translations = window.CHARACTER_THAI_OPTIONS || {};
    const findInField = id => {
      const item = characterSections.flatMap(section => section.fields).find(candidate => candidate.id === id);
      const index = item?.options.indexOf(value) ?? -1;
      return index >= 0 ? translations[id]?.[index] : '';
    };
    if (fieldId) return findInField(fieldId) || 'ไม่พบคำแปลภาษาไทย';
    for (const section of characterSections) {
      for (const item of section.fields) {
        const translated = findInField(item.id);
        if (translated) return translated;
      }
    }
    return 'ไม่พบคำแปลภาษาไทย';
  }
  function thaiOnlyOption(value, fieldId = '') {
    return thaiOption(value, fieldId);
  }
  const characterSections = [
    { n:'01', title:'Identity & Background', subtitle:'ระบุตัวตน สัญชาติ และภูมิหลังให้ชัดเจน', fields:[field('gender','Gender Identity',['Woman','Man','Non-binary person','Androgynous person','Non-specified']),field('age','Exact / Visual Age',['Baby','Child, 6–9 years old','Preteen, 10–12 years old','Teen, 13–17 years old','Young adult, 18–24 years old','25–29 years old','30–39 years old','40–49 years old','50–59 years old','60–69 years old','70+ years old']),field('nationality','Nationality',['Thai','Chinese','Japanese','South Korean','Vietnamese','Filipino','Indonesian','Malaysian','Singaporean','Indian','British','French','Italian','Spanish','German','Russian','American','Canadian','Brazilian','Mexican','Nigerian','South African','Australian','Mixed nationality']),field('ethnicity','Ethnic Background',['Tai / Southeast Asian','Han Chinese','Japanese','Korean','South Asian','Middle Eastern','White / European','Black / African','Latino / Hispanic','Indigenous','Pacific Islander','Mixed ethnicity']),field('birthplace','Place Raised / Cultural Context',['Urban Thailand','Rural Thailand','East Asian metropolis','Southeast Asian coastal town','European capital','North American city','Multicultural household','International upbringing']),field('language','Language / Accent',['Thai speaker','Mandarin speaker','Japanese speaker','Korean speaker','English speaker','Bilingual','Multilingual']),field('occupation','Occupation / Role',['Student','Artist','Doctor','Nurse','Teacher','Engineer','Entrepreneur','Office professional','Chef','Athlete','Model','Musician','Detective','Royalty','Warrior','Scientist']),field('socialBackground','Social Background',['Working-class background','Middle-class background','Affluent background','Aristocratic background','Academic family','Creative family','Military family','Nomadic background'])]},
    { n:'02', title:'Face Anatomy', subtitle:'กำหนดโครงหน้าและสัดส่วนอย่างแม่นยำ', fields:[field('face','Face Shape',['Oval face','Round face','Square face','Heart-shaped face','Diamond-shaped face','Oblong face','Triangular face']),field('faceWidth','Face Width / Proportion',['Narrow face','Average-width face','Broad face','Short midface','Balanced facial thirds','Long midface']),field('cheekbones','Cheekbones / Cheeks',['High cheekbones','Soft cheekbones','Prominent cheekbones','Full cheeks','Hollow cheeks']),field('forehead','Forehead',['Low forehead','Average forehead','High forehead','Broad forehead']),field('chin','Chin',['Small rounded chin','Pointed chin','Broad chin','Cleft chin','Receding chin']),field('jawline','Jawline',['Soft jawline','Defined jawline','Angular jawline','Tapered jawline','Wide jawline'])]},
    { n:'03', title:'Eyes, Nose & Mouth', subtitle:'รายละเอียดจุดเด่นที่ทำให้ใบหน้าจดจำได้', fields:[field('eyes','Eye Shape',['Almond-shaped eyes','Round eyes','Hooded eyes','Monolid eyes','Deep-set eyes','Wide-set eyes','Close-set eyes','Upturned eyes','Downturned eyes']),field('eyeSize','Eye Size',['Small eyes','Medium-sized eyes','Large eyes']),field('eyeColor','Eye Color',['Dark brown eyes','Brown eyes','Amber eyes','Hazel eyes','Green eyes','Blue eyes','Gray eyes','Heterochromia']),field('eyebrows','Eyebrows',['Natural eyebrows','Straight eyebrows','Soft-arched eyebrows','High-arched eyebrows','Thick eyebrows','Thin eyebrows']),field('eyelashes','Eyelashes',['Short natural lashes','Long natural lashes','Thick lashes','Defined lashes']),field('nose','Nose Shape',['Straight nose','Small button nose','Defined nose','Rounded nose','Aquiline nose','Wide nose','Upturned nose','Flat nose bridge']),field('lips','Lip Shape',['Full lips','Thin lips','Cupid’s bow lips','Wide lips','Heart-shaped lips','Soft natural lips']),field('mouthDetails','Mouth Details',['Upturned mouth corners','Downturned mouth corners','Defined philtrum','Slightly parted lips']),field('ears','Ear Details',['Small ears','Average ears','Prominent ears','Attached earlobes','Detached earlobes'])]},
    { n:'04', title:'Skin & Distinctive Marks', subtitle:'สีผิว ผิวสัมผัส ตำหนิ และจุดจดจำของตัวละคร', fields:[field('skinTone','Skin Tone',['Porcelain skin','Fair skin','Light skin','Light-medium skin','Medium skin tone','Olive skin','Tan skin','Brown skin','Deep brown skin','Deep skin tone']),field('undertone','Skin Undertone',['Cool undertone','Neutral undertone','Warm undertone','Golden undertone','Olive undertone']),field('skinDetails','Skin Texture',['Natural skin texture','Visible pores','Smooth skin','Dewy skin','Matte skin','Sun-kissed skin','Fine expression lines','Mature skin'],true),field('distinctiveMarks','Distinctive Marks',['Freckles across nose','Beauty mark under left eye','Beauty mark above lip','Facial scar','Eyebrow scar','Birthmark','Dimples','Vitiligo patches','Tattoos','Piercings'],true)]},
    { n:'05', title:'Hair & Grooming', subtitle:'ทรงผม สีผม หนวดเครา และรายละเอียดเส้นผม', fields:[field('hairLength','Hair Length',['Buzz cut','Very short hair','Short hair','Chin-length hair','Shoulder-length hair','Mid-back hair','Waist-length hair']),field('hairStyle','Hair Style',['Bob cut','Pixie cut','Undercut','Layered hair','Ponytail','High bun','Low bun','Braided hair','Cornrows','Dreadlocks','Loose waves','Slicked-back hair']),field('hairTexture','Hair Texture',['Pin-straight hair','Straight hair','Wavy hair','Curly hair','Coily hair']),field('hairColor','Hair Color',['Jet-black hair','Black hair','Dark brown hair','Chestnut brown hair','Blonde hair','Auburn hair','Red hair','Gray hair','Silver hair','White hair','Fantasy-colored hair']),field('hairPart','Hair Part / Hairline',['Center part','Left side part','Right side part','No visible part','Widow’s peak','Receding hairline']),field('bangs','Bangs',['No bangs','Blunt bangs','Wispy bangs','Curtain bangs','Side-swept bangs']),field('facialHair','Facial Hair',['Clean-shaven','Light stubble','Short beard','Full beard','Goatee','Mustache']),field('hairDetails','Hair Details',['Glossy hair','Soft flyaway hairs','Neatly styled hair','Natural volume','Gray streak','Colored tips','Visible roots'],true)]},
    { n:'06', title:'Body & Physical Detail', subtitle:'สัดส่วน ร่างกาย และลักษณะการเคลื่อนไหว', fields:[field('height','Height',['Very short','Petite','Below-average height','Average height','Above-average height','Tall','Very tall']),field('bodyType','Body Type',['Very slim build','Slim build','Lean build','Athletic build','Average build','Curvy build','Plus-size build','Muscular build','Broad build','Stocky build']),field('proportion','Body Proportion',['Balanced proportions','Long-legged proportions','Short-legged proportions','Long torso','Short torso','Broad shoulders','Narrow shoulders','Wide hips']),field('hands','Hands',['Small delicate hands','Long slender fingers','Strong hands','Calloused hands','Manicured nails','Short natural nails']),field('physicalFeatures','Physical Features',['Defined muscles','Soft physique','Visible collarbones','Long neck','Short neck','Prosthetic limb','Wheelchair user'],true),field('posture','Posture',['Relaxed posture','Upright posture','Confident posture','Graceful posture','Slight slouch','Rigid posture']),field('movement','Movement Style',['Graceful movement','Energetic movement','Measured movement','Athletic movement','Quiet movement','Commanding movement'])]},
    { n:'07', title:'Wardrobe', subtitle:'เสื้อผ้า สี วัสดุ และรายละเอียดการแต่งตัวครบชุด', fields:[field('era','Era / Setting',['Contemporary','1990s','1980s','1960s','Victorian era','Ancient era','Medieval fantasy','Near future','Far future']),field('fashion','Fashion Style',['Casual','Smart casual','Minimalist','Elegant','Streetwear','Professional','Old money','Bohemian','Avant-garde','Traditional','Techwear','Gothic','Fantasy']),field('top','Top',['White shirt','Tailored blazer','T-shirt','Silk blouse','Knit sweater','Leather jacket','Hoodie','Traditional top','Armor']),field('bottom','Bottom',['Tailored trousers','Jeans','Cargo pants','Pleated skirt','Pencil skirt','Shorts','Traditional lower garment']),field('dress','Dress',['No dress','Mini dress','Midi dress','Maxi dress','Cocktail dress','Evening gown','Traditional dress']),field('outerwear','Outerwear',['No outerwear','Trench coat','Long coat','Cardigan','Cape','Bomber jacket']),field('shoes','Shoes',['Sneakers','Loafers','High heels','Ankle boots','Combat boots','Sandals','Barefoot']),field('accessories','Accessories',['Minimal jewelry','Eyeglasses','Sunglasses','Watch','Earrings','Necklace','Rings','Handbag','Backpack','Hat','Headscarf','Hair ornament'],true),field('mainColor','Main Color',['White','Black','Charcoal','Beige','Brown','Navy blue','Sky blue','Pastel pink','Red','Burgundy','Green','Purple','Gold']),field('accentColor','Accent Color',['No accent color','White accents','Black accents','Gold accents','Silver accents','Red accents','Blue accents','Green accents']),field('material','Main Material',['Cotton','Linen','Silk','Satin','Denim','Leather','Wool','Velvet','Chiffon','Technical fabric']),field('fit','Garment Fit',['Tailored fit','Relaxed fit','Oversized fit','Slim fit','Flowing silhouette','Structured silhouette'])]},
    { n:'08', title:'Personality & Inner Life', subtitle:'แรงขับ บุคลิก จุดแข็ง และความขัดแย้งภายใน', fields:[field('personality','Core Personality',['Confident','Friendly','Elegant','Mysterious','Playful','Professional','Calm','Serious','Introverted','Extroverted','Compassionate','Ambitious','Rebellious','Disciplined','Curious','Cynical'],true),field('archetype','Character Archetype',['The Hero','The Mentor','The Rebel','The Caregiver','The Explorer','The Creator','The Ruler','The Magician','The Innocent','The Everyperson','The Jester','The Lover']),field('strength','Key Strength',['Courageous','Highly intelligent','Emotionally resilient','Charismatic','Observant','Loyal','Resourceful','Creative']),field('flaw','Key Flaw',['Impulsive','Perfectionistic','Distrustful','Stubborn','Naive','Secretive','Overprotective','Proud']),field('motivation','Core Motivation',['Protect loved ones','Seek freedom','Prove their worth','Discover the truth','Create beauty','Gain power','Find belonging','Atone for the past']),field('fear','Deepest Fear',['Failure','Abandonment','Loss of control','Being powerless','Being forgotten','Hurting loved ones','The unknown']),field('energy','Social Energy',['Quiet presence','Warm approachable energy','Magnetic presence','Intimidating presence','Playful energy','Reserved energy'])]},
    { n:'09', title:'Expression & Performance', subtitle:'สีหน้า สายตา ท่าทาง และอารมณ์ขณะอยู่ในภาพ', fields:[field('expression','Primary Expression',['Neutral expression','Warm smile','Soft smile','Serious expression','Confident expression','Subtle smirk','Joyful laugh','Concerned expression','Melancholic expression','Determined expression']),field('gaze','Gaze Direction / Quality',['Direct eye contact','Looking off-camera','Looking downward','Looking upward','Intense gaze','Gentle gaze','Distant gaze']),field('gesture','Signature Gesture',['Hands relaxed at sides','Arms crossed','One hand in pocket','Hands clasped','Touching hair','Adjusting glasses','Holding an object','Open welcoming gesture']),field('emotionalState','Current Emotion',['Calm','Happy','Excited','Focused','Tense','Sad','Angry','Hopeful','Curious','Vulnerable']),field('voice','Voice Quality',['Soft-spoken voice','Warm voice','Deep resonant voice','Clear confident voice','Gentle voice','Raspy voice','Energetic voice'])]},
    { n:'10', title:'Signature Identity', subtitle:'จุดเด่นและพร็อพที่สะท้อนตัวตนของตัวละคร', fields:[field('signatureFeature','Signature Visual Features',['Distinctive hairstyle','Unique eye color','Signature glasses','Facial beauty mark','Recognizable scar','Signature earrings','Iconic jacket','Unique tattoo','Characteristic color palette'],true),field('signatureProp','Signature Prop',['No signature prop','Leather notebook','Camera','Sword','Medical bag','Umbrella','Headphones','Walking cane','Musical instrument'])]},
    { n:'11', title:'Human Realism', subtitle:'ลดลักษณะหน้าแบบ AI และเพิ่มความเป็นมนุษย์จริง', fields:[field('realismLevel','Realism Level',['Natural photorealism','Documentary realism','Editorial portrait realism','Candid snapshot realism','Unretouched RAW-photo realism']),field('facialAsymmetry','Natural Facial Asymmetry',['Subtle natural facial asymmetry','Slightly uneven eyebrows','Slightly asymmetric eyes','Subtle uneven smile','Naturally asymmetric jawline']),field('microTexture','Skin Micro-texture',['Visible natural pores','Fine facial hair and peach fuzz','Subtle skin texture variation','Tiny natural blemishes','Realistic pores and fine lines'],true),field('underEye','Under-eye Detail',['Natural under-eye texture','Subtle under-eye shadows','Fine under-eye lines','Slight natural eye bags','Minimal under-eye detail']),field('complexionVariation','Complexion Variation',['Subtle redness around nose and cheeks','Natural uneven skin tone','Faint sun spots','Subtle capillaries','Natural color variation']),field('teethRealism','Teeth Realism',['Natural off-white teeth','Slightly imperfect teeth','Subtle tooth-size variation','Natural smile with realistic gums','Closed-mouth expression']),field('eyeRealism','Eye Realism',['Natural moist eyes','Visible iris texture','Subtle sclera veins','Natural catchlights','Slight eye color variation']),field('makeupFinish','Makeup / Finish',['No makeup','Barely-there makeup','Natural makeup','Realistic textured makeup','Unretouched skin finish']),field('retouching','Retouching Level',['No beauty retouching','Minimal retouching','Preserve pores and fine lines','Preserve blemishes and asymmetry','Avoid skin smoothing']),field('captureStyle','Natural Capture Style',['Real camera portrait','Candid available-light photo','85mm portrait photograph','50mm environmental portrait','Documentary photograph','Unposed snapshot'])]},
    { n:'12', title:'Psychology & Health', subtitle:'มิติทางจิตใจ สุขภาพ และข้อจำกัดของตัวละครอย่างเคารพและสมจริง', fields:[field('coreValues','Core Values',['Family','Freedom','Justice','Loyalty','Achievement','Knowledge','Creativity','Compassion','Security','Tradition','Spirituality','Independence'],true),field('coreWound','Core Emotional Wound',['None specified','Fear of abandonment','Past betrayal','Loss of a loved one','Emotional neglect','Public humiliation','Failure with lasting consequences','Loss of identity','Displacement from home','Survivor guilt','Broken trust']),field('attachmentStyle','Attachment Style',['Secure attachment','Anxious attachment','Avoidant attachment','Fearful-avoidant attachment','Not specified']),field('emotionalRegulation','Emotional Regulation',['Emotionally well-regulated','Suppresses emotions','Expresses emotions openly','Becomes overwhelmed easily','Processes emotions slowly','Uses humor to regulate emotions','Intellectualizes emotions','Needs solitude to recover']),field('stressResponse','Stress Response',['Calm problem-solving','Fight response','Flight response','Freeze response','People-pleasing response','Hypervigilance','Emotional shutdown','Restlessness','Irritability under stress']),field('defenseMechanisms','Defense Mechanisms',['Humor','Denial','Avoidance','Rationalization','Intellectualization','Projection','Displacement','Compartmentalization','Sublimation','Emotional detachment'],true),field('copingStrategies','Coping Strategies',['Talking to trusted people','Creative expression','Exercise','Meditation','Structured planning','Problem-solving','Seeking professional support','Spending time alone','Comfort routines','Overworking','Avoiding the problem'],true),field('decisionStyle','Decision-making Style',['Analytical','Intuitive','Impulsive','Cautious','Collaborative','Decisive','Emotion-led','Risk-averse']),field('socialTrust','Trust & Boundaries',['Trusts others gradually','Trusts easily','Highly guarded','Strong personal boundaries','Weak personal boundaries','Difficulty asking for help','Protective of privacy','Open and transparent']),field('selfImage','Self-image',['Healthy self-esteem','Quiet confidence','Insecure self-image','Perfectionistic self-image','Body-conscious','Feels undeserving','Identity in transition','Strong sense of self']),field('psychologicalConflict','Inner Conflict',['Duty versus desire','Freedom versus security','Love versus self-protection','Ambition versus relationships','Truth versus loyalty','Forgiveness versus revenge','Identity versus expectations','Control versus vulnerability','No major inner conflict']),field('diagnosedMentalHealth','Diagnosed Mental Health Condition',['No diagnosed condition','Not specified','Anxiety disorder','Major depressive disorder','Persistent depressive disorder','Bipolar disorder','Post-traumatic stress disorder','Obsessive-compulsive disorder','Panic disorder','Social anxiety disorder','Eating disorder','Dissociative disorder','Schizophrenia spectrum disorder','Substance use disorder'],true),field('neurodivergence','Neurodivergence',['No identified neurodivergence','Not specified','Autism spectrum','Attention-deficit / hyperactivity disorder','Dyslexia','Dyspraxia','Dyscalculia','Tourette syndrome','Sensory processing differences'],true),field('chronicCondition','Chronic Health Condition',['No chronic condition','Not specified','Asthma','Arthritis','Migraine','Chronic fatigue syndrome','Fibromyalgia','Cancer in treatment'],true),field('disability','Disability / Accessibility',['No disability specified','Mobility impairment','Visual impairment','Blind','Hearing impairment','Deaf','Speech impairment','Upper-limb difference','Lower-limb difference','Prosthetic limb user','Wheelchair user','Uses a cane','Uses a walker','Uses a service animal'],true),field('painFatigue','Pain & Fatigue',['No ongoing pain or fatigue','Occasional pain','Chronic pain','Low energy','Chronic fatigue','Limited stamina','Pain flare-up','Fatigue after exertion']),field('allergies','Allergies',['No known allergies','Food allergy','Medication allergy','Pollen allergy','Dust allergy','Animal allergy','Skin allergy','Severe allergic reaction risk'],true),field('sleepPattern','Sleep Pattern',['Restful sleeper','Light sleeper','Short sleeper','Long sleeper','Irregular sleep schedule','Insomnia','Frequent nightmares','Often sleep-deprived']),field('visibleHealthImpact','Visible Health Impact',['No visible health impact','Subtle fatigue','Pale complexion','Under-eye shadows','Visible medical device','Healing surgical scar','Hair loss from treatment','Limited range of motion','Shortness of breath after exertion'],true),field('supportNeeds','Support & Care',['No support needed','Regular medication','Therapy or counseling','Routine medical monitoring','Mobility assistance','Communication support','Sensory accommodations','Caregiver support','Rest breaks','Structured daily routine'],true)]}
  ];
  [window.CHARACTER_EXTRA_OPTIONS || {}, window.CHARACTER_COMPREHENSIVE_OPTIONS || {}, window.CHARACTER_DEEP_OPTIONS || {}, window.CHARACTER_PLAY_OPTIONS || {}, window.CHARACTER_VISUAL_OPTIONS || {}, window.CHARACTER_FASHION_OPTIONS || {}, window.CHARACTER_PERFORMANCE_OPTIONS || {}, window.CHARACTER_CREATURE_OPTIONS || {}, window.CHARACTER_HEALTH_OPTIONS || {}, window.CHARACTER_UNUSUAL_JOBS || {}].forEach(optionSet => {
    Object.entries(optionSet).forEach(([fieldId, pairs]) => {
      const target = characterSections.flatMap(section => section.fields).find(item => item.id === fieldId);
      if (!target || !Array.isArray(pairs)) return;
      const existing = new Set(target.options);
      const additions = pairs.filter(([english]) => english && !existing.has(english));
      target.options.push(...additions.map(([english]) => english));
      if (window.CHARACTER_THAI_OPTIONS) {
        window.CHARACTER_THAI_OPTIONS[fieldId] = [
          ...(window.CHARACTER_THAI_OPTIONS[fieldId] || []),
          ...additions.map(([, thai]) => thai)
        ];
      }
    });
  });
  if (Array.isArray(window.CHARACTER_PORTRAIT_GAZE_OPTIONS)) {
    const gazeField = characterSections.flatMap(section => section.fields).find(item => item.id === 'gaze');
    const pairs = window.CHARACTER_PORTRAIT_GAZE_OPTIONS;
    if (gazeField && pairs.length) {
      gazeField.options = pairs.map(([english]) => english);
      if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS.gaze = pairs.map(([, thai]) => thai);
    }
  }
  if (Array.isArray(window.CHARACTER_VISIBLE_EXPRESSION_OPTIONS)) {
    const expressionField = characterSections.flatMap(section => section.fields).find(item => item.id === 'expression');
    const pairs = window.CHARACTER_VISIBLE_EXPRESSION_OPTIONS;
    if (expressionField && pairs.length) {
      expressionField.options = pairs.map(([english]) => english);
      if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS.expression = pairs.map(([, thai]) => thai);
    }
  }
  const worldIdentityOptions = window.WORLD_IDENTITY_OPTIONS || {};
  ['nationality', 'ethnicity'].forEach(fieldId => {
    const pairs = worldIdentityOptions[fieldId];
    const target = characterSections.flatMap(section => section.fields).find(item => item.id === fieldId);
    if (!target || !Array.isArray(pairs) || !pairs.length) return;
    target.options = pairs.map(([english]) => english);
    if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS[fieldId] = pairs.map(([, thai]) => thai);
  });
  const promptTimePeriod = window.SUGAR_PROMPT_DATA?.categories?.find(category => category.id === 'timePeriod');
  if (promptTimePeriod?.options?.length) {
    const eraField = characterSections.flatMap(section => section.fields).find(item => item.id === 'era');
    const seenTerms = new Set();
    const periodOptions = promptTimePeriod.options.filter(option => Number(option.sourceRow) < 244);
    const pastToPresent = periodOptions.filter(option => Number(option.sourceRow) <= 208 || option.term === 'Present Day');
    const futurePeriods = periodOptions.filter(option => Number(option.sourceRow) >= 209 && Number(option.sourceRow) <= 242);
    const eraPairs = [...pastToPresent, ...futurePeriods]
      .filter(option => option.term && !option.isEmptyChoice && !seenTerms.has(option.term) && seenTerms.add(option.term))
      .map(option => {
        const translation = String(option.thaiTranslation || '').trim();
        const explanation = String(option.thaiExplanation || '').trim();
        const thai = translation && explanation && translation !== explanation ? `${translation} — ${explanation}` : translation || explanation;
        return [option.term, thai];
      })
      .filter(([, thai]) => thai);
    if (eraField && eraPairs.length) {
      eraField.options = eraPairs.map(([english]) => english);
      if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS.era = eraPairs.map(([, thai]) => thai);
    }
  }

  const storyFieldPairs = {
    storyRole: [['Protagonist','ตัวเอก'],['Co-protagonist','ตัวเอกร่วม'],['Antagonist','ตัวละครฝ่ายตรงข้าม'],['Deuteragonist','ตัวละครสำคัญลำดับรอง'],['Mentor','ผู้ชี้แนะ'],['Confidant','ผู้รับฟังความลับ'],['Love interest','คนรักหรือเป้าหมายความรัก'],['Rival','คู่แข่ง'],['Ally','พันธมิตร'],['Catalyst character','ผู้จุดชนวนเหตุการณ์'],['Foil character','ตัวละครคู่เปรียบเทียบ'],['Comic relief','ตัวละครสร้างอารมณ์ขัน'],['Tragic figure','ตัวละครโศกนาฏกรรม'],['Witness','พยานเหตุการณ์'],['Unreliable narrator','ผู้เล่าเรื่องที่ไม่น่าเชื่อถือ']],
    externalGoal: [['Protect someone','ปกป้องใครบางคน'],['Win a competition','ชนะการแข่งขัน'],['Solve a mystery','ไขปริศนา'],['Escape danger','หลบหนีจากอันตราย'],['Expose the truth','เปิดเผยความจริง'],['Gain freedom','ได้รับอิสรภาพ'],['Reunite the family','ทำให้ครอบครัวกลับมารวมกัน'],['Achieve professional success','ประสบความสำเร็จในอาชีพ'],['Take revenge','แก้แค้น'],['Prevent a disaster','ป้องกันภัยพิบัติ'],['Find a missing person','ตามหาคนหาย'],['Survive until safety','เอาชีวิตรอดจนถึงที่ปลอดภัย'],['Change an unjust system','เปลี่ยนแปลงระบบที่ไม่ยุติธรรม'],['Recover a lost object','นำสิ่งของที่สูญหายกลับคืน']],
    internalNeed: [['Learn to trust','เรียนรู้ที่จะไว้วางใจ'],['Accept vulnerability','ยอมรับความเปราะบาง'],['Forgive themselves','ให้อภัยตนเอง'],['Let go of control','ปล่อยวางการควบคุม'],['Accept help from others','ยอมรับความช่วยเหลือจากผู้อื่น'],['Face grief honestly','เผชิญความโศกเศร้าอย่างตรงไปตรงมา'],['Develop self-worth','สร้างคุณค่าในตนเอง'],['Choose authenticity','เลือกเป็นตัวเองอย่างแท้จริง'],['Set healthy boundaries','สร้างขอบเขตที่ดีต่อสุขภาพ'],['Take responsibility','ยอมรับความรับผิดชอบ'],['Release the past','ปล่อยอดีต'],['Balance ambition and connection','สร้างสมดุลระหว่างความทะเยอทะยานกับความสัมพันธ์']],
    stakes: [['Loss of a loved one','สูญเสียคนที่รัก'],['Loss of freedom','สูญเสียอิสรภาพ'],['Loss of identity','สูญเสียตัวตน'],['Family separation','ครอบครัวต้องพลัดพราก'],['Public disgrace','เสื่อมเสียชื่อเสียงต่อสาธารณะ'],['Career destruction','อาชีพพังทลาย'],['Community in danger','ชุมชนตกอยู่ในอันตราย'],['Moral corruption','สูญเสียหลักศีลธรรม'],['Permanent isolation','ต้องอยู่อย่างโดดเดี่ยวถาวร'],['Loss of home','สูญเสียบ้าน'],['Legal consequences','ได้รับผลทางกฎหมาย'],['Irreversible physical harm','เกิดอันตรายทางร่างกายที่ย้อนคืนไม่ได้']],
    secret: [['Hidden identity','ปิดบังตัวตนที่แท้จริง'],['Secret relationship','ปิดบังความสัมพันธ์'],['Past crime','ปิดบังอาชญากรรมในอดีต'],['Unknown family connection','ปิดบังความเกี่ยวพันทางครอบครัว'],['Secret illness','ปิดบังอาการเจ็บป่วย'],['Hidden financial trouble','ปิดบังปัญหาทางการเงิน'],['False professional credentials','ปิดบังคุณสมบัติทางอาชีพที่ไม่จริง'],['Witnessed a crucial event','เคยเห็นเหตุการณ์สำคัญแต่ไม่เปิดเผย'],['Secret act of betrayal','ปิดบังการทรยศ'],['Hidden act of sacrifice','ปิดบังการเสียสละที่เคยทำ'],['Secret double life','ใช้ชีวิตสองด้านอย่างลับ ๆ'],['No major secret','ไม่มีความลับสำคัญ']],
    falseBelief: [['I am unlovable','เชื่อว่าตนไม่คู่ควรกับความรัก'],['Trust always leads to betrayal','เชื่อว่าความไว้ใจนำไปสู่การทรยศเสมอ'],['Control prevents all pain','เชื่อว่าการควบคุมป้องกันความเจ็บปวดได้ทั้งหมด'],['Worth depends on achievement','เชื่อว่าคุณค่าของตนขึ้นอยู่กับความสำเร็จ'],['Emotions are weakness','เชื่อว่าอารมณ์คือความอ่อนแอ'],['I must solve everything alone','เชื่อว่าต้องแก้ทุกอย่างเพียงลำพัง'],['People never truly change','เชื่อว่าคนไม่มีวันเปลี่ยนแปลง'],['Love must be earned','เชื่อว่าต้องทำบางอย่างจึงจะได้รับความรัก'],['Failure defines the whole person','เชื่อว่าความล้มเหลวครั้งหนึ่งกำหนดคุณค่าทั้งชีวิต'],['Safety requires invisibility','เชื่อว่าต้องไม่โดดเด่นจึงจะปลอดภัย'],['No major false belief','ไม่มีความเชื่อผิดสำคัญ']],
    relationshipPattern: [['Protective but emotionally distant','ชอบปกป้องแต่ห่างเหินทางอารมณ์'],['Quick intimacy then withdrawal','สนิทเร็วแล้วถอยห่าง'],['Caretakes others while neglecting self','ดูแลผู้อื่นจนละเลยตนเอง'],['Competes for affection','แข่งขันเพื่อให้ได้รับความรัก'],['Uses humor to avoid intimacy','ใช้อารมณ์ขันหลีกเลี่ยงความใกล้ชิด'],['Loyal after trust is earned','ภักดีเมื่ออีกฝ่ายได้รับความไว้วางใจแล้ว'],['Tests people before trusting','ทดสอบผู้อื่นก่อนให้ความไว้ใจ'],['Avoids difficult conversations','หลีกเลี่ยงบทสนทนาที่ยาก'],['Over-functions in relationships','รับภาระในความสัมพันธ์มากเกินไป'],['Builds mutual secure connection','สร้างความสัมพันธ์ที่มั่นคงร่วมกัน']],
    conflictSource: [['Powerful individual opponent','บุคคลที่มีอำนาจเป็นฝ่ายตรงข้าม'],['Oppressive institution','สถาบันที่กดขี่'],['Family expectations','ความคาดหวังของครอบครัว'],['Social prejudice','อคติทางสังคม'],['Scarcity of resources','ทรัพยากรขาดแคลน'],['Past consequences returning','ผลจากอดีตย้อนกลับมา'],['Competing moral duties','หน้าที่ทางศีลธรรมที่ขัดกัน'],['Internal fear and avoidance','ความกลัวและการหลีกเลี่ยงภายในตน'],['Environmental danger','อันตรายจากสภาพแวดล้อม'],['Misinformation and secrecy','ข้อมูลผิดและการปิดบัง'],['Time pressure','ข้อจำกัดด้านเวลา'],['No clear external enemy','ไม่มีศัตรูภายนอกที่ชัดเจน']],
    moralLine: [['Will not harm a child','ไม่ทำร้ายเด็ก'],['Will not betray family','ไม่ทรยศครอบครัว'],['Will not kill','ไม่ฆ่าใคร'],['Will not abandon a dependent person','ไม่ทอดทิ้งผู้ที่ต้องพึ่งพา'],['Will not frame an innocent person','ไม่ใส่ร้ายผู้บริสุทธิ์'],['Will not exploit the vulnerable','ไม่เอาเปรียบผู้เปราะบาง'],['Will not surrender personal freedom','ไม่ยอมสละอิสรภาพของตน'],['Believes any action is justified','เชื่อว่าทุกการกระทำยอมรับได้หากบรรลุเป้าหมาย'],['Moral line changes during the story','เส้นศีลธรรมเปลี่ยนไประหว่างเรื่อง']],
    characterArc: [['Positive growth arc','เส้นเรื่องเติบโตในทางบวก'],['Redemption arc','เส้นเรื่องไถ่บาป'],['Corruption arc','เส้นเรื่องเสื่อมลงทางศีลธรรม'],['Disillusionment arc','เส้นเรื่องสูญเสียภาพฝัน'],['Healing arc','เส้นเรื่องเยียวยา'],['Coming-of-age arc','เส้นเรื่องก้าวสู่วัยผู้ใหญ่'],['Tragic downfall','เส้นเรื่องล่มสลายแบบโศกนาฏกรรม'],['Flat arc that changes the world','ตัวละครคงหลักเดิมแต่เปลี่ยนโลกรอบตัว'],['Circular arc returning to the start','เส้นเรื่องวนกลับสู่จุดเริ่มต้น'],['Open unresolved arc','เส้นเรื่องเปิดที่ยังไม่คลี่คลาย']],
    lieBehavior: [['Avoids eye contact','หลีกเลี่ยงการสบตา'],['Maintains unusually intense eye contact','สบตาแรงผิดปกติ'],['Over-explains details','อธิบายรายละเอียดมากเกินไป'],['Becomes very still','หยุดนิ่งผิดปกติ'],['Touches face or neck','แตะใบหน้าหรือลำคอ'],['Changes the subject','เปลี่ยนหัวข้อสนทนา'],['Uses humor to deflect','ใช้อารมณ์ขันเบี่ยงประเด็น'],['Repeats the question','ทวนคำถามก่อนตอบ'],['Voice becomes overly controlled','ควบคุมน้ำเสียงมากผิดปกติ'],['Shows no consistent tell','ไม่มีสัญญาณตายตัว']],
    pressureBehavior: [['Takes command immediately','เข้าควบคุมสถานการณ์ทันที'],['Freezes and observes','หยุดนิ่งและสังเกต'],['Becomes verbally aggressive','ใช้คำพูดก้าวร้าว'],['Prioritizes protecting others','ให้ความสำคัญกับการปกป้องผู้อื่น'],['Retreats into analysis','ถอยเข้าสู่การวิเคราะห์'],['Makes impulsive decisions','ตัดสินใจโดยหุนหัน'],['Follows established procedure','ทำตามขั้นตอนที่กำหนด'],['Seeks a trusted person','มองหาคนที่ไว้ใจ'],['Uses dark humor','ใช้อารมณ์ขันแบบหม่น'],['Appears calm but dissociates','ภายนอกสงบแต่ภายในตัดขาดจากความรู้สึก']],
    currentHealthCondition: [['No current illness','ไม่มีอาการเจ็บป่วยในปัจจุบัน'],['Common cold','เป็นหวัด'],['Influenza','เป็นไข้หวัดใหญ่'],['High fever','มีไข้สูง'],['Food poisoning','มีอาการอาหารเป็นพิษ'],['Acute migraine attack','มีอาการไมเกรนกำเริบ'],['Asthma flare-up','โรคหอบหืดกำเริบ'],['Allergic reaction','มีอาการแพ้'],['Dehydration','มีภาวะขาดน้ำ'],['Heat exhaustion','มีภาวะเพลียแดด'],['Concussion recovery','กำลังฟื้นตัวจากสมองกระทบกระเทือน'],['Broken arm in cast','แขนหักและใส่เฝือก'],['Sprained ankle','ข้อเท้าแพลง'],['Healing burn injury','กำลังฟื้นตัวจากแผลไฟไหม้'],['Post-surgery recovery','กำลังพักฟื้นหลังผ่าตัด'],['Acute anxiety episode','มีภาวะวิตกกังวลเฉียบพลัน'],['Panic attack recovery','กำลังฟื้นตัวหลังอาการตื่นตระหนก'],['Severe sleep deprivation','อดนอนอย่างรุนแรง'],['Temporary voice loss','สูญเสียเสียงชั่วคราว']]
  };
  const storyEnglishLabels = {
    storyRole:'Story Role', externalGoal:'External Goal', internalNeed:'Internal Need', stakes:'Story Stakes', secret:'Hidden Secret', falseBelief:'False Belief', relationshipPattern:'Relationship Pattern', conflictSource:'Primary Conflict Source', moralLine:'Moral Line', characterArc:'Character Arc', lieBehavior:'Behavior When Lying', pressureBehavior:'Behavior Under Pressure', currentHealthCondition:'Current Health Condition'
  };
  const storyFields = {};
  Object.entries(storyFieldPairs).forEach(([id, pairs]) => {
    storyFields[id] = field(id, storyEnglishLabels[id], pairs.map(([english]) => english));
    if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS[id] = pairs.map(([, thai]) => thai);
  });
  const focusedHealthOptions = {
    visibleHealthImpact: [
      ['No visible health effect','ไม่มีผลต่อร่างกายที่มองเห็น'],
      ['Heavy eyelids and an exhausted expression','หนังตาหนักและสีหน้าอ่อนล้า'],
      ['Pale face and lips','ใบหน้าและริมฝีปากซีด'],
      ['Dark under-eye circles','มีรอยคล้ำใต้ตา'],
      ['Fever-flushed cheeks','แก้มแดงจากอาการไข้'],
      ['Visible hand tremor','มือสั่นอย่างเห็นได้ชัด'],
      ['Sweaty face and damp hair','ใบหน้ามีเหงื่อและผมชื้น'],
      ['Patchy hair loss','ผมร่วงเป็นหย่อม'],
      ['Complete scalp hair loss from treatment','ผมบนศีรษะร่วงทั้งหมดจากการรักษา'],
      ['Visible vitiligo patches','มีรอยด่างขาวที่มองเห็นได้'],
      ['Visible psoriasis plaques','มีผื่นหนาจากโรคสะเก็ดเงิน'],
      ['Rosacea redness across cheeks and nose','แก้มและจมูกแดงจากโรคผิวหน้าแดง'],
      ['Yellow skin and yellowed eye whites','ผิวและตาขาวมีสีเหลือง'],
      ['Ascites with a visibly swollen abdomen','ท้องมานทำให้หน้าท้องบวมโต'],
      ['One visibly swollen leg','ขาข้างหนึ่งบวมอย่างเห็นได้ชัด'],
      ['Swollen ankles and feet','ข้อเท้าและเท้าบวม'],
      ['Multiple visible bruises on the skin','มีรอยช้ำหลายแห่งบนผิวหนัง'],
      ['Healing abdominal surgery scar','มีแผลผ่าตัดบริเวณหน้าท้องที่กำลังหาย'],
      ['Long surgical scar along one leg','มีแผลผ่าตัดยาวตามแนวขาข้างหนึ่ง'],
      ['Healed burn scar with uneven texture','มีแผลไฟไหม้ที่หายแล้วและพื้นผิวไม่เรียบ'],
      ['Localized skin discoloration after radiation treatment','ผิวบริเวณฉายรังสีมีสีเปลี่ยนไป'],
      ['Visible loss of muscle mass','มวลกล้ามเนื้อลดลงอย่างเห็นได้ชัด'],
      ['One arm held close with limited movement','แนบแขนข้างหนึ่งกับลำตัวและเคลื่อนไหวจำกัด'],
      ['Leaning forward while catching breath','โน้มตัวไปข้างหน้าขณะพักหายใจ'],
      ['Injection-site scars on the forearm','มีรอยแผลจากการฉีดบริเวณท่อนแขน'],
      ['Dry cracked lips and dull dehydrated skin','ริมฝีปากแห้งแตกและผิวดูแห้งจากภาวะขาดน้ำ'],
      ['Deeply sunken tired eyes','ดวงตาลึกและดูอ่อนล้าอย่างชัดเจน'],
      ['Puffy eyelids','เปลือกตาบวม'],
      ['Visible facial swelling','ใบหน้าบวมอย่างเห็นได้ชัด'],
      ['Bluish lips and fingertips','ริมฝีปากและปลายนิ้วมีสีอมฟ้า'],
      ['Bloodshot watery eyes','ดวงตาแดงก่ำและมีน้ำตา'],
      ['Raised hives across visible skin','มีผื่นลมพิษนูนบนผิวที่มองเห็น'],
      ['Dry inflamed eczema patches','มีผื่นผิวหนังอักเสบแห้งและแดง'],
      ['Inflamed cystic acne','มีสิวอักเสบชนิดเป็นก้อน'],
      ['Butterfly-shaped facial rash','มีผื่นรูปผีเสื้อพาดแก้มและสันจมูก'],
      ['Bruising beneath both eyes after an injury','มีรอยช้ำใต้ดวงตาทั้งสองข้างจากการบาดเจ็บ'],
      ['Healing stitches on the scalp','มีรอยเย็บที่กำลังหายบนหนังศีรษะ'],
      ['Sterile dressing over an abdominal wound','มีผ้าปิดแผลปลอดเชื้อบริเวณหน้าท้อง'],
      ['Arm immobilized in a hard cast','แขนถูกตรึงด้วยเฝือกแข็ง'],
      ['Lower leg immobilized in a hard cast','ขาท่อนล่างถูกตรึงด้วยเฝือกแข็ง'],
      ['Compression bandage wrapped around one knee','มีผ้ายืดพันรอบหัวเข่าข้างหนึ่ง'],
      ['Shaved scalp patch with a healing surgical scar','มีบริเวณโกนผมพร้อมแผลผ่าตัดที่กำลังหาย'],
      ['Prominent varicose veins on the legs','เห็นเส้นเลือดขอดเด่นชัดบริเวณขา'],
      ['Rounded clubbing at the fingertips','ปลายนิ้วปุ้มและโค้งมนอย่างเห็นได้ชัด'],
      ['Visible swelling at the front of the neck','มีอาการบวมที่ด้านหน้าของลำคออย่างเห็นได้ชัด']
    ],
    disability: [
      ['No visible assistive device','ไม่มีอุปกรณ์ช่วยที่มองเห็น'],
      ['Manual wheelchair','ใช้รถเข็นแบบใช้มือหมุนล้อ'],
      ['Powered wheelchair','ใช้รถเข็นไฟฟ้า'],
      ['Wheelchair user who can stand or walk short distances','ใช้รถเข็นแต่สามารถยืนหรือเดินระยะสั้นได้'],
      ['White mobility cane','ใช้ไม้เท้าขาวสำหรับนำทาง'],
      ['Single-point walking cane','ใช้ไม้เท้าช่วยเดินแบบขาเดียว'],
      ['Pair of forearm crutches','ใช้ไม้ค้ำยันปลายแขนสองข้าง'],
      ['Pair of underarm crutches','ใช้ไม้ค้ำยันรักแร้สองข้าง'],
      ['Four-legged walking frame','ใช้โครงช่วยเดินสี่ขา'],
      ['Wheeled walker with a seat','ใช้รถช่วยเดินแบบมีล้อและที่นั่ง'],
      ['Below-knee prosthetic leg','ใช้ขาเทียมใต้เข่า'],
      ['Above-knee prosthetic leg','ใช้ขาเทียมเหนือเข่า'],
      ['Upper-arm prosthesis','ใช้แขนเทียมเหนือข้อศอก'],
      ['Prosthetic hand','ใช้มือเทียม'],
      ['Behind-the-ear hearing aids','ใส่เครื่องช่วยฟังหลังใบหู'],
      ['Visible cochlear implant processor','มีเครื่องประมวลผลประสาทหูเทียมที่มองเห็น'],
      ['Tablet-based communication device','ใช้แท็บเล็ตช่วยสื่อสาร'],
      ['Service dog wearing a working harness','มีสุนัขช่วยเหลือสวมสายรัดสำหรับปฏิบัติงาน'],
      ['Rigid knee-and-leg brace','ใส่อุปกรณ์พยุงเข่าและขาแบบแข็ง'],
      ['Wrist-and-hand support brace','ใส่อุปกรณ์พยุงข้อมือและมือ'],
      ['Nasal oxygen cannula','ใช้สายให้ออกซิเจนทางจมูก'],
      ['Continuous glucose monitor on the upper arm','ติดเครื่องตรวจน้ำตาลต่อเนื่องที่ต้นแขน'],
      ['Insulin pump clipped to clothing','ติดเครื่องปั๊มอินซูลินไว้กับเสื้อผ้า'],
      ['Ostomy pouch visible beneath fitted clothing','เห็นรูปทรงถุงหน้าท้องใต้เสื้อผ้ารัดรูป'],
      ['Medical compression stocking on one leg','สวมถุงน่องรัดทางการแพทย์ที่ขาข้างหนึ่ง'],
      ['Sports wheelchair','ใช้รถเข็นสำหรับกีฬา'],
      ['Standing wheelchair','ใช้รถเข็นแบบยืนได้'],
      ['Mobility scooter','ใช้สกู๊ตเตอร์ช่วยการเคลื่อนที่'],
      ['Three-wheeled rollator','ใช้รถช่วยเดินแบบสามล้อ'],
      ['Tripod walking cane','ใช้ไม้เท้าสามขา'],
      ['Single forearm crutch','ใช้ไม้ค้ำยันปลายแขนข้างเดียว'],
      ['Ankle-foot orthosis','ใส่อุปกรณ์พยุงข้อเท้าและเท้า'],
      ['Full-leg orthosis','ใส่อุปกรณ์พยุงขาทั้งขา'],
      ['Spinal support brace','ใส่อุปกรณ์พยุงกระดูกสันหลัง'],
      ['Cervical collar','ใส่เฝือกพยุงคอ'],
      ['Arm sling','ใช้ผ้าคล้องแขน'],
      ['Finger splint','ใส่เฝือกพยุงนิ้วมือ'],
      ['Prosthetic fingers','ใช้นิ้วเทียม'],
      ['Bone-anchored hearing device','ใช้อุปกรณ์ช่วยฟังแบบยึดกับกระดูก'],
      ['Neckloop hearing system','ใช้เครื่องช่วยฟังแบบคล้องคอ'],
      ['Picture communication board','ใช้กระดานภาพช่วยสื่อสาร'],
      ['Electrolarynx','ใช้เครื่องช่วยออกเสียงไฟฟ้า'],
      ['Refreshable Braille display','ใช้จอแสดงผลอักษรเบรลล์'],
      ['Electronic magnifying glasses','สวมแว่นขยายอิเล็กทรอนิกส์'],
      ['Visible feeding-tube port','เห็นช่องสายให้อาหารทางหน้าท้อง']
    ]
  };
  Object.entries(focusedHealthOptions).forEach(([fieldId, pairs]) => {
    const target = characterSections.flatMap(section => section.fields).find(item => item.id === fieldId);
    if (!target) return;
    target.options = pairs.map(([english]) => english);
    if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS[fieldId] = pairs.map(([, thai]) => thai);
  });
  const focusedRealismOptions = {
    realismLevel: [
      ['Natural photorealistic portrait','ภาพพอร์ตเทรตเหมือนภาพถ่ายธรรมชาติ'],
      ['Unretouched documentary portrait','ภาพพอร์ตเทรตสารคดีที่ไม่รีทัช'],
      ['Candid available-light portrait','ภาพพอร์ตเทรตเผลอด้วยแสงที่มีอยู่จริง'],
      ['Editorial fashion portrait with natural skin','ภาพแฟชั่นบรรณาธิการที่ยังคงผิวธรรมชาติ'],
      ['Studio portrait with realistic texture','ภาพพอร์ตเทรตในสตูดิโอที่มีพื้นผิวสมจริง'],
      ['Natural smartphone portrait','ภาพพอร์ตเทรตจากโทรศัพท์ที่ดูเป็นธรรมชาติ'],
      ['Environmental portrait with real-camera detail','ภาพบุคคลในสภาพแวดล้อมพร้อมรายละเอียดแบบกล้องจริง'],
      ['Raw-photo realism','ความสมจริงแบบไฟล์ภาพดิบจากกล้อง']
    ],
    microTexture: [
      ['Visible natural pores','มองเห็นรูขุมขนตามธรรมชาติ'],
      ['Fine facial hair and peach fuzz','มองเห็นขนอ่อนละเอียดบนใบหน้า'],
      ['Tiny natural blemishes','มีรอยเล็กน้อยบนผิวตามธรรมชาติ'],
      ['Fine expression lines','มีริ้วรอยเล็กตามการแสดงสีหน้า'],
      ['Subtle forehead lines','มีริ้วรอยบางบริเวณหน้าผาก'],
      ['Natural under-eye texture','มีพื้นผิวใต้ตาตามธรรมชาติ'],
      ['Subtle under-eye shadows','มีเงาใต้ตาเล็กน้อย'],
      ['Slight natural eye bags','มีถุงใต้ตาตามธรรมชาติเล็กน้อย'],
      ['Slightly uneven eyebrows','คิ้วสองข้างต่างกันเล็กน้อย'],
      ['Slightly asymmetric eyes','ดวงตาสองข้างไม่สมมาตรเล็กน้อย'],
      ['Subtle uneven smile','รอยยิ้มไม่สมมาตรเล็กน้อย'],
      ['Naturally asymmetric jawline','แนวกรามสองข้างต่างกันตามธรรมชาติ'],
      ['Subtle redness around nose and cheeks','มีรอยแดงเล็กน้อยรอบจมูกและแก้ม'],
      ['Natural uneven skin tone','สีผิวไม่สม่ำเสมอตามธรรมชาติ'],
      ['Faint sun spots','มีจุดแดดจางบนผิว'],
      ['Subtle visible capillaries','มองเห็นเส้นเลือดฝอยเล็กน้อย'],
      ['Light acne marks','มีรอยสิวจาง'],
      ['Small healed facial scar','มีแผลเป็นเล็กบนใบหน้าที่หายแล้ว'],
      ['Natural lip texture','มีพื้นผิวริมฝีปากตามธรรมชาติ'],
      ['Slight skin shine in the T-zone','มีความมันเล็กน้อยบริเวณกลางใบหน้า']
    ],
    eyeRealism: [
      ['Visible iris fibers','มองเห็นเส้นใยในม่านตา'],
      ['Natural moist eyes','ดวงตามีความชื้นตามธรรมชาติ'],
      ['Subtle veins in the eye whites','มีเส้นเลือดเล็กในตาขาว'],
      ['Uneven natural catchlights','แสงสะท้อนในดวงตาไม่เท่ากันตามธรรมชาติ'],
      ['Slight variation between both irises','ม่านตาสองข้างมีความต่างเล็กน้อย'],
      ['Natural off-white teeth','ฟันขาวนวลตามธรรมชาติ'],
      ['Slightly uneven teeth','ฟันเรียงไม่เท่ากันเล็กน้อย'],
      ['Subtle tooth-size variation','ขนาดฟันแต่ละซี่ต่างกันเล็กน้อย'],
      ['Natural translucent tooth edges','ปลายฟันมีความโปร่งแสงตามธรรมชาติ'],
      ['Realistic gums visible in the smile','เห็นเหงือกตามธรรมชาติขณะยิ้ม'],
      ['Small natural gap between front teeth','มีช่องว่างเล็กตามธรรมชาติระหว่างฟันหน้า'],
      ['Closed-mouth expression','ปิดปากโดยไม่แสดงฟัน']
    ],
    retouching: [
      ['No makeup and no beauty retouching','ไม่แต่งหน้าและไม่รีทัชเพื่อความงาม'],
      ['Barely-there makeup with visible skin texture','แต่งหน้าเบามากและยังเห็นพื้นผิวผิว'],
      ['Natural makeup with minimal retouching','แต่งหน้าธรรมชาติและรีทัชน้อยที่สุด'],
      ['Textured everyday makeup','แต่งหน้าประจำวันโดยคงพื้นผิวเครื่องสำอาง'],
      ['Editorial makeup with realistic skin','แต่งหน้าแฟชั่นโดยยังคงผิวสมจริง'],
      ['Matte makeup without skin smoothing','แต่งหน้าเนื้อด้านโดยไม่ทำผิวให้เรียบเกินจริง'],
      ['Dewy makeup with natural pores','แต่งหน้าฉ่ำโดยยังเห็นรูขุมขนธรรมชาติ'],
      ['Preserve blemishes and facial asymmetry','คงรอยผิวและความไม่สมมาตรของใบหน้า'],
      ['Preserve pores, fine lines, and under-eye detail','คงรูขุมขน ริ้วรอยเล็ก และรายละเอียดใต้ตา'],
      ['Avoid beauty filters and artificial skin smoothing','ไม่ใช้ฟิลเตอร์ความงามและไม่ทำผิวเรียบแบบเทียม']
    ]
  };
  Object.entries(focusedRealismOptions).forEach(([fieldId, pairs]) => {
    const target = characterSections.flatMap(section => section.fields).find(item => item.id === fieldId);
    if (!target) return;
    target.options = pairs.map(([english]) => english);
    if (window.CHARACTER_THAI_OPTIONS) window.CHARACTER_THAI_OPTIONS[fieldId] = pairs.map(([, thai]) => thai);
  });
  const existingCharacterFields = new Map(characterSections.flatMap(section => section.fields).map(item => [item.id, item]));
  const pickFields = ids => ids.map(id => storyFields[id] || existingCharacterFields.get(id)).filter(Boolean);
  characterSections.splice(0, characterSections.length,
    { n:'01', title:'Quick Character Identity', subtitle:'เริ่มสร้างภาพจากเพศ อายุ สัญชาติ เชื้อชาติ และอาชีพ — เลือกเท่าที่ต้องการ', fields:pickFields(['gender','age','nationality','ethnicity','occupation']) },
    { n:'02', title:'Face, Eyes & Skin', subtitle:'รวมรายละเอียดหน้าตา ดวงตา จมูก ปาก ผิว และตำหนิไว้ในหมวดเดียว', fields:pickFields(['face','faceWidth','cheekbones','forehead','chin','jawline','eyes','eyeSize','eyeColor','eyebrows','eyelashes','nose','lips','mouthDetails','ears','skinTone','undertone','skinDetails','distinctiveMarks']) },
    { n:'03', title:'Hair, Body & Pose', subtitle:'ทรงผม รูปร่าง สัดส่วน มือ และท่าโพสที่มองเห็นในภาพ', fields:pickFields(['hairLength','hairStyle','hairTexture','hairColor','hairPart','bangs','facialHair','hairDetails','height','bodyType','proportion','hands','physicalFeatures','posture']) },
    { n:'04', title:'Wardrobe & Costume', subtitle:'ยุค เสื้อผ้า สี วัสดุ เครื่องประดับ และรูปทรงเครื่องแต่งกาย', fields:pickFields(['era','fashion','top','bottom','dress','outerwear','shoes','accessories','mainColor','accentColor','material','fit']) },
    { n:'05', title:'Expression & Pose', subtitle:'สีหน้าและอารมณ์ที่แสดงออก สายตา และท่าโพสที่ต้องการให้ปรากฏในภาพ', fields:pickFields(['expression','gaze','gesture']).map(item => ({ ...item, label:item.id === 'expression' ? 'Facial Expression & Visible Emotion' : item.label })) },
    { n:'06', title:'Signature Prop', subtitle:'สิ่งของหนึ่งชิ้นที่ช่วยสร้างภาพจำและบอกตัวตนของตัวละคร', fields:pickFields(['signatureProp']) },
    { n:'07', title:'Visible Health & Accessibility', subtitle:'เลือกเฉพาะรายละเอียดสุขภาพหรืออุปกรณ์ช่วยที่ต้องการให้ปรากฏในภาพ', fields:pickFields(['visibleHealthImpact','disability']).map(item => ({ ...item, label:item.id === 'visibleHealthImpact' ? 'Health & Visible Effects' : 'Accessibility & Assistive Devices' })) },
    { n:'08', title:'Visual Realism — Advanced', subtitle:'รวมรายละเอียดสำคัญสำหรับลดหน้าพลาสติกและทำให้ภาพดูเป็นมนุษย์จริง', fields:pickFields(['realismLevel','microTexture','eyeRealism','retouching']).map(item => ({ ...item, multi:['microTexture','eyeRealism'].includes(item.id), label:{ realismLevel:'Realism Style', microTexture:'Natural Face & Skin', eyeRealism:'Natural Eyes & Teeth', retouching:'Makeup & Retouching' }[item.id] })) }
  );
  characterSections.forEach(section => {
    section.fields = section.fields.map(item => ({ ...item, multi:false }));
  });
  Object.assign(fieldThaiLabels, {
    expression:'สีหน้าและอารมณ์ที่แสดงออก',
    realismLevel:'รูปแบบความสมจริง',
    microTexture:'ผิวและใบหน้าตามธรรมชาติ',
    eyeRealism:'ดวงตาและฟันตามธรรมชาติ',
    retouching:'การแต่งหน้าและรีทัช'
  });
  Object.assign(fieldThaiHelp, {
    expression:'เลือกสิ่งที่ต้องการให้เห็นบนใบหน้า โดยรวมอารมณ์กับกล้ามเนื้อใบหน้าไว้ในคำเดียว',
    realismLevel:'เลือกภาพรวมของความสมจริงและลักษณะการถ่ายภาพ',
    microTexture:'เลือกรายละเอียดผิว ใต้ตา และความไม่สมมาตรที่ช่วยให้ใบหน้าดูเป็นมนุษย์',
    eyeRealism:'เลือกรายละเอียดดวงตาและฟันที่ต้องการให้ดูเป็นธรรมชาติ',
    retouching:'เลือกระดับการแต่งหน้าและการเก็บพื้นผิวจริงของใบหน้า'
  });
  const characterLearningGuide = {
    '01': { level:'เริ่มต้น · แนะนำให้ทำ', kind:'essential', note:'สำหรับผู้เรียนทุกคน — เลือกเฉพาะข้อมูลพื้นฐานที่จำเป็นต่อภาพ เช่น อายุ ภาพลักษณ์ทางเพศ เชื้อชาติ สัญชาติ หรืออาชีพ ไม่จำเป็นต้องเลือกครบทุกช่อง' },
    '02': { level:'สร้างภาพ · รูปลักษณ์ใบหน้า', kind:'visual', note:'สำหรับผู้เรียนที่ต้องการกำหนดหน้าตาตัวละครให้ชัดเจน — ยิ่งเลือกมาก ใบหน้าจะยิ่งเฉพาะเจาะจง หากต้องการทดลองเร็วให้เลือกเพียงรูปหน้า ดวงตา สีตา จมูก ริมฝีปาก และสีผิว' },
    '03': { level:'สร้างภาพ · ผม รูปร่าง และท่าโพส', kind:'visual', note:'สำหรับกำหนดภาพรวมตั้งแต่ศีรษะถึงร่างกาย — ผู้เริ่มต้นเลือกแค่ทรงผม สีผม รูปร่าง และท่าโพสก็เพียงพอ' },
    '04': { level:'สร้างภาพ · เครื่องแต่งกาย', kind:'visual', note:'สำหรับออกแบบ Costume และบอกฐานะ อาชีพ ยุคสมัย หรือบุคลิกผ่านเสื้อผ้า — ไม่จำเป็นต้องเลือกทั้งเสื้อท่อนบนและชุดเดรสพร้อมกัน' },
    '05': { level:'สร้างภาพ · สีหน้าและท่าโพส', kind:'performance', note:'เลือกเฉพาะอารมณ์ที่ต้องการเห็นบนใบหน้า ทิศทางสายตา และท่าโพสของร่างกายในภาพนิ่ง' },
    '06': { level:'สร้างภาพ · พร็อพประจำตัว', kind:'performance', note:'เลือกสิ่งของหนึ่งชิ้นที่ตัวละครพก ถือ หรือใช้เป็นประจำ เช่น สมุด กล้อง เครื่องดนตรี กุญแจ หรือของแปลกที่ช่วยสร้างภาพจำ ส่วนแผลเป็น ปาน ทรงผม และเครื่องแต่งกายให้เลือกจากหมวดรูปลักษณ์โดยตรง' },
    '07': { level:'สร้างภาพ · ไม่บังคับ', kind:'sensitive', note:'สำหรับเพิ่มรายละเอียดสุขภาพที่มองเห็นหรืออุปกรณ์ช่วยลงในภาพ โดยไม่ใช้โรคเป็นคำแทนบุคลิกของตัวละคร' },
    '08': { level:'ขั้นสูง · ปรับภาพ AI', kind:'advanced', note:'สำหรับผู้เรียนที่ต้องการลดหน้าพลาสติกและเพิ่มความสมจริงของภาพด้วยรายละเอียดผิว ดวงตา ฟัน แสง และการรีทัช' }
  };
  characterSections.forEach(section => Object.assign(section, characterLearningGuide[section.n] || {}));
  const sceneSections = [
    { n:'01', title:'สถานที่ / Location', subtitle:'เลือกประเภทพื้นที่และสถานที่หลักที่ต้องการสร้าง', fields:[field('locationType','ประเภทสถานที่ / Location Type',['Interior','Exterior','Indoor-outdoor','Nature','Urban','Rural','Underwater','Underground','Sky','Fantasy','Sci-Fi','Historical','Post-apocalyptic','Surreal']),field('location','สถานที่หลัก / Main Location',['Bedroom','Living room','Kitchen','Bathroom','Library','Art studio','Photo studio','Office','Hospital','School classroom','Laboratory','Cafe','Restaurant','Luxury hotel lobby','Museum','Theater stage','Shopping mall','Train station','Airport terminal','Warehouse','Factory','Parking garage','Rooftop','Narrow alley','City street','Town square','Traditional market','Thai temple courtyard','Ancient ruins','Castle hall','Palace garden','Village','Rice field','Tropical forest','Pine forest','Bamboo forest','Misty mountain','Canyon','Cave','Waterfall','Riverbank','Lake shore','Tropical beach','Desert dunes','Snowy tundra','Volcanic landscape','Underwater reef','Floating island','Enchanted forest','Cyberpunk city','Space station','Spaceship interior','Alien planet','Abandoned city'])]},
    { n:'02', title:'รูปแบบและพื้นผิว / Architecture & Surface', subtitle:'เลือกหน้าตาอาคาร วัสดุหลัก และสภาพของสถานที่', fields:[field('architecture','สถาปัตยกรรม / Architecture',['Traditional Thai','Lanna','Ayutthaya-era','Khmer-inspired','Japanese traditional','Chinese traditional','Art Deco','Art Nouveau','Victorian','Gothic','Baroque','Brutalist','Bauhaus','Mid-century modern','Modern tropical','Contemporary minimal','Industrial loft','Mediterranean','Moroccan','Scandinavian','Futuristic organic','Cyberpunk','Steampunk','Solarpunk','Ancient civilization','Fairy-tale fantasy']),field('materials','วัสดุเด่น / Materials',['Natural wood','Dark wood','Bamboo','Exposed brick','Polished concrete','Raw concrete','White marble','Black marble','Sandstone','Weathered stone','Glass walls','Brushed steel','Copper details','Gold details','Ceramic tiles','Woven rattan','Silk fabric','Velvet fabric','Paper screens','Neon acrylic'],true),field('condition','สภาพสถานที่ / Condition',['Pristine and new','Clean and maintained','Lived-in','Weathered','Aged patina','Overgrown','Abandoned','Partially ruined','Flooded','Dust-covered','Fire-damaged','Frozen','Restored historical site'])]},
    { n:'03', title:'เวลาและอากาศ / Time & Weather', subtitle:'เลือกช่วงเวลา ฤดูกาล ท้องฟ้า และสภาพอากาศ', fields:[field('time','ช่วงเวลา / Time of Day',['Blue hour before dawn','Dawn','Early morning','Morning','Late morning','Noon','Afternoon','Golden hour','Sunset','Dusk','Evening','Midnight','Late night','Eternal twilight']),field('weather','สภาพอากาศ / Weather',['Clear sky','Partly cloudy','Overcast','Light drizzle','Heavy rain','Monsoon rain','After rain','Morning mist','Dense fog','Haze','Light snow','Heavy snow','Blizzard','Thunderstorm','Lightning storm','Strong wind','Dust storm','Sandstorm','Heat shimmer','Rainbow after rain']),field('season','ฤดูกาล / Season',['Spring','Summer','Autumn','Winter','Tropical dry season','Tropical rainy season','Monsoon season','Cherry blossom season','Rice harvest season','Festival season']),field('sky','ลักษณะท้องฟ้า / Sky',['Pale blue sky','Deep blue sky','Dramatic clouds','Pink-orange sky','Purple twilight sky','Star-filled sky','Milky Way','Full moon','Crescent moon','Aurora sky','Eclipse','Fantasy nebula sky'])]},
    { n:'04', title:'Scene Depth — ระยะของฉาก', subtitle:'เลือกองค์ประกอบหน้า กลาง และหลังเพื่อสร้างมิติ', fields:[field('foreground','ฉากหน้า / Foreground',['Leaves framing the scene','Flowers','Tall grass','Wet pavement','Stone path','Wooden table edge','Curtains','Door frame','Window frame','Hanging fabric','Glass reflections','Out-of-focus lights','Water droplets on lens','Rocks','Sand patterns','Small decorative objects'],true,'สิ่งที่อยู่ใกล้กล้อง'),field('midground','ฉากกลาง / Midground',['Furniture arrangement','Architectural columns','Central pathway','Reflecting pool','Fountain','Garden beds','Market stalls','Parked bicycles','Empty tables and chairs','Bookshelves','Display cabinets','Ancient statues','Large tree','Bridge','Small boats','Glowing portal'],true,'พื้นที่หลักของฉาก'),field('background','ฉากหลัง / Background',['Large windows','Distant buildings','City skyline','Mountains','Forest layers','Ocean horizon','Cloud layers','Temple rooftops','Castle towers','Ruined structures','Waterfall','Distant islands','Moon','Star field','Interior arches','Endless corridor'],true,'บริบทที่อยู่ไกลออกไป')]},
    { n:'05', title:'Environment Details — รายละเอียดฉาก', subtitle:'เติมของตกแต่ง ธรรมชาติ น้ำ และเอฟเฟกต์ในอากาศ', fields:[field('decor','ของตกแต่ง / Decor',['Indoor plants','Tropical plants','Flower arrangements','Candles','Lanterns','Paper lanterns','String lights','Books','Ceramic pottery','Antique furniture','Minimal furniture','Luxury furniture','Rugs and cushions','Wall paintings','Mirrors','Sculptures','Hanging ornaments','Festival decorations','Vintage signs','Futuristic displays'],true),field('natureDetails','ธรรมชาติ / Nature Details',['Moss-covered surfaces','Climbing vines','Ferns','Wildflowers','Lotus flowers','Cherry blossoms','Falling leaves','Palm trees','Bamboo','Ancient trees','Glowing mushrooms','Bioluminescent plants','Snow-covered branches'],true),field('waterDetails','องค์ประกอบน้ำ / Water',['No water feature','Still pond','Reflecting pool','Gentle stream','River','Waterfall','Ocean waves','Rain puddles','Wet reflective floor','Fountain','Indoor water feature','Underwater caustics'],true),field('atmosphericEffects','เอฟเฟกต์ในอากาศ / Atmospheric Effects',['Clean clear air','Floating dust particles','Soft mist','Low ground fog','Volumetric haze','Light rain streaks','Falling snow','Drifting petals','Falling leaves','Smoke wisps','Steam','Fireflies','Glowing particles','Sparks and embers'],true)]},
    { n:'06', title:'Mood — บรรยากาศ', subtitle:'กำหนดความรู้สึกของฉากโดยไม่มีตัวละคร', fields:[field('mood','อารมณ์ฉาก / Mood & Atmosphere',['Peaceful','Calm','Warm','Cozy','Welcoming','Fresh','Dreamy','Magical','Whimsical','Elegant','Luxurious','Minimal','Sacred','Meditative','Nostalgic','Melancholic','Lonely','Mysterious','Eerie','Haunting','Tense','Dramatic','Epic','Majestic','Romantic','Futuristic','Dystopian','Post-apocalyptic','Surreal'],true)]},
    { n:'07', title:'Lighting — แสง', subtitle:'ควบคุมแหล่งแสง ทิศทาง ความนุ่ม และเอฟเฟกต์', fields:[field('mainLight','แสงหลัก / Main Lighting',['Natural daylight','Soft morning light','Golden-hour sunlight','Sunset backlight','Moonlight','Overcast soft light','Window light','Skylight','Candlelight','Firelight','Lantern light','Warm practical lights','Fluorescent light','Neon lighting','LED strip lighting','Studio softbox','High-key lighting','Low-key lighting','Cinematic lighting','Volumetric light','Bioluminescent glow']),field('lightDirection','ทิศทางแสง / Light Direction',['Front lighting','Side lighting','Backlighting','Top lighting','Underlighting','Window-side lighting','Light shafts from above','Mixed-direction lighting']),field('lightQuality','คุณภาพแสง / Light Quality',['Soft diffused light','Hard direct light','Dappled light','Gentle ambient light','High contrast','Low contrast','Long shadows','Crisp shadows','Soft shadows','Glowing bloom']),field('supportLight','แสงเสริม / Supporting Lighting',['None','Soft fill light','Warm ambient light','Cool ambient light','Rim glow','Practical lights','Volumetric rays','Reflected water light','Neon accents','Candle accents'])]},
    { n:'08', title:'Color — สีและโทน', subtitle:'เลือกพาเลตต์ อุณหภูมิสี และงานเกรดสี', fields:[field('colorTone','โทนสี / Color Tone',['Warm tones','Cool tones','Neutral tones','Earth tones','Jewel tones','Pastel palette','Muted palette','Desaturated colors','Vibrant colors','Monochrome','Black and white','Teal and orange','Blue and gold','Pink and purple','Green and amber','Cream and brown','Red and black']),field('colorTemperature','อุณหภูมิสี / Color Temperature',['Very warm','Warm','Slightly warm','Neutral','Slightly cool','Cool','Mixed warm and cool']),field('colorGrade','การเกรดสี / Color Grading',['Natural color','Cinematic color grading','Film-like color','Vintage faded color','Matte shadows','Rich blacks','Soft highlights','High contrast grade','Dreamy pastel grade','Bleach bypass','Day-for-night grade'])]},
    { n:'09', title:'Camera — กล้องและองค์ประกอบ', subtitle:'กำหนดมุมมอง ระยะภาพ เลนส์ และการจัดองค์ประกอบ', fields:[field('shotType','ระยะภาพ / Shot Type',['Extreme wide shot','Wide establishing shot','Full scene shot','Medium-wide scene shot','Architectural detail shot','Macro environment detail','Panoramic view','Aerial establishing shot']),field('cameraAngle','มุมกล้อง / Camera Angle',['Eye-level','Low angle','High angle','Bird’s-eye view','Worm’s-eye view','Dutch angle','Top-down view','Ground-level view','Symmetrical frontal view','Three-quarter angle']),field('lens','เลนส์ / Lens',['14mm ultra-wide lens','18mm wide-angle lens','24mm wide-angle lens','28mm lens','35mm lens','50mm standard lens','70mm lens','85mm lens','100mm macro lens','Tilt-shift architectural lens','Fisheye lens','Anamorphic lens']),field('composition','องค์ประกอบภาพ / Composition',['Centered composition','Rule of thirds','Leading lines','Perfect symmetry','Asymmetrical balance','Layered composition','Frame within a frame','Deep perspective','Minimal negative space','Large negative space','Vanishing-point composition','Golden ratio composition']),field('depthOfField','ระยะชัด / Depth of Field',['Deep focus','Moderate depth of field','Shallow depth of field','Foreground bokeh','Background bokeh','Tilt-shift focus','Everything sharply detailed'])]},
    { n:'10', title:'Visual Style — สไตล์ภาพ', subtitle:'เลือกชนิดงานภาพ ความสมจริง และคุณภาพผลงาน', fields:[field('visualStyle','สไตล์ภาพ / Visual Style',['Photorealistic photography','Cinematic film still','Documentary photography','Editorial interior photography','Architectural visualization','Luxury real-estate photography','Travel photography','Fine-art photography','35mm film photography','Polaroid aesthetic','Analog film look','Watercolor illustration','Gouache illustration','Oil painting','Ink illustration','Anime background art','Studio Ghibli-inspired background','3D animated film style','Claymation style','Isometric illustration','Low-poly 3D','Pixel art','Concept art','Matte painting','Fantasy environment art','Sci-fi environment concept']),field('detailLevel','ระดับรายละเอียด / Detail Level',['Clean and simple','Minimal detail','Balanced detail','Highly detailed','Intricate detail','Ultra-detailed environment','Large-scale epic detail']),field('aspectRatio','อัตราส่วนภาพ / Aspect Ratio',['Square 1:1','Portrait 4:5','Vertical 9:16','Landscape 4:3','Cinematic 16:9','Ultrawide 21:9','Panoramic 3:1']),field('outputQuality','คุณภาพภาพ / Output Quality',['Natural image quality','Sharp professional image','High dynamic range','Film grain','Fine art print quality','Production concept art quality','Crisp architectural detail'])]}
  ];
  const sceneSectionCopy = {
    '04':['ระยะและมิติ / Scene Depth','เลือกสิ่งที่อยู่ด้านหน้า ตรงกลาง และด้านหลังเพื่อสร้างความลึก'],
    '05':['รายละเอียดภายในฉาก / Environment Details','เพิ่มของตกแต่ง ธรรมชาติ น้ำ และสิ่งที่ลอยอยู่ในอากาศ'],
    '06':['บรรยากาศ / Mood','เลือกความรู้สึกโดยรวมที่ต้องการให้ฉากสื่อออกมา'],
    '07':['แสง / Lighting','เลือกแหล่งกำเนิด ทิศทาง ความนุ่ม และแสงเสริม'],
    '08':['สีและโทน / Color','เลือกชุดสี ความอุ่นเย็น และลักษณะการปรับสี'],
    '09':['กล้องและองค์ประกอบ / Camera','เลือกระยะภาพ มุมกล้อง เลนส์ และการจัดวางภาพ'],
    '10':['รูปแบบภาพ / Visual Style','เลือกชนิดผลงาน ระดับรายละเอียด สัดส่วน และคุณภาพภาพ']
  };
  sceneSections.forEach(section => {
    if (sceneSectionCopy[section.n]) [section.title, section.subtitle] = sceneSectionCopy[section.n];
  });
  const originalSceneSections = Object.fromEntries(sceneSections.map(section => [section.n, section]));
  sceneSections.splice(0, sceneSections.length,
    {
      n:'01',
      title:'สถานที่และรูปแบบ / Place & Design',
      subtitle:'เลือกสถานที่ สถาปัตยกรรม วัสดุ และสภาพแวดล้อมหลัก',
      fields:[...originalSceneSections['01'].fields, ...originalSceneSections['02'].fields]
    },
    {
      n:'02',
      title:'เวลาและบรรยากาศ / Time & Atmosphere',
      subtitle:'กำหนดเวลา อากาศ ฤดูกาล ท้องฟ้า และความรู้สึกของฉาก',
      fields:[...originalSceneSections['03'].fields, ...originalSceneSections['06'].fields]
    },
    {
      n:'03',
      title:'รายละเอียดและมิติ / Detail & Depth',
      subtitle:'จัดสิ่งที่อยู่ด้านหน้า ตรงกลาง ด้านหลัง และรายละเอียดภายในฉาก',
      fields:[...originalSceneSections['04'].fields, ...originalSceneSections['05'].fields]
    },
    {
      n:'04',
      title:'แสงและสี / Light & Color',
      subtitle:'เลือกแหล่งแสง ทิศทาง เงา ชุดสี และลักษณะการปรับสี',
      fields:[...originalSceneSections['07'].fields, ...originalSceneSections['08'].fields]
    },
    {
      n:'05',
      title:'กล้องและรูปแบบภาพ / Camera & Style',
      subtitle:'กำหนดระยะภาพ มุมกล้อง เลนส์ องค์ประกอบ และชนิดผลงาน',
      fields:[...originalSceneSections['09'].fields, ...originalSceneSections['10'].fields]
    }
  );
  const simpleSceneFields = Object.fromEntries(
    Object.values(originalSceneSections).flatMap(section => section.fields).map(item => [item.id, item])
  );
  const useSceneFields = ids => ids.map(id => simpleSceneFields[id]);
  sceneSections.splice(0, sceneSections.length,
    {
      n:'01',
      title:'สถานที่ / Place',
      subtitle:'เลือกสถานที่หลักและสภาพของสถานที่',
      level:'เริ่มต้น · จำเป็น',
      kind:'essential',
      note:'เริ่มจากเลือกสถานที่หลัก 1 แห่ง แล้วเลือกสภาพของสถานที่อีก 1 แบบ เช่น ใหม่ สะอาด เก่า ร้าง หรือเสียหาย เพื่อให้ AI เข้าใจว่าฉากเกิดที่ไหนและสถานที่มีสภาพอย่างไร',
      fields:useSceneFields(['location','condition'])
    },
    {
      n:'02',
      title:'ยุคและปี พ.ศ. / Period',
      subtitle:'เลือกยุคสมัยและปีพุทธศักราชที่ฉากเกิดขึ้น',
      level:'กำหนดช่วงเวลา · เลือกได้',
      kind:'visual',
      note:'เลือกยุคสมัยเพื่อกำหนดภาพรวมของสถาปัตยกรรมและสิ่งแวดล้อม จากนั้นเลือกปี พ.ศ. เมื่อต้องการระบุเวลาให้ชัดขึ้น หากสร้างโลกแฟนตาซีหรือไม่ต้องการล็อกปี สามารถเว้นปี พ.ศ. ได้',
      fields:[
        field('sceneEra','ยุคสมัย / Era',['ยุคก่อนประวัติศาสตร์','อารยธรรมโบราณ','สมัยสุโขทัย','สมัยอยุธยา','สมัยธนบุรี','สมัยรัตนโกสินทร์ตอนต้น','ช่วงเปลี่ยนผ่านสู่ความทันสมัย','ยุคหลังสงครามโลก','ยุคร่วมสมัย','อนาคตอันใกล้','อนาคตอันไกล']),
        field('buddhistYear','ปีพุทธศักราช / Buddhist Era Year',['พ.ศ. 1800','พ.ศ. 1900','พ.ศ. 2000','พ.ศ. 2100','พ.ศ. 2200','พ.ศ. 2300','พ.ศ. 2400','พ.ศ. 2450','พ.ศ. 2500','พ.ศ. 2520','พ.ศ. 2540','พ.ศ. 2560','พ.ศ. 2569','พ.ศ. 2600']),
        field('christianYear','ปีก่อน–หลังคริสต์ศักราช / BC–AD Year',[])
      ]
    },
    {
      n:'03',
      title:'เวลาและบรรยากาศ / Time & Atmosphere',
      subtitle:'เลือกช่วงเวลาของวันและความรู้สึกที่ต้องการให้ฉากสื่อออกมา',
      level:'สร้างอารมณ์ · แนะนำให้เลือก',
      kind:'performance',
      note:'เลือกเวลา 1 ค่าและอารมณ์ฉาก 1 แบบ เวลาจะส่งผลต่อแสงและสี ส่วนบรรยากาศจะกำหนดความรู้สึกของภาพ เช่น สงบ อบอุ่น ลึกลับ วังเวง หรือตึงเครียด',
      fields:useSceneFields(['time','mood'])
    },
    {
      n:'04',
      title:'แรงบันดาลใจจากภาพยนตร์ / Film Inspiration',
      subtitle:'เลือกภาพยนตร์อ้างอิงเพื่อช่วยกำหนดภาพรวมของฉาก โดยไม่คัดลอกฉากเดิม',
      level:'ตัวช่วยเสริม · ไม่บังคับ',
      kind:'advanced',
      note:'เลือกหนังฮอลลีวูดหรือหนังไทยเพียงเรื่องเดียวก็เพียงพอ ใช้เพื่อสื่อแนวทางด้านสถานที่ แสง สี และบรรยากาศเท่านั้น ระบบจะกำชับให้สร้างฉากใหม่และไม่คัดลอกฉาก ตัวละคร ตราสัญลักษณ์ หรืองานภาพจากต้นฉบับ',
      fields:[
        field('hollywoodFilm','หนังฮอลลีวูด / Hollywood Film',[]),
        field('thaiFilm','หนังไทย / Thai Film',[])
      ]
    }
  );
  const sceneModifierGroups = {
    place:['minimalist version','luxury version','rustic version','traditional version','modern version','vintage version','weathered version','overgrown version','abandoned version','futuristic version','fantasy version','grand-scale version','compact version','open-air version','hidden version','dreamlike version'],
    surface:['as the dominant feature','as a subtle accent','with handcrafted detail','with polished finish','with matte finish','with aged patina','with ornate detail','with minimalist detail','with natural texture','with reflective surfaces','with rough texture','with geometric patterns','with organic forms','with luxury finish','with weathered finish'],
    environment:['soft and gentle','strong and dramatic','subtle and realistic','cinematic and atmospheric','dreamy and diffused','moody and low-contrast','vivid and high-contrast','calm and clear','dense and immersive','epic and expansive','delicate and minimal','mysterious and surreal','warm-toned','cool-toned','after a recent storm'],
    depth:['close to camera','softly out of focus','sharply detailed','partially silhouetted','framing both sides','placed asymmetrically','arranged symmetrically','layered densely','kept minimal','lit from behind','catching soft light','casting long shadows','covered with moisture','moving gently in wind','reflecting ambient light'],
    mood:['with a subtle feeling','with an immersive feeling','with a cinematic feeling','with a dreamlike feeling','with an intimate feeling','with a grand feeling','with a quiet feeling','with a dramatic feeling','with a surreal feeling','with a refined feeling','with a raw feeling','with a timeless feeling','with a modern feeling','with a nostalgic feeling','with a mysterious feeling'],
    light:['at low intensity','at medium intensity','at high intensity','with soft diffusion','with hard definition','with gentle falloff','with dramatic contrast','with subtle bloom','with long shadows','with crisp shadows','with soft shadows','with volumetric haze','with reflected highlights','with cinematic exposure','with natural exposure'],
    color:['with subtle saturation','with rich saturation','with muted saturation','with soft contrast','with strong contrast','with lifted shadows','with deep shadows','with gentle highlights','with glowing highlights','with natural balance','with cinematic balance','with vintage balance','with modern balance','with dreamy balance','with dramatic balance'],
    camera:['for an intimate view','for a balanced view','for an expansive view','with precise alignment','with subtle perspective','with dramatic perspective','with natural perspective','with cinematic perspective','with architectural precision','with strong depth','with compressed depth','with layered depth','with minimal distortion','with dynamic energy','with calm visual balance'],
    style:['with a clean finish','with a refined finish','with a textured finish','with a cinematic finish','with an analog finish','with a dreamy finish','with a dramatic finish','with a natural finish','with a graphic finish','with a painterly finish','with intricate detail','with simplified detail','with soft edges','with crisp edges','with atmospheric depth']
  };
  const sceneFieldModifierGroup = {
    locationType:'place', location:'place', architecture:'place', materials:'surface', condition:'surface',
    time:'environment', weather:'environment', season:'environment', sky:'environment', foreground:'depth', midground:'depth', background:'depth', decor:'surface', natureDetails:'environment', waterDetails:'environment', atmosphericEffects:'environment', mood:'mood',
    mainLight:'light', lightDirection:'light', lightQuality:'light', supportLight:'light', colorTone:'color', colorTemperature:'color', colorGrade:'color',
    shotType:'camera', cameraAngle:'camera', lens:'camera', composition:'camera', depthOfField:'camera', visualStyle:'style', detailLevel:'style', outputQuality:'style'
  };
  function expandSceneOptions(item) {
    if (item.id === 'aspectRatio') {
      const ratios = [];
      for (let width = 1; width <= 20; width += 1) {
        for (let height = 1; height <= 20; height += 1) {
          if (ratios.length >= 100) break;
          const orientation = width === height ? 'Square' : width < height ? 'Portrait' : 'Landscape';
          ratios.push(`${orientation} ${width}:${height}`);
        }
        if (ratios.length >= 100) break;
      }
      item.options = [...new Set([...item.options, ...ratios])].slice(0, 100);
      return;
    }
    const original = [...item.options];
    const modifiers = sceneModifierGroups[sceneFieldModifierGroup[item.id] || 'style'];
    const expanded = [...original];
    let modifierIndex = 0;
    while (expanded.length < 100) {
      const base = original[modifierIndex % original.length];
      const modifier = modifiers[Math.floor(modifierIndex / original.length) % modifiers.length];
      const candidate = `${base} — ${modifier}`;
      if (!expanded.includes(candidate)) expanded.push(candidate);
      modifierIndex += 1;
    }
    item.options = expanded.slice(0, 100);
  }
  const sceneCuratedLocationPairs = [
    ['Master bedroom','ห้องนอนใหญ่'],['Children’s bedroom','ห้องนอนเด็ก'],['Guest bedroom','ห้องนอนแขก'],['Open-plan living room','ห้องนั่งเล่นแบบเปิดโล่ง'],['Traditional Thai living room','ห้องรับแขกเรือนไทย'],['Modern kitchen','ห้องครัวสมัยใหม่'],['Traditional Thai kitchen','ครัวไทยแบบดั้งเดิม'],['Home library','ห้องสมุดภายในบ้าน'],['Public library reading hall','โถงอ่านหนังสือในห้องสมุดประชาชน'],['Artist’s painting studio','ห้องทำงานของจิตรกร'],
    ['Photography studio','สตูดิโอถ่ายภาพ'],['Recording studio','ห้องบันทึกเสียง'],['Architect’s office','สำนักงานสถาปนิก'],['Corporate boardroom','ห้องประชุมบริษัท'],['Hospital corridor','ทางเดินในโรงพยาบาล'],['Hospital operating room','ห้องผ่าตัด'],['Traditional classroom','ห้องเรียนแบบดั้งเดิม'],['University lecture hall','ห้องบรรยายมหาวิทยาลัย'],['Science laboratory','ห้องปฏิบัติการวิทยาศาสตร์'],['Greenhouse laboratory','ห้องทดลองภายในเรือนกระจก'],
    ['Neighborhood coffee shop','ร้านกาแฟประจำชุมชน'],['Riverside cafe','คาเฟ่ริมแม่น้ำ'],['Rooftop restaurant','ร้านอาหารบนดาดฟ้า'],['Traditional Thai restaurant','ร้านอาหารไทยแบบดั้งเดิม'],['Luxury hotel lobby','โถงต้อนรับโรงแรมหรู'],['Boutique hotel courtyard','ลานกลางโรงแรมขนาดเล็ก'],['Museum exhibition hall','โถงจัดแสดงพิพิธภัณฑ์'],['Contemporary art gallery','หอศิลป์ร่วมสมัย'],['Opera theater stage','เวทีโรงละครโอเปรา'],['Backstage dressing room','ห้องแต่งตัวหลังเวที'],
    ['Indoor shopping arcade','ทางเดินร้านค้าภายในอาคาร'],['Traditional covered market','ตลาดพื้นเมืองในอาคาร'],['Fresh food market','ตลาดขายอาหารสด'],['Floating market','ตลาดน้ำ'],['Old railway platform','ชานชาลารถไฟเก่า'],['Modern metro station','สถานีรถไฟฟ้าสมัยใหม่'],['Airport departure hall','โถงผู้โดยสารขาออก'],['Aircraft hangar','โรงเก็บเครื่องบิน'],['Industrial warehouse','โกดังอุตสาหกรรม'],['Abandoned factory floor','พื้นที่โรงงานร้าง'],
    ['Underground parking garage','อาคารจอดรถใต้ดิน'],['City rooftop garden','สวนบนดาดฟ้าในเมือง'],['Narrow old-town alley','ตรอกแคบในย่านเมืองเก่า'],['Neon-lit city street','ถนนในเมืองที่ส่องสว่างด้วยป้ายไฟ'],['Historic town square','จัตุรัสกลางเมืองเก่า'],['Riverside promenade','ทางเดินเลียบแม่น้ำ'],['Canal-side community','ชุมชนริมคลอง'],['Traditional Thai village','หมู่บ้านไทยดั้งเดิม'],['Northern Thai village','หมู่บ้านภาคเหนือของไทย'],['Coastal fishing village','หมู่บ้านชาวประมงริมทะเล'],
    ['Rice terrace','นาขั้นบันได'],['Lotus pond','สระบัว'],['Tropical rainforest','ป่าฝนเขตร้อน'],['Ancient banyan grove','ดงต้นไทรโบราณ'],['Pine forest clearing','ลานโล่งกลางป่าสน'],['Bamboo forest path','ทางเดินกลางป่าไผ่'],['Misty mountain ridge','สันเขาที่ปกคลุมด้วยหมอก'],['Mountain valley','หุบเขาระหว่างภูเขา'],['Limestone canyon','หุบผาหินปูน'],['Crystal cave','ถ้ำผลึกแก้ว'],
    ['Underground cavern','โพรงถ้ำใต้ดิน'],['Jungle waterfall basin','แอ่งน้ำตกกลางป่า'],['Rocky riverbank','ตลิ่งแม่น้ำที่เต็มไปด้วยโขดหิน'],['Quiet lakeshore','ริมทะเลสาบอันเงียบสงบ'],['Mangrove forest','ป่าชายเลน'],['Tropical island beach','ชายหาดบนเกาะเขตร้อน'],['Hidden sea cove','อ่าวทะเลที่ซ่อนตัว'],['Coral reef','แนวปะการัง'],['Deep ocean trench','ร่องลึกใต้มหาสมุทร'],['Sand dune valley','หุบเนินทราย'],
    ['Salt flat','ที่ราบเกลือ'],['Volcanic crater','ปากปล่องภูเขาไฟ'],['Snow-covered tundra','ทุ่งทุนดราปกคลุมด้วยหิมะ'],['Frozen lake','ทะเลสาบน้ำแข็ง'],['Glacier cave','ถ้ำน้ำแข็ง'],['Thai temple courtyard','ลานวัดไทย'],['Buddhist ordination hall','พระอุโบสถ'],['Ancient pagoda complex','กลุ่มเจดีย์โบราณ'],['Ayutthaya temple ruins','ซากวัดสมัยอยุธยา'],['Khmer stone sanctuary','ปราสาทหินขอม'],
    ['Royal palace throne hall','ท้องพระโรงในพระราชวัง'],['Lanna wooden temple','วิหารไม้แบบล้านนา'],['Medieval castle hall','โถงปราสาทยุคกลาง'],['Castle library','ห้องสมุดภายในปราสาท'],['Walled palace garden','สวนในกำแพงพระราชวัง'],['Enchanted forest clearing','ลานโล่งกลางป่าต้องมนตร์'],['Bioluminescent mushroom cave','ถ้ำเห็ดเรืองแสง'],['Floating island village','หมู่บ้านบนเกาะลอยฟ้า'],['Crystal palace','พระราชวังผลึกแก้ว'],['Ancient magical library','ห้องสมุดเวทมนตร์โบราณ'],
    ['Cyberpunk night market','ตลาดกลางคืนในเมืองอนาคต'],['Futuristic transit hub','ศูนย์คมนาคมแห่งอนาคต'],['Vertical city garden','สวนแนวตั้งในมหานคร'],['Solar-powered desert city','เมืองพลังงานแสงอาทิตย์กลางทะเลทราย'],['Orbital space station','สถานีอวกาศในวงโคจร'],['Spaceship command deck','ห้องควบคุมยานอวกาศ'],['Spaceship engine room','ห้องเครื่องยานอวกาศ'],['Lunar research base','ฐานวิจัยบนดวงจันทร์'],['Alien jungle planet','ดาวเคราะห์ต่างดาวที่ปกคลุมด้วยป่า'],['Ruined post-disaster metropolis','มหานครร้างหลังภัยพิบัติ']
  ];
  sceneCuratedLocationPairs.push(
    ['Small apartment balcony','ระเบียงห้องชุดขนาดเล็ก'],['Penthouse living room','ห้องนั่งเล่นเพนต์เฮาส์'],['Townhouse entrance hall','โถงทางเข้าทาวน์เฮาส์'],['Traditional wooden house veranda','ชานเรือนไม้แบบดั้งเดิม'],['Farmhouse dining room','ห้องรับประทานอาหารในบ้านไร่'],
    ['Basement workshop','ห้องช่างใต้ดิน'],['Attic storage room','ห้องเก็บของใต้หลังคา'],['Laundry room','ห้องซักรีด'],['Walk-in wardrobe','ห้องแต่งตัวแบบเดินเข้าได้'],['Indoor swimming pool','สระว่ายน้ำภายในอาคาร'],
    ['Community health clinic','สถานีอนามัยชุมชน'],['Dental treatment room','ห้องทำฟัน'],['Hospital emergency room','ห้องฉุกเฉินในโรงพยาบาล'],['Hospital patient ward','หอผู้ป่วยในโรงพยาบาล'],['Veterinary clinic','คลินิกรักษาสัตว์'],
    ['Primary school classroom','ห้องเรียนระดับประถมศึกษา'],['School science room','ห้องวิทยาศาสตร์ในโรงเรียน'],['School cafeteria','โรงอาหารโรงเรียน'],['University dormitory room','ห้องพักหอมหาวิทยาลัย'],['University archive room','ห้องจดหมายเหตุมหาวิทยาลัย'],
    ['Neighborhood bakery','ร้านขนมปังประจำชุมชน'],['Street-side noodle shop','ร้านก๋วยเตี๋ยวริมถนน'],['Traditional tea house','โรงน้ำชาแบบดั้งเดิม'],['Hotel breakfast room','ห้องอาหารเช้าในโรงแรม'],['Underground cocktail bar','บาร์เครื่องดื่มใต้ดิน'],
    ['Convenience store at night','ร้านสะดวกซื้อยามค่ำคืน'],['Old-fashioned grocery store','ร้านขายของชำแบบเก่า'],['Antique shop','ร้านขายของเก่า'],['Flower market hall','โถงตลาดดอกไม้'],['Night market food lane','ตรอกอาหารในตลาดกลางคืน'],
    ['Local police station','สถานีตำรวจท้องถิ่น'],['Provincial courthouse','ศาลประจำจังหวัด'],['Municipal service office','สำนักงานบริการประชาชนของเทศบาล'],['Fire station garage','โรงจอดรถในสถานีดับเพลิง'],['Post office sorting room','ห้องคัดแยกไปรษณีย์'],
    ['Television newsroom','ห้องข่าวสถานีโทรทัศน์'],['Radio broadcast booth','ห้องจัดรายการวิทยุ'],['Newspaper printing room','ห้องพิมพ์หนังสือพิมพ์'],['Film editing suite','ห้องตัดต่อภาพยนตร์'],['Cinema projection room','ห้องฉายภาพยนตร์'],
    ['Boxing training gym','ค่ายฝึกมวย'],['Indoor basketball court','สนามบาสเกตบอลในร่ม'],['Public swimming complex','ศูนย์สระว่ายน้ำสาธารณะ'],['Football stadium tunnel','อุโมงค์ทางเข้าสนามฟุตบอล'],['Yoga studio','ห้องฝึกโยคะ'],
    ['Bus terminal waiting hall','โถงพักผู้โดยสารสถานีขนส่ง'],['Ferry terminal pier','ท่าเรือโดยสารข้ามฟาก'],['Old tram depot','โรงเก็บรถรางเก่า'],['Highway rest area','จุดพักรถริมทางหลวง'],['Rural petrol station','สถานีบริการน้ำมันในชนบท'],
    ['Container shipping port','ท่าเรือขนส่งตู้สินค้า'],['Ship engine room','ห้องเครื่องเรือ'],['Lighthouse keeper’s room','ห้องพักผู้ดูแลประภาคาร'],['Coast guard station','สถานีรักษาการณ์ชายฝั่ง'],['Abandoned amusement park','สวนสนุกร้าง'],
    ['Water treatment plant','โรงบำบัดน้ำ'],['Hydroelectric dam interior','พื้นที่ภายในเขื่อนผลิตไฟฟ้า'],['Power station control room','ห้องควบคุมโรงไฟฟ้า'],['Recycling facility','โรงคัดแยกวัสดุรีไซเคิล'],['Underground utility tunnel','อุโมงค์สาธารณูปโภคใต้ดิน'],
    ['Rubber plantation','สวนยางพารา'],['Tea plantation hillside','ไร่ชาบนไหล่เขา'],['Coffee plantation','ไร่กาแฟ'],['Orchard in bloom','สวนผลไม้ช่วงออกดอก'],['Sugarcane field','ไร่อ้อย'],
    ['Buffalo grazing field','ทุ่งเลี้ยงควาย'],['Shrimp farm ponds','บ่อเลี้ยงกุ้ง'],['Salt farming field','นาเกลือ'],['Riverside fruit orchard','สวนผลไม้ริมแม่น้ำ'],['Mountain tribal village','หมู่บ้านชาติพันธุ์บนภูเขา'],
    ['Remote forest monastery','สำนักสงฆ์กลางป่าห่างไกล'],['Temple bell tower','หอระฆังในวัด'],['Temple scripture hall','หอพระไตรปิฎก'],['Chinese shrine courtyard','ลานศาลเจ้าจีน'],['Mosque prayer hall','โถงละหมาดในมัสยิด'],
    ['Christian cathedral nave','โถงกลางมหาวิหารคริสต์'],['Hindu temple gateway','ซุ้มประตูเทวสถานฮินดู'],['Ancient burial chamber','ห้องฝังศพโบราณ'],['Historic city gate','ประตูเมืองโบราณ'],['Fortress watchtower','หอสังเกตการณ์บนป้อม'],
    ['Rainforest canopy walkway','ทางเดินเหนือเรือนยอดป่าฝน'],['Mountain hot spring','บ่อน้ำพุร้อนบนภูเขา'],['Geothermal field','ทุ่งพลังงานความร้อนใต้พิภพ'],['Coastal cliff cave','ถ้ำหน้าผาริมทะเล'],['River delta wetlands','พื้นที่ชุ่มน้ำบริเวณสามเหลี่ยมปากแม่น้ำ'],
    ['Seasonal wildflower meadow','ทุ่งดอกไม้ป่าตามฤดูกาล'],['Ancient petrified forest','ป่าหินกลายเป็นหินโบราณ'],['Meteor impact crater','หลุมอุกกาบาต'],['Northern lights snowfield','ทุ่งหิมะใต้แสงเหนือ'],['Floating ice shelf','แผ่นน้ำแข็งลอยในทะเล'],
    ['Dragon’s mountain lair','รังมังกรภายในภูเขา'],['Wizard’s observatory','หอดูดาวของพ่อมด'],['Underground dwarf city','นครคนแคระใต้ดิน'],['Ruined celestial temple','ซากวิหารแห่งท้องฟ้า'],['Portal chamber between worlds','ห้องประตูเชื่อมระหว่างโลก'],
    ['Underwater glass city','นครกระจกใต้ทะเล'],['Cloud-top palace','พระราชวังเหนือหมู่เมฆ'],['Timekeeper’s clock tower','หอนาฬิกาของผู้ควบคุมเวลา'],['Post-apocalyptic subway shelter','ศูนย์หลบภัยในรถไฟใต้ดินหลังภัยพิบัติ'],['Mars colony greenhouse','เรือนกระจกในอาณานิคมบนดาวอังคาร']
  );
  const sceneConditionPairs = [
    ['Brand new','ใหม่เอี่ยม'],['Pristine and untouched','สมบูรณ์และยังไม่ผ่านการใช้งาน'],['Clean and well maintained','สะอาดและได้รับการดูแลอย่างดี'],['Recently renovated','เพิ่งปรับปรุงใหม่'],['Freshly painted','เพิ่งทาสีใหม่'],['Orderly and organized','เป็นระเบียบเรียบร้อย'],['Lived-in and comfortable','มีร่องรอยการอยู่อาศัยและดูสบาย'],['Busy and heavily used','ผ่านการใช้งานอย่างหนัก'],['Cluttered but functional','มีของมากแต่ยังใช้งานได้ดี'],['Dusty and neglected','มีฝุ่นและขาดการดูแล'],
    ['Faded by sunlight','สีซีดจากแสงแดด'],['Weathered by rain','ผุกร่อนจากฝน'],['Aged wooden surfaces','พื้นผิวไม้เก่าตามกาลเวลา'],['Cracked plaster walls','ผนังปูนแตกร้าว'],['Peeling paint','สีลอก'],['Rust-covered metal','โลหะขึ้นสนิม'],['Moss-covered surfaces','พื้นผิวปกคลุมด้วยตะไคร่น้ำ'],['Overgrown with plants','พืชขึ้นปกคลุม'],['Partially abandoned','ถูกทิ้งร้างบางส่วน'],['Completely abandoned','ถูกทิ้งร้างทั้งหมด'],
    ['Recently deserted','เพิ่งถูกทิ้งไว้ไม่นาน'],['Long-forgotten','ถูกลืมมาเป็นเวลานาน'],['Partially collapsed','พังถล่มบางส่วน'],['Severely ruined','พังเสียหายอย่างหนัก'],['Burned and charred','ถูกไฟไหม้และมีรอยดำ'],['Smoke damaged','เสียหายจากควันไฟ'],['Flooded with shallow water','มีน้ำท่วมขังระดับตื้น'],['Deeply flooded','มีน้ำท่วมสูง'],['Water-damaged interior','ภายในเสียหายจากน้ำ'],['Storm damaged','เสียหายจากพายุ'],
    ['Earthquake damaged','เสียหายจากแผ่นดินไหว'],['War damaged','เสียหายจากสงคราม'],['Covered in ash','ปกคลุมด้วยเถ้าถ่าน'],['Covered in desert sand','ถูกทรายทะเลทรายทับถม'],['Frozen solid','ถูกแช่แข็งทั้งหมด'],['Covered in fresh snow','ปกคลุมด้วยหิมะใหม่'],['Icy and slippery','มีน้ำแข็งเกาะและลื่น'],['Damp and humid','ชื้นแฉะและอับชื้น'],['Dry and sunbaked','แห้งและถูกแดดเผา'],['Wind-eroded','ถูกลมกัดกร่อน'],
    ['Carefully restored','ได้รับการบูรณะอย่างละเอียด'],['Partially restored','ได้รับการบูรณะบางส่วน'],['Preserved historical site','ได้รับการอนุรักษ์เป็นโบราณสถาน'],['Under construction','อยู่ระหว่างการก่อสร้าง'],['Under renovation','อยู่ระหว่างการปรับปรุง'],['Unfinished structure','โครงสร้างยังก่อสร้างไม่เสร็จ'],['Temporary and makeshift','สร้างขึ้นชั่วคราวด้วยวัสดุที่หาได้'],['Decorated for a festival','ตกแต่งสำหรับงานเทศกาล'],['Prepared for a ceremony','จัดเตรียมสำหรับพิธี'],['Silent and empty','เงียบและว่างเปล่า']
  ];
  sceneConditionPairs.push(
    ['Sterile and disinfected','ผ่านการฆ่าเชื้อและสะอาดปลอดเชื้อ'],['Recently cleaned','เพิ่งทำความสะอาด'],['Spotlessly polished','ขัดเงาจนสะอาดไร้คราบ'],['Minimal and sparsely furnished','โล่งและมีเครื่องเรือนน้อยชิ้น'],['Packed with stored objects','เต็มไปด้วยสิ่งของที่เก็บสะสม'],
    ['Crowded with temporary equipment','แน่นไปด้วยอุปกรณ์ชั่วคราว'],['Actively occupied and operational','กำลังมีการใช้งานและดำเนินงานตามปกติ'],['Closed for the season','ปิดใช้งานตามฤดูกาล'],['Sealed and inaccessible','ถูกปิดผนึกและไม่สามารถเข้าใช้งาน'],['Evacuated in a hurry','ถูกอพยพออกอย่างเร่งรีบ'],
    ['Quarantined and restricted','ถูกกักกันและจำกัดการเข้าออก'],['Condemned as unsafe','ถูกสั่งห้ามใช้เพราะไม่ปลอดภัย'],['Structurally unstable','โครงสร้างไม่มั่นคงและเสี่ยงพัง'],['Sagging floors and ceilings','พื้นและเพดานแอ่นตัว'],['Shattered windows','กระจกหน้าต่างแตกกระจาย'],
    ['Broken doors and fixtures','ประตูและอุปกรณ์ติดตั้งชำรุด'],['Vandalized and defaced','ถูกทำลายและขีดเขียนจนเสียหาย'],['Looted and stripped bare','ถูกปล้นจนแทบไม่เหลือสิ่งของ'],['Bullet-scarred surfaces','พื้นผิวเต็มไปด้วยรอยกระสุน'],['Bomb-blasted ruins','พังเป็นซากจากแรงระเบิด'],
    ['Recently extinguished fire','เพิ่งดับไฟและยังมีร่องรอยความร้อน'],['Soot-blackened interior','ภายในดำคล้ำจากเขม่าควัน'],['Mud-covered after flooding','ปกคลุมด้วยโคลนหลังน้ำลด'],['Saltwater-corroded','ผุกร่อนจากน้ำเค็ม'],['Tsunami-damaged','เสียหายจากคลื่นสึนามิ'],
    ['Landslide-damaged','เสียหายจากดินถล่ม'],['Volcanic-lava damaged','เสียหายจากลาวาภูเขาไฟ'],['Hail-damaged','เสียหายจากลูกเห็บ'],['Lightning-struck','ได้รับความเสียหายจากฟ้าผ่า'],['Drought-stricken','แห้งแล้งจากการขาดน้ำยาวนาน'],
    ['Infested with insects','มีแมลงรบกวนจำนวนมาก'],['Mold-infested','มีเชื้อราขึ้นทั่วบริเวณ'],['Termite-damaged woodwork','งานไม้ถูกปลวกกัดกิน'],['Covered in bird nests','เต็มไปด้วยรังนก'],['Reclaimed by jungle','ถูกผืนป่ากลืนกลับคืน'],
    ['Roots breaking through the floor','รากไม้ชอนไชทะลุพื้น'],['Carpeted with fallen leaves','พื้นปกคลุมด้วยใบไม้ร่วง'],['Filled with drifting fog','เต็มไปด้วยหมอกที่ลอยเคลื่อน'],['Submerged underwater','จมอยู่ใต้น้ำทั้งหมด'],['Exposed by receding water','เพิ่งโผล่พ้นหลังระดับน้ำลด'],
    ['Archaeological excavation in progress','อยู่ระหว่างการขุดค้นทางโบราณคดี'],['Museum-conserved condition','ได้รับการดูแลรักษาแบบวัตถุพิพิธภัณฑ์'],['Adaptively reused for a new purpose','ถูกดัดแปลงเพื่อใช้งานในหน้าที่ใหม่'],['Converted into an emergency shelter','ถูกเปลี่ยนเป็นศูนย์พักพิงฉุกเฉิน'],['Prepared for demolition','เตรียมพร้อมสำหรับการรื้อถอน'],
    ['Half-demolished','ถูกรื้อถอนไปแล้วครึ่งหนึ่ง'],['Magically preserved','ถูกเวทมนตร์รักษาให้อยู่ในสภาพเดิม'],['Suspended in time','หยุดนิ่งราวกับเวลาถูกแช่แข็ง'],['Reality-warped and distorted','รูปทรงบิดเบี้ยวจากความผิดปกติของความจริง'],['Overgrown with bioluminescent life','ถูกสิ่งมีชีวิตเรืองแสงขึ้นปกคลุม']
  );
  const sceneEraPairs = [
    ['Prehistoric Stone Age','ยุคก่อนประวัติศาสตร์สมัยหิน'],['Bronze Age','ยุคสำริด'],['Iron Age','ยุคเหล็ก'],['Ancient Egyptian period','สมัยอียิปต์โบราณ'],['Ancient Greek period','สมัยกรีกโบราณ'],['Roman Empire period','สมัยจักรวรรดิโรมัน'],['Ancient Indian period','สมัยอินเดียโบราณ'],['Ancient Chinese period','สมัยจีนโบราณ'],['Dvaravati period','สมัยทวารวดี'],['Srivijaya period','สมัยศรีวิชัย'],
    ['Khmer Empire period','สมัยจักรวรรดิขอม'],['Hariphunchai period','สมัยหริภุญชัย'],['Sukhothai period','สมัยสุโขทัย'],['Early Ayutthaya period','สมัยอยุธยาตอนต้น'],['Middle Ayutthaya period','สมัยอยุธยาตอนกลาง'],['Late Ayutthaya period','สมัยอยุธยาตอนปลาย'],['Thonburi period','สมัยธนบุรี'],['Early Rattanakosin period','สมัยรัตนโกสินทร์ตอนต้น'],['Reign of King Rama IV','รัชสมัยพระบาทสมเด็จพระจอมเกล้าเจ้าอยู่หัว'],['Reign of King Rama V','รัชสมัยพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว'],
    ['Reign of King Rama VI','รัชสมัยพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว'],['Reign of King Rama VII','รัชสมัยพระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัว'],['Siam modernization period','ช่วงสยามปรับตัวสู่ความทันสมัย'],['Victorian period','สมัยวิกตอเรีย'],['Edwardian period','สมัยเอ็ดเวิร์ด'],['Belle Époque','ยุคแห่งความรุ่งเรืองในยุโรป'],['Industrial Revolution','ยุคปฏิวัติอุตสาหกรรม'],['First World War period','ช่วงสงครามโลกครั้งที่หนึ่ง'],['1920s','คริสต์ทศวรรษ 1920'],['1930s','คริสต์ทศวรรษ 1930'],
    ['Second World War period','ช่วงสงครามโลกครั้งที่สอง'],['1950s','คริสต์ทศวรรษ 1950'],['1960s','คริสต์ทศวรรษ 1960'],['1970s','คริสต์ทศวรรษ 1970'],['1980s','คริสต์ทศวรรษ 1980'],['1990s','คริสต์ทศวรรษ 1990'],['Early 2000s','ช่วงต้นคริสต์ทศวรรษ 2000'],['Present day','ยุคปัจจุบัน'],['Near future','อนาคตอันใกล้'],['Mid-21st century','ช่วงกลางคริสต์ศตวรรษที่ 21'],
    ['Late 21st century','ช่วงปลายคริสต์ศตวรรษที่ 21'],['22nd century','คริสต์ศตวรรษที่ 22'],['Far future','อนาคตอันไกล'],['Post-apocalyptic future','อนาคตหลังภัยพิบัติครั้งใหญ่'],['Spacefaring civilization','ยุคอารยธรรมเดินทางในอวกาศ'],['Medieval fantasy age','ยุคแฟนตาซีแบบสมัยกลาง'],['Age of magic','ยุคแห่งเวทมนตร์'],['Steampunk age','ยุคเครื่องจักรไอน้ำในโลกสมมติ'],['Cyberpunk age','ยุคมหานครเทคโนโลยีที่เหลื่อมล้ำ'],['Timeless imaginary world','โลกสมมติที่ไม่ระบุช่วงเวลา']
  ];
  const chronologicalEraOrder = [
    'Prehistoric Stone Age','Bronze Age','Iron Age','Ancient Egyptian period','Ancient Indian period','Ancient Chinese period','Ancient Greek period','Roman Empire period',
    'Dvaravati period','Srivijaya period','Khmer Empire period','Hariphunchai period','Sukhothai period','Early Ayutthaya period','Middle Ayutthaya period','Late Ayutthaya period','Thonburi period','Early Rattanakosin period',
    'Industrial Revolution','Reign of King Rama IV','Victorian period','Reign of King Rama V','Siam modernization period','Belle Époque','Edwardian period','Reign of King Rama VI','First World War period','1920s','Reign of King Rama VII','1930s','Second World War period',
    '1950s','1960s','1970s','1980s','1990s','Early 2000s','Present day','Near future','Mid-21st century','Late 21st century','22nd century','Far future','Post-apocalyptic future','Spacefaring civilization',
    'Medieval fantasy age','Age of magic','Steampunk age','Cyberpunk age','Timeless imaginary world'
  ];
  sceneEraPairs.sort((a, b) => chronologicalEraOrder.indexOf(a[0]) - chronologicalEraOrder.indexOf(b[0]));
  sceneEraPairs.unshift(
    ['Hadean Eon','บรมยุคเฮเดียน ช่วงโลกกำลังก่อตัวและพื้นผิวร้อนจัด'],
    ['Archean Eon','บรมยุคอาร์เคียน ช่วงเปลือกโลกและสิ่งมีชีวิตแรกเริ่ม'],
    ['Proterozoic Eon','บรมยุคโพรเทอโรโซอิก ช่วงออกซิเจนในบรรยากาศเพิ่มขึ้น'],
    ['Cambrian Period','ยุคแคมเบรียน ช่วงสิ่งมีชีวิตในทะเลหลากหลายอย่างรวดเร็ว'],
    ['Devonian Period','ยุคดีโวเนียน ช่วงปลารุ่งเรืองและพืชบกขยายตัว'],
    ['Carboniferous Period','ยุคคาร์บอนิเฟอรัส ช่วงป่าหนาทึบและหนองบึงขนาดใหญ่'],
    ['Permian Period','ยุคเพอร์เมียน ช่วงมหาทวีปแพนเจีย'],
    ['Triassic Period','ยุคไทรแอสซิก ช่วงแรกของไดโนเสาร์'],
    ['Jurassic Period','ยุคจูแรสซิก ช่วงไดโนเสาร์ขนาดใหญ่ครองแผ่นดิน'],
    ['Cretaceous Period','ยุคครีเทเชียส ช่วงปลายของยุคไดโนเสาร์'],
    ['Paleolithic period','ยุคหินเก่า ช่วงมนุษย์ล่าสัตว์และเก็บของป่า'],
    ['Mesolithic period','ยุคหินกลาง ช่วงเปลี่ยนผ่านหลังยุคน้ำแข็ง'],
    ['Neolithic period','ยุคหินใหม่ ช่วงเริ่มทำเกษตรและตั้งถิ่นฐานถาวร'],
    ['Early Mesopotamian civilization','อารยธรรมเมโสโปเตเมียระยะแรกและนครรัฐโบราณ'],
    ['Indus Valley civilization','สมัยอารยธรรมลุ่มแม่น้ำสินธุและเมืองวางผัง'],
    ['Minoan civilization','สมัยอารยธรรมมิโนอันบนเกาะครีต'],
    ['Mycenaean civilization','สมัยอารยธรรมไมซีนีในกรีซยุคสำริด'],
    ['Shang dynasty period','สมัยราชวงศ์ซางของจีน'],
    ['Zhou dynasty period','สมัยราชวงศ์โจวของจีน'],
    ['Achaemenid Persian period','สมัยจักรวรรดิเปอร์เซียอคีเมนิด'],
    ['Maurya Empire period','สมัยจักรวรรดิเมารยะในชมพูทวีป'],
    ['Hellenistic period','สมัยเฮลเลนิสติกหลังอเล็กซานเดอร์มหาราช'],
    ['Han dynasty period','สมัยราชวงศ์ฮั่นของจีน'],
    ['Funan period','สมัยฟูนันในเอเชียตะวันออกเฉียงใต้'],
    ['Byzantine Empire period','สมัยจักรวรรดิไบแซนไทน์']
  );
  sceneEraPairs.push(
    ['Early 22nd century','ช่วงต้นคริสต์ศตวรรษที่ 22'],
    ['Mid-22nd century','ช่วงกลางคริสต์ศตวรรษที่ 22'],
    ['Late 22nd century','ช่วงปลายคริสต์ศตวรรษที่ 22'],
    ['23rd century','คริสต์ศตวรรษที่ 23'],
    ['24th century','คริสต์ศตวรรษที่ 24'],
    ['25th century','คริสต์ศตวรรษที่ 25'],
    ['Early interplanetary age','ยุคเริ่มต้นการเดินทางระหว่างดาวเคราะห์'],
    ['Mars settlement age','ยุคตั้งถิ่นฐานถาวรบนดาวอังคาร'],
    ['Solar-system civilization','ยุคอารยธรรมแผ่ขยายทั่วระบบสุริยะ'],
    ['Interstellar exploration age','ยุคสำรวจอวกาศระหว่างดวงดาว'],
    ['Galactic civilization age','ยุคอารยธรรมระดับกาแล็กซี'],
    ['Post-Earth diaspora','ยุคมนุษย์กระจายถิ่นฐานออกจากโลก'],
    ['Artificial-intelligence governance age','ยุคปัญญาประดิษฐ์มีบทบาทบริหารสังคม'],
    ['Human-machine synthesis age','ยุคมนุษย์ผสานร่างกายกับเครื่องจักร'],
    ['Post-scarcity civilization','ยุคอารยธรรมที่ทรัพยากรไม่ขาดแคลน'],
    ['Climate-restoration age','ยุคฟื้นฟูภูมิอากาศและระบบนิเวศโลก'],
    ['After-the-flood civilization','ยุคอารยธรรมหลังมหาอุทกภัย'],
    ['Solarpunk age','ยุคอนาคตสีเขียวที่เมืองอยู่ร่วมกับธรรมชาติ'],
    ['Dieselpunk alternate age','ยุคสมมติที่เทคโนโลยีเครื่องยนต์ดีเซลครองโลก'],
    ['Retro-futurist atomic age','ยุคอนาคตย้อนสมัยที่ได้แรงบันดาลใจจากพลังงานปรมาณู'],
    ['Dark fantasy age','ยุคแฟนตาซีหม่นที่โลกเต็มไปด้วยภัยเหนือธรรมชาติ'],
    ['High fantasy golden age','ยุคทองของอาณาจักรเวทมนตร์ชั้นสูง'],
    ['Mythological age of gods','ยุคเทพปกรณัมที่เทพเจ้ายังดำรงอยู่บนโลก'],
    ['Dream-realm age','ยุคโลกแห่งความฝันที่กฎความจริงไม่แน่นอน'],
    ['End-of-time age','ยุคปลายกาลที่เวลาและจักรวาลใกล้สิ้นสุด']
  );
  const sceneMoodPairs = [
    ['Peaceful','สงบสุข'],['Calm','สงบนิ่ง'],['Quiet','เงียบสงบ'],['Relaxing','ผ่อนคลาย'],['Warm and welcoming','อบอุ่นและน่าเข้าไปสัมผัส'],['Cozy','สบายและเป็นกันเอง'],['Fresh','สดชื่น'],['Bright and cheerful','สว่างและร่าเริง'],['Joyful','เปี่ยมด้วยความสุข'],['Playful','สนุกสนาน'],
    ['Dreamy','ชวนฝัน'],['Magical','มหัศจรรย์'],['Whimsical','สนุกเหนือจินตนาการ'],['Romantic','โรแมนติก'],['Elegant','สง่างาม'],['Luxurious','หรูหรา'],['Sacred','ศักดิ์สิทธิ์'],['Meditative','สงบเหมาะแก่การทำสมาธิ'],['Majestic','โอ่อ่าสง่างาม'],['Epic','ยิ่งใหญ่ตระการตา'],
    ['Nostalgic','ชวนให้คิดถึงอดีต'],['Sentimental','เปี่ยมด้วยความรู้สึกผูกพัน'],['Melancholic','หม่นเศร้า'],['Lonely','โดดเดี่ยว'],['Empty and still','ว่างเปล่าและหยุดนิ่ง'],['Mysterious','ลึกลับ'],['Secretive','ซ่อนเร้นและมีความลับ'],['Eerie','วังเวงผิดธรรมชาติ'],['Haunting','หลอกหลอน'],['Unsettling','ทำให้รู้สึกไม่สบายใจ'],
    ['Tense','ตึงเครียด'],['Suspenseful','ชวนลุ้นระทึก'],['Ominous','เป็นลางร้าย'],['Threatening','ให้ความรู้สึกคุกคาม'],['Chaotic','สับสนวุ่นวาย'],['Dramatic','เข้มข้นและมีพลัง'],['Stormy','ปั่นป่วนราวกับพายุ'],['Desolate','รกร้างไร้ชีวิต'],['Post-disaster','เงียบงันหลังภัยพิบัติ'],['Dystopian','กดดันในโลกที่เสื่อมโทรม'],
    ['Futuristic','ล้ำสมัยแบบโลกอนาคต'],['Technological','เต็มไปด้วยเทคโนโลยี'],['Clinical','สะอาดเป็นระเบียบแบบสถานพยาบาล'],['Industrial','ดิบแข็งแบบพื้นที่อุตสาหกรรม'],['Rustic','เรียบง่ายแบบชนบท'],['Natural and earthy','เป็นธรรมชาติและใกล้พื้นดิน'],['Minimal and clean','เรียบง่ายและสะอาดตา'],['Surreal','เหนือจริง'],['Otherworldly','แปลกตาราวกับอยู่อีกโลก'],['Timeless','เหนือกาลเวลา']
  ];
  const additionalMoodCores = [
    ['Hopeful','เปี่ยมด้วยความหวัง'],['Triumphant','รู้สึกถึงชัยชนะ'],['Celebratory','เต็มไปด้วยการเฉลิมฉลอง'],['Adventurous','ชวนออกผจญภัย'],['Curious','ชวนให้ใคร่รู้'],
    ['Inspiring','สร้างแรงบันดาลใจ'],['Liberating','ให้ความรู้สึกเป็นอิสระ'],['Reverent','สำรวมและเปี่ยมความเคารพ'],['Solemn','ขรึมและจริงจัง'],['Contemplative','ชวนครุ่นคิด'],
    ['Intimate','ใกล้ชิดและเป็นส่วนตัว'],['Tender','อ่อนโยนและละเอียดอ่อน'],['Bittersweet','หวานปนเศร้า'],['Regretful','เต็มไปด้วยความเสียดาย'],['Grieving','โศกเศร้าจากการสูญเสีย'],
    ['Foreboding','รู้สึกว่าบางสิ่งเลวร้ายกำลังมา'],['Paranoid','หวาดระแวงรอบด้าน'],['Claustrophobic','อึดอัดเหมือนถูกบีบล้อม'],['Urgent','เร่งด่วนและกดดัน'],['Explosive','รุนแรงพร้อมปะทุ'],
    ['Rebellious','ต่อต้านกฎเกณฑ์'],['Decadent','ฟุ่มเฟือยและเสื่อมถอย'],['Ceremonial','เป็นพิธีการและมีแบบแผน'],['Carnivalesque','คึกคักแปลกประหลาดแบบงานรื่นเริง'],['Mythic','ยิ่งใหญ่ราวกับตำนาน'],
    ['Apocalyptic','สิ้นหวังราวกับวันสิ้นโลก'],['Ethereal','บางเบาราวกับไม่มีตัวตน'],['Hallucinatory','พร่าเลือนเหมือนภาพหลอน'],['Uncanny','คุ้นเคยแต่ผิดธรรมชาติ'],['Liminal','อยู่กึ่งกลางระหว่างสองสภาวะ']
  ];
  const moodNuances = [
    ['with a quiet undertone','โดยมีความรู้สึกเงียบงันซ่อนอยู่'],
    ['with immersive depth','อย่างเข้มข้นและโอบล้อมผู้ชม'],
    ['with restrained emotion','โดยควบคุมอารมณ์ไว้อย่างพอดี'],
    ['with rising intensity','โดยความรู้สึกค่อย ๆ ทวีความเข้ม'],
    ['with lingering aftertaste','พร้อมความรู้สึกตกค้างหลังมองภาพ']
  ];
  const moodLightingGuides = [
    'ใช้แสงเช้าอ่อนและเงาจาง','ใช้แสงทองลอดผ่านช่องเปิด','ใช้แสงขาวกระจายทั่วพื้นที่','ใช้แสงด้านข้างเน้นพื้นผิว','ใช้แสงย้อนสร้างขอบเรือง',
    'ใช้แสงเย็นอมฟ้าและเงานุ่ม','ใช้แสงส้มต่ำใกล้ขอบฟ้า','ใช้แสงจากหน้าต่างเพียงด้านเดียว','ใช้แสงประดิษฐ์เป็นจุดเล็ก ๆ','ใช้เงายาวพาดผ่านพื้นที่',
    'ใช้แสงแข็งตัดกับเงามืด','ใช้แสงริบหรี่ที่ไม่สม่ำเสมอ','ใช้แสงสะท้อนจากพื้นเปียก','ใช้แสงนีออนหลายชั้น','ใช้แสงเทียนสั่นไหว',
    'ใช้แสงจันทร์สีเงิน','ใช้แสงสีแดงเข้มเป็นสัญญาณเตือน','ใช้แสงเขียวหม่นผิดธรรมชาติ','ใช้แสงม่วงบางเบาราวความฝัน','ใช้แสงขาวจ้าจนรายละเอียดบางส่วนหายไป',
    'ใช้แสงต่ำจนมองเห็นเพียงโครงร่าง','ใช้แสงจากด้านบนกดทับพื้นที่','ใช้แสงใต้พื้นหรือใต้ผิวน้ำ','ใช้แสงหลายทิศทางจนเกิดเงาซ้อน','ใช้ความมืดเป็นพื้นที่หลักและเหลือแสงเพียงจุดเดียว'
  ];
  const moodSpaceGuides = [
    'พื้นที่เปิดโล่ง มีอากาศไหลเวียน และสีสว่างสะอาด','ห้องขนาดเล็กมีวัตถุไม่กี่ชิ้นและเสียงรอบข้างเบาบาง','ทางเดินยาวมีชั้นระยะซ้อนกันและปลายทางไม่ชัดเจน',
    'สภาพอากาศมีหมอก ฝุ่น หรือไอน้ำช่วยแยกฉากเป็นหลายชั้น','พื้นที่มีร่องรอยการใช้งาน คราบ และวัสดุเก่าที่บอกเล่าอดีต','องค์ประกอบรอบฉากดูผิดสัดส่วนหรือวางตัวไม่เป็นไปตามธรรมชาติ'
  ];
  const moodLightingGuidesEnglish = [
    'soft morning light and faint shadows','golden light passing through openings','diffused white light filling the space','side light emphasizing surface texture','backlight creating glowing edges',
    'cool blue light with soft shadows','low orange light near the horizon','light entering from a single window','small points of artificial light','long shadows crossing the space',
    'hard light contrasting with darkness','dim and uneven illumination','light reflected from wet ground','layered neon lighting','flickering candlelight',
    'silver moonlight','deep red warning light','unnatural muted green light','faint violet dreamlike light','overexposed white light erasing some detail',
    'very low light revealing only silhouettes','top light pressing down on the space','light rising from below the floor or water','multidirectional light producing overlapping shadows','darkness dominating with one isolated light source'
  ];
  const moodSpaceGuidesEnglish = [
    'an open, airy space with clean bright colors','a small room with few objects and very little ambient sound','a long corridor with layered depth and no clear endpoint',
    'fog, dust, or vapor separating the scene into atmospheric layers','a worn space with stains and aged materials that suggest a past','surrounding elements with unnatural scale or impossible placement'
  ];
  additionalMoodCores.forEach(([english, thai], coreIndex) => {
    moodNuances.forEach((_, nuanceIndex) => {
      const guideIndex = coreIndex * moodNuances.length + nuanceIndex;
      const lighting = moodLightingGuides[guideIndex % moodLightingGuides.length];
      const space = moodSpaceGuides[Math.floor(guideIndex / moodLightingGuides.length)];
      const englishLighting = moodLightingGuidesEnglish[guideIndex % moodLightingGuidesEnglish.length];
      const englishSpace = moodSpaceGuidesEnglish[Math.floor(guideIndex / moodLightingGuidesEnglish.length)];
      sceneMoodPairs.push([`${english} — ${englishLighting}; ${englishSpace}`, `${thai} — ${lighting}; ${space}`]);
    });
  });
  const hollywoodFilmPairs = [
    ['Blade Runner 2049','มหานครอนาคตขนาดใหญ่ แสงสีจัด และบรรยากาศโดดเดี่ยว'],['Dune','ทะเลทรายกว้างใหญ่ สถาปัตยกรรมมหึมา และโลกอนาคตอันเคร่งขรึม'],['Interstellar','อวกาศเวิ้งว้าง ดาวเคราะห์แปลกตา และความยิ่งใหญ่ของธรรมชาติ'],['Inception','เมืองเหนือจริง สถาปัตยกรรมบิดตัว และพื้นที่คล้ายความฝัน'],['The Matrix','มหานครหม่นเขียว เทคโนโลยีลึกลับ และโลกจำลอง'],['Avatar','ป่าต่างดาวเรืองแสง ธรรมชาติอุดมสมบูรณ์ และภูเขาลอยฟ้า'],['Star Wars: A New Hope','ดาวทะเลทราย ยานอวกาศ และสิ่งปลูกสร้างในโลกอนาคต'],['2001: A Space Odyssey','ยานอวกาศเรียบสะอาด รูปทรงเรขาคณิต และอวกาศเงียบสงบ'],['Gravity','สถานีอวกาศเหนือโลกและความเวิ้งว้างไร้น้ำหนัก'],['The Martian','พื้นผิวดาวอังคารสีแดง ฐานวิจัย และภูมิประเทศแห้งแล้ง'],
    ['Mad Max: Fury Road','ทะเลทรายหลังภัยพิบัติ ยานพาหนะดัดแปลง และฝุ่นพายุ'],['The Lord of the Rings','ภูเขา ป่า ปราสาท และดินแดนแฟนตาซีอันกว้างใหญ่'],['Harry Potter and the Sorcerer’s Stone','ปราสาทเวทมนตร์ โถงหินเก่า และบรรยากาศลึกลับ'],['The Chronicles of Narnia','ป่าหิมะ ปราสาท และดินแดนเทพนิยาย'],['Pan’s Labyrinth','ป่าเก่า ซากหิน และโลกเทพนิยายที่มืดหม่น'],['Alice in Wonderland','สวนและสถาปัตยกรรมเหนือจริง สีสันจัด และรูปทรงแปลกตา'],['The Grand Budapest Hotel','โรงแรมย้อนยุค สีพาสเทล และองค์ประกอบภาพสมมาตร'],['La La Land','นครลอสแอนเจลิสยามเย็น สีสด และบรรยากาศชวนฝัน'],['The Great Gatsby','คฤหาสน์หรู งานตกแต่งระยิบระยับ และยุคคริสต์ทศวรรษ 1920'],['Titanic','เรือเดินสมุทรขนาดใหญ่ ความหรูหราย้อนยุค และมหาสมุทร'],
    ['Jurassic Park','ป่าเขตร้อน ศูนย์วิจัย และธรรมชาติขนาดมหึมา'],['Jaws','เมืองชายทะเล มหาสมุทรกว้าง และความตึงเครียดใต้ผิวน้ำ'],['The Revenant','ป่าหนาว ภูเขาหิมะ และธรรมชาติที่ดิบรุนแรง'],['The Secret Life of Walter Mitty','ภูเขา ชายฝั่ง และภูมิประเทศสำหรับการเดินทางผจญภัย'],['Life of Pi','มหาสมุทรกว้าง ท้องฟ้าสะท้อนน้ำ และภาพเหนือจริง'],['Cast Away','เกาะร้างเขตร้อน ชายหาด และความโดดเดี่ยว'],['Pirates of the Caribbean','ท่าเรือเก่า ทะเลแคริบเบียน และถ้ำสมบัติ'],['Indiana Jones and the Last Crusade','โบราณสถาน วิหารหิน และการผจญภัยในทะเลทราย'],['The Mummy','สุสานอียิปต์ ทะเลทราย และเมืองโบราณ'],['Gladiator','สนามประลองโรมัน พระราชวัง และเมืองโบราณขนาดใหญ่'],
    ['Troy','กำแพงเมืองโบราณ ชายฝั่ง และสนามรบขนาดใหญ่'],['Kingdom of Heaven','นครหินในยุคกลาง ป้อมปราการ และทะเลทราย'],['Memoirs of a Geisha','บ้านไม้ญี่ปุ่น สวนแบบดั้งเดิม และถนนเมืองเก่า'],['The Last Samurai','หมู่บ้านญี่ปุ่น ภูเขา และสถาปัตยกรรมสมัยเมจิ'],['Moulin Rouge!','โรงละครสีแดง งานตกแต่งฟุ่มเฟือย และกรุงปารีสยามค่ำ'],['The Godfather','คฤหาสน์มืด สำนักงานไม้ และเมืองอเมริกันย้อนยุค'],['Once Upon a Time in Hollywood','นครลอสแอนเจลิสปลายคริสต์ทศวรรษ 1960 และป้ายไฟย้อนยุค'],['The Shawshank Redemption','เรือนจำหินเก่า ทางเดินยาว และบรรยากาศอึดอัด'],['The Shining','โรงแรมเก่า ทางเดินสมมาตร และความวังเวง'],['Psycho','โรงแรมริมทาง บ้านเก่า และบรรยากาศน่ากังวล'],
    ['The Exorcist','บ้านเมืองเก่าที่มืดหม่น ห้องภายในสลัว และความหลอน'],['A Quiet Place','เมืองร้าง ฟาร์ม และโลกหลังภัยคุกคาม'],['Arrival','พื้นที่โล่งมีหมอก ยานต่างดาว และฐานปฏิบัติการ'],['Ex Machina','บ้านสมัยใหม่กลางธรรมชาติ กระจก คอนกรีต และเทคโนโลยี'],['Her','เมืองอนาคตอันอบอุ่น อาคารร่วมสมัย และสีอ่อน'],['Tron: Legacy','โลกดิจิทัลมืด เส้นแสงเรือง และรูปทรงเรขาคณิต'],['The Batman','มหานครฝนตก สถาปัตยกรรมกอทิก และตรอกมืด'],['Joker','เมืองเสื่อมโทรมช่วงคริสต์ทศวรรษ 1980 และแสงสีหม่น'],['Black Panther','นครอนาคตที่ผสานวัฒนธรรมแอฟริกาและเทคโนโลยี'],['Doctor Strange','เมืองและมิติที่พับซ้อน วงแสง และสถาปัตยกรรมเหนือจริง']
  ];
  const thaiFilmPairs = [
    ['นางนาก','ชุมชนริมน้ำ บ้านเรือนไทย และบรรยากาศสยองขวัญย้อนยุค'],['พี่มาก..พระโขนง','ชุมชนพระโขนงย้อนยุค บ้านไม้ริมน้ำ และบรรยากาศกึ่งขำกึ่งหลอน'],['ชัตเตอร์ กดติดวิญญาณ','กรุงเทพฯ ยามค่ำ ห้องมืด และบรรยากาศหลอนร่วมสมัย'],['ลัดดาแลนด์','หมู่บ้านจัดสรรยามค่ำ บ้านเงียบ และความน่ากังวล'],['แฝด','บ้านเก่า โรงพยาบาล และบรรยากาศความทรงจำที่หลอกหลอน'],['โปรแกรมหน้า วิญญาณอาฆาต','โรงภาพยนตร์มืด ทางเดินว่าง และบรรยากาศสยองขวัญ'],['สี่แพร่ง','ฉากเมือง โรงพยาบาล และพื้นที่ปิดที่ชวนหวาดระแวง'],['ห้าแพร่ง','สถานที่หลากหลายแบบไทยร่วมสมัยในบรรยากาศสยองขวัญ'],['ร่างทรง','หมู่บ้านภาคอีสาน ป่า ภูเขา และพิธีกรรมท้องถิ่น'],['ธี่หยด','ชนบทภาคกลาง บ้านไม้ และไร่นาในบรรยากาศหลอน'],
    ['ฉลาดเกมส์โกง','โรงเรียน ห้องสอบ และกรุงเทพฯ ร่วมสมัยที่ดูตึงเครียด'],['แฟนฉัน','ชุมชนต่างจังหวัดช่วงคริสต์ทศวรรษ 1980 โรงเรียน และร้านค้าเก่า'],['เพื่อนสนิท','มหาวิทยาลัย ชายทะเล และบรรยากาศความทรงจำวัยหนุ่มสาว'],['สิ่งเล็กเล็กที่เรียกว่า...รัก','โรงเรียนต่างจังหวัด ถนนชุมชน และบรรยากาศสดใส'],['คิดถึงวิทยา','โรงเรียนเรือนแพกลางน้ำ ภูเขา และธรรมชาติอันสงบ'],['ฟรีแลนซ์..ห้ามป่วย ห้ามพัก ห้ามรักหมอ','กรุงเทพฯ ร่วมสมัย ห้องทำงาน และโรงพยาบาล'],['ฮาวทูทิ้ง..ทิ้งอย่างไรไม่ให้เหลือเธอ','บ้านสีขาวเรียบง่าย พื้นที่ว่าง และบรรยากาศนิ่งสงบ'],['One Day แฟนเดย์..แฟนกันแค่วันเดียว','เมืองญี่ปุ่นฤดูหนาว ลานหิมะ และแหล่งท่องเที่ยว'],['ATM เออรัก เออเร่อ','ธนาคาร สำนักงาน และเมืองไทยร่วมสมัยสีสด'],['ไอฟาย..แต๊งกิ้ว..เลิฟยู้','โรงเรียนสอนภาษา สำนักงาน และบรรยากาศตลกร่วมสมัย'],
    ['กวน มึน โฮ','กรุงโซล แหล่งท่องเที่ยว และเมืองยามค่ำ'],['รถไฟฟ้า มาหานะเธอ','กรุงเทพฯ รถไฟฟ้า สำนักงาน และเมืองยามค่ำ'],['เมย์ไหน..ไฟแรงเฟร่อ','โรงเรียนมัธยม สนามกีฬา และโลกวัยรุ่นสีสันสดใส'],['Mary Is Happy, Mary Is Happy','โรงเรียนและพื้นที่วัยรุ่นในภาพกึ่งจริงกึ่งเหนือจินตนาการ'],['รักแห่งสยาม','ย่านสยาม กรุงเทพฯ ช่วงเทศกาล และบรรยากาศอบอุ่นปนเศร้า'],['โหมโรง','เรือนไทย โรงดนตรี และสยามในช่วงเปลี่ยนผ่านทางวัฒนธรรม'],['ทวิภพ','พระนครในอดีต เรือนไทย และสถานที่ประวัติศาสตร์'],['สุริโยไท','พระราชวัง เมืองโบราณ และสนามรบสมัยอยุธยา'],['ตำนานสมเด็จพระนเรศวรมหาราช','เมืองป้อม พระราชวัง และสนามรบสมัยอยุธยา'],['บางระจัน','หมู่บ้านค่ายไม้ ทุ่งนา และสนามรบย้อนยุค'],
    ['ขุนพันธ์','เมืองไทยย้อนยุค ป่า และสถานที่ราชการในบรรยากาศเข้มข้น'],['ขุนแผน ฟ้าฟื้น','โลกไทยแฟนตาซี ตลาด วัง และฉากเวทมนตร์สีสันจัด'],['ปืนใหญ่จอมสลัด','เมืองท่าทางใต้ ทะเล และโลกแฟนตาซีย้อนยุค'],['องค์บาก','หมู่บ้านชนบท วัด และกรุงเทพฯ ในบรรยากาศการต่อสู้'],['ต้มยำกุ้ง','กรุงเทพฯ และนครซิดนีย์ในบรรยากาศการไล่ล่า'],['Chocolate ช็อกโกแลต','ตลาด ชุมชนเมือง และโกดังในบรรยากาศการต่อสู้'],['บอดี้การ์ดหน้าเหลี่ยม','เมืองและอาคารหรูในภาพตลกแบบภาพยนตร์ต่อสู้'],['มือปืน/โลก/พระ/จัน','เมืองไทยและพื้นที่ชายขอบในบรรยากาศอาชญากรรมแปลกประหลาด'],['2499 อันธพาลครองเมือง','กรุงเทพฯ ย้อนยุค ย่านการค้า และตรอกในคริสต์ทศวรรษ 1950'],['อันธพาล','กรุงเทพฯ ย้อนยุค โรงภาพยนตร์ ร้านค้า และย่านนักเลง'],
    ['หมานคร','กรุงเทพฯ เหนือจริง สีสด และสถานที่ประจำวันที่ดูแปลกตา'],['Citizen Dog','มหานครกรุงเทพฯ ในมุมมองเหนือจริงและเต็มไปด้วยสีสัน'],['ลุงบุญมีระลึกชาติ','ชนบทภาคอีสาน ป่า ถ้ำ และบรรยากาศลึกลับสงบนิ่ง'],['สัตว์ประหลาด!','ชนบทและป่าภาคอีสานในบรรยากาศเหนือจริง'],['รักที่ขอนแก่น','เมืองขอนแก่น โรงพยาบาลชั่วคราว และบรรยากาศเหมือนความฝัน'],['กระเบนราหู','ป่าชายเลน ชุมชนชายฝั่ง และภาพนิ่งลึกลับ'],['มะลิลา','สวนมะลิ ชนบท และธรรมชาติที่สงบปนเศร้า'],['เพื่อน..ที่ระลึก','อาคารร้างสูงใหญ่ กรุงเทพฯ และความหลอนร่วมสมัย'],['The Pool นรก 6 เมตร','สระว่ายน้ำร้างลึกและพื้นที่ปิดที่กดดัน'],['โฮมสเตย์','กรุงเทพฯ โรงเรียน โรงพยาบาล และพื้นที่เหนือธรรมชาติร่วมสมัย']
  ];
  const extraHollywoodTitles = `Alien|Aliens|Prometheus|Moon|Sunshine|Ad Astra|Contact|District 9|Minority Report|Children of Men|Snowpiercer|The Fifth Element|Ready Player One|Alita: Battle Angel|Elysium|Oblivion|Edge of Tomorrow|A.I. Artificial Intelligence|The Creator|Tenet|Everything Everywhere All at Once|Cloud Atlas|Annihilation|The Abyss|Waterworld|The Book of Eli|The Road|I Am Legend|28 Days Later|World War Z|Contagion|The Day After Tomorrow|2012|Twister|The Perfect Storm|Everest|The Northman|Gladiator|Troy|Kingdom of Heaven|The Last Samurai|Master and Commander|Apocalypto|The New World|The Patriot|1917|Dunkirk|Saving Private Ryan|Schindler’s List|The Pianist|Lawrence of Arabia|Doctor Zhivago|The English Patient|Out of Africa|The Last Emperor|Memoirs of a Geisha|Crouching Tiger Hidden Dragon|Hero|House of Flying Daggers|Curse of the Golden Flower|Ran|Seven Samurai|The Green Knight|Excalibur|Willow|Stardust|The Princess Bride|The NeverEnding Story|The Dark Crystal|Labyrinth|The Shape of Water|Edward Scissorhands|Sleepy Hollow|Crimson Peak|The Witch|The Lighthouse|Midsommar|Hereditary|The Shining|Doctor Sleep|The Conjuring|It|Get Out|Us|Nope|Psycho|Rear Window|Vertigo|North by Northwest|Chinatown|L.A. Confidential|Se7en|Zodiac|Prisoners|Gone Girl|The Godfather|The Godfather Part II|Goodfellas|Scarface|Heat|The Departed|American Gangster|Road to Perdition|The Untouchables|Once Upon a Time in America|Casablanca|Roman Holiday|Breakfast at Tiffany’s|West Side Story|Moulin Rouge!|Chicago|The Sound of Music|Amélie|Midnight in Paris|The French Dispatch|Parasite|Roma|Nomadland|The Florida Project|Moonlight|Call Me by Your Name|Little Women|Pride and Prejudice|Atonement|The Favourite|Marie Antoinette|Elizabeth|The King’s Speech|Darkest Hour|Oppenheimer|The Social Network|Moneyball|The Wolf of Wall Street|The Big Short|Steve Jobs|Raiders of the Lost Ark|Indiana Jones and the Last Crusade|The Mummy|Pirates of the Caribbean|National Treasure|Mission: Impossible – Fallout|Skyfall|Casino Royale|John Wick|Top Gun: Maverick|The Fall|The Cell|Brazil|Gattaca|The Fountain|The Tree of Life|Sicario|No Country for Old Men|There Will Be Blood|Once Upon a Time in Hollywood`.split('|');
  extraHollywoodTitles.push('The Brutalist','Babylon','Killers of the Flower Moon','The Hateful Eight','Django Unchained','The Last of the Mohicans','The Thin Red Line','Apocalypse Now');
  const extraThaiTitles = `แสงกระสือ|กระสือสยาม|หอแต๋วแตก|บุปผาราตรี|ลองของ|คน ผี ปีศาจ|เด็กหอ|ผีสามบาท|ผีคนเป็น|บ้านผีปอบ|ตายโหง|ตายโหง ตายเฮี้ยน|ฝากไว้..ในกายเธอ|เพื่อนเฮี้ยน..โรงเรียนหลอน|มหาลัยเที่ยงคืน|เทอมสอง สยองขวัญ|เทอม 3|โกสต์แล็บ..ฉีกกฎทดลองผี|Season Change เพราะอากาศเปลี่ยนแปลงบ่อย|ปิดเทอมใหญ่..หัวใจว้าวุ่น|หนีตามกาลิเลโอ|SuckSeed ห่วยขั้นเทพ|Top Secret วัยรุ่นพันล้าน|เกรียน ฟิคชั่น|ตั้งวง|Snap แค่...ได้คิดถึง|Die Tomorrow|Happy Old Year|Friend Zone ระวัง..สิ้นสุดทางเพื่อน|พรจากฟ้า|Low Season สุขสันต์วันโสด|Fast & Feel Love|บุพเพสันนิวาส ๒|อ้ายคนหล่อลวง|ตุ๊ดซี่ส์ แอนด์ เดอะเฟค|น้อง.พี่.ที่รัก|ไบค์แมน ศักรินทร์ตูดหมึก|ไบค์แมน 2|อีเรียมซิ่ง|แหยม ยโสธร|แหยม ยโสธร 2|แหยม ยโสธร 3|โปงลางสะดิ้ง ลำซิ่งส่ายหน้า|ฮักนะ สารคาม|ผู้บ่าวไทบ้าน อีสานจ้วด|ส่ม ภัค เสี่ยน|ไทบ้านเดอะซีรีส์|ไทบ้านเดอะซีรีส์ 2.1|ไทบ้านเดอะซีรีส์ 2.2|ไทบ้าน x BNK48 จากใจผู้สาวคนนี้|สัปเหร่อ|ครูบ้านนอก|ครูบ้านนอก บ้านหนองฮีใหญ่|มนต์รักทรานซิสเตอร์|มนต์รักลูกทุ่ง|แผลเก่า|ข้างหลังภาพ|คู่กรรม|อำแดงเหมือนกับนายริด|นางนากพระโขนง|พันท้ายนรสิงห์|ฟ้าทะลายโจร|มหาอุตม์|เสือโจรพันธุ์เสือ|ขุนพันธ์ 2|ขุนพันธ์ 3|ตำนานสมเด็จพระนเรศวรมหาราช ภาคองค์ประกันหงสา|ตำนานสมเด็จพระนเรศวรมหาราช ภาคประกาศอิสรภาพ|ตำนานสมเด็จพระนเรศวรมหาราช ภาคยุทธนาวี|ตำนานสมเด็จพระนเรศวรมหาราช ภาคศึกนันทบุเรง|ตำนานสมเด็จพระนเรศวรมหาราช ภาคยุทธหัตถี|ตำนานสมเด็จพระนเรศวรมหาราช ภาคอวสานหงสา|บางระจัน 2|ตำนานพันท้ายนรสิงห์|ศรีอโยธยา|บุญชูผู้น่ารัก|บุญชู 2 น้องใหม่|บุญชู 5 เนื้อหอม|บุญชู 8 เพื่อเธอ|บุญชู 9 ไอ-เลิฟ-สระ-อู|บุญชู 10 จะอยู่ในใจเสมอ|น้ำพุ|วัยอลวน|ความจำสั้น แต่รักฉันยาว|มหา’ลัย เหมืองแร่|เด็กเสเพล|น้ำตาลแดง|รัก/สาม/เศร้า|ชั่วฟ้าดินสลาย|จันดารา ปฐมบท|จันดารา ปัจฉิมบท|แม่เบี้ย|อุโมงค์ผาเมือง|ฝนตกขึ้นฟ้า|เฉือน|13 เกมสยอง|เคาท์ดาวน์|คืนบาป พรหมพิราม|เฉิ่ม|มือปืนดาวพระเสาร์|ไชยา|สวยลากไส้|ตีสาม|ตีสาม คืนสาม|วัยเป้ง นักเลงขาสั้น|4 Kings|4 Kings 2|นักเลง-กูร้อย|สายล่อฟ้า|โอปปาติก เกิดอมตะ|เดอะเลตเตอร์ จดหมายรัก|กุมภาพันธ์|Timeline จดหมาย ความทรงจำ|Teacher’s Diary|Dear Dakanda|Hello Stranger|Bangkok Traffic Love Story|Seven Something|One Day|Brother of the Year|Heart Attack|Bad Genius|Homestay|The Billionaire|Happy Birthday|Hormones ปิดเทอมใหญ่ หัวใจว้าวุ่น|Yes or No อยากรัก ก็รักเลย|Yes or No 2 รักไม่รัก อย่ากั๊กเลย|ดาวคะนอง|อนธการ|โรงแรมต่างดาว|เวลา|วันสุดท้าย..ก่อนบายเธอ|One for the Road วันสุดท้าย..ก่อนบายเธอ|แมนสรวง|หุ่นพยนต์|ธี่หยด 2|วิมานหนาม|หลานม่า|สุขสันต์วันกลับบ้าน|บ้านเช่า..บูชายัญ|ของแขก|แดง พระโขนง|ทองสุก 13|เน็ต ไอ ดาย|สยามสแควร์|คืนยุติ-ธรรม|นคร-สวรรค์|พญาโศก|คนทรงเจ้า|อาปัติ|เปรมิกาป่าราบ|15 ค่ำ เดือน 11|โอเคเบตง|มนต์รักวัวชน|มอร์ริสัน|มะขิ่น|The Medium|Faces of Anne|ปฏิบัติการกู้หวย`.split('|');
  const filmSceneNotes = ['เมืองและอาคารที่มีบุคลิกชัดเจน','ธรรมชาติและภูมิประเทศที่สร้างมิติ','ฉากร่วมสมัยกับแสงสีแบบภาพยนตร์','พื้นที่ปิดที่เน้นอารมณ์และพื้นผิว','สถานที่ย้อนยุคและรายละเอียดวิถีชีวิต','พื้นที่ลึกลับที่ใช้เงาและความว่าง','สภาพแวดล้อมดิบที่มีร่องรอยเวลา','ฉากกลางคืนและแสงประดิษฐ์','ชุมชนที่สะท้อนวัฒนธรรมท้องถิ่น','สถานที่กว้างที่เน้นความลึก','แสงธรรมชาติและรายละเอียดชีวิตประจำวัน','พื้นที่ตึงเครียดและองค์ประกอบกดดัน','โลกเหนือจริงจากสถานที่คุ้นเคย','ฉากชนบทและพื้นผิวธรรมชาติ','สถานที่หรูและวัสดุสะท้อนแสง','พื้นที่เสื่อมโทรมและร่องรอยความเสียหาย','ฉากเดินทางกับภูมิประเทศหลากหลาย','พื้นที่พิธีกรรมและแสงศรัทธา','ฉากริมน้ำและบรรยากาศชื้น','โครงสร้างอุตสาหกรรมและแสงแข็ง'];
  const fillFilmPairs = (pairs, titles) => {
    const existing = new Set(pairs.map(([title]) => title.toLocaleLowerCase()));
    titles.forEach((title, index) => { if (!existing.has(title.toLocaleLowerCase()) && pairs.length < 200) { pairs.push([title, `${title} — ${filmSceneNotes[index % filmSceneNotes.length]}`]); existing.add(title.toLocaleLowerCase()); } });
  };
  fillFilmPairs(hollywoodFilmPairs, extraHollywoodTitles);
  fillFilmPairs(thaiFilmPairs, extraThaiTitles);
  const sceneTimePairs = Array.from({ length:48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 ? 30 : 0;
    const clock = `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
    const thaiPeriod = hour < 5 ? 'กลางดึก' : hour < 7 ? 'รุ่งเช้า' : hour < 11 ? 'ช่วงเช้า' : hour < 13 ? 'ช่วงเที่ยง' : hour < 16 ? 'ช่วงบ่าย' : hour < 18 ? 'ช่วงเย็น' : hour < 20 ? 'ช่วงค่ำ' : 'กลางคืน';
    return [`${clock} hours`, `${clock} น. — ${thaiPeriod}`];
  });
  sceneTimePairs.push(['Just before sunrise','ก่อนพระอาทิตย์ขึ้นเล็กน้อย'],['Just after sunset','หลังพระอาทิตย์ตกเล็กน้อย']);
  const sceneYearPairs = [
    ['B.E. 1700','พ.ศ. 1700 · ค.ศ. 1157 โดยประมาณ · ชุมชนโบราณในลุ่มเจ้าพระยาและอิทธิพลศิลปะขอม'],
    ['B.E. 1781','พ.ศ. 1781 · ค.ศ. 1238 โดยประมาณ · ช่วงเริ่มต้นอาณาจักรสุโขทัย'],
    ['B.E. 1800','พ.ศ. 1800 · ค.ศ. 1257 โดยประมาณ · เมืองสุโขทัยกำลังเติบโตและมีศาสนสถานสำคัญ'],
    ['B.E. 1826','พ.ศ. 1826 · ค.ศ. 1283 โดยประมาณ · รัชสมัยพ่อขุนรามคำแหงและการขยายตัวของสุโขทัย'],
    ['B.E. 1835','พ.ศ. 1835 · ค.ศ. 1292 โดยประมาณ · ช่วงเวลาที่เชื่อมโยงกับศิลาจารึกหลักที่ 1'],
    ['B.E. 1893','พ.ศ. 1893 · ค.ศ. 1350 · สถาปนากรุงศรีอยุธยาเป็นราชธานี'],
    ['B.E. 1912','พ.ศ. 1912 · ค.ศ. 1369 · อยุธยาตอนต้นและการขยายอำนาจในลุ่มเจ้าพระยา'],
    ['B.E. 1991','พ.ศ. 1991 · ค.ศ. 1448 · เริ่มรัชสมัยสมเด็จพระบรมไตรโลกนาถและการปรับระบบการปกครอง'],
    ['B.E. 2034','พ.ศ. 2034 · ค.ศ. 1491 · อยุธยาช่วงการค้าภูมิภาคและวัดวาอารามรุ่งเรือง'],
    ['B.E. 2112','พ.ศ. 2112 · ค.ศ. 1569 · กรุงศรีอยุธยาเสียแก่กองทัพหงสาวดีครั้งแรก'],
    ['B.E. 2127','พ.ศ. 2127 · ค.ศ. 1584 · สมเด็จพระนเรศวรทรงประกาศอิสรภาพจากหงสาวดี'],
    ['B.E. 2133','พ.ศ. 2133 · ค.ศ. 1590 · เริ่มรัชสมัยสมเด็จพระนเรศวรมหาราช'],
    ['B.E. 2148','พ.ศ. 2148 · ค.ศ. 1605 · ปลายรัชสมัยสมเด็จพระนเรศวรและการเปลี่ยนผ่านราชสำนัก'],
    ['B.E. 2199','พ.ศ. 2199 · ค.ศ. 1656 · เริ่มรัชสมัยสมเด็จพระนารายณ์และการค้าระหว่างประเทศรุ่งเรือง'],
    ['B.E. 2231','พ.ศ. 2231 · ค.ศ. 1688 · การเปลี่ยนแปลงทางการเมืองปลายรัชสมัยสมเด็จพระนารายณ์'],
    ['B.E. 2275','พ.ศ. 2275 · ค.ศ. 1732 · เริ่มรัชสมัยสมเด็จพระเจ้าอยู่หัวบรมโกศและศิลปกรรมอยุธยาตอนปลาย'],
    ['B.E. 2310','พ.ศ. 2310 · ค.ศ. 1767 · กรุงศรีอยุธยาเสียครั้งที่สองและสิ้นสุดราชธานีอยุธยา'],
    ['B.E. 2311','พ.ศ. 2311 · ค.ศ. 1768 · สถาปนากรุงธนบุรีเป็นราชธานี'],
    ['B.E. 2325','พ.ศ. 2325 · ค.ศ. 1782 · สถาปนากรุงรัตนโกสินทร์และราชวงศ์จักรี'],
    ['B.E. 2352','พ.ศ. 2352 · ค.ศ. 1809 · เริ่มรัชกาลที่ 2 และยุควรรณคดีศิลปกรรมเฟื่องฟู'],
    ['B.E. 2367','พ.ศ. 2367 · ค.ศ. 1824 · เริ่มรัชกาลที่ 3 และการค้าทางเรือขยายตัว'],
    ['B.E. 2394','พ.ศ. 2394 · ค.ศ. 1851 · เริ่มรัชกาลที่ 4 และการติดต่อโลกตะวันตกเพิ่มขึ้น'],
    ['B.E. 2398','พ.ศ. 2398 · ค.ศ. 1855 · สนธิสัญญาเบาว์ริงและการค้าเสรีขยายตัว'],
    ['B.E. 2411','พ.ศ. 2411 · ค.ศ. 1868 · เริ่มรัชกาลที่ 5 และการปรับประเทศสู่ความทันสมัย'],
    ['B.E. 2435','พ.ศ. 2435 · ค.ศ. 1892 · ปฏิรูประบบราชการและจัดตั้งกระทรวงแบบใหม่'],
    ['B.E. 2439','พ.ศ. 2439 · ค.ศ. 1896 · เปิดเดินรถไฟหลวงสายแรกช่วงกรุงเทพฯ–อยุธยา'],
    ['B.E. 2448','พ.ศ. 2448 · ค.ศ. 1905 · กระบวนการเลิกทาสในสยามเข้าสู่ขั้นสำคัญ'],
    ['B.E. 2453','พ.ศ. 2453 · ค.ศ. 1910 · เริ่มรัชกาลที่ 6 และวัฒนธรรมเมืองสมัยใหม่ขยายตัว'],
    ['B.E. 2460','พ.ศ. 2460 · ค.ศ. 1917 · สยามเข้าร่วมสงครามโลกครั้งที่หนึ่งฝ่ายสัมพันธมิตร'],
    ['B.E. 2468','พ.ศ. 2468 · ค.ศ. 1925 · เริ่มรัชกาลที่ 7 ท่ามกลางการเปลี่ยนแปลงทางเศรษฐกิจและสังคม'],
    ['B.E. 2475','พ.ศ. 2475 · ค.ศ. 1932 · เปลี่ยนแปลงการปกครองสู่ระบอบราชาธิปไตยภายใต้รัฐธรรมนูญ'],
    ['B.E. 2482','พ.ศ. 2482 · ค.ศ. 1939 · เปลี่ยนชื่อประเทศจากสยามเป็นประเทศไทย'],
    ['B.E. 2484','พ.ศ. 2484 · ค.ศ. 1941 · ประเทศไทยเข้าสู่บริบทสงครามโลกครั้งที่สองในเอเชีย'],
    ['B.E. 2489','พ.ศ. 2489 · ค.ศ. 1946 · เริ่มรัชกาลที่ 9 และสังคมไทยหลังสงคราม'],
    ['B.E. 2493','พ.ศ. 2493 · ค.ศ. 1950 · พระราชพิธีบรมราชาภิเษกและกรุงเทพฯ ยุคหลังสงคราม'],
    ['B.E. 2500','พ.ศ. 2500 · ค.ศ. 1957 · จุดเปลี่ยนทางการเมืองและการพัฒนาเมืองสมัยใหม่'],
    ['B.E. 2504','พ.ศ. 2504 · ค.ศ. 1961 · เริ่มแผนพัฒนาเศรษฐกิจและสังคมแห่งชาติฉบับแรก'],
    ['B.E. 2516','พ.ศ. 2516 · ค.ศ. 1973 · เหตุการณ์ 14 ตุลาคมและการเคลื่อนไหวของประชาชน'],
    ['B.E. 2519','พ.ศ. 2519 · ค.ศ. 1976 · เหตุการณ์ 6 ตุลาคมและบรรยากาศการเมืองตึงเครียด'],
    ['B.E. 2525','พ.ศ. 2525 · ค.ศ. 1982 · ฉลองกรุงรัตนโกสินทร์ครบ 200 ปี'],
    ['B.E. 2535','พ.ศ. 2535 · ค.ศ. 1992 · เหตุการณ์พฤษภาทมิฬและการเปลี่ยนผ่านทางการเมือง'],
    ['B.E. 2540','พ.ศ. 2540 · ค.ศ. 1997 · วิกฤตเศรษฐกิจต้มยำกุ้งและรัฐธรรมนูญฉบับใหม่'],
    ['B.E. 2542','พ.ศ. 2542 · ค.ศ. 1999 · รถไฟฟ้าบีทีเอสเปิดบริการและภูมิทัศน์กรุงเทพฯ เปลี่ยนไป'],
    ['B.E. 2547','พ.ศ. 2547 · ค.ศ. 2004 · เหตุการณ์สึนามิส่งผลต่อชุมชนชายฝั่งอันดามัน'],
    ['B.E. 2554','พ.ศ. 2554 · ค.ศ. 2011 · มหาอุทกภัยกระทบพื้นที่ภาคกลางและกรุงเทพฯ'],
    ['B.E. 2559','พ.ศ. 2559 · ค.ศ. 2016 · เริ่มรัชกาลที่ 10 และช่วงเปลี่ยนผ่านของสังคมไทย'],
    ['B.E. 2563','พ.ศ. 2563 · ค.ศ. 2020 · การระบาดของโควิด-19 เปลี่ยนวิถีชีวิตและพื้นที่สาธารณะ'],
    ['B.E. 2567','พ.ศ. 2567 · ค.ศ. 2024 · กฎหมายสมรสเท่าเทียมผ่านความเห็นชอบและสังคมดิจิทัลเติบโต'],
    ['B.E. 2568','พ.ศ. 2568 · ค.ศ. 2025 · สมรสเท่าเทียมมีผลใช้บังคับและเมืองร่วมสมัยฟื้นตัวเต็มรูปแบบ'],
    ['B.E. 2569','พ.ศ. 2569 · ค.ศ. 2026 · ยุคร่วมสมัย เทคโนโลยีปัญญาประดิษฐ์ และสังคมเชื่อมต่อสูง']
  ];
  const sceneYearEnglishDescriptions = [
    'Ancient Chao Phraya communities with Khmer artistic influence', 'Approximate beginning of the Sukhothai Kingdom',
    'Sukhothai grew around important religious monuments', 'King Ramkhamhaeng’s reign and the expansion of Sukhothai',
    'Period associated with the Ramkhamhaeng Inscription', 'Ayutthaya was founded as the capital',
    'Early Ayutthaya expanded across the Chao Phraya basin', 'King Borommatrailokkanat began major administrative reforms',
    'Regional trade and temple building flourished', 'Ayutthaya fell to Hongsawadi for the first time',
    'King Naresuan declared independence from Hongsawadi', 'The reign of King Naresuan began',
    'The late reign of King Naresuan and a royal transition', 'King Narai’s reign began and international trade flourished',
    'Political change followed the end of King Narai’s reign', 'King Borommakot’s reign and late-Ayutthaya arts',
    'Ayutthaya fell for the second time', 'Thonburi was established as the capital',
    'Bangkok and the Chakri dynasty were founded', 'Rama II’s reign and a flourishing of literature and arts',
    'Rama III’s reign began and maritime trade expanded', 'Rama IV’s reign began with increasing Western contact',
    'The Bowring Treaty expanded free trade', 'Rama V’s reign began and modernization accelerated',
    'Government ministries were reorganized', 'The Bangkok–Ayutthaya state railway section opened',
    'The abolition of slavery reached a decisive stage', 'Rama VI’s reign began as modern urban culture expanded',
    'Siam joined the Allies in the First World War', 'Rama VII’s reign began amid economic and social change',
    'Thailand changed to a constitutional monarchy', 'Siam was renamed Thailand',
    'Thailand entered the Asian theater of the Second World War', 'The reign of Rama IX began in postwar Thailand',
    'The coronation of Rama IX took place', 'A political turning point accompanied rapid urban development',
    'The first National Economic and Social Development Plan began', 'The 14 October popular uprising',
    'The 6 October event amid intense political tension', 'Bangkok celebrated 200 years of Rattanakosin',
    'Black May marked a major political transition', 'The Asian financial crisis and a new constitution',
    'The BTS Skytrain opened in Bangkok', 'The Indian Ocean tsunami struck the Andaman coast',
    'Severe flooding affected central Thailand and Bangkok', 'The reign of Rama X began',
    'The COVID-19 pandemic transformed public life', 'Marriage-equality legislation passed',
    'Marriage equality took effect', 'The present era of artificial intelligence and digital society'
  ];
  sceneYearPairs.forEach((pair, index) => { pair[0] = `${pair[0]} — ${sceneYearEnglishDescriptions[index]}`; });
  const additionalSceneYearPairs = [
    ['B.E. 1730 — Regional centers grew in the upper Chao Phraya basin','พ.ศ. 1730 · ค.ศ. 1187 โดยประมาณ · ศูนย์กลางชุมชนในลุ่มเจ้าพระยาตอนบนเริ่มเติบโต'],
    ['B.E. 1750 — Tai-speaking communities expanded across mainland Southeast Asia','พ.ศ. 1750 · ค.ศ. 1207 โดยประมาณ · ชุมชนผู้พูดภาษาไทขยายตัวในเอเชียตะวันออกเฉียงใต้ภาคพื้นทวีป'],
    ['B.E. 1760 — Hariphunchai and Khmer cultural influences remained visible','พ.ศ. 1760 · ค.ศ. 1217 โดยประมาณ · อิทธิพลวัฒนธรรมหริภุญชัยและขอมยังปรากฏในภูมิภาค'],
    ['B.E. 1770 — Settlements around Sukhothai developed before independence','พ.ศ. 1770 · ค.ศ. 1227 โดยประมาณ · ชุมชนบริเวณสุโขทัยพัฒนาขึ้นก่อนการตั้งอาณาจักร'],
    ['B.E. 1790 — Sukhothai consolidated settlements and trade routes','พ.ศ. 1790 · ค.ศ. 1247 โดยประมาณ · สุโขทัยรวบรวมชุมชนและเส้นทางการค้าในภูมิภาค'],
    ['B.E. 1810 — Sukhothai art and Theravada culture developed','พ.ศ. 1810 · ค.ศ. 1267 โดยประมาณ · ศิลปะสุโขทัยและวัฒนธรรมพุทธเถรวาทพัฒนาเด่นชัด'],
    ['B.E. 1850 — Sukhothai maintained links with neighboring states','พ.ศ. 1850 · ค.ศ. 1307 โดยประมาณ · สุโขทัยมีความสัมพันธ์กับบ้านเมืองใกล้เคียง'],
    ['B.E. 1870 — Ayutthaya-area settlements expanded','พ.ศ. 1870 · ค.ศ. 1327 โดยประมาณ · ชุมชนแถบอยุธยาขยายตัวและอำนาจภูมิภาคเริ่มเปลี่ยน'],
    ['B.E. 1900 — Ayutthaya developed as a river-trading capital','พ.ศ. 1900 · ค.ศ. 1357 โดยประมาณ · อยุธยาพัฒนาเป็นราชธานีการค้าบนเครือข่ายแม่น้ำ'],
    ['B.E. 1931 — Early Ayutthaya expanded toward Angkor','พ.ศ. 1931 · ค.ศ. 1388 โดยประมาณ · อยุธยาตอนต้นขยายอิทธิพลไปทางดินแดนเขมร'],
    ['B.E. 1967 — Ayutthaya incorporated Sukhothai more firmly','พ.ศ. 1967 · ค.ศ. 1424 โดยประมาณ · อยุธยาผนวกเครือข่ายสุโขทัยเข้าสู่อำนาจมากขึ้น'],
    ['B.E. 2050 — Maritime commerce connected Ayutthaya with Asian ports','พ.ศ. 2050 · ค.ศ. 1507 โดยประมาณ · การค้าทางทะเลเชื่อมอยุธยากับเมืองท่าในเอเชีย'],
    ['B.E. 2091 — Portuguese communities were active in Ayutthaya','พ.ศ. 2091 · ค.ศ. 1548 โดยประมาณ · ชุมชนและพ่อค้าโปรตุเกสมีบทบาทในอยุธยา'],
    ['B.E. 2100 — Ayutthaya was a cosmopolitan fortified river city','พ.ศ. 2100 · ค.ศ. 1557 โดยประมาณ · อยุธยาเป็นนครนานาชาติที่มีป้อมและคูคลอง'],
    ['B.E. 2120 — Warfare reshaped settlements around Ayutthaya','พ.ศ. 2120 · ค.ศ. 1577 โดยประมาณ · สงครามส่งผลต่อชุมชนรอบศูนย์กลางอยุธยา'],
    ['B.E. 2143 — Ayutthaya regained strength under King Naresuan','พ.ศ. 2143 · ค.ศ. 1600 โดยประมาณ · อยุธยากลับมาเข้มแข็งในรัชสมัยสมเด็จพระนเรศวร'],
    ['B.E. 2150 — International trade increased in Ayutthaya','พ.ศ. 2150 · ค.ศ. 1607 โดยประมาณ · การค้าระหว่างประเทศของอยุธยาเพิ่มขึ้น'],
    ['B.E. 2163 — Japanese, Persian, and European quarters grew','พ.ศ. 2163 · ค.ศ. 1620 โดยประมาณ · ชุมชนญี่ปุ่น เปอร์เซีย และยุโรปในอยุธยาเติบโต'],
    ['B.E. 2180 — Riverfront markets and foreign quarters expanded','พ.ศ. 2180 · ค.ศ. 1637 โดยประมาณ · ตลาดริมน้ำและย่านชาวต่างชาติขยายตัว'],
    ['B.E. 2200 — Ayutthaya prospered during King Narai’s reign','พ.ศ. 2200 · ค.ศ. 1657 · อยุธยาเข้าสู่ช่วงรุ่งเรืองในรัชสมัยสมเด็จพระนารายณ์'],
    ['B.E. 2211 — Diplomatic and commercial contact with France intensified','พ.ศ. 2211 · ค.ศ. 1668 โดยประมาณ · ความสัมพันธ์ทางการทูตและการค้ากับฝรั่งเศสเพิ่มขึ้น'],
    ['B.E. 2228 — Siamese envoys traveled to the court of Louis XIV','พ.ศ. 2228 · ค.ศ. 1685 · คณะราชทูตสยามเดินทางไปเชื่อมสัมพันธ์กับราชสำนักฝรั่งเศส'],
    ['B.E. 2250 — Late-Ayutthaya court culture remained vibrant','พ.ศ. 2250 · ค.ศ. 1707 โดยประมาณ · วัฒนธรรมราชสำนักและงานช่างอยุธยาตอนปลายยังรุ่งเรือง'],
    ['B.E. 2265 — Temple restoration and literary culture expanded','พ.ศ. 2265 · ค.ศ. 1722 โดยประมาณ · การบูรณะวัดและวัฒนธรรมวรรณคดีขยายตัว'],
    ['B.E. 2290 — Ayutthaya remained an important commercial city','พ.ศ. 2290 · ค.ศ. 1747 โดยประมาณ · อยุธยายังเป็นเมืองการค้าสำคัญก่อนเสื่อมอำนาจ'],
    ['B.E. 2300 — Military pressure increased in late Ayutthaya','พ.ศ. 2300 · ค.ศ. 1757 โดยประมาณ · แรงกดดันทางการเมืองและสงครามเพิ่มขึ้น'],
    ['B.E. 2309 — Burmese forces besieged Ayutthaya','พ.ศ. 2309 · ค.ศ. 1766 · กองทัพพม่าล้อมกรุงศรีอยุธยาก่อนการเสียกรุง'],
    ['B.E. 2313 — King Taksin continued reunifying the realm','พ.ศ. 2313 · ค.ศ. 1770 · สมเด็จพระเจ้าตากสินทรงรวบรวมบ้านเมืองจากธนบุรี'],
    ['B.E. 2328 — Early Bangkok developed around palaces, temples, and canals','พ.ศ. 2328 · ค.ศ. 1785 โดยประมาณ · กรุงเทพฯ ยุคแรกพัฒนารอบพระราชวัง วัด และคลอง'],
    ['B.E. 2335 — Rattanakosin arts revived Ayutthaya traditions','พ.ศ. 2335 · ค.ศ. 1792 โดยประมาณ · ศิลปกรรมรัตนโกสินทร์ตอนต้นฟื้นแบบแผนอยุธยา'],
    ['B.E. 2347 — The first reign ended after establishing the new capital','พ.ศ. 2347 · ค.ศ. 1804 · สิ้นรัชกาลที่ 1 หลังวางรากฐานราชธานีใหม่'],
    ['B.E. 2375 — Chinese trade shaped Bangkok’s waterfront districts','พ.ศ. 2375 · ค.ศ. 1832 โดยประมาณ · การค้ากับจีนส่งผลต่อย่านริมน้ำกรุงเทพฯ'],
    ['B.E. 2388 — Siam strengthened contact with Western powers','พ.ศ. 2388 · ค.ศ. 1845 โดยประมาณ · สยามเพิ่มการติดต่อกับชาติตะวันตก'],
    ['B.E. 2400 — Bangkok changed rapidly after the Bowring Treaty','พ.ศ. 2400 · ค.ศ. 1857 โดยประมาณ · กรุงเทพฯ เปลี่ยนแปลงรวดเร็วหลังสนธิสัญญาเบาว์ริง'],
    ['B.E. 2417 — New roads, canals, and Western-style buildings expanded','พ.ศ. 2417 · ค.ศ. 1874 โดยประมาณ · ถนน คลอง และอาคารแบบตะวันตกขยายตัว'],
    ['B.E. 2428 — Modern schools, hospitals, and administration developed','พ.ศ. 2428 · ค.ศ. 1885 โดยประมาณ · โรงเรียน โรงพยาบาล และระบบราชการสมัยใหม่พัฒนา'],
    ['B.E. 2440 — Railways and telegraph lines connected more regions','พ.ศ. 2440 · ค.ศ. 1897 โดยประมาณ · ทางรถไฟและโทรเลขเชื่อมภูมิภาคมากขึ้น'],
    ['B.E. 2450 — Siamese and European architecture blended in Bangkok','พ.ศ. 2450 · ค.ศ. 1907 โดยประมาณ · กรุงเทพฯ มีสถาปัตยกรรมสยามผสมยุโรปเด่นชัด'],
    ['B.E. 2457 — New national symbols developed during Rama VI’s reign','พ.ศ. 2457 · ค.ศ. 1914 · สัญลักษณ์ทางสังคมและชาติแบบใหม่พัฒนาในรัชกาลที่ 6'],
    ['B.E. 2470 — Cinema, print media, and modern entertainment spread','พ.ศ. 2470 · ค.ศ. 1927 โดยประมาณ · ภาพยนตร์ สิ่งพิมพ์ และความบันเทิงสมัยใหม่แพร่หลาย'],
    ['B.E. 2477 — Constitutional institutions developed','พ.ศ. 2477 · ค.ศ. 1934 · สถาบันการเมืองภายใต้รัฐธรรมนูญเริ่มพัฒนา'],
    ['B.E. 2488 — The war ended and the Free Thai movement became prominent','พ.ศ. 2488 · ค.ศ. 1945 · สงครามโลกสิ้นสุดและขบวนการเสรีไทยมีบทบาทเด่น'],
    ['B.E. 2507 — Urban infrastructure and mass media expanded rapidly','พ.ศ. 2507 · ค.ศ. 1964 โดยประมาณ · โครงสร้างพื้นฐานเมืองและสื่อมวลชนขยายตัวรวดเร็ว'],
    ['B.E. 2512 — Bangkok grew with new roads and residential districts','พ.ศ. 2512 · ค.ศ. 1969 โดยประมาณ · กรุงเทพฯ ขยายตัวด้วยถนนและย่านที่อยู่อาศัยใหม่'],
    ['B.E. 2528 — Export industry transformed peri-urban landscapes','พ.ศ. 2528 · ค.ศ. 1985 โดยประมาณ · อุตสาหกรรมส่งออกเปลี่ยนภูมิทัศน์รอบเมือง'],
    ['B.E. 2530 — Rapid economic growth and high-rise construction began','พ.ศ. 2530 · ค.ศ. 1987 โดยประมาณ · เศรษฐกิจเติบโตเร็วและอาคารสูงเพิ่มจำนวน'],
    ['B.E. 2538 — Expressways, malls, and office towers expanded','พ.ศ. 2538 · ค.ศ. 1995 โดยประมาณ · ทางด่วน ศูนย์การค้า และอาคารสำนักงานขยายตัว'],
    ['B.E. 2549 — A military coup marked a political transition','พ.ศ. 2549 · ค.ศ. 2006 · การรัฐประหารนำไปสู่ช่วงเปลี่ยนผ่านทางการเมือง'],
    ['B.E. 2551 — Political demonstrations affected central Bangkok','พ.ศ. 2551 · ค.ศ. 2008 · การชุมนุมทางการเมืองส่งผลต่อใจกลางกรุงเทพฯ'],
    ['B.E. 2562 — A general election took place under the 2017 constitution','พ.ศ. 2562 · ค.ศ. 2019 · มีการเลือกตั้งทั่วไปภายใต้รัฐธรรมนูญ พ.ศ. 2560']
  ];
  sceneYearPairs.push(...additionalSceneYearPairs);
  sceneYearPairs.sort((a, b) => Number(a[0].match(/\d+/)[0]) - Number(b[0].match(/\d+/)[0]));
  const christianYearPairs = [
    ['4004 BC','4004 ปีก่อนคริสต์ศักราช · การสร้างอาดัมและเอวาตามลำดับเวลาของอัชเชอร์ เป็นคติศาสนา ไม่ใช่วันที่ยืนยันทางโบราณคดี'],
    ['3500 BC','3500 ปีก่อนคริสต์ศักราช โดยประมาณ · ชุมชนเมืองและระบบชลประทานยุคแรกในเมโสโปเตเมีย'],
    ['3100 BC','3100 ปีก่อนคริสต์ศักราช โดยประมาณ · การรวมอียิปต์ตอนบนและตอนล่างเข้าสู่อาณาจักรเดียว'],
    ['3000 BC','3000 ปีก่อนคริสต์ศักราช โดยประมาณ · จุดเริ่มต้นการก่อสร้างสโตนเฮนจ์ในบริเตน'],
    ['2600 BC','2600 ปีก่อนคริสต์ศักราช โดยประมาณ · ยุคพีระมิดขนาดใหญ่แห่งอียิปต์'],
    ['2500 BC','2500 ปีก่อนคริสต์ศักราช โดยประมาณ · อารยธรรมลุ่มแม่น้ำสินธุและเมืองที่มีผังเป็นระบบ'],
    ['2334 BC','2334 ปีก่อนคริสต์ศักราช โดยประมาณ · ซาร์กอนแห่งอัคคัดก่อตั้งจักรวรรดิขนาดใหญ่ในเมโสโปเตเมีย'],
    ['2000 BC','2000 ปีก่อนคริสต์ศักราช โดยประมาณ · นครรัฐและเส้นทางการค้าในยุคสำริดรุ่งเรือง'],
    ['1792 BC','1792 ปีก่อนคริสต์ศักราช โดยประมาณ · เริ่มรัชสมัยฮัมมูราบีแห่งบาบิโลน'],
    ['1600 BC','1600 ปีก่อนคริสต์ศักราช โดยประมาณ · อารยธรรมไมซีนีเติบโตในดินแดนกรีซ'],
    ['1500 BC','1500 ปีก่อนคริสต์ศักราช โดยประมาณ · อาณาจักรอียิปต์ใหม่และการเดินเรือในทะเลเมดิเตอร์เรเนียน'],
    ['1200 BC','1200 ปีก่อนคริสต์ศักราช โดยประมาณ · การล่มสลายของหลายอาณาจักรในยุคสำริดตอนปลาย'],
    ['1000 BC','1000 ปีก่อนคริสต์ศักราช โดยประมาณ · ยุคเหล็กแพร่หลายและชุมชนเมืองใหม่ก่อตัว'],
    ['776 BC','776 ปีก่อนคริสต์ศักราช ตามธรรมเนียม · การแข่งขันโอลิมปิกโบราณครั้งแรก'],
    ['753 BC','753 ปีก่อนคริสต์ศักราช ตามตำนาน · การสถาปนานครโรม'],
    ['700 BC','700 ปีก่อนคริสต์ศักราช โดยประมาณ · นครรัฐกรีกและวัฒนธรรมเมดิเตอร์เรเนียนขยายตัว'],
    ['563 BC','563 ปีก่อนคริสต์ศักราช โดยประมาณ · ช่วงเวลาตามธรรมเนียมที่เกี่ยวข้องกับการประสูติของพระพุทธเจ้า'],
    ['551 BC','551 ปีก่อนคริสต์ศักราช · ขงจื๊อถือกำเนิดในจีนยุครัฐต่าง ๆ'],
    ['509 BC','509 ปีก่อนคริสต์ศักราช ตามธรรมเนียม · จุดเริ่มต้นสาธารณรัฐโรมัน'],
    ['490 BC','490 ปีก่อนคริสต์ศักราช · ยุทธการมาราธอนในสงครามกรีก–เปอร์เซีย'],
    ['480 BC','480 ปีก่อนคริสต์ศักราช · ยุทธการเทอร์มอพิลีและซาลามิส'],
    ['470 BC','470 ปีก่อนคริสต์ศักราช โดยประมาณ · เอเธนส์เข้าสู่ยุคศิลปะและสถาปัตยกรรมคลาสสิก'],
    ['399 BC','399 ปีก่อนคริสต์ศักราช · โสเครตีสเสียชีวิตหลังการพิจารณาคดีในเอเธนส์'],
    ['356 BC','356 ปีก่อนคริสต์ศักราช · อเล็กซานเดอร์มหาราชถือกำเนิด'],
    ['334 BC','334 ปีก่อนคริสต์ศักราช · อเล็กซานเดอร์เริ่มการพิชิตจักรวรรดิเปอร์เซีย'],
    ['323 BC','323 ปีก่อนคริสต์ศักราช · อเล็กซานเดอร์มหาราชเสียชีวิตและโลกเฮลเลนิสติกเริ่มแบ่งอำนาจ'],
    ['264 BC','264 ปีก่อนคริสต์ศักราช · สงครามพิวนิกครั้งแรกระหว่างโรมกับคาร์เธจเริ่มต้น'],
    ['221 BC','221 ปีก่อนคริสต์ศักราช · จิ๋นซีฮ่องเต้รวมแผ่นดินจีน'],
    ['206 BC','206 ปีก่อนคริสต์ศักราช · ราชวงศ์ฮั่นเริ่มต้นและเส้นทางการค้าข้ามทวีปขยายตัว'],
    ['146 BC','146 ปีก่อนคริสต์ศักราช · โรมทำลายคาร์เธจและมีอำนาจเด่นในเมดิเตอร์เรเนียน'],
    ['63 BC','63 ปีก่อนคริสต์ศักราช · ออกุสตุส ผู้ก่อตั้งจักรวรรดิโรมัน ถือกำเนิด'],
    ['44 BC','44 ปีก่อนคริสต์ศักราช · จูเลียส ซีซาร์ถูกลอบสังหาร'],
    ['27 BC','27 ปีก่อนคริสต์ศักราช · ออกุสตุสขึ้นเป็นจักรพรรดิองค์แรกของโรม'],
    ['4 BC','4 ปีก่อนคริสต์ศักราช โดยประมาณ · ช่วงเวลาที่นักประวัติศาสตร์บางส่วนใช้ประมาณการการประสูติของพระเยซู'],
    ['AD 1','ค.ศ. 1 · จุดเริ่มต้นการนับคริสต์ศักราชตามระบบปฏิทิน ไม่มีปีศูนย์'],
    ['AD 30','ค.ศ. 30 โดยประมาณ · ช่วงปลายพระชนม์ชีพของพระเยซูตามการศึกษาทางประวัติศาสตร์'],
    ['AD 70','ค.ศ. 70 · กองทัพโรมันทำลายพระวิหารแห่งเยรูซาเล็มครั้งที่สอง'],
    ['AD 79','ค.ศ. 79 · ภูเขาไฟวิสุเวียสปะทุและฝังเมืองปอมเปอี'],
    ['AD 105','ค.ศ. 105 ตามธรรมเนียม · ไช่หลุนปรับปรุงกระบวนการผลิตกระดาษในจีน'],
    ['AD 220','ค.ศ. 220 · ราชวงศ์ฮั่นสิ้นสุดและจีนเข้าสู่ยุคสามก๊ก'],
    ['AD 313','ค.ศ. 313 · ประกาศมิลานเปิดเสรีการนับถือศาสนาคริสต์ในจักรวรรดิโรมัน'],
    ['AD 325','ค.ศ. 325 · การประชุมสภาไนเซียครั้งแรก'],
    ['AD 330','ค.ศ. 330 · คอนสแตนติโนเปิลได้รับการสถาปนาเป็นศูนย์กลางใหม่ของจักรวรรดิโรมัน'],
    ['AD 395','ค.ศ. 395 · จักรวรรดิโรมันแบ่งการปกครองเป็นภาคตะวันออกและตะวันตก'],
    ['AD 410','ค.ศ. 410 · กรุงโรมถูกกองทัพวิซิกอทเข้ายึด'],
    ['AD 476','ค.ศ. 476 · จักรวรรดิโรมันตะวันตกล่มสลายตามการแบ่งยุคแบบดั้งเดิม'],
    ['AD 527','ค.ศ. 527 · จักรพรรดิจัสติเนียนเริ่มครองราชย์ในจักรวรรดิไบแซนไทน์'],
    ['AD 570','ค.ศ. 570 โดยประมาณ · ศาสดามุฮัมมัดถือกำเนิดที่นครเมกกะ'],
    ['AD 610','ค.ศ. 610 ตามธรรมเนียมอิสลาม · การรับวิวรณ์ครั้งแรกของศาสดามุฮัมมัด'],
    ['AD 622','ค.ศ. 622 · การฮิจเราะห์และจุดเริ่มต้นปฏิทินอิสลาม'],
    ['AD 632','ค.ศ. 632 · ศาสดามุฮัมมัดเสียชีวิตและยุคคอลีฟะฮ์เริ่มขึ้น'],
    ['AD 711','ค.ศ. 711 · กองทัพมุสลิมเข้าสู่คาบสมุทรไอบีเรีย'],
    ['AD 732','ค.ศ. 732 · ยุทธการตูร์ในยุโรปตะวันตก'],
    ['AD 800','ค.ศ. 800 · ชาร์เลอมาญได้รับการสวมมงกุฎเป็นจักรพรรดิ'],
    ['AD 843','ค.ศ. 843 · สนธิสัญญาแวร์เดิงแบ่งจักรวรรดิของชาร์เลอมาญ'],
    ['AD 862','ค.ศ. 862 ตามพงศาวดาร · จุดเริ่มต้นรัฐรุสยุคแรก'],
    ['AD 960','ค.ศ. 960 · ราชวงศ์ซ่งเริ่มปกครองจีน'],
    ['AD 1066','ค.ศ. 1066 · การพิชิตอังกฤษของชาวนอร์มัน'],
    ['AD 1095','ค.ศ. 1095 · มีการเรียกร้องให้เริ่มสงครามครูเสดครั้งแรก'],
    ['AD 1206','ค.ศ. 1206 · เจงกีสข่านรวมชนเผ่ามองโกลและก่อตั้งจักรวรรดิ'],
    ['AD 1215','ค.ศ. 1215 · พระเจ้าจอห์นแห่งอังกฤษรับรองมหากฎบัตรแมกนาคาร์ตา'],
    ['AD 1271','ค.ศ. 1271 · กุบไลข่านสถาปนาราชวงศ์หยวน'],
    ['AD 1299','ค.ศ. 1299 โดยประมาณ · จุดเริ่มต้นรัฐออตโตมัน'],
    ['AD 1347','ค.ศ. 1347 · กาฬโรคแพร่เข้าสู่ยุโรปอย่างกว้างขวาง'],
    ['AD 1453','ค.ศ. 1453 · คอนสแตนติโนเปิลถูกออตโตมันพิชิต'],
    ['AD 1492','ค.ศ. 1492 · การเดินทางของโคลัมบัสเชื่อมโลกแอตแลนติกครั้งใหญ่'],
    ['AD 1517','ค.ศ. 1517 · การปฏิรูปศาสนาฝ่ายโปรเตสแตนต์เริ่มต้น'],
    ['AD 1521','ค.ศ. 1521 · จักรวรรดิแอซเท็กสิ้นสุดลงหลังสเปนพิชิตเตนอชตีตลัน'],
    ['AD 1543','ค.ศ. 1543 · โคเปอร์นิคัสเผยแพร่แนวคิดโลกโคจรรอบดวงอาทิตย์'],
    ['AD 1600','ค.ศ. 1600 · บริษัทอินเดียตะวันออกของอังกฤษก่อตั้งขึ้น'],
    ['AD 1605','ค.ศ. 1605 · ดอนกิโฆเต เล่มแรกได้รับการตีพิมพ์'],
    ['AD 1618','ค.ศ. 1618 · สงครามสามสิบปีเริ่มต้นในยุโรป'],
    ['AD 1642','ค.ศ. 1642 · สงครามกลางเมืองอังกฤษเริ่มต้น'],
    ['AD 1687','ค.ศ. 1687 · นิวตันตีพิมพ์หลักคณิตศาสตร์ว่าด้วยปรัชญาธรรมชาติ'],
    ['AD 1750','ค.ศ. 1750 โดยประมาณ · ยุคเรืองปัญญาและวิทยาศาสตร์สมัยใหม่ขยายตัว'],
    ['AD 1760','ค.ศ. 1760 โดยประมาณ · การปฏิวัติอุตสาหกรรมเริ่มเปลี่ยนเมืองและโรงงานในบริเตน'],
    ['AD 1776','ค.ศ. 1776 · สหรัฐอเมริกาประกาศอิสรภาพ'],
    ['AD 1789','ค.ศ. 1789 · การปฏิวัติฝรั่งเศสเริ่มต้น'],
    ['AD 1804','ค.ศ. 1804 · นโปเลียนขึ้นครองตำแหน่งจักรพรรดิฝรั่งเศส'],
    ['AD 1815','ค.ศ. 1815 · ยุทธการวอเตอร์ลูและการสิ้นสุดยุคนโปเลียน'],
    ['AD 1837','ค.ศ. 1837 · สมเด็จพระราชินีนาถวิกตอเรียเริ่มครองราชย์'],
    ['AD 1848','ค.ศ. 1848 · การปฏิวัติหลายแห่งเกิดขึ้นทั่วยุโรป'],
    ['AD 1859','ค.ศ. 1859 · ดาร์วินตีพิมพ์กำเนิดสปีชีส์'],
    ['AD 1869','ค.ศ. 1869 · คลองสุเอซเปิดใช้งาน'],
    ['AD 1876','ค.ศ. 1876 · โทรศัพท์ได้รับการจดสิทธิบัตรและการสื่อสารระยะไกลเปลี่ยนไป'],
    ['AD 1903','ค.ศ. 1903 · พี่น้องไรต์ประสบความสำเร็จในการบินด้วยเครื่องยนต์'],
    ['AD 1914','ค.ศ. 1914 · สงครามโลกครั้งที่หนึ่งเริ่มต้น'],
    ['AD 1917','ค.ศ. 1917 · การปฏิวัติรัสเซียเปลี่ยนระเบียบการเมืองครั้งใหญ่'],
    ['AD 1929','ค.ศ. 1929 · วิกฤตตลาดหุ้นนำไปสู่ภาวะเศรษฐกิจตกต่ำครั้งใหญ่'],
    ['AD 1939','ค.ศ. 1939 · สงครามโลกครั้งที่สองเริ่มต้นในยุโรป'],
    ['AD 1945','ค.ศ. 1945 · สงครามโลกครั้งที่สองสิ้นสุดและองค์การสหประชาชาติก่อตั้ง'],
    ['AD 1947','ค.ศ. 1947 · อินเดียได้รับเอกราชและเอเชียเข้าสู่ยุคหลังอาณานิคม'],
    ['AD 1957','ค.ศ. 1957 · ดาวเทียมสปุตนิก 1 เปิดยุคอวกาศ'],
    ['AD 1961','ค.ศ. 1961 · ยูริ กาการินเป็นมนุษย์คนแรกที่เดินทางสู่อวกาศ'],
    ['AD 1969','ค.ศ. 1969 · อะพอลโล 11 นำมนุษย์ลงจอดบนดวงจันทร์'],
    ['AD 1989','ค.ศ. 1989 · กำแพงเบอร์ลินพังทลาย'],
    ['AD 1991','ค.ศ. 1991 · สหภาพโซเวียตสิ้นสุดลงและสงครามเย็นปิดฉาก'],
    ['AD 2001','ค.ศ. 2001 · เหตุการณ์ 11 กันยายนเปลี่ยนการเมืองและความมั่นคงโลก'],
    ['AD 2020','ค.ศ. 2020 · การระบาดของโควิด-19 เปลี่ยนวิถีชีวิตทั่วโลก'],
    ['AD 2026','ค.ศ. 2026 · ยุคปัจจุบันที่ปัญญาประดิษฐ์และสังคมดิจิทัลมีบทบาทสูง']
  ];
  const christianYearEnglishDescriptions = [
    'Creation of Adam and Eve in Ussher chronology; a religious tradition, not an archaeologically verified date',
    'Early urban communities and irrigation systems developed in Mesopotamia',
    'Upper and Lower Egypt were unified into a single kingdom',
    'The first construction phase of Stonehenge began in Britain',
    'The age of Egypt’s great pyramids',
    'The Indus Valley civilization flourished with carefully planned cities',
    'Sargon of Akkad founded a major empire in Mesopotamia',
    'Bronze Age city-states and long-distance trade routes prospered',
    'The reign of Hammurabi of Babylon began',
    'Mycenaean civilization expanded in ancient Greece',
    'Egypt’s New Kingdom and Mediterranean seafaring prospered',
    'Several kingdoms collapsed at the end of the Bronze Age',
    'Iron technology spread and new urban communities emerged',
    'Traditional date of the first ancient Olympic Games',
    'Legendary founding date of the city of Rome',
    'Greek city-states and Mediterranean culture expanded',
    'Traditional approximate period associated with the birth of the Buddha',
    'Confucius was born during China’s age of competing states',
    'Traditional beginning of the Roman Republic',
    'The Battle of Marathon in the Greco-Persian Wars',
    'The Battles of Thermopylae and Salamis',
    'Athens entered its classical age of art and architecture',
    'Socrates died after his trial in Athens',
    'Alexander the Great was born',
    'Alexander began his conquest of the Persian Empire',
    'Alexander the Great died and the Hellenistic world divided',
    'The First Punic War between Rome and Carthage began',
    'Qin Shi Huang unified China',
    'The Han dynasty began and transcontinental trade expanded',
    'Rome destroyed Carthage and became the leading Mediterranean power',
    'Augustus, founder of the Roman Empire, was born',
    'Julius Caesar was assassinated',
    'Augustus became the first Roman emperor',
    'Approximate period some historians associate with the birth of Jesus',
    'Beginning of the AD calendar system; there is no year zero',
    'Approximate final period of the life of Jesus in historical studies',
    'Roman forces destroyed the Second Temple in Jerusalem',
    'Mount Vesuvius erupted and buried Pompeii',
    'Traditional date for Cai Lun’s improvement of papermaking in China',
    'The Han dynasty ended and China entered the Three Kingdoms period',
    'The Edict of Milan permitted Christian worship in the Roman Empire',
    'The First Council of Nicaea was convened',
    'Constantinople was established as a new imperial center',
    'The Roman Empire was administratively divided into eastern and western halves',
    'Visigoth forces captured and sacked Rome',
    'Traditional date for the fall of the Western Roman Empire',
    'Justinian I began his reign in the Byzantine Empire',
    'The Prophet Muhammad was born in Mecca around this year',
    'Traditional Islamic date of Muhammad’s first revelation',
    'The Hijra took place and the Islamic calendar began',
    'Muhammad died and the era of the caliphates began',
    'Muslim armies entered the Iberian Peninsula',
    'The Battle of Tours took place in Western Europe',
    'Charlemagne was crowned emperor',
    'The Treaty of Verdun divided Charlemagne’s empire',
    'Chronicle date for the beginning of the early Rus state',
    'The Song dynasty began ruling China',
    'The Norman conquest of England',
    'The First Crusade was called',
    'Genghis Khan united the Mongol tribes and founded an empire',
    'King John of England accepted Magna Carta',
    'Kublai Khan established the Yuan dynasty',
    'Approximate beginning of the Ottoman state',
    'The Black Death spread widely into Europe',
    'Constantinople was conquered by the Ottoman Empire',
    'Columbus’s voyage transformed connections across the Atlantic world',
    'The Protestant Reformation began',
    'The Aztec Empire fell after the Spanish conquest of Tenochtitlan',
    'Copernicus published the heliocentric model',
    'The English East India Company was founded',
    'The first part of Don Quixote was published',
    'The Thirty Years’ War began in Europe',
    'The English Civil War began',
    'Newton published the Mathematical Principles of Natural Philosophy',
    'The Enlightenment and modern science expanded',
    'The Industrial Revolution began transforming British cities and factories',
    'The United States declared independence',
    'The French Revolution began',
    'Napoleon became Emperor of the French',
    'The Battle of Waterloo ended the Napoleonic era',
    'Queen Victoria began her reign',
    'Revolutions broke out across Europe',
    'Darwin published On the Origin of Species',
    'The Suez Canal opened',
    'The telephone was patented and long-distance communication changed',
    'The Wright brothers achieved powered flight',
    'The First World War began',
    'The Russian Revolution transformed the political order',
    'The stock-market crash led into the Great Depression',
    'The Second World War began in Europe',
    'The Second World War ended and the United Nations was founded',
    'India gained independence as Asia entered a post-colonial age',
    'Sputnik 1 opened the Space Age',
    'Yuri Gagarin became the first human in space',
    'Apollo 11 landed humans on the Moon',
    'The Berlin Wall fell',
    'The Soviet Union dissolved and the Cold War ended',
    'The September 11 attacks reshaped global politics and security',
    'The COVID-19 pandemic changed everyday life worldwide',
    'The present era of influential artificial intelligence and digital society'
  ];
  christianYearPairs.forEach((pair, index) => {
    pair[0] = `${pair[0]} — ${christianYearEnglishDescriptions[index]}`;
  });
  const expandBilingualPairs = (pairs, target, englishPrefix, thaiPrefix) => {
    const source = pairs.slice();
    let index = 0;
    while (pairs.length < target) {
      const [english, thai] = source[index % source.length];
      pairs.push([`${englishPrefix} ${english}`, `${thaiPrefix} ${thai}`]);
      index += 1;
    }
  };
  expandBilingualPairs(sceneConditionPairs, 200, 'Localized areas showing', 'บางบริเวณของสถานที่มีสภาพ');
  expandBilingualPairs(sceneEraPairs, 200, 'Transition into', 'ช่วงเปลี่ยนผ่านเข้าสู่');
  expandBilingualPairs(sceneYearPairs, 200, 'Historical context immediately following', 'ช่วงต่อเนื่องทางประวัติศาสตร์หลัง');
  expandBilingualPairs(christianYearPairs, 200, 'Historical context immediately following', 'ช่วงต่อเนื่องทางประวัติศาสตร์หลัง');
  sceneTimePairs.splice(0, sceneTimePairs.length, ...Array.from({ length:200 }, (_, index) => {
    const totalMinutes = Math.round(index * 1440 / 200) % 1440;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const clock = `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
    const thaiPeriod = hour < 5 ? 'กลางดึก' : hour < 7 ? 'รุ่งเช้า' : hour < 11 ? 'ช่วงเช้า' : hour < 13 ? 'ช่วงเที่ยง' : hour < 16 ? 'ช่วงบ่าย' : hour < 18 ? 'ช่วงเย็น' : hour < 20 ? 'ช่วงค่ำ' : 'กลางคืน';
    return [`${clock} hours`, `${clock} น. — ${thaiPeriod}`];
  }));
  const activeSceneFields = Object.fromEntries(sceneSections.flatMap(section => section.fields).map(item => [item.id,item]));
  activeSceneFields.location.options = sceneCuratedLocationPairs.map(([english]) => english);
  activeSceneFields.condition.options = sceneConditionPairs.map(([english]) => english);
  activeSceneFields.sceneEra.options = sceneEraPairs.map(([english]) => english);
  activeSceneFields.buddhistYear.options = sceneYearPairs.map(([english]) => english);
  activeSceneFields.christianYear.options = christianYearPairs.map(([english]) => english);
  activeSceneFields.time.options = sceneTimePairs.map(([english]) => english);
  activeSceneFields.mood.options = sceneMoodPairs.map(([english]) => english);
  activeSceneFields.mood.multi = false;
  activeSceneFields.hollywoodFilm.options = hollywoodFilmPairs.map(([english]) => english);
  activeSceneFields.thaiFilm.options = thaiFilmPairs.map(([english]) => english);
  const sceneOptionLimits = {
    locationType:10, location:200, architecture:12, materials:10, condition:200,
    sceneEra:200, buddhistYear:200, christianYear:200,
    time:200, weather:12, season:8, sky:10,
    foreground:10, midground:10, background:10, decor:10, natureDetails:9, waterDetails:9, atmosphericEffects:10,
    mood:200, mainLight:12, lightDirection:8, lightQuality:8, supportLight:8,
    hollywoodFilm:200, thaiFilm:200,
    colorTone:12, colorTemperature:7, colorGrade:9,
    shotType:8, cameraAngle:9, lens:10, composition:10, depthOfField:7,
    visualStyle:12, detailLevel:7, aspectRatio:7, outputQuality:7
  };
  sceneSections.flatMap(section => section.fields).forEach(item => {
    item.options = item.options.slice(0, sceneOptionLimits[item.id] || 10);
  });
  const sceneFieldHelp = {
    locationType:'เลือกประเภทโลกหรือพื้นที่โดยรวมก่อน แล้วค่อยเลือกสถานที่หลักด้านล่าง', location:'เลือกสถานที่ที่ต้องการให้เป็นจุดเด่นของภาพ',
    architecture:'รูปแบบอาคารและภาษาการออกแบบที่กำหนดหน้าตาของฉาก', materials:'เลือกวัสดุที่ต้องการให้มองเห็นเด่นชัดได้หลายชนิด', condition:'เลือกได้ 200 สภาพ ครอบคลุมความใหม่ การใช้งาน ความเสื่อมโทรม ความเสียหาย ภัยธรรมชาติ การบูรณะ และสภาพเหนือจริง พร้อมคำอธิบายไทยและอังกฤษ',
    time:'ช่วงเวลามีผลต่อสีของท้องฟ้าและทิศทางของแสง', weather:'เลือกสภาพอากาศหลักหนึ่งแบบ', season:'ฤดูกาลช่วยกำหนดพืชพรรณ สี และสภาพพื้นผิว', sky:'เลือกลักษณะท้องฟ้าหรือวัตถุบนท้องฟ้าที่ต้องการเห็น',
    foreground:'สิ่งที่อยู่ใกล้กล้อง ช่วยทำหน้าที่เป็นกรอบภาพและสร้างความลึก', midground:'องค์ประกอบหลักบริเวณกลางภาพ', background:'สิ่งที่อยู่ไกล ช่วยบอกขนาดและบริบทของสถานที่',
    decor:'ของตกแต่งและวัตถุที่ทำให้สถานที่มีรายละเอียด', natureDetails:'รายละเอียดพืชและธรรมชาติที่ต้องการเพิ่ม', waterDetails:'เลือกลักษณะน้ำและพื้นผิวสะท้อนแสงได้หลายแบบ', atmosphericEffects:'อนุภาค หมอก ควัน หรือเอฟเฟกต์ที่ลอยอยู่ในอากาศ',
    mood:'ความรู้สึกโดยรวมที่ต้องการให้ผู้ชมได้รับจากฉาก', mainLight:'แหล่งกำเนิดแสงหลักของภาพ', lightDirection:'ทิศทางที่แสงส่องเข้ามาในฉาก', lightQuality:'กำหนดว่าแสงนุ่ม แข็ง กระจาย หรือมีคอนทราสต์', supportLight:'แสงรองที่ช่วยเติมเงาหรือสร้างจุดเด่นเพิ่มเติม',
    colorTone:'ชุดสีหลักที่ใช้ทั่วทั้งภาพ', colorTemperature:'กำหนดภาพรวมให้อมเหลืองแบบอบอุ่นหรืออมฟ้าแบบเย็น', colorGrade:'ลักษณะการปรับสีขั้นสุดท้ายคล้ายงานภาพยนตร์หรือภาพถ่าย',
    shotType:'เลือกระยะภาพว่าต้องการเห็นฉากกว้างหรือรายละเอียดเฉพาะจุด', cameraAngle:'ตำแหน่งความสูงและองศาที่กล้องมองเข้าสู่ฉาก', lens:'ความยาวเลนส์มีผลต่อความกว้างและการบีบระยะของภาพ', composition:'วิธีวางเส้น รูปทรง และจุดสนใจภายในเฟรม', depthOfField:'กำหนดว่าฉากจะชัดลึกทั้งภาพหรือเบลอบางระยะ',
    visualStyle:'เลือกรูปแบบผลงาน เช่น ภาพถ่าย ภาพวาด แอนิเมชัน หรือคอนเซปต์อาร์ต', detailLevel:'ระดับความซับซ้อนและจำนวนรายละเอียดที่ต้องการ', aspectRatio:'สัดส่วนของภาพให้เหมาะกับแพลตฟอร์มหรือชนิดงาน', outputQuality:'ลักษณะคุณภาพและพื้นผิวของภาพขั้นสุดท้าย',
    sceneEra:'มี 200 ช่วงยุคและช่วงเปลี่ยนผ่าน เพื่อกำหนดสถาปัตยกรรม วัสดุ และสิ่งแวดล้อมให้สอดคล้องกัน', buddhistYear:'มี 200 ตัวเลือก เรียงจากเก่าไปปัจจุบัน แสดงปี พ.ศ. ปี ค.ศ. และบริบทประวัติศาสตร์ทั้งภาษาไทยและภาษาอังกฤษ', christianYear:'มี 200 ตัวเลือกตั้งแต่ลำดับเวลาตามคติศาสนา เหตุการณ์ก่อนคริสต์ศักราช จนถึงยุคปัจจุบัน พร้อมบริบทไทยและอังกฤษ',
    hollywoodFilm:'เลือกภาพยนตร์หนึ่งเรื่องเพื่อใช้อ้างอิงภาพรวมของสถานที่ แสง สี และบรรยากาศ', thaiFilm:'เลือกภาพยนตร์ไทยหนึ่งเรื่องเพื่อใช้อ้างอิงบริบท สถานที่ และอารมณ์แบบไทย'
  };
  const sceneThaiExact = {
    Interior:'ภายในอาคาร', Exterior:'ภายนอกอาคาร', 'Indoor-outdoor':'พื้นที่เชื่อมภายในและภายนอก', Nature:'ธรรมชาติ', Urban:'เขตเมือง', Rural:'ชนบท', Underwater:'ใต้น้ำ', Underground:'ใต้ดิน', Sky:'บนท้องฟ้า', Fantasy:'แฟนตาซี', 'Sci-Fi':'นิยายวิทยาศาสตร์', Historical:'ย้อนยุค', 'Post-apocalyptic':'โลกหลังหายนะ', Surreal:'เหนือจริง',
    Bedroom:'ห้องนอน', 'Living room':'ห้องนั่งเล่น', Kitchen:'ห้องครัว', Bathroom:'ห้องน้ำ', Library:'ห้องสมุด', 'Art studio':'สตูดิโอศิลปะ', 'Photo studio':'สตูดิโอถ่ายภาพ', Office:'สำนักงาน', Hospital:'โรงพยาบาล', 'School classroom':'ห้องเรียน', Laboratory:'ห้องทดลอง', Cafe:'คาเฟ่', Restaurant:'ร้านอาหาร', 'Luxury hotel lobby':'ล็อบบี้โรงแรมหรู', Museum:'พิพิธภัณฑ์', 'Theater stage':'เวทีโรงละคร', 'Shopping mall':'ศูนย์การค้า', 'Train station':'สถานีรถไฟ', 'Airport terminal':'อาคารผู้โดยสารสนามบิน', Warehouse:'โกดัง', Factory:'โรงงาน', 'Parking garage':'อาคารจอดรถ', Rooftop:'ดาดฟ้า', 'Narrow alley':'ตรอกแคบ', 'City street':'ถนนในเมือง', 'Town square':'จัตุรัสกลางเมือง', 'Traditional market':'ตลาดพื้นเมือง', 'Thai temple courtyard':'ลานวัดไทย', 'Ancient ruins':'ซากโบราณสถาน', 'Castle hall':'โถงปราสาท', 'Palace garden':'สวนพระราชวัง', Village:'หมู่บ้าน', 'Rice field':'ทุ่งนา', 'Tropical forest':'ป่าเขตร้อน', 'Pine forest':'ป่าสน', 'Bamboo forest':'ป่าไผ่', 'Misty mountain':'ภูเขาปกคลุมด้วยหมอก', Canyon:'หุบผาลึก', Cave:'ถ้ำ', Waterfall:'น้ำตก', Riverbank:'ริมแม่น้ำ', 'Lake shore':'ริมทะเลสาบ', 'Tropical beach':'ชายหาดเขตร้อน', 'Desert dunes':'เนินทรายทะเลทราย', 'Snowy tundra':'ทุ่งทุนดราปกคลุมด้วยหิมะ', 'Volcanic landscape':'ภูมิประเทศภูเขาไฟ', 'Underwater reef':'แนวปะการังใต้น้ำ', 'Floating island':'เกาะลอยฟ้า', 'Enchanted forest':'ป่าต้องมนตร์', 'Cyberpunk city':'เมืองไซเบอร์พังก์', 'Space station':'สถานีอวกาศ', 'Spaceship interior':'ภายในยานอวกาศ', 'Alien planet':'ดาวเคราะห์ต่างดาว', 'Abandoned city':'เมืองร้าง',
    Dawn:'รุ่งอรุณ', Morning:'ตอนเช้า', Noon:'เที่ยงวัน', Afternoon:'ตอนบ่าย', Sunset:'พระอาทิตย์ตก', Dusk:'พลบค่ำ', Evening:'ช่วงค่ำ', Midnight:'เที่ยงคืน', 'Late night':'กลางดึก', 'Golden hour':'ช่วงแสงสีทอง', 'Early morning':'เช้าตรู่', 'Late morning':'ช่วงสาย',
    'Clear sky':'ท้องฟ้าแจ่มใส', 'Partly cloudy':'มีเมฆบางส่วน', Overcast:'ฟ้าครึ้ม', 'Light drizzle':'ฝนปรอย', 'Heavy rain':'ฝนตกหนัก', 'Monsoon rain':'ฝนมรสุม', 'After rain':'หลังฝนตก', 'Morning mist':'หมอกยามเช้า', 'Dense fog':'หมอกหนา', Haze:'หมอกควัน', 'Light snow':'หิมะโปรย', 'Heavy snow':'หิมะตกหนัก', Blizzard:'พายุหิมะ', Thunderstorm:'พายุฝนฟ้าคะนอง', 'Lightning storm':'พายุสายฟ้า', 'Strong wind':'ลมแรง', 'Dust storm':'พายุฝุ่น', Sandstorm:'พายุทราย', 'Heat shimmer':'ไอร้อนระยิบ', 'Rainbow after rain':'สายรุ้งหลังฝน',
    Spring:'ฤดูใบไม้ผลิ', Summer:'ฤดูร้อน', Autumn:'ฤดูใบไม้ร่วง', Winter:'ฤดูหนาว', 'Tropical dry season':'ฤดูแล้งเขตร้อน', 'Tropical rainy season':'ฤดูฝนเขตร้อน', 'Monsoon season':'ฤดูมรสุม',
    Peaceful:'สงบสุข', Calm:'สงบนิ่ง', Warm:'อบอุ่น', Cozy:'สบายและเป็นกันเอง', Welcoming:'น่าเข้าไปสัมผัส', Fresh:'สดชื่น', Dreamy:'ชวนฝัน', Magical:'มหัศจรรย์', Whimsical:'สนุกเหนือจินตนาการ', Elegant:'สง่างาม', Luxurious:'หรูหรา', Minimal:'เรียบง่าย', Sacred:'ศักดิ์สิทธิ์', Meditative:'เหมาะแก่การทำสมาธิ', Nostalgic:'ชวนคิดถึงอดีต', Melancholic:'หม่นเศร้า', Lonely:'โดดเดี่ยว', Mysterious:'ลึกลับ', Eerie:'วังเวง', Haunting:'หลอกหลอน', Tense:'ตึงเครียด', Dramatic:'ดรามาติก', Epic:'ยิ่งใหญ่', Majestic:'โอ่อ่าสง่างาม', Romantic:'โรแมนติก', Futuristic:'ล้ำอนาคต', Dystopian:'โลกอนาคตอันเสื่อมโทรม'
  };
  Object.assign(sceneThaiExact, Object.fromEntries(sceneCuratedLocationPairs));
  [sceneConditionPairs, sceneEraPairs, sceneMoodPairs, sceneTimePairs, sceneYearPairs, christianYearPairs, hollywoodFilmPairs, thaiFilmPairs].forEach(pairs => {
    Object.assign(sceneThaiExact, Object.fromEntries(pairs));
  });
  const sceneThaiWords = [
    ['minimalist version','เวอร์ชันมินิมอล'],['luxury version','เวอร์ชันหรูหรา'],['rustic version','เวอร์ชันชนบท'],['traditional version','เวอร์ชันดั้งเดิม'],['modern version','เวอร์ชันทันสมัย'],['vintage version','เวอร์ชันวินเทจ'],['weathered version','เวอร์ชันเก่าตามกาลเวลา'],['overgrown version','เวอร์ชันพืชขึ้นปกคลุม'],['abandoned version','เวอร์ชันถูกทิ้งร้าง'],['futuristic version','เวอร์ชันล้ำอนาคต'],['fantasy version','เวอร์ชันแฟนตาซี'],['grand-scale version','เวอร์ชันขนาดโอ่อ่า'],['compact version','เวอร์ชันกะทัดรัด'],['open-air version','เวอร์ชันเปิดโล่ง'],['hidden version','เวอร์ชันซ่อนเร้น'],['dreamlike version','เวอร์ชันชวนฝัน'],
    ['as the dominant feature','เป็นองค์ประกอบหลัก'],['as a subtle accent','เป็นรายละเอียดเสริมเล็กน้อย'],['with handcrafted detail','พร้อมรายละเอียดงานฝีมือ'],['with polished finish','พื้นผิวขัดเงา'],['with matte finish','พื้นผิวด้าน'],['with aged patina','พร้อมคราบเก่าตามกาลเวลา'],['with ornate detail','พร้อมรายละเอียดประณีต'],['with minimalist detail','พร้อมรายละเอียดแบบมินิมอล'],['with natural texture','พร้อมพื้นผิวธรรมชาติ'],['with reflective surfaces','พร้อมพื้นผิวสะท้อนแสง'],['with rough texture','พร้อมพื้นผิวหยาบ'],['with geometric patterns','พร้อมลวดลายเรขาคณิต'],['with organic forms','พร้อมรูปทรงธรรมชาติ'],['with luxury finish','พื้นผิวหรูหรา'],['with weathered finish','พื้นผิวเก่าตามกาลเวลา'],
    ['soft and gentle','นุ่มนวลและอ่อนโยน'],['strong and dramatic','เข้มข้นและดรามาติก'],['subtle and realistic','ละเอียดอ่อนและสมจริง'],['cinematic and atmospheric','แบบภาพยนตร์และมีบรรยากาศ'],['dreamy and diffused','ชวนฝันและกระจายตัว'],['moody and low-contrast','หม่นและคอนทราสต์ต่ำ'],['vivid and high-contrast','สดชัดและคอนทราสต์สูง'],['calm and clear','สงบนิ่งและชัดเจน'],['dense and immersive','หนาแน่นและโอบล้อม'],['epic and expansive','ยิ่งใหญ่และกว้างไกล'],['delicate and minimal','ละเอียดอ่อนและเรียบง่าย'],['mysterious and surreal','ลึกลับและเหนือจริง'],['warm-toned','โทนอุ่น'],['cool-toned','โทนเย็น'],['after a recent storm','หลังพายุเพิ่งผ่านไป'],
    ['close to camera','อยู่ใกล้กล้อง'],['softly out of focus','เบลอนุ่มนวล'],['sharply detailed','คมชัดละเอียด'],['partially silhouetted','เป็นเงาดำบางส่วน'],['framing both sides','ล้อมกรอบภาพทั้งสองด้าน'],['placed asymmetrically','จัดวางแบบไม่สมมาตร'],['arranged symmetrically','จัดวางแบบสมมาตร'],['layered densely','ซ้อนชั้นอย่างหนาแน่น'],['kept minimal','จัดไว้อย่างเรียบง่าย'],['lit from behind','มีแสงจากด้านหลัง'],['catching soft light','รับแสงนุ่มนวล'],['casting long shadows','ทอดเงายาว'],['covered with moisture','มีความชื้นเกาะพื้นผิว'],['moving gently in wind','เคลื่อนไหวเบา ๆ ตามลม'],['reflecting ambient light','สะท้อนแสงโดยรอบ'],
    ['with a subtle feeling','ให้อารมณ์ละเอียดอ่อน'],['with an immersive feeling','ให้อารมณ์โอบล้อม'],['with a cinematic feeling','ให้อารมณ์แบบภาพยนตร์'],['with a dreamlike feeling','ให้อารมณ์ชวนฝัน'],['with an intimate feeling','ให้อารมณ์ใกล้ชิด'],['with a grand feeling','ให้อารมณ์โอ่อ่า'],['with a quiet feeling','ให้อารมณ์เงียบสงบ'],['with a dramatic feeling','ให้อารมณ์ดรามาติก'],['with a surreal feeling','ให้อารมณ์เหนือจริง'],['with a refined feeling','ให้อารมณ์ประณีต'],['with a raw feeling','ให้อารมณ์ดิบ'],['with a timeless feeling','ให้อารมณ์เหนือกาลเวลา'],['with a modern feeling','ให้อารมณ์ทันสมัย'],['with a nostalgic feeling','ให้อารมณ์ชวนคิดถึงอดีต'],['with a mysterious feeling','ให้อารมณ์ลึกลับ'],
    ['at low intensity','ความเข้มต่ำ'],['at medium intensity','ความเข้มปานกลาง'],['at high intensity','ความเข้มสูง'],['with soft diffusion','กระจายแสงนุ่มนวล'],['with hard definition','ขอบแสงคมชัด'],['with gentle falloff','แสงค่อย ๆ ลดระดับ'],['with dramatic contrast','คอนทราสต์ดรามาติก'],['with subtle bloom','แสงฟุ้งเล็กน้อย'],['with long shadows','พร้อมเงายาว'],['with crisp shadows','พร้อมเงาคม'],['with soft shadows','พร้อมเงานุ่ม'],['with volumetric haze','พร้อมหมอกแสงเป็นลำ'],['with reflected highlights','พร้อมไฮไลต์สะท้อน'],['with cinematic exposure','การรับแสงแบบภาพยนตร์'],['with natural exposure','การรับแสงเป็นธรรมชาติ'],
    ['with subtle saturation','ความอิ่มสีเล็กน้อย'],['with rich saturation','ความอิ่มสีเข้มข้น'],['with muted saturation','ความอิ่มสีแบบหม่น'],['with soft contrast','คอนทราสต์นุ่ม'],['with strong contrast','คอนทราสต์ชัด'],['with lifted shadows','ยกความสว่างบริเวณเงา'],['with deep shadows','เงาดำลึก'],['with gentle highlights','ไฮไลต์อ่อนโยน'],['with glowing highlights','ไฮไลต์เรืองแสง'],['with natural balance','สมดุลแบบธรรมชาติ'],['with cinematic balance','สมดุลแบบภาพยนตร์'],['with vintage balance','สมดุลแบบวินเทจ'],['with modern balance','สมดุลแบบทันสมัย'],['with dreamy balance','สมดุลแบบชวนฝัน'],['with dramatic balance','สมดุลแบบดรามาติก'],
    ['for an intimate view','สำหรับมุมมองใกล้ชิด'],['for a balanced view','สำหรับมุมมองสมดุล'],['for an expansive view','สำหรับมุมมองกว้างไกล'],['with precise alignment','จัดแนวอย่างแม่นยำ'],['with subtle perspective','เปอร์สเปกทีฟละเอียดอ่อน'],['with dramatic perspective','เปอร์สเปกทีฟดรามาติก'],['with natural perspective','เปอร์สเปกทีฟธรรมชาติ'],['with cinematic perspective','เปอร์สเปกทีฟแบบภาพยนตร์'],['with architectural precision','ความแม่นยำแบบภาพสถาปัตยกรรม'],['with strong depth','มีมิติความลึกชัดเจน'],['with compressed depth','บีบระยะความลึก'],['with layered depth','มีระยะซ้อนหลายชั้น'],['with minimal distortion','บิดเบี้ยวน้อยที่สุด'],['with dynamic energy','ให้อารมณ์เคลื่อนไหว'],['with calm visual balance','สมดุลภาพที่สงบนิ่ง'],
    ['with a clean finish','ผลงานสะอาดตา'],['with a refined finish','ผลงานประณีต'],['with a textured finish','ผลงานเน้นพื้นผิว'],['with a cinematic finish','ผลงานแบบภาพยนตร์'],['with an analog finish','ผลงานแบบแอนะล็อก'],['with a dreamy finish','ผลงานชวนฝัน'],['with a dramatic finish','ผลงานดรามาติก'],['with a natural finish','ผลงานเป็นธรรมชาติ'],['with a graphic finish','ผลงานแบบกราฟิก'],['with a painterly finish','ผลงานแบบภาพวาด'],['with intricate detail','พร้อมรายละเอียดซับซ้อน'],['with simplified detail','พร้อมรายละเอียดเรียบง่าย'],['with soft edges','พร้อมขอบนุ่ม'],['with crisp edges','พร้อมขอบคม'],['with atmospheric depth','พร้อมมิติบรรยากาศ'],
    ['Traditional Thai','ไทยดั้งเดิม'],['Natural wood','ไม้ธรรมชาติ'],['Dark wood','ไม้สีเข้ม'],['Exposed brick','อิฐเปลือย'],['Polished concrete','คอนกรีตขัดมัน'],['Raw concrete','คอนกรีตดิบ'],['White marble','หินอ่อนสีขาว'],['Black marble','หินอ่อนสีดำ'],['Weathered stone','หินเก่า'],['Glass walls','ผนังกระจก'],['Pristine and new','ใหม่และสมบูรณ์'],['Clean and maintained','สะอาดและได้รับการดูแล'],['Lived-in','มีร่องรอยการใช้งาน'],['Weathered','เก่าตามกาลเวลา'],['Overgrown','พืชขึ้นปกคลุม'],['Abandoned','ถูกทิ้งร้าง'],['Partially ruined','พังเสียหายบางส่วน'],['Flooded','ถูกน้ำท่วม'],['Dust-covered','ปกคลุมด้วยฝุ่น'],['Frozen','ถูกแช่แข็ง'],
    ['Soft','นุ่มนวล'],['Hard','แข็ง'],['Warm','อบอุ่น'],['Cool','เย็น'],['Natural','ธรรมชาติ'],['Cinematic','แบบภาพยนตร์'],['Light','แสง'],['lighting','แสง'],['Photography','ภาพถ่าย'],['photography','ภาพถ่าย'],['Illustration','ภาพวาดประกอบ'],['illustration','ภาพวาดประกอบ'],['painting','ภาพวาด'],['background','ฉากหลัง'],['environment','สภาพแวดล้อม'],['forest','ป่า'],['garden','สวน'],['city','เมือง'],['water','น้ำ'],['rain','ฝน'],['snow','หิมะ'],['fog','หมอก'],['sky','ท้องฟ้า'],['moon','ดวงจันทร์'],['flowers','ดอกไม้'],['plants','ต้นไม้'],['wood','ไม้'],['stone','หิน'],['glass','กระจก'],['gold','สีทอง'],['blue','สีน้ำเงิน'],['green','สีเขียว'],['red','สีแดง'],['black','สีดำ'],['white','สีขาว'],['wide','กว้าง'],['detail','รายละเอียด'],['detailed','ละเอียด'],['view','มุมมอง'],['shot','ระยะภาพ'],['angle','มุม'],['composition','การจัดองค์ประกอบ'],['focus','ระยะชัด'],['shadows','เงา'],['glow','แสงเรือง'],['vintage','วินเทจ'],['film','ฟิล์ม'],['art','ศิลปะ'],['quality','คุณภาพ'],['vertical','แนวตั้ง'],['landscape','แนวนอน'],['square','สี่เหลี่ยมจัตุรัส'],['panoramic','พาโนรามา']
  ];
  function sceneThaiOption(value, fieldId = '') {
    if (!value) return '';
    if (sceneThaiExact[value]) return sceneThaiExact[value];
    if (/[฀-๿]/.test(value)) return value;
    let translated = value;
    sceneThaiWords.forEach(([english, thai]) => { translated = translated.replace(new RegExp(english, 'gi'), thai); });
    const prefix = { materials:'วัสดุ', foreground:'ฉากหน้า', midground:'ฉากกลาง', background:'ฉากหลัง', decor:'ของตกแต่ง', natureDetails:'ธรรมชาติ', waterDetails:'น้ำ', atmosphericEffects:'บรรยากาศ', mainLight:'แสงหลัก', lightDirection:'ทิศทางแสง', lightQuality:'คุณภาพแสง', supportLight:'แสงเสริม', colorTone:'โทนสี', colorTemperature:'อุณหภูมิสี', colorGrade:'การเกรดสี', shotType:'ระยะภาพ', cameraAngle:'มุมกล้อง', lens:'เลนส์', composition:'องค์ประกอบภาพ', depthOfField:'ระยะชัด', visualStyle:'สไตล์ภาพ', detailLevel:'รายละเอียด', aspectRatio:'สัดส่วนภาพ', outputQuality:'คุณภาพภาพ' }[fieldId] || 'รูปแบบ';
    return `${prefix}: ${translated}`;
  }
  const sections = isCharacter ? characterSections : sceneSections;
  const customLabels = isCharacter ? {} : { location:'Custom Location', weather:'Custom Weather', season:'Custom Season', foreground:'Custom Foreground', midground:'Custom Midground', background:'Custom Background', mood:'Custom Mood', mainLight:'Custom Lighting', palette:'Custom Color Palette', customFilm:'ชื่อหนังหรือแนวภาพเพิ่มเติม / Custom Film or Visual Reference' };
  const defaultState = () => ({ values:{}, custom:{} });
  const restored = lab.read(draftKey, {});
  let state = { ...defaultState(), ...restored, values:{ ...(restored.values || {}) }, custom:{ ...(restored.custom || {}) } };
  if (isCharacter && state.values.era) {
    const legacyEraMap = {
      'Contemporary':'Present Day',
      'Victorian era':'Victorian Era',
      'Ancient era':'Ancient Civilizations',
      'Medieval fantasy':'Middle Ages',
      'Near future':'Near Future',
      'Far future':'Far Future'
    };
    const eraField = characterSections.flatMap(section => section.fields).find(item => item.id === 'era');
    const migratedEra = legacyEraMap[state.values.era] || state.values.era;
    if (eraField?.options.includes(migratedEra)) state.values.era = migratedEra;
    else delete state.values.era;
  }
  if (isCharacter) {
    characterSections.flatMap(section => section.fields).forEach(item => {
      const selected = state.values[item.id];
      if (Array.isArray(selected)) {
        const validSelection = selected.find(value => item.options.includes(value));
        if (validSelection) state.values[item.id] = validSelection;
        else delete state.values[item.id];
      } else if (selected && !item.options.includes(selected)) {
        delete state.values[item.id];
      }
    });
  }
  if (!isCharacter) {
    const activeSceneFieldIds = new Set(sceneSections.flatMap(section => section.fields).map(item => item.id));
    Object.keys(state.values).forEach(id => {
      if (!activeSceneFieldIds.has(id)) delete state.values[id];
    });
    Object.keys(state.custom).forEach(id => {
      if (!['location','mood','mainLight','customFilm'].includes(id)) delete state.custom[id];
    });
    sceneSections.flatMap(section => section.fields).forEach(item => {
      const selected = state.values[item.id];
      if (Array.isArray(selected)) {
        const validValues = selected.filter(value => item.options.includes(value));
        if (validValues.length) state.values[item.id] = item.multi ? validValues : validValues[0];
        else delete state.values[item.id];
      } else if (selected && !item.options.includes(selected)) {
        delete state.values[item.id];
      }
    });
  }
  let saved = lab.read(storageKey, []);
  const root = document.querySelector('#builderSections');
  if (isCharacter) document.querySelector('.character-hero > div:first-child > p:last-child').textContent = 'สร้างภาพตัวละครจากรูปร่าง หน้าตา เสื้อผ้า สีหน้า ท่าโพส และรายละเอียดที่มองเห็นได้';
  if (isCharacter) {
    const characterNote = document.createElement('aside');
    characterNote.className = 'section-learning-note character-detail-note';
    characterNote.innerHTML = '<strong>ทำไมการเลือกรายละเอียดจึงช่วยให้ตัวละครมีเอกลักษณ์</strong><p>การระบุรูปหน้า ดวงตา จมูก ผิว ผม รูปร่าง เสื้อผ้า สีหน้า และจุดจดจำที่สอดคล้องกัน ช่วยลดการตีความแบบกว้างของ AI ทำให้ตัวละครมีลักษณะเฉพาะและนำกลับไปสร้างซ้ำได้ง่ายขึ้น รายละเอียดตามธรรมชาติ เช่น ความไม่สมมาตรเล็กน้อย รูขุมขน รอยใต้ตา กระ สีผิวที่ไม่เรียบเสมอกัน เส้นผมหลุดลุ่ย และท่าทางที่ไม่แข็งเกินไป ยังช่วยลดความรู้สึกเหมือนใบหน้าพลาสติกหรือภาพสำเร็จรูปจาก AI</p><p><b>เลือกอย่างมีเหตุผล:</b> ไม่จำเป็นต้องเลือกทุกช่อง ให้เลือกเฉพาะรายละเอียดที่สำคัญต่อเอกลักษณ์ของตัวละคร และตรวจว่าคำสั่งไม่ขัดกัน ยิ่งรายละเอียดชัดและไปในทิศทางเดียวกัน ผลลัพธ์ยิ่งควบคุมได้ง่าย แต่รายละเอียดจำนวนมากที่ขัดแย้งกันอาจทำให้ AI ลดทอนหรือมองข้ามบางส่วน</p><small>Specific, consistent visual details improve character identity. Natural asymmetry and texture can reduce an overly polished AI-generated appearance.</small>';
    document.querySelector('.builder-hero').after(characterNote);
  }
  if (!isCharacter) {
    const languageNote = document.createElement('aside');
    languageNote.className = 'section-learning-note scene-language-note';
    languageNote.innerHTML = '<strong>เรียนรู้จากการทดลองสร้างฉาก</strong><p>AI จะตีความสถานที่ สภาพสถานที่ ยุค เวลา อารมณ์ และภาพยนตร์อ้างอิงร่วมกัน โดยไม่มีลำดับความสำคัญที่ตายตัว ผลลัพธ์จึงอาจเปลี่ยนตามโมเดล ภาษา และคำที่เลือก หากคำบางส่วนให้ทิศทางต่างกัน AI อาจผสม ลดทอน หรือเลือกแสดงเพียงบางลักษณะ</p><p><b>วิธีทดลอง:</b> เริ่มจากสถานที่หนึ่งแห่ง แล้วเปลี่ยนทีละหัวข้อ เช่น อารมณ์หรือหนังอ้างอิง จากนั้นเปรียบเทียบว่าภาพเปลี่ยนด้านใด คำบอกอารมณ์ช่วยกำหนดความรู้สึก ส่วนรายละเอียดที่มองเห็นได้ เช่น สี แสง รูปทรง วัสดุ และสภาพอากาศ จะช่วยสื่ออารมณ์นั้นให้ชัดขึ้น</p><p><b>เรื่องภาษา:</b> พรอมต์ไทยและอังกฤษถูกจัดให้มีความหมายสอดคล้องกัน แต่แต่ละโมเดลอาจเข้าใจคำศัพท์ น้ำหนักคำ บริบทวัฒนธรรม และชื่อเฉพาะต่างกัน จึงไม่จำเป็นต้องสร้างภาพเหมือนกัน</p><small>There is no fixed priority shared by every image model. Change one choice at a time, compare the results, and use visible details to express abstract moods.</small>';
    document.querySelector('.builder-hero').after(languageNote);
  }
  const saveName = document.createElement('label');
  saveName.className = 'save-name';
  saveName.innerHTML = `<span>${isCharacter ? 'Character' : 'Scene'} Name</span><input id="itemName" type="text" placeholder="${isCharacter ? 'เช่น Doctor Mina' : 'เช่น Modern Hospital Morning'}">`;
  document.querySelector('.preview-actions').before(saveName);
  if (!isCharacter) {
    document.querySelector('#resetBuilder').textContent = 'ล้างเนื้อหาทั้งหมด';
  }

  function render() {
    root.innerHTML = sections.map((section, index) => `<article class="builder-section ${section.kind ? `learning-${section.kind}` : ''} ${index ? 'collapsed' : ''}"><button class="builder-section-head" type="button" aria-expanded="${!index}"><span>${section.n}</span><div><h2>${section.title}</h2><p>${section.subtitle}</p>${section.level ? `<small class="section-learning-level">${escapeHtml(section.level)}</small>` : ''}</div><b>⌄</b></button><div class="builder-section-body">${section.note ? `<aside class="section-learning-note"><strong>คำแนะนำสำหรับผู้เรียน</strong><p>${escapeHtml(section.note)}</p></aside>` : ''}${section.fields.map(renderField).join('')}${Object.entries(customLabels).filter(([id]) => section.fields.some(item => item.id === id) || (id === 'customFilm' && section.n === '04') || (id === 'outfit' && section.n === '05') || (id === 'palette' && section.n === '06')).map(([id,label]) => `<label class="custom-field"><span>${label}</span><input type="text" data-custom="${id}" value="${escapeHtml(state.custom[id] || '')}" placeholder="พิมพ์รายละเอียดของคุณ..."></label>`).join('')}</div></article>`).join('');
    bindControls(); update();
  }
  function renderField(item) {
    const values = Array.isArray(state.values[item.id]) ? state.values[item.id] : [state.values[item.id]].filter(Boolean);
    const bilingualLabel = isCharacter ? `${fieldThaiLabels[item.id] || item.label} / ${item.label}` : item.label;
    const explanationText = isCharacter ? fieldThaiHelp[item.id] : sceneFieldHelp[item.id];
    const explanation = explanationText ? `<p class="field-explanation">${escapeHtml(explanationText)}</p>` : '';
    const optionCount = isCharacter && ['nationality', 'ethnicity'].includes(item.id) ? `<small>${item.options.length} ตัวเลือก</small>` : '';
    if (!item.multi) {
      const selected = values[0];
      const selectedLabel = isCharacter ? thaiOnlyOption(selected, item.id) : sceneThaiOption(selected, item.id);
      const summary = selected ? `<span class="option-th">${escapeHtml(selectedLabel)}</span><small>${escapeHtml(selected)}</small>` : `<span class="option-th">— เลือก ${isCharacter ? fieldThaiLabels[item.id] || item.label : item.label} —</span><small>Select one option</small>`;
      const unspecifiedOption = `<label><input type="radio" name="${item.id}" data-radio-field="${item.id}" value="" ${selected ? '' : 'checked'}><span><b>ไม่กำหนด</b><small>Blank — let AI interpret</small><em>เว้นหัวข้อนี้ว่างและให้ AI ตีความเอง</em></span></label>`;
      return `<fieldset class="choice-field dropdown-choice-field"><legend>${bilingualLabel}${optionCount}<small>${item.options.length} ตัวเลือก</small></legend>${explanation}<details class="single-dropdown"><summary>${summary}</summary><div class="multi-dropdown-menu">${unspecifiedOption}${item.options.map(option => `<label><input type="radio" name="${item.id}" data-radio-field="${item.id}" value="${escapeHtml(option)}" ${selected === option ? 'checked' : ''}><span><b>${escapeHtml(isCharacter ? thaiOnlyOption(option, item.id) : sceneThaiOption(option, item.id))}</b><small>${escapeHtml(option)}</small></span></label>`).join('')}</div></details></fieldset>`;
    }
    if (item.multi) {
      const selectedLabels = values.map(value => isCharacter ? thaiOnlyOption(value, item.id) : sceneThaiOption(value, item.id));
      const summary = values.length ? `<span class="option-th">เลือกแล้ว ${values.length} รายการ: ${escapeHtml(selectedLabels.join(', '))}</span><small>${escapeHtml(values.join(', '))}</small>` : `<span class="option-th">— เลือก ${isCharacter ? fieldThaiLabels[item.id] || item.label : item.label} —</span><small>Select multiple options</small>`;
      const selectionGuide = isCharacter ? 'เลือกได้หลายค่า' : 'เลือกได้ไม่เกิน 3 รายการ';
      return `<fieldset class="choice-field dropdown-choice-field"><legend>${bilingualLabel}<small>${selectionGuide} · ${item.options.length} ตัวเลือก</small></legend>${explanation}${item.help ? `<p class="learning-note">${item.help}</p>` : ''}<details class="multi-dropdown"><summary>${summary}</summary><div class="multi-dropdown-menu">${item.options.map(option => `<label><input type="checkbox" data-multi-field="${item.id}" value="${escapeHtml(option)}" ${values.includes(option) ? 'checked' : ''}><span><b>${escapeHtml(isCharacter ? thaiOnlyOption(option, item.id) : sceneThaiOption(option, item.id))}</b><small>${escapeHtml(option)}</small></span></label>`).join('')}<button class="dropdown-done" type="button">เสร็จสิ้น <small>Done</small></button></div></details></fieldset>`;
    }
    return `<fieldset class="choice-field"><legend>${item.label}${item.multi ? '<small>เลือกได้หลายค่า</small>' : ''}</legend>${item.help ? `<p class="learning-note">${item.help}</p>` : ''}<div class="choice-chips">${item.options.map(option => `<button type="button" class="choice-chip ${values.includes(option) ? 'selected' : ''}" data-field="${item.id}" data-value="${escapeHtml(option)}" data-multi="${item.multi}">${escapeHtml(option)}</button>`).join('')}</div></fieldset>`;
  }
  function bindControls() {
    document.querySelectorAll('.builder-section-head').forEach(button => button.addEventListener('click', () => { const card = button.closest('.builder-section'); card.classList.toggle('collapsed'); button.setAttribute('aria-expanded', String(!card.classList.contains('collapsed'))); }));
    document.querySelectorAll('[data-radio-field]').forEach(input => input.addEventListener('change', event => {
      const id = event.target.dataset.radioField;
      if (event.target.value) state.values[id] = event.target.value;
      else delete state.values[id];
      const dropdown = event.target.closest('.single-dropdown');
      dropdown.querySelector('summary').innerHTML = event.target.value
        ? `<span class="option-th">${escapeHtml(isCharacter ? thaiOnlyOption(event.target.value, id) : sceneThaiOption(event.target.value, id))}</span><small>${escapeHtml(event.target.value)}</small>`
        : `<span class="option-th">ไม่กำหนด</span><small>Blank — let AI interpret</small>`;
      dropdown.removeAttribute('open');
      update();
    }));
    document.querySelectorAll('[data-multi-field]').forEach(input => input.addEventListener('change', event => {
      const id = event.target.dataset.multiField;
      const checkedInputs = [...document.querySelectorAll(`[data-multi-field="${id}"]:checked`)];
      if (!isCharacter && checkedInputs.length > 3) {
        event.target.checked = false;
        toast('หัวข้อนี้เลือกได้ไม่เกิน 3 รายการ');
        return;
      }
      state.values[id] = [...document.querySelectorAll(`[data-multi-field="${id}"]:checked`)].map(item => item.value);
      const summary = event.target.closest('.multi-dropdown').querySelector('summary');
      const values = state.values[id];
      summary.innerHTML = values.length ? `<span class="option-th">เลือกแล้ว ${values.length} รายการ: ${escapeHtml(values.map(value => isCharacter ? thaiOnlyOption(value, id) : sceneThaiOption(value, id)).join(', '))}</span><small>${escapeHtml(values.join(', '))}</small>` : '<span class="option-th">— ยังไม่ได้เลือก —</span><small>No selection</small>';
      update();
    }));
    document.querySelectorAll('.dropdown-done').forEach(button => button.addEventListener('click', () => button.closest('details').removeAttribute('open')));
    document.querySelectorAll('.single-dropdown > summary, .multi-dropdown > summary').forEach(summary => summary.addEventListener('click', () => {
      document.querySelectorAll('.single-dropdown[open], .multi-dropdown[open]').forEach(dropdown => {
        if (dropdown !== summary.parentElement) dropdown.removeAttribute('open');
      });
    }));
    document.querySelectorAll('.choice-chip').forEach(button => button.addEventListener('click', () => {
      const { field:id, value, multi } = button.dataset;
      if (multi === 'true') {
        const values = new Set(state.values[id] || []); values.has(value) ? values.delete(value) : values.add(value); state.values[id] = [...values]; button.classList.toggle('selected', values.has(value));
      } else {
        const deselecting = state.values[id] === value; state.values[id] = deselecting ? '' : value;
        document.querySelectorAll(`[data-field="${id}"]`).forEach(chip => chip.classList.toggle('selected', !deselecting && chip.dataset.value === value));
      }
      update();
    }));
    document.querySelectorAll('[data-custom]').forEach(input => input.addEventListener('input', event => { state.custom[event.target.dataset.custom] = event.target.value; update(); }));
  }
  const list = id => Array.isArray(state.values[id]) ? state.values[id] : [state.values[id]].filter(Boolean);
  const joined = id => [...list(id), ...(!isCharacter && state.custom[id] ? [state.custom[id]] : [])].filter(Boolean).join(', ');
  function characterPrompt() {
    const identity = [state.values.age, joined('nationality'), state.values.ethnicity, state.values.gender, joined('occupation')].filter(Boolean);
    const face = [joined('face'), state.values.faceWidth, state.values.cheekbones, state.values.forehead, state.values.chin, state.values.jawline].filter(Boolean);
    const features = [state.values.eyes, state.values.eyeSize, state.values.eyeColor, state.values.eyebrows, state.values.eyelashes, state.values.nose, state.values.lips, state.values.mouthDetails, state.values.ears].filter(Boolean);
    const skin = [state.values.skinTone, state.values.undertone, joined('skinDetails'), joined('distinctiveMarks')].filter(Boolean);
    const hair = [state.values.hairLength, state.values.hairStyle, state.values.hairTexture, state.values.hairColor, state.values.hairPart, state.values.bangs, state.values.facialHair, joined('hairDetails')].filter(Boolean);
    const signature = [state.values.signatureProp !== 'No signature prop' && state.values.signatureProp].filter(Boolean);
    const body = [state.values.height, state.values.bodyType, state.values.proportion, joined('physicalFeatures'), state.values.hands, state.values.posture].filter(Boolean);
    const outfit = [state.values.era, state.values.fashion && `${state.values.fashion} style`, state.values.top, state.values.bottom, state.values.dress !== 'No dress' && state.values.dress, state.values.outerwear !== 'No outerwear' && state.values.outerwear, state.values.shoes, joined('accessories'), state.values.mainColor && `${state.values.mainColor} main color`, state.values.accentColor !== 'No accent color' && state.values.accentColor, state.values.material, state.values.fit].filter(Boolean);
    const performance = [state.values.expression, state.values.gaze, state.values.gesture].filter(Boolean);
    const realism = [state.values.realismLevel, joined('microTexture'), joined('eyeRealism'), state.values.retouching].filter(Boolean);
    const health = [joined('visibleHealthImpact'), joined('disability')].filter(Boolean);
    const antiAi = realism.length ? 'NEGATIVE PROMPT: plastic skin, waxy skin, porcelain doll face, overly smooth skin, airbrushed face, perfect facial symmetry, artificial eyes, glassy eyes, fake catchlights, uncanny valley, CGI face, 3D render look, beauty-filter face, excessive retouching, identical facial features, malformed teeth, overly white teeth' : '';
    const lines = [
      identity.length && `CHARACTER: ${identity.join(', ')}`,
      face.length && `FACE ANATOMY: ${face.join(', ')}`,
      features.length && `EYES, NOSE & MOUTH: ${features.join(', ')}`,
      skin.length && `SKIN & DISTINCTIVE MARKS: ${skin.join(', ')}`,
      hair.length && `HAIR & GROOMING: ${hair.join(', ')}`,
      body.length && `BODY & MOVEMENT: ${body.join(', ')}`,
      outfit.length && `WARDROBE: ${outfit.join(', ')}`,
      performance.length && `EXPRESSION & PERFORMANCE: ${performance.join(', ')}`,
      health.length && `HEALTH & ACCESSIBILITY: ${health.join(', ')}`,
      signature.length && `SIGNATURE IDENTITY: ${signature.join(', ')}`,
      realism.length && `HUMAN REALISM: ${realism.join(', ')}`,
      antiAi
    ].filter(Boolean);
    return lines.join('\n');
  }
  function characterThaiPrompt() {
    const one = id => state.values[id] ? thaiOption(state.values[id], id) : '';
    const many = id => list(id).map(value => thaiOption(value, id)).filter(Boolean);
    const identity = [one('age'), ...many('nationality'), one('ethnicity'), one('gender'), ...many('occupation')].filter(Boolean);
    const face = [...many('face'), one('faceWidth'), one('cheekbones'), one('forehead'), one('chin'), one('jawline')].filter(Boolean);
    const features = [one('eyes'), one('eyeSize'), one('eyeColor'), one('eyebrows'), one('eyelashes'), one('nose'), one('lips'), one('mouthDetails'), one('ears')].filter(Boolean);
    const skin = [one('skinTone'), one('undertone'), ...many('skinDetails'), ...many('distinctiveMarks')].filter(Boolean);
    const hair = [one('hairLength'), one('hairStyle'), one('hairTexture'), one('hairColor'), one('hairPart'), one('bangs'), one('facialHair'), ...many('hairDetails')].filter(Boolean);
    const signature = [state.values.signatureProp !== 'No signature prop' && one('signatureProp')].filter(Boolean);
    const body = [one('height'), one('bodyType'), one('proportion'), ...many('physicalFeatures'), one('hands'), one('posture')].filter(Boolean);
    const outfit = [one('era'), one('fashion'), one('top'), one('bottom'), state.values.dress !== 'No dress' && one('dress'), state.values.outerwear !== 'No outerwear' && one('outerwear'), one('shoes'), ...many('accessories'), one('mainColor'), state.values.accentColor !== 'No accent color' && one('accentColor'), one('material'), one('fit')].filter(Boolean);
    const performance = [one('expression'), one('gaze'), one('gesture')].filter(Boolean);
    const realism = [one('realismLevel'), ...many('microTexture'), ...many('eyeRealism'), one('retouching')].filter(Boolean);
    const health = [...many('visibleHealthImpact'), ...many('disability')].filter(Boolean);
    return [
      identity.length && `ข้อมูลตัวละคร: ${identity.join(', ')}`,
      face.length && `โครงสร้างใบหน้า: ${face.join(', ')}`,
      features.length && `ดวงตา จมูก และปาก: ${features.join(', ')}`,
      skin.length && `ผิวและจุดจดจำ: ${skin.join(', ')}`,
      hair.length && `ผมและการดูแลรูปลักษณ์: ${hair.join(', ')}`,
      body.length && `รูปร่างและการเคลื่อนไหว: ${body.join(', ')}`,
      outfit.length && `เสื้อผ้าและเครื่องแต่งกาย: ${outfit.join(', ')}`,
      performance.length && `สีหน้าและการแสดงออก: ${performance.join(', ')}`,
      health.length && `สุขภาพและการเข้าถึง: ${health.join(', ')}`,
      signature.length && `เอกลักษณ์ประจำตัว: ${signature.join(', ')}`,
      realism.length && `ความสมจริงแบบมนุษย์: ${realism.join(', ')}`,
      realism.length && 'สิ่งที่ไม่ต้องการ: ผิวพลาสติก, ผิวเหมือนขี้ผึ้ง, ใบหน้าตุ๊กตา, ผิวเรียบเกินจริง, ใบหน้าที่แต่งผิวมากเกินไป, ใบหน้าสมมาตรสมบูรณ์แบบ, ดวงตาปลอม, ดวงตาเหมือนแก้ว, แสงสะท้อนในตาปลอม, ใบหน้าผิดธรรมชาติ, ใบหน้าจากคอมพิวเตอร์กราฟิก, ภาพแบบเรนเดอร์สามมิติ, ใบหน้าจากฟิลเตอร์ความงาม, ฟันผิดรูป, ฟันขาวเกินจริง'
    ].filter(Boolean).join('\n');
  }
  function scenePrompt() {
    const location = [state.values.locationType, state.values.location || state.custom.location].filter(Boolean);
    const setting = [state.values.architecture, joined('materials'), state.values.condition].filter(Boolean);
    const period = [state.values.sceneEra, state.values.buddhistYear, state.values.christianYear].filter(Boolean);
    const environment = [state.values.time, state.values.weather || state.custom.weather, state.values.season || state.custom.season, state.values.sky].filter(Boolean);
    const depth = [['foreground','In the foreground'],['midground','The midground features'],['background','In the background']].map(([id,label]) => joined(id) && `${label} ${joined(id)}`).filter(Boolean);
    const details = [joined('decor'), joined('natureDetails'), joined('waterDetails'), joined('atmosphericEffects')].filter(Boolean);
    const mood = joined('mood');
    const light = [state.values.mainLight || state.custom.mainLight, state.values.lightDirection, state.values.lightQuality, state.values.supportLight !== 'None' && state.values.supportLight].filter(Boolean);
    const color = [state.values.colorTone || state.custom.palette, state.values.colorTemperature, state.values.colorGrade].filter(Boolean);
    const camera = [state.values.shotType, state.values.cameraAngle, state.values.lens, state.values.composition, state.values.depthOfField].filter(Boolean);
    const style = [state.values.visualStyle, state.values.detailLevel, state.values.aspectRatio, state.values.outputQuality].filter(Boolean);
    const filmReference = [state.values.hollywoodFilm, state.values.thaiFilm, state.custom.customFilm].filter(Boolean);
    const hasPrompt = location.length || setting.length || period.length || environment.length || depth.length || details.length || mood || light.length || color.length || camera.length || style.length || filmReference.length;
    return [
      location.length && `Create an empty environment scene set in a ${location.join(' ')} environment`,
      setting.length && `The setting features ${setting.join(', ')}`,
      period.length && `The historical period is ${period.join(', ')}`,
      environment.length && `It takes place during ${environment.join(', ')}`,
      ...depth,
      details.length && `Add environmental details including ${details.join(', ')}`,
      mood && `The atmosphere feels ${mood}`,
      light.length && `Lighting: ${light.join(', ')}`,
      color.length && `Color treatment: ${color.join(', ')}`,
      camera.length && `Camera and composition: ${camera.join(', ')}`,
      style.length && `Visual style: ${style.join(', ')}`,
      filmReference.length && `Use only the general environment mood, production-design language, lighting, and color atmosphere associated with ${filmReference.join(' and ')} as inspiration; create an original scene and do not recreate any recognizable shot, set, character, logo, or copyrighted artwork`,
      hasPrompt && 'No people, no person, no characters, no animals, no text, no logo, no watermark'
    ].filter(Boolean).join('. ') + (hasPrompt ? '.' : '');
  }
  function sceneThaiPrompt() {
    const one = id => state.values[id] ? sceneThaiOption(state.values[id], id) : '';
    const filmWithTitle = id => {
      const title = state.values[id];
      if (!title) return '';
      const thaiDetail = sceneThaiOption(title, id);
      if (!thaiDetail || thaiDetail === title) return title;
      if (thaiDetail.startsWith(`${title} —`)) return thaiDetail;
      return `${title} — ${thaiDetail}`;
    };
    const location = [one('location'), one('condition')].filter(Boolean);
    const period = [one('sceneEra'), one('buddhistYear'), one('christianYear')].filter(Boolean);
    const atmosphere = [one('time'), one('mood')].filter(Boolean);
    const filmReference = [filmWithTitle('hollywoodFilm'), filmWithTitle('thaiFilm'), state.custom.customFilm].filter(Boolean);
    const hasPrompt = location.length || period.length || atmosphere.length || filmReference.length;
    return [
      location.length && `ฉากสถานที่ว่างเปล่า: ${location.join(', ')}`,
      period.length && `ยุคและช่วงเวลา: ${period.join(', ')}`,
      atmosphere.length && `เวลาและบรรยากาศ: ${atmosphere.join(', ')}`,
      filmReference.length && `แรงบันดาลใจด้านบรรยากาศ การออกแบบสถานที่ แสง และสีจาก: ${filmReference.join(' และ ')}`,
      filmReference.length && 'สร้างฉากใหม่ ไม่คัดลอกฉาก ตัวละคร ตราสัญลักษณ์ หรืองานภาพที่จดจำได้จากต้นฉบับ',
      hasPrompt && 'ไม่มีคน ไม่มีตัวละคร ไม่มีสัตว์ ไม่มีข้อความ ไม่มีตราสัญลักษณ์ และไม่มีลายน้ำ'
    ].filter(Boolean).join('\n');
  }
  function update() {
    lab.write(draftKey, state);
    const prompt = isCharacter ? characterPrompt() : scenePrompt();
    const output = document.querySelector('#promptOutput'); output.textContent = prompt || (isCharacter ? 'เริ่มเลือกคุณลักษณะเพื่อสร้าง Character Prompt' : 'เริ่มเลือกองค์ประกอบเพื่อสร้าง Scene Prompt'); output.classList.toggle('empty', !prompt);
    const thaiOutput = document.querySelector('#thaiPromptOutput');
    if (thaiOutput) {
      const thaiPrompt = isCharacter ? characterThaiPrompt() : sceneThaiPrompt();
      thaiOutput.textContent = thaiPrompt || `เริ่มเลือก${isCharacter ? 'คุณลักษณะ' : 'องค์ประกอบฉาก'}เพื่อสร้างพรอมต์ภาษาไทย`;
      thaiOutput.classList.toggle('empty', !thaiPrompt);
    }
  }
  function toast(message) { const el = document.querySelector('#builderToast'); el.textContent = message; clearTimeout(toast.timer); toast.timer = setTimeout(() => el.textContent = '', 1800); }
  async function copy(text) { if (!text) return toast('ยังไม่มี Prompt ให้คัดลอก'); try { await navigator.clipboard.writeText(text); } catch { const area = document.createElement('textarea'); area.value=text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); } toast('คัดลอกแล้ว'); }
  function saveItem() {
    const promptText = isCharacter ? characterPrompt() : scenePrompt(); if (!promptText) return toast('เลือกข้อมูลอย่างน้อย 1 รายการก่อนบันทึก');
    const nameInput = document.querySelector('#itemName'); const name = nameInput.value.trim(); if (!name) { nameInput.focus(); return toast(`กรุณาตั้งชื่อ ${isCharacter ? 'Character' : 'Scene'}`); }
    const id = `${type}-${Date.now()}`; const item = { id, name, settings: structuredClone(state), prompt: promptText, createdAt:new Date().toISOString() };
    saved.unshift(item); lab.write(storageKey, saved); lab.addRecent({ id, name, type:isCharacter ? 'Character' : 'Scene', preview:promptText }); nameInput.value=''; renderSaved(); toast('บันทึกแล้ว');
  }
  function renderSaved() {
    const root = document.querySelector('#savedItems'); root.innerHTML = saved.length ? saved.map(item => `<div class="saved-item"><button data-load="${item.id}"><strong>${escapeHtml(item.name)}</strong><small>${new Date(item.createdAt).toLocaleString('th-TH')}</small></button><button class="delete-saved" data-delete="${item.id}" aria-label="ลบ">×</button></div>`).join('') : `<p class="empty-state">ยังไม่มี${isCharacter ? 'ตัวละคร' : 'ฉาก'}ที่บันทึกไว้</p>`;
    root.querySelectorAll('[data-load]').forEach(button => button.addEventListener('click', () => { const item=saved.find(x=>x.id===button.dataset.load); if(item){ state=structuredClone(item.settings); render(); window.scrollTo({top:0,behavior:'smooth'}); toast(`โหลด “${item.name}” แล้ว`); } }));
    root.querySelectorAll('[data-delete]').forEach(button => button.addEventListener('click', () => { if(!confirm('ลบรายการนี้หรือไม่?')) return; saved=saved.filter(x=>x.id!==button.dataset.delete); lab.write(storageKey,saved); renderSaved(); }));
  }
  document.querySelector('#copyPrompt').addEventListener('click', () => copy(isCharacter ? characterPrompt() : scenePrompt()));
  document.querySelector('#copyThaiPrompt')?.addEventListener('click', () => copy(isCharacter ? characterThaiPrompt() : sceneThaiPrompt()));
  document.querySelector('#saveItem').addEventListener('click', saveItem);
  document.querySelector('#itemName').addEventListener('keydown', event => { if (event.key === 'Enter') saveItem(); });
  document.querySelector('#resetBuilder').addEventListener('click', () => { if(!confirm('ล้างค่าที่เลือกทั้งหมดหรือไม่?')) return; state=defaultState(); render(); });
  document.querySelector('#useInPrompt').addEventListener('click', () => { const value=isCharacter ? characterPrompt() : scenePrompt(); if(!value) return toast('สร้าง Prompt ก่อนส่งต่อ'); localStorage.setItem(isCharacter ? 'aiCreativeLabPendingCharacter' : 'aiCreativeLabPendingScene', value); location.href='prompt-builder.html'; });
  document.addEventListener('click', event => {
    if (event.target.closest('.single-dropdown, .multi-dropdown')) return;
    document.querySelectorAll('.single-dropdown[open], .multi-dropdown[open]').forEach(dropdown => dropdown.removeAttribute('open'));
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.single-dropdown[open], .multi-dropdown[open]').forEach(dropdown => dropdown.removeAttribute('open'));
  });
  render(); renderSaved();
  const loadId = new URLSearchParams(location.search).get('load'); if(loadId){ const item=saved.find(x=>x.id===loadId); if(item){ state=structuredClone(item.settings); render(); } }
})();

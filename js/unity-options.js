window.UNITY_HELPER = {
  engineVersion: '6000.5.4f1',
  engineName: 'Unity 6',
  textFields: [
    { id: 'idea', label: 'ไอเดียสั้นๆ / Short idea', placeholder: 'เช่น ผู้เล่นกดชาร์จไฟฉายไดนาโม แล้วมอนสเตอร์ได้ยินเสียงเมื่อชาร์จดังเกินไป', rows: 3, required: true },
    { id: 'playerFantasy', label: 'ความรู้สึกที่ผู้เล่นควรได้รับ / Player fantasy', placeholder: 'เช่น รู้สึกเปราะบางในความมืด แต่ยังควบคุมจังหวะแสงและเสียงได้', rows: 2 },
    { id: 'stateFlow', label: 'ลำดับสถานะ / State & trigger flow', placeholder: 'เช่น Idle → Charge → Full → Drain; ถ้าเสียงเกินเกณฑ์ มอนสเตอร์เข้า Investigate', rows: 2 },
    { id: 'winLose', label: 'เงื่อนไขสำเร็จ/ล้มเหลว / Success & fail', placeholder: 'เช่น ถึงทางออกโดยแบตไม่หมด; ถูกจับเมื่ออยู่ในกรวยสายตาเกิน 1.2 วินาที', rows: 2 },
    { id: 'edgeCases', label: 'เคสพิเศษที่ต้องรองรับ / Edge cases', placeholder: 'เช่น กดชาร์จขณะถูก stun, เปลี่ยนฉากกลางคัน, แบตเป็น 0 ตอนเปิดประตู', rows: 2 },
    { id: 'customConstraints', label: 'ข้อห้ามหรือข้อจำกัดเพิ่มเติม / Extra constraints', placeholder: 'เช่น ห้ามใช้ Find ใน Update, ห้ามระบบมัลติเพลย์เยอร์, ใช้ Prefab แทน Instantiate ซ้ำ', rows: 2 }
  ],
  sections: [
    {
      n: '01', title: 'เป้าหมายเกม / Game Goal', subtitle: 'ประเภทเกม มุมกล้อง ขอบเขตงาน และระดับความสมบูรณ์',
      level: 'ขั้นที่ 1 · จำเป็น', kind: 'essential',
      note: 'เริ่มจากไอเดียสั้นๆ แล้วเลือกมิติเกม ประเภท และขอบเขต ระบบจะขยายเป็น Prompt ที่ AI เอาไปเขียน C# ใน Unity 6000.5.4f1 ได้ทันที ไม่ต้องเลือกครบทุกช่อง',
      fields: [
        { id: 'dimension', label: 'Dimension', labelTh: 'มิติของเกม', help: 'กำหนดว่าโค้ดจะใช้ Physics 2D หรือ 3D และกล้องแบบใด', options: [
          ['2D side-view (XY plane, Orthographic)', '2D มุมข้าง กล้อง Orthographic'],
          ['2D top-down (XY plane, Orthographic)', '2D มุมบน'],
          ['2D isometric / dimetric', '2D ไอโซเมตริก'],
          ['2.5D side-scroller in 3D world', '2.5D โลก 3D มุมข้าง'],
          ['3D first-person', '3D มุมมองบุคคลที่หนึ่ง'],
          ['3D third-person over-the-shoulder', '3D มุมมองบุคคลที่สาม'],
          ['3D third-person follow cam', '3D กล้องตามหลัง'],
          ['3D top-down / twin-stick', '3D มุมบนหรือทวินสติก'],
          ['3D free-look exploration', '3D สำรวจกล้องอิสระ'],
          ['Mixed 2D UI over 3D world', 'UI 2D ทับโลก 3D']
        ]},
        { id: 'genre', label: 'Genre', labelTh: 'ประเภทเกม', help: 'ช่วยกำหนดเมคานิกเริ่มต้นที่ควรมีใน Prompt', options: [
          ['Action adventure', 'แอ็กชันผจญภัย'],
          ['Survival horror', 'เอาชีวิตรอดสยองขวัญ'],
          ['Stealth / infiltration', 'ลอบเร้น'],
          ['Platformer', 'แพลตฟอร์มเมอร์'],
          ['Metroidvania', 'เมโทรอิเดเวเนีย'],
          ['Soulslike combat', 'ต่อสู้สไตล์โซล'],
          ['Hack and slash', 'แฮ็กแอนด์สแลช'],
          ['Twin-stick shooter', 'ยิงทวินสติก'],
          ['Cover shooter', 'ยิงหลบกำบัง'],
          ['FPS arena shooter', 'ยิงมุมหนึ่งในลานประลอง'],
          ['Tactical RPG', 'อาร์พีจีเชิงกลยุทธ์'],
          ['Action RPG', 'แอ็กชันอาร์พีจี'],
          ['Turn-based RPG', 'อาร์พีจีผลัดกันเล่น'],
          ['Roguelike / roguelite', 'โรกไลก์ / โรกไลต์'],
          ['City builder / management', 'สร้างเมือง / บริหาร'],
          ['Simulation / life sim', 'จำลองชีวิต'],
          ['Farming / crafting sandbox', 'ฟาร์มและคราฟต์'],
          ['Puzzle adventure', 'ผจญภัยปริศนา'],
          ['Physics puzzle', 'ปริศนาฟิสิกส์'],
          ['Tower defense', 'ป้องกันฐาน'],
          ['Auto battler', 'ออโต้แบตเลอร์'],
          ['Card battler', 'การ์ดแบตเลอร์'],
          ['Rhythm / timing game', 'เกมจังหวะ'],
          ['Racing / driving', 'แข่งรถ'],
          ['Vehicle combat', 'ยานพาหนะต่อสู้'],
          ['Flight / space sim', 'จำลองการบินหรืออวกาศ'],
          ['Sports / score-attack', 'กีฬาหรือทำคะแนน'],
          ['Fighting game', 'เกมต่อสู้ตัวต่อตัว'],
          ['Visual novel / narrative', 'นิยายภาพ'],
          ['Point-and-click adventure', 'ผจญภัยคลิกสำรวจ'],
          ['Idle / incremental', 'ไอเดิล'],
          ['Educational / serious game', 'เกมเพื่อการเรียนรู้'],
          ['Prototype sandbox (no genre lock)', 'แซนด์บ็อกซ์ต้นแบบ ไม่ล็อกแนว']
        ]},
        { id: 'scope', label: 'Delivery scope', labelTh: 'ขอบเขตงานที่ต้องการ', help: 'บอก AI ว่าควรส่งระบบเล็กที่เล่นได้ หรือชุดระบบพร้อมขยาย', options: [
          ['Vertical slice playable prototype', 'ต้นแบบเล่นได้แบบ vertical slice'],
          ['Single mechanic, production-ready', 'เมคานิกเดียว ระดับพร้อมใช้งาน'],
          ['Full gameplay loop for one level', 'ลูปเกมเพลย์ครบสำหรับหนึ่งด่าน'],
          ['Reusable framework / toolkit', 'เฟรมเวิร์กใช้ซ้ำได้'],
          ['Replace an existing broken system', 'แทนที่ระบบเดิมที่พัง'],
          ['Student assignment with comments', 'งานเรียนที่ต้องมีคอมเมนต์อธิบาย'],
          ['Jam-ready minimal implementation', 'ทำเร็วสำหรับเกมแจม']
        ]},
        { id: 'sessionLength', label: 'Target session', labelTh: 'ความยาวเซสชัน', options: [
          ['30–90 second tutorial beat', 'จังหวะสอน 30–90 วินาที'],
          ['3–8 minute encounter', 'การปะทะ 3–8 นาที'],
          ['15–30 minute level', 'ด่าน 15–30 นาที'],
          ['Endless / run-based session', 'เล่นไม่จบหรือเป็นรอบ'],
          ['Persistent campaign session', 'แคมเปญต่อเนื่อง']
        ]},
        { id: 'complexity', label: 'Implementation depth', labelTh: 'ความลึกของการทำ', options: [
          ['Beginner MonoBehaviour only', 'ระดับเริ่มต้น ใช้ MonoBehaviour อย่างเดียว'],
          ['Intermediate modular components', 'ระดับกลาง แยกคอมโพเนนต์'],
          ['Advanced scalable architecture', 'ระดับสูง สถาปัตยกรรมขยายได้'],
          ['Expert performance-critical', 'ระดับเชี่ยวชาญ เน้นประสิทธิภาพ']
        ]}
      ]
    },
    {
      n: '02', title: 'เอนจินและแพ็กเกจ / Engine & Packages', subtitle: 'ล็อกเวอร์ชัน Unity 6 และแพ็กเกจที่อนุญาตให้ใช้',
      level: 'ขั้นที่ 2 · ล็อกเวอร์ชัน', kind: 'essential',
      note: 'เวอร์ชันเป้าหมายคือ Unity 6000.5.4f1 เสมอ เลือกเฉพาะแพ็กเกจที่โปรเจกต์ใช้จริง เพื่อไม่ให้ AI เขียน API เก่าหรือแพ็กเกจที่ไม่ได้ติดตั้ง',
      fields: [
        { id: 'renderPipeline', label: 'Render pipeline', labelTh: 'ไปป์ไลน์เรนเดอร์', options: [
          ['URP (Universal Render Pipeline) with Render Graph enabled', 'URP พร้อม Render Graph'],
          ['URP 2D Renderer (2D lights and shadows)', 'URP 2D Renderer'],
          ['HDRP (High Definition Render Pipeline)', 'HDRP'],
          ['Built-in Render Pipeline (legacy, only if required)', 'Built-in แบบเลกาซี ใช้เมื่อจำเป็น']
        ]},
        { id: 'scriptingBackend', label: 'Scripting backend', labelTh: 'แบ็กเอนด์สคริปต์', options: [
          ['IL2CPP, .NET Standard 2.1 compatible C#', 'IL2CPP และ C# ที่เข้ากับ .NET Standard 2.1'],
          ['Mono editor / IL2CPP player', 'Mono ในเอดิเตอร์ และ IL2CPP ตอนบิลด์'],
          ['CoreCLR / modern .NET player if available in this Unity 6 install', 'CoreCLR ถ้าเวอร์ชันนี้รองรับ']
        ]},
        { id: 'packages', label: 'Required packages', labelTh: 'แพ็กเกจที่ต้องใช้', multi: true, help: 'เลือกได้หลายรายการ ระบบจะสั่งให้ AI ระบุ Package Manager name', options: [
          ['com.unity.inputsystem (New Input System)', 'Input System ใหม่'],
          ['com.unity.cinemachine (Cinemachine 3)', 'Cinemachine 3'],
          ['com.unity.ai.navigation (NavMesh)', 'AI Navigation / NavMesh'],
          ['com.unity.splines (Splines)', 'Splines'],
          ['com.unity.timeline (Timeline)', 'Timeline'],
          ['com.unity.ugui (uGUI)', 'uGUI'],
          ['com.unity.ui / UI Toolkit', 'UI Toolkit'],
          ['com.unity.textmeshpro (TextMeshPro)', 'TextMeshPro'],
          ['com.unity.render-pipelines.universal (URP)', 'URP'],
          ['com.unity.addressables (Addressables)', 'Addressables'],
          ['com.unity.localization (Localization)', 'Localization'],
          ['com.unity.nuget.newtonsoft-json (Newtonsoft JSON)', 'Newtonsoft JSON'],
          ['com.unity.visualeffectgraph (VFX Graph)', 'VFX Graph'],
          ['com.unity.shadergraph (Shader Graph)', 'Shader Graph'],
          ['com.unity.animation.rigging (Animation Rigging)', 'Animation Rigging'],
          ['com.unity.2d.animation (2D Animation)', '2D Animation'],
          ['com.unity.2d.pixel-perfect (Pixel Perfect)', 'Pixel Perfect'],
          ['com.unity.probuilder (ProBuilder)', 'ProBuilder'],
          ['com.unity.behavior (Unity Behavior)', 'Unity Behavior'],
          ['com.unity.netcode.gameobjects (Netcode for GameObjects)', 'Netcode for GameObjects'],
          ['com.unity.entities (ECS / Entities)', 'Entities / ECS'],
          ['com.unity.burst (Burst)', 'Burst'],
          ['com.unity.collections (Collections)', 'Collections'],
          ['com.unity.mathematics (Unity.Mathematics)', 'Unity.Mathematics'],
          ['com.unity.splines + Cinemachine carts', 'Splines กับรถกล้อง Cinemachine'],
          ['No extra packages beyond Unity core modules', 'ไม่ใช้แพ็กเกจเสริม']
        ]},
        { id: 'apiPolicy', label: 'API policy', labelTh: 'นโยบาย API', options: [
          ['Unity 6 modern APIs only; never use deprecated APIs', 'ใช้ API ใหม่ของ Unity 6 เท่านั้น'],
          ['Prefer Unity 6 APIs, allow documented fallbacks', 'เน้น API ใหม่ แต่มีทางสำรองที่เอกสารรองรับ'],
          ['Match existing project APIs even if older', 'ให้เข้ากับโค้ดเดิมแม้จะเป็น API เก่า']
        ]}
      ]
    },
    {
      n: '03', title: 'สถาปัตยกรรมโค้ด / Architecture', subtitle: 'รูปแบบการออกแบบ การสื่อสาร และโครงสร้างโฟลเดอร์',
      level: 'ขั้นที่ 3 · โครงสร้าง', kind: 'advanced',
      note: 'เลือกแพตเทิร์นหลักเพียงแบบที่โปรเจกต์จะยึด แล้วเติมวิธีสื่อสารระหว่างระบบ เพื่อให้ AI ไม่ผสม Singleton กับ Event แบบสุ่ม',
      fields: [
        { id: 'pattern', label: 'Primary pattern', labelTh: 'แพตเทิร์นหลัก', options: [
          ['Single focused MonoBehaviour per responsibility', 'หนึ่ง MonoBehaviour ต่อหนึ่งหน้าที่'],
          ['Finite State Machine (class-per-state)', 'FSM แยกคลาสต่อสถานะ'],
          ['Hierarchical FSM', 'FSM แบบมีลำดับชั้น'],
          ['ScriptableObject architecture (data + events)', 'สถาปัตยกรรม ScriptableObject'],
          ['MVC / MVP for UI + gameplay services', 'MVC หรือ MVP สำหรับ UI'],
          ['Interface-based services with composition', 'บริการผ่านอินเทอร์เฟซและคอมโพสิชัน'],
          ['Event-driven with C# events / UnityEvent', 'ขับด้วยอีเวนต์'],
          ['Command pattern for player actions', 'Command สำหรับแอ็กชันผู้เล่น'],
          ['Observer + blackboard for AI', 'Observer และกระดานข้อมูลสำหรับ AI'],
          ['ECS / DOTS for simulation-heavy parts only', 'ECS เฉพาะส่วนจำลองหนัก'],
          ['Hybrid MonoBehaviour authoring + ECS runtime', 'เขียนบน MonoBehaviour แล้วรันบน ECS']
        ]},
        { id: 'messaging', label: 'Messaging', labelTh: 'การสื่อสารระหว่างระบบ', options: [
          ['Serialized UnityEvent in Inspector', 'UnityEvent ในอินสเปกเตอร์'],
          ['C# event / Action on a coordinator', 'C# event บนตัวประสาน'],
          ['ScriptableObject game events', 'อีเวนต์แบบ ScriptableObject'],
          ['Interface callbacks (IDamageable, IInteractable)', 'คอลแบ็กผ่านอินเทอร์เฟซ'],
          ['MessagePipe-style pub/sub without third-party if possible', 'ผับซับโดยไม่พึ่งไลบรารีภายนอกถ้าทำได้'],
          ['Direct serialized references only', 'อ้างอิงในอินสเปกเตอร์โดยตรงเท่านั้น']
        ]},
        { id: 'lifetime', label: 'Object lifetime', labelTh: 'อายุของอ็อบเจ็กต์', options: [
          ['Scene-local objects only', 'มีชีวิตเฉพาะในซีน'],
          ['DontDestroyOnLoad game director', 'ไดเรกเตอร์ข้ามซีน'],
          ['Addressable instantiate / release', 'สร้างและคืนผ่าน Addressables'],
          ['UnityEngine.Pool.ObjectPool<T>', 'ObjectPool ของ Unity'],
          ['Disable/enable instead of destroy', 'ปิด-เปิดแทนการทำลาย']
        ]},
        { id: 'folders', label: 'Folder / asmdef', labelTh: 'โฟลเดอร์และ Assembly', options: [
          ['Simple Assets/_Project/{Scripts,Art,Prefabs,ScriptableObjects}', 'โครงสร้างโฟลเดอร์โปรเจกต์ง่าย'],
          ['Feature folders (Combat/, Inventory/, UI/)', 'แยกโฟลเดอร์ตามฟีเจอร์'],
          ['Runtime + Editor asmdefs', 'แยก Assembly รันไทม์และเอดิเตอร์'],
          ['Match existing project structure; do not reorganize', 'ใช้โครงสร้างเดิม ห้ามจัดใหม่']
        ]},
        { id: 'namespaceStyle', label: 'Namespace & naming', labelTh: 'เนมสเปซและชื่อ', options: [
          ['Project.Feature.Type PascalCase; private fields _camelCase', 'เนมสเปซโปรเจกต์ ฟิลด์ขึ้นต้นด้วย _'],
          ['Feature only namespaces; SerializeField camelCase', 'เนมสเปซตามฟีเจอร์ SerializeField แบบ camelCase'],
          ['Follow existing file naming exactly', 'ตั้งชื่อให้ตรงกับไฟล์ที่มีอยู่']
        ]}
      ]
    },
    {
      n: '04', title: 'อินพุต / Input', subtitle: 'Input System, อุปกรณ์ และแผนที่ปุ่ม',
      level: 'ขั้นที่ 4 · ควบคุม', kind: 'essential',
      note: 'Unity 6 โปรเจกต์ใหม่ควรใช้ New Input System เป็นค่าเริ่มต้น ระบุอุปกรณ์และแอ็กชันให้ครบเพื่อให้ AI สร้าง Input Actions asset',
      fields: [
        { id: 'inputSystem', label: 'Input system', labelTh: 'ระบบอินพุต', options: [
          ['New Input System: Input Action Asset + PlayerInput', 'Input System ใหม่ + PlayerInput'],
          ['New Input System: generated C# class from .inputactions', 'Input System ใหม่ เจนคลาส C#'],
          ['New Input System: direct InputAction in component', 'InputAction ในคอมโพเนนต์โดยตรง'],
          ['Enhanced Touch + New Input System', 'Enhanced Touch คู่กับ Input System ใหม่'],
          ['Legacy Input Manager (Input.GetAxis / GetKey) only if required', 'Input แบบเก่า ใช้เมื่อจำเป็น'],
          ['Both systems active (Project Settings: Input System Package + Both)', 'เปิดสองระบบพร้อมกัน']
        ]},
        { id: 'devices', label: 'Devices', labelTh: 'อุปกรณ์', multi: true, options: [
          ['Keyboard and mouse', 'คีย์บอร์ดและเมาส์'],
          ['Gamepad (Xbox / DualSense layout)', 'เกมแพด'],
          ['Touch (virtual stick + buttons)', 'ทัช สติกเสมือนและปุ่ม'],
          ['Gyroscope / accelerometer', 'ไจโร / เร่ง'],
          ['Mouse look + WASD', 'เมาส์มอง + WASD'],
          ['Click-to-move', 'คลิกเพื่อเดิน'],
          ['Rebindable actions at runtime', 'รีไบน์ปุ่มตอนรันไทม์']
        ]},
        { id: 'inputMap', label: 'Action map', labelTh: 'ชุดแอ็กชัน', multi: true, options: [
          ['Move (Vector2)', 'เดิน Vector2'],
          ['Look (Vector2)', 'มอง Vector2'],
          ['Jump (Button)', 'กระโดด'],
          ['Sprint / Crouch (Button)', 'วิ่ง / ย่อ'],
          ['Interact (Button)', 'โต้ตอบ'],
          ['Attack / Fire (Button + hold)', 'โจมตีหรือยิง'],
          ['Aim / ADS (Button)', 'เล็ง'],
          ['Reload / Use item (Button)', 'รีโหลดหรือใช้ของ'],
          ['Ability / Skill (Button)', 'สกิล'],
          ['Pause / Menu (Button, UI map)', 'พัก / เมนู'],
          ['Charge / Hold-release (Button with started/canceled)', 'กดค้างแล้วปล่อย'],
          ['Context wheel / radial (Vector2 + button)', 'วงล้อบริบท']
        ]}
      ]
    },
    {
      n: '05', title: 'ผู้เล่น การเคลื่อนที่ ฟิสิกส์ / Player & Physics', subtitle: 'ตัวควบคุม คอลลิเดอร์ เลเยอร์ และการตรวจพื้น',
      level: 'ขั้นที่ 5 · การเคลื่อนที่', kind: 'essential',
      note: 'เลือกตัวเคลื่อนที่ให้ตรงมิติเกม และระบุว่าจะใช้แรง เวโลซิตี หรือ CharacterController เพื่อไม่ให้ AI ผสม AddForce กับ transform.position',
      fields: [
        { id: 'mover', label: 'Locomotion', labelTh: 'วิธีเคลื่อนที่', options: [
          ['CharacterController.Move with gravity and slope limit', 'CharacterController.Move พร้อมแรงโน้มถ่วง'],
          ['Rigidbody dynamic forces (AddForce)', 'Rigidbody แรงแบบไดนามิก'],
          ['Rigidbody velocity assignment in FixedUpdate', 'กำหนด velocity ใน FixedUpdate'],
          ['Rigidbody kinematic MovePosition / MoveRotation', 'Rigidbody kinematic'],
          ['Rigidbody2D dynamic', 'Rigidbody2D ไดนามิก'],
          ['Rigidbody2D kinematic for precise platforming', 'Rigidbody2D kinematic สำหรับแพลตฟอร์ม'],
          ['Transform-based with collision queries (no Rigidbody)', 'ขยับ Transform แล้วคิวรีการชน'],
          ['NavMeshAgent driven by player click or analog', 'NavMeshAgent ตามคลิกหรืออนาล็อก'],
          ['WheelCollider / custom vehicle controller', 'WheelCollider หรือยานพาหนะ'],
          ['CharacterController + root motion Animator', 'CharacterController คู่ root motion'],
          ['Fly / swim / zero-g controller', 'บิน ว่ายน้ำ หรือไร้แรงโน้มถ่วง']
        ]},
        { id: 'physicsQueries', label: 'Collision queries', labelTh: 'การตรวจชนและเรย์', multi: true, options: [
          ['SphereCast / CapsuleCast grounded check', 'ตรวจพื้นด้วย SphereCast หรือ CapsuleCast'],
          ['OverlapBox interact / attack volume', 'OverlapBox สำหรับโต้ตอบหรือโจมตี'],
          ['Raycast from camera to aim point', 'Raycast จากกล้องไปจุดเล็ง'],
          ['2D Raycast / CircleCast', 'Raycast2D / CircleCast'],
          ['Trigger volumes with OnTriggerEnter', 'Trigger OnTriggerEnter'],
          ['Collision matrix via Layers (not tag strings in hot path)', 'แมทริกซ์เลเยอร์ ไม่ใช้สตริงแท็กในลูปร้อน'],
          ['CompareTag only, never tag == "Player" string compare', 'ใช้ CompareTag เท่านั้น'],
          ['LayerMask serialized in Inspector', 'LayerMask ในอินสเปกเตอร์']
        ]},
        { id: 'cameraRig', label: 'Camera', labelTh: 'กล้อง', options: [
          ['Cinemachine 3 Third Person Follow', 'Cinemachine 3 ตามหลังบุคคลที่สาม'],
          ['Cinemachine 3 First Person PoV', 'Cinemachine 3 มุมหนึ่ง'],
          ['Cinemachine 2D Framing Transposer', 'Cinemachine 2D'],
          ['Cinemachine FreeLook / Orbital Follow', 'Cinemachine หมุนอิสระ'],
          ['Custom late-update follow with damping', 'กล้องตามแบบเขียนเอง LateUpdate'],
          ['Static orthographic camera', 'กล้องออร์โธคงที่'],
          ['Split-screen virtual cameras', 'กล้องแยกจอ'],
          ['Cinemachine Impulse for shake', 'สั่นกล้องด้วย Impulse']
        ]}
      ]
    },
    {
      n: '06', title: 'อนิเมชันและไทม์ไลน์ / Animation', subtitle: 'Animator, 2D, Timeline และแอนิเมชันตามโค้ด',
      level: 'ขั้นที่ 6 · ภาพเคลื่อนไหว', kind: 'visual',
      fields: [
        { id: 'animation', label: 'Animation system', labelTh: 'ระบบอนิเมชัน', options: [
          ['Animator Controller with parameters + Root Motion optional', 'Animator Controller'],
          ['Animator + Animation Events for hit frames', 'Animator และ Animation Event'],
          ['2D Animation (sprite skinning) + Animator', '2D Animation'],
          ['Sprite flip + sprite sheet / Sprite Library', 'พลิกสไปรต์และสไปรต์ชีต'],
          ['Timeline for cutscenes, signals to gameplay', 'Timeline คัตซีน'],
          ['Procedural AnimationCurve / lerp in code', 'อนิเมชันในโค้ดด้วย AnimationCurve'],
          ['Animation Rigging constraints at runtime', 'Animation Rigging'],
          ['No animation; use debug primitives and logs', 'ยังไม่มีอนิเมชัน ใช้รูปทรงและล็อก']
        ]},
        { id: 'animParams', label: 'Animator contracts', labelTh: 'พารามิเตอร์ Animator', multi: true, options: [
          ['Float Speed, Bool IsGrounded, Trigger Attack', 'Speed, IsGrounded, Attack'],
          ['Int WeaponIndex / Stance', 'ดัชนีอาวุธหรือท่า'],
          ['Bool IsCharging / IsDead / InHitstun', 'สถานะชาร์จ ตาย สตัน'],
          ['Use Animator.StringToHash cached ids', 'แคชแฮชชื่อพารามิเตอร์'],
          ['Never sample Animator in FixedUpdate unless required', 'ไม่สุ่มตัวอย่าง Animator ใน FixedUpdate ถ้าไม่จำเป็น']
        ]}
      ]
    },
    {
      n: '07', title: 'AI ศัตรูและการนำทาง / AI & Navigation', subtitle: 'NavMesh, Behavior, เซนเซอร์ และการไล่ล่า',
      level: 'ขั้นที่ 7 · AI', kind: 'advanced',
      note: 'ถ้าไอเดียไม่มีศัตรู ให้เลือก None ถ้ามี ให้ระบุเซนเซอร์และการตัดสินใจให้ชัด เพื่อไม่ให้ AI เขียน Update ที่ไล่ transform.position ตรงๆ',
      fields: [
        { id: 'aiBrain', label: 'AI brain', labelTh: 'สมอง AI', options: [
          ['No AI in this request', 'ไม่มี AI ในคำขอนี้'],
          ['Finite State Machine (Idle, Patrol, Chase, Attack, Stun, Dead)', 'FSM ศัตรูมาตรฐาน'],
          ['Unity Behavior graph assets', 'Unity Behavior'],
          ['Utility AI scored actions', 'Utility AI'],
          ['Sensor-driven investigate (sound / sight / memory)', 'สืบสวนจากเซนเซอร์'],
          ['NavMeshAgent + steering override', 'NavMeshAgent'],
          ['2D grid / A* pathfinding', 'กริด 2D หรือ A*'],
          ['Group AI / influence map (keep simple)', 'AI กลุ่มแบบง่าย']
        ]},
        { id: 'aiSensors', label: 'Sensors', labelTh: 'เซนเซอร์', multi: true, options: [
          ['FOV cone + occlusion raycast', 'กรวยสายตาและเรย์บัง'],
          ['Hearing radius with noise events', 'รัศมีได้ยินจากอีเวนต์เสียง'],
          ['Proximity trigger aggro', 'เข้าใกล้แล้วโกรธ'],
          ['Last-known position memory with timeout', 'จำตำแหน่งล่าสุดแล้วหมดเวลา'],
          ['Light / flashlight detection', 'ตรวจจับแสงไฟฉาย'],
          ['Line of sight 2D', 'สายตาใน 2D']
        ]}
      ]
    },
    {
      n: '08', title: 'เกมเพลย์ระบบย่อย / Gameplay Systems', subtitle: 'ต่อสู้ สุขภาพ ของโต้ตอบ ช่องเก็บของ และเควส',
      level: 'ขั้นที่ 8 · ระบบเกม', kind: 'visual',
      fields: [
        { id: 'combat', label: 'Combat / interaction', labelTh: 'การต่อสู้และการโต้ตอบ', multi: true, options: [
          ['No combat; exploration / puzzle only', 'ไม่มีการต่อสู้'],
          ['Hitscan firearms', 'ยิงแบบฮิตสแกน'],
          ['Projectile with pooling', 'โพรเจกไทล์พร้อมพูล'],
          ['Melee hitbox windows', 'ฮิตบ็อกซ์ระยะประชิด'],
          ['Charge-and-release mechanic', 'กดชาร์จแล้วปล่อย'],
          ['Stealth takedown', 'ลอบทำร้าย'],
          ['IInteractable prompt + hold to use', 'โต้ตอบแบบกดค้าง'],
          ['Inventory + usable items', 'ช่องเก็บของและไอเท็ม'],
          ['Crafting recipes via ScriptableObjects', 'คราฟต์ด้วย ScriptableObject'],
          ['Health, i-frames, knockback', 'เลือด ไอเฟรม กระเด็น'],
          ['Stamina / energy resource', 'สตามินาหรือพลังงาน'],
          ['Status effects (burn, stun, slow) with timers', 'สถานะผิดปกติพร้อมตัวจับเวลา'],
          ['Save checkpoints / respawn', 'จุดเซฟและเกิดใหม่'],
          ['Dialogue / branching choices', 'บทสนทนาแยกสาย'],
          ['Quest flags / objectives', 'ธงเควสและเป้าหมาย'],
          ['Day-night or time-of-day clock', 'นาฬิกาวัน-คืน'],
          ['Build / place objects with validation', 'วางของพร้อมตรวจว่าวางได้'],
          ['Economy / currency', 'เงินในเกม']
        ]},
        { id: 'uiSystem', label: 'UI', labelTh: 'อินเทอร์เฟซ', options: [
          ['uGUI Canvas + TextMeshPro', 'uGUI และ TextMeshPro'],
          ['UI Toolkit runtime (UXML / USS)', 'UI Toolkit'],
          ['Hybrid: UITK menus + world-space uGUI', 'ผสม UITK กับ uGUI ในโลก'],
          ['World-space interact prompts only', 'พรอมต์ในโลกเท่านั้น'],
          ['No UI yet; debug OnGUI forbidden — use Debug.Log + Gizmos', 'ยังไม่มี UI ใช้ล็อกและกิซโม']
        ]},
        { id: 'hud', label: 'HUD pieces', labelTh: 'ชิ้นส่วน HUD', multi: true, options: [
          ['Health / resource bars', 'แถบเลือดหรือทรัพยากร'],
          ['Ammo / charge meter', 'กระสุนหรือมิเตอร์ชาร์จ'],
          ['Interact prompt', 'ข้อความโต้ตอบ'],
          ['Minimap / compass', 'มินิแมปหรือเข็มทิศ'],
          ['Quest tracker', 'ติดตามเควส'],
          ['Pause menu with resume/quit', 'เมนูพัก'],
          ['Settings: volume, sensitivity, rebind', 'ตั้งค่าเสียง ความไว ปุ่ม'],
          ['Damage numbers / floating text', 'ตัวเลขดาเมจ']
        ]}
      ]
    },
    {
      n: '09', title: 'เสียง ภาพ และฟีดแบ็ก / Audio & Feedback', subtitle: 'มิกเซอร์ อนุภาค แสง และแฮปติก',
      level: 'ขั้นที่ 9 · ฟีดแบ็ก', kind: 'performance',
      fields: [
        { id: 'audio', label: 'Audio', labelTh: 'เสียง', multi: true, options: [
          ['AudioMixer groups (Master/SFX/Music/UI)', 'AudioMixer แยกกลุ่ม'],
          ['3D spatial AudioSource', 'เสียงเชิงพื้นที่ 3D'],
          ['2D UI one-shots', 'เสียง UI แบบ 2D'],
          ['ScriptableObject audio cues', 'คิวเสียงแบบ ScriptableObject'],
          ['Dynamic music layers / snapshots', 'เพลงเลเยอร์หรือสแนปชอต'],
          ['Footstep surface detection', 'เสียงฝีเท้าตามพื้นผิว'],
          ['No audio assets; expose AudioClip fields only', 'ยังไม่มีไฟล์เสียง เปิดช่อง AudioClip ไว้']
        ]},
        { id: 'feedback', label: 'Juice / VFX', labelTh: 'ฟีดแบ็กภาพ', multi: true, options: [
          ['ParticleSystem pooled bursts', 'อนุภาคแบบพูล'],
          ['VFX Graph for hero effects only', 'VFX Graph สำหรับเอฟเฟกต์เด่น'],
          ['Cinemachine Impulse shake', 'สั่นกล้อง'],
          ['Gamepad rumble (DualMotorRumble)', 'สั่นเกมแพด'],
          ['Hit-stop / time scale punch', 'ฮิตสต็อป'],
          ['URP light intensity flicker', 'กระพริบไฟ URP'],
          ['Post-processing volume weight tween (URP Volume)', 'ปรับน้ำหนัก Volume'],
          ['Sprite / material flash on hit', 'วับเมื่อโดน']
        ]}
      ]
    },
    {
      n: '10', title: 'ข้อมูล เซฟ และซีน / Data, Save, Scenes', subtitle: 'ScriptableObject, การเซฟ และการโหลดซีน',
      level: 'ขั้นที่ 10 · ข้อมูล', kind: 'advanced',
      fields: [
        { id: 'data', label: 'Data authoring', labelTh: 'การใส่ข้อมูล', multi: true, options: [
          ['ScriptableObject definitions for items/stats/enemies', 'นิยามไอเท็ม สเตต ศัตรูด้วย SO'],
          ['Serialized inspector tuning, no magic numbers', 'จูนในอินสเปกเตอร์ ห้ามเลขลอยในโค้ด'],
          ['Addressables for streamed content', 'Addressables'],
          ['JSON save via Newtonsoft or Unity JsonUtility', 'เซฟ JSON'],
          ['BinaryFormatter forbidden; use Json/MessagePack-style simple DTO', 'ห้าม BinaryFormatter'],
          ['PlayerPrefs only for settings, never core save', 'PlayerPrefs เฉพาะตั้งค่า'],
          ['DontDestroyOnLoad run state', 'สถานะรันข้ามซีน'],
          ['SceneManager additive loading', 'โหลดซีนแบบ additive']
        ]},
        { id: 'scenes', label: 'Scene strategy', labelTh: 'กลยุทธ์ซีน', options: [
          ['Single demo scene with named hierarchy', 'ซีนเดโมซีนเดียว'],
          ['Boot → MainMenu → Gameplay', 'บูต เมนู แล้วเข้าเกม'],
          ['Persistent managers scene + additive levels', 'ซีนตัวจัดการถาวร + ด่าน additive'],
          ['Addressable scenes', 'ซีนแบบ Addressable']
        ]}
      ]
    },
    {
      n: '11', title: 'ประสิทธิภาพ แพลตฟอร์ม มัลติเพลย์ / Performance & Platform', subtitle: 'GC, พูล, จ็อบ, เป้าหมายเครื่อง และเน็ตโค้ด',
      level: 'ขั้นที่ 11 · ประสิทธิภาพ', kind: 'advanced',
      fields: [
        { id: 'performance', label: 'Performance rules', labelTh: 'กฎประสิทธิภาพ', multi: true, options: [
          ['Cache GetComponent; never in Update', 'แคช GetComponent'],
          ['No allocations in Update/FixedUpdate (no new, no LINQ, no string concat)', 'ห้ามจัดสรรหน่วยความจำในลูปร้อน'],
          ['Use UnityEngine.Pool and List.Clear reuse', 'ใช้พูลและลิสต์ซ้ำ'],
          ['Logic in FixedUpdate for physics, input read in Update', 'ฟิสิกส์ใน FixedUpdate อินพุตใน Update'],
          ['Jobs + Burst for heavy queries only', 'Jobs และ Burst เมื่อคิวรีหนัก'],
          ['ECS for many identical agents', 'ECS เมื่อเอเจนต์ซ้ำจำนวนมาก'],
          ['GPU Resident Drawer friendly (do not break SRP Batcher)', 'เข้ากับ GPU Resident Drawer'],
          ['Mobile: 30–60 FPS budget, reduce overdraw', 'มือถืองบ 30–60 เฟรม']
        ]},
        { id: 'platform', label: 'Target platform', labelTh: 'แพลตฟอร์มเป้าหมาย', multi: true, options: [
          ['Windows standalone', 'วินโดวส์'],
          ['macOS standalone', 'แมค'],
          ['Android', 'แอนดรอยด์'],
          ['iOS', 'ไอโอเอส'],
          ['WebGL (no threading / limited plugins)', 'WebGL'],
          ['PlayStation / Xbox / Switch (keep platform #if ready, no proprietary SDK code)', 'คอนโซล เตรียม #if ไม่ใส่ SDK เฉพาะ'],
          ['Editor play-mode only for this task', 'แค่ Play Mode ในเอดิเตอร์']
        ]},
        { id: 'multiplayer', label: 'Multiplayer', labelTh: 'มัลติเพลย์เยอร์', options: [
          ['Single-player only', 'ผู้เล่นคนเดียว'],
          ['Local split-screen / shared hotseat', 'แยกจอหรือสลับคน'],
          ['Netcode for GameObjects client-hosted', 'NGO โฮสต์ที่ไคลเอนต์'],
          ['Netcode dedicated server topology (high level only)', 'เซิร์ฟเวอร์แยก ระดับภาพรวม'],
          ['Do not add networking', 'ห้ามใส่ระบบเน็ต']
        ]}
      ]
    },
    {
      n: '12', title: 'คุณภาพโค้ด ข้อห้าม วิธีติดตั้ง / Quality, Forbidden, Setup', subtitle: 'สิ่งที่ต้องส่งกลับ วิธีแปะสคริปต์ และ API ที่ห้ามใช้',
      level: 'ขั้นที่ 12 · ผลลัพธ์', kind: 'essential',
      note: 'หมวดนี้ไปอยู่ใน Output Format ของ Prompt โดยตรง รวมขั้นตอนแปะบน GameObject ให้ AI เขียนเป็นข้อๆ',
      fields: [
        { id: 'codeQuality', label: 'Code quality', labelTh: 'คุณภาพโค้ด', multi: true, options: [
          ['XML doc summaries on public types/methods', 'XML doc บนชนิดและเมธอดสาธารณะ'],
          ['Thai + English comments on non-obvious logic', 'คอมเมนต์ไทยและอังกฤษในจุดที่ไม่ชัด'],
          ['English-only comments', 'คอมเมนต์ภาษาอังกฤษเท่านั้น'],
          ['SerializeField private fields; no public gameplay fields', 'SerializeField ส่วนตัว ห้าม public สำหรับเกมเพลย์'],
          ['Null-safe references; Guard clauses', 'กัน null และใช้ guard'],
          ['RequireComponent / DisallowMultipleComponent where needed', 'RequireComponent เมื่อจำเป็น'],
          ['Editor gizmos for radii, FOV, ground check', 'กิซโมในเอดิเตอร์'],
          ['#if UNITY_EDITOR debug draws', 'วาดดีบักเฉพาะเอดิเตอร์'],
          ['Unit-testable pure logic separated from MonoBehaviour', 'แยกโลจิกบริสุทธิ์เพื่อเทส'],
          ['No empty lifecycle methods', 'ห้ามเมธอดวงจรชีวิตว่าง']
        ]},
        { id: 'forbidden', label: 'Forbidden', labelTh: 'สิ่งที่ห้าม', multi: true, options: [
          ['FindObjectOfType / FindObjectsOfType (deprecated)', 'ห้าม FindObjectOfType'],
          ['GameObject.Find or FindWithTag inside Update', 'ห้าม Find ใน Update'],
          ['OnGUI for gameplay HUD', 'ห้าม OnGUI สำหรับ HUD'],
          ['Resources.Load as the only loading strategy', 'ห้ามพึ่ง Resources.Load อย่างเดียว'],
          ['BinaryFormatter / insecure serialization', 'ห้าม BinaryFormatter'],
          ['coroutines that never stop / while(true) without yield', 'ห้ามคอร์รูทีนไม่จบ'],
          ['Hardcoded KeyCode if New Input System is selected', 'ห้าม KeyCode ถ้าเลือก Input ใหม่'],
          ['Third-party paid assets unless listed', 'ห้ามแอสเซทเสียเงินที่ไม่ได้ระบุ'],
          ['Fake placeholder APIs that do not exist in Unity 6000.5.4f1', 'ห้ามสมมติ API ที่ไม่มีในเวอร์ชันนี้']
        ]},
        { id: 'deliverables', label: 'Deliverables', labelTh: 'สิ่งที่ต้องส่ง', multi: true, options: [
          ['Complete C# scripts, copy-paste ready', 'สคริปต์ C# พร้อมวาง'],
          ['Exact GameObject hierarchy and rename list', 'ลำดับ GameObject และชื่อ'],
          ['Inspector wiring table (field → drag target)', 'ตารางลากฟิลด์ในอินสเปกเตอร์'],
          ['Input Actions asset setup steps', 'ขั้นตอนสร้าง Input Actions'],
          ['Layer / Tag / Physics matrix steps', 'ขั้นตอนเลเยอร์ แท็ก แมทริกซ์ฟิสิกส์'],
          ['Prefab creation steps', 'ขั้นตอนสร้างพรีแฟบ'],
          ['Play Mode test checklist', 'เช็กลิสต์ทดสอบ Play Mode'],
          ['Common mistakes and how to fix them', 'ข้อผิดพลาดที่พบบ่อย'],
          ['Optional: sample values for Inspector', 'ค่าตัวอย่างในอินสเปกเตอร์']
        ]}
      ]
    }
  ]
};

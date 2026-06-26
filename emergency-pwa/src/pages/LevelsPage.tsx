import PageHeader from '../components/PageHeader'

const LEVELS = [
  {
    emoji: '🟢', label: 'ระดับเบา', sub: 'ดูอาการที่บ้าน',
    bg: 'bg-safe-bg', border: 'border-green-200', title: 'text-safe',
    items: [
      'ไข้ต่ำ (37.5–38.4°C) / เจ็บคอ / น้ำมูก / ไอแห้ง / เมื่อยตัวเล็กน้อย',
      'ทาน Paracetamol 500 mg ทุก 4–6 ชม. (ไม่เกิน 4 เม็ด/วัน)',
      'ดื่มน้ำอย่างน้อย 8 แก้ว/วัน นอนพักผ่อน',
      'ประเมินอาการซ้ำทุก 4–8 ชม.',
      'หากอาการไม่ดีขึ้นใน 24 ชม. ให้แจ้งผู้ดูแล',
    ],
    itemColor: 'text-green-800',
  },
  {
    emoji: '🟡', label: 'ระดับปานกลาง', sub: 'พบแพทย์ภายใน 2–4 ชม.',
    bg: 'bg-warn-bg', border: 'border-yellow-200', title: 'text-warn',
    items: [
      'ไข้สูง (38.5–39.4°C) / เวียนศีรษะ หน้ามืด / ปวดศีรษะมาก',
      'อาเจียน / ท้องเสียบ่อยครั้ง / อ่อนเพลียชัดเจน',
      'หกล้ม เจ็บปวดมาก บวม แต่ยังขยับได้',
      'โทรแจ้งผู้ดูแล — เตรียมยาประจำตัว + รายการยาที่แพ้',
      'รอรับส่ง อย่าขับรถเอง ประเมินอาการทุก 1–2 ชม.',
      'หากแย่ลงกะทันหัน → โทร 1669 ทันที',
    ],
    itemColor: 'text-yellow-800',
  },
  {
    emoji: '🔴', label: 'ระดับวิกฤต', sub: 'โทร 1669 ทันที',
    bg: 'bg-danger-bg', border: 'border-red-200', title: 'text-danger',
    items: [
      'หมดสติ / ไม่ตอบสนอง / หยุดหายใจ / ชักเกร็ง',
      'เจ็บแน่นหน้าอก / หอบเหนื่อยรุนแรง / ริมฝีปากเขียว',
      'อาการ Stroke (BE-FAST เป็นบวก)',
      'ไข้สูงมาก >39.5°C / เลือดออกมาก / กระดูกหักชัดเจน',
      'ห้ามให้น้ำหรืออาหาร ห้ามเคลื่อนย้ายโดยไม่จำเป็น',
      'จัดท่า Recovery Position หรือเริ่ม CPR',
    ],
    itemColor: 'text-red-800',
  },
]

export default function LevelsPage() {
  return (
    <div>
      <PageHeader title="ระดับความรุนแรง" subtitle="อาการและสิ่งที่ต้องทำในแต่ละระดับ" />
      <div className="p-4 space-y-4">
        {LEVELS.map((lv, i) => (
          <div key={i} className={`${lv.bg} border ${lv.border} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{lv.emoji}</span>
              <div>
                <p className={`font-bold text-sm ${lv.title}`}>{lv.label}</p>
                <p className={`text-xs ${lv.title} opacity-70`}>{lv.sub}</p>
              </div>
              {i === 2 && (
                <a href="tel:1669" className="ml-auto bg-danger text-white text-xs font-bold px-3 py-1.5 rounded-lg">โทร 1669</a>
              )}
            </div>
            <ul className="space-y-1.5">
              {lv.items.map((item, j) => (
                <li key={j} className={`text-xs ${lv.itemColor} flex gap-2`}>
                  <span className="shrink-0 opacity-60">→</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

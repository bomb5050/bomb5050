// CprPage.tsx
import PageHeader from '../components/PageHeader'

const STEPS = [
  { num: '!', title: 'โทร 1669 ทันที', detail: 'แจ้งชื่อ ที่อยู่ อาการ — วางสายลำโพงไว้ ผู้รับสายจะแนะนำตลอด', alert: true },
  { num: '1', title: 'Check — ตรวจสอบ', detail: 'ปลุกเรียกชื่อ ตบไหล่เบาๆ — ไม่ตอบสนอง? เช็กการหายใจ 10 วินาที', alert: false },
  { num: '2', title: 'Position — จัดท่า', detail: 'วางผู้ป่วยนอนหงายบนพื้นแข็ง เปิดทางเดินหายใจ (เงยหน้าขึ้น ยกคาง)', alert: false },
  { num: '3', title: 'Compress — กดหน้าอก', detail: 'วางสันมือสองข้อนตรงกลางหน้าอก กดลึก 5–6 ซม. เร็ว 100–120 ครั้ง/นาที ไม่หยุด', alert: false },
  { num: '4', title: 'Recovery Position (หากหายใจได้)', detail: 'จัดท่าตะแคง — งอเข่าข้างบน วางมือรองใต้แก้ม ป้องกันสำลัก', alert: false },
  { num: '5', title: 'รอรถพยาบาล', detail: 'ห้ามให้น้ำหรืออาหาร ห้ามเคลื่อนย้ายหากสงสัยกระดูกสันหลังบาดเจ็บ ทำ CPR ต่อจนทีมมาถึง', alert: false },
]

export default function CprPage() {
  return (
    <div>
      <PageHeader title="CPR ฉุกเฉิน" subtitle="ใช้เมื่อผู้ป่วยหมดสติ ไม่หายใจ หรือหายใจผิดปกติ" />
      <div className="p-4 space-y-3">
        <div className="bg-danger-bg border border-red-200 rounded-xl p-3">
          <p className="text-xs text-danger leading-relaxed">
            <strong>โทร 1669 ก่อนเสมอ</strong> — ผู้รับสายจะแนะนำทุกขั้นตอน คุณไม่ต้องทำคนเดียว
          </p>
        </div>
        {STEPS.map((s, i) => (
          <div key={i} className="card border border-gray-100 p-4 flex gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5 ${s.alert ? 'bg-danger' : 'bg-navy'}`}>
              {s.num}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

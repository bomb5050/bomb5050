import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const ITEMS = [
  { letter: 'S', full: 'Symptoms — อาการ', q: 'อาการหลักคืออะไร? เริ่มเมื่อไร? รุนแรงขึ้นหรือเบาลง? มีอาการอื่นร่วมด้วยไหม?' },
  { letter: 'A', full: 'Allergies — ยาที่แพ้', q: 'แพ้ยาอะไรบ้าง? มีอาการแพ้อย่างไร? (บวม / ผื่น / หายใจไม่ออก)' },
  { letter: 'M', full: 'Medications — ยาที่ทานอยู่', q: 'ทานยาอะไรบ้าง? ขนาดยา? ทานครั้งล่าสุดเมื่อไร?' },
  { letter: 'P', full: 'Past history — ประวัติโรค', q: 'มีโรคประจำตัวอะไรบ้าง? เคยผ่าตัดไหม? นอนโรงพยาบาลครั้งล่าสุดเมื่อไร?' },
  { letter: 'L', full: 'Last meal — มื้ออาหารล่าสุด', q: 'กินอาหารหรือดื่มน้ำล่าสุดเมื่อไร? กินอะไร? มีสิ่งผิดปกติไหม?' },
  { letter: 'E', full: 'Events — เหตุการณ์ก่อนหน้า', q: 'ทำอะไรอยู่ก่อนเกิดอาการ? ล้ม? ออกกำลังกาย? มีสิ่งกระตุ้น?' },
]

export default function SamplePage() {
  const [ts, setTs] = useState('')

  const stamp = () => {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const d = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })
    setTs(`${h}:${m} น. (${d})`)
  }

  return (
    <div>
      <PageHeader title="บันทึกอาการ SAMPLE" subtitle="ข้อมูลสำหรับแจ้งแพทย์ฉุกเฉิน" />
      <div className="p-4 space-y-4">
        {/* Timestamp */}
        <div className="bg-info-bg border border-blue-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-info mb-1">⏱ เวลาเริ่มอาการ</p>
          <div className="text-3xl font-black text-navy my-1">{ts || '-- : --'}</div>
          <p className="text-xs text-info/70 mb-3">บอกเวลานี้กับแพทย์ฉุกเฉินเมื่อมาถึง สำคัญมากสำหรับ Stroke และหัวใจ</p>
          <button onClick={stamp} className="bg-info text-white text-sm font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform">
            ⏱ บันทึกเวลาตอนนี้
          </button>
        </div>

        {/* SAMPLE */}
        <div className="space-y-3">
          {ITEMS.map((item) => (
            <div key={item.letter} className="card border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <div className="bg-navy text-white font-black text-lg w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                  {item.letter}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.full}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.q}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

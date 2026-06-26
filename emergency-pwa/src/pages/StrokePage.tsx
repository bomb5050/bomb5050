import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const CARDS = [
  { letter: 'B', title: 'Balance', desc: 'ทรงตัวไม่ได้ / เดินเซ / เวียนศีรษะกะทันหัน' },
  { letter: 'E', title: 'Eyes', desc: 'ตามัวกะทันหัน / มองเห็นภาพซ้อน / สูญเสียการมองเห็น' },
  { letter: 'F', title: 'Face', desc: 'ขอให้ยิ้ม — ปากเบี้ยวข้างใดข้างหนึ่ง?' },
  { letter: 'A', title: 'Arms', desc: 'ยกแขน 2 ข้างค้างไว้ — แขนข้างใดข้างหนึ่งตกลง?' },
  { letter: 'S', title: 'Speech', desc: 'พูด "ฉันไม่เจ็บปวด" — ผิดปกติ / ลำบากไหม?' },
  { letter: 'T', title: 'Time', desc: 'บันทึกเวลาเริ่มอาการทันที — ทุกนาทีมีความสำคัญ!' },
]

export default function StrokePage() {
  const [active, setActive] = useState<Set<number>>(new Set())
  const [timestamp, setTimestamp] = useState('')

  const toggle = (i: number) =>
    setActive(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  const stamp = () => {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const d = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
    setTimestamp(`${h}:${m} น. (${d})`)
  }

  const hasSymptom = active.size > 0

  return (
    <div>
      <PageHeader title="เช็กเส้นเลือดสมอง" subtitle="BE-FAST — มาตรฐาน AHA สำหรับ Stroke" />
      <div className="p-4 space-y-4">
        {/* Info */}
        <div className="bg-info-bg border border-blue-200 rounded-xl p-3">
          <p className="text-xs text-info leading-relaxed">
            หากพบอาการใดอาการหนึ่ง → <strong>โทร 1669 ทันที</strong> และบันทึกเวลาเริ่มอาการ
            ยาละลายลิ่มเลือดได้ผลเฉพาะใน <strong>4.5 ชั่วโมงแรก</strong>
          </p>
        </div>

        {/* Alert */}
        {hasSymptom && (
          <div className="bg-danger-bg border border-red-300 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-danger font-bold text-sm">ตรวจพบสัญญาณ Stroke</p>
              <p className="text-danger/80 text-xs">โทร 1669 ทันที และบันทึกเวลาเริ่มอาการ</p>
            </div>
            <a href="tel:1669" className="bg-danger text-white font-bold text-sm px-3 py-2 rounded-lg shrink-0">โทร</a>
          </div>
        )}

        {/* FAST Cards */}
        <div className="grid grid-cols-2 gap-3">
          {CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`card border text-left p-4 active:scale-95 transition-all ${active.has(i) ? 'border-danger bg-danger-bg' : 'border-gray-100'}`}
            >
              <div className={`text-2xl font-black mb-1 ${active.has(i) ? 'text-danger' : 'text-navy'}`}>{c.letter}</div>
              <div className="text-sm font-semibold text-gray-800">{c.title}</div>
              <div className="text-xs text-gray-500 mt-1 leading-snug">{c.desc}</div>
              {active.has(i) && <div className="text-xs font-bold text-danger mt-2">✓ พบอาการ</div>}
            </button>
          ))}
        </div>

        {/* Timestamp */}
        <div className="bg-info-bg border border-blue-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-info mb-2">⏱ เวลาเริ่มอาการ</p>
          <div className="text-2xl font-black text-navy mb-2">{timestamp || '-- : --'}</div>
          <p className="text-xs text-info/70 mb-3">บันทึกเวลานี้ให้แพทย์ฉุกเฉินเมื่อมาถึง</p>
          <button onClick={stamp} className="bg-info text-white text-sm font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform">
            ⏱ บันทึกเวลาตอนนี้
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">แตะที่การ์ดใดที่พบอาการ</p>
      </div>
    </div>
  )
}

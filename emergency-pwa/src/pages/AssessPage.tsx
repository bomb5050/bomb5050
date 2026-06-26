import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const QUESTIONS = [
  { text: 'หมดสติ / ไม่ตอบสนอง / หยุดหายใจ', hint: '🔴 วิกฤต — โทร 1669 + เริ่ม CPR ทันที', weight: 3, critical: true },
  { text: 'เจ็บแน่นหน้าอก / ปวดร้าวไปแขนซ้ายหรือกราม', hint: '🔴 สงสัยหัวใจ — โทร 1669 ทันที', weight: 3, critical: true },
  { text: 'พูดไม่ออก / ปากเบี้ยว / แขนขาอ่อนแรงข้างเดียว', hint: '🔴 สงสัย Stroke — บันทึกเวลา + โทร 1669', weight: 3, critical: true },
  { text: 'หายใจลำบาก / หอบเหนื่อยรุนแรง / ริมฝีปากเขียว', hint: '', weight: 2, critical: false },
  { text: 'หกล้ม / หัวกระแทก / สงสัยกระดูกหัก / เลือดออกมาก', hint: '', weight: 2, critical: false },
  { text: 'ไข้สูงเกิน 39°C / ชักเกร็ง / สับสนผิดปกติ', hint: '', weight: 2, critical: false },
  { text: 'ปวดศีรษะรุนแรง / เวียนศีรษะ / คลื่นไส้อาเจียน', hint: '', weight: 1, critical: false },
  { text: 'ไข้ 37.5–38.9°C / ปวดเมื่อยตัว / อ่อนเพลีย', hint: '', weight: 1, critical: false },
]

type Ans = 'Y' | 'N' | null

export default function AssessPage() {
  const [answers, setAnswers] = useState<Ans[]>(Array(QUESTIONS.length).fill(null))

  const setAns = (i: number, v: Ans) =>
    setAnswers(a => { const n = [...a]; n[i] = v; return n })

  const answered = answers.filter(a => a !== null).length
  const score = QUESTIONS.reduce((s, q, i) => s + (answers[i] === 'Y' ? q.weight : 0), 0)
  const isVital = score >= 3
  const isMid = score >= 1 && score < 3
  const isLow = score === 0 && answered >= 3

  return (
    <div>
      <PageHeader title="ประเมินอาการ" subtitle="ตอบคำถามเพื่อประเมินระดับความรุนแรง" />

      <div className="p-4 space-y-3">
        {/* Alert if critical */}
        {isVital && (
          <div className="bg-danger-bg border border-red-300 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div className="flex-1">
              <p className="text-danger font-bold text-sm">ตรวจพบอาการวิกฤต</p>
              <p className="text-danger/80 text-xs mt-0.5">โทร 1669 ทันที อย่ารอ</p>
            </div>
            <a href="tel:1669" className="bg-danger text-white font-bold text-sm px-4 py-2 rounded-lg shrink-0">
              โทรเลย
            </a>
          </div>
        )}

        {QUESTIONS.map((q, i) => (
          <div key={i} className={`card p-3 flex items-start gap-3 ${q.critical ? 'border-l-4 border-l-danger' : 'border border-gray-100'}`}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 leading-snug">{q.text}</p>
              {q.hint && <p className="text-xs text-danger mt-1">{q.hint}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setAns(i, answers[i] === 'Y' ? null : 'Y')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${answers[i] === 'Y' ? 'bg-danger text-white border-danger' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
              >ใช่</button>
              <button
                onClick={() => setAns(i, answers[i] === 'N' ? null : 'N')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${answers[i] === 'N' ? 'bg-info text-white border-info' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
              >ไม่</button>
            </div>
          </div>
        ))}

        {/* Result */}
        <div className="card border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-3">ผลการประเมิน</p>
          <div className="grid grid-cols-3 gap-2">
            <div className={`rounded-lg p-3 text-center border transition-opacity ${isLow ? 'bg-safe-bg border-green-300 opacity-100' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
              <div className="text-lg">🟢</div>
              <p className={`text-xs font-bold mt-1 ${isLow ? 'text-safe' : 'text-gray-400'}`}>เบา</p>
              <p className={`text-xs mt-0.5 ${isLow ? 'text-safe/70' : 'text-gray-300'}`}>ดูอาการที่บ้าน</p>
            </div>
            <div className={`rounded-lg p-3 text-center border transition-opacity ${isMid ? 'bg-warn-bg border-yellow-300 opacity-100' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
              <div className="text-lg">🟡</div>
              <p className={`text-xs font-bold mt-1 ${isMid ? 'text-warn' : 'text-gray-400'}`}>ปานกลาง</p>
              <p className={`text-xs mt-0.5 ${isMid ? 'text-warn/70' : 'text-gray-300'}`}>พบแพทย์ 2–4 ชม.</p>
            </div>
            <div className={`rounded-lg p-3 text-center border transition-opacity ${isVital ? 'bg-danger-bg border-red-300 opacity-100' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
              <div className="text-lg">🔴</div>
              <p className={`text-xs font-bold mt-1 ${isVital ? 'text-danger' : 'text-gray-400'}`}>วิกฤต</p>
              <p className={`text-xs mt-0.5 ${isVital ? 'text-danger/70' : 'text-gray-300'}`}>โทร 1669 ทันที</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

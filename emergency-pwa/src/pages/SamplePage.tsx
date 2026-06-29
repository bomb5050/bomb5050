import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { loadProfile } from '../lib/storage'

const LOG_KEY = 'ep_sample_log'

const ITEMS = [
  {
    letter: 'S', full: 'Symptoms — อาการ',
    q: 'อาการหลักคืออะไร? เริ่มเมื่อไร? รุนแรงขึ้นหรือเบาลง?',
    placeholder: 'เช่น ปวดศีรษะรุนแรงมาก 2 ชม. ก่อน เริ่มจากขมับซ้าย...',
    prefillKey: null as null | string,
  },
  {
    letter: 'A', full: 'Allergies — ยาที่แพ้',
    q: 'แพ้ยาอะไรบ้าง? มีอาการแพ้อย่างไร?',
    placeholder: 'เช่น แพ้ Penicillin — มีผื่นขึ้นทั่วตัว',
    prefillKey: 'allergy',
  },
  {
    letter: 'M', full: 'Medications — ยาที่ทานอยู่',
    q: 'ทานยาอะไรบ้าง? ขนาดยา? ทานครั้งล่าสุดเมื่อไร?',
    placeholder: 'เช่น Metformin 500mg เช้า-เย็น ทานล่าสุด 7 โมงเช้า',
    prefillKey: 'medications',
  },
  {
    letter: 'P', full: 'Past history — ประวัติโรค',
    q: 'มีโรคประจำตัวอะไรบ้าง? เคยผ่าตัดไหม?',
    placeholder: 'เช่น เบาหวาน ความดัน มา 10 ปี เคยผ่าตัดไส้ติ่งปี 2558',
    prefillKey: 'disease',
  },
  {
    letter: 'L', full: 'Last meal — มื้ออาหารล่าสุด',
    q: 'กินอาหารหรือดื่มน้ำล่าสุดเมื่อไร? กินอะไร?',
    placeholder: 'เช่น กินข้าวต้มเมื่อ 2 ชม.ก่อน ดื่มน้ำเปล่า',
    prefillKey: null,
  },
  {
    letter: 'E', full: 'Events — เหตุการณ์ก่อนหน้า',
    q: 'ทำอะไรอยู่ก่อนเกิดอาการ? ล้ม? มีสิ่งกระตุ้น?',
    placeholder: 'เช่น กำลังนั่งดูทีวี แล้วรู้สึกเวียนหัวกะทันหัน...',
    prefillKey: null,
  },
]

interface LogData {
  ts: string
  answers: Record<string, string>
  savedAt: string
}

function loadLog(): LogData | null {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export default function SamplePage() {
  const profile = loadProfile()
  const [ts, setTs] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [lastLog, setLastLog] = useState<LogData | null>(null)

  useEffect(() => {
    const existing = loadLog()
    if (existing) {
      setLastLog(existing)
      if (existing.ts) setTs(existing.ts)
      if (existing.answers) setAnswers(existing.answers)
    } else if (profile) {
      const prefilled: Record<string, string> = {}
      ITEMS.forEach(item => {
        if (item.prefillKey && profile[item.prefillKey as keyof typeof profile]) {
          prefilled[item.letter] = profile[item.prefillKey as keyof typeof profile] as string
        }
      })
      setAnswers(prefilled)
    }
  }, [])

  const stamp = () => {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const d = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })
    setTs(`${h}:${m} น. (${d})`)
    setSaved(false)
  }

  const setAns = (letter: string, val: string) => {
    setAnswers(a => ({ ...a, [letter]: val }))
    setSaved(false)
  }

  const saveLog = () => {
    const log: LogData = {
      ts,
      answers,
      savedAt: new Date().toLocaleString('th-TH'),
    }
    localStorage.setItem(LOG_KEY, JSON.stringify(log))
    setLastLog(log)
    setSaved(true)
  }

  const clearLog = () => {
    if (!confirm('ล้างข้อมูลบันทึกนี้และเริ่มใหม่?')) return
    localStorage.removeItem(LOG_KEY)
    setTs('')
    setSaved(false)
    setShowLog(false)
    setLastLog(null)
    if (profile) {
      const prefilled: Record<string, string> = {}
      ITEMS.forEach(item => {
        if (item.prefillKey && profile[item.prefillKey as keyof typeof profile]) {
          prefilled[item.letter] = profile[item.prefillKey as keyof typeof profile] as string
        }
      })
      setAnswers(prefilled)
    } else {
      setAnswers({})
    }
  }

  const copyText = () => {
    const lines = [
      `📋 SAMPLE Log — ${lastLog?.savedAt || new Date().toLocaleString('th-TH')}`,
      `⏱ เวลาเริ่มอาการ: ${ts || 'ไม่ได้บันทึก'}`,
      '',
      ...ITEMS.map(item =>
        `[${item.letter}] ${item.full}\n${answers[item.letter] || '(ไม่ได้กรอก)'}`
      ),
      '',
      `ชื่อผู้ป่วย: ${profile?.elderName || '-'}`,
      `โรงพยาบาล: ${profile?.hospital || '-'}`,
    ].join('\n')

    navigator.clipboard?.writeText(lines)
      .then(() => alert('คัดลอกข้อความแล้ว — วางใน Line ได้เลย'))
      .catch(() => alert('ไม่สามารถคัดลอกได้ กรุณากด "ดู Log สรุป" แล้วคัดลอกด้วยตัวเอง'))
  }

  const filledCount = ITEMS.filter(i => answers[i.letter]?.trim()).length

  return (
    <div>
      <PageHeader title="บันทึกอาการ SAMPLE" subtitle="กรอกข้อมูลสำหรับส่งแพทย์ฉุกเฉิน" />
      <div className="p-4 space-y-4">

        {/* Timestamp */}
        <div className="bg-info-bg border border-blue-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-info mb-1">⏱ เวลาเริ่มอาการ</p>
          <div className="text-3xl font-black text-navy my-1">{ts || '-- : --'}</div>
          <p className="text-xs text-blue-400 mb-3">บอกเวลานี้กับแพทย์ฉุกเฉิน — สำคัญมากสำหรับ Stroke และหัวใจ</p>
          <button onClick={stamp} className="bg-info text-white text-sm font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform">
            ⏱ บันทึกเวลาตอนนี้
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">กรอกแล้ว {filledCount}/{ITEMS.length} หัวข้อ</p>
          <div className="flex gap-1">
            {ITEMS.map(item => (
              <div key={item.letter}
                className={`w-6 h-1.5 rounded-full transition-colors ${answers[item.letter]?.trim() ? 'bg-navy' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* SAMPLE Form */}
        <div className="space-y-3">
          {ITEMS.map((item) => (
            <div key={item.letter} className="card border border-gray-100 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`text-white font-black text-lg w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${answers[item.letter]?.trim() ? 'bg-navy' : 'bg-gray-300'}`}>
                  {item.letter}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.full}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.q}</p>
                </div>
              </div>
              <textarea
                rows={2}
                value={answers[item.letter] || ''}
                onChange={e => setAns(item.letter, e.target.value)}
                placeholder={item.placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-navy resize-none leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={saveLog}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${saved ? 'bg-safe text-white' : 'bg-navy text-white'}`}
          >
            {saved ? '✅ บันทึกแล้ว' : '💾 บันทึก Log'}
          </button>

          {lastLog && (
            <div className="flex gap-2">
              <button
                onClick={copyText}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 active:bg-gray-50 transition-colors"
              >
                📋 คัดลอกส่ง Line
              </button>
              <button
                onClick={() => setShowLog(!showLog)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 active:bg-gray-50 transition-colors"
              >
                {showLog ? '🙈 ซ่อน Log' : '👁 ดู Log สรุป'}
              </button>
            </div>
          )}
        </div>

        {/* Log Preview */}
        {showLog && lastLog && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500">📋 Log สรุป — {lastLog.savedAt}</p>
              <button onClick={clearLog} className="text-xs text-danger font-medium">ล้างข้อมูล</button>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-info mb-1">⏱ เวลาเริ่มอาการ</p>
              <p className="text-sm font-bold text-navy">{lastLog.ts || 'ไม่ได้บันทึก'}</p>
            </div>
            {ITEMS.map(item => (
              <div key={item.letter} className="bg-white border border-gray-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-400 mb-1">[{item.letter}] {item.full}</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {lastLog.answers[item.letter] || <span className="text-gray-300 italic">ไม่ได้กรอก</span>}
                </p>
              </div>
            ))}
            {profile?.elderName && (
              <div className="bg-navy/5 border border-navy/10 rounded-lg p-3 text-xs text-navy space-y-1">
                <p><span className="font-semibold">ผู้ป่วย:</span> {profile.elderName}</p>
                {profile.hospital && <p><span className="font-semibold">โรงพยาบาล:</span> {profile.hospital}</p>}
              </div>
            )}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pb-2 leading-relaxed">
          ข้อมูลที่กรอกบันทึกในเครื่องนี้<br />ใช้ปุ่ม "คัดลอกส่ง Line" เพื่อส่งให้แพทย์หรือญาติ
        </p>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { loadProfile } from '../lib/storage'
import { Settings } from 'lucide-react'

export default function PatientInfoPage() {
  const profile = loadProfile()
  const nav = useNavigate()

  const fields = [
    { label: '👤 ชื่อ-นามสกุล', value: profile?.elderName },
    { label: '🏥 โรงพยาบาล / แพทย์', value: profile?.hospital },
    { label: '📋 โรคประจำตัว', value: profile?.disease },
    { label: '⚠️ ยาที่แพ้', value: profile?.allergy },
    { label: '💊 ยาประจำตัว', value: profile?.medications },
    { label: '📍 ที่อยู่', value: profile?.address },
  ].filter(f => f.value)

  return (
    <div>
      <PageHeader title="ข้อมูลผู้ป่วย" subtitle="แจ้งข้อมูลนี้กับแพทย์ฉุกเฉินเมื่อมาถึง" />
      <div className="p-4 space-y-4">
        <div className="bg-info-bg border border-blue-200 rounded-xl p-3">
          <p className="text-xs text-info leading-relaxed">
            แสดงหน้านี้ให้แพทย์ฉุกเฉินหรือพยาบาลเมื่อถึงโรงพยาบาล เพื่อให้ได้ข้อมูลผู้ป่วยอย่างรวดเร็ว
          </p>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm mb-3">ยังไม่มีข้อมูล</p>
            <button onClick={() => nav('/setup')} className="bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
              กรอกข้อมูล
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {fields.map((f, i) => (
                <div key={i} className="card border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">{f.label}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{f.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => nav('/setup')}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm text-gray-500 active:bg-gray-50"
            >
              <Settings size={15} /> แก้ไขข้อมูล
            </button>
          </>
        )}
      </div>
    </div>
  )
}

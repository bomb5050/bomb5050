import { useNavigate } from 'react-router-dom'
import { loadProfile } from '../lib/storage'
import { Activity, Brain, Heart, AlertTriangle, ClipboardList, Phone, User, Settings } from 'lucide-react'

const MENU = [
  { path: '/assess', icon: Activity, label: 'ประเมินอาการ', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100' },
  { path: '/stroke', icon: Brain, label: 'เช็กเส้นเลือด\n(BE-FAST)', color: 'bg-purple-50 text-purple-700', border: 'border-purple-100' },
  { path: '/cpr', icon: Heart, label: 'CPR\nฉุกเฉิน', color: 'bg-red-50 text-red-700', border: 'border-red-100' },
  { path: '/levels', icon: AlertTriangle, label: 'ระดับ\nความรุนแรง', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100' },
  { path: '/sample', icon: ClipboardList, label: 'บันทึก\nอาการ', color: 'bg-green-50 text-green-700', border: 'border-green-100' },
  { path: '/contacts', icon: Phone, label: 'เบอร์\nติดต่อ', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100' },
]

export default function HomePage() {
  const nav = useNavigate()
  const profile = loadProfile()

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-navy text-white px-4 pt-4 pb-5 safe-top">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs">แผนรับมือเหตุฉุกเฉิน</p>
            <h1 className="text-xl font-bold mt-0.5">{profile?.elderName || 'ผู้สูงอายุ'}</h1>
            {profile?.disease && <p className="text-white/50 text-xs mt-0.5">{profile.disease}</p>}
          </div>
          <button onClick={() => nav('/setup')} className="bg-white/10 rounded-lg p-2 active:bg-white/20">
            <Settings size={18} className="text-white/70" />
          </button>
        </div>

        {/* SOS Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a href="tel:1669" className="btn-sos bg-danger text-lg">
            📞 โทร 1669
          </a>
          <a href="tel:1646" className="btn-sos bg-navy-light border border-white/20 text-base">
            🏙️ EMS 1646
          </a>
        </div>
      </div>

      {/* Quick address strip */}
      {profile?.address && (
        <div className="bg-info-bg border-b border-blue-100 px-4 py-2 flex items-center gap-2">
          <span className="text-xs text-info-light">📍</span>
          <p className="text-xs text-info flex-1 truncate">{profile.address}</p>
          <button
            onClick={() => navigator.clipboard?.writeText(profile.address)}
            className="text-xs text-info font-medium shrink-0"
          >คัดลอก</button>
        </div>
      )}

      {/* Menu Grid */}
      <div className="p-4">
        <p className="section-title">เมนูหลัก</p>
        <div className="grid grid-cols-3 gap-3">
          {MENU.map(({ path, icon: Icon, label, color, border }) => (
            <button
              key={path}
              onClick={() => nav(path)}
              className={`card border ${border} flex flex-col items-center justify-center py-4 px-2 gap-2 active:scale-95 transition-transform`}
            >
              <div className={`${color} rounded-xl p-2.5`}>
                <Icon size={22} />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight whitespace-pre-line">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* First contact strip */}
      {profile?.contacts[0]?.name && (
        <div className="mx-4 mb-2">
          <p className="section-title">ผู้ดูแลหลัก</p>
          <div className="card border border-gray-100 flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-navy/10 rounded-full p-2"><User size={16} className="text-navy" /></div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{profile.contacts[0].name}</p>
                <p className="text-xs text-gray-400">ผู้ดูแลหลัก — ติดต่อก่อน</p>
              </div>
            </div>
            {profile.contacts[0].tel && (
              <a href={`tel:${profile.contacts[0].tel.replace(/-/g, '')}`}
                className="bg-info-bg text-info border border-blue-200 text-sm font-bold px-3 py-1.5 rounded-lg">
                {profile.contacts[0].tel}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-400 px-6 py-4 leading-relaxed">
        อ้างอิงมาตรฐาน WHO / AHA / EMS ไม่ใช่คำแนะนำทางการแพทย์อย่างเป็นทางการ<br />
        กรณีฉุกเฉินให้โทร 1669 เสมอ
      </p>
    </div>
  )
}

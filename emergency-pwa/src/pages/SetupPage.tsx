import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadProfile, saveProfile, EMPTY_PROFILE, UserProfile } from '../lib/storage'

export default function SetupPage() {
  const nav = useNavigate()
  const existing = loadProfile()
  const [form, setForm] = useState<UserProfile>(existing ?? EMPTY_PROFILE)

  const set = (key: keyof UserProfile, val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  const setContact = (i: number, field: 'name' | 'tel', val: string) =>
    setForm(f => {
      const c = [...f.contacts]
      c[i] = { ...c[i], [field]: val }
      return { ...f, contacts: c }
    })

  const handleSave = () => {
    if (!form.elderName.trim()) { alert('กรุณากรอกชื่อผู้สูงอายุ'); return }
    saveProfile(form)
    nav('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-start py-6 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center text-white mb-6">
          <div className="text-5xl mb-3">🏥</div>
          <h1 className="text-xl font-bold">ตั้งค่าแผนรับมือฉุกเฉิน</h1>
          <p className="text-white/60 text-sm mt-1">กรอกครั้งเดียว บันทึกในเครื่องของคุณ</p>
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-5">
          {/* ข้อมูลผู้สูงอายุ */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">ข้อมูลผู้สูงอายุ</p>
            <div className="space-y-3">
              {[
                { label: 'ชื่อ-นามสกุล *', key: 'elderName' as const, placeholder: 'เช่น คุณย่าสมใจ รักดี' },
                { label: 'โรคประจำตัว', key: 'disease' as const, placeholder: 'เช่น เบาหวาน, ความดัน, หัวใจ' },
                { label: 'ยาที่แพ้', key: 'allergy' as const, placeholder: 'เช่น Penicillin (ถ้าไม่มีใส่ -)' },
                { label: 'ยาประจำตัว', key: 'medications' as const, placeholder: 'เช่น Metformin 500, Amlodipine 5mg' },
                { label: 'ที่อยู่ (สำหรับแจ้ง 1669)', key: 'address' as const, placeholder: 'บ้านเลขที่ ถนน แขวง เขต' },
                { label: 'โรงพยาบาลประจำ / แพทย์', key: 'hospital' as const, placeholder: 'เช่น รพ.รามาธิบดี นพ.ธีรภัทร' },
                { label: 'เบอร์โทรโรงพยาบาล', key: 'hospitalTel' as const, placeholder: '02-xxx-xxxx' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={key === 'hospitalTel' ? 'tel' : 'text'}
                    value={form[key] as string}
                    onChange={e => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ผู้ดูแล */}
          <section>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">ผู้ดูแลและครอบครัว (สูงสุด 6 คน)</p>
            <div className="space-y-3">
              {form.contacts.map((c, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 mb-2">{i === 0 ? '👤 ผู้ดูแลหลัก' : `สมาชิก ${i + 1}`}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={c.name}
                      onChange={e => setContact(i, 'name', e.target.value)}
                      placeholder={i === 0 ? 'ชื่อ เช่น ดาว' : 'ชื่อ'}
                      className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-navy bg-white"
                    />
                    <input
                      type="tel"
                      value={c.tel}
                      onChange={e => setContact(i, 'tel', e.target.value)}
                      placeholder="0xx-xxx-xxxx"
                      className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-navy bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button
            onClick={handleSave}
            className="w-full bg-danger text-white font-bold py-4 rounded-xl text-base active:scale-95 transition-transform"
          >
            ✅ บันทึกและเริ่มใช้งาน
          </button>
          <p className="text-center text-xs text-gray-400">ข้อมูลทั้งหมดเก็บในเครื่องของคุณ ไม่ได้ส่งไปที่ใด</p>
        </div>
      </div>
    </div>
  )
}

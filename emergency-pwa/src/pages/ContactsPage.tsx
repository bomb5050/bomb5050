import PageHeader from '../components/PageHeader'
import { loadProfile } from '../lib/storage'

const EMERGENCY = [
  { name: 'รถพยาบาลฉุกเฉิน', role: 'ทั่วประเทศ 24 ชม.', tel: '1669', emerg: true },
  { name: 'EMS กรุงเทพฯ', role: 'หน่วยแพทย์ฉุกเฉิน กทม.', tel: '1646', emerg: true },
  { name: 'ศูนย์พิษวิทยา', role: 'ยา / สารพิษ / งูกัด', tel: '1367', emerg: true },
  { name: 'ตำรวจ', role: 'เหตุฉุกเฉิน / อันตราย', tel: '191', emerg: false },
  { name: 'ดับเพลิง / สัตว์ร้าย', role: 'เพลิงไหม้ / สัตว์ร้ายเข้าบ้าน', tel: '199', emerg: false },
  { name: 'คนหาย / ผู้สูงอายุหลงทาง', role: 'กรมคุ้มครองสิทธิ์', tel: '1300', emerg: false },
]

function ContactCard({ name, role, tel, emerg }: { name: string; role: string; tel: string; emerg: boolean }) {
  const clean = tel.replace(/-/g, '')
  return (
    <div className="card border border-gray-100 flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{role}</p>
      </div>
      <a
        href={`tel:${clean}`}
        className={`text-sm font-bold px-3 py-2 rounded-lg border ${emerg ? 'bg-danger-bg text-danger border-red-200' : 'bg-info-bg text-info border-blue-200'}`}
      >{tel}</a>
    </div>
  )
}

export default function ContactsPage() {
  const profile = loadProfile()

  return (
    <div>
      <PageHeader title="เบอร์ติดต่อ" subtitle="กดเบอร์ใดก็ได้เพื่อโทรทันที" />
      <div className="p-4 space-y-5">
        {/* Emergency */}
        <div>
          <p className="section-title">🚨 เบอร์ฉุกเฉินหลัก</p>
          <div className="space-y-2">
            {EMERGENCY.map(e => <ContactCard key={e.tel} {...e} />)}
          </div>
        </div>

        {/* Hospital */}
        {(profile?.hospital || profile?.hospitalTel) && (
          <div>
            <p className="section-title">🏥 โรงพยาบาลประจำ</p>
            <ContactCard name={profile!.hospital || 'โรงพยาบาลประจำ'} role="แพทย์ผู้ดูแล" tel={profile!.hospitalTel || '-'} emerg={false} />
          </div>
        )}

        {/* Family */}
        {profile?.contacts.some(c => c.name || c.tel) && (
          <div>
            <p className="section-title">👨‍👩‍👧 ผู้ดูแลและครอบครัว</p>
            <div className="space-y-2">
              {profile!.contacts.map((c, i) => c.name || c.tel ? (
                <ContactCard
                  key={i}
                  name={c.name || `ผู้ดูแล ${i + 1}`}
                  role={i === 0 ? 'ผู้ดูแลหลัก — ติดต่อก่อน' : `สมาชิก ${i + 1}`}
                  tel={c.tel || '-'}
                  emerg={false}
                />
              ) : null)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

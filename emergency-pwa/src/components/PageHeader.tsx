import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface Props { title: string; subtitle?: string }

export default function PageHeader({ title, subtitle }: Props) {
  const nav = useNavigate()
  return (
    <div className="bg-navy text-white px-4 pt-4 pb-4 safe-top">
      <button onClick={() => nav(-1)} className="flex items-center gap-1 text-white/70 text-sm mb-2 -ml-1">
        <ChevronLeft size={18} /> กลับ
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
      {subtitle && <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>}
    </div>
  )
}

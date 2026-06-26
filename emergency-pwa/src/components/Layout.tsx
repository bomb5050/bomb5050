import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Phone, User } from 'lucide-react'

export default function Layout() {
  const loc = useLocation()
  const nav = useNavigate()
  const isHome = loc.pathname === '/'

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50 max-w-md mx-auto">
        <div className="flex">
          <button
            onClick={() => nav('/')}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${isHome ? 'text-navy' : 'text-gray-400'}`}
          >
            <Home size={20} />
            หน้าหลัก
          </button>
          <a
            href="tel:1669"
            className="flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-bold text-danger"
          >
            <Phone size={20} />
            โทร 1669
          </a>
          <button
            onClick={() => nav('/info')}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${loc.pathname === '/info' ? 'text-navy' : 'text-gray-400'}`}
          >
            <User size={20} />
            ข้อมูลผู้ป่วย
          </button>
        </div>
      </nav>
    </div>
  )
}

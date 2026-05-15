import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Sparkles,
  Star,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const STORAGE_KEY = 'sidebar_collapsed'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/contacts', label: 'Contacts', icon: MessageSquare },
  { to: '/services', label: 'Services', icon: Sparkles },
  { to: '/testimonials', label: 'Testimonials', icon: Star },
  { to: '/payments', label: 'Payments', icon: CreditCard },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()

  return (
  <>
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#2d5a3a] text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[70px]' : 'w-[260px]'
      } max-md:bottom-0 max-md:top-auto max-md:h-16 max-md:w-full max-md:flex-row`}
    >
      <div className={`flex items-center border-b border-white/10 px-4 py-5 max-md:hidden ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3f704d]">
          <Sparkles size={22} className="text-[#ddbf61]" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold leading-tight">Sparkle &amp; Shine</p>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#2d5a3a] shadow-md transition hover:scale-105 max-md:hidden"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around max-md:overflow-x-auto max-md:px-2 max-md:py-0">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 max-md:flex-col max-md:gap-0.5 max-md:px-2 max-md:py-1.5 max-md:text-[10px] ${
                isActive
                  ? 'border-l-4 border-[#ddbf61] bg-[#3f704d] text-white max-md:border-l-0 max-md:border-t-2'
                  : 'text-white/80 hover:bg-white/10 hover:text-white max-md:border-transparent'
              } ${collapsed ? 'justify-center max-md:justify-center' : ''}`
            }
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span className="max-md:hidden">{label}</span>}
            <span className="hidden max-md:block">{label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>

      <div className={`border-t border-white/10 p-4 max-md:hidden ${collapsed ? 'flex flex-col items-center' : ''}`}>
        {!collapsed && user && (
          <div className="mb-3 truncate">
            <p className="text-xs text-white/60">Signed in as</p>
            <p className="truncate text-sm font-medium">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  </>
  )
}

export function useSidebarCollapsed() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'true'
}

export function setSidebarCollapsed(value: boolean) {
  localStorage.setItem(STORAGE_KEY, String(value))
}

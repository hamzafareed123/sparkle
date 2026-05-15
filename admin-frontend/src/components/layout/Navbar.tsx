import { Bell, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/api/admin.api'

interface NavbarProps {
  title: string
  sidebarCollapsed: boolean
}

export function Navbar({ title, sidebarCollapsed }: NavbarProps) {
  const { user, logout } = useAuth()
  const { data: stats } = useQuery({
    queryKey: ['admin-stats-nav'],
    queryFn: adminApi.getDashboardStats,
    staleTime: 2 * 60 * 1000,
  })

  const unread = stats?.contacts.unread ?? 0

  return (
    <header
      className={`fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 transition-all duration-300 max-md:left-0 ${
        sidebarCollapsed ? 'left-[70px]' : 'left-[260px]'
      }`}
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <h1 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-color)] text-sm font-bold text-white">
            {user?.email?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[var(--text-primary)]">{user?.email}</p>
            <p className="text-xs text-[var(--text-muted)]">{user?.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}

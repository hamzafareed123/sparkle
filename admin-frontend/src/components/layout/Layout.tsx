import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar, setSidebarCollapsed, useSidebarCollapsed } from './Sidebar'
import { Navbar } from './Navbar'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/bookings': 'Bookings',
  '/contacts': 'Contacts',
  '/services': 'Services',
  '/testimonials': 'Testimonials',
  '/payments': 'Payments',
}

export function Layout() {
  const [collapsed, setCollapsed] = useState(useSidebarCollapsed)
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'Admin'

  const handleToggle = () => {
    const next = !collapsed
    setCollapsed(next)
    setSidebarCollapsed(next)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />
      <Navbar title={title} sidebarCollapsed={collapsed} />
      <main
        className={`min-h-screen pt-16 transition-all duration-300 max-md:pb-20 max-md:pt-16 ${
          collapsed ? 'md:pl-[70px]' : 'md:pl-[260px]'
        }`}
      >
        <div className="page-fade-in p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

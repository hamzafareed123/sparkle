import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import './MainLayout.css'
import type { RootState } from '../../app/store'
import { closeMobileMenu, toggleMobileMenu } from '../../app/store'
import { Footer } from './Footer/Footer'

const topNavItems = [
  { label: 'About', to: '/about', external: false },
  { label: 'Services', to: '/services', external: false },
  { label: 'Pricing', to: '/pricing', external: true },
  { label: 'Gallery', to: '/gallery', external: false },
]

export function MainLayout() {
  const dispatch = useDispatch()
  const mobileMenuOpen = useSelector((state: RootState) => state.ui.mobileMenuOpen)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderCollapsed(true)
      } else {
        setIsHeaderCollapsed(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="site-shell">
      {/* Cinematic Floating Glass Header */}
      <header className={`site-header ${isHeaderCollapsed ? 'collapsed' : ''} transition-all duration-500 ease-in-out`}>
        <div className="header-glass nav-row transition-all duration-500 ease-in-out">
          <NavLink to="/" className="brand-wrap transition-all duration-500 ease-in-out" onClick={() => dispatch(closeMobileMenu())}>
            <div className="brand-mark transition-all duration-500 ease-in-out">🍃</div>
            <div className={`brand-copy ${isHeaderCollapsed ? 'collapsed' : ''} transition-all duration-500 ease-in-out`}>
              <p className="brand transition-all duration-500 ease-in-out">Sparkle & Shine</p>
              <span className="transition-all duration-500 ease-in-out">Professional Cleaning</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="main-nav transition-all duration-500 ease-in-out">
            {topNavItems.map((item) =>
              item.external ? (
                <a key={item.label} href={item.to} className="transition-all duration-300 ease-in-out">
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : '') + ' transition-all duration-300 ease-in-out'}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* Desktop Right Side Base Actions */}
          <div className={`header-contact ${isHeaderCollapsed ? 'collapsed' : ''} transition-all duration-500 ease-in-out`}>
            <a href="tel:+74951519090" className="phone-link transition-all duration-500 ease-in-out">
              <Phone size={18} strokeWidth={2.5} className="transition-all duration-300 ease-in-out" /> +7 (495) 151-9090
            </a>
            <button className="action-btn transition-all duration-500 ease-in-out" aria-label="Start Chat">
              <MessageCircle size={18} strokeWidth={2} className="transition-all duration-300 ease-in-out" />
            </button>
          </div>

          {/* Mobile Overlay Trigger Button */}
          <button
            className="menu-btn"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={2.2} /> : <Menu size={24} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      {/* Full Screen Cinematic Mobile Layout Drawer */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {topNavItems.map((item) =>
            item.external ? (
              <a key={item.label} href={item.to} onClick={() => dispatch(closeMobileMenu())}>
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => dispatch(closeMobileMenu())}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="mobile-contact">
          <a href="tel:+74951519090" className="phone-link">
            <Phone size={24} strokeWidth={2.5} /> +7 (495) 151-9090
          </a>
          <button className="action-btn" style={{ width: 60, height: 60 }} aria-label="Start Chat">
            <MessageCircle size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import './MainLayout.css'
import type { RootState } from '../../app/store'
import { closeMobileMenu, toggleMobileMenu } from '../../app/store'
import { Footer } from './Footer/Footer'

const topNavItems = [
  { label: 'About', to: '/about', external: false },
  { label: 'Services', to: '/services', external: false },
  { label: 'Pricing', to: '/pricing', external: false },
  { label: 'Gallery', to: '/gallery', external: false },
]

export function MainLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const mobileMenuOpen = useSelector((state: RootState) => state.ui.mobileMenuOpen)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (window.innerWidth <= 900) {
        setIsHeaderCollapsed(false)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 120) {
        setIsHeaderCollapsed(true)
      } else {
        setIsHeaderCollapsed(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
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
            <button
              className="action-btn transition-all duration-500 ease-in-out"
              aria-label="Start Chat"
              onClick={() => {
                dispatch(closeMobileMenu())
                navigate('/book')
              }}
            >
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
          <button
            className="action-btn"
            style={{ width: 60, height: 60 }}
            aria-label="Start Chat"
            onClick={() => {
              dispatch(closeMobileMenu())
              navigate('/book')
            }}
          >
            <MessageCircle size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      <main id="main-content" className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

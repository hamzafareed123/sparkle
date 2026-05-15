import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { HomePage } from '../pages/HomePage/HomePage'
import { AboutPage } from '../pages/AboutPage/AboutPage'
import { ServicesPage } from '../pages/ServicesPage/ServicesPage'
import { PricingPage } from '../pages/PricingPage/PricingPage'
import { GalleryPage } from '../pages/GalleryPage/GalleryPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { SignupPage } from '../pages/SignupPage/SignupPage'
import { PrivacyPage } from '../pages/LegalPage/PrivacyPage'
import { TermsPage } from '../pages/LegalPage/TermsPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage'
import { BookingPage } from '../pages/BookingPage/BookingPage'

const router = createBrowserRouter([
  /* Auth & standalone pages */
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },

  /* Main site pages */
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'book', element: <BookingPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

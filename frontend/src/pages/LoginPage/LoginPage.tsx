import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'
import { getErrorMessage } from '../../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import './LoginPage.css'

/* ─── animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7 },
  },
}

/* ─── helpers ─── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

interface FieldErrors {
  email?: string
  password?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  /* per-field errors + "touched" tracking */
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  /* mark a field as touched on blur */
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  /* live validation — runs on every change and on blur */
  const validate = useCallback(
    (fields?: FieldErrors): FieldErrors => {
      const e = fields ?? {}
      // Email
      if (!email) e.email = 'Email is required.'
      else if (!isValidEmail(email)) e.email = 'Please enter a valid email address.'
      else delete e.email

      // Password
      if (!password) e.password = 'Password is required.'
      else if (password.length < 6) e.password = 'Password must be at least 6 characters.'
      else delete e.password

      return e
    },
    [email, password],
  )

  /* change handlers with live validation for touched fields */
  const onEmailChange = (v: string) => {
    setEmail(v)
    if (touched.email) {
      const errs = { ...fieldErrors }
      if (!v) errs.email = 'Email is required.'
      else if (!isValidEmail(v)) errs.email = 'Please enter a valid email address.'
      else delete errs.email
      setFieldErrors(errs)
      if (Object.keys(errs).length === 0) setFormError('')
    }
  }

  const onPasswordChange = (v: string) => {
    setPassword(v)
    if (touched.password) {
      const errs = { ...fieldErrors }
      if (!v) errs.password = 'Password is required.'
      else if (v.length < 6) errs.password = 'Password must be at least 6 characters.'
      else delete errs.password
      setFieldErrors(errs)
      if (Object.keys(errs).length === 0) setFormError('')
    }
  }

  /* submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setSubmitSuccess(false)

    // mark all touched
    setTouched({ email: true, password: true })

    const errs = validate({})
    setFieldErrors(errs)

    if (Object.keys(errs).length > 0) {
      setFormError('Please fix the errors above to continue.')
      return
    }

    setIsLoading(true)
    authApi
      .login(email, password)
      .then(({ token, user }) => {
        localStorage.setItem('sparkle_token', token)
        localStorage.setItem('sparkle_user', JSON.stringify(user))
        setSubmitSuccess(true)
        setTimeout(() => navigate('/'), 1200)
      })
      .catch((err) => {
        setFormError(getErrorMessage(err))
      })
      .finally(() => setIsLoading(false))
  }

  /* helper: field state class */
  const fieldState = (field: keyof FieldErrors) => {
    if (!touched[field]) return ''
    return fieldErrors[field] ? 'has-error' : 'has-success'
  }

  return (
    <div className="login-page">
      {/* ─── Left Hero Panel ─── */}
      <motion.div
        className="login-hero"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="login-floating-shapes">
          <span /><span /><span /><span /><span />
        </div>

        <div className="login-hero-content">
          <motion.div
            className="login-hero-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            🍃
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Welcome Back to <br />
            <span className="hero-accent">Sparkle & Shine</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Your trusted partner for professional cleaning services.
            Sign in to manage your bookings and keep your spaces sparkling.
          </motion.p>

          <motion.div
            className="login-trust-badges"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="trust-badge">
              <div className="trust-badge-icon">🛡️</div>
              <span>Secure</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">⭐</div>
              <span>5-Star Rated</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">⚡</div>
              <span>Fast Booking</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Right Form Panel ─── */}
      <div className="login-form-panel">
        <motion.div className="login-form-container" variants={scaleIn} initial="hidden" animate="visible">
          <div className="login-card">
            <div className="login-card-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to continue</p>
            </div>

            {/* Social Login */}
            <div className="social-login-group">
              <button type="button" className="social-btn" id="login-google-btn">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button type="button" className="social-btn" id="login-facebook-btn">
                <svg viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            <div className="auth-divider">
              <span>or continue with email</span>
            </div>

            {/* Form-level error */}
            <AnimatePresence>
              {formError && (
                <motion.div
                  className="auth-error"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle size={16} />
                  {formError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="auth-success"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 size={16} />
                  Login successful! Redirecting…
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} id="login-form" noValidate>
              {/* Email */}
              <div className={`auth-field ${fieldState('email')}`}>
                <label htmlFor="login-email">Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    id="login-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onBlur={() => { handleBlur('email'); setFieldErrors(validate({ ...fieldErrors })) }}
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'login-email-err' : undefined}
                  />
                  {touched.email && !fieldErrors.email && (
                    <CheckCircle2 size={18} className="field-valid-icon" />
                  )}
                </div>
                <AnimatePresence>
                  {touched.email && fieldErrors.email && (
                    <motion.p
                      className="field-error-msg"
                      id="login-email-err"
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {fieldErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div className={`auth-field ${fieldState('password')}`}>
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={18} className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onBlur={() => { handleBlur('password'); setFieldErrors(validate({ ...fieldErrors })) }}
                    autoComplete="current-password"
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? 'login-pw-err' : undefined}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <AnimatePresence>
                  {touched.password && fieldErrors.password && (
                    <motion.p
                      className="field-error-msg"
                      id="login-pw-err"
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {fieldErrors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="auth-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>

              <motion.button
                type="submit"
                className="auth-submit"
                id="login-submit-btn"
                disabled={isLoading}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="auth-footer">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

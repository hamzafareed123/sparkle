import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'
import { getErrorMessage } from '../../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle, CheckCircle2 } from 'lucide-react'
import './SignupPage.css'

/* ─── re-use the shared auth-field styles from LoginPage ─── */
import '../LoginPage/LoginPage.css'

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

function getPasswordStrength(pw: string) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
}

export function SignupPage() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const strength = useMemo(() => getPasswordStrength(password), [password])

  const requirements = useMemo(() => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }), [password])

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  /* full validate */
  const validate = useCallback((): FieldErrors => {
    const e: FieldErrors = {}
    if (!firstName.trim()) e.firstName = 'First name is required.'
    else if (firstName.trim().length < 2) e.firstName = 'Must be at least 2 characters.'

    if (!lastName.trim()) e.lastName = 'Last name is required.'
    else if (lastName.trim().length < 2) e.lastName = 'Must be at least 2 characters.'

    if (!email) e.email = 'Email is required.'
    else if (!isValidEmail(email)) e.email = 'Please enter a valid email address.'

    if (!password) e.password = 'Password is required.'
    else if (password.length < 8) e.password = 'Must be at least 8 characters.'
    else if (getPasswordStrength(password) < 2) e.password = 'Please choose a stronger password.'

    if (!confirmPassword) e.confirmPassword = 'Please confirm your password.'
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match.'

    if (!agreeTerms) e.terms = 'You must agree to the Terms & Conditions.'

    return e
  }, [firstName, lastName, email, password, confirmPassword, agreeTerms])

  /* live per-field validation */
  const liveValidateField = useCallback((field: string, value: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      switch (field) {
        case 'firstName':
          if (!value.trim()) next.firstName = 'First name is required.'
          else if (value.trim().length < 2) next.firstName = 'Must be at least 2 characters.'
          else delete next.firstName
          break
        case 'lastName':
          if (!value.trim()) next.lastName = 'Last name is required.'
          else if (value.trim().length < 2) next.lastName = 'Must be at least 2 characters.'
          else delete next.lastName
          break
        case 'email':
          if (!value) next.email = 'Email is required.'
          else if (!isValidEmail(value)) next.email = 'Please enter a valid email address.'
          else delete next.email
          break
        case 'password':
          if (!value) next.password = 'Password is required.'
          else if (value.length < 8) next.password = 'Must be at least 8 characters.'
          else if (getPasswordStrength(value) < 2) next.password = 'Please choose a stronger password.'
          else delete next.password
          // re-check confirm if already touched
          if (touched.confirmPassword && confirmPassword) {
            if (value !== confirmPassword) next.confirmPassword = 'Passwords do not match.'
            else delete next.confirmPassword
          }
          break
        case 'confirmPassword':
          if (!value) next.confirmPassword = 'Please confirm your password.'
          else if (password !== value) next.confirmPassword = 'Passwords do not match.'
          else delete next.confirmPassword
          break
      }
      // Auto-clear form-level error when all fields become valid
      if (Object.keys(next).length === 0) setFormError('')
      return next
    })
  }, [password, confirmPassword, touched.confirmPassword])

  /* change handlers */
  const handleChange = (field: string, value: string, setter: (v: string) => void) => {
    setter(value)
    if (touched[field]) liveValidateField(field, value)
  }

  /* submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setSubmitSuccess(false)

    const allTouched: Record<string, boolean> = {
      firstName: true, lastName: true, email: true,
      password: true, confirmPassword: true, terms: true,
    }
    setTouched(allTouched)

    const errs = validate()
    setFieldErrors(errs)

    if (Object.keys(errs).length > 0) {
      setFormError('Please fix the errors above to continue.')
      return
    }

    setIsLoading(true)
    authApi
      .register(email, password)
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

  const fieldState = (field: keyof FieldErrors) => {
    if (!touched[field]) return ''
    return fieldErrors[field] ? 'has-error' : 'has-success'
  }

  return (
    <div className="signup-page">
      {/* ─── Left Form Panel ─── */}
      <div className="signup-form-panel">
        <motion.div className="signup-form-container" variants={scaleIn} initial="hidden" animate="visible">
          <div className="signup-card">
            <div className="signup-card-header">
              <h2>Create Account</h2>
              <p>Start your clean-living journey today</p>
            </div>

            {/* Social Login */}
            <div className="social-login-group">
              <button type="button" className="social-btn" id="signup-google-btn">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button type="button" className="social-btn" id="signup-facebook-btn">
                <svg viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            <div className="auth-divider">
              <span>or sign up with email</span>
            </div>

            {/* Form-level messages */}
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
                  Account created! Redirecting…
                </motion.div>
              )}
            </AnimatePresence>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} id="signup-form" noValidate>
              {/* Name Row */}
              <div className="auth-field-row">
                <div className={`auth-field ${fieldState('firstName')}`}>
                  <label htmlFor="signup-first-name">First Name</label>
                  <div className="auth-input-wrap">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      id="signup-first-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => handleChange('firstName', e.target.value, setFirstName)}
                      onBlur={() => { handleBlur('firstName'); liveValidateField('firstName', firstName) }}
                      autoComplete="given-name"
                      aria-invalid={!!fieldErrors.firstName}
                    />
                    {touched.firstName && !fieldErrors.firstName && (
                      <CheckCircle2 size={16} className="field-valid-icon" />
                    )}
                  </div>
                  <AnimatePresence>
                    {touched.firstName && fieldErrors.firstName && (
                      <motion.p className="field-error-msg"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {fieldErrors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className={`auth-field ${fieldState('lastName')}`}>
                  <label htmlFor="signup-last-name">Last Name</label>
                  <div className="auth-input-wrap">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      id="signup-last-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => handleChange('lastName', e.target.value, setLastName)}
                      onBlur={() => { handleBlur('lastName'); liveValidateField('lastName', lastName) }}
                      autoComplete="family-name"
                      aria-invalid={!!fieldErrors.lastName}
                    />
                    {touched.lastName && !fieldErrors.lastName && (
                      <CheckCircle2 size={16} className="field-valid-icon" />
                    )}
                  </div>
                  <AnimatePresence>
                    {touched.lastName && fieldErrors.lastName && (
                      <motion.p className="field-error-msg"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {fieldErrors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email */}
              <div className={`auth-field ${fieldState('email')}`}>
                <label htmlFor="signup-email">Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    id="signup-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value, setEmail)}
                    onBlur={() => { handleBlur('email'); liveValidateField('email', email) }}
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.email}
                  />
                  {touched.email && !fieldErrors.email && (
                    <CheckCircle2 size={18} className="field-valid-icon" />
                  )}
                </div>
                <AnimatePresence>
                  {touched.email && fieldErrors.email && (
                    <motion.p className="field-error-msg"
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
                <label htmlFor="signup-password">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={18} className="field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value, setPassword)}
                    onBlur={() => { handleBlur('password'); liveValidateField('password', password) }}
                    autoComplete="new-password"
                    aria-invalid={!!fieldErrors.password}
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

                {/* Strength Meter */}
                {password && (
                  <motion.div
                    className="password-strength"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="strength-bar-track">
                      <div className={`strength-bar-fill strength-${strength}`} />
                    </div>
                    <span className={`strength-label strength-${strength}`}>
                      {strengthLabels[strength]}
                    </span>

                    <div className="password-requirements">
                      <div className={`req-item ${requirements.length ? 'met' : ''}`}>
                        <span className="req-dot" /> 8+ characters
                      </div>
                      <div className={`req-item ${requirements.uppercase ? 'met' : ''}`}>
                        <span className="req-dot" /> Uppercase letter
                      </div>
                      <div className={`req-item ${requirements.number ? 'met' : ''}`}>
                        <span className="req-dot" /> Number
                      </div>
                      <div className={`req-item ${requirements.special ? 'met' : ''}`}>
                        <span className="req-dot" /> Special character
                      </div>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {touched.password && fieldErrors.password && (
                    <motion.p className="field-error-msg"
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

              {/* Confirm Password */}
              <div className={`auth-field ${fieldState('confirmPassword')}`}>
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <div className="auth-input-wrap">
                  <Lock size={18} className="field-icon" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    id="signup-confirm-password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value, setConfirmPassword)}
                    onBlur={() => { handleBlur('confirmPassword'); liveValidateField('confirmPassword', confirmPassword) }}
                    autoComplete="new-password"
                    aria-invalid={!!fieldErrors.confirmPassword}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <AnimatePresence>
                  {touched.confirmPassword && fieldErrors.confirmPassword && (
                    <motion.p className="field-error-msg"
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {fieldErrors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Terms */}
              <label className={`terms-check ${touched.terms && fieldErrors.terms ? 'terms-error' : ''}`}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked)
                    if (touched.terms) {
                      setFieldErrors((prev) => {
                        const next = { ...prev }
                        if (!e.target.checked) next.terms = 'You must agree to the Terms & Conditions.'
                        else delete next.terms
                        return next
                      })
                    }
                  }}
                />
                <span>
                  I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                  <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
              <AnimatePresence>
                {touched.terms && fieldErrors.terms && (
                  <motion.p className="field-error-msg" style={{ marginTop: '-1rem', marginBottom: '1rem' }}
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {fieldErrors.terms}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="auth-submit"
                id="signup-submit-btn"
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
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── Right Hero Panel ─── */}
      <motion.div
        className="signup-hero"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="signup-floating-shapes">
          <span /><span /><span /><span />
        </div>

        <div className="signup-hero-content">
          <motion.div
            className="signup-hero-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            ✨
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Join the <br />
            <span className="hero-accent">Sparkle Family</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Create your free account and experience the cleanest spaces
            you've ever imagined.
          </motion.p>

          <motion.div
            className="signup-perks"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="perk-item">
              <div className="perk-icon">📅</div>
              <span>Easy online booking & scheduling</span>
            </div>
            <div className="perk-item">
              <div className="perk-icon">💰</div>
              <span>Transparent pricing, no hidden fees</span>
            </div>
            <div className="perk-item">
              <div className="perk-icon">🏆</div>
              <span>Exclusive member rewards & discounts</span>
            </div>
            <div className="perk-item">
              <div className="perk-icon">🔔</div>
              <span>Real-time booking notifications</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

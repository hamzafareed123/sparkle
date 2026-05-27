import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  AlertCircle, CheckCircle2, KeyRound, ShieldCheck,
} from 'lucide-react'
import './ForgotPasswordPage.css'
import '../LoginPage/LoginPage.css'

/* ─── helpers ─── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export function ForgotPasswordPage() {
  const [step, setStep] = useState(1)          // 1 = email, 2 = OTP, 3 = new password
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  /* ── Step 1 – email ── */
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  /* ── Step 2 – OTP ── */
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  /* ── Step 3 – new password ── */
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwErrors, setPwErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({})
  const [pwTouched, setPwTouched] = useState<Record<string, boolean>>({})

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  /* ── Resend timer countdown ── */
  useEffect(() => {
    if (step !== 2) return
    if (resendTimer <= 0) { setCanResend(true); return }
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [step, resendTimer])

  /* ── Step navigation ── */
  const goNext = () => { setDirection(1); setStep((s) => s + 1) }
  const goBack = () => { setDirection(-1); setStep((s) => s - 1) }

  /* ══════ STEP 1: Submit email ══════ */
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setEmailTouched(true)

    if (!email) { setEmailError('Email is required.'); return }
    if (!isValidEmail(email)) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setResendTimer(60)
      setCanResend(false)
      goNext()
    }, 1200)
  }

  /* ══════ STEP 2: OTP handling ══════ */
  const handleOtpChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    setOtp((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    setOtpError('')
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }, [])

  const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }, [otp])

  const handleOtpPaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const digits = pasted.split('')
    setOtp((prev) => {
      const next = [...prev]
      digits.forEach((d, i) => { next[i] = d })
      return next
    })
    const focusIdx = Math.min(digits.length, 5)
    otpRefs.current[focusIdx]?.focus()
  }, [])

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    const code = otp.join('')
    if (code.length < 6) { setOtpError('Please enter the full 6-digit code.'); return }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      goNext()
    }, 1200)
  }

  const handleResend = () => {
    setCanResend(false)
    setResendTimer(60)
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    // Simulate resend
  }

  /* ══════ STEP 3: New password ══════ */
  const validatePw = useCallback(() => {
    const errs: { newPassword?: string; confirmPassword?: string } = {}
    if (!newPassword) errs.newPassword = 'Password is required.'
    else if (newPassword.length < 8) errs.newPassword = 'Must be at least 8 characters.'

    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password.'
    else if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    return errs
  }, [newPassword, confirmPassword])

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setSubmitSuccess(false)
    setPwTouched({ newPassword: true, confirmPassword: true })

    const errs = validatePw()
    setPwErrors(errs)
    if (Object.keys(errs).length > 0) { setFormError('Please fix the errors above.'); return }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmitSuccess(true)
    }, 1500)
  }

  const pwFieldState = (field: 'newPassword' | 'confirmPassword') => {
    if (!pwTouched[field]) return ''
    return pwErrors[field] ? 'has-error' : 'has-success'
  }

  /* ─── render ─── */
  return (
    <div className="forgot-page">
      <div className="forgot-container">
        {/* Step progress */}
        <div className="forgot-steps">
          <div className={`step-circle ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>
            {step > 1 ? <CheckCircle2 size={16} /> : '1'}
          </div>
          <div className={`step-line ${step > 1 ? 'active' : ''}`} />
          <div className={`step-circle ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>
            {step > 2 ? <CheckCircle2 size={16} /> : '2'}
          </div>
          <div className={`step-line ${step > 2 ? 'active' : ''}`} />
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Card */}
        <div className="forgot-card">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ═══════════ STEP 1: Email ═══════════ */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <div className="forgot-header">
                  <div className="forgot-icon">🔑</div>
                  <h2>Forgot Password?</h2>
                  <p>Enter your email address and we'll send you a verification code to reset your password.</p>
                </div>

                <AnimatePresence>
                  {formError && (
                    <motion.div className="auth-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                      <AlertCircle size={16} />{formError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleEmailSubmit} noValidate>
                  <div className={`auth-field ${emailTouched ? (emailError ? 'has-error' : email ? 'has-success' : '') : ''}`}>
                    <label htmlFor="forgot-email">Email Address</label>
                    <div className="auth-input-wrap">
                      <Mail size={18} className="field-icon" />
                      <input
                        type="email"
                        id="forgot-email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailTouched) {
                            if (!e.target.value) setEmailError('Email is required.')
                            else if (!isValidEmail(e.target.value)) setEmailError('Please enter a valid email address.')
                            else setEmailError('')
                          }
                        }}
                        onBlur={() => {
                          setEmailTouched(true)
                          if (!email) setEmailError('Email is required.')
                          else if (!isValidEmail(email)) setEmailError('Please enter a valid email address.')
                          else setEmailError('')
                        }}
                        autoComplete="email"
                        autoFocus
                      />
                      {emailTouched && !emailError && email && (
                        <CheckCircle2 size={18} className="field-valid-icon" />
                      )}
                    </div>
                    <AnimatePresence>
                      {emailTouched && emailError && (
                        <motion.p className="field-error-msg"
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >{emailError}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button type="submit" className="auth-submit" disabled={isLoading} whileTap={{ scale: 0.97 }}>
                    {isLoading ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    ) : (
                      <>Send Verification Code <ArrowRight size={18} /></>
                    )}
                  </motion.button>
                </form>

                <div className="forgot-back">
                  <Link to="/login"><ArrowLeft size={15} /> Back to Sign In</Link>
                </div>
              </motion.div>
            )}

            {/* ═══════════ STEP 2: OTP ═══════════ */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <div className="forgot-header">
                  <div className="forgot-icon">📩</div>
                  <h2>Verify Your Email</h2>
                  <p>We've sent a 6-digit code to your email</p>
                  <div className="email-chip"><Mail size={14} /> {email}</div>
                </div>

                <AnimatePresence>
                  {formError && (
                    <motion.div className="auth-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                      <AlertCircle size={16} />{formError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleOtpSubmit} noValidate>
                  <div className="otp-group" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className={`otp-input ${digit ? 'has-value' : ''} ${otpError ? 'otp-error' : ''}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        autoFocus={i === 0}
                        aria-label={`Digit ${i + 1}`}
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {otpError && (
                      <motion.p className="field-error-msg" style={{ textAlign: 'center', marginBottom: '1rem' }}
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >{otpError}</motion.p>
                    )}
                  </AnimatePresence>

                  <div className="otp-resend">
                    {canResend ? (
                      <>Didn't receive the code? <button type="button" onClick={handleResend}>Resend Code</button></>
                    ) : (
                      <span className="otp-timer">Resend code in <strong>{resendTimer}s</strong></span>
                    )}
                  </div>

                  <motion.button type="submit" className="auth-submit" disabled={isLoading} whileTap={{ scale: 0.97 }}>
                    {isLoading ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    ) : (
                      <>Verify Code <ShieldCheck size={18} /></>
                    )}
                  </motion.button>
                </form>

                <div className="forgot-back">
                  <button type="button" onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'inherit' }}>
                    <ArrowLeft size={15} /> Change Email
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════ STEP 3: New Password ═══════════ */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                <div className="forgot-header">
                  <div className="forgot-icon">{submitSuccess ? '🎉' : '🔐'}</div>
                  <h2>{submitSuccess ? 'Password Reset!' : 'Create New Password'}</h2>
                  <p>{submitSuccess ? 'Your password has been successfully updated.' : 'Choose a strong password to secure your account.'}</p>
                </div>

                {submitSuccess ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="auth-success" style={{ marginBottom: '1.5rem' }}>
                      <CheckCircle2 size={16} /> You can now sign in with your new password.
                    </div>
                    <Link to="/login">
                      <motion.button type="button" className="auth-submit" whileTap={{ scale: 0.97 }}>
                        Go to Sign In <ArrowRight size={18} />
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <AnimatePresence>
                      {formError && (
                        <motion.div className="auth-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                          <AlertCircle size={16} />{formError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handlePwSubmit} noValidate>
                      <div className={`auth-field ${pwFieldState('newPassword')}`}>
                        <label htmlFor="new-password">New Password</label>
                        <div className="auth-input-wrap">
                          <KeyRound size={18} className="field-icon" />
                          <input
                            type={showNew ? 'text' : 'password'}
                            id="new-password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value)
                              if (pwTouched.newPassword) {
                                const errs = { ...pwErrors }
                                if (!e.target.value) errs.newPassword = 'Password is required.'
                                else if (e.target.value.length < 8) errs.newPassword = 'Must be at least 8 characters.'
                                else delete errs.newPassword
                                if (pwTouched.confirmPassword && confirmPassword && e.target.value !== confirmPassword) errs.confirmPassword = 'Passwords do not match.'
                                else if (pwTouched.confirmPassword && confirmPassword) delete errs.confirmPassword
                                setPwErrors(errs)
                                if (Object.keys(errs).length === 0) setFormError('')
                              }
                            }}
                            onBlur={() => { setPwTouched((p) => ({ ...p, newPassword: true })); setPwErrors(validatePw()) }}
                            autoComplete="new-password"
                            autoFocus
                          />
                          <button type="button" className="password-toggle" onClick={() => setShowNew(!showNew)} aria-label={showNew ? 'Hide' : 'Show'}>
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {pwTouched.newPassword && pwErrors.newPassword && (
                            <motion.p className="field-error-msg" initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -6, height: 0 }} transition={{ duration: 0.25 }}>
                              {pwErrors.newPassword}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className={`auth-field ${pwFieldState('confirmPassword')}`}>
                        <label htmlFor="confirm-new-password">Confirm Password</label>
                        <div className="auth-input-wrap">
                          <Lock size={18} className="field-icon" />
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            id="confirm-new-password"
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value)
                              if (pwTouched.confirmPassword) {
                                const errs = { ...pwErrors }
                                if (!e.target.value) errs.confirmPassword = 'Please confirm your password.'
                                else if (newPassword !== e.target.value) errs.confirmPassword = 'Passwords do not match.'
                                else delete errs.confirmPassword
                                setPwErrors(errs)
                                if (Object.keys(errs).length === 0) setFormError('')
                              }
                            }}
                            onBlur={() => { setPwTouched((p) => ({ ...p, confirmPassword: true })); setPwErrors(validatePw()) }}
                            autoComplete="new-password"
                          />
                          <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? 'Hide' : 'Show'}>
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {pwTouched.confirmPassword && pwErrors.confirmPassword && (
                            <motion.p className="field-error-msg" initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -6, height: 0 }} transition={{ duration: 0.25 }}>
                              {pwErrors.confirmPassword}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button type="submit" className="auth-submit" disabled={isLoading} whileTap={{ scale: 0.97 }}>
                        {isLoading ? (
                          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                        ) : (
                          <>Reset Password <ArrowRight size={18} /></>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}

                {!submitSuccess && (
                  <div className="forgot-back">
                    <Link to="/login"><ArrowLeft size={15} /> Back to Sign In</Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

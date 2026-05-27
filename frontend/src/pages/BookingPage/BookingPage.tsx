import { useState, useMemo, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Calendar, Loader2, CheckCircle2, Leaf, Mail } from 'lucide-react'
import { bookingsApi } from '../../api/bookings.api'
import { servicesApi } from '../../api/services.api'
import { paymentsApi } from '../../api/payments.api'
import { StripeCheckout } from '../../components/booking/StripeCheckout'
import { getErrorMessage } from '../../api/axios'
import './BookingPage.css'

type Step = 'form' | 'payment' | 'success'

type PendingBooking = {
  bookingId: string
  email: string
  remainingAmount: number
  serviceType: string
}

const DEPOSIT_PERCENT = 0.5

export function BookingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const preselected = (location.state as { service?: string } | null)?.service ?? ''

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  })

  const [step, setStep] = useState<Step>('form')
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceType, setServiceType] = useState(preselected)
  const [address, setAddress] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')
  const [error, setError] = useState('')

  const [bookingId, setBookingId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
  const [paidAmount, setPaidAmount] = useState(0)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [emailSent, setEmailSent] = useState(true)
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null)
  const [resumeError, setResumeError] = useState('')
  const [isResuming, setIsResuming] = useState(false)
  const [verifyingPayment, setVerifyingPayment] = useState(false)

  const selectedService = useMemo(
    () => services.find((s) => s.name === serviceType),
    [services, serviceType],
  )

  const depositAmount = useMemo(() => {
    if (!selectedService) return 0
    return Math.round(selectedService.price * DEPOSIT_PERCENT * 100) / 100
  }, [selectedService])

  const bookingMutation = useMutation({
    mutationFn: bookingsApi.create,
    onSuccess: async (result) => {
      const id = result.booking._id
      setBookingId(id)
      setEmailSent(result.emailSent ?? true)

      if (depositAmount > 0 && import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        try {
          const intent = await paymentsApi.createIntent(id, depositAmount, 'deposit')
          setClientSecret(intent.clientSecret)
          setPaymentIntentId(intent.paymentIntentId)
          setPaidAmount(depositAmount)
          setStep('payment')
        } catch (err) {
          setError(getErrorMessage(err))
          return
        }
      } else {
        setStep('success')
      }
    },
    onError: (err) => setError(getErrorMessage(err)),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!selectedService) {
      setError('Please select a valid service')
      return
    }
    bookingMutation.mutate({
      customerName,
      email,
      phone,
      serviceType,
      address,
      preferredDate,
      preferredTime,
      specialNotes: specialNotes || undefined,
      price: selectedService?.price ?? 0,
    })
  }

  useEffect(() => {
    const saved = window.localStorage.getItem('sparkle_pending_booking')
    if (saved) {
      try {
        setPendingBooking(JSON.parse(saved))
      } catch {
        window.localStorage.removeItem('sparkle_pending_booking')
      }
    }
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const paymentIntent = query.get('payment_intent')

    if (paymentIntent) {
      const verifyPayment = async () => {
        setVerifyingPayment(true)
        setError('')
        try {
          const result = await paymentsApi.confirmPayment(paymentIntent)
          
          // Clear any pending bookings locally
          window.localStorage.removeItem('sparkle_pending_booking')
          setPendingBooking(null)
          
          // Populate the successful booking details from backend response
          setCustomerName(result.customerName || 'Valued Customer')
          setEmail(result.email || '')
          setPaidAmount(result.amount)
          setServiceType(result.serviceType || '')
          setPaymentComplete(true)
          setStep('success')
          
          // Clean up the URL parameters so a refresh doesn't trigger verification again
          navigate('/book', { replace: true })
        } catch (err) {
          setError(getErrorMessage(err))
        } finally {
          setVerifyingPayment(false)
        }
      }
      verifyPayment()
    }
  }, [location.search, navigate])

  const savePendingBooking = (bookingId: string) => {
    const payload: PendingBooking = {
      bookingId,
      email,
      remainingAmount: depositAmount,
      serviceType,
    }
    window.localStorage.setItem('sparkle_pending_booking', JSON.stringify(payload))
    setPendingBooking(payload)
  }

  const clearPendingBooking = () => {
    window.localStorage.removeItem('sparkle_pending_booking')
    setPendingBooking(null)
  }

  const resumePendingPayment = async () => {
    if (!pendingBooking) return
    setResumeError('')
    setIsResuming(true)
    try {
      const intent = await paymentsApi.createRemainingIntent(pendingBooking.bookingId)
      setClientSecret(intent.clientSecret)
      setPaymentIntentId(intent.paymentIntentId)
      setPaidAmount(intent.amountDue)
      setStep('payment')
      clearPendingBooking()
    } catch (err) {
      setResumeError(getErrorMessage(err))
    } finally {
      setIsResuming(false)
    }
  }

  if (verifyingPayment) {
    return (
      <div className="booking-page container section animate-fade-in">
        <div className="booking-success" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Loader2 className="spin" size={56} color="#3f704d" style={{ margin: '0 auto' }} />
          <h1 style={{ marginTop: '1.5rem', color: 'var(--text-primary)' }}>Verifying Payment...</h1>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Please wait while we confirm your booking. Do not close or refresh this page.
          </p>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="booking-page container section">
        <motion.div
          className="booking-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle2 size={56} color="#3f704d" />
          <h1>{paymentComplete ? 'Payment Successful!' : 'Booking Confirmed!'}</h1>
          <p>
            Thank you, {customerName}. Your appointment request has been received
            {paymentComplete ? ` and your deposit of $${paidAmount.toFixed(2)} was processed.` : '.'}
          </p>
          <p className="booking-email-note">
            <Mail size={18} />
            {emailSent ? (
              <>A confirmation email was sent to <strong>{email}</strong></>
            ) : (
              <>Your booking is confirmed, but we could not send a confirmation email to <strong>{email}</strong>. Please contact support if needed.</>
            )}
          </p>
          <Link to="/" className="booking-btn">
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  if (step === 'payment' && clientSecret) {
    return (
      <div className="booking-page">
        <div className="booking-header container section">
          <h2 className="booking-subtitle">
            Secure Payment
            <Leaf className="leaf-icon" color="#3f704d" />
          </h2>
          <h1>Pay Your Deposit</h1>
          <p>
            Service: <strong>{serviceType}</strong> — 50% deposit to secure your booking.
            Remaining balance due after service.
          </p>
        </div>

        <div className="booking-form container">
          <StripeCheckout
            clientSecret={clientSecret}
            paymentIntentId={paymentIntentId}
            amount={paidAmount}
            paymentLabel="Deposit (50%)"
              onSuccess={() => {
              setPaymentComplete(true)
              setStep('success')
            }}
            onSkip={() => {
              savePendingBooking(bookingId)
              setStep('success')
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <motion.div
        className="booking-header container section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="booking-subtitle">
          Book a Service
          <Leaf className="leaf-icon" color="#3f704d" />
        </h2>
        <h1>Schedule Your Cleaning</h1>
        <p>Fill in the details below. A 50% deposit secures your appointment.</p>
      </motion.div>

      {pendingBooking && (
        <div className="booking-pending-banner">
          <p>
            You have a pending payment for <strong>{pendingBooking.serviceType}</strong>. Pay ${pendingBooking.remainingAmount.toFixed(2)} now to complete your booking.
          </p>
          <button type="button" className="booking-submit" onClick={resumePendingPayment} disabled={isResuming}>
            {isResuming ? 'Preparing payment...' : 'Resume payment'}
          </button>
          {resumeError && <p className="booking-error">{resumeError}</p>}
        </div>
      )}

      <form className="booking-form container" onSubmit={handleSubmit}>
        <div className="booking-grid">
          <label>
            Full Name *
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </label>
          <label>
            Email *
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label>
            Phone *
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={10} />
          </label>
          <label>
            Service *
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s._id} value={s.name}>
                  {s.name} — ${s.price.toFixed(2)} (deposit ${(s.price * DEPOSIT_PERCENT).toFixed(2)})
                </option>
              ))}
            </select>
          </label>
          <label className="full-width">
            Address *
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required minLength={5} />
          </label>
          <label>
            Preferred Date *
            <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required />
          </label>
          <label>
            Preferred Time *
            <input type="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} required />
          </label>
          <label className="full-width">
            Special Notes
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              rows={3}
              placeholder="Any special instructions..."
            />
          </label>
        </div>

        {selectedService && (
          <div className="booking-price-summary">
            <span>Deposit due today (50%)</span>
            <strong>${depositAmount.toFixed(2)}</strong>
          </div>
        )}

        {error && <p className="booking-error">{error}</p>}

        <button type="submit" className="booking-submit" disabled={bookingMutation.isPending}>
          {bookingMutation.isPending ? (
            <>
              <Loader2 className="spin" size={20} /> Submitting...
            </>
          ) : (
            <>
              <Calendar size={20} /> Continue to Payment
            </>
          )}
        </button>
      </form>
    </div>
  )
}

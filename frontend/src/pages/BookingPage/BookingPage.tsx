import { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
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

const DEPOSIT_PERCENT = 0.5

export function BookingPage() {
  const location = useLocation()
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

  const [, setBookingId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
  const [paidAmount, setPaidAmount] = useState(0)
  const [paymentComplete, setPaymentComplete] = useState(false)

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

      if (depositAmount > 0 && import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        try {
          const intent = await paymentsApi.createIntent(id, depositAmount, 'deposit')
          setClientSecret(intent.clientSecret)
          setPaymentIntentId(intent.paymentIntentId)
          setPaidAmount(depositAmount)
          setStep('payment')
        } catch (err) {
          setError(getErrorMessage(err))
          setStep('success')
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
    })
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
            A confirmation email was sent to <strong>{email}</strong>
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
            onSkip={() => setStep('success')}
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

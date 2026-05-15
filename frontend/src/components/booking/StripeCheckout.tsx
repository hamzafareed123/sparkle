import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Loader2, CreditCard } from 'lucide-react'
import { paymentsApi } from '../../api/payments.api'
import { getErrorMessage } from '../../api/axios'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface StripeCheckoutProps {
  clientSecret: string
  paymentIntentId: string
  amount: number
  paymentLabel: string
  onSuccess: () => void
  onSkip?: () => void
}

function CheckoutForm({
  paymentIntentId,
  amount,
  paymentLabel,
  onSuccess,
  onSkip,
}: Omit<StripeCheckoutProps, 'clientSecret'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError('')

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message ?? 'Payment failed')
        setProcessing(false)
        return
      }

      const intentId = paymentIntent?.id ?? paymentIntentId
      await paymentsApi.confirmPayment(intentId)
      onSuccess()
    } catch (err) {
      setError(getErrorMessage(err))
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handlePay} className="stripe-checkout-form">
      <div className="stripe-pay-summary">
        <p className="stripe-pay-label">{paymentLabel}</p>
        <p className="stripe-pay-amount">${amount.toFixed(2)}</p>
      </div>

      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {error && <p className="booking-error">{error}</p>}

      <button type="submit" className="booking-submit" disabled={!stripe || processing}>
        {processing ? (
          <>
            <Loader2 className="spin" size={20} /> Processing...
          </>
        ) : (
          <>
            <CreditCard size={20} /> Pay ${amount.toFixed(2)}
          </>
        )}
      </button>

      {onSkip && (
        <button type="button" className="booking-skip-pay" onClick={onSkip} disabled={processing}>
          Pay later — I&apos;ll confirm by email
        </button>
      )}
    </form>
  )
}

export function StripeCheckout(props: StripeCheckoutProps) {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

  if (!publishableKey) {
    return (
      <div className="stripe-missing-key">
        <p>Stripe is not configured. Add VITE_STRIPE_PUBLISHABLE_KEY to frontend/.env</p>
        {props.onSkip && (
          <button type="button" className="booking-skip-pay" onClick={props.onSkip}>
            Continue without payment
          </button>
        )}
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#3f704d',
            borderRadius: '12px',
          },
        },
      }}
    >
      <CheckoutForm
        paymentIntentId={props.paymentIntentId}
        amount={props.amount}
        paymentLabel={props.paymentLabel}
        onSuccess={props.onSuccess}
        onSkip={props.onSkip}
      />
    </Elements>
  )
}

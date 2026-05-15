import Stripe from 'stripe'
import { paymentRepositories } from './payment.repositories'
import { bookingRepositories } from '../bookings/booking.repositories'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'
import { env } from '../../config/env'

const stripe = new Stripe(env.stripe.secretKey, { apiVersion: '2024-04-10' })

export const paymentServices = {
  createIntent: async (bookingId: string, amount: number, paymentType: 'deposit' | 'full' = 'deposit') => {
    const booking = await bookingRepositories.findById(bookingId)
    if (!booking) throw new CustomError(ERROR_MESSAGES.BOOKING_NOT_FOUND, STATUS_CODE.NOT_FOUND)

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { bookingId, paymentType },
      automatic_payment_methods: { enabled: true },
    })
    return { clientSecret: intent.client_secret, paymentIntentId: intent.id }
  },

  handleWebhook: async (rawBody: Buffer, sig: string) => {
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, env.stripe.webhookSecret)
    } catch {
      throw new CustomError(ERROR_MESSAGES.WEBHOOK_SIGNATURE_FAILED, STATUS_CODE.BAD_REQUEST)
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent
      await paymentServices.confirmPayment(intent.id)
    }
  },

  confirmPayment: async (paymentIntentId: string) => {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId)
    if (intent.status !== 'succeeded') {
      throw new CustomError('Payment has not been completed yet', STATUS_CODE.BAD_REQUEST)
    }

    const bookingId = intent.metadata.bookingId
    if (!bookingId) {
      throw new CustomError('Invalid payment: missing booking reference', STATUS_CODE.BAD_REQUEST)
    }

    const existing = await paymentRepositories.findByStripeId(intent.id)
    if (existing) {
      return { alreadyProcessed: true, bookingId }
    }

    const amount = intent.amount / 100
    const isFullPayment = intent.metadata.paymentType === 'full'
    const paymentStatus = isFullPayment ? 'FULLY_PAID' : 'DEPOSIT_PAID'

    await bookingRepositories.updatePayment(bookingId, {
      paymentStatus,
      amountPaid: amount,
    })
    await paymentRepositories.create({
      bookingId,
      stripePaymentId: intent.id,
      amount,
      status: paymentStatus,
    })

    return { alreadyProcessed: false, bookingId, paymentStatus, amount }
  },

  getAll: () => paymentRepositories.findAll(),

  refund: async (id: string) => {
    const payment = await paymentRepositories.findById(id)
    if (!payment) throw new CustomError(ERROR_MESSAGES.PAYMENT_NOT_FOUND, STATUS_CODE.NOT_FOUND)

    await stripe.refunds.create({ payment_intent: payment.stripePaymentId })
    await paymentRepositories.updateStatus(id, 'REFUNDED')
    await bookingRepositories.updatePayment(payment.bookingId.toString(), { paymentStatus: 'REFUNDED' })
  },
}

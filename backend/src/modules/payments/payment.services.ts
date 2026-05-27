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

  createRemainingIntent: async (bookingId: string) => {
    const booking = await bookingRepositories.findById(bookingId)
    if (!booking) throw new CustomError(ERROR_MESSAGES.BOOKING_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    if (booking.paymentStatus === 'FULLY_PAID') {
      throw new CustomError('Booking is already fully paid', STATUS_CODE.BAD_REQUEST)
    }
    const price = booking.price
    if (!price) {
      throw new CustomError('Booking price is not available', STATUS_CODE.BAD_REQUEST)
    }
    const amountDue = price - (booking.amountPaid ?? 0)
    if (amountDue <= 0) {
      throw new CustomError('No remaining payment is due', STATUS_CODE.BAD_REQUEST)
    }

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amountDue * 100),
      currency: 'usd',
      metadata: { bookingId, paymentType: 'remaining' },
      automatic_payment_methods: { enabled: true },
    })
    return { clientSecret: intent.client_secret, paymentIntentId: intent.id, amountDue }
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

    const booking = await bookingRepositories.findById(bookingId)
    if (!booking) {
      throw new CustomError('Booking not found', STATUS_CODE.NOT_FOUND)
    }

    const existing = await paymentRepositories.findByStripeId(intent.id)
    if (existing) {
      return {
        alreadyProcessed: true,
        bookingId,
        paymentStatus: booking.paymentStatus,
        amount: existing.amount,
        customerName: booking.customerName,
        email: booking.email,
        serviceType: booking.serviceType,
      }
    }

    const amount = intent.amount / 100
    const paymentType = intent.metadata.paymentType
    const isFullPayment = paymentType === 'full' || paymentType === 'remaining'
    const paymentStatus = isFullPayment ? 'FULLY_PAID' : 'DEPOSIT_PAID'

    const currentPaid = booking.amountPaid || 0
    const newAmountPaid = currentPaid + amount

    let paymentDoc
    const existingPaymentForBooking = await paymentRepositories.findByBookingId(bookingId)

    if (existingPaymentForBooking) {
      existingPaymentForBooking.stripePaymentId = intent.id
      existingPaymentForBooking.amount = newAmountPaid
      existingPaymentForBooking.status = paymentStatus
      paymentDoc = await existingPaymentForBooking.save()
    } else {
      paymentDoc = await paymentRepositories.create({
        bookingId,
        stripePaymentId: intent.id,
        amount,
        status: paymentStatus,
      })
    }

    await bookingRepositories.updatePayment(bookingId, {
      paymentStatus,
      amountPaid: newAmountPaid,
      payment: paymentDoc._id,
    })

    return {
      alreadyProcessed: false,
      bookingId,
      paymentStatus,
      amount,
      customerName: booking.customerName,
      email: booking.email,
      serviceType: booking.serviceType,
    }
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

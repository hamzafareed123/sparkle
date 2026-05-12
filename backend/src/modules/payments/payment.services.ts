import Stripe from 'stripe'
import { paymentRepositories } from './payment.repositories'
import { bookingRepositories } from '../bookings/booking.repositories'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'
import { env } from '../../config/env'

const stripe = new Stripe(env.stripe.secretKey, { apiVersion: '2024-04-10' })

export const paymentServices = {
  createIntent: async (bookingId: string, amount: number) => {
    const booking = await bookingRepositories.findById(bookingId)
    if (!booking) throw new CustomError(ERROR_MESSAGES.BOOKING_NOT_FOUND, STATUS_CODE.NOT_FOUND)

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { bookingId },
    })
    return { clientSecret: intent.client_secret }
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
      const bookingId = intent.metadata.bookingId
      await bookingRepositories.updatePayment(bookingId, { paymentStatus: 'DEPOSIT_PAID', amountPaid: intent.amount / 100 })
      await paymentRepositories.create({ bookingId, stripePaymentId: intent.id, amount: intent.amount / 100, status: 'DEPOSIT_PAID' })
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

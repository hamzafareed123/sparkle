import mongoose, { Schema } from 'mongoose'
import { IPayment } from '../types'

const paymentSchema = new Schema<IPayment>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
    stripePaymentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, enum: ['UNPAID', 'DEPOSIT_PAID', 'FULLY_PAID', 'REFUNDED'], required: true },
  },
  { timestamps: true }
)

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema)

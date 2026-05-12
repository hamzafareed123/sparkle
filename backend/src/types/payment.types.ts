import { Document, Types } from 'mongoose'

export interface IPayment extends Document {
  bookingId: Types.ObjectId
  stripePaymentId: string
  amount: number
  currency: string
  status: 'UNPAID' | 'DEPOSIT_PAID' | 'FULLY_PAID' | 'REFUNDED'
  createdAt: Date
}

import mongoose, { Schema } from 'mongoose'
import { IBooking } from '../types'

const bookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    address: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    specialNotes: { type: String },
    status: { type: String, enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
    paymentStatus: { type: String, enum: ['UNPAID', 'DEPOSIT_PAID', 'FULLY_PAID', 'REFUNDED'], default: 'UNPAID' },
    amountPaid: { type: Number },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
)

export const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema)

import { Document, Types } from 'mongoose'

export interface IBooking extends Document {
  customerName: string
  email: string
  phone: string
  serviceType: string
  address: string
  preferredDate: Date
  preferredTime: string
  specialNotes?: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'UNPAID' | 'DEPOSIT_PAID' | 'FULLY_PAID' | 'REFUNDED'
  amountPaid?: number
  price: number
  payment?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface ICreateBooking {
  customerName: string
  email: string
  phone: string
  serviceType: string
  address: string
  preferredDate: string
  preferredTime: string
  specialNotes?: string
}

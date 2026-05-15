export interface User {
  id: string
  email: string
  role: string
  createdAt?: string
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
export type PaymentStatus = 'UNPAID' | 'DEPOSIT_PAID' | 'FULLY_PAID' | 'REFUNDED'

export interface Booking {
  _id: string
  customerName: string
  email: string
  phone: string
  serviceType: string
  address: string
  preferredDate: string
  preferredTime: string
  specialNotes?: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  amountPaid?: number
  payment?: string
  createdAt: string
  updatedAt?: string
}

export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface Service {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  duration: string
  image?: string
  isActive: boolean
  createdAt: string
}

export interface Testimonial {
  _id: string
  name: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
}

export interface Payment {
  _id: string
  bookingId: string | Booking
  stripePaymentId: string
  amount: number
  currency: string
  status: PaymentStatus
  createdAt: string
}

export interface AdminStats {
  bookings: {
    total: number
    pending: number
    confirmed: number
    completed: number
    cancelled: number
  }
  contacts: { total: number; unread: number }
  testimonials: { pending: number }
  users: { total: number }
  revenue: { total: number }
  recentBookings: Booking[]
}

export interface BookingsResponse {
  bookings: Booking[]
  total: number
  page: number
  pages: number
}

export interface ApiWrapper<T> {
  success: boolean
  data: T
}

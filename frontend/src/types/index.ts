export interface Service {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  duration: string
  image?: string
  isActive: boolean
  createdAt?: string
}

export interface Testimonial {
  _id: string
  name: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
}

export interface User {
  id: string
  email: string
  role: string
}

export interface BookingInput {
  customerName: string
  email: string
  phone: string
  serviceType: string
  address: string
  preferredDate: string
  preferredTime: string
  specialNotes?: string
}

export interface ContactInput {
  name: string
  email: string
  phone?: string
  message: string
}

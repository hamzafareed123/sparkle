import { z } from 'zod'

export const createBookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  serviceType: z.string().min(1, 'Service type is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  preferredDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  specialNotes: z.string().optional(),
  price: z.number().positive('Service price is required'),
})

export const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
})

import mongoose, { Schema } from 'mongoose'

export interface ITestimonial {
  name: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: Date
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const TestimonialModel = mongoose.model<ITestimonial>('Testimonial', testimonialSchema)

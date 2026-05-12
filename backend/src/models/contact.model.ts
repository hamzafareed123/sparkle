import mongoose, { Schema } from 'mongoose'
import { IContact } from '../types'

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const ContactModel = mongoose.model<IContact>('Contact', contactSchema)

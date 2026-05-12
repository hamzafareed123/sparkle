import mongoose, { Schema } from 'mongoose'
import { IService } from '../types'

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const ServiceModel = mongoose.model<IService>('Service', serviceSchema)

import { Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  role: 'ADMIN' | 'SUPER_ADMIN'
  createdAt: Date
  updatedAt: Date
  comparePassword(candidate: string): Promise<boolean>
}

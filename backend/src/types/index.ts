export * from './user.types'
export * from './booking.types'
export * from './contact.types'
export * from './service.types'
export * from './payment.types'

// Express Request augmentation
import { IUser } from './user.types'

declare module 'express' {
  interface Request {
    user?: IUser
  }
}

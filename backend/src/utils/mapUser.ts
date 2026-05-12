import { IUser } from '../types'

export const mapUser = (user: IUser) => ({
  id: user._id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
})

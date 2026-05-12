import { UserModel } from '../../models'
import { IUser } from '../../types'

export const authRepositories = {
  findByEmail: (email: string) =>
    UserModel.findOne({ email }).select('+password'),

  findById: (id: string) =>
    UserModel.findById(id),

  create: (data: { email: string; password: string }) =>
    UserModel.create(data),
}

import { authRepositories } from './auth.repositories'
import { generateToken } from '../../utils/generateToken'
import { mapUser } from '../../utils/mapUser'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'

export const authServices = {
  register: async (email: string, password: string) => {
    const existing = await authRepositories.findByEmail(email)
    if (existing) throw new CustomError(ERROR_MESSAGES.EMAIL_IN_USE, STATUS_CODE.CONFLICT)

    const user = await authRepositories.create({ email, password })
    const token = generateToken(user._id.toString())
    return { token, user: mapUser(user) }
  },

  login: async (email: string, password: string) => {
    const user = await authRepositories.findByEmail(email)
    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED)
    }
    const token = generateToken(user._id.toString())
    return { token, user: mapUser(user) }
  },

  getMe: async (id: string) => {
    const user = await authRepositories.findById(id)
    if (!user) throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return mapUser(user)
  },
}

import { Request, Response } from 'express'
import { authServices } from './auth.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'
import { SUCCESS_MESSAGES } from '../../constants/successMessages'

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const data = await authServices.register(email, password)
    res.status(STATUS_CODE.CREATED).json({ message: SUCCESS_MESSAGES.REGISTER_SUCCESS, ...data })
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const data = await authServices.login(email, password)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.LOGIN_SUCCESS, ...data })
  }),

  getMe: asyncHandler(async (req: Request, res: Response) => {
    const user = await authServices.getMe(req.user!._id.toString())
    res.status(STATUS_CODE.OK).json({ user })
  }),
}

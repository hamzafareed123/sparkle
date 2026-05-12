import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/generateToken'
import { UserModel } from '../models'
import { STATUS_CODE } from '../constants/statusCode'
import { ERROR_MESSAGES } from '../constants/errorMessages'

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGES.NOT_AUTHORIZED })

    const decoded = verifyToken(token)
    const user = await UserModel.findById(decoded.id).select('+password')
    if (!user) return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGES.USER_NOT_FOUND })

    req.user = user
    next()
  } catch {
    res.status(STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_TOKEN })
  }
}

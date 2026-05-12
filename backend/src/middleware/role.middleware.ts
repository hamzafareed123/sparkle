import { Request, Response, NextFunction } from 'express'
import { STATUS_CODE } from '../constants/statusCode'
import { ERROR_MESSAGES } from '../constants/errorMessages'

export const restrictTo = (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(STATUS_CODE.FORBIDDEN).json({ message: ERROR_MESSAGES.NO_PERMISSION })
    }
    next()
  }

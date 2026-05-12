import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { STATUS_CODE } from '../constants/statusCode'
import { ERROR_MESSAGES } from '../constants/errorMessages'

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        errors: result.error.flatten().fieldErrors,
      })
    }
    req.body = result.data
    next()
  }

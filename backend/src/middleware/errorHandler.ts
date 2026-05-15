import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { CustomError } from '../utils/customError'
import { STATUS_CODE } from '../constants/statusCode'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err.message)

  if (err instanceof multer.MulterError) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ success: false, message: err.message })
  }

  if (err.message?.includes('Only image')) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ success: false, message: err.message })
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ success: false, message: err.message })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(STATUS_CODE.CONFLICT).json({ success: false, message: `${field} already exists` })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e: any) => e.message)
    return res.status(STATUS_CODE.BAD_REQUEST).json({ success: false, message: messages.join(', ') })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: 'Invalid token' })
  }

  res.status(STATUS_CODE.INTERNAL_SERVER).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

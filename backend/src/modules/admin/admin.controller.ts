import { Request, Response } from 'express'
import { adminServices } from './admin.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'

export const adminController = {
  getDashboardStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await adminServices.getDashboardStats()
    res.status(STATUS_CODE.OK).json({ stats })
  }),
}

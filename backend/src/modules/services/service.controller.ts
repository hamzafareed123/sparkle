import { Request, Response } from 'express'
import { serviceServices } from './service.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'
import { SUCCESS_MESSAGES } from '../../constants/successMessages'
import { parseServiceBody } from '../../utils/parseServiceBody'

export const serviceController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const services = await serviceServices.getAllPublic()
    res.status(STATUS_CODE.OK).json({ services })
  }),

  getAllForAdmin: asyncHandler(async (req: Request, res: Response) => {
    const services = await serviceServices.getAllAdmin()
    res.status(STATUS_CODE.OK).json({ services })
  }),

  getBySlug: asyncHandler(async (req: Request, res: Response) => {
    const service = await serviceServices.getBySlug(req.params.slug)
    res.status(STATUS_CODE.OK).json({ service })
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = parseServiceBody(req)
    const service = await serviceServices.create(data)
    res.status(STATUS_CODE.CREATED).json({ message: SUCCESS_MESSAGES.SERVICE_CREATED, service })
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const data = parseServiceBody(req, true)
    const service = await serviceServices.update(req.params.id, data)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.SERVICE_UPDATED, service })
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await serviceServices.delete(req.params.id)
    res.status(STATUS_CODE.NO_CONTENT).send()
  }),
}

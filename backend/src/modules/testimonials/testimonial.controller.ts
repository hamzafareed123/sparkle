import { Request, Response } from 'express'
import { testimonialServices } from './testimonial.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'
import { SUCCESS_MESSAGES } from '../../constants/successMessages'

export const testimonialController = {
  submit: asyncHandler(async (req: Request, res: Response) => {
    const t = await testimonialServices.submit(req.body)
    res.status(STATUS_CODE.CREATED).json({ message: SUCCESS_MESSAGES.TESTIMONIAL_SUBMITTED, testimonial: t })
  }),

  getApproved: asyncHandler(async (req: Request, res: Response) => {
    const testimonials = await testimonialServices.getApproved()
    res.status(STATUS_CODE.OK).json({ testimonials })
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const testimonials = await testimonialServices.getAll()
    res.status(STATUS_CODE.OK).json({ testimonials })
  }),

  approve: asyncHandler(async (req: Request, res: Response) => {
    const t = await testimonialServices.approve(req.params.id)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.TESTIMONIAL_APPROVED, testimonial: t })
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await testimonialServices.delete(req.params.id)
    res.status(STATUS_CODE.NO_CONTENT).send()
  }),
}

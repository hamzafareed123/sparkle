import { Request, Response } from 'express'
import { contactServices } from './contact.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'
import { SUCCESS_MESSAGES } from '../../constants/successMessages'

export const contactController = {
  submit: asyncHandler(async (req: Request, res: Response) => {
    const contact = await contactServices.submit(req.body)
    res.status(STATUS_CODE.CREATED).json({ message: SUCCESS_MESSAGES.CONTACT_SUBMITTED, contact })
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const contacts = await contactServices.getAll()
    res.status(STATUS_CODE.OK).json({ contacts })
  }),

  markAsRead: asyncHandler(async (req: Request, res: Response) => {
    const contact = await contactServices.markAsRead(req.params.id)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.CONTACT_MARKED_READ, contact })
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await contactServices.delete(req.params.id)
    res.status(STATUS_CODE.NO_CONTENT).send()
  }),
}

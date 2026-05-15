import { Request, Response } from 'express'
import { paymentServices } from './payment.services'
import { asyncHandler } from '../../utils/asyncHandler'
import { STATUS_CODE } from '../../constants/statusCode'
import { SUCCESS_MESSAGES } from '../../constants/successMessages'

export const paymentController = {
  createIntent: asyncHandler(async (req: Request, res: Response) => {
    const { bookingId, amount, paymentType } = req.body
    const data = await paymentServices.createIntent(bookingId, amount, paymentType)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.PAYMENT_INTENT_CREATED, ...data })
  }),

  confirmPayment: asyncHandler(async (req: Request, res: Response) => {
    const { paymentIntentId } = req.body
    const result = await paymentServices.confirmPayment(paymentIntentId)
    res.status(STATUS_CODE.OK).json({ message: 'Payment confirmed', ...result })
  }),

  webhook: async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string
    try {
      await paymentServices.handleWebhook(req.body as Buffer, sig)
      res.json({ received: true })
    } catch (err: any) {
      res.status(STATUS_CODE.BAD_REQUEST).json({ message: err.message })
    }
  },

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const payments = await paymentServices.getAll()
    res.status(STATUS_CODE.OK).json({ payments })
  }),

  refund: asyncHandler(async (req: Request, res: Response) => {
    await paymentServices.refund(req.params.id)
    res.status(STATUS_CODE.OK).json({ message: SUCCESS_MESSAGES.REFUND_SUCCESS })
  }),
}

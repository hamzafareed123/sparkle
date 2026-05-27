import { PaymentModel } from '../../models'

export const paymentRepositories = {
  create: (data: object) => PaymentModel.create(data),
  findAll: () => PaymentModel.find().populate('bookingId').sort({ createdAt: -1 }),
  findById: (id: string) => PaymentModel.findById(id),
  findByStripeId: (stripePaymentId: string) => PaymentModel.findOne({ stripePaymentId }),
  findByBookingId: (bookingId: string) => PaymentModel.findOne({ bookingId }),
  updateStatus: (id: string, status: string) => PaymentModel.findByIdAndUpdate(id, { status }, { new: true }),
}

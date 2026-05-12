import { BookingModel } from '../../models'
import { ICreateBooking } from '../../types'

export const bookingRepositories = {
  create: (data: ICreateBooking) =>
    BookingModel.create({ ...data, preferredDate: new Date(data.preferredDate) }),

  findAll: (filter: object, skip: number, limit: number) =>
    BookingModel.find(filter).populate('payment').sort({ createdAt: -1 }).skip(skip).limit(limit),

  count: (filter: object) => BookingModel.countDocuments(filter),

  findById: (id: string) => BookingModel.findById(id).populate('payment'),

  updateStatus: (id: string, status: string) =>
    BookingModel.findByIdAndUpdate(id, { status }, { new: true }),

  updatePayment: (id: string, data: object) =>
    BookingModel.findByIdAndUpdate(id, data, { new: true }),

  delete: (id: string) => BookingModel.findByIdAndDelete(id),
}

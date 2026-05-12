import { BookingModel, ContactModel, PaymentModel, TestimonialModel, UserModel } from '../../models'

export const adminRepositories = {
  totalBookings: () => BookingModel.countDocuments(),
  pendingBookings: () => BookingModel.countDocuments({ status: 'PENDING' }),
  confirmedBookings: () => BookingModel.countDocuments({ status: 'CONFIRMED' }),
  completedBookings: () => BookingModel.countDocuments({ status: 'COMPLETED' }),
  cancelledBookings: () => BookingModel.countDocuments({ status: 'CANCELLED' }),
  totalContacts: () => ContactModel.countDocuments(),
  unreadContacts: () => ContactModel.countDocuments({ isRead: false }),
  pendingTestimonials: () => TestimonialModel.countDocuments({ isApproved: false }),
  totalUsers: () => UserModel.countDocuments(),
  revenuePayments: () => PaymentModel.find({ status: { $in: ['DEPOSIT_PAID', 'FULLY_PAID'] } }),
  recentBookings: () => BookingModel.find().sort({ createdAt: -1 }).limit(5),
}

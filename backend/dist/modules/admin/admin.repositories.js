"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositories = void 0;
const models_1 = require("../../models");
exports.adminRepositories = {
    totalBookings: () => models_1.BookingModel.countDocuments(),
    pendingBookings: () => models_1.BookingModel.countDocuments({ status: 'PENDING' }),
    confirmedBookings: () => models_1.BookingModel.countDocuments({ status: 'CONFIRMED' }),
    completedBookings: () => models_1.BookingModel.countDocuments({ status: 'COMPLETED' }),
    cancelledBookings: () => models_1.BookingModel.countDocuments({ status: 'CANCELLED' }),
    totalContacts: () => models_1.ContactModel.countDocuments(),
    unreadContacts: () => models_1.ContactModel.countDocuments({ isRead: false }),
    pendingTestimonials: () => models_1.TestimonialModel.countDocuments({ isApproved: false }),
    totalUsers: () => models_1.UserModel.countDocuments(),
    revenuePayments: () => models_1.PaymentModel.find({ status: { $in: ['DEPOSIT_PAID', 'FULLY_PAID'] } }),
    recentBookings: () => models_1.BookingModel.find().sort({ createdAt: -1 }).limit(5),
};
//# sourceMappingURL=admin.repositories.js.map
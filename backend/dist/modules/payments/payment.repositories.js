"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRepositories = void 0;
const models_1 = require("../../models");
exports.paymentRepositories = {
    create: (data) => models_1.PaymentModel.create(data),
    findAll: () => models_1.PaymentModel.find().populate('bookingId').sort({ createdAt: -1 }),
    findById: (id) => models_1.PaymentModel.findById(id),
    findByStripeId: (stripePaymentId) => models_1.PaymentModel.findOne({ stripePaymentId }),
    findByBookingId: (bookingId) => models_1.PaymentModel.findOne({ bookingId }),
    updateStatus: (id, status) => models_1.PaymentModel.findByIdAndUpdate(id, { status }, { new: true }),
};
//# sourceMappingURL=payment.repositories.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRepositories = void 0;
const models_1 = require("../../models");
exports.bookingRepositories = {
    create: (data) => models_1.BookingModel.create({ ...data, preferredDate: new Date(data.preferredDate) }),
    findAll: (filter, skip, limit) => models_1.BookingModel.find(filter).populate('payment').sort({ createdAt: -1 }).skip(skip).limit(limit),
    count: (filter) => models_1.BookingModel.countDocuments(filter),
    findById: (id) => models_1.BookingModel.findById(id).populate('payment'),
    updateStatus: (id, status) => models_1.BookingModel.findByIdAndUpdate(id, { status }, { new: true }),
    updatePayment: (id, data) => models_1.BookingModel.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => models_1.BookingModel.findByIdAndDelete(id),
};
//# sourceMappingURL=booking.repositories.js.map
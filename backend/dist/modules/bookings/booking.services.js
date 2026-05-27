"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const booking_repositories_1 = require("./booking.repositories");
const sendBookingEmail_1 = require("../../email/sendBookingEmail");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
const config_1 = require("../../config/config");
exports.bookingServices = {
    create: async (data) => {
        const booking = await booking_repositories_1.bookingRepositories.create(data);
        let emailSent = true;
        try {
            await (0, sendBookingEmail_1.sendBookingConfirmation)(booking.email, booking.customerName, booking._id.toString(), booking.serviceType, booking.preferredDate.toDateString(), booking.preferredTime);
        }
        catch (e) {
            console.warn("Email failed:", e);
            emailSent = false;
        }
        return { booking, emailSent };
    },
    getAll: async (status, page = config_1.PAGINATION.DEFAULT_PAGE, limit = config_1.PAGINATION.DEFAULT_LIMIT) => {
        const filter = status ? { status } : {};
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            booking_repositories_1.bookingRepositories.findAll(filter, skip, limit),
            booking_repositories_1.bookingRepositories.count(filter),
        ]);
        return { bookings, total, page, pages: Math.ceil(total / limit) };
    },
    getById: async (id) => {
        const booking = await booking_repositories_1.bookingRepositories.findById(id);
        if (!booking)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.BOOKING_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return booking;
    },
    updateStatus: async (id, status) => {
        const booking = await booking_repositories_1.bookingRepositories.updateStatus(id, status);
        if (!booking)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.BOOKING_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return booking;
    },
    delete: async (id) => {
        const booking = await booking_repositories_1.bookingRepositories.delete(id);
        if (!booking)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.BOOKING_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    },
};
//# sourceMappingURL=booking.services.js.map
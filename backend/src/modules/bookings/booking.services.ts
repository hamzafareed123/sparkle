import { bookingRepositories } from "./booking.repositories";
import { sendBookingConfirmation } from "../../email/sendBookingEmail";
import { CustomError } from "../../utils/customError";
import { STATUS_CODE } from "../../constants/statusCode";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { ICreateBooking } from "../../types";
import { PAGINATION } from "../../config/config";

export const bookingServices = {
  create: async (data: ICreateBooking) => {
    const booking = await bookingRepositories.create(data);
    try {
      await sendBookingConfirmation(
        booking.email,
        booking.customerName,
        booking._id.toString(),
        booking.serviceType,
        booking.preferredDate.toDateString(),
        booking.preferredTime,
      );
    } catch (e) {
      console.warn("Email failed:", e);
    }
    return booking;
  },

  getAll: async (
    status?: string,
    page: number = PAGINATION.DEFAULT_PAGE,
    limit: number = PAGINATION.DEFAULT_LIMIT,
  ) => {
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      bookingRepositories.findAll(filter, skip, limit),
      bookingRepositories.count(filter),
    ]);
    return { bookings, total, page, pages: Math.ceil(total / limit) };
  },

  getById: async (id: string) => {
    const booking = await bookingRepositories.findById(id);
    if (!booking)
      throw new CustomError(
        ERROR_MESSAGES.BOOKING_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    return booking;
  },

  updateStatus: async (id: string, status: string) => {
    const booking = await bookingRepositories.updateStatus(id, status);
    if (!booking)
      throw new CustomError(
        ERROR_MESSAGES.BOOKING_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    return booking;
  },

  delete: async (id: string) => {
    const booking = await bookingRepositories.delete(id);
    if (!booking)
      throw new CustomError(
        ERROR_MESSAGES.BOOKING_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
  },
};

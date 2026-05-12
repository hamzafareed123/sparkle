import { Request, Response } from "express";
import { bookingServices } from "./booking.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { STATUS_CODE } from "../../constants/statusCode";
import { SUCCESS_MESSAGES } from "../../constants/successMessages";

export const bookingController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const booking = await bookingServices.create(req.body);
    res
      .status(STATUS_CODE.CREATED)
      .json({ message: SUCCESS_MESSAGES.BOOKING_CREATED, booking });
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as string | undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const data = await bookingServices.getAll(status, page, limit);
    res.status(STATUS_CODE.OK).json(data);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const booking = await bookingServices.getById(req.params.id);
    res.status(STATUS_CODE.OK).json({ booking });
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    const booking = await bookingServices.updateStatus(
      req.params.id,
      req.body.status,
    );
    res
      .status(STATUS_CODE.OK)
      .json({ message: SUCCESS_MESSAGES.BOOKING_STATUS_UPDATED, booking });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    await bookingServices.delete(req.params.id);
    res.status(STATUS_CODE.NO_CONTENT).send();
  }),
};

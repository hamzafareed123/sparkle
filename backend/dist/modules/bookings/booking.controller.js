"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_services_1 = require("./booking.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
exports.bookingController = {
    create: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const result = await booking_services_1.bookingServices.create(req.body);
        res.status(statusCode_1.STATUS_CODE.CREATED).json({ message: successMessages_1.SUCCESS_MESSAGES.BOOKING_CREATED, ...result });
    }),
    getAll: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const status = req.query.status;
        const page = req.query.page ? Number(req.query.page) : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const data = await booking_services_1.bookingServices.getAll(status, page, limit);
        res.status(statusCode_1.STATUS_CODE.OK).json(data);
    }),
    getById: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const booking = await booking_services_1.bookingServices.getById(req.params.id);
        res.status(statusCode_1.STATUS_CODE.OK).json({ booking });
    }),
    updateStatus: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const booking = await booking_services_1.bookingServices.updateStatus(req.params.id, req.body.status);
        res
            .status(statusCode_1.STATUS_CODE.OK)
            .json({ message: successMessages_1.SUCCESS_MESSAGES.BOOKING_STATUS_UPDATED, booking });
    }),
    delete: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await booking_services_1.bookingServices.delete(req.params.id);
        res.status(statusCode_1.STATUS_CODE.NO_CONTENT).send();
    }),
};
//# sourceMappingURL=booking.controller.js.map
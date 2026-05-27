"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialController = void 0;
const testimonial_services_1 = require("./testimonial.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
exports.testimonialController = {
    submit: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const t = await testimonial_services_1.testimonialServices.submit(req.body);
        res.status(statusCode_1.STATUS_CODE.CREATED).json({ message: successMessages_1.SUCCESS_MESSAGES.TESTIMONIAL_SUBMITTED, testimonial: t });
    }),
    getApproved: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const testimonials = await testimonial_services_1.testimonialServices.getApproved();
        res.status(statusCode_1.STATUS_CODE.OK).json({ testimonials });
    }),
    getAll: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const testimonials = await testimonial_services_1.testimonialServices.getAll();
        res.status(statusCode_1.STATUS_CODE.OK).json({ testimonials });
    }),
    approve: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const t = await testimonial_services_1.testimonialServices.approve(req.params.id);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.TESTIMONIAL_APPROVED, testimonial: t });
    }),
    delete: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await testimonial_services_1.testimonialServices.delete(req.params.id);
        res.status(statusCode_1.STATUS_CODE.NO_CONTENT).send();
    }),
};
//# sourceMappingURL=testimonial.controller.js.map
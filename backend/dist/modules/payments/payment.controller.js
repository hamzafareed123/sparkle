"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_services_1 = require("./payment.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
exports.paymentController = {
    createIntent: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { bookingId, amount, paymentType } = req.body;
        const data = await payment_services_1.paymentServices.createIntent(bookingId, amount, paymentType);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.PAYMENT_INTENT_CREATED, ...data });
    }),
    confirmPayment: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { paymentIntentId } = req.body;
        const result = await payment_services_1.paymentServices.confirmPayment(paymentIntentId);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: 'Payment confirmed', ...result });
    }),
    createRemainingIntent: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { bookingId } = req.body;
        const data = await payment_services_1.paymentServices.createRemainingIntent(bookingId);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.PAYMENT_INTENT_CREATED, ...data });
    }),
    webhook: async (req, res) => {
        const sig = req.headers['stripe-signature'];
        try {
            await payment_services_1.paymentServices.handleWebhook(req.body, sig);
            res.json({ received: true });
        }
        catch (err) {
            res.status(statusCode_1.STATUS_CODE.BAD_REQUEST).json({ message: err.message });
        }
    },
    getAll: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const payments = await payment_services_1.paymentServices.getAll();
        res.status(statusCode_1.STATUS_CODE.OK).json({ payments });
    }),
    refund: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await payment_services_1.paymentServices.refund(req.params.id);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.REFUND_SUCCESS });
    }),
};
//# sourceMappingURL=payment.controller.js.map
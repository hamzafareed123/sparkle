"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const payment_repositories_1 = require("./payment.repositories");
const booking_repositories_1 = require("../bookings/booking.repositories");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
const env_1 = require("../../config/env");
const stripe = new stripe_1.default(env_1.env.stripe.secretKey, { apiVersion: '2024-04-10' });
exports.paymentServices = {
    createIntent: async (bookingId, amount, paymentType = 'deposit') => {
        const booking = await booking_repositories_1.bookingRepositories.findById(bookingId);
        if (!booking)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.BOOKING_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        const intent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            metadata: { bookingId, paymentType },
            automatic_payment_methods: { enabled: true },
        });
        return { clientSecret: intent.client_secret, paymentIntentId: intent.id };
    },
    createRemainingIntent: async (bookingId) => {
        const booking = await booking_repositories_1.bookingRepositories.findById(bookingId);
        if (!booking)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.BOOKING_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        if (booking.paymentStatus === 'FULLY_PAID') {
            throw new customError_1.CustomError('Booking is already fully paid', statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const price = booking.price;
        if (!price) {
            throw new customError_1.CustomError('Booking price is not available', statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const amountDue = price - (booking.amountPaid ?? 0);
        if (amountDue <= 0) {
            throw new customError_1.CustomError('No remaining payment is due', statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const intent = await stripe.paymentIntents.create({
            amount: Math.round(amountDue * 100),
            currency: 'usd',
            metadata: { bookingId, paymentType: 'remaining' },
            automatic_payment_methods: { enabled: true },
        });
        return { clientSecret: intent.client_secret, paymentIntentId: intent.id, amountDue };
    },
    handleWebhook: async (rawBody, sig) => {
        let event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, env_1.env.stripe.webhookSecret);
        }
        catch {
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.WEBHOOK_SIGNATURE_FAILED, statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        if (event.type === 'payment_intent.succeeded') {
            const intent = event.data.object;
            await exports.paymentServices.confirmPayment(intent.id);
        }
    },
    confirmPayment: async (paymentIntentId) => {
        const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (intent.status !== 'succeeded') {
            throw new customError_1.CustomError('Payment has not been completed yet', statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const bookingId = intent.metadata.bookingId;
        if (!bookingId) {
            throw new customError_1.CustomError('Invalid payment: missing booking reference', statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const booking = await booking_repositories_1.bookingRepositories.findById(bookingId);
        if (!booking) {
            throw new customError_1.CustomError('Booking not found', statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const existing = await payment_repositories_1.paymentRepositories.findByStripeId(intent.id);
        if (existing) {
            return {
                alreadyProcessed: true,
                bookingId,
                paymentStatus: booking.paymentStatus,
                amount: existing.amount,
                customerName: booking.customerName,
                email: booking.email,
                serviceType: booking.serviceType,
            };
        }
        const amount = intent.amount / 100;
        const paymentType = intent.metadata.paymentType;
        const isFullPayment = paymentType === 'full' || paymentType === 'remaining';
        const paymentStatus = isFullPayment ? 'FULLY_PAID' : 'DEPOSIT_PAID';
        const currentPaid = booking.amountPaid || 0;
        const newAmountPaid = currentPaid + amount;
        let paymentDoc;
        const existingPaymentForBooking = await payment_repositories_1.paymentRepositories.findByBookingId(bookingId);
        if (existingPaymentForBooking) {
            existingPaymentForBooking.stripePaymentId = intent.id;
            existingPaymentForBooking.amount = newAmountPaid;
            existingPaymentForBooking.status = paymentStatus;
            paymentDoc = await existingPaymentForBooking.save();
        }
        else {
            paymentDoc = await payment_repositories_1.paymentRepositories.create({
                bookingId,
                stripePaymentId: intent.id,
                amount,
                status: paymentStatus,
            });
        }
        await booking_repositories_1.bookingRepositories.updatePayment(bookingId, {
            paymentStatus,
            amountPaid: newAmountPaid,
            payment: paymentDoc._id,
        });
        return {
            alreadyProcessed: false,
            bookingId,
            paymentStatus,
            amount,
            customerName: booking.customerName,
            email: booking.email,
            serviceType: booking.serviceType,
        };
    },
    getAll: () => payment_repositories_1.paymentRepositories.findAll(),
    refund: async (id) => {
        const payment = await payment_repositories_1.paymentRepositories.findById(id);
        if (!payment)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.PAYMENT_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        await stripe.refunds.create({ payment_intent: payment.stripePaymentId });
        await payment_repositories_1.paymentRepositories.updateStatus(id, 'REFUNDED');
        await booking_repositories_1.bookingRepositories.updatePayment(payment.bookingId.toString(), { paymentStatus: 'REFUNDED' });
    },
};
//# sourceMappingURL=payment.services.js.map
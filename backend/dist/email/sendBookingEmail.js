"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBookingConfirmation = void 0;
const transporter_1 = require("./transporter");
const bookingEmailTemplate_1 = require("./bookingEmailTemplate");
const env_1 = require("../config/env");
const sendBookingConfirmation = async (to, name, bookingId, serviceType, date, time) => {
    await transporter_1.transporter.sendMail({
        from: `"Sparkle & Shine" <${env_1.env.email.user}>`,
        to,
        subject: '✅ Booking Confirmed - Sparkle & Shine',
        html: (0, bookingEmailTemplate_1.bookingConfirmationTemplate)(name, bookingId, serviceType, date, time),
    });
};
exports.sendBookingConfirmation = sendBookingConfirmation;
//# sourceMappingURL=sendBookingEmail.js.map
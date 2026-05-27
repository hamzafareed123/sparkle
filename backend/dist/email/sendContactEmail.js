"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactNotification = void 0;
const transporter_1 = require("./transporter");
const contactEmailTemplate_1 = require("./contactEmailTemplate");
const env_1 = require("../config/env");
const sendContactNotification = async (name, email, phone, message) => {
    await transporter_1.transporter.sendMail({
        from: `"Sparkle & Shine" <${env_1.env.email.user}>`,
        to: env_1.env.email.user,
        subject: `📩 New Inquiry from ${name}`,
        html: (0, contactEmailTemplate_1.contactNotificationTemplate)(name, email, phone, message),
    });
};
exports.sendContactNotification = sendContactNotification;
//# sourceMappingURL=sendContactEmail.js.map
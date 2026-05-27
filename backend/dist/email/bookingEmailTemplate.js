"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingConfirmationTemplate = void 0;
const bookingConfirmationTemplate = (name, bookingId, serviceType, date, time) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb;">Booking Confirmed ✅</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your booking has been received and is being processed.</p>
    <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Booking ID</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${bookingId}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Service</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${serviceType}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Date</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${date}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Time</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${time}</td></tr>
    </table>
    <p>Our team will confirm your appointment shortly.</p>
    <p style="color: #6b7280; font-size: 12px;">Sparkle & Shine Professional Cleaning</p>
  </div>
`;
exports.bookingConfirmationTemplate = bookingConfirmationTemplate;
//# sourceMappingURL=bookingEmailTemplate.js.map
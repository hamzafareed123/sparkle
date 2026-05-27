"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email'),
    phone: zod_1.z.string().min(10, 'Invalid phone number'),
    serviceType: zod_1.z.string().min(1, 'Service type is required'),
    address: zod_1.z.string().min(5, 'Address must be at least 5 characters'),
    preferredDate: zod_1.z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
    preferredTime: zod_1.z.string().min(1, 'Preferred time is required'),
    specialNotes: zod_1.z.string().optional(),
    price: zod_1.z.number().positive('Service price is required'),
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
});
//# sourceMappingURL=booking.validator.js.map
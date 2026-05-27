"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email'),
    phone: zod_1.z.string().optional(),
    message: zod_1.z.string().min(10, 'Message must be at least 10 characters'),
});
//# sourceMappingURL=contact.validator.js.map
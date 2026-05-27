"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION = exports.PAYMENT_STATUS = exports.BOOKING_STATUS = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN',
};
exports.BOOKING_STATUS = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
};
exports.PAYMENT_STATUS = {
    UNPAID: 'UNPAID',
    DEPOSIT_PAID: 'DEPOSIT_PAID',
    FULLY_PAID: 'FULLY_PAID',
    REFUNDED: 'REFUNDED',
};
exports.PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
};
//# sourceMappingURL=config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = void 0;
exports.ERROR_MESSAGES = {
    // Auth
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_IN_USE: 'Email already in use',
    NOT_AUTHORIZED: 'Not authorized, no token provided',
    INVALID_TOKEN: 'Invalid or expired token',
    USER_NOT_FOUND: 'User not found',
    NO_PERMISSION: 'You do not have permission to perform this action',
    // Booking
    BOOKING_NOT_FOUND: 'Booking not found',
    BOOKING_CREATE_FAILED: 'Failed to create booking',
    // Contact
    CONTACT_NOT_FOUND: 'Contact inquiry not found',
    // Service
    SERVICE_NOT_FOUND: 'Service not found',
    SERVICE_SLUG_EXISTS: 'A service with this slug already exists',
    // Testimonial
    TESTIMONIAL_NOT_FOUND: 'Testimonial not found',
    // Payment
    PAYMENT_NOT_FOUND: 'Payment not found',
    PAYMENT_INTENT_FAILED: 'Failed to create payment intent',
    WEBHOOK_SIGNATURE_FAILED: 'Webhook signature verification failed',
    // General
    INTERNAL_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    ROUTE_NOT_FOUND: 'Route not found',
};
//# sourceMappingURL=errorMessages.js.map
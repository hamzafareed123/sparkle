"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const booking_validator_1 = require("./booking.validator");
const router = (0, express_1.Router)();
router.post('/', (0, validation_middleware_1.validate)(booking_validator_1.createBookingSchema), booking_controller_1.bookingController.create);
router.get('/', auth_middleware_1.protect, booking_controller_1.bookingController.getAll);
router.get('/:id', auth_middleware_1.protect, booking_controller_1.bookingController.getById);
router.patch('/:id/status', auth_middleware_1.protect, (0, validation_middleware_1.validate)(booking_validator_1.updateStatusSchema), booking_controller_1.bookingController.updateStatus);
router.delete('/:id', auth_middleware_1.protect, booking_controller_1.bookingController.delete);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map
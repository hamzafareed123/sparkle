"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/intent', payment_controller_1.paymentController.createIntent);
router.post('/confirm', payment_controller_1.paymentController.confirmPayment);
router.post('/remaining-intent', payment_controller_1.paymentController.createRemainingIntent);
router.post('/webhook', payment_controller_1.paymentController.webhook);
router.get('/', auth_middleware_1.protect, payment_controller_1.paymentController.getAll);
router.post('/refund/:id', auth_middleware_1.protect, payment_controller_1.paymentController.refund);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map
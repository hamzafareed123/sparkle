"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const auth_validator_1 = require("./auth.validator");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.authController.register);
router.post('/login', rateLimiter_1.authLimiter, (0, validation_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.authController.login);
router.get('/me', auth_middleware_1.protect, auth_controller_1.authController.getMe);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
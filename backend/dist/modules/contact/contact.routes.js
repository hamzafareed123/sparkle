"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const contact_validator_1 = require("./contact.validator");
const router = (0, express_1.Router)();
router.post('/', (0, validation_middleware_1.validate)(contact_validator_1.contactSchema), contact_controller_1.contactController.submit);
router.get('/', auth_middleware_1.protect, contact_controller_1.contactController.getAll);
router.patch('/:id/read', auth_middleware_1.protect, contact_controller_1.contactController.markAsRead);
router.delete('/:id', auth_middleware_1.protect, contact_controller_1.contactController.delete);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map
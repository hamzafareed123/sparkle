"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonial_controller_1 = require("./testimonial.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', testimonial_controller_1.testimonialController.submit);
router.get('/', testimonial_controller_1.testimonialController.getApproved);
router.get('/all', auth_middleware_1.protect, testimonial_controller_1.testimonialController.getAll);
router.patch('/:id/approve', auth_middleware_1.protect, testimonial_controller_1.testimonialController.approve);
router.delete('/:id', auth_middleware_1.protect, testimonial_controller_1.testimonialController.delete);
exports.default = router;
//# sourceMappingURL=testimonial.routes.js.map
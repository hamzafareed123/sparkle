"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
router.get('/', service_controller_1.serviceController.getAll);
router.get('/all', auth_middleware_1.protect, service_controller_1.serviceController.getAllForAdmin);
router.get('/:slug', service_controller_1.serviceController.getBySlug);
router.post('/', auth_middleware_1.protect, upload_middleware_1.uploadServiceImage.single('image'), service_controller_1.serviceController.create);
router.patch('/:id', auth_middleware_1.protect, upload_middleware_1.uploadServiceImage.single('image'), service_controller_1.serviceController.update);
router.delete('/:id', auth_middleware_1.protect, service_controller_1.serviceController.delete);
exports.default = router;
//# sourceMappingURL=service.routes.js.map
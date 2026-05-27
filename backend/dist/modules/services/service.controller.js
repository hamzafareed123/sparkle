"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const service_services_1 = require("./service.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
const parseServiceBody_1 = require("../../utils/parseServiceBody");
exports.serviceController = {
    getAll: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const services = await service_services_1.serviceServices.getAllPublic();
        res.status(statusCode_1.STATUS_CODE.OK).json({ services });
    }),
    getAllForAdmin: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const services = await service_services_1.serviceServices.getAllAdmin();
        res.status(statusCode_1.STATUS_CODE.OK).json({ services });
    }),
    getBySlug: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const service = await service_services_1.serviceServices.getBySlug(req.params.slug);
        res.status(statusCode_1.STATUS_CODE.OK).json({ service });
    }),
    create: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = (0, parseServiceBody_1.parseServiceBody)(req);
        const service = await service_services_1.serviceServices.create(data);
        res.status(statusCode_1.STATUS_CODE.CREATED).json({ message: successMessages_1.SUCCESS_MESSAGES.SERVICE_CREATED, service });
    }),
    update: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = (0, parseServiceBody_1.parseServiceBody)(req, true);
        const service = await service_services_1.serviceServices.update(req.params.id, data);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.SERVICE_UPDATED, service });
    }),
    delete: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await service_services_1.serviceServices.delete(req.params.id);
        res.status(statusCode_1.STATUS_CODE.NO_CONTENT).send();
    }),
};
//# sourceMappingURL=service.controller.js.map
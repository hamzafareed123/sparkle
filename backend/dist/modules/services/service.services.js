"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceServices = void 0;
const service_repositories_1 = require("./service.repositories");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
const deleteFile_1 = require("../../utils/deleteFile");
exports.serviceServices = {
    getAllPublic: () => service_repositories_1.serviceRepositories.findAll({ isActive: true }),
    getAllAdmin: () => service_repositories_1.serviceRepositories.findAll({}),
    getBySlug: async (slug) => {
        const service = await service_repositories_1.serviceRepositories.findBySlug(slug);
        if (!service)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.SERVICE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return service;
    },
    create: async (data) => service_repositories_1.serviceRepositories.create(data),
    update: async (id, data) => {
        const existing = await service_repositories_1.serviceRepositories.findById(id);
        if (!existing)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.SERVICE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        if (data.image && existing.image && data.image !== existing.image) {
            (0, deleteFile_1.deleteUploadedFile)(existing.image);
        }
        const service = await service_repositories_1.serviceRepositories.update(id, data);
        if (!service)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.SERVICE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return service;
    },
    delete: async (id) => {
        const service = await service_repositories_1.serviceRepositories.delete(id);
        if (!service)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.SERVICE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        if (service.image)
            (0, deleteFile_1.deleteUploadedFile)(service.image);
    },
};
//# sourceMappingURL=service.services.js.map
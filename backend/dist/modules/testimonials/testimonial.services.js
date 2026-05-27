"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialServices = void 0;
const testimonial_repositories_1 = require("./testimonial.repositories");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
exports.testimonialServices = {
    submit: (data) => testimonial_repositories_1.testimonialRepositories.create(data),
    getApproved: () => testimonial_repositories_1.testimonialRepositories.findApproved(),
    getAll: () => testimonial_repositories_1.testimonialRepositories.findAll(),
    approve: async (id) => {
        const t = await testimonial_repositories_1.testimonialRepositories.approve(id);
        if (!t)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.TESTIMONIAL_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return t;
    },
    delete: async (id) => {
        const t = await testimonial_repositories_1.testimonialRepositories.delete(id);
        if (!t)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.TESTIMONIAL_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    },
};
//# sourceMappingURL=testimonial.services.js.map
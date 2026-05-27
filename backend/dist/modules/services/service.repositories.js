"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRepositories = void 0;
const models_1 = require("../../models");
exports.serviceRepositories = {
    findAll: (filter) => models_1.ServiceModel.find(filter).sort({ createdAt: -1 }),
    findBySlug: (slug) => models_1.ServiceModel.findOne({ slug }),
    findById: (id) => models_1.ServiceModel.findById(id),
    create: (data) => models_1.ServiceModel.create(data),
    update: (id, data) => models_1.ServiceModel.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => models_1.ServiceModel.findByIdAndDelete(id),
};
//# sourceMappingURL=service.repositories.js.map
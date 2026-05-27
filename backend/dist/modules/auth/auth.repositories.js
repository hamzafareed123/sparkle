"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepositories = void 0;
const models_1 = require("../../models");
exports.authRepositories = {
    findByEmail: (email) => models_1.UserModel.findOne({ email }).select('+password'),
    findById: (id) => models_1.UserModel.findById(id),
    create: (data) => models_1.UserModel.create(data),
};
//# sourceMappingURL=auth.repositories.js.map
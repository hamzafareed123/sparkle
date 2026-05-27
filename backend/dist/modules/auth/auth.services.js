"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const auth_repositories_1 = require("./auth.repositories");
const generateToken_1 = require("../../utils/generateToken");
const mapUser_1 = require("../../utils/mapUser");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
exports.authServices = {
    register: async (email, password) => {
        const existing = await auth_repositories_1.authRepositories.findByEmail(email);
        if (existing)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.EMAIL_IN_USE, statusCode_1.STATUS_CODE.CONFLICT);
        const user = await auth_repositories_1.authRepositories.create({ email, password });
        const token = (0, generateToken_1.generateToken)(user._id.toString());
        return { token, user: (0, mapUser_1.mapUser)(user) };
    },
    login: async (email, password) => {
        const user = await auth_repositories_1.authRepositories.findByEmail(email);
        if (!user || !(await user.comparePassword(password))) {
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.INVALID_CREDENTIALS, statusCode_1.STATUS_CODE.UNAUTHORIZED);
        }
        const token = (0, generateToken_1.generateToken)(user._id.toString());
        return { token, user: (0, mapUser_1.mapUser)(user) };
    },
    getMe: async (id) => {
        const user = await auth_repositories_1.authRepositories.findById(id);
        if (!user)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.USER_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return (0, mapUser_1.mapUser)(user);
    },
};
//# sourceMappingURL=auth.services.js.map
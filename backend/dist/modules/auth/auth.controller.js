"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_services_1 = require("./auth.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
exports.authController = {
    register: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const data = await auth_services_1.authServices.register(email, password);
        res.status(statusCode_1.STATUS_CODE.CREATED).json({ message: successMessages_1.SUCCESS_MESSAGES.REGISTER_SUCCESS, ...data });
    }),
    login: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const data = await auth_services_1.authServices.login(email, password);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.LOGIN_SUCCESS, ...data });
    }),
    getMe: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = await auth_services_1.authServices.getMe(req.user._id.toString());
        res.status(statusCode_1.STATUS_CODE.OK).json({ user });
    }),
};
//# sourceMappingURL=auth.controller.js.map
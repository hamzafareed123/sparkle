"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_services_1 = require("./admin.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
exports.adminController = {
    getDashboardStats: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const stats = await admin_services_1.adminServices.getDashboardStats();
        res.status(statusCode_1.STATUS_CODE.OK).json({ stats });
    }),
};
//# sourceMappingURL=admin.controller.js.map
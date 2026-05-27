"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const statusCode_1 = require("../constants/statusCode");
const errorMessages_1 = require("../constants/errorMessages");
const restrictTo = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(statusCode_1.STATUS_CODE.FORBIDDEN).json({ message: errorMessages_1.ERROR_MESSAGES.NO_PERMISSION });
    }
    next();
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=role.middleware.js.map
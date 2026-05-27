"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const generateToken_1 = require("../utils/generateToken");
const models_1 = require("../models");
const statusCode_1 = require("../constants/statusCode");
const errorMessages_1 = require("../constants/errorMessages");
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(statusCode_1.STATUS_CODE.UNAUTHORIZED).json({ message: errorMessages_1.ERROR_MESSAGES.NOT_AUTHORIZED });
        const decoded = (0, generateToken_1.verifyToken)(token);
        const user = await models_1.UserModel.findById(decoded.id).select('+password');
        if (!user)
            return res.status(statusCode_1.STATUS_CODE.UNAUTHORIZED).json({ message: errorMessages_1.ERROR_MESSAGES.USER_NOT_FOUND });
        req.user = user;
        next();
    }
    catch {
        res.status(statusCode_1.STATUS_CODE.UNAUTHORIZED).json({ message: errorMessages_1.ERROR_MESSAGES.INVALID_TOKEN });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.middleware.js.map
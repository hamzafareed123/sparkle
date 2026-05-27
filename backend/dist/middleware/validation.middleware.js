"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const statusCode_1 = require("../constants/statusCode");
const errorMessages_1 = require("../constants/errorMessages");
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(statusCode_1.STATUS_CODE.BAD_REQUEST).json({
            message: errorMessages_1.ERROR_MESSAGES.VALIDATION_ERROR,
            errors: result.error.flatten().fieldErrors,
        });
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const customError_1 = require("../utils/customError");
const statusCode_1 = require("../constants/statusCode");
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message);
    if (err instanceof multer_1.default.MulterError) {
        return res.status(statusCode_1.STATUS_CODE.BAD_REQUEST).json({ success: false, message: err.message });
    }
    if (err.message?.includes('Only image')) {
        return res.status(statusCode_1.STATUS_CODE.BAD_REQUEST).json({ success: false, message: err.message });
    }
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).json({ success: false, message: err.message });
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(statusCode_1.STATUS_CODE.CONFLICT).json({ success: false, message: `${field} already exists` });
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(statusCode_1.STATUS_CODE.BAD_REQUEST).json({ success: false, message: messages.join(', ') });
    }
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(statusCode_1.STATUS_CODE.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
    }
    res.status(statusCode_1.STATUS_CODE.INTERNAL_SERVER).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map
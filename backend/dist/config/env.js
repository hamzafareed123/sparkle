"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean),
    mongoUri: process.env.MONGO_URI,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    stripe: {
        secretKey: (process.env.STRIPE_SECRET_KEY || '').trim(),
        webhookSecret: (process.env.STRIPE_WEBHOOK_SECRET || '').trim(),
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};
//# sourceMappingURL=env.js.map
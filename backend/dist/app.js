"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const rateLimiter_1 = require("./middleware/rateLimiter");
const outputHandler_1 = require("./middleware/outputHandler");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const booking_routes_1 = __importDefault(require("./modules/bookings/booking.routes"));
const contact_routes_1 = __importDefault(require("./modules/contact/contact.routes"));
const service_routes_1 = __importDefault(require("./modules/services/service.routes"));
const testimonial_routes_1 = __importDefault(require("./modules/testimonials/testimonial.routes"));
const payment_routes_1 = __importDefault(require("./modules/payments/payment.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const app = (0, express_1.default)();
// Connect DB
(0, db_1.connectDB)();
const corsOptions = {
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (env_1.env.clientUrls.includes(origin))
            return callback(null, true);
        if (env_1.env.nodeEnv === 'development' && /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
};
// CORS must run before helmet/rate-limit so preflight gets headers
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: env_1.env.nodeEnv === 'development' ? { policy: 'cross-origin' } : undefined,
}));
app.use((req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    return (0, rateLimiter_1.globalLimiter)(req, res, next);
});
app.use((0, morgan_1.default)('tiny'));
// Stripe webhook needs raw body — before json parser
app.use('/api/payments/webhook', express_1.default.raw({ type: 'application/json' }));
// Body parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static uploads
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../upload')));
// Output wrapper
app.use(outputHandler_1.outputHandler);
// Health check
app.get('/health', (req, res) => res.json({ success: true, status: 'ok', env: env_1.env.nodeEnv }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
app.use('/api/services', service_routes_1.default);
app.use('/api/testimonials', testimonial_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));
// Error handler
app.use(errorHandler_1.errorHandler);
app.listen(env_1.env.port, () => {
    console.log(`Server running on http://localhost:${env_1.env.port}`);
    console.log(`Environment: ${env_1.env.nodeEnv}`);
    console.log(`CORS origins: ${env_1.env.clientUrls.join(', ')}`);
    console.log(`Mongo Express: http://localhost:8081`);
});
exports.default = app;
//# sourceMappingURL=app.js.map
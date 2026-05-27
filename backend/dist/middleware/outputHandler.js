"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputHandler = void 0;
const outputHandler = (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        if (data && !data.success && !data.message?.toLowerCase().includes('error')) {
            return originalJson({ success: true, data });
        }
        return originalJson(data);
    };
    next();
};
exports.outputHandler = outputHandler;
//# sourceMappingURL=outputHandler.js.map
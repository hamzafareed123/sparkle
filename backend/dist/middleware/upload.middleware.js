"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadServiceImage = exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ensureDir = (dir) => {
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
};
const bookingStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        const dir = 'upload/booking-files';
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path_1.default.extname(file.originalname)}`);
    },
});
const serviceImageStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        const dir = 'upload/service-images';
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path_1.default.extname(file.originalname)}`);
    },
});
const imageFilter = (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const valid = allowed.test(path_1.default.extname(file.originalname).toLowerCase());
    valid ? cb(null, true) : cb(new Error('Only image files (jpeg, png, webp, gif) are allowed'));
};
exports.upload = (0, multer_1.default)({
    storage: bookingStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
exports.uploadServiceImage = (0, multer_1.default)({
    storage: serviceImageStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
//# sourceMappingURL=upload.middleware.js.map
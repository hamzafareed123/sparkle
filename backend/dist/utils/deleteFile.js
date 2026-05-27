"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedFile = deleteUploadedFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function deleteUploadedFile(fileUrl) {
    if (!fileUrl || !fileUrl.startsWith('/uploads/'))
        return;
    const relative = fileUrl.replace('/uploads/', '');
    const filePath = path_1.default.join(process.cwd(), 'upload', relative);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
}
//# sourceMappingURL=deleteFile.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = void 0;
const mapUser = (user) => ({
    id: user._id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});
exports.mapUser = mapUser;
//# sourceMappingURL=mapUser.js.map
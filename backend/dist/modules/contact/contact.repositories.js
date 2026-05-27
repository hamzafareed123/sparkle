"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRepositories = void 0;
const models_1 = require("../../models");
exports.contactRepositories = {
    create: (data) => models_1.ContactModel.create(data),
    findAll: () => models_1.ContactModel.find().sort({ createdAt: -1 }),
    findById: (id) => models_1.ContactModel.findById(id),
    markAsRead: (id) => models_1.ContactModel.findByIdAndUpdate(id, { isRead: true }, { new: true }),
    delete: (id) => models_1.ContactModel.findByIdAndDelete(id),
    countUnread: () => models_1.ContactModel.countDocuments({ isRead: false }),
};
//# sourceMappingURL=contact.repositories.js.map
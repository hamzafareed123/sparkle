"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactServices = void 0;
const contact_repositories_1 = require("./contact.repositories");
const sendContactEmail_1 = require("../../email/sendContactEmail");
const customError_1 = require("../../utils/customError");
const statusCode_1 = require("../../constants/statusCode");
const errorMessages_1 = require("../../constants/errorMessages");
exports.contactServices = {
    submit: async (data) => {
        const contact = await contact_repositories_1.contactRepositories.create(data);
        let emailSent = true;
        try {
            await (0, sendContactEmail_1.sendContactNotification)(data.name, data.email, data.phone, data.message);
        }
        catch (e) {
            console.warn('Email failed:', e);
            emailSent = false;
        }
        return { contact, emailSent };
    },
    getAll: () => contact_repositories_1.contactRepositories.findAll(),
    markAsRead: async (id) => {
        const contact = await contact_repositories_1.contactRepositories.markAsRead(id);
        if (!contact)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.CONTACT_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        return contact;
    },
    delete: async (id) => {
        const contact = await contact_repositories_1.contactRepositories.delete(id);
        if (!contact)
            throw new customError_1.CustomError(errorMessages_1.ERROR_MESSAGES.CONTACT_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    },
};
//# sourceMappingURL=contact.services.js.map
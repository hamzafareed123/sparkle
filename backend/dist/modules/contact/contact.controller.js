"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const contact_services_1 = require("./contact.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
exports.contactController = {
    submit: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const result = await contact_services_1.contactServices.submit(req.body);
        res.status(statusCode_1.STATUS_CODE.CREATED).json({ message: successMessages_1.SUCCESS_MESSAGES.CONTACT_SUBMITTED, ...result });
    }),
    getAll: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const contacts = await contact_services_1.contactServices.getAll();
        res.status(statusCode_1.STATUS_CODE.OK).json({ contacts });
    }),
    markAsRead: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const contact = await contact_services_1.contactServices.markAsRead(req.params.id);
        res.status(statusCode_1.STATUS_CODE.OK).json({ message: successMessages_1.SUCCESS_MESSAGES.CONTACT_MARKED_READ, contact });
    }),
    delete: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await contact_services_1.contactServices.delete(req.params.id);
        res.status(statusCode_1.STATUS_CODE.NO_CONTENT).send();
    }),
};
//# sourceMappingURL=contact.controller.js.map
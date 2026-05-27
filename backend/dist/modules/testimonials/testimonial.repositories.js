"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRepositories = void 0;
const models_1 = require("../../models");
exports.testimonialRepositories = {
    create: (data) => models_1.TestimonialModel.create(data),
    findApproved: () => models_1.TestimonialModel.find({ isApproved: true }).sort({ createdAt: -1 }),
    findAll: () => models_1.TestimonialModel.find().sort({ createdAt: -1 }),
    approve: (id) => models_1.TestimonialModel.findByIdAndUpdate(id, { isApproved: true }, { new: true }),
    delete: (id) => models_1.TestimonialModel.findByIdAndDelete(id),
};
//# sourceMappingURL=testimonial.repositories.js.map
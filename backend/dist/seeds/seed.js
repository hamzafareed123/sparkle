"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const models_1 = require("../models");
const seed = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    console.log('Connected for seeding');
    await models_1.ServiceModel.deleteMany({});
    await models_1.UserModel.deleteMany({});
    await models_1.TestimonialModel.deleteMany({});
    await models_1.UserModel.create({ email: 'admin@sparkle.com', password: 'admin123', role: 'ADMIN' });
    console.log('Admin user created: admin@sparkle.com / admin123');
    await models_1.ServiceModel.insertMany([
        { name: 'Carpet Cleaning', slug: 'carpet-cleaning', description: 'Deep steam carpet cleaning', price: 99, duration: '2-3 hours', isActive: true },
        { name: 'Upholstery Cleaning', slug: 'upholstery-cleaning', description: 'Professional sofa and furniture cleaning', price: 79, duration: '1-2 hours', isActive: true },
        { name: 'Pet Stain Removal', slug: 'pet-stain-removal', description: 'Eco-friendly pet stain and odour removal', price: 89, duration: '1-2 hours', isActive: true },
        { name: 'Commercial Cleaning', slug: 'commercial-cleaning', description: 'Office and business cleaning services', price: 149, duration: '3-4 hours', isActive: true },
    ]);
    console.log(' Services seeded');
    await models_1.TestimonialModel.insertMany([
        { name: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing service! My carpets look brand new.', isApproved: true },
        { name: 'Mike Peters', rating: 5, comment: 'Professional and eco-friendly. Will use again!', isApproved: true },
        { name: 'Emma Wilson', rating: 4, comment: 'Great pet stain removal. Very happy with the results.', isApproved: true },
    ]);
    console.log('Testimonials seeded');
    console.log('Seeding complete');
    await mongoose_1.default.disconnect();
};
seed().catch((err) => { console.error(err); process.exit(1); });
//# sourceMappingURL=seed.js.map
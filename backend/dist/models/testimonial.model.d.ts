import mongoose from 'mongoose';
export interface ITestimonial {
    name: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    createdAt: Date;
}
export declare const TestimonialModel: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;

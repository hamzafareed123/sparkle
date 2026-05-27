import mongoose from 'mongoose';
import { IService } from '../types';
export declare const ServiceModel: mongoose.Model<IService, {}, {}, {}, mongoose.Document<unknown, {}, IService, {}, {}> & IService & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;

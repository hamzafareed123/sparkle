import { Document } from 'mongoose';
export interface IService extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    duration: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

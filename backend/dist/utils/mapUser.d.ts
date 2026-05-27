import { IUser } from '../types';
export declare const mapUser: (user: IUser) => {
    id: import("mongoose").Types.ObjectId;
    email: string;
    role: "ADMIN" | "SUPER_ADMIN";
    createdAt: Date;
};

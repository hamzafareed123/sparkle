import { ICreateBooking } from '../../types';
export declare const bookingRepositories: {
    create: (data: ICreateBooking) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll: (filter: object, skip: number, limit: number) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "find", {}>;
    count: (filter: object) => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    findById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "findOne", {}>;
    updateStatus: (id: string, status: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "findOneAndUpdate", {}>;
    updatePayment: (id: string, data: object) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "findOneAndUpdate", {}>;
    delete: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "findOneAndDelete", {}>;
};

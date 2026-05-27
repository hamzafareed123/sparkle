import { ICreateBooking } from "../../types";
export declare const bookingServices: {
    create: (data: ICreateBooking) => Promise<{
        booking: import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        emailSent: boolean;
    }>;
    getAll: (status?: string, page?: number, limit?: number) => Promise<{
        bookings: (import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    getById: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateStatus: (id: string, status: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete: (id: string) => Promise<void>;
};

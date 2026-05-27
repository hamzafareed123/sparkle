export declare const adminRepositories: {
    totalBookings: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    pendingBookings: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    confirmedBookings: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    completedBookings: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    cancelledBookings: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "countDocuments", {}>;
    totalContacts: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "countDocuments", {}>;
    unreadContacts: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "countDocuments", {}>;
    pendingTestimonials: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "countDocuments", {}>;
    totalUsers: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IUser, {}, {}> & import("../../types").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IUser, "countDocuments", {}>;
    revenuePayments: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "find", {}>;
    recentBookings: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IBooking, "find", {}>;
};

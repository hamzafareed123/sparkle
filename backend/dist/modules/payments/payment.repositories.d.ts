export declare const paymentRepositories: {
    create: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "find", {}>;
    findById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "findOne", {}>;
    findByStripeId: (stripePaymentId: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "findOne", {}>;
    findByBookingId: (bookingId: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "findOne", {}>;
    updateStatus: (id: string, status: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "findOneAndUpdate", {}>;
};

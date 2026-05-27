export declare const paymentServices: {
    createIntent: (bookingId: string, amount: number, paymentType?: "deposit" | "full") => Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
    createRemainingIntent: (bookingId: string) => Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
        amountDue: number;
    }>;
    handleWebhook: (rawBody: Buffer, sig: string) => Promise<void>;
    confirmPayment: (paymentIntentId: string) => Promise<{
        alreadyProcessed: boolean;
        bookingId: string;
        paymentStatus: string;
        amount: number;
        customerName: string;
        email: string;
        serviceType: string;
    }>;
    getAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IPayment, {}, {}> & import("../../types").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IPayment, "find", {}>;
    refund: (id: string) => Promise<void>;
};

export declare const testimonialServices: {
    submit: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getApproved: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "find", {}>;
    getAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "find", {}>;
    approve: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete: (id: string) => Promise<void>;
};

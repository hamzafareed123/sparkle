export declare const testimonialRepositories: {
    create: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findApproved: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "find", {}>;
    findAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "find", {}>;
    approve: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "findOneAndUpdate", {}>;
    delete: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../models").ITestimonial, {}, {}> & import("../../models").ITestimonial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../../models").ITestimonial, "findOneAndDelete", {}>;
};

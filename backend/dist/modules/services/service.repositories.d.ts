export declare const serviceRepositories: {
    findAll: (filter: object) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "find", {}>;
    findBySlug: (slug: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "findOne", {}>;
    findById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "findOne", {}>;
    create: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update: (id: string, data: object) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "findOneAndUpdate", {}>;
    delete: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "findOneAndDelete", {}>;
};

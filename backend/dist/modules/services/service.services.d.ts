export declare const serviceServices: {
    getAllPublic: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "find", {}>;
    getAllAdmin: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IService, "find", {}>;
    getBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update: (id: string, data: Record<string, unknown>) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IService, {}, {}> & import("../../types").IService & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete: (id: string) => Promise<void>;
};

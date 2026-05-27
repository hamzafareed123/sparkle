export declare const contactRepositories: {
    create: (data: object) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "find", {}>;
    findById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "findOne", {}>;
    markAsRead: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "findOneAndUpdate", {}>;
    delete: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "findOneAndDelete", {}>;
    countUnread: () => import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "countDocuments", {}>;
};

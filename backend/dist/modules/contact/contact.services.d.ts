export declare const contactServices: {
    submit: (data: {
        name: string;
        email: string;
        phone?: string;
        message: string;
    }) => Promise<{
        contact: import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        emailSent: boolean;
    }>;
    getAll: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../types").IContact, "find", {}>;
    markAsRead: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../../types").IContact, {}, {}> & import("../../types").IContact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete: (id: string) => Promise<void>;
};

export declare const authServices: {
    register: (email: string, password: string) => Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            role: "ADMIN" | "SUPER_ADMIN";
            createdAt: Date;
        };
    }>;
    login: (email: string, password: string) => Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            role: "ADMIN" | "SUPER_ADMIN";
            createdAt: Date;
        };
    }>;
    getMe: (id: string) => Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        role: "ADMIN" | "SUPER_ADMIN";
        createdAt: Date;
    }>;
};

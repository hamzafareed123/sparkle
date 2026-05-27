export declare const adminServices: {
    getDashboardStats: () => Promise<{
        bookings: {
            total: number;
            pending: number;
            confirmed: number;
            completed: number;
            cancelled: number;
        };
        contacts: {
            total: number;
            unread: number;
        };
        testimonials: {
            pending: number;
        };
        users: {
            total: number;
        };
        revenue: {
            total: number;
        };
        recentBookings: (import("mongoose").Document<unknown, {}, import("../../types").IBooking, {}, {}> & import("../../types").IBooking & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
};

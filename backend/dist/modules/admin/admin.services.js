"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const admin_repositories_1 = require("./admin.repositories");
exports.adminServices = {
    getDashboardStats: async () => {
        const [totalBookings, pendingBookings, confirmedBookings, completedBookings, cancelledBookings, totalContacts, unreadContacts, pendingTestimonials, totalUsers, payments, recentBookings,] = await Promise.all([
            admin_repositories_1.adminRepositories.totalBookings(),
            admin_repositories_1.adminRepositories.pendingBookings(),
            admin_repositories_1.adminRepositories.confirmedBookings(),
            admin_repositories_1.adminRepositories.completedBookings(),
            admin_repositories_1.adminRepositories.cancelledBookings(),
            admin_repositories_1.adminRepositories.totalContacts(),
            admin_repositories_1.adminRepositories.unreadContacts(),
            admin_repositories_1.adminRepositories.pendingTestimonials(),
            admin_repositories_1.adminRepositories.totalUsers(),
            admin_repositories_1.adminRepositories.revenuePayments(),
            admin_repositories_1.adminRepositories.recentBookings(),
        ]);
        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        return {
            bookings: { total: totalBookings, pending: pendingBookings, confirmed: confirmedBookings, completed: completedBookings, cancelled: cancelledBookings },
            contacts: { total: totalContacts, unread: unreadContacts },
            testimonials: { pending: pendingTestimonials },
            users: { total: totalUsers },
            revenue: { total: totalRevenue },
            recentBookings,
        };
    },
};
//# sourceMappingURL=admin.services.js.map
import { adminRepositories } from './admin.repositories'

export const adminServices = {
  getDashboardStats: async () => {
    const [
      totalBookings, pendingBookings, confirmedBookings, completedBookings,
      cancelledBookings, totalContacts, unreadContacts, pendingTestimonials,
      totalUsers, payments, recentBookings,
    ] = await Promise.all([
      adminRepositories.totalBookings(),
      adminRepositories.pendingBookings(),
      adminRepositories.confirmedBookings(),
      adminRepositories.completedBookings(),
      adminRepositories.cancelledBookings(),
      adminRepositories.totalContacts(),
      adminRepositories.unreadContacts(),
      adminRepositories.pendingTestimonials(),
      adminRepositories.totalUsers(),
      adminRepositories.revenuePayments(),
      adminRepositories.recentBookings(),
    ])

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

    return {
      bookings: { total: totalBookings, pending: pendingBookings, confirmed: confirmedBookings, completed: completedBookings, cancelled: cancelledBookings },
      contacts: { total: totalContacts, unread: unreadContacts },
      testimonials: { pending: pendingTestimonials },
      users: { total: totalUsers },
      revenue: { total: totalRevenue },
      recentBookings,
    }
  },
}

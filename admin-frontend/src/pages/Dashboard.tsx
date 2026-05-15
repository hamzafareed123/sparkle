import { useQuery } from '@tanstack/react-query'
import { CalendarCheck, Clock, DollarSign, MessageSquare } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import { bookingsApi } from '@/api/bookings.api'
import { paymentsApi } from '@/api/payments.api'
import { contactsApi } from '@/api/contacts.api'
import { StatsCard } from '@/components/ui/StatsCard'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { BookingsDonut } from '@/components/charts/BookingsDonut'
import { MonthlyBarChart } from '@/components/charts/MonthlyBarChart'
import { formatCurrency, formatRelativeTime } from '@/utils/formatters'
import {
  buildActivityFeed,
  buildDonutData,
  buildMonthlyBookingsData,
  buildRevenueChartData,
} from '@/utils/chartData'
import { subDays, isAfter } from 'date-fns'

const dotColors = {
  booking: '#3f704d',
  payment: '#ddbf61',
  contact: '#3498db',
}

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminApi.getDashboardStats,
  })

  const { data: payments = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: paymentsApi.getAll,
  })

  const { data: bookingsData } = useQuery({
    queryKey: ['bookings-chart'],
    queryFn: () => bookingsApi.getAll({ limit: 500 }),
  })

  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getAll,
  })

  if (statsLoading || !stats) {
    return (
      <div className="space-y-6">
        <SkeletonLoader variant="stats" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="skeleton-shimmer h-80 rounded-[var(--border-radius-md)]" />
          <div className="skeleton-shimmer h-80 rounded-[var(--border-radius-md)]" />
        </div>
      </div>
    )
  }

  const allBookings = bookingsData?.bookings ?? []
  const weekAgo = subDays(new Date(), 7)
  const bookingsThisWeek = allBookings.filter((b) =>
    isAfter(new Date(b.createdAt), weekAgo),
  ).length

  const revenueData = buildRevenueChartData(payments)
  const monthlyData = buildMonthlyBookingsData(allBookings)
  const donutData = buildDonutData(stats.bookings)
  const activity = buildActivityFeed(
    stats.recentBookings,
    payments,
    contacts,
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={CalendarCheck}
          iconColor="#3f704d"
          value={stats.bookings.total}
          title="Total Bookings"
          subtitle={`+${bookingsThisWeek} this week`}
        />
        <StatsCard
          icon={Clock}
          iconColor="#ddbf61"
          value={stats.bookings.pending}
          title="Pending Bookings"
          subtitle="Needs confirmation"
          pulse={stats.bookings.pending > 0}
        />
        <StatsCard
          icon={DollarSign}
          iconColor="#3f704d"
          value={formatCurrency(stats.revenue.total)}
          title="Total Revenue"
          subtitle="From completed payments"
        />
        <StatsCard
          icon={MessageSquare}
          iconColor="#e74c3c"
          value={stats.contacts.unread}
          title="Unread Messages"
          subtitle="Pending replies"
          pulse={stats.contacts.unread > 0}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            <RevenueChart data={revenueData} />
            <BookingsDonut data={donutData} total={stats.bookings.total} />
          </div>
          <MonthlyBarChart data={monthlyData} />
        </div>

        <div
          className="rounded-[var(--border-radius-md)] bg-white p-6"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Recent Activity</h3>
          <div className="max-h-[520px] space-y-4 overflow-y-auto">
            {activity.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--text-muted)]">No recent activity</p>
            ) : (
              activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: dotColors[item.type] }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatRelativeTime(item.time)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

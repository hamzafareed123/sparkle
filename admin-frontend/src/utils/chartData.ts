import { format, subMonths, startOfMonth, isSameMonth } from 'date-fns'
import type { Booking, Payment, Contact } from '@/types'
import type { MonthlyRevenuePoint } from '@/components/charts/RevenueChart'
import type { MonthlyBookingPoint } from '@/components/charts/MonthlyBarChart'
import type { StatusSegment } from '@/components/charts/BookingsDonut'

export function getLast6MonthsLabels(): { key: Date; label: string }[] {
  const now = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(startOfMonth(now), 5 - i)
    return { key: d, label: format(d, 'MMM') }
  })
}

export function buildRevenueChartData(payments: Payment[]): MonthlyRevenuePoint[] {
  const months = getLast6MonthsLabels()
  return months.map(({ key, label }) => {
    const revenue = payments
      .filter((p) => {
        const d = new Date(p.createdAt)
        return isSameMonth(d, key) && (p.status === 'DEPOSIT_PAID' || p.status === 'FULLY_PAID')
      })
      .reduce((sum, p) => sum + p.amount, 0)
    return { month: label, revenue }
  })
}

export function buildMonthlyBookingsData(bookings: Booking[]): MonthlyBookingPoint[] {
  const months = getLast6MonthsLabels()
  return months.map(({ key, label }) => ({
    month: label,
    bookings: bookings.filter((b) => isSameMonth(new Date(b.createdAt), key)).length,
  }))
}

export function buildDonutData(stats: {
  pending: number
  confirmed: number
  completed: number
  cancelled: number
}): StatusSegment[] {
  return [
    { name: 'Pending', value: stats.pending, color: '#ddbf61' },
    { name: 'Confirmed', value: stats.confirmed, color: '#3f704d' },
    { name: 'Completed', value: stats.completed, color: '#2d5a3a' },
    { name: 'Cancelled', value: stats.cancelled, color: '#e74c3c' },
  ]
}

export interface ActivityItem {
  id: string
  type: 'booking' | 'payment' | 'contact'
  text: string
  time: string
  createdAt: string
}

export function buildActivityFeed(
  bookings: Booking[],
  payments: Payment[],
  contacts: Contact[],
): ActivityItem[] {
  const items: ActivityItem[] = []

  bookings.slice(0, 5).forEach((b) => {
    items.push({
      id: `booking-${b._id}`,
      type: 'booking',
      text: `New booking from ${b.customerName}`,
      time: b.createdAt,
      createdAt: b.createdAt,
    })
  })

  payments.slice(0, 5).forEach((p) => {
    items.push({
      id: `payment-${p._id}`,
      type: 'payment',
      text: `Payment received — $${p.amount.toFixed(2)}`,
      time: p.createdAt,
      createdAt: p.createdAt,
    })
  })

  contacts.slice(0, 5).forEach((c) => {
    items.push({
      id: `contact-${c._id}`,
      type: 'contact',
      text: `New contact from ${c.name}`,
      time: c.createdAt,
      createdAt: c.createdAt,
    })
  })

  return items
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
}

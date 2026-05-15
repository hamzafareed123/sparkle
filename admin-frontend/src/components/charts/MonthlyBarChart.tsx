import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export interface MonthlyBookingPoint {
  month: string
  bookings: number
}

interface MonthlyBarChartProps {
  data: MonthlyBookingPoint[]
}

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  return (
    <div className="rounded-[var(--border-radius-md)] bg-white p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Monthly Bookings</h3>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--text-muted)]">No booking data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#888' }} />
            <YAxis tick={{ fontSize: 12, fill: '#888' }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="bookings" fill="#3f704d" radius={[8, 8, 0, 0]} activeBar={{ fill: '#2d5a3a' }} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '@/utils/formatters'

export interface MonthlyRevenuePoint {
  month: string
  revenue: number
}

interface RevenueChartProps {
  data: MonthlyRevenuePoint[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="rounded-[var(--border-radius-md)] bg-white p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Revenue Over Time</h3>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--text-muted)]">No payment data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dbeccf" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#dbeccf" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#888' }} />
            <YAxis tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Revenue']} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3f704d"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

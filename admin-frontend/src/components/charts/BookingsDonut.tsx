import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export interface StatusSegment {
  name: string
  value: number
  color: string
}

interface BookingsDonutProps {
  data: StatusSegment[]
  total: number
}

export function BookingsDonut({ data, total }: BookingsDonutProps) {
  const filtered = data.filter((d) => d.value > 0)

  return (
    <div className="rounded-[var(--border-radius-md)] bg-white p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Bookings by Status</h3>
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--text-muted)]">No bookings yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={filtered}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {filtered.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#222">
                {total}
              </tspan>
              <tspan x="50%" dy="1.4em" fontSize="12" fill="#888">
                Total
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

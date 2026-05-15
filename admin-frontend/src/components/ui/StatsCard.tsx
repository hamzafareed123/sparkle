import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  iconColor: string
  value: string | number
  title: string
  subtitle: string
  pulse?: boolean
}

export function StatsCard({ icon: Icon, iconColor, value, title, subtitle, pulse }: StatsCardProps) {
  return (
    <div
      className={`rounded-[var(--border-radius-md)] bg-white p-6 card-hover ${pulse ? 'pulse-soft' : ''}`}
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-[var(--border-radius-sm)]"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon size={24} style={{ color: iconColor }} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold text-[var(--text-primary)]">{value}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{title}</p>
      <p className="mt-0.5 text-sm text-[var(--text-muted)]">{subtitle}</p>
    </div>
  )
}

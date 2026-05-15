interface SkeletonLoaderProps {
  rows?: number
  variant?: 'table' | 'card' | 'stats'
}

export function SkeletonLoader({ rows = 5, variant = 'table' }: SkeletonLoaderProps) {
  if (variant === 'stats') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-shimmer h-36 rounded-[var(--border-radius-md)]" />
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton-shimmer h-48 rounded-[var(--border-radius-md)]" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-[var(--border-radius-md)] bg-white p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="skeleton-shimmer h-10 rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-shimmer h-12 rounded-lg" />
      ))}
    </div>
  )
}

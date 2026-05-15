import type { ReactNode } from 'react'

export function Table({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto rounded-[var(--border-radius-md)] bg-white ${className}`} style={{ boxShadow: 'var(--shadow-sm)' }}>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">{children}</table>
    </div>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-gray-100 bg-[var(--bg-secondary)] text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {children}
      </tr>
    </thead>
  )
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-gray-50 transition-colors last:border-0 hover:bg-[#f0f7f0]">{children}</tr>
  )
}

export function Th({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <th className={`px-4 py-3 ${className}`}>{children}</th>
}

export function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>
}

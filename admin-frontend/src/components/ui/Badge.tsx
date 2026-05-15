import type { ReactNode } from 'react'

type BadgeVariant =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'unpaid'
  | 'deposit'
  | 'paid'
  | 'refunded'
  | 'default'
  | 'success'
  | 'warning'

const variants: Record<BadgeVariant, string> = {
  pending: 'bg-[#ddbf61] text-[#222222]',
  confirmed: 'bg-[#dbeccf] text-[#3f704d]',
  completed: 'bg-[#2d5a3a] text-white',
  cancelled: 'bg-red-100 text-red-700',
  unpaid: 'bg-gray-100 text-gray-600',
  deposit: 'bg-blue-100 text-blue-700',
  paid: 'bg-[#dbeccf] text-[#3f704d]',
  refunded: 'bg-orange-100 text-orange-700',
  default: 'bg-gray-100 text-gray-600',
  success: 'bg-[#dbeccf] text-[#3f704d]',
  warning: 'bg-[#ddbf61] text-[#222222]',
}

export function statusToBadge(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    UNPAID: 'unpaid',
    DEPOSIT_PAID: 'deposit',
    FULLY_PAID: 'paid',
    REFUNDED: 'refunded',
  }
  return map[status] ?? 'default'
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

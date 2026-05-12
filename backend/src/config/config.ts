export const ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

export const PAYMENT_STATUS = {
  UNPAID: 'UNPAID',
  DEPOSIT_PAID: 'DEPOSIT_PAID',
  FULLY_PAID: 'FULLY_PAID',
  REFUNDED: 'REFUNDED',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1 as number,
  DEFAULT_LIMIT: 10 as number,
} as const

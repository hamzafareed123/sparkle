import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'

function toDate(value: string | Date): Date {
  if (value instanceof Date) return value
  const parsed = parseISO(value)
  if (isValid(parsed)) return parsed
  const fallback = new Date(value)
  return isValid(fallback) ? fallback : new Date()
}

export function formatDate(date: string | Date): string {
  return format(toDate(date), 'MMM d, yyyy')
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  if (Number.isNaN(hours)) return time
  const period = hours >= 12 ? 'PM' : 'AM'
  const h = hours % 12 || 12
  const m = minutes?.toString().padStart(2, '0') ?? '00'
  return `${h}:${m} ${period}`
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(toDate(date), { addSuffix: true })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, CalendarCheck, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { bookingsApi } from '@/api/bookings.api'
import { useDebounce } from '@/hooks/useDebounce'
import { Badge, statusToBadge } from '@/components/ui/Badge'
import { Table, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Modal } from '@/components/ui/Modal'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { formatDate, formatTime, formatCurrency } from '@/utils/formatters'
import type { Booking, BookingStatus } from '@/types'

const STATUS_TABS: { label: string; value: BookingStatus | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

const LIMIT = 10

export function Bookings() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<BookingStatus>('PENDING')
  const debouncedSearch = useDebounce(search)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', statusFilter, page, debouncedSearch],
    queryFn: () =>
      bookingsApi.getAll({
        status: statusFilter || undefined,
        page: debouncedSearch ? 1 : page,
        limit: debouncedSearch ? 200 : LIMIT,
      }),
  })

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ['booking', selectedId],
    queryFn: () => bookingsApi.getById(selectedId!),
    enabled: !!selectedId,
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['booking'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast.success('Booking status updated')
    },
    onError: () => toast.error('Failed to update status'),
  })

  const deleteMutation = useMutation({
    mutationFn: bookingsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      setDeleteId(null)
      setSelectedId(null)
      toast.success('Booking deleted')
    },
    onError: () => toast.error('Failed to delete booking'),
  })

  const filtered =
    data?.bookings.filter((b) => {
      if (!debouncedSearch) return true
      const q = debouncedSearch.toLowerCase()
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q)
      )
    }) ?? []

  const displayBookings = debouncedSearch
    ? filtered.slice((page - 1) * LIMIT, page * LIMIT)
    : filtered

  const total = debouncedSearch ? filtered.length : (data?.total ?? 0)
  const pages = debouncedSearch ? Math.ceil(filtered.length / LIMIT) || 1 : (data?.pages ?? 1)

  const openDetail = (booking: Booking) => {
    setSelectedId(booking._id)
    setNewStatus(booking.status)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => {
                setStatusFilter(tab.value)
                setPage(1)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                statusFilter === tab.value
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-gray-50'
              }`}
              style={statusFilter !== tab.value ? { boxShadow: 'var(--shadow-sm)' } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full rounded-[var(--border-radius-sm)] border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--primary-color)] sm:w-72"
          />
          <span className="shrink-0 rounded-full bg-[var(--primary-light)] px-3 py-1 text-sm font-semibold text-[var(--primary-color)]">
            {total} total
          </span>
        </div>
      </div>

      {isLoading ? (
        <SkeletonLoader rows={8} />
      ) : displayBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--border-radius-md)] bg-white py-16" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <CalendarCheck size={48} className="text-[var(--text-muted)]" />
          <p className="mt-4 text-lg font-medium text-[var(--text-primary)]">No bookings yet</p>
          <p className="text-sm text-[var(--text-muted)]">Bookings will appear here when customers book</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHead>
              <Th>#</Th>
              <Th>Customer</Th>
              <Th>Service</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Actions</Th>
            </TableHead>
            <TableBody>
              {displayBookings.map((booking, idx) => (
                <TableRow key={booking._id}>
                  <Td className="text-[var(--text-muted)]">{(page - 1) * LIMIT + idx + 1}</Td>
                  <Td>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-xs text-[var(--text-muted)]">{booking.email}</p>
                  </Td>
                  <Td>
                    <span className="rounded-full bg-[#dbeccf] px-2.5 py-0.5 text-xs font-medium text-[#3f704d]">
                      {booking.serviceType}
                    </span>
                  </Td>
                  <Td>{formatDate(booking.preferredDate)}</Td>
                  <Td>{formatTime(booking.preferredTime)}</Td>
                  <Td>
                    <Badge variant={statusToBadge(booking.status)}>
                      {booking.status.replace('_', ' ')}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge variant={statusToBadge(booking.paymentStatus)}>
                      {booking.paymentStatus.replace('_', ' ')}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openDetail(booking)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-[#f0f7f0] hover:text-[var(--primary-color)]"
                        aria-label="View booking"
                      >
                        <Eye size={18} />
                      </button>
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          statusMutation.mutate({
                            id: booking._id,
                            status: e.target.value as BookingStatus,
                          })
                        }
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs outline-none focus:border-[var(--primary-color)]"
                      >
                        {STATUS_TABS.filter((t) => t.value).map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination page={page} pages={pages} total={total} limit={LIMIT} onPageChange={setPage} />
        </>
      )}

      <Modal
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        title="Booking Details"
        size="lg"
      >
        {detailLoading || !detail ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-[var(--primary-color)]" size={32} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-[var(--text-muted)]">Customer</p>
                <p className="font-medium">{detail.customerName}</p>
                <p className="text-sm text-[var(--text-secondary)]">{detail.email}</p>
                <p className="text-sm text-[var(--text-secondary)]">{detail.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Service</p>
                <p className="font-medium">{detail.serviceType}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Date &amp; Time</p>
                <p className="font-medium">
                  {formatDate(detail.preferredDate)} at {formatTime(detail.preferredTime)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Payment</p>
                <Badge variant={statusToBadge(detail.paymentStatus)}>{detail.paymentStatus}</Badge>
                {detail.amountPaid != null && (
                  <p className="mt-1 text-sm">{formatCurrency(detail.amountPaid)}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Address</p>
              <p className="text-sm">{detail.address}</p>
            </div>
            {detail.specialNotes && (
              <div>
                <p className="text-xs text-[var(--text-muted)]">Special Notes</p>
                <p className="rounded-lg bg-[var(--bg-secondary)] p-3 text-sm">{detail.specialNotes}</p>
              </div>
            )}
            <div className="flex items-end gap-3 border-t pt-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-[var(--text-muted)]">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as BookingStatus)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {STATUS_TABS.filter((t) => t.value).map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                disabled={statusMutation.isPending}
                onClick={() => selectedId && statusMutation.mutate({ id: selectedId, status: newStatus })}
                className="rounded-[var(--border-radius-sm)] bg-[var(--primary-color)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] disabled:opacity-60"
              >
                {statusMutation.isPending ? 'Saving...' : 'Update'}
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(selectedId)}
                className="rounded-[var(--border-radius-sm)] border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This cannot be undone."
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}

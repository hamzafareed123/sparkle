import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreditCard, Eye, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { paymentsApi } from '@/api/payments.api'
import { bookingsApi } from '@/api/bookings.api'
import { StatsCard } from '@/components/ui/StatsCard'
import { Badge, statusToBadge } from '@/components/ui/Badge'
import { Table, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Modal } from '@/components/ui/Modal'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { formatCurrency, formatDate } from '@/utils/formatters'
import type { Booking, Payment } from '@/types'
import { DollarSign, Receipt, Undo2 } from 'lucide-react'

function getBookingId(payment: Payment): string {
  if (typeof payment.bookingId === 'string') return payment.bookingId
  return payment.bookingId._id
}

function getCustomerName(payment: Payment): string {
  if (typeof payment.bookingId === 'object' && payment.bookingId?.customerName) {
    return payment.bookingId.customerName
  }
  return '—'
}

export function Payments() {
  const [refundTarget, setRefundTarget] = useState<Payment | null>(null)
  const [viewBookingId, setViewBookingId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: paymentsApi.getAll,
  })

  const { data: bookingDetail, isLoading: bookingLoading } = useQuery({
    queryKey: ['booking', viewBookingId],
    queryFn: () => bookingsApi.getById(viewBookingId!),
    enabled: !!viewBookingId,
  })

  const refundMutation = useMutation({
    mutationFn: paymentsApi.refund,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      setRefundTarget(null)
      toast.success('Refund processed')
    },
    onError: () => toast.error('Refund failed'),
  })

  const totalRevenue = payments
    .filter((p) => p.status === 'DEPOSIT_PAID' || p.status === 'FULLY_PAID')
    .reduce((s, p) => s + p.amount, 0)

  const refundedAmount = payments
    .filter((p) => p.status === 'REFUNDED')
    .reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6">
      {isLoading ? (
        <SkeletonLoader variant="stats" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard
            icon={DollarSign}
            iconColor="#3f704d"
            value={formatCurrency(totalRevenue)}
            title="Total Revenue"
            subtitle="From successful payments"
          />
          <StatsCard
            icon={Receipt}
            iconColor="#ddbf61"
            value={payments.length}
            title="Total Payments"
            subtitle="All transactions"
          />
          <StatsCard
            icon={Undo2}
            iconColor="#e74c3c"
            value={formatCurrency(refundedAmount)}
            title="Refunded Amount"
            subtitle="Total refunds issued"
          />
        </div>
      )}

      {isLoading ? (
        <SkeletonLoader rows={8} />
      ) : payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--border-radius-md)] bg-white py-16" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <CreditCard size={48} className="text-[var(--text-muted)]" />
          <p className="mt-4 text-lg font-medium">No payments yet</p>
        </div>
      ) : (
        <Table>
          <TableHead>
            <Th>#</Th>
            <Th>Booking ID</Th>
            <Th>Customer</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </TableHead>
          <TableBody>
            {payments.map((payment, idx) => (
              <TableRow key={payment._id}>
                <Td className="text-[var(--text-muted)]">{idx + 1}</Td>
                <Td className="font-mono text-xs">{getBookingId(payment).slice(-8)}</Td>
                <Td>{getCustomerName(payment)}</Td>
                <Td className="font-semibold">{formatCurrency(payment.amount)}</Td>
                <Td>
                  <Badge variant={statusToBadge(payment.status)}>
                    {payment.status.replace('_', ' ')}
                  </Badge>
                </Td>
                <Td>{formatDate(payment.createdAt)}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewBookingId(getBookingId(payment))}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-[#f0f7f0]"
                      aria-label="View booking"
                    >
                      <Eye size={18} />
                    </button>
                    {payment.status !== 'REFUNDED' && (
                      <button
                        type="button"
                        onClick={() => setRefundTarget(payment)}
                        className="rounded-lg p-1.5 text-orange-500 hover:bg-orange-50"
                        aria-label="Refund"
                      >
                        <RotateCcw size={18} />
                      </button>
                    )}
                  </div>
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmModal
        isOpen={!!refundTarget}
        onClose={() => setRefundTarget(null)}
        onConfirm={() => refundTarget && refundMutation.mutate(refundTarget._id)}
        title="Process Refund"
        message={`Refund ${formatCurrency(refundTarget?.amount ?? 0)} to customer? This action cannot be undone.`}
        confirmLabel="Refund"
        loading={refundMutation.isPending}
      />

      <Modal
        isOpen={!!viewBookingId}
        onClose={() => setViewBookingId(null)}
        title="Linked Booking"
        size="md"
      >
        {bookingLoading ? (
          <p className="py-8 text-center text-sm text-[var(--text-muted)]">Loading...</p>
        ) : bookingDetail ? (
          <BookingSummary booking={bookingDetail} />
        ) : (
          <p className="py-8 text-center text-sm text-[var(--text-muted)]">Booking not found</p>
        )}
      </Modal>
    </div>
  )
}

function BookingSummary({ booking }: { booking: Booking }) {
  return (
    <div className="space-y-2 text-sm">
      <p><span className="text-[var(--text-muted)]">Customer:</span> {booking.customerName}</p>
      <p><span className="text-[var(--text-muted)]">Email:</span> {booking.email}</p>
      <p><span className="text-[var(--text-muted)]">Service:</span> {booking.serviceType}</p>
      <p><span className="text-[var(--text-muted)]">Status:</span> {booking.status}</p>
    </div>
  )
}

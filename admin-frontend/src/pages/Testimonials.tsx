import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Star, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { testimonialsApi } from '@/api/testimonials.api'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/utils/formatters'
import type { Testimonial } from '@/types'

type Filter = 'all' | 'pending' | 'approved'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-[#ddbf61] text-[#ddbf61]' : 'text-gray-200'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [filter, setFilter] = useState<Filter>('all')
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const queryClient = useQueryClient()

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsApi.getAll,
  })

  const approveMutation = useMutation({
    mutationFn: testimonialsApi.approve,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      toast.success('Testimonial approved')
    },
    onError: () => toast.error('Failed to approve'),
  })

  const deleteMutation = useMutation({
    mutationFn: testimonialsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      setDeleteTarget(null)
      toast.success('Testimonial removed')
    },
    onError: () => toast.error('Failed to delete'),
  })

  const filtered = testimonials.filter((t) => {
    if (filter === 'pending') return !t.isApproved
    if (filter === 'approved') return t.isApproved
    return true
  })

  const pendingCount = testimonials.filter((t) => !t.isApproved).length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['all', 'pending', 'approved'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              filter === f
                ? 'bg-[var(--primary-color)] text-white'
                : 'bg-white text-[var(--text-secondary)]'
            }`}
            style={filter !== f ? { boxShadow: 'var(--shadow-sm)' } : undefined}
          >
            {f === 'pending' ? 'Pending Approval' : f}
            {f === 'pending' && pendingCount > 0 && (
              <span className={`ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white ${pendingCount > 0 ? 'pulse-soft' : ''}`}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <SkeletonLoader variant="card" rows={6} />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--border-radius-md)] bg-white py-16" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <Star size={48} className="text-[var(--text-muted)]" />
          <p className="mt-4 text-lg font-medium">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={t._id}
              className="flex flex-col rounded-[var(--border-radius-md)] bg-white p-6 card-hover"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <StarRating rating={t.rating} />
              <p className="mt-3 font-bold text-[var(--text-primary)]">{t.name}</p>
              <p className="mt-2 flex-1 text-sm italic text-[var(--text-secondary)]">&ldquo;{t.comment}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(t.createdAt)}</p>
                  <Badge variant={t.isApproved ? 'success' : 'warning'} className="mt-1">
                    {t.isApproved ? 'Live on Website' : 'Awaiting Approval'}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                {!t.isApproved && (
                  <button
                    type="button"
                    onClick={() => approveMutation.mutate(t._id)}
                    disabled={approveMutation.isPending}
                    className="flex-1 rounded-lg bg-[var(--primary-color)] py-2 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
                  >
                    Approve
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(t)}
                  className={`flex items-center justify-center gap-1 rounded-lg border border-red-200 py-2 text-sm font-medium text-red-600 hover:bg-red-50 ${
                    t.isApproved ? 'flex-1' : 'px-4'
                  }`}
                >
                  <Trash2 size={14} />
                  {t.isApproved ? 'Remove' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget._id)}
        title="Remove Testimonial"
        message={`Remove testimonial from ${deleteTarget?.name}?`}
        confirmLabel="Remove"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}

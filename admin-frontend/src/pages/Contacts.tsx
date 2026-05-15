import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MessageSquare, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { contactsApi } from '@/api/contacts.api'
import { useDebounce } from '@/hooks/useDebounce'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { formatRelativeTime } from '@/utils/formatters'
import type { Contact } from '@/types'

type Filter = 'all' | 'unread' | 'read'

export function Contacts() {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const debouncedSearch = useDebounce(search)
  const queryClient = useQueryClient()

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getAll,
  })

  const markReadMutation = useMutation({
    mutationFn: contactsApi.markAsRead,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      setSelected(updated)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: contactsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      setDeleteId(null)
      setSelected(null)
      toast.success('Contact deleted')
    },
    onError: () => toast.error('Failed to delete contact'),
  })

  const filtered = contacts
    .filter((c) => {
      if (filter === 'unread') return !c.isRead
      if (filter === 'read') return c.isRead
      return true
    })
    .filter((c) => {
      if (!debouncedSearch) return true
      const q = debouncedSearch.toLowerCase()
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    })

  const unreadCount = contacts.filter((c) => !c.isRead).length

  const handleSelect = async (contact: Contact) => {
    setSelected(contact)
    if (!contact.isRead) {
      markReadMutation.mutate(contact._id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'unread', 'read'] as Filter[]).map((f) => (
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
              {f}
              {f === 'unread' && unreadCount > 0 && (
                <span className={`ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white ${unreadCount > 0 ? 'pulse-soft' : ''}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-[var(--border-radius-sm)] border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--primary-color)] sm:w-72"
        />
      </div>

      {isLoading ? (
        <SkeletonLoader variant="card" rows={6} />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--border-radius-md)] bg-white py-16" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <MessageSquare size={48} className="text-[var(--text-muted)]" />
          <p className="mt-4 text-lg font-medium">No contacts yet</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {filtered.map((contact) => (
              <button
                key={contact._id}
                type="button"
                onClick={() => handleSelect(contact)}
                className={`flex w-full items-start gap-4 rounded-[var(--border-radius-sm)] p-4 text-left transition card-hover ${
                  selected?._id === contact._id
                    ? 'ring-2 ring-[var(--primary-color)]'
                    : ''
                } ${!contact.isRead ? 'bg-[#f0f7f0]' : 'bg-white'}`}
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-color)] text-lg font-bold text-white">
                  {contact.name[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-[var(--text-primary)]">{contact.name}</p>
                    <span className="shrink-0 text-xs text-[var(--text-muted)]">
                      {formatRelativeTime(contact.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{contact.email}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--text-secondary)]">
                    {contact.message.slice(0, 100)}
                    {contact.message.length > 100 ? '...' : ''}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {!contact.isRead && <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]" />}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteId(contact._id)
                    }}
                    className="rounded p-1 text-gray-400 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </button>
            ))}
          </div>

          <div
            className="rounded-[var(--border-radius-md)] bg-white p-6 lg:col-span-3"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            {selected ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <p>{selected.email}</p>
                  {selected.phone && <p>{selected.phone}</p>}
                  <p className="text-[var(--text-muted)]">{formatRelativeTime(selected.createdAt)}</p>
                </div>
                <div className="rounded-lg bg-[var(--bg-secondary)] p-4 text-sm leading-relaxed">
                  {selected.message}
                </div>
                <div className="flex gap-3">
                  {!selected.isRead && (
                    <button
                      type="button"
                      onClick={() => markReadMutation.mutate(selected._id)}
                      className="rounded-[var(--border-radius-sm)] bg-[var(--primary-color)] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDeleteId(selected._id)}
                    className="rounded-[var(--border-radius-sm)] border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p className="py-16 text-center text-[var(--text-muted)]">Select a contact to view details</p>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Contact"
        message="Are you sure you want to delete this contact message?"
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}

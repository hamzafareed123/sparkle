import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-5xl w-full max-h-[90vh]',
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        className={`relative z-10 flex w-full flex-col ${sizes[size]} modal-scale-in overflow-hidden rounded-[var(--border-radius-md)] bg-white`}
        style={{ boxShadow: 'var(--shadow-md)' }}
        role="dialog"
        aria-modal="true"
      >
        {title ? (
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        ) : null}
        <div className={`overflow-y-auto ${title ? 'p-6' : ''}`}>{children}</div>
      </div>
    </div>
  )
}

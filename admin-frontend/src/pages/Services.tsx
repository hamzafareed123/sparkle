import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Clock, ImagePlus, Pencil, Plus, Sparkles, Trash2, Loader2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { servicesApi } from '@/api/services.api'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Modal } from '@/components/ui/Modal'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { formatCurrency, slugify } from '@/utils/formatters'
import { getMediaUrl } from '@/utils/media'
import type { Service } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number({ error: 'Price is required' }).min(0, 'Price must be positive'),
  duration: z.string().min(1, 'Duration is required'),
  isActive: z.boolean(),
})

type FormData = z.infer<typeof schema>

export function Services() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isActive: true },
  })

  const watchName = watch('name')

  useEffect(() => {
    if (!editing && watchName) {
      setValue('slug', slugify(watchName))
    }
  }, [watchName, editing, setValue])

  const clearImageState = () => {
    if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const saveMutation = useMutation({
    mutationFn: ({ data, image }: { data: FormData; image: File | null }) =>
      editing ? servicesApi.update(editing._id, data, image) : servicesApi.create(data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success(editing ? 'Service updated' : 'Service created')
      closeModal()
    },
    onError: () => toast.error('Failed to save service'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setDeleteTarget(null)
      toast.success('Service deleted')
    },
    onError: () => toast.error('Failed to delete service'),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ service, isActive }: { service: Service; isActive: boolean }) =>
      servicesApi.update(service._id, {
        name: service.name,
        slug: service.slug,
        description: service.description,
        price: service.price,
        duration: service.duration,
        isActive,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service status updated')
    },
  })

  const openCreate = () => {
    setEditing(null)
    clearImageState()
    reset({ name: '', slug: '', description: '', price: 0, duration: '', isActive: true })
    setModalOpen(true)
  }

  const openEdit = (service: Service) => {
    setEditing(service)
    clearImageState()
    setImagePreview(getMediaUrl(service.image))
    reset({
      name: service.name,
      slug: service.slug,
      description: service.description,
      price: service.price,
      duration: service.duration,
      isActive: service.isActive,
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditing(null)
    clearImageState()
  }

  const onSubmit = (data: FormData) => {
    saveMutation.mutate({ data, image: imageFile })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">{services.length} services</p>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-[var(--border-radius-sm)] bg-[var(--primary-color)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {isLoading ? (
        <SkeletonLoader variant="card" rows={6} />
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--border-radius-md)] bg-white py-16" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <Sparkles size={48} className="text-[var(--text-muted)]" />
          <p className="mt-4 text-lg font-medium">No services yet</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const imgUrl = getMediaUrl(service.image)
            return (
              <div
                key={service._id}
                className="flex flex-col overflow-hidden rounded-[var(--border-radius-md)] bg-white card-hover"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="relative h-40 bg-[var(--bg-secondary)]">
                  {imgUrl ? (
                    <img src={imgUrl} alt={service.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImagePlus size={32} className="text-[var(--text-muted)]" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{service.name}</h3>
                  <p className="mt-1 text-2xl font-bold text-[#ddbf61]">{formatCurrency(service.price)}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                    <Clock size={14} />
                    {service.duration}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">{service.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={service.isActive}
                        onChange={() =>
                          toggleMutation.mutate({ service, isActive: !service.isActive })
                        }
                        className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-gray-300 transition checked:bg-[var(--primary-color)]"
                      />
                      <span className="text-xs text-[var(--text-muted)]">
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(service)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-[#f0f7f0] hover:text-[var(--primary-color)]"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(service)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? 'Edit Service' : 'Add Service'}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Service Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-[var(--border-radius-sm)]">
                <img src={imagePreview} alt="Preview" className="h-40 w-full object-cover" />
                <button
                  type="button"
                  onClick={clearImageState}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-[var(--border-radius-sm)] border-2 border-dashed border-gray-200 py-8 text-sm text-[var(--text-muted)] transition hover:border-[var(--primary-color)] hover:bg-[#f0f7f0]"
              >
                <ImagePlus size={28} />
                Click to upload image (max 5MB)
              </button>
            )}
            {!imagePreview && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm text-[var(--primary-color)] hover:underline"
              >
                Choose file
              </button>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Service Name</label>
            <input {...register('name')} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Slug</label>
            <input {...register('slug')} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea {...register('description')} rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Price ($)</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Duration</label>
              <input {...register('duration')} placeholder="2-3 hours" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isActive')} className="rounded" />
            <span className="text-sm">Active on website</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={closeModal} className="rounded-lg border px-4 py-2 text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || saveMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {(isSubmitting || saveMutation.isPending) && <Loader2 size={16} className="animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget._id)}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}

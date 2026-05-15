import api, { unwrap } from '@/lib/axios'
import type { Service } from '@/types'

export interface ServiceInput {
  name: string
  slug: string
  description: string
  price: number
  duration: string
  isActive: boolean
}

function toFormData(input: Partial<ServiceInput>, image?: File | null): FormData {
  const form = new FormData()
  if (input.name !== undefined) form.append('name', input.name)
  if (input.slug !== undefined) form.append('slug', input.slug)
  if (input.description !== undefined) form.append('description', input.description)
  if (input.price !== undefined) form.append('price', String(input.price))
  if (input.duration !== undefined) form.append('duration', input.duration)
  if (input.isActive !== undefined) form.append('isActive', String(input.isActive))
  if (image) form.append('image', image)
  return form
}

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get('/api/services/all')
    const result = unwrap<{ services: Service[] }>(data)
    return result.services
  },

  create: async (input: ServiceInput, image?: File | null): Promise<Service> => {
    const { data } = await api.post('/api/services', toFormData(input, image), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const result = unwrap<{ service: Service }>(data)
    return result.service
  },

  update: async (id: string, input: Partial<ServiceInput>, image?: File | null): Promise<Service> => {
    const { data } = await api.patch(`/api/services/${id}`, toFormData(input, image), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const result = unwrap<{ service: Service }>(data)
    return result.service
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/services/${id}`)
  },
}

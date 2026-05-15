import api, { unwrap } from '@/lib/axios'
import type { Testimonial } from '@/types'

export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const { data } = await api.get('/api/testimonials/all')
    const result = unwrap<{ testimonials: Testimonial[] }>(data)
    return result.testimonials
  },

  approve: async (id: string): Promise<Testimonial> => {
    const { data } = await api.patch(`/api/testimonials/${id}/approve`)
    const result = unwrap<{ testimonial: Testimonial }>(data)
    return result.testimonial
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/testimonials/${id}`)
  },
}

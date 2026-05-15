import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'
import type { Testimonial } from '../types'

export const testimonialsApi = {
  getApproved: async (): Promise<Testimonial[]> => {
    const { data } = await apiClient.get('/testimonials')
    const result = unwrap<{ testimonials: Testimonial[] }>(data)
    return result.testimonials
  },

  submit: async (input: { name: string; rating: number; comment: string }) => {
    const { data } = await apiClient.post('/testimonials', input)
    return unwrap<{ testimonial: Testimonial }>(data)
  },
}

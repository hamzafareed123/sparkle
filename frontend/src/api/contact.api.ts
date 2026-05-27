import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'
import type { ContactInput } from '../types'

export const contactApi = {
  submit: async (input: ContactInput) => {
    const { data } = await apiClient.post('/contact', input)
    return unwrap<{ message: string; contact: unknown; emailSent: boolean }>(data)
  },
}

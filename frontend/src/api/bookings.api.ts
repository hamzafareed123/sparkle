import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'
import type { BookingInput } from '../types'

export const bookingsApi = {
  create: async (input: BookingInput) => {
    const { data } = await apiClient.post('/bookings', input)
    const result = unwrap<{ message: string; booking: { _id: string } }>(data)
    return result
  },
}

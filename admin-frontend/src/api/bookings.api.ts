import api, { unwrap } from '@/lib/axios'
import type { Booking, BookingsResponse, BookingStatus } from '@/types'

export interface BookingFilters {
  status?: BookingStatus | ''
  page?: number
  limit?: number
}

export const bookingsApi = {
  getAll: async (filters: BookingFilters = {}): Promise<BookingsResponse> => {
    const params: Record<string, string | number> = {}
    if (filters.status) params.status = filters.status
    if (filters.page) params.page = filters.page
    if (filters.limit) params.limit = filters.limit
    const { data } = await api.get('/api/bookings', { params })
    return unwrap<BookingsResponse>(data)
  },

  getById: async (id: string): Promise<Booking> => {
    const { data } = await api.get(`/api/bookings/${id}`)
    const result = unwrap<{ booking: Booking }>(data)
    return result.booking
  },

  updateStatus: async (id: string, status: BookingStatus): Promise<Booking> => {
    const { data } = await api.patch(`/api/bookings/${id}/status`, { status })
    const result = unwrap<{ booking: Booking }>(data)
    return result.booking
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/bookings/${id}`)
  },
}

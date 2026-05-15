import api, { unwrap } from '@/lib/axios'
import type { Payment } from '@/types'

export const paymentsApi = {
  getAll: async (): Promise<Payment[]> => {
    const { data } = await api.get('/api/payments')
    const result = unwrap<{ payments: Payment[] }>(data)
    return result.payments
  },

  refund: async (id: string): Promise<void> => {
    await api.post(`/api/payments/refund/${id}`)
  },
}

import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'

export const paymentsApi = {
  createIntent: async (
    bookingId: string,
    amount: number,
    paymentType: 'deposit' | 'full' = 'deposit',
  ) => {
    const { data } = await apiClient.post('/payments/intent', {
      bookingId,
      amount,
      paymentType,
    })
    return unwrap<{ clientSecret: string; paymentIntentId: string }>(data)
  },

  confirmPayment: async (paymentIntentId: string) => {
    const { data } = await apiClient.post('/payments/confirm', { paymentIntentId })
    return unwrap<{
      bookingId: string
      paymentStatus: string
      amount: number
      alreadyProcessed?: boolean
    }>(data)
  },
}

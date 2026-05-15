import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'
import type { User } from '../types'

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password })
    const result = unwrap<{ token: string; user: User; message?: string }>(data)
    return { token: result.token, user: result.user }
  },

  register: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/register', { email, password })
    const result = unwrap<{ token: string; user: User; message?: string }>(data)
    return { token: result.token, user: result.user }
  },
}

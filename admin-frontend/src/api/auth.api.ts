import api, { unwrap } from '@/lib/axios'
import type { User } from '@/types'

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    const result = unwrap<{ token: string; user: User }>(data)
    return { token: result.token, user: result.user }
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get('/api/auth/me')
    const result = unwrap<{ user: User }>(data)
    return result.user
  },
}

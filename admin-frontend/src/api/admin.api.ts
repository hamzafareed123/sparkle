import api, { unwrap } from '@/lib/axios'
import type { AdminStats } from '@/types'

export const adminApi = {
  getDashboardStats: async (): Promise<AdminStats> => {
    const { data } = await api.get('/api/admin/stats')
    const result = unwrap<{ stats: AdminStats }>(data)
    return result.stats
  },
}

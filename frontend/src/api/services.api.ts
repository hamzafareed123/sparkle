import { apiClient } from './axios'
import { unwrap } from '../utils/unwrap'
import type { Service } from '../types'

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await apiClient.get('/services')
    const result = unwrap<{ services: Service[] }>(data)
    return result.services
  },
}

import api, { unwrap } from '@/lib/axios'
import type { Contact } from '@/types'

export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    const { data } = await api.get('/api/contact')
    const result = unwrap<{ contacts: Contact[] }>(data)
    return result.contacts
  },

  markAsRead: async (id: string): Promise<Contact> => {
    const { data } = await api.patch(`/api/contact/${id}/read`)
    const result = unwrap<{ contact: Contact }>(data)
    return result.contact
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/contact/${id}`)
  },
}

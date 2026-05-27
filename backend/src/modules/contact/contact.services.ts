import { contactRepositories } from './contact.repositories'
import { sendContactNotification } from '../../email/sendContactEmail'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'

export const contactServices = {
  submit: async (data: { name: string; email: string; phone?: string; message: string }) => {
    const contact = await contactRepositories.create(data)
    let emailSent = true
    try {
      await sendContactNotification(data.name, data.email, data.phone, data.message)
    } catch (e) {
      console.warn('Email failed:', e)
      emailSent = false
    }
    return { contact, emailSent }
  },

  getAll: () => contactRepositories.findAll(),

  markAsRead: async (id: string) => {
    const contact = await contactRepositories.markAsRead(id)
    if (!contact) throw new CustomError(ERROR_MESSAGES.CONTACT_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return contact
  },

  delete: async (id: string) => {
    const contact = await contactRepositories.delete(id)
    if (!contact) throw new CustomError(ERROR_MESSAGES.CONTACT_NOT_FOUND, STATUS_CODE.NOT_FOUND)
  },
}

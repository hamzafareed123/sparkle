import { testimonialRepositories } from './testimonial.repositories'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'

export const testimonialServices = {
  submit: (data: object) => testimonialRepositories.create(data),
  getApproved: () => testimonialRepositories.findApproved(),
  getAll: () => testimonialRepositories.findAll(),

  approve: async (id: string) => {
    const t = await testimonialRepositories.approve(id)
    if (!t) throw new CustomError(ERROR_MESSAGES.TESTIMONIAL_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return t
  },

  delete: async (id: string) => {
    const t = await testimonialRepositories.delete(id)
    if (!t) throw new CustomError(ERROR_MESSAGES.TESTIMONIAL_NOT_FOUND, STATUS_CODE.NOT_FOUND)
  },
}

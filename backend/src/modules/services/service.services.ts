import { serviceRepositories } from './service.repositories'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'

export const serviceServices = {
  getAll: () => serviceRepositories.findAll({ isActive: true }),

  getBySlug: async (slug: string) => {
    const service = await serviceRepositories.findBySlug(slug)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return service
  },

  create: async (data: object) => serviceRepositories.create(data),

  update: async (id: string, data: object) => {
    const service = await serviceRepositories.update(id, data)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return service
  },

  delete: async (id: string) => {
    const service = await serviceRepositories.delete(id)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
  },
}

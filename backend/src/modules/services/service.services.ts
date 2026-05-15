import { serviceRepositories } from './service.repositories'
import { CustomError } from '../../utils/customError'
import { STATUS_CODE } from '../../constants/statusCode'
import { ERROR_MESSAGES } from '../../constants/errorMessages'
import { deleteUploadedFile } from '../../utils/deleteFile'

export const serviceServices = {
  getAllPublic: () => serviceRepositories.findAll({ isActive: true }),

  getAllAdmin: () => serviceRepositories.findAll({}),

  getBySlug: async (slug: string) => {
    const service = await serviceRepositories.findBySlug(slug)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return service
  },

  create: async (data: object) => serviceRepositories.create(data),

  update: async (id: string, data: Record<string, unknown>) => {
    const existing = await serviceRepositories.findById(id)
    if (!existing) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)

    if (data.image && existing.image && data.image !== existing.image) {
      deleteUploadedFile(existing.image)
    }

    const service = await serviceRepositories.update(id, data)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    return service
  },

  delete: async (id: string) => {
    const service = await serviceRepositories.delete(id)
    if (!service) throw new CustomError(ERROR_MESSAGES.SERVICE_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    if (service.image) deleteUploadedFile(service.image)
  },
}

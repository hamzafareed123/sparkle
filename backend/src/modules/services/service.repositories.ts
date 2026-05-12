import { ServiceModel } from '../../models'

export const serviceRepositories = {
  findAll: (filter: object) => ServiceModel.find(filter).sort({ createdAt: -1 }),
  findBySlug: (slug: string) => ServiceModel.findOne({ slug }),
  findById: (id: string) => ServiceModel.findById(id),
  create: (data: object) => ServiceModel.create(data),
  update: (id: string, data: object) => ServiceModel.findByIdAndUpdate(id, data, { new: true }),
  delete: (id: string) => ServiceModel.findByIdAndDelete(id),
}

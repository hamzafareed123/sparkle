import { ContactModel } from '../../models'

export const contactRepositories = {
  create: (data: object) => ContactModel.create(data),
  findAll: () => ContactModel.find().sort({ createdAt: -1 }),
  findById: (id: string) => ContactModel.findById(id),
  markAsRead: (id: string) => ContactModel.findByIdAndUpdate(id, { isRead: true }, { new: true }),
  delete: (id: string) => ContactModel.findByIdAndDelete(id),
  countUnread: () => ContactModel.countDocuments({ isRead: false }),
}

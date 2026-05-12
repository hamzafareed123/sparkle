import { TestimonialModel } from '../../models'

export const testimonialRepositories = {
  create: (data: object) => TestimonialModel.create(data),
  findApproved: () => TestimonialModel.find({ isApproved: true }).sort({ createdAt: -1 }),
  findAll: () => TestimonialModel.find().sort({ createdAt: -1 }),
  approve: (id: string) => TestimonialModel.findByIdAndUpdate(id, { isApproved: true }, { new: true }),
  delete: (id: string) => TestimonialModel.findByIdAndDelete(id),
}

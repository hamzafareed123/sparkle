import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { ServiceModel, UserModel, TestimonialModel } from '../models'

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI as string)
  console.log('Connected for seeding')

  await ServiceModel.deleteMany({})
  await UserModel.deleteMany({})
  await TestimonialModel.deleteMany({})

  await UserModel.create({ email: 'admin@sparkle.com', password: 'admin123', role: 'ADMIN' })
  console.log('Admin user created: admin@sparkle.com / admin123')

  await ServiceModel.insertMany([
    { name: 'Carpet Cleaning', slug: 'carpet-cleaning', description: 'Deep steam carpet cleaning', price: 99, duration: '2-3 hours', isActive: true },
    { name: 'Upholstery Cleaning', slug: 'upholstery-cleaning', description: 'Professional sofa and furniture cleaning', price: 79, duration: '1-2 hours', isActive: true },
    { name: 'Pet Stain Removal', slug: 'pet-stain-removal', description: 'Eco-friendly pet stain and odour removal', price: 89, duration: '1-2 hours', isActive: true },
    { name: 'Commercial Cleaning', slug: 'commercial-cleaning', description: 'Office and business cleaning services', price: 149, duration: '3-4 hours', isActive: true },
  ])
  console.log(' Services seeded')

  await TestimonialModel.insertMany([
    { name: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing service! My carpets look brand new.', isApproved: true },
    { name: 'Mike Peters', rating: 5, comment: 'Professional and eco-friendly. Will use again!', isApproved: true },
    { name: 'Emma Wilson', rating: 4, comment: 'Great pet stain removal. Very happy with the results.', isApproved: true },
  ])
  console.log('Testimonials seeded')

  console.log('Seeding complete')
  await mongoose.disconnect()
}

seed().catch((err) => { console.error(err); process.exit(1) })

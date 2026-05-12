import { Router } from 'express'
import { bookingController } from './booking.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validation.middleware'
import { createBookingSchema, updateStatusSchema } from './booking.validator'

const router = Router()

router.post('/', validate(createBookingSchema), bookingController.create)
router.get('/', protect, bookingController.getAll)
router.get('/:id', protect, bookingController.getById)
router.patch('/:id/status', protect, validate(updateStatusSchema), bookingController.updateStatus)
router.delete('/:id', protect, bookingController.delete)

export default router

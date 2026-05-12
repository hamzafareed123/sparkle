import { Router } from 'express'
import { testimonialController } from './testimonial.controller'
import { protect } from '../../middleware/auth.middleware'

const router = Router()

router.post('/', testimonialController.submit)
router.get('/', testimonialController.getApproved)
router.get('/all', protect, testimonialController.getAll)
router.patch('/:id/approve', protect, testimonialController.approve)
router.delete('/:id', protect, testimonialController.delete)

export default router

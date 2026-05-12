import { Router } from 'express'
import { contactController } from './contact.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validation.middleware'
import { contactSchema } from './contact.validator'

const router = Router()

router.post('/', validate(contactSchema), contactController.submit)
router.get('/', protect, contactController.getAll)
router.patch('/:id/read', protect, contactController.markAsRead)
router.delete('/:id', protect, contactController.delete)

export default router

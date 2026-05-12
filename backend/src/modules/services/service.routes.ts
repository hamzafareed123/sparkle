import { Router } from 'express'
import { serviceController } from './service.controller'
import { protect } from '../../middleware/auth.middleware'

const router = Router()

router.get('/', serviceController.getAll)
router.get('/:slug', serviceController.getBySlug)
router.post('/', protect, serviceController.create)
router.patch('/:id', protect, serviceController.update)
router.delete('/:id', protect, serviceController.delete)

export default router

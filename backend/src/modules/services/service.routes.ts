import { Router } from 'express'
import { serviceController } from './service.controller'
import { protect } from '../../middleware/auth.middleware'
import { uploadServiceImage } from '../../middleware/upload.middleware'

const router = Router()

router.get('/', serviceController.getAll)
router.get('/all', protect, serviceController.getAllForAdmin)
router.get('/:slug', serviceController.getBySlug)
router.post('/', protect, uploadServiceImage.single('image'), serviceController.create)
router.patch('/:id', protect, uploadServiceImage.single('image'), serviceController.update)
router.delete('/:id', protect, serviceController.delete)

export default router

import { Router } from 'express'
import { adminController } from './admin.controller'
import { protect } from '../../middleware/auth.middleware'
import { restrictTo } from '../../middleware/role.middleware'

const router = Router()

router.use(protect)

router.get('/stats', adminController.getDashboardStats)

export default router

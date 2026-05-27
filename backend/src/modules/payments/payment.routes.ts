import { Router } from 'express'
import { paymentController } from './payment.controller'
import { protect } from '../../middleware/auth.middleware'

const router = Router()

router.post('/intent', paymentController.createIntent)
router.post('/confirm', paymentController.confirmPayment)
router.post('/remaining-intent', paymentController.createRemainingIntent)
router.post('/webhook', paymentController.webhook)
router.get('/', protect, paymentController.getAll)
router.post('/refund/:id', protect, paymentController.refund)

export default router

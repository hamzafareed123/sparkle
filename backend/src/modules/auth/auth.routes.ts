import { Router } from 'express'
import { authController } from './auth.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validation.middleware'
import { authLimiter } from '../../middleware/rateLimiter'
import { loginSchema, registerSchema } from './auth.validator'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', authLimiter, validate(loginSchema), authController.login)
router.get('/me', protect, authController.getMe)

export default router

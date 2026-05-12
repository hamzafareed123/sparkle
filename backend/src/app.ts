import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import { env } from './config/env'
import { connectDB } from './config/db'
import { globalLimiter } from './middleware/rateLimiter'
import { outputHandler } from './middleware/outputHandler'
import { errorHandler } from './middleware/errorHandler'

import authRoutes from './modules/auth/auth.routes'
import bookingRoutes from './modules/bookings/booking.routes'
import contactRoutes from './modules/contact/contact.routes'
import serviceRoutes from './modules/services/service.routes'
import testimonialRoutes from './modules/testimonials/testimonial.routes'
import paymentRoutes from './modules/payments/payment.routes'
import adminRoutes from './modules/admin/admin.routes'

const app = express()

// Connect DB
connectDB()

// Security
app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(globalLimiter)
app.use(morgan('dev'))

// Stripe webhook needs raw body — before json parser
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../upload')))

// Output wrapper
app.use(outputHandler)

// Health check
app.get('/health', (req, res) => res.json({ success: true, status: 'ok', env: env.nodeEnv }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin', adminRoutes)

// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }))

// Error handler
app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
  console.log(`Environment: ${env.nodeEnv}`)
  console.log(`Mongo Express: http://localhost:8081`)
})

export default app

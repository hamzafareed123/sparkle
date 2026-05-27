import dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
  mongoUri: process.env.MONGO_URI as string,
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  stripe: {
    secretKey: (process.env.STRIPE_SECRET_KEY as string || '').trim(),
    webhookSecret: (process.env.STRIPE_WEBHOOK_SECRET as string || '').trim(),
  },
  email: {
    host: process.env.EMAIL_HOST as string,
    port: Number(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
}

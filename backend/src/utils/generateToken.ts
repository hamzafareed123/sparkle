import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export const generateToken = (id: string): string =>
  jwt.sign({ id }, env.jwt.secret, { expiresIn: env.jwt.expiresIn as any })

export const verifyToken = (token: string): { id: string } =>
  jwt.verify(token, env.jwt.secret) as { id: string }

import fs from 'fs'
import multer from 'multer'
import path from 'path'

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const bookingStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = 'upload/booking-files'
    ensureDir(dir)
    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const serviceImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = 'upload/service-images'
    ensureDir(dir)
    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const imageFilter = (_req: unknown, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = /jpeg|jpg|png|webp|gif/
  const valid = allowed.test(path.extname(file.originalname).toLowerCase())
  valid ? cb(null, true) : cb(new Error('Only image files (jpeg, png, webp, gif) are allowed'))
}

export const upload = multer({
  storage: bookingStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

export const uploadServiceImage = multer({
  storage: serviceImageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

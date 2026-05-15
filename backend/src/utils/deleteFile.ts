import fs from 'fs'
import path from 'path'

export function deleteUploadedFile(fileUrl?: string) {
  if (!fileUrl || !fileUrl.startsWith('/uploads/')) return
  const relative = fileUrl.replace('/uploads/', '')
  const filePath = path.join(process.cwd(), 'upload', relative)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

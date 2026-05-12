import { Request, Response, NextFunction } from 'express'

export const outputHandler = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res)
  res.json = (data: any) => {
    if (data && !data.success && !data.message?.toLowerCase().includes('error')) {
      return originalJson({ success: true, data })
    }
    return originalJson(data)
  }
  next()
}

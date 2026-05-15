const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function getMediaUrl(path?: string): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

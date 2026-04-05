const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS || 10000),
} as const

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${apiConfig.baseUrl}${normalizedPath}`
}

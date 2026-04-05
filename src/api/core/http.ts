import { apiConfig, buildApiUrl } from './config'
import { ApiError, NetworkError } from './errors'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: HeadersInit
  signal?: AbortSignal
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  if (contentType.includes('text/')) {
    return response.text()
  }

  return null
}

export async function request<TResponse>(path: string, options: RequestOptions = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), apiConfig.timeoutMs)

  try {
    const response = await fetch(buildApiUrl(path), {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal || controller.signal,
    })

    const payload = await parseResponse(response)

    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}.`, response.status, payload)
    }

    return payload as TResponse
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new NetworkError(error instanceof Error ? error.message : undefined)
  } finally {
    window.clearTimeout(timeout)
  }
}

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export class NetworkError extends Error {
  constructor(message = 'Unable to reach the server.') {
    super(message)
    this.name = 'NetworkError'
  }
}

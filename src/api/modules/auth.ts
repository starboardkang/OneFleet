import { request } from '../core'
import type { AuthTokenResponse, LoginRequest } from '../../types/api/auth'

export function login(payload: LoginRequest) {
  return request<AuthTokenResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  })
}

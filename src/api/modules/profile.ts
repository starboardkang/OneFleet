import { request } from '../core'
import type { RequesterProfileDto, UpdateRequesterProfileRequest } from '../../types/api/profile'

export function getRequesterProfile() {
  return request<RequesterProfileDto>('/requester/profile')
}

export function updateRequesterProfile(payload: UpdateRequesterProfileRequest) {
  return request<RequesterProfileDto>('/requester/profile', {
    method: 'PATCH',
    body: payload,
  })
}

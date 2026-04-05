import { request } from '../core'
import type {
  CreateRequestPayload,
  RequestDetailsDto,
  RequestListItemDto,
  UpdateRequestPayload,
} from '../../types/api/requests'

export function getRequests() {
  return request<RequestListItemDto[]>('/requests')
}

export function getRequestById(requestId: string) {
  return request<RequestDetailsDto>(`/requests/${requestId}`)
}

export function createRequest(payload: CreateRequestPayload) {
  return request<RequestDetailsDto>('/requests', {
    method: 'POST',
    body: payload,
  })
}

export function updateRequest(requestId: string, payload: UpdateRequestPayload) {
  return request<RequestDetailsDto>(`/requests/${requestId}`, {
    method: 'PATCH',
    body: payload,
  })
}

export function deleteRequest(requestId: string) {
  return request<void>(`/requests/${requestId}`, {
    method: 'DELETE',
  })
}

export function resubmitRequest(requestId: string) {
  return request<RequestDetailsDto>(`/requests/${requestId}/resubmit`, {
    method: 'POST',
  })
}

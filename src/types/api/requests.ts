export type RequestStatusDto = 'Approved' | 'Processing' | 'Denied'

export type RequestTypeDto =
  | 'DRIVER ONLY'
  | 'VEHICLE ONLY'
  | 'DRIVER AND VEHICLE'
  | 'GENSET'
  | 'HEAVY EQUIPMENT'

export type RequestListItemDto = {
  id: string
  requestType: RequestTypeDto
  requestedAt: string
  requestedOn: string
  status: RequestStatusDto
  destination: string
  schedule: string
  driver: string
  vehicle: string
  remarks: string
}

export type RequestDetailsDto = RequestListItemDto & {
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateFrom: string
  dateTo: string
  timeNeeded: string
  plateNumber: string
}

export type CreateRequestPayload = {
  requestType: RequestTypeDto
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateFrom: string
  dateTo: string
  timeNeeded: string
}

export type UpdateRequestPayload = Partial<CreateRequestPayload>

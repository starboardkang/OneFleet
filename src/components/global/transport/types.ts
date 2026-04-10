export type RequestType =
  | 'DRIVER ONLY'
  | 'VEHICLE ONLY'
  | 'DRIVER AND VEHICLE'
  | 'GENSET'
  | 'HEAVY EQUIPMENT'

export type RequestFormValues = {
  requestType: RequestType
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateFrom: string
  dateTo: string
  timeNeeded: string
}

export type RequestStatus = 'Approved' | 'Processing' | 'Denied'

export type RequestItem = {
  id: string
  tripType: string
  requestedAt: string
  requestedOn: string
  status: RequestStatus
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateFrom: string
  dateTo: string
  timeNeeded: string
  driver: string
  vehicle: string
  plateNumber: string
  destination: string
  schedule: string
  remarks: string
}

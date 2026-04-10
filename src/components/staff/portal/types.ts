import type { ReactNode } from 'react'
import type { RequestFormValues } from '../../global/transport/types'

export type StaffSection = {
  title: string
  items: Array<{
    label: string
    icon: ReactNode
  }>
}

export type StaffRequestStatus = 'Approved' | 'Denied' | 'Processing'
export type TransportTab = 'all' | 'dispatch' | 'approval'
export type RequestListView = 'active' | 'past'

export type VehicleOption = {
  id: string
  label: string
  plateNumber: string
  reserved: boolean
}

export type DriverOption = {
  id: string
  name: string
  contactNumber: string
}

export type StaffRequestItem = {
  id: string
  requestedOn: string
  requestType: RequestFormValues['requestType']
  requester: string
  requesterPhone: string
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateFrom: string
  dateTo: string
  timeNeeded: string
  plateNumber: string
  vehicle: string
  destination: string
  neededAt: string
  status: StaffRequestStatus
  view: RequestListView
  remarks: string
}

export type ApprovalDispatchItem = {
  drn: string
  requester: string
  destination: string
  dateFrom: string
  dateTo: string
  assignedDriverName: string
  assignedDriverContact: string
  vehicleType: string
  vehiclePlateNumber: string
  gasAllocationReference: string
  overtimeRequest: string
  status: 'For Approval'
}

export type DispatchFormState = {
  drn: string
  assignedDriverName: string
  assignedDriverContact: string
  vehicleType: string
  vehiclePlateNumber: string
  gasAllocationReference: string
  overtimeRequest: string
}

import type { ReactNode } from 'react'
import type { RemarkHistoryEntry, RequestFormValues } from '../../global/transport/types'

export type StaffSection = {
  title: string
  items: Array<{
    label: string
    icon: ReactNode
  }>
}

export type StaffRequestStatus = 'Approved' | 'Ongoing' | 'Completed' | 'Denied' | 'Processing'
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
  createdByStaffName?: string
  requester: string
  requesterPhone: string
  assignedDriverName?: string
  assignedDriverContact?: string
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
  dispatchQueued?: boolean
  view: RequestListView
  remarks: string
  remarksHistory: RemarkHistoryEntry[]
}

export type VehicleOccupancyEntry = {
  id: string
  vehicleId: string
  requestId: string
  startDate: string
  endDate: string
}

export type ApprovalDispatchItem = {
  drn: string
  sourceRequest: StaffRequestItem
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
  dispatchRemarks: string
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
  dispatchRemarks: string
}

import type { RemarkHistoryEntry, RequestFormValues, RequestItem } from '../../global/transport/types'
import type { StaffRequestItem } from './types'

export function formatLongDate(dateValue: string) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateRange(dateFrom: string, dateTo: string) {
  return dateFrom === dateTo ? dateFrom : `${dateFrom} to ${dateTo}`
}

export function createRemarkEntry(
  idPrefix: string,
  index: number,
  author: string,
  message: string,
  createdAt: string,
  viewedByRequester = false,
): RemarkHistoryEntry {
  return {
    id: `${idPrefix.replace(/\s+/g, '')}-${index}`,
    author,
    date: formatLongDate(createdAt.slice(0, 10)),
    message,
    createdAt,
    viewedByRequester,
  }
}

export function buildStaffRequestFromForm(
  values: RequestFormValues,
  id: string,
  requester: string,
  requestedOn: string,
): StaffRequestItem {
  const requestTypeLabel =
    values.requestType === 'DRIVER ONLY'
      ? 'Driver Only'
      : values.requestType === 'VEHICLE ONLY'
        ? 'Vehicle Only'
        : values.requestType === 'GENSET'
          ? 'Genset'
          : values.requestType === 'HEAVY EQUIPMENT'
            ? 'Heavy Equipment'
            : 'Driver and Vehicle'

  return {
    id,
    requestedOn: formatLongDate(requestedOn),
    requestType: values.requestType,
    requester,
    requesterPhone: '+63 912 345 6789',
    passengerNames: values.passengerNames,
    purpose: values.purpose,
    street: values.street,
    province: values.province,
    city: values.city,
    dateFrom: formatLongDate(values.dateFrom),
    dateTo: formatLongDate(values.dateTo),
    timeNeeded: values.timeNeeded,
    plateNumber: 'Pending assignment',
    vehicle: 'Pending vehicle assignment',
    destination: values.street,
    neededAt: `${formatDateRange(formatLongDate(values.dateFrom), formatLongDate(values.dateTo))} - ${values.timeNeeded} PST`,
    status: 'Processing',
    dispatchQueued: false,
    view: 'active',
    remarks: `Your ${requestTypeLabel.toLowerCase()} request has been submitted and is currently being reviewed by the dispatch office.`,
    remarksHistory: [
      createRemarkEntry(
        id,
        1,
        'Dispatch Office',
        `Your ${requestTypeLabel.toLowerCase()} request has been submitted and is currently being reviewed by the dispatch office.`,
        `${requestedOn}T08:00:00+08:00`,
      ),
    ],
  }
}

export function mapStaffRequestToTripDetails(request: StaffRequestItem): RequestItem {
  const tripType =
    request.requestType === 'DRIVER ONLY'
      ? 'Driver Only'
      : request.requestType === 'VEHICLE ONLY'
        ? 'Vehicle Only'
        : request.requestType === 'GENSET'
          ? 'Genset'
          : request.requestType === 'HEAVY EQUIPMENT'
            ? 'Heavy Equipment'
            : 'Driver and Vehicle'

  return {
    id: request.id,
    tripType,
    requestedAt: `Requested: ${request.requestedOn}`,
    requestedOn: request.requestedOn,
    status: request.status,
    passengerNames: request.passengerNames,
    purpose: request.purpose,
    street: request.street,
    province: request.province,
    city: request.city,
    dateFrom: request.dateFrom,
    dateTo: request.dateTo,
    timeNeeded: request.timeNeeded,
    driver: request.assignedDriverName ?? request.requester,
    vehicle: request.vehicle,
    plateNumber: request.plateNumber,
    destination: request.destination,
    schedule: request.neededAt,
    remarks: request.remarks,
    remarksHistory: request.remarksHistory,
  }
}

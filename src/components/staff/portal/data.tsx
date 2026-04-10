import type {
  DriverOption,
  StaffRequestItem,
  StaffSection,
  VehicleOccupancyEntry,
  VehicleOption,
} from './types'

export const roleOptions = [
  'Super Administrator',
  'Administrator',
  'Fleet Manager',
  'Dispatcher',
  'Inspector',
  'Driver',
  'Clerk',
] as const

export const availableDrivers: DriverOption[] = [
  { id: 'drv-001', name: 'Juan Luna', contactNumber: '+63 912 345 6789' },
  { id: 'drv-002', name: 'Maria Santos', contactNumber: '+63 917 221 3401' },
  { id: 'drv-003', name: 'Carlo Reyes', contactNumber: '+63 918 884 1120' },
  { id: 'drv-004', name: 'Andrea Cruz', contactNumber: '+63 919 557 2284' },
]

export const vehicleCatalog: VehicleOption[] = [
  { id: 'veh-001', label: 'Toyota Avanza', plateNumber: 'SAB - 2132', reserved: true },
  { id: 'veh-002', label: 'Toyota Innova', plateNumber: 'SAA - 1098', reserved: false },
  { id: 'veh-003', label: 'Mitsubishi Montero Sport', plateNumber: 'NBC - 4417', reserved: false },
  { id: 'veh-004', label: 'Hyundai Starex', plateNumber: 'TQR - 2026', reserved: false },
]

export const transportRequests: StaffRequestItem[] = [
  {
    id: 'RVDSS - 001',
    requestedOn: 'March 15, 2026',
    requestType: 'DRIVER AND VEHICLE',
    createdByStaffName: 'Juan Luna',
    requester: 'Juan Luna',
    requesterPhone: '+63 912 345 6789',
    passengerNames: ['Juan Luna'],
    purpose: 'Official transport request',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: 'March 27, 2026',
    dateTo: 'March 27, 2026',
    timeNeeded: '13:00 PST',
    plateNumber: 'SAB - 2132',
    vehicle: 'SAB - 2132 - Toyota Avanza',
    destination: 'Kapitolyo',
    neededAt: 'March 27, 2026 - 13:00 PST',
    status: 'Completed',
    view: 'past',
    dispatchQueued: false,
    remarks:
      'Driver and vehicle request has been approved please arrive at the designated pick up location on-time.',
    remarksHistory: [
      {
        id: 'RVDSS-001-1',
        author: 'Dispatch Office',
        date: 'March 15, 2026',
        createdAt: '2026-03-15T09:00:00+08:00',
        message:
          'Driver and vehicle request has been approved please arrive at the designated pick up location on-time.',
        viewedByRequester: true,
      },
    ],
  },
  {
    id: 'RVDSS - 002',
    requestedOn: 'March 15, 2026',
    requestType: 'DRIVER AND VEHICLE',
    createdByStaffName: 'Juan Luna',
    requester: 'Juan Luna',
    requesterPhone: '+63 912 345 6789',
    passengerNames: ['Juan Luna'],
    purpose: 'Official transport request',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: 'March 27, 2026',
    dateTo: 'March 27, 2026',
    timeNeeded: '13:00 PST',
    plateNumber: 'SAB - 2132',
    vehicle: 'SAB - 2132 - Toyota Avanza',
    destination: 'Kapitolyo',
    neededAt: 'March 27, 2026 - 13:00 PST',
    status: 'Denied',
    view: 'active',
    dispatchQueued: false,
    remarks:
      'This request was returned for schedule conflict and is waiting for a new submission.',
    remarksHistory: [
      {
        id: 'RVDSS-002-1',
        author: 'Dispatch Office',
        date: 'March 15, 2026',
        createdAt: '2026-03-15T11:30:00+08:00',
        message: 'This request was returned for schedule conflict and is waiting for a new submission.',
        viewedByRequester: false,
      },
    ],
  },
  {
    id: 'RVDSS - 003',
    requestedOn: 'April 4, 2026',
    requestType: 'DRIVER AND VEHICLE',
    createdByStaffName: 'Mia Reyes',
    requester: 'Mia Reyes',
    requesterPhone: '+63 917 345 1122',
    passengerNames: ['Mia Reyes', 'Paolo Cruz'],
    purpose: 'Multi-day site inspection and inter-office coordination.',
    street: 'Ortigas Center',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: 'April 10, 2026',
    dateTo: 'April 12, 2026',
    timeNeeded: '09:00 PST',
    plateNumber: 'Pending assignment',
    vehicle: 'Pending vehicle assignment',
    destination: 'Ortigas Center',
    neededAt: 'April 10, 2026 to April 12, 2026 - 09:00 PST',
    status: 'Processing',
    view: 'active',
    dispatchQueued: false,
    remarks:
      'This request is currently awaiting dispatch assignment and approval.',
    remarksHistory: [
      {
        id: 'RVDSS-003-1',
        author: 'Dispatch Office',
        date: 'April 4, 2026',
        createdAt: '2026-04-04T08:15:00+08:00',
        message: 'This request is currently awaiting dispatch assignment and approval.',
        viewedByRequester: false,
      },
    ],
  },
  {
    id: 'RVDSS - 004',
    requestedOn: 'April 5, 2026',
    requestType: 'DRIVER AND VEHICLE',
    createdByStaffName: 'Andrea Cruz',
    requester: 'Andrea Cruz',
    requesterPhone: '+63 919 557 2284',
    passengerNames: ['Andrea Cruz'],
    purpose: 'Field coordination meeting.',
    street: 'Rosario',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: 'April 11, 2026',
    dateTo: 'April 11, 2026',
    timeNeeded: '08:30 PST',
    plateNumber: 'SAA - 1098',
    vehicle: 'SAA - 1098 - Toyota Innova',
    destination: 'Rosario',
    neededAt: 'April 11, 2026 - 08:30 PST',
    status: 'Ongoing',
    view: 'active',
    dispatchQueued: true,
    remarks: 'Vehicle has departed and the transport request is currently ongoing.',
    remarksHistory: [
      {
        id: 'RVDSS-004-1',
        author: 'Dispatch Office',
        date: 'April 5, 2026',
        createdAt: '2026-04-05T07:45:00+08:00',
        message: 'Vehicle has departed and the transport request is currently ongoing.',
        viewedByRequester: false,
      },
    ],
  },
]

export const vehicleOccupancyEntries: VehicleOccupancyEntry[] = [
  {
    id: 'occ-001',
    vehicleId: 'veh-001',
    requestId: 'RVDSS - 001',
    startDate: '2026-04-06',
    endDate: '2026-04-06',
  },
  {
    id: 'occ-002',
    vehicleId: 'veh-002',
    requestId: 'RVDSS - 004',
    startDate: '2026-04-11',
    endDate: '2026-04-11',
  },
  {
    id: 'occ-003',
    vehicleId: 'veh-003',
    requestId: 'RVDSS - 003',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
  },
]

export const staffSections: StaffSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        label: 'Dashboard',
        icon: <i className="bx bxs-dashboard" aria-hidden="true" />,
      },
    ],
  },
  {
    title: 'TRANSPORT',
    items: [
      {
        label: 'Transport Request',
        icon: <i className="bx bx-file" aria-hidden="true" />,
      },
      {
        label: 'Trip Management',
        icon: <i className="bx bx-map-alt" aria-hidden="true" />,
      },
    ],
  },
  {
    title: 'VEHICLE',
    items: [
      {
        label: 'Vehicles and Drivers',
        icon: <i className="bx bxs-car" aria-hidden="true" />,
      },
      {
        label: 'Maintenance',
        icon: <i className="bx bx-wrench" aria-hidden="true" />,
      },
      {
        label: 'Fuel Management',
        icon: <i className="bx bx-gas-pump" aria-hidden="true" />,
      },
      {
        label: 'Registration',
        icon: <i className="bx bx-detail" aria-hidden="true" />,
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        label: 'Users',
        icon: <i className="bx bx-group" aria-hidden="true" />,
      },
      {
        label: 'Document',
        icon: <i className="bx bx-file-blank" aria-hidden="true" />,
      },
    ],
  },
]

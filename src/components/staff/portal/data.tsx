import type {
  DriverOption,
  StaffRequestItem,
  StaffSection,
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
    status: 'Approved',
    view: 'past',
    remarks:
      'Driver and vehicle request has been approved please arrive at the designated pick up location on-time.',
  },
  {
    id: 'RVDSS - 002',
    requestedOn: 'March 15, 2026',
    requestType: 'DRIVER AND VEHICLE',
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
    remarks:
      'Driver and vehicle request has been approved please arrive at the designated pick up location on-time.',
  },
  {
    id: 'RVDSS - 003',
    requestedOn: 'April 4, 2026',
    requestType: 'DRIVER AND VEHICLE',
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
    remarks:
      'This request is currently awaiting dispatch assignment and approval.',
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

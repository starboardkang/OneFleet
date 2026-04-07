import { type ReactNode, useMemo, useState } from 'react'
import heroLogo from '../../../assets/hero-logo.png'
import RequesterProfileModal, { type RequesterProfile } from '../requester/RequesterProfileModal'
import RequestFormCreate from '../requester/RequestFormCreate'
import RequestTripDetailsModal from '../requester/RequestTripDetailsModal'
import ModalCloseButton from '../common/ModalCloseButton'
import styles from '../../styles/modules/staff/StaffPortal.module.css'
import type { RequestFormValues } from '../requester/RequestFormBase'
import type { RequestItem } from '../requester/RequestCard'

type StaffPortalProps = {
  onLogout: () => void
  profile: RequesterProfile
  avatarUrl: string | null
  onSaveProfile: (nextProfile: RequesterProfile, nextAvatarUrl: string | null) => void
}

type StaffSection = {
  title: string
  items: Array<{
    label: string
    icon: ReactNode
  }>
}

type StaffRequestStatus = 'Approved' | 'Denied' | 'Processing'
type TransportTab = 'all' | 'dispatch' | 'approval'
type RequestListView = 'active' | 'past'
type VehicleType = 'Van' | 'SUV' | 'Sedan'

type StaffRequestItem = {
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
  dateNeeded: string
  timeNeeded: string
  plateNumber: string
  vehicle: string
  destination: string
  neededAt: string
  status: StaffRequestStatus
  view: RequestListView
  remarks: string
}

type ApprovalDispatchItem = {
  drn: string
  requester: string
  destination: string
  dateNeeded: string
  assignedDriverName: string
  assignedDriverContact: string
  vehicleType: VehicleType
  vehiclePlateNumber: string
  gasAllocationReference: string
  overtimeRequest: string
  status: 'For Approval'
}

type DispatchFormState = {
  drn: string
  assignedDriverName: string
  assignedDriverContact: string
  vehicleType: VehicleType
  vehiclePlateNumber: string
  gasAllocationReference: string
  overtimeRequest: string
}

const transportRequests: StaffRequestItem[] = [
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
    dateNeeded: 'March 27, 2026',
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
    dateNeeded: 'March 27, 2026',
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
]

function formatLongDate(dateValue: string) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildStaffRequestFromForm(
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
    dateNeeded: formatLongDate(values.dateNeeded),
    timeNeeded: values.timeNeeded,
    plateNumber: 'Pending assignment',
    vehicle: 'Pending vehicle assignment',
    destination: values.street,
    neededAt: `${formatLongDate(values.dateNeeded)} - ${values.timeNeeded} PST`,
    status: 'Processing',
    view: 'active',
    remarks: `Your ${requestTypeLabel.toLowerCase()} request has been submitted and is currently being reviewed by the dispatch office.`,
  }
}

function mapStaffRequestToTripDetails(request: StaffRequestItem): RequestItem {
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
    status: request.status === 'Approved' || request.status === 'Denied' ? request.status : 'Processing',
    passengerNames: request.passengerNames,
    purpose: request.purpose,
    street: request.street,
    province: request.province,
    city: request.city,
    dateNeeded: request.dateNeeded,
    timeNeeded: request.timeNeeded,
    driver: request.requester,
    vehicle: request.vehicle,
    plateNumber: request.plateNumber,
    destination: request.destination,
    schedule: request.neededAt,
    remarks: request.remarks,
  }
}

function DispatchRequestModal({
  values,
  validationMessage,
  onChange,
  onClose,
  onReset,
  onSubmit,
}: {
  values: DispatchFormState
  validationMessage: string
  onChange: (field: keyof DispatchFormState, value: string) => void
  onClose: () => void
  onReset: () => void
  onSubmit: () => void
}) {
  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.dispatchModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <b className={styles.dispatchModalTitle}>Dispatching for an RVDSS</b>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close dispatching form"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <div className={styles.dispatchSectionTitle}>RVDSS Details</div>
          <label className={styles.dispatchField}>
            <span className={styles.dispatchFieldLabel}>DRN</span>
            <input
              className={styles.dispatchInput}
              value={values.drn}
              onChange={(event) => onChange('drn', event.target.value)}
            />
          </label>

          <div className={styles.dispatchSectionTitle}>Driver &amp; Vehicle Assignment</div>
          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Assigned Driver Name</span>
              <input
                className={styles.dispatchInput}
                value={values.assignedDriverName}
                onChange={(event) => onChange('assignedDriverName', event.target.value)}
              />
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Assigned Driver Contact No.</span>
              <input
                className={styles.dispatchInput}
                value={values.assignedDriverContact}
                onChange={(event) => onChange('assignedDriverContact', event.target.value)}
              />
            </label>
          </div>

          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Vehicle Type</span>
              <select
                className={styles.dispatchInput}
                value={values.vehicleType}
                onChange={(event) => onChange('vehicleType', event.target.value)}
              >
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
              </select>
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Vehicle Plate No.</span>
              <input
                className={styles.dispatchInput}
                value={values.vehiclePlateNumber}
                onChange={(event) => onChange('vehiclePlateNumber', event.target.value)}
              />
            </label>
          </div>

          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Gas Allocation Reference (optional)</span>
              <input
                className={styles.dispatchInput}
                value={values.gasAllocationReference}
                onChange={(event) => onChange('gasAllocationReference', event.target.value)}
              />
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Overtime Request (optional)</span>
              <input
                className={styles.dispatchInput}
                value={values.overtimeRequest}
                onChange={(event) => onChange('overtimeRequest', event.target.value)}
              />
            </label>
          </div>

          {validationMessage ? <div className={styles.dispatchValidation}>{validationMessage}</div> : null}
        </div>

        <div className={styles.dispatchModalActions}>
          <button type="button" className={styles.dispatchResetButton} onClick={onReset}>
            Reset
          </button>
          <button type="button" className={styles.dispatchCloseButton} onClick={onClose}>
            Close
          </button>
          <button type="button" className={styles.dispatchSubmitButton} onClick={onSubmit}>
            Request for Approval
          </button>
        </div>
      </div>
    </div>
  )
}

const staffSections: StaffSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        label: 'Dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="2" />
            <rect x="13" y="3" width="8" height="5" rx="2" />
            <rect x="13" y="10" width="8" height="11" rx="2" />
            <rect x="3" y="13" width="8" height="8" rx="2" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'TRANSPORT',
    items: [
      {
        label: 'Transport Request',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3h7l5 5v13H7z" />
            <path d="M14 3v5h5" />
          </svg>
        ),
      },
      {
        label: 'Trip Management',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5v14" />
            <path d="M16 5v14" />
            <path d="M5 9h14" />
            <path d="M5 15h14" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'VEHICLE',
    items: [
      {
        label: 'Vehicles',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16l1.5-5h11L19 16" />
            <path d="M7 16h10" />
            <circle cx="8" cy="17" r="1.5" />
            <circle cx="16" cy="17" r="1.5" />
          </svg>
        ),
      },
      {
        label: 'Maintenance',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 7 3-3 3 3-3 3" />
            <path d="M4 20l8-8" />
            <path d="m10 6 8 8" />
          </svg>
        ),
      },
      {
        label: 'Fuel Management',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
            <path d="M15 10h2l2 2v5a1 1 0 0 1-1 1h-1" />
            <path d="M9 8h4" />
          </svg>
        ),
      },
      {
        label: 'Drivers',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9.5" cy="7" r="3" />
            <path d="M20 8v6" />
            <path d="M17 11h6" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        label: 'Users',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9.5" cy="7" r="3" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 4.13a3 3 0 0 1 0 5.74" />
          </svg>
        ),
      },
      {
        label: 'Document',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6" />
            <path d="M9 17h4" />
          </svg>
        ),
      },
    ],
  },
]

export default function StaffPortal({
  onLogout,
  profile,
  avatarUrl,
  onSaveProfile,
}: StaffPortalProps) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Transport Request')
  const [activeTransportTab, setActiveTransportTab] = useState<TransportTab>('all')
  const [requestListView, setRequestListView] = useState<RequestListView>('active')
  const [selectedRequest, setSelectedRequest] = useState<StaffRequestItem | null>(null)
  const [requests, setRequests] = useState<StaffRequestItem[]>(transportRequests)
  const [approvalRequests, setApprovalRequests] = useState<ApprovalDispatchItem[]>([])
  const [dispatchSourceRequest, setDispatchSourceRequest] = useState<StaffRequestItem | null>(null)
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false)
  const [dispatchValidationMessage, setDispatchValidationMessage] = useState('')
  const [dispatchForm, setDispatchForm] = useState<DispatchFormState>({
    drn: '',
    assignedDriverName: '',
    assignedDriverContact: '',
    vehicleType: 'Van',
    vehiclePlateNumber: '',
    gasAllocationReference: '',
    overtimeRequest: '',
  })

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long',
      }).format(new Date('2026-04-04T00:00:00')),
    [],
  )

  const userInitials =
    profile.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'JD'

  const requestCounts = {
    total: requests.length,
    approved: requests.filter((request) => request.status === 'Approved').length,
    processing: requests.filter((request) => request.status === 'Processing').length,
    denied: requests.filter((request) => request.status === 'Denied').length,
  }
  const visibleAllRequests = requests.filter((request) => request.view === requestListView)
  const dispatchRequests = requests.filter((request) => request.status === 'Processing')

  const resetDispatchForm = (source?: StaffRequestItem | null) => {
    setDispatchForm({
      drn: source?.id ?? '',
      assignedDriverName: source?.requester ?? '',
      assignedDriverContact: source?.requesterPhone ?? '',
      vehicleType: 'Van',
      vehiclePlateNumber: source?.plateNumber === 'Pending assignment' ? '' : source?.plateNumber ?? '',
      gasAllocationReference: '',
      overtimeRequest: '',
    })
    setDispatchValidationMessage('')
  }

  const openDispatchModal = (source?: StaffRequestItem | null) => {
    setDispatchSourceRequest(source ?? null)
    resetDispatchForm(source ?? null)
    setIsDispatchModalOpen(true)
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={styles.heroLogo} />
            <div>
              <h1 className={styles.portalTitle}>DRIVER AND VEHICLE REQUISITION PORTAL</h1>
            </div>
          </div>

          <div className={styles.menuRoot}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={styles.userMenuButton}
            >
              <div className={styles.userAvatar}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt={profile.fullName} className={styles.userAvatarImage} />
                ) : (
                  <span className={styles.userAvatarInitials}>{userInitials}</span>
                )}
              </div>
              <div>
                <div className={styles.userName}>{profile.fullName}</div>
                <div className={styles.userOffice}>{profile.office}</div>
              </div>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={[styles.caret, isMenuOpen ? styles.caretOpen : ''].join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isMenuOpen ? (
              <div className={styles.menuPanel}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsProfileModalOpen(true)
                  }}
                  className={styles.menuItem}
                >
                  Profile
                </button>
                <button type="button" onClick={onLogout} className={styles.menuItemDanger}>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside
          className={[styles.sidebar, isSidebarHovered ? styles.sidebarExpanded : styles.sidebarCollapsed].join(' ')}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <div className={styles.sidebarGlow} aria-hidden="true" />

          <div className={styles.sidebarSections}>
            {staffSections.map((section) => (
              <div key={section.title} className={styles.sidebarSection}>
                <div
                  className={[
                    styles.sidebarSectionTitle,
                    isSidebarHovered ? styles.sidebarSectionTitleVisible : styles.sidebarSectionTitleHidden,
                  ].join(' ')}
                >
                  {section.title}
                </div>

                <div className={styles.sidebarItems}>
                  {section.items.map((item) => {
                    const isActive = activeItem === item.label

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={[
                          styles.sidebarItem,
                          isActive ? styles.sidebarItemActive : '',
                          isSidebarHovered ? styles.sidebarItemExpanded : styles.sidebarItemCollapsed,
                        ].join(' ')}
                        onClick={() => setActiveItem(item.label)}
                      >
                        <span
                          className={styles.sidebarItemIcon}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={[
                            styles.sidebarItemLabel,
                            isSidebarHovered ? styles.sidebarItemLabelVisible : styles.sidebarItemLabelHidden,
                          ].join(' ')}
                        >
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            className={[
              styles.rolePreviewCard,
              isSidebarHovered ? styles.rolePreviewVisible : styles.rolePreviewHidden,
            ].join(' ')}
          >
            <div className={styles.rolePreviewTitle}>ROLE PREVIEW</div>
            <div className={styles.rolePreviewText}>
              Switch roles to preview visibility for each module in the system.
            </div>
            <button type="button" className={styles.rolePreviewButton}>
              <span className={styles.rolePreviewButtonText}>Officer Administrator</span>
            </button>
          </div>

          <div
            className={[
              styles.sidebarFooter,
              isSidebarHovered ? styles.sidebarFooterExpanded : styles.sidebarFooterCollapsed,
            ].join(' ')}
            >
              <div className={styles.sidebarFooterAvatar} />
            <div
              className={[
                styles.sidebarFooterText,
                isSidebarHovered ? styles.sidebarFooterTextVisible : styles.sidebarFooterTextHidden,
              ].join(' ')}
            >
              <div className={styles.sidebarFooterName}>{profile.fullName}</div>
              <div className={styles.sidebarFooterRole}>{profile.office.toUpperCase()}</div>
            </div>
          </div>
        </aside>

        <main
          className={styles.main}
          style={{ marginLeft: isSidebarHovered ? '304px' : '88px' }}
        >
          {activeItem === 'Transport Request' ? (
            <section className={styles.transportPanel}>
              <div className={styles.transportHeader}>
                <div>
                  <div className={styles.pageDate}>{today}</div>
                  <h2 className={styles.pageTitle}>Requests Overview</h2>
                </div>

                <div className={styles.transportHeaderActions}>
                  <label className={styles.transportSearch}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input type="text" value="" readOnly aria-label="Search requests" placeholder="Search request no., driver, destination" />
                  </label>
                  <button type="button" className={styles.createRequestButton} onClick={() => setIsCreateOpen(true)}>
                    + Create Request
                  </button>
                </div>
              </div>

              <div className={styles.transportTabs}>
                <button
                  type="button"
                  className={[styles.transportTab, activeTransportTab === 'all' ? styles.transportTabActive : ''].join(' ')}
                  onClick={() => setActiveTransportTab('all')}
                >
                  All Request
                </button>
                <button
                  type="button"
                  className={[styles.transportTab, activeTransportTab === 'dispatch' ? styles.transportTabActive : ''].join(' ')}
                  onClick={() => setActiveTransportTab('dispatch')}
                >
                  For Dispatch
                </button>
                <button
                  type="button"
                  className={[styles.transportTab, activeTransportTab === 'approval' ? styles.transportTabActive : ''].join(' ')}
                  onClick={() => setActiveTransportTab('approval')}
                >
                  For Approval
                </button>
              </div>

              {activeTransportTab === 'all' ? (
                <div className={styles.transportSummaryRow}>
                  <div className={styles.transportViewToggle}>
                    <button
                      type="button"
                      className={[
                        styles.transportViewButton,
                        requestListView === 'active' ? styles.transportViewButtonActive : '',
                      ].join(' ')}
                      onClick={() => setRequestListView('active')}
                    >
                      ACTIVE REQUESTS
                    </button>
                    <button
                      type="button"
                      className={[
                        styles.transportViewButton,
                        requestListView === 'past' ? styles.transportViewButtonActive : '',
                      ].join(' ')}
                      onClick={() => setRequestListView('past')}
                    >
                      PAST REQUESTS
                    </button>
                  </div>

                  <div className={styles.transportStats}>
                    <article className={[styles.transportStatCard, styles.transportStatNeutral].join(' ')}>
                      <span className={styles.transportStatLabel}>Total</span>
                      <strong className={styles.transportStatValue}>{requestCounts.total}</strong>
                    </article>
                    <article className={[styles.transportStatCard, styles.transportStatApproved].join(' ')}>
                      <span className={styles.transportStatLabel}>Approved</span>
                      <strong className={styles.transportStatValue}>{requestCounts.approved}</strong>
                    </article>
                    <article className={[styles.transportStatCard, styles.transportStatProcessing].join(' ')}>
                      <span className={styles.transportStatLabel}>Processing</span>
                      <strong className={styles.transportStatValue}>{requestCounts.processing}</strong>
                    </article>
                    <article className={[styles.transportStatCard, styles.transportStatDenied].join(' ')}>
                      <span className={styles.transportStatLabel}>Denied</span>
                      <strong className={styles.transportStatValue}>{requestCounts.denied}</strong>
                    </article>
                  </div>
                </div>
              ) : activeTransportTab === 'dispatch' ? (
                <div className={styles.transportDispatchHeader}>
                  <button type="button" className={styles.newDispatchButton} onClick={() => openDispatchModal(null)}>
                    + New Dispatch
                  </button>
                </div>
              ) : (
                <div className={styles.transportPlaceholderRow} />
              )}
            </section>
          ) : (
            <div className={styles.pageTitleRow}>
              <div>
                <div className={styles.pageDate}>{today}</div>
                <h2 className={styles.pageTitle}>{activeItem}</h2>
              </div>
            </div>
          )}

          {activeItem === 'Transport Request' ? (
            activeTransportTab === 'all' ? (
              <section className={styles.transportRequestList}>
                {visibleAllRequests.length > 0 ? (
                  visibleAllRequests.map((request) => (
                    <article key={`${request.id}-${request.status}`} className={styles.transportRequestCard}>
                      <div className={styles.transportRequestTopRow}>
                        <div className={styles.transportRequestMeta}>
                          <span className={styles.transportRequestId}>{request.id}</span>
                          <span className={styles.transportRequestTag}>Driver and Vehicle</span>
                          <span className={styles.transportRequestDate}>Requested: {request.requestedOn}</span>
                        </div>
                        <span
                          className={[
                            styles.transportStatusBadge,
                            requestListView === 'past'
                              ? styles.transportStatusCompleted
                              : request.status === 'Approved'
                                ? styles.transportStatusApproved
                                : request.status === 'Denied'
                                  ? styles.transportStatusDenied
                                  : styles.transportStatusProcessing,
                          ].join(' ')}
                        >
                          {requestListView === 'past' ? 'COMPLETED' : request.status.toUpperCase()}
                        </span>
                      </div>

                      <div className={styles.transportRequestGrid}>
                        <div className={styles.transportInfoCard}>
                          <div className={styles.transportInfoLabel}>Driver</div>
                          <div className={styles.transportInfoValue}>{request.requester}</div>
                          <div className={styles.transportInfoSubvalue}>{request.requesterPhone}</div>
                        </div>
                        <div className={styles.transportInfoCard}>
                          <div className={styles.transportInfoLabel}>Vehicle</div>
                          <div className={styles.transportInfoValue}>{request.vehicle}</div>
                        </div>
                        <div className={styles.transportInfoCard}>
                          <div className={styles.transportInfoLabel}>Destination</div>
                          <div className={styles.transportInfoValue}>{request.destination}</div>
                        </div>
                        <div className={styles.transportInfoCard}>
                          <div className={styles.transportInfoLabel}>Date and Time Needed</div>
                          <div className={styles.transportInfoValue}>{request.neededAt}</div>
                        </div>
                      </div>

                      <div className={styles.transportRequestFooter}>
                        <p className={styles.transportRemarks}>
                          <span className={styles.transportRemarksLabel}>Remarks:</span>
                          {request.remarks}
                        </p>

                        <div className={styles.transportActions}>
                          <button type="button" className={styles.transportActionEdit}>
                            Edit
                          </button>
                          <button type="button" className={styles.transportActionCancel}>
                            Cancel
                          </button>
                          <button
                            type="button"
                            className={styles.transportActionDetails}
                            onClick={() => setSelectedRequest(request)}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className={styles.transportEmptyState}>No requests available in this section.</div>
                )}
              </section>
            ) : activeTransportTab === 'dispatch' ? (
              <section className={styles.dispatchPanel}>
                <div className={styles.dispatchPanelTitle}>Pending Transport Request</div>
                <div className={styles.dispatchTable}>
                  <div className={styles.dispatchTableHeader}>
                    <span>DRN</span>
                    <span>Requester</span>
                    <span>Destination</span>
                    <span>Date Needed</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>
                  {dispatchRequests.length > 0 ? (
                    dispatchRequests.map((request) => (
                      <div key={`${request.id}-dispatch`} className={styles.dispatchTableRow}>
                        <span>{request.id}</span>
                        <span>{request.requester}</span>
                        <span>{request.destination}</span>
                        <span>{request.neededAt.split(' - ')[0]}</span>
                        <span className={styles.dispatchStatusChip}>For Dispatch</span>
                        <span className={styles.dispatchActionGroup}>
                          <button
                            type="button"
                            className={styles.dispatchApproveButton}
                            onClick={() => openDispatchModal(request)}
                          >
                            Dispatch
                          </button>
                          <button type="button" className={styles.dispatchRejectButton}>Reject</button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className={styles.dispatchEmptyState}>No pending transport requests for dispatch.</div>
                  )}
                </div>
              </section>
            ) : (
              <section className={styles.dispatchPanel}>
                <div className={styles.dispatchPanelTitle}>Requests For Approval</div>
                {approvalRequests.length > 0 ? (
                  <div className={styles.dispatchTable}>
                    <div className={styles.dispatchTableHeader}>
                      <span>DRN</span>
                      <span>Driver</span>
                      <span>Vehicle Type</span>
                      <span>Plate No.</span>
                      <span>Status</span>
                      <span>Contact</span>
                    </div>
                    {approvalRequests.map((request) => (
                      <div key={`${request.drn}-approval`} className={styles.dispatchTableRow}>
                        <span>{request.drn}</span>
                        <span>{request.assignedDriverName}</span>
                        <span>{request.vehicleType}</span>
                        <span>{request.vehiclePlateNumber}</span>
                        <span className={styles.approvalStatusChip}>{request.status}</span>
                        <span>{request.assignedDriverContact}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.dispatchEmptyState}>No dispatch requests are waiting for approval.</div>
                )}
              </section>
            )
          ) : (
            <>
              <section className={styles.contentCard}>
                <div className={styles.contentTitle}>{activeItem}</div>
                <div className={styles.contentText}>
                  This area is ready for the next module. The transport request view has been aligned to
                  the provided design reference.
                </div>
              </section>

              <section className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Pending Requests</div>
                  <div className={styles.metricValue}>08</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Active Trips</div>
                  <div className={styles.metricValue}>14</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Fleet Registered</div>
                  <div className={styles.metricValue}>32</div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {isCreateOpen ? (
        <RequestFormCreate
          onClose={() => setIsCreateOpen(false)}
          onSubmit={(values) => {
            const nextId = `RVDSS - ${String(requests.length + 1).padStart(3, '0')}`
            const nextRequest = buildStaffRequestFromForm(values, nextId, profile.fullName, '2026-04-04')
            setRequests((current) => [nextRequest, ...current])
            setIsCreateOpen(false)
          }}
        />
      ) : null}

      {isProfileModalOpen ? (
        <RequesterProfileModal
          profile={profile}
          avatarUrl={avatarUrl}
          profileLabel="Staff"
          onClose={() => setIsProfileModalOpen(false)}
          onSave={onSaveProfile}
        />
      ) : null}

      {selectedRequest ? (
        <RequestTripDetailsModal
          request={mapStaffRequestToTripDetails(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          onEdit={() => setSelectedRequest(null)}
        />
      ) : null}

      {isDispatchModalOpen ? (
        <DispatchRequestModal
          values={dispatchForm}
          validationMessage={dispatchValidationMessage}
          onChange={(field, value) => {
            setDispatchForm((current) => ({ ...current, [field]: value }))
            setDispatchValidationMessage('')
          }}
          onClose={() => {
            setIsDispatchModalOpen(false)
            setDispatchSourceRequest(null)
          }}
          onReset={() => resetDispatchForm(dispatchSourceRequest)}
          onSubmit={() => {
            if (
              dispatchForm.drn.trim().length === 0 ||
              dispatchForm.assignedDriverName.trim().length === 0 ||
              dispatchForm.assignedDriverContact.trim().length === 0 ||
              dispatchForm.vehiclePlateNumber.trim().length === 0
            ) {
              setDispatchValidationMessage('Please complete the required dispatch details before continuing.')
              return
            }

            const sourceRequest =
              dispatchSourceRequest ?? requests.find((request) => request.id === dispatchForm.drn) ?? null

            setApprovalRequests((current) => [
              {
                drn: dispatchForm.drn.trim(),
                requester: sourceRequest?.requester ?? profile.fullName,
                destination: sourceRequest?.destination ?? '',
                dateNeeded: sourceRequest?.dateNeeded ?? '',
                assignedDriverName: dispatchForm.assignedDriverName.trim(),
                assignedDriverContact: dispatchForm.assignedDriverContact.trim(),
                vehicleType: dispatchForm.vehicleType,
                vehiclePlateNumber: dispatchForm.vehiclePlateNumber.trim(),
                gasAllocationReference: dispatchForm.gasAllocationReference.trim(),
                overtimeRequest: dispatchForm.overtimeRequest.trim(),
                status: 'For Approval',
              },
              ...current,
            ])

            if (sourceRequest) {
              setRequests((current) => current.filter((request) => request.id !== sourceRequest.id))
            }

            setActiveTransportTab('approval')
            setIsDispatchModalOpen(false)
            setDispatchSourceRequest(null)
          }}
        />
      ) : null}
    </div>
  )
}

import { useMemo, useState } from 'react'
import heroLogo from '../../../assets/hero-logo.png'
import Group71 from './Group71'
import RequestCard, { type RequestItem, type RequestStatus } from './RequestCard'
import RequesterProfileModal, { type RequesterProfile } from './RequesterProfileModal'
import RequestFormCreate from './RequestFormCreate'
import RequestFormEdit from './RequestFormEdit'
import DeleteRequestModal from './DeleteRequestModal'
import RequestTripDetailsModal from './RequestTripDetailsModal'
import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'
import type { RequestFormValues } from './RequestFormBase'

type RequestView = 'active' | 'past'

type RequesterPortalProps = {
  onLogout: () => void
  profile: RequesterProfile
  avatarUrl: string | null
  onSaveProfile: (nextProfile: RequesterProfile, nextAvatarUrl: string | null) => void
}

const overview = [
  { label: 'Total', tone: 'bg-slate-100 text-slate-800' },
  { label: 'Approved', tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'Processing', tone: 'bg-amber-100 text-amber-700' },
  { label: 'Denied', tone: 'bg-rose-100 text-rose-700' },
] as const

const initialRequests: RequestItem[] = [
  {
    id: 'RVDSS - 001',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: April 2, 2026',
    requestedOn: '2026-04-02',
    status: 'Approved',
    passengerNames: ['Vico Sotto'],
    purpose: 'Official city engagement',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateNeeded: '2026-04-06',
    timeNeeded: '1:00 PM',
    driver: 'Juan Luna',
    vehicle: 'SAB - 2132 · Toyota Avanza',
    plateNumber: 'SAB - 2132',
    destination: 'Kapitolyo',
    schedule: 'April 6, 2026 · 1:00 PM',
    remarks:
      'Driver and vehicle request has been approved. Please arrive at the designated pick up location on time.',
  },
  {
    id: 'RVDSS - 002',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: April 1, 2026',
    requestedOn: '2026-04-01',
    status: 'Processing',
    passengerNames: ['Vico Sotto', 'Mia Reyes'],
    purpose: 'Site inspection and coordination meeting',
    street: 'Caruncho Avenue',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateNeeded: '2026-04-08',
    timeNeeded: '9:00 AM',
    driver: 'Pending assignment',
    vehicle: 'To be assigned',
    plateNumber: 'Pending assignment',
    destination: 'Pasig City Hall Annex',
    schedule: 'April 8, 2026 · 9:00 AM',
    remarks: 'Your request is currently being reviewed by the dispatch office.',
  },
  {
    id: 'RVDSS - 003',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: March 30, 2026',
    requestedOn: '2026-03-30',
    status: 'Denied',
    passengerNames: ['Vico Sotto'],
    purpose: 'Attendance to external coordination meeting',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateNeeded: '2026-04-09',
    timeNeeded: '3:30 PM',
    driver: '—',
    vehicle: '—',
    plateNumber: '—',
    destination: 'Kapitolyo',
    schedule: 'April 9, 2026 · 3:30 PM',
    remarks: 'The requested vehicle was unavailable for the selected schedule. Please resubmit with a new time slot.',
  },
  {
    id: 'RVDSS - 004',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: March 18, 2026',
    requestedOn: '2026-03-18',
    status: 'Approved',
    passengerNames: ['Maria Santos'],
    purpose: 'Completed field visit',
    street: 'Capitol Commons',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateNeeded: '2026-03-28',
    timeNeeded: '10:30 AM',
    driver: 'Maria Santos',
    vehicle: 'SAA - 1098 - Toyota Innova',
    plateNumber: 'SAA - 1098',
    destination: 'Capitol Commons',
    schedule: 'March 28, 2026 · 10:30 AM',
    remarks: 'Request completed successfully.',
  },
  {
    id: 'RVDSS - 005',
    tripType: 'Driver Only',
    requestedAt: 'Requested: March 17, 2026',
    requestedOn: '2026-03-17',
    status: 'Denied',
    passengerNames: ['Vico Sotto'],
    purpose: 'Market inspection request',
    street: 'Pasig Mega Market',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateNeeded: '2026-03-29',
    timeNeeded: '8:00 AM',
    driver: '--',
    vehicle: '--',
    plateNumber: '--',
    destination: 'Pasig Mega Market',
    schedule: 'March 29, 2026 · 8:00 AM',
    remarks: 'The trip request was denied due to incomplete trip justification.',
  },
]

const today = new Date('2026-04-04T00:00:00')

function formatRequestedAt(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`)
  return `Requested: ${parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`
}

function formatSchedule(dateValue: string, timeValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00`)
  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return `${formattedDate} · ${timeValue}`
}

function buildRequestFromForm(
  values: RequestFormValues,
  id: string,
  requestedOn: string,
  status: RequestStatus,
  remarks: string,
): RequestItem {
  return {
    id,
    tripType:
      values.requestType === 'DRIVER ONLY'
        ? 'Driver Only'
        : values.requestType === 'VEHICLE ONLY'
          ? 'Vehicle Only'
          : values.requestType === 'DRIVER AND VEHICLE'
            ? 'Driver and Vehicle'
            : values.requestType === 'GENSET'
              ? 'Genset'
              : 'Heavy Equipment',
    requestedAt: formatRequestedAt(requestedOn),
    requestedOn,
    status,
    passengerNames: values.passengerNames,
    purpose: values.purpose,
    street: values.street,
    province: values.province,
    city: values.city,
    dateNeeded: values.dateNeeded,
    timeNeeded: values.timeNeeded,
    driver: status === 'Approved' ? 'Juan Luna' : status === 'Processing' ? 'Pending assignment' : '—',
    vehicle: status === 'Approved' ? 'SAB - 2132 · Toyota Avanza' : status === 'Processing' ? 'To be assigned' : '—',
    plateNumber: status === 'Approved' ? 'SAB - 2132' : status === 'Processing' ? 'Pending assignment' : '—',
    destination: values.street,
    schedule: formatSchedule(values.dateNeeded, values.timeNeeded),
    remarks,
  }
}

function getRequestAgeInDays(requestedOn: string) {
  const requestDate = new Date(`${requestedOn}T00:00:00`)
  return Math.floor((today.getTime() - requestDate.getTime()) / 86400000)
}

function getRequestPermissions(request: RequestItem, isPast: boolean) {
  if (!isPast) {
    if (request.status === 'Approved') {
      return { canEdit: false, canDelete: false, canResubmit: false }
    }

    if (request.status === 'Processing') {
      return { canEdit: true, canDelete: true, canResubmit: false }
    }

    return { canEdit: true, canDelete: true, canResubmit: true }
  }

  if (request.status === 'Approved') {
    return { canEdit: false, canDelete: false, canResubmit: false }
  }

  if (request.status === 'Denied') {
    return { canEdit: true, canDelete: false, canResubmit: true }
  }

  return { canEdit: false, canDelete: false, canResubmit: false }
}

export function RequesterPortal({
  onLogout,
  profile,
  avatarUrl,
  onSaveProfile,
}: RequesterPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [requestView, setRequestView] = useState<RequestView>('active')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null)
  const [requestPendingDelete, setRequestPendingDelete] = useState<RequestItem | null>(null)
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests)
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const activeRequestItems = useMemo(
    () => requests.filter((request) => getRequestAgeInDays(request.requestedOn) < 10),
    [requests],
  )
  const pastRequestItems = useMemo(
    () => requests.filter((request) => getRequestAgeInDays(request.requestedOn) >= 10),
    [requests],
  )

  const visibleRequests = requestView === 'active' ? activeRequestItems : pastRequestItems
  const editingRequest = requests.find((request) => request.id === editingRequestId) ?? null

  const summaryCounts = {
    Total: visibleRequests.length,
    Approved: visibleRequests.filter((request) => request.status === 'Approved').length,
    Processing: visibleRequests.filter((request) => request.status === 'Processing').length,
    Denied: visibleRequests.filter((request) => request.status === 'Denied').length,
  }

  const headerDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long',
  }).format(today)

  const userInitials =
    profile.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'VS'

  return (
    <div className={requesterPortalStyles.shell}>
      <header className={requesterPortalStyles.header}>
        <div className={requesterPortalStyles.headerOverlay} />
        <div className={requesterPortalStyles.headerInner}>
          <div className={requesterPortalStyles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={requesterPortalStyles.heroLogo} />
            <div>
              <h1 className={requesterPortalStyles.portalTitle}>
                DRIVER AND VEHICLE REQUISITION PORTAL
              </h1>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={requesterPortalStyles.userMenuButton}
            >
              <div className={requesterPortalStyles.userAvatar}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={profile.fullName}
                    className={requesterPortalStyles.userAvatarImage}
                  />
                ) : (
                  <span className={requesterPortalStyles.userAvatarInitials}>{userInitials}</span>
                )}
              </div>
              <div>
                <div className={requesterPortalStyles.userName}>{profile.fullName}</div>
                <div className={requesterPortalStyles.userOffice}>{profile.office}</div>
              </div>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`${requesterPortalStyles.caret} ${isMenuOpen ? 'rotate-180' : ''}`}
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
              <div className={requesterPortalStyles.menuPanel}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsProfileModalOpen(true)
                  }}
                  className={requesterPortalStyles.menuItem}
                >
                  Profile
                </button>
                <button type="button" onClick={onLogout} className={requesterPortalStyles.menuItemDanger}>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className={requesterPortalStyles.main}>
        <section className={requesterPortalStyles.panel}>
          <div className={requesterPortalStyles.overviewHeader}>
            <div>
              <div className={requesterPortalStyles.overviewDate}>{headerDate}</div>
              <h2 className={requesterPortalStyles.overviewTitle}>Requests Overview</h2>
            </div>

            <div className={requesterPortalStyles.overviewActions}>
              <div className={requesterPortalStyles.searchBox}>Search request no., driver, destination</div>
              <button
                type="button"
                className={requesterPortalStyles.createButton}
                onClick={() => setIsCreateOpen(true)}
              >
                + Create Request
              </button>
            </div>
          </div>

          <div className={requesterPortalStyles.overviewSummaryRow}>
            <div className={requesterPortalStyles.requestTabs}>
              <Group71 activeView={requestView} onChange={setRequestView} />
            </div>

            <div className={requesterPortalStyles.statsGrid}>
              {overview.map((item) => (
                <div key={item.label} className={`${requesterPortalStyles.statCard} ${item.tone}`}>
                  <div className={requesterPortalStyles.statLabel}>{item.label}</div>
                  <div className={requesterPortalStyles.statValue}>{summaryCounts[item.label]}</div>
                </div>
              ))}
            </div>
          </div>

          {requestView === 'active' ? (
            <div className={requesterPortalStyles.pastNoticeCard}>
              <div className={requesterPortalStyles.pastNoticeTitle}>Request Rules</div>
              <div className={requesterPortalStyles.pastNoticeText}>
                Request for vehicle use shall be made at least <b>two (2) to three (3) days</b> from the intended date of use.
              </div>
              <div className={requesterPortalStyles.pastNoticeText}>
                Failure to use the vehicle at the given date and time forfeits one's right to use the vehicle assigned.
              </div>
            </div>
          ) : null}

          {requestView === 'past' ? (
            <div className={requesterPortalStyles.pastNoticeCard}>
              <div className={requesterPortalStyles.pastNoticeTitle}>Past Request Rules</div>
              <div className={requesterPortalStyles.pastNoticeText}>
                Approved and denied requests that are 10 days old or older are automatically placed in the Past Requests section.
              </div>
              <div className={requesterPortalStyles.pastNoticeText}>
                Approved past requests have edit and delete disabled, while denied past requests keep re-submit available but keep delete disabled.
              </div>
            </div>
          ) : null}
        </section>

        <section className={requesterPortalStyles.panel}>
          <div className={requesterPortalStyles.requestList}>
            {visibleRequests.map((request) => {
              const permissions = getRequestPermissions(request, requestView === 'past')

              return (
                <RequestCard
                  key={request.id}
                  request={request}
                  canEdit={permissions.canEdit}
                  canDelete={permissions.canDelete}
                  canResubmit={permissions.canResubmit}
                  onEdit={() => setEditingRequestId(request.id)}
                  onOpenDetails={() => setSelectedRequest(request)}
                  onDelete={() => setRequestPendingDelete(request)}
                  onResubmit={() => {
                    setRequests((current) =>
                      current.map((currentRequest) =>
                        currentRequest.id === request.id
                          ? buildRequestFromForm(
                              {
                                requestType:
                                  request.tripType === 'Driver Only'
                                    ? 'DRIVER ONLY'
                                    : request.tripType === 'Vehicle Only'
                                      ? 'VEHICLE ONLY'
                                      : request.tripType === 'Genset'
                                        ? 'GENSET'
                                        : request.tripType === 'Heavy Equipment'
                                          ? 'HEAVY EQUIPMENT'
                                          : 'DRIVER AND VEHICLE',
                                passengerNames: request.passengerNames,
                                purpose: request.purpose,
                                street: request.street,
                                province: request.province,
                                city: request.city,
                                dateNeeded: request.dateNeeded,
                                timeNeeded: request.timeNeeded,
                              },
                              request.id,
                              '2026-04-04',
                              'Processing',
                              'Your resubmitted request is currently being reviewed by the dispatch office.',
                            )
                          : currentRequest,
                      ),
                    )
                    if (selectedRequest?.id === request.id) {
                      setSelectedRequest(null)
                    }
                    setRequestView('active')
                  }}
                />
              )
            })}
          </div>
        </section>
      </main>

      {isCreateOpen ? (
        <RequestFormCreate
          onClose={() => setIsCreateOpen(false)}
          onSubmit={(values) => {
            const nextId = `RVDSS - ${String(requests.length + 1).padStart(3, '0')}`
            const nextRequest = buildRequestFromForm(
              values,
              nextId,
              '2026-04-04',
              'Processing',
              'Your request has been submitted and is currently being reviewed by the dispatch office.',
            )

            setRequests((current) => [nextRequest, ...current])
            setRequestView('active')
            setIsCreateOpen(false)
          }}
        />
      ) : null}

      {editingRequest ? (
        <RequestFormEdit
          onClose={() => setEditingRequestId(null)}
          initialValues={{
            requestType:
              editingRequest.tripType === 'Driver Only'
                ? 'DRIVER ONLY'
                : editingRequest.tripType === 'Vehicle Only'
                  ? 'VEHICLE ONLY'
                  : editingRequest.tripType === 'Genset'
                    ? 'GENSET'
                    : editingRequest.tripType === 'Heavy Equipment'
                      ? 'HEAVY EQUIPMENT'
                      : 'DRIVER AND VEHICLE',
            passengerNames: editingRequest.passengerNames,
            purpose: editingRequest.purpose,
            street: editingRequest.street,
            province: editingRequest.province,
            city: editingRequest.city,
            dateNeeded: editingRequest.dateNeeded,
            timeNeeded: editingRequest.timeNeeded,
          }}
          onSubmit={(values) => {
            setRequests((current) =>
              current.map((request) =>
                request.id === editingRequest.id
                  ? {
                      ...buildRequestFromForm(
                        values,
                        request.id,
                        request.requestedOn,
                        request.status,
                        request.remarks,
                      ),
                      requestedAt: request.requestedAt,
                    }
                  : request,
              ),
            )
            setEditingRequestId(null)
          }}
        />
      ) : null}

      {isProfileModalOpen ? (
        <RequesterProfileModal
          profile={profile}
          avatarUrl={avatarUrl}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={onSaveProfile}
        />
      ) : null}

      {selectedRequest ? (
        <RequestTripDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onEdit={() => {
            setSelectedRequest(null)
            const permissions = getRequestPermissions(selectedRequest, getRequestAgeInDays(selectedRequest.requestedOn) >= 10)
            if (permissions.canEdit) {
              setEditingRequestId(selectedRequest.id)
            }
          }}
        />
      ) : null}

      {requestPendingDelete ? (
        <DeleteRequestModal
          requestId={requestPendingDelete.id}
          onClose={() => setRequestPendingDelete(null)}
          onConfirm={() => {
            setRequests((current) => current.filter((request) => request.id !== requestPendingDelete.id))
            if (selectedRequest?.id === requestPendingDelete.id) {
              setSelectedRequest(null)
            }
            setRequestPendingDelete(null)
          }}
        />
      ) : null}
    </div>
  )
}

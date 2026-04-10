import { useMemo, useState } from 'react'
import ProfileModal from '../../global/profile/ProfileModal'
import type { Profile } from '../../global/profile/types'
import RequestFormCreate from '../../global/transport/RequestFormCreate'
import TripDetailsModal from '../../global/transport/TripDetailsModal'
import type { RequestFormValues } from '../../global/transport/types'
import DispatchRequestModal from '../transport/DispatchRequestModal'
import StaffTransportContent from '../transport/StaffTransportContent'
import StaffHeader from './StaffHeader'
import StaffSidebar from './StaffSidebar'
import {
  availableDrivers,
  roleOptions,
  staffSections,
  transportRequests,
  vehicleCatalog,
} from './data'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type {
  ApprovalDispatchItem,
  DispatchFormState,
  RequestListView,
  StaffRequestItem,
  TransportTab,
} from './types'
import { buildStaffRequestFromForm, mapStaffRequestToTripDetails } from './utils'

type StaffPortalScreenProps = {
  onLogout: () => void
  profile: Profile
  avatarUrl: string | null
  onSaveProfile: (nextProfile: Profile, nextAvatarUrl: string | null) => void
}

export default function StaffPortalScreen({
  onLogout,
  profile,
  avatarUrl,
  onSaveProfile,
}: StaffPortalScreenProps) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeRole, setActiveRole] = useState<(typeof roleOptions)[number]>('Administrator')
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
    vehicleType: '',
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
  const unreservedVehicles = vehicleCatalog.filter((vehicle) => !vehicle.reserved)

  const applyDispatchFieldChange = (field: keyof DispatchFormState, value: string) => {
    if (field === 'drn') {
      const nextSourceRequest = dispatchRequests.find((request) => request.id === value) ?? null
      setDispatchSourceRequest(nextSourceRequest)
      setDispatchForm({
        drn: value,
        assignedDriverName: '',
        assignedDriverContact: '',
        vehicleType: '',
        vehiclePlateNumber: '',
        gasAllocationReference: '',
        overtimeRequest: '',
      })
      setDispatchValidationMessage('')
      return
    }

    setDispatchForm((current) => {
      if (field === 'assignedDriverName') {
        const selectedDriver = availableDrivers.find((driver) => driver.name === value)
        return {
          ...current,
          assignedDriverName: value,
          assignedDriverContact: selectedDriver?.contactNumber ?? '',
        }
      }

      if (field === 'vehicleType') {
        const selectedVehicle = unreservedVehicles.find((vehicle) => vehicle.label === value)
        return {
          ...current,
          vehicleType: value,
          vehiclePlateNumber: selectedVehicle?.plateNumber ?? '',
        }
      }

      return { ...current, [field]: value }
    })
    setDispatchValidationMessage('')
  }

  const resetDispatchForm = (source?: StaffRequestItem | null) => {
    setDispatchForm({
      drn: source?.id ?? '',
      assignedDriverName: '',
      assignedDriverContact: '',
      vehicleType: '',
      vehiclePlateNumber: '',
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

  const handleToggleMenu = () => {
    setIsMenuOpen((current) => {
      const next = !current
      if (!next) {
        setIsRoleMenuOpen(false)
      }
      return next
    })
  }

  const handleSelectRole = (role: string) => {
    setActiveRole(role as (typeof roleOptions)[number])
    setIsRoleMenuOpen(false)
    setIsMenuOpen(false)
  }

  const handleOpenProfile = () => {
    setIsRoleMenuOpen(false)
    setIsMenuOpen(false)
    setIsProfileModalOpen(true)
  }

  const handleLogout = () => {
    setIsRoleMenuOpen(false)
    onLogout()
  }

  const handleCreateRequest = (values: RequestFormValues) => {
    const nextId = `RVDSS - ${String(requests.length + 1).padStart(3, '0')}`
    const nextRequest = buildStaffRequestFromForm(values, nextId, profile.fullName, '2026-04-04')
    setRequests((current) => [nextRequest, ...current])
    setIsCreateOpen(false)
  }

  const handleSubmitDispatch = () => {
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
        dateFrom: sourceRequest?.dateFrom ?? '',
        dateTo: sourceRequest?.dateTo ?? '',
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
  }

  return (
    <div className={styles.shell}>
      <StaffHeader
        profile={profile}
        avatarUrl={avatarUrl}
        userInitials={userInitials}
        isMenuOpen={isMenuOpen}
        isRoleMenuOpen={isRoleMenuOpen}
        activeRole={activeRole}
        roleOptions={roleOptions}
        onToggleMenu={handleToggleMenu}
        onToggleRoleMenu={() => setIsRoleMenuOpen((current) => !current)}
        onSelectRole={handleSelectRole}
        onOpenProfile={handleOpenProfile}
        onLogout={handleLogout}
      />

      <div className={styles.layout}>
        <StaffSidebar
          isSidebarHovered={isSidebarHovered}
          activeItem={activeItem}
          sections={staffSections}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          onSelectItem={setActiveItem}
        />

        <main className={styles.main} style={{ marginLeft: isSidebarHovered ? '304px' : '88px' }}>
          {activeItem === 'Transport Request' ? (
            <StaffTransportContent
              today={today}
              activeTransportTab={activeTransportTab}
              requestListView={requestListView}
              requestCounts={requestCounts}
              visibleAllRequests={visibleAllRequests}
              dispatchRequests={dispatchRequests}
              approvalRequests={approvalRequests}
              onChangeTransportTab={setActiveTransportTab}
              onChangeRequestListView={setRequestListView}
              onOpenCreate={() => setIsCreateOpen(true)}
              onOpenDetails={setSelectedRequest}
              onOpenDispatchModal={openDispatchModal}
            />
          ) : (
            <>
              <div className={styles.pageTitleRow}>
                <div>
                  <div className={styles.pageDate}>{today}</div>
                  <h2 className={styles.pageTitle}>{activeItem}</h2>
                </div>
              </div>

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
        <RequestFormCreate onClose={() => setIsCreateOpen(false)} onSubmit={handleCreateRequest} />
      ) : null}

      {isProfileModalOpen ? (
        <ProfileModal
          profile={profile}
          avatarUrl={avatarUrl}
          profileLabel="Staff"
          onClose={() => setIsProfileModalOpen(false)}
          onSave={onSaveProfile}
        />
      ) : null}

      {selectedRequest ? (
        <TripDetailsModal
          request={mapStaffRequestToTripDetails(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          onEdit={() => setSelectedRequest(null)}
        />
      ) : null}

      {isDispatchModalOpen ? (
        <DispatchRequestModal
          values={dispatchForm}
          requestOptions={dispatchRequests}
          driverOptions={availableDrivers}
          vehicleOptions={unreservedVehicles}
          validationMessage={dispatchValidationMessage}
          onChange={applyDispatchFieldChange}
          onClose={() => {
            setIsDispatchModalOpen(false)
            setDispatchSourceRequest(null)
          }}
          onReset={() => resetDispatchForm(dispatchSourceRequest)}
          onSubmit={handleSubmitDispatch}
        />
      ) : null}
    </div>
  )
}

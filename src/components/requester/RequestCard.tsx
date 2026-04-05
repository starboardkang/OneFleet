import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'

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
  dateNeeded: string
  timeNeeded: string
  driver: string
  vehicle: string
  plateNumber: string
  destination: string
  schedule: string
  remarks: string
}

type RequestCardProps = {
  request: RequestItem
  canEdit: boolean
  canDelete: boolean
  canResubmit: boolean
  onEdit: () => void
  onOpenDetails: () => void
  onDelete: () => void
  onResubmit: () => void
}

function statusClasses(status: RequestStatus) {
  switch (status) {
    case 'Approved':
      return 'bg-emerald-100 text-emerald-700'
    case 'Processing':
      return 'bg-amber-100 text-amber-700'
    case 'Denied':
      return 'bg-rose-100 text-rose-700'
  }
}

const disabledButtonClass = 'cursor-not-allowed opacity-45 hover:bg-inherit'

export default function RequestCard({
  request,
  canEdit,
  canDelete,
  canResubmit,
  onEdit,
  onOpenDetails,
  onDelete,
  onResubmit,
}: RequestCardProps) {
  return (
    <article className={requesterPortalStyles.requestCard}>
      <div className={requesterPortalStyles.requestCardHeader}>
        <div className={requesterPortalStyles.requestMetaRow}>
          <h3 className={requesterPortalStyles.requestId}>{request.id}</h3>
          <span className={requesterPortalStyles.requestType}>{request.tripType}</span>
          <span className={requesterPortalStyles.requestDate}>{request.requestedAt}</span>
        </div>
        <span className={`${requesterPortalStyles.requestStatus} ${statusClasses(request.status)}`}>
          {request.status.toUpperCase()}
        </span>
      </div>

      <div className={requesterPortalStyles.requestDetailsGrid}>
        <div className={requesterPortalStyles.requestDetailCard}>
          <div className={requesterPortalStyles.requestDetailLabel}>Driver</div>
          <div className={requesterPortalStyles.requestDetailValue}>{request.driver}</div>
        </div>
        <div className={requesterPortalStyles.requestDetailCard}>
          <div className={requesterPortalStyles.requestDetailLabel}>Vehicle</div>
          <div className={requesterPortalStyles.requestDetailValue}>{request.vehicle}</div>
        </div>
        <div className={requesterPortalStyles.requestDetailCard}>
          <div className={requesterPortalStyles.requestDetailLabel}>Destination</div>
          <div className={requesterPortalStyles.requestDetailValue}>{request.destination}</div>
        </div>
        <div className={requesterPortalStyles.requestDetailCard}>
          <div className={requesterPortalStyles.requestDetailLabel}>Date and Time Needed</div>
          <div className={requesterPortalStyles.requestDetailValue}>{request.schedule}</div>
        </div>
      </div>

      <div className={requesterPortalStyles.requestFooter}>
        <div className={requesterPortalStyles.remarks}>
          <span className={requesterPortalStyles.remarksLabel}>Remarks: </span>
          {request.remarks}
        </div>

        <div className={requesterPortalStyles.actionRow}>
          {canResubmit ? (
            <button type="button" className={requesterPortalStyles.actionResubmit} onClick={onResubmit}>
              Re-submit
            </button>
          ) : null}
          <button
            type="button"
            className={`${requesterPortalStyles.actionEdit} ${!canEdit ? disabledButtonClass : ''}`}
            onClick={onEdit}
            disabled={!canEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className={`${requesterPortalStyles.actionCancel} ${!canDelete ? disabledButtonClass : ''}`}
            onClick={onDelete}
            disabled={!canDelete}
          >
            Delete
          </button>
          <button type="button" className={requesterPortalStyles.actionDetails} onClick={onOpenDetails}>
            More Details
          </button>
        </div>
      </div>
    </article>
  )
}

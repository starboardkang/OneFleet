import styles from './RequesterPortal.module.css'

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
      return styles.statusApproved
    case 'Processing':
      return styles.statusProcessing
    case 'Denied':
      return styles.statusDenied
  }
}

const disabledButtonClass = styles.buttonDisabled

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
    <article className={styles.requestCard}>
      <div className={styles.requestCardHeader}>
        <div className={styles.requestMetaRow}>
          <h3 className={styles.requestId}>{request.id}</h3>
          <span className={styles.requestType}>{request.tripType}</span>
          <span className={styles.requestDate}>{request.requestedAt}</span>
        </div>
        <span className={[styles.requestStatus, statusClasses(request.status)].join(' ')}>
          {request.status.toUpperCase()}
        </span>
      </div>

      <div className={styles.requestDetailsGrid}>
        <div className={styles.requestDetailCard}>
          <div className={styles.requestDetailLabel}>Driver</div>
          <div className={styles.requestDetailValue}>{request.driver}</div>
        </div>
        <div className={styles.requestDetailCard}>
          <div className={styles.requestDetailLabel}>Vehicle</div>
          <div className={styles.requestDetailValue}>{request.vehicle}</div>
        </div>
        <div className={styles.requestDetailCard}>
          <div className={styles.requestDetailLabel}>Destination</div>
          <div className={styles.requestDetailValue}>{request.destination}</div>
        </div>
        <div className={styles.requestDetailCard}>
          <div className={styles.requestDetailLabel}>Date and Time Needed</div>
          <div className={styles.requestDetailValue}>{request.schedule}</div>
        </div>
      </div>

      <div className={styles.requestFooter}>
        <div className={styles.remarks}>
          <span className={styles.remarksLabel}>Remarks: </span>
          {request.remarks}
        </div>

        <div className={styles.actionRow}>
          {canResubmit ? (
            <button type="button" className={styles.actionResubmit} onClick={onResubmit}>
              Re-submit
            </button>
          ) : null}
          <button
            type="button"
            className={[styles.actionEdit, !canEdit ? disabledButtonClass : ''].join(' ')}
            onClick={onEdit}
            disabled={!canEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className={[styles.actionCancel, !canDelete ? disabledButtonClass : ''].join(' ')}
            onClick={onDelete}
            disabled={!canDelete}
          >
            Delete
          </button>
          <button type="button" className={styles.actionDetails} onClick={onOpenDetails}>
            More Details
          </button>
        </div>
      </div>
    </article>
  )
}
import type { RequestItem, RequestStatus } from '../../global/transport/types'
import styles from '../../../styles/modules/requester/portal/RequesterPortal.module.css'

type RequestCardProps = {
  request: RequestItem
  canEdit: boolean
  canDelete: boolean
  canResubmit: boolean
  onEdit: () => void
  onOpenRemarks: () => void
  onOpenDetails: () => void
  onDelete: () => void
  onResubmit: () => void
}

function statusClasses(status: RequestStatus) {
  switch (status) {
    case 'Approved':
      return styles.statusApproved
    case 'Ongoing':
      return styles.statusOngoing
    case 'Completed':
      return styles.statusCompleted
    case 'Processing':
      return styles.statusProcessing
    case 'Denied':
      return styles.statusDenied
  }
}

function formatSchedule(request: RequestItem) {
  const formatLongDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const dateRange =
    request.dateFrom === request.dateTo
      ? formatLongDate(request.dateFrom)
      : `${formatLongDate(request.dateFrom)} to ${formatLongDate(request.dateTo)}`

  return `${dateRange} - ${request.timeNeeded}`
}

const disabledButtonClass = styles.buttonDisabled

export default function RequestCard({
  request,
  canEdit,
  canDelete,
  canResubmit,
  onEdit,
  onOpenRemarks,
  onOpenDetails,
  onDelete,
  onResubmit,
}: RequestCardProps) {
  const hasUnreadRemarks = request.remarksHistory.some((entry) => !entry.viewedByRequester)

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
          <div className={styles.requestDetailLabel}>Dates and Time Needed</div>
          <div className={styles.requestDetailValue}>{formatSchedule(request)}</div>
        </div>
      </div>

      <div className={styles.requestFooter}>
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
          <button type="button" className={styles.remarkButton} onClick={onOpenRemarks}>
            Remarks
            {hasUnreadRemarks ? <span className={styles.remarkUnreadDot} aria-hidden="true" /> : null}
          </button>
          <button type="button" className={styles.actionDetails} onClick={onOpenDetails}>
            More Details
          </button>
        </div>
      </div>
    </article>
  )
}

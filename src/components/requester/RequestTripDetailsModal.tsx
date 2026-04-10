import ModalCloseButton from '../common/ModalCloseButton'
import styles from '../../styles/modules/requester/RequesterPortal.module.css'
import type { RequestItem } from './RequestCard'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'

type RequestTripDetailsModalProps = {
  request: RequestItem
  onClose: () => void
  onEdit: () => void
}

function formatLongDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function DetailField({
  label,
  value,
  tall = false,
}: {
  label: string
  value: string
  tall?: boolean
}) {
  return (
    <div>
      <div className={styles.tripFieldLabel}>{label}</div>
      <div className={[styles.tripFieldBox, tall ? styles.tripFieldBoxTall : ''].join(' ')}>
        {value}
      </div>
    </div>
  )
}

export default function RequestTripDetailsModal({
  request,
  onClose,
  onEdit,
}: RequestTripDetailsModalProps) {
  useBodyScrollLock()

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.tripModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.tripModalHeader}>
          <b className={styles.tripModalTitle}>TRIP DETAILS</b>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close trip details"
            className={styles.modalCloseButton}
          />
        </div>

        <div className={styles.tripModalBody}>
          <div className={styles.tripGrid}>
            <div>
              <div className={styles.tripSectionTitle}>Request Information &amp; Purpose</div>
              <div className={styles.tripSectionStack}>
                <DetailField label="Request Type" value={request.tripType} />
                <DetailField label="Purpose of request" value={request.purpose} tall />
              </div>
            </div>

            <div>
              <div className={styles.tripSectionTitle}>&nbsp;</div>
              <div className={styles.tripSectionStack}>
                <DetailField label="Passenger Name" value={request.passengerNames.join(', ')} tall />
              </div>
            </div>

            <div>
              <div className={styles.tripSectionTitle}>Destination</div>
              <div className={styles.tripSectionStack}>
                <DetailField label="Street and Barangay" value={request.street} />
                <div className={styles.tripTwoColumn}>
                  <DetailField label="City" value={request.city} />
                  <DetailField label="Province" value={request.province} />
                </div>
                <div className={styles.tripTwoColumn}>
                  <DetailField label="From" value={formatLongDate(request.dateFrom)} />
                  <DetailField label="To" value={formatLongDate(request.dateTo)} />
                </div>
                <div className={styles.tripTwoColumn}>
                  <DetailField label="Time needed" value={request.timeNeeded} />
                </div>
              </div>
            </div>

            <div>
              <div className={styles.tripSectionTitle}>Assigned Vehicle and Driver</div>
              <div className={styles.tripSectionStack}>
                <DetailField label="Driver" value={request.driver} />
                <DetailField label="Vehicle" value={request.vehicle} />
                <DetailField label="Plate Number" value={request.plateNumber} />
              </div>
            </div>
          </div>

          <div className={styles.tripRemarksRow}>
            <div className={styles.tripRemarks}>
              <span className={styles.remarksLabel}>Remarks: </span>
              {request.remarks}
            </div>
            <button type="button" className={styles.tripEditButton} onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

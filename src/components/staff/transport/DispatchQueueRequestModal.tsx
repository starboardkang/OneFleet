import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { StaffRequestItem } from '../portal/types'

type DispatchQueueRequestModalProps = {
  request: StaffRequestItem
  onClose: () => void
  onOpenRemarks: () => void
  onDispatch: () => void
  onReject: () => void
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
      <div className={styles.dispatchFieldLabel}>{label}</div>
      <div className={[styles.dispatchDetailBox, tall ? styles.dispatchDetailBoxTall : ''].join(' ')}>
        {value}
      </div>
    </div>
  )
}

export default function DispatchQueueRequestModal({
  request,
  onClose,
  onOpenRemarks,
  onDispatch,
  onReject,
}: DispatchQueueRequestModalProps) {
  useBodyScrollLock()

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.dispatchDetailModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <div>
            <div className={styles.reviewModalEyebrow}>Dispatch Queue Request</div>
            <h2 className={styles.dispatchModalTitle}>{request.id}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close dispatch request details"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <div className={styles.dispatchDetailGrid}>
            <div className={styles.dispatchDetailSection}>
              <div className={styles.dispatchSectionTitle}>Request Information</div>
              <div className={styles.dispatchDetailStack}>
                <DetailField label="Request Type" value={request.requestType} />
                <DetailField label="Requester" value={request.requester} />
                <DetailField label="Requester Contact" value={request.requesterPhone} />
                <DetailField label="Requested On" value={request.requestedOn} />
                <DetailField label="Passenger Names" value={request.passengerNames.join(', ')} tall />
                <DetailField label="Purpose" value={request.purpose} tall />
              </div>
            </div>

            <div className={styles.dispatchDetailSection}>
              <div className={styles.dispatchSectionTitle}>Trip Destination</div>
              <div className={styles.dispatchDetailStack}>
                <DetailField label="Street and Barangay" value={request.street} />
                <div className={styles.dispatchTwoColumn}>
                  <DetailField label="City" value={request.city} />
                  <DetailField label="Province" value={request.province} />
                </div>
                <div className={styles.dispatchTwoColumn}>
                  <DetailField label="From" value={request.dateFrom} />
                  <DetailField label="To" value={request.dateTo} />
                </div>
                <DetailField label="Time Needed" value={request.timeNeeded} />
                <DetailField label="Current Vehicle" value={request.vehicle} />
              </div>
            </div>
          </div>

          <div className={styles.dispatchDetailSection}>
            <div className={styles.dispatchSectionTitle}>Latest Remarks</div>
            <DetailField label="Dispatch Office Remarks" value={request.remarks} tall />
          </div>
        </div>

        <div className={styles.dispatchModalActions}>
          <button type="button" className={styles.dispatchCloseButton} onClick={onClose}>
            Close
          </button>
          <button type="button" className={styles.transportActionEdit} onClick={onOpenRemarks}>
            Remarks
          </button>
          <button type="button" className={styles.reviewRejectSubmit} onClick={onReject}>
            Reject
          </button>
          <button type="button" className={styles.reviewAcceptSubmit} onClick={onDispatch}>
            Dispatch
          </button>
        </div>
      </div>
    </div>
  )
}

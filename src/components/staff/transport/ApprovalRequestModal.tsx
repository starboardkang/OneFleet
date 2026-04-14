import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { ApprovalDispatchItem } from '../portal/types'
import { formatDateRange } from '../portal/utils'

type ApprovalRequestModalProps = {
  request: ApprovalDispatchItem
  onClose: () => void
  onReject: () => void
  onApprove: () => void
}

function DetailField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className={styles.approvalField}>
      <div className={styles.approvalFieldLabel}>{label}</div>
      <div className={styles.approvalFieldValue}>{value}</div>
    </div>
  )
}

export default function ApprovalRequestModal({
  request,
  onClose,
  onReject,
  onApprove,
}: ApprovalRequestModalProps) {
  useBodyScrollLock()

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.approvalModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <div>
            <div className={styles.reviewModalEyebrow}>RVDSS Approval</div>
            <h2 className={styles.dispatchModalTitle}>{request.drn}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close RVDSS approval details"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <div className={styles.approvalSectionTitle}>RVDSS Details</div>

          <div className={styles.approvalPanel}>
            <div className={styles.approvalColumns}>
              <div className={styles.approvalColumn}>
                <div className={styles.approvalColumnTitle}>Request Info</div>
                <DetailField label="RVDSS" value={request.drn} />
                <DetailField label="Type" value={request.sourceRequest.requestType} />
                <DetailField label="Requestor" value={request.requester} />
                <DetailField label="Destination" value={request.destination} />
              </div>

              <div className={styles.approvalColumn}>
                <div className={styles.approvalColumnTitle}>Assignment</div>
                <DetailField label="Driver Name" value={request.assignedDriverName} />
                <DetailField label="Contact No." value={request.assignedDriverContact} />
                <DetailField label="Vehicle Type" value={request.vehicleType} />
                <DetailField label="Plate No." value={request.vehiclePlateNumber} />
              </div>
            </div>

            <div className={styles.approvalMetaGrid}>
              <DetailField
                label="Schedule"
                value={formatDateRange(request.dateFrom, request.dateTo)}
              />
              <DetailField label="Time Needed" value={request.sourceRequest.timeNeeded} />
              <DetailField label="Purpose" value={request.sourceRequest.purpose} />
              <DetailField
                label="Dispatch Remarks"
                value={request.dispatchRemarks || 'No dispatch remarks provided.'}
              />
            </div>
          </div>
        </div>

        <div className={styles.dispatchModalActions}>
          <button type="button" className={styles.approvalRejectButton} onClick={onReject}>
            Reject
          </button>
          <button type="button" className={styles.approvalApproveButton} onClick={onApprove}>
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

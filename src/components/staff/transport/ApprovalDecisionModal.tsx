import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'

type ApprovalDecisionModalProps = {
  mode: 'approve' | 'reject'
  requestId: string
  remarks: string
  onChangeRemarks: (value: string) => void
  onClose: () => void
  onConfirm: () => void
}

export default function ApprovalDecisionModal({
  mode,
  requestId,
  remarks,
  onChangeRemarks,
  onClose,
  onConfirm,
}: ApprovalDecisionModalProps) {
  useBodyScrollLock()

  const isReject = mode === 'reject'

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.reviewModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <div>
            <div className={styles.reviewModalEyebrow}>
              {isReject ? 'Reject RVDSS Approval' : 'Approve RVDSS Assignment'}
            </div>
            <h2 className={styles.dispatchModalTitle}>{requestId}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close approval decision"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <p className={styles.reviewModalText}>
            {isReject
              ? 'Add the rejection remarks that should be recorded for this request before returning it with a denied status.'
              : 'Add an optional approval note before finalizing this RVDSS assignment.'}
          </p>

          <label className={styles.dispatchField}>
            <span className={styles.dispatchFieldLabel}>
              {isReject ? 'Rejection Remarks' : 'Approval Remarks'}
            </span>
            <textarea
              value={remarks}
              onChange={(event) => onChangeRemarks(event.target.value)}
              className={[styles.dispatchInput, styles.reviewTextarea].join(' ')}
              placeholder={
                isReject
                  ? 'Explain why this assignment is being rejected.'
                  : 'Optional note for the approved assignment.'
              }
            />
          </label>
        </div>

        <div className={styles.dispatchModalActions}>
          <button type="button" className={styles.dispatchCloseButton} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={isReject ? styles.approvalRejectButton : styles.approvalApproveButton}
            onClick={onConfirm}
            disabled={isReject && remarks.trim().length === 0}
          >
            {isReject ? 'Reject' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

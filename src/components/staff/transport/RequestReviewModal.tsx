import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'

type RequestReviewModalProps = {
  mode: 'accept' | 'reject'
  requestId: string
  remarks: string
  onChangeRemarks: (value: string) => void
  onClose: () => void
  onConfirm: () => void
}

export default function RequestReviewModal({
  mode,
  requestId,
  remarks,
  onChangeRemarks,
  onClose,
  onConfirm,
}: RequestReviewModalProps) {
  useBodyScrollLock()

  const isReject = mode === 'reject'
  const confirmDisabled = isReject && remarks.trim().length === 0

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.reviewModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <div>
            <div className={styles.reviewModalEyebrow}>
              {isReject ? 'Reject Request' : 'Move To Dispatch'}
            </div>
            <h2 className={styles.dispatchModalTitle}>{requestId}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close request review"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <p className={styles.reviewModalText}>
            {isReject
              ? 'Enter the rejection remarks before sending this transport request back.'
              : 'Add an optional remark before confirming that this transport request will be moved to dispatch.'}
          </p>

          <label className={styles.dispatchField}>
            <span className={styles.dispatchFieldLabel}>
              {isReject ? 'Rejection Remarks' : 'Dispatch Remarks'}
            </span>
            <textarea
              value={remarks}
              onChange={(event) => onChangeRemarks(event.target.value)}
              className={[styles.dispatchInput, styles.reviewTextarea].join(' ')}
              placeholder={
                isReject
                  ? 'Explain why this request is being rejected.'
                  : 'Optional note for the dispatch queue.'
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
            className={isReject ? styles.reviewRejectSubmit : styles.reviewAcceptSubmit}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {isReject ? 'Reject Request' : 'Accept Request'}
          </button>
        </div>
      </div>
    </div>
  )
}

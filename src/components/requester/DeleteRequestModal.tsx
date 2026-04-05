import ModalCloseButton from '../common/ModalCloseButton'
import styles from './RequesterPortal.module.css'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'

type DeleteRequestModalProps = {
  requestId: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteRequestModal({
  requestId,
  onClose,
  onConfirm,
}: DeleteRequestModalProps) {
  useBodyScrollLock()

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.deleteModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.deleteModalHeader}>
          <div>
            <div className={styles.deleteModalEyebrow}>Delete Request</div>
            <h2 className={styles.deleteModalTitle}>Delete {requestId}?</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close delete confirmation"
            className={styles.modalCloseButton}
          />
        </div>

        <p className={styles.deleteModalText}>
          This action will remove the request from the list. Please confirm if you want to delete it.
        </p>

        <div className={styles.deleteModalActions}>
          <button type="button" className={styles.profileSecondaryButton} onClick={onClose}>
            Keep Request
          </button>
          <button type="button" className={styles.deleteConfirmButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
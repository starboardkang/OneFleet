import ModalCloseButton from '../common/ModalCloseButton'
import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'
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
    <div className={requesterPortalStyles.modalOverlay} onClick={onClose}>
      <div className={requesterPortalStyles.deleteModal} onClick={(event) => event.stopPropagation()}>
        <div className={requesterPortalStyles.deleteModalHeader}>
          <div>
            <div className={requesterPortalStyles.deleteModalEyebrow}>Delete Request</div>
            <h2 className={requesterPortalStyles.deleteModalTitle}>Delete {requestId}?</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close delete confirmation"
            className={requesterPortalStyles.modalCloseButton}
          />
        </div>

        <p className={requesterPortalStyles.deleteModalText}>
          This action will remove the request from the list. Please confirm if you want to delete it.
        </p>

        <div className={requesterPortalStyles.deleteModalActions}>
          <button
            type="button"
            className={requesterPortalStyles.profileSecondaryButton}
            onClick={onClose}
          >
            Keep Request
          </button>
          <button
            type="button"
            className={requesterPortalStyles.deleteConfirmButton}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

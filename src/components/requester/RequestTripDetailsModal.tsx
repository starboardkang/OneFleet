import ModalCloseButton from '../common/ModalCloseButton'
import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'
import type { RequestItem } from './RequestCard'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'

type RequestTripDetailsModalProps = {
  request: RequestItem
  onClose: () => void
  onEdit: () => void
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
      <div className={requesterPortalStyles.tripFieldLabel}>{label}</div>
      <div
        className={`${requesterPortalStyles.tripFieldBox} ${
          tall ? requesterPortalStyles.tripFieldBoxTall : ''
        }`}
      >
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
    <div className={requesterPortalStyles.modalOverlay} onClick={onClose}>
      <div className={requesterPortalStyles.tripModal} onClick={(event) => event.stopPropagation()}>
        <div className={requesterPortalStyles.tripModalHeader}>
          <b className={requesterPortalStyles.tripModalTitle}>TRIP DETAILS</b>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close trip details"
            className={requesterPortalStyles.modalCloseButton}
          />
        </div>

        <div className={requesterPortalStyles.tripModalBody}>
          <div className={requesterPortalStyles.tripGrid}>
            <div>
              <div className={requesterPortalStyles.tripSectionTitle}>Request Information &amp; Purpose</div>
              <div className={requesterPortalStyles.tripSectionStack}>
                <DetailField label="Request Type" value={request.tripType} />
                <DetailField label="Purpose of request" value={request.purpose} tall />
              </div>
            </div>

            <div>
              <div className={requesterPortalStyles.tripSectionTitle}>&nbsp;</div>
              <div className={requesterPortalStyles.tripSectionStack}>
                <DetailField label="Passenger Name" value={request.passengerNames.join(', ')} tall />
              </div>
            </div>

            <div>
              <div className={requesterPortalStyles.tripSectionTitle}>Destination</div>
              <div className={requesterPortalStyles.tripSectionStack}>
                <DetailField label="Street and Barangay" value={request.street} />
                <div className={requesterPortalStyles.tripTwoColumn}>
                  <DetailField label="City" value={request.city} />
                  <DetailField label="Province" value={request.province} />
                </div>
                <div className={requesterPortalStyles.tripTwoColumn}>
                  <DetailField label="Date needed" value={request.dateNeeded} />
                  <DetailField label="Time needed" value={request.timeNeeded} />
                </div>
              </div>
            </div>

            <div>
              <div className={requesterPortalStyles.tripSectionTitle}>Assigned Vehicle and Driver</div>
              <div className={requesterPortalStyles.tripSectionStack}>
                <DetailField label="Driver" value={request.driver} />
                <DetailField label="Vehicle" value={request.vehicle} />
                <DetailField label="Plate Number" value={request.plateNumber} />
              </div>
            </div>
          </div>

          <div className={requesterPortalStyles.tripRemarksRow}>
            <div className={requesterPortalStyles.tripRemarks}>
              <span className={requesterPortalStyles.remarksLabel}>Remarks: </span>
              {request.remarks}
            </div>
            <button type="button" className={requesterPortalStyles.tripEditButton} onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

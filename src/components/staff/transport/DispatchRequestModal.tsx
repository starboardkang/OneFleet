import ModalCloseButton from '../../global/common/ModalCloseButton'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type {
  DispatchFormState,
  DriverOption,
  StaffRequestItem,
  VehicleOption,
} from '../portal/types'

type DispatchRequestModalProps = {
  values: DispatchFormState
  requestOptions: StaffRequestItem[]
  driverOptions: DriverOption[]
  vehicleOptions: VehicleOption[]
  validationMessage: string
  onChange: (field: keyof DispatchFormState, value: string) => void
  onClose: () => void
  onReset: () => void
  onSubmit: () => void
}

export default function DispatchRequestModal({
  values,
  requestOptions,
  driverOptions,
  vehicleOptions,
  validationMessage,
  onChange,
  onClose,
  onReset,
  onSubmit,
}: DispatchRequestModalProps) {
  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.dispatchModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <b className={styles.dispatchModalTitle}>Dispatching for an RVDSS</b>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close dispatching form"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <div className={styles.dispatchSectionTitle}>RVDSS Details</div>
          <label className={styles.dispatchField}>
            <span className={styles.dispatchFieldLabel}>DRN</span>
            <select
              className={styles.dispatchInput}
              value={values.drn}
              onChange={(event) => onChange('drn', event.target.value)}
            >
              <option value="">Select an active RVDSS</option>
              {requestOptions.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.id}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.dispatchSectionTitle}>Driver &amp; Vehicle Assignment</div>
          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Assigned Driver Name</span>
              <select
                className={styles.dispatchInput}
                value={values.assignedDriverName}
                onChange={(event) => onChange('assignedDriverName', event.target.value)}
              >
                <option value="">Select a driver</option>
                {driverOptions.map((driver) => (
                  <option key={driver.id} value={driver.name}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Assigned Driver Contact No.</span>
              <input className={styles.dispatchInput} value={values.assignedDriverContact} readOnly />
            </label>
          </div>

          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Vehicle Brand and Model</span>
              <select
                className={styles.dispatchInput}
                value={values.vehicleType}
                onChange={(event) => onChange('vehicleType', event.target.value)}
              >
                <option value="">Select an available vehicle</option>
                {vehicleOptions.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.label}>
                    {vehicle.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Vehicle Plate No.</span>
              <input className={styles.dispatchInput} value={values.vehiclePlateNumber} readOnly />
            </label>
          </div>

          <div className={styles.dispatchTwoColumn}>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Gas Allocation Reference (optional)</span>
              <input
                className={styles.dispatchInput}
                value={values.gasAllocationReference}
                onChange={(event) => onChange('gasAllocationReference', event.target.value)}
              />
            </label>
            <label className={styles.dispatchField}>
              <span className={styles.dispatchFieldLabel}>Overtime Request (optional)</span>
              <input
                className={styles.dispatchInput}
                value={values.overtimeRequest}
                onChange={(event) => onChange('overtimeRequest', event.target.value)}
              />
            </label>
          </div>

          {validationMessage ? <div className={styles.dispatchValidation}>{validationMessage}</div> : null}
        </div>

        <div className={styles.dispatchModalActions}>
          <button type="button" className={styles.dispatchResetButton} onClick={onReset}>
            Reset
          </button>
          <button type="button" className={styles.dispatchCloseButton} onClick={onClose}>
            Close
          </button>
          <button type="button" className={styles.dispatchSubmitButton} onClick={onSubmit}>
            Request for Approval
          </button>
        </div>
      </div>
    </div>
  )
}

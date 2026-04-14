import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'

export type FuelLogFormValues = {
  recordedBy: string
  plateNumber: string
  logType: string
  fuelType: string
  unitPrice: string
  quantity: string
  station: string
  receiptNumber: string
  receiptFileName: string
  notes: string
}

type FuelLogModalProps = {
  mode: 'create' | 'edit'
  values: FuelLogFormValues
  onClose: () => void
  onReset: () => void
  onSubmit: (values: FuelLogFormValues) => void
}

const logTypeOptions = ['Vehicle Fuel', 'Generator Fuel', 'Reserve Fuel'] as const
const fuelTypeOptions = ['Diesel', 'Gasoline', 'Premium'] as const

export default function FuelLogModal({
  mode,
  values,
  onClose,
  onReset,
  onSubmit,
}: FuelLogModalProps) {
  useBodyScrollLock()

  const [draft, setDraft] = useState<FuelLogFormValues>(values)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDraft(values)
  }, [values])

  const totalPrice =
    (Number.parseFloat(draft.unitPrice || '0') || 0) * (Number.parseFloat(draft.quantity || '0') || 0)

  const handleChange = (field: keyof FuelLogFormValues, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    handleChange('receiptFileName', file?.name ?? '')
  }

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.fuelLogModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <h2 className={styles.fuelLogModalTitle}>
            {mode === 'create' ? 'Add Fuel Log' : 'Edit Fuel Log'}
          </h2>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close fuel log form"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.fuelLogBody}>
          <div className={styles.fuelLogGrid}>
            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Recorded by</span>
              <input
                className={styles.fuelLogInput}
                value={draft.recordedBy}
                onChange={(event) => handleChange('recordedBy', event.target.value)}
              />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Vehicle Plate No.</span>
              <input
                className={styles.fuelLogInput}
                value={draft.plateNumber}
                onChange={(event) => handleChange('plateNumber', event.target.value)}
              />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Type</span>
              <select
                className={styles.fuelLogInput}
                value={draft.logType}
                onChange={(event) => handleChange('logType', event.target.value)}
              >
                <option value="">Select type</option>
                {logTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Fuel Type</span>
              <select
                className={styles.fuelLogInput}
                value={draft.fuelType}
                onChange={(event) => handleChange('fuelType', event.target.value)}
              >
                <option value="">Select fuel type</option>
                {fuelTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Unit Price</span>
              <input
                className={styles.fuelLogInput}
                inputMode="decimal"
                value={draft.unitPrice}
                onChange={(event) => handleChange('unitPrice', event.target.value)}
              />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Total Price</span>
              <input className={styles.fuelLogInput} value={totalPrice.toFixed(2)} readOnly />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Quantity</span>
              <input
                className={styles.fuelLogInput}
                inputMode="decimal"
                value={draft.quantity}
                onChange={(event) => handleChange('quantity', event.target.value)}
              />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Station</span>
              <input
                className={styles.fuelLogInput}
                value={draft.station}
                onChange={(event) => handleChange('station', event.target.value)}
              />
            </label>

            <label className={styles.fuelLogField}>
              <span className={styles.fuelLogLabel}>Receipt Number</span>
              <input
                className={styles.fuelLogInput}
                value={draft.receiptNumber}
                onChange={(event) => handleChange('receiptNumber', event.target.value)}
              />
            </label>
          </div>

          <div className={styles.fuelLogField}>
            <span className={styles.fuelLogLabel}>Receipt Image</span>
            <div className={styles.fuelUploadField}>
              <input
                ref={fileInputRef}
                type="file"
                className={styles.fuelHiddenInput}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={styles.fuelChooseFileButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
              <span className={styles.fuelFileName}>
                {draft.receiptFileName || 'No File Chosen'}
              </span>
            </div>
          </div>

          <label className={styles.fuelLogField}>
            <span className={styles.fuelLogLabel}>Notes</span>
            <textarea
              className={[styles.fuelLogInput, styles.fuelLogTextarea].join(' ')}
              value={draft.notes}
              onChange={(event) => handleChange('notes', event.target.value)}
            />
          </label>
        </div>

        <div className={styles.fuelLogActions}>
          <button type="button" className={styles.fuelLogResetButton} onClick={() => { setDraft(values); onReset() }}>
            Reset
          </button>
          <button type="button" className={styles.fuelLogCloseButton} onClick={onClose}>
            Close
          </button>
          <button type="button" className={styles.fuelLogSubmitButton} onClick={() => onSubmit(draft)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

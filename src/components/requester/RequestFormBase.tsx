import { FunctionComponent, useState } from 'react'
import DatePickerModal from './DatePickerModal'
import styles from '../../styles/modules/requester/RequestFormBase.module.css'
import TimePickerModal from './TimePickerModal'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
import ModalCloseButton from '../common/ModalCloseButton'

const requestTypeOptions = [
  'DRIVER ONLY',
  'VEHICLE ONLY',
  'DRIVER AND VEHICLE',
  'GENSET',
  'HEAVY EQUIPMENT',
] as const

type PickerType = 'date' | 'time' | null

export type RequestFormValues = {
  requestType: (typeof requestTypeOptions)[number]
  passengerNames: string[]
  purpose: string
  street: string
  province: string
  city: string
  dateNeeded: string
  timeNeeded: string
}

type RequestFormBaseProps = {
  mode: 'create' | 'edit'
  onClose: () => void
  onSubmit: (values: RequestFormValues) => void
  initialValues?: Partial<RequestFormValues>
}

const parseDateValue = (value: string) => {
  if (!value) {
    const now = new Date()
    return {
      month: now.getMonth(),
      day: now.getDate(),
      year: now.getFullYear(),
    }
  }

  const [year, month, day] = value.split('-').map(Number)

  return {
    month: month - 1,
    day,
    year,
  }
}

const formatDateLabel = (value: string) => {
  if (!value) {
    return 'Date Needed'
  }

  const parsedDate = new Date(`${value}T00:00:00`)
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatTimeLabel = (value: string) => value || 'Time Needed'

const RequestFormBase: FunctionComponent<RequestFormBaseProps> = ({
  mode,
  onClose,
  onSubmit,
  initialValues,
}) => {
  useBodyScrollLock()

  const [requestType, setRequestType] = useState<string>(initialValues?.requestType ?? '')
  const [passengerNames, setPassengerNames] = useState<string[]>(initialValues?.passengerNames ?? [''])
  const [purpose, setPurpose] = useState(initialValues?.purpose ?? '')
  const [street, setStreet] = useState(initialValues?.street ?? '')
  const [province, setProvince] = useState(initialValues?.province ?? '')
  const [city, setCity] = useState(initialValues?.city ?? '')
  const [dateNeeded, setDateNeeded] = useState(initialValues?.dateNeeded ?? '')
  const [timeNeeded, setTimeNeeded] = useState(initialValues?.timeNeeded ?? '')
  const [activePicker, setActivePicker] = useState<PickerType>(null)
  const [validationMessage, setValidationMessage] = useState('')
  
  const parsedInitialDate = parseDateValue(initialValues?.dateNeeded ?? '')
  const [visibleMonth, setVisibleMonth] = useState(parsedInitialDate.month)
  const [visibleYear, setVisibleYear] = useState(parsedInitialDate.year)
  const [draftDateValue, setDraftDateValue] = useState(
    initialValues?.dateNeeded ??
      `${parsedInitialDate.year}-${String(parsedInitialDate.month + 1).padStart(2, '0')}-${String(
        parsedInitialDate.day,
      ).padStart(2, '0')}`,
  )

  const canAddPassenger = passengerNames[passengerNames.length - 1]?.trim().length > 0

  const validation = {
    requestType: requestType.trim().length === 0,
    passengerNames: passengerNames.some((passengerName) => passengerName.trim().length === 0),
    purpose: purpose.trim().length === 0,
    street: street.trim().length === 0,
    province: province.trim().length === 0,
    city: city.trim().length === 0,
    dateNeeded: dateNeeded.trim().length === 0,
    timeNeeded: timeNeeded.trim().length === 0,
  }

  const hasErrors = Object.values(validation).some(Boolean)

  const handlePassengerChange = (index: number, value: string) => {
    setPassengerNames((previous) =>
      previous.map((passengerName, passengerIndex) =>
        passengerIndex === index ? value : passengerName,
      ),
    )
    setValidationMessage('')
  }

  const handleAddPassenger = () => {
    if (!canAddPassenger) {
      return
    }

    setPassengerNames((previous) => [...previous, ''])
  }

  const handleRemovePassenger = (index: number) => {
    if (passengerNames[index]?.trim().length === 0) {
      return
    }

    setPassengerNames((previous) => {
      if (previous.length === 1) {
        return ['']
      }

      return previous.filter((_, passengerIndex) => passengerIndex !== index)
    })
  }

  const handleReset = () => {
    setRequestType(initialValues?.requestType ?? '')
    setPassengerNames(initialValues?.passengerNames ?? [''])
    setPurpose(initialValues?.purpose ?? '')
    setStreet(initialValues?.street ?? '')
    setProvince(initialValues?.province ?? '')
    setCity(initialValues?.city ?? '')
    setDateNeeded(initialValues?.dateNeeded ?? '')
    setTimeNeeded(initialValues?.timeNeeded ?? '')
    setValidationMessage('')
  }

  const handleSubmit = () => {
    if (hasErrors) {
      setValidationMessage('Please complete every field before continuing.')
      return
    }

    onSubmit({
      requestType: requestType as RequestFormValues['requestType'],
      passengerNames: passengerNames.map((passengerName) => passengerName.trim()),
      purpose: purpose.trim(),
      street: street.trim(),
      province: province.trim(),
      city: city.trim(),
      dateNeeded,
      timeNeeded,
    })
  }

  const openDatePicker = () => {
    const parsedDate = parseDateValue(dateNeeded)
    setVisibleMonth(parsedDate.month)
    setVisibleYear(parsedDate.year)
    setDraftDateValue(
      dateNeeded ||
        `${parsedDate.year}-${String(parsedDate.month + 1).padStart(2, '0')}-${String(parsedDate.day).padStart(2, '0')}`,
    )
    setActivePicker('date')
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.requestForm} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <b className={styles.title}>{mode === 'create' ? 'CREATE REQUEST' : 'EDIT REQUEST'}</b>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel={`Close ${mode} request`}
            className={styles.closeButton}
          />
        </div>

        <div className={styles.formBody}>
          <div className={styles.sectionHeading}>Request Information &amp; Purpose</div>

          <div className={styles.fieldShell}>
            <select
              className={`${styles.select} ${validation.requestType ? styles.invalidField : ''}`}
              value={requestType}
              onChange={(event) => {
                setRequestType(event.target.value)
                setValidationMessage('')
              }}
            >
              <option value="" disabled>
                Request Type
              </option>
              {requestTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className={styles.selectChevron} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles.chevronIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>

          <div className={styles.passengerLayout}>
            <div className={styles.passengerStack}>
              {passengerNames.map((passengerName, index) => (
                <div key={`passenger-${index}`} className={styles.passengerRow}>
                  <input
                    className={`${styles.input} ${
                      passengerName.trim().length === 0 ? styles.invalidField : ''
                    }`}
                    value={passengerName}
                    onChange={(event) => handlePassengerChange(index, event.target.value)}
                    placeholder="Passenger Name"
                  />
                  <button
                    type="button"
                    className={styles.removePassengerButton}
                    onClick={() => handleRemovePassenger(index)}
                    disabled={passengerName.trim().length === 0}
                    aria-label={`Remove passenger ${index + 1}`}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.addPassengerButton}
              onClick={handleAddPassenger}
              disabled={!canAddPassenger}
              aria-label="Add passenger"
            >
              +
            </button>
          </div>

          <textarea
            className={`${styles.textarea} ${validation.purpose ? styles.invalidField : ''}`}
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value)
              setValidationMessage('')
            }}
            placeholder="Purpose of request"
          />

          <div className={styles.sectionHeading}>Destination</div>

          <input
            className={`${styles.input} ${validation.street ? styles.invalidField : ''}`}
            value={street}
            onChange={(event) => {
              setStreet(event.target.value)
              setValidationMessage('')
            }}
            placeholder="Street and Barangay"
          />

          <div className={styles.twoColumnRow}>
            <input
              className={`${styles.input} ${validation.province ? styles.invalidField : ''}`}
              value={province}
              onChange={(event) => {
                setProvince(event.target.value)
                setValidationMessage('')
              }}
              placeholder="Province"
            />
            <input
              className={`${styles.input} ${validation.city ? styles.invalidField : ''}`}
              value={city}
              onChange={(event) => {
                setCity(event.target.value)
                setValidationMessage('')
              }}
              placeholder="City or Municipality"
            />
          </div>

          <div className={styles.twoColumnRow}>
            <button
              type="button"
              className={`${styles.pickerTrigger} ${validation.dateNeeded ? styles.invalidField : ''}`}
              onClick={openDatePicker}
            >
              {formatDateLabel(dateNeeded)}
            </button>
            <button
              type="button"
              className={`${styles.pickerTrigger} ${validation.timeNeeded ? styles.invalidField : ''}`}
              onClick={() => setActivePicker('time')}
            >
              {formatTimeLabel(timeNeeded)}
            </button>
          </div>

          {validationMessage ? <div className={styles.validationMessage}>{validationMessage}</div> : null}

          <div className={styles.actions}>
            <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
              {mode === 'create' ? 'Submit' : 'Edit'}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={mode === 'create' ? handleReset : onClose}
            >
              {mode === 'create' ? 'Reset' : 'Cancel'}
            </button>
          </div>

          <div className={styles.noteRequestForContainer}>
            <span>{`Note: Request for vehicle use shall be made at least `}</span>
            <b className={styles.two2To}>two (2) to three (3) days</b>
            <span>{` from the intended date of use. Failure to use the vehicle at the given date/time forfeits one's right to use the vehicle assigned.`}</span>
          </div>
        </div>

        {activePicker === 'date' ? (
          <DatePickerModal
            visibleMonth={visibleMonth}
            visibleYear={visibleYear}
            selectedValue={draftDateValue}
            onMonthChange={setVisibleMonth}
            onYearChange={setVisibleYear}
            onShiftMonth={(direction) => {
              const nextDate = new Date(visibleYear, visibleMonth + direction, 1)
              setVisibleMonth(nextDate.getMonth())
              setVisibleYear(nextDate.getFullYear())
            }}
            onSelectDate={setDraftDateValue}
            onClose={() => setActivePicker(null)}
            onConfirm={() => {
              setDateNeeded(draftDateValue)
              setValidationMessage('')
              setActivePicker(null)
            }}
          />
        ) : null}

        {activePicker === 'time' ? (
          <TimePickerModal
            value={timeNeeded}
            onChange={(nextValue) => {
              setTimeNeeded(nextValue)
              setValidationMessage('')
            }}
            onClose={() => setActivePicker(null)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default RequestFormBase

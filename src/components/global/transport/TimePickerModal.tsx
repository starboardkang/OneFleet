import { useState } from 'react'
import styles from '../../../styles/modules/global/transport/TimePickerModal.module.css'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'

type TimePickerModalProps = {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

const parseTimeValue = (value: string) => {
  if (!value) {
    return {
      hour: '7',
      minute: '15',
      period: 'AM' as const,
    }
  }

  const [timePart, periodPart] = value.split(' ')
  const [hourPart, minutePart] = timePart.split(':')

  return {
    hour: String(Number(hourPart)),
    minute: minutePart,
    period: (periodPart as 'AM' | 'PM') || 'AM',
  }
}

export default function TimePickerModal({ value, onChange, onClose }: TimePickerModalProps) {
  useBodyScrollLock()

  const parsedValue = parseTimeValue(value)
  const [hour, setHour] = useState(parsedValue.hour)
  const [minute, setMinute] = useState(parsedValue.minute)
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsedValue.period)
  const [activeField, setActiveField] = useState<'hour' | 'minute'>('hour')

  const handleConfirm = () => {
    const normalizedHour = Math.min(12, Math.max(1, Number(hour) || 1))
    const normalizedMinute = Math.min(59, Math.max(0, Number(minute) || 0))
    onChange(`${normalizedHour}:${String(normalizedMinute).padStart(2, '0')} ${period}`)
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.label}>ENTER TIME</div>

        <div className={styles.body}>
          <div className={styles.inputGroup}>
            <input
              className={`${styles.timeInput} ${activeField === 'hour' ? styles.activeTimeInput : ''}`}
              value={hour}
              onChange={(event) => setHour(event.target.value.replace(/\D/g, '').slice(0, 2))}
              onFocus={() => setActiveField('hour')}
              onClick={() => setActiveField('hour')}
            />
            <span className={styles.caption}>Hour</span>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.inputGroup}>
            <input
              className={`${styles.timeInput} ${activeField === 'minute' ? styles.activeTimeInput : ''}`}
              value={minute}
              onChange={(event) => setMinute(event.target.value.replace(/\D/g, '').slice(0, 2))}
              onFocus={() => setActiveField('minute')}
              onClick={() => setActiveField('minute')}
            />
            <span className={styles.caption}>Minute</span>
          </div>

          <div className={styles.periodToggle}>
            <button
              type="button"
              className={`${styles.periodButton} ${period === 'AM' ? styles.activePeriodButton : ''}`}
              onClick={() => setPeriod('AM')}
            >
              AM
            </button>
            <button
              type="button"
              className={`${styles.periodButton} ${period === 'PM' ? styles.activePeriodButton : ''}`}
              onClick={() => setPeriod('PM')}
            >
              PM
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.actionButton} onClick={onClose}>
            CANCEL
          </button>
          <button type="button" className={styles.actionButton} onClick={handleConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

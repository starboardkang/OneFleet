import styles from '../../../styles/modules/global/transport/DatePickerModal.module.css'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const

type DatePickerModalProps = {
  visibleMonth: number
  visibleYear: number
  selectedValue: string
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
  onShiftMonth: (direction: -1 | 1) => void
  onSelectDate: (value: string) => void
  onClose: () => void
  onConfirm: () => void
}

const formatDateValue = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const yearOptions = Array.from({ length: 12 }, (_, index) => 2024 + index)

export default function DatePickerModal({
  visibleMonth,
  visibleYear,
  selectedValue,
  onMonthChange,
  onYearChange,
  onShiftMonth,
  onSelectDate,
  onClose,
  onConfirm,
}: DatePickerModalProps) {
  useBodyScrollLock()

  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate()
  const firstWeekday = new Date(visibleYear, visibleMonth, 1).getDay()
  const previousMonthDays = new Date(visibleYear, visibleMonth, 0).getDate()

  const cells: Array<{ day: number; currentMonth: boolean; value: string }> = []

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const day = previousMonthDays - index
    const date = new Date(visibleYear, visibleMonth - 1, day)
    cells.push({
      day,
      currentMonth: false,
      value: formatDateValue(date.getFullYear(), date.getMonth(), date.getDate()),
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      currentMonth: true,
      value: formatDateValue(visibleYear, visibleMonth, day),
    })
  }

  let nextMonthDay = 1
  while (cells.length < 35) {
    const date = new Date(visibleYear, visibleMonth + 1, nextMonthDay)
    cells.push({
      day: nextMonthDay,
      currentMonth: false,
      value: formatDateValue(date.getFullYear(), date.getMonth(), date.getDate()),
    })
    nextMonthDay += 1
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button type="button" className={styles.arrowButton} onClick={() => onShiftMonth(-1)} aria-label="Previous month">
            {'<'}
          </button>
          <div className={styles.headerSelects}>
            <select
              className={styles.headerSelect}
              value={visibleMonth}
              onChange={(event) => onMonthChange(Number(event.target.value))}
            >
              {monthNames.map((monthName, index) => (
                <option key={monthName} value={index}>
                  {monthName.slice(0, 3)}
                </option>
              ))}
            </select>
            <select
              className={styles.headerSelect}
              value={visibleYear}
              onChange={(event) => onYearChange(Number(event.target.value))}
            >
              {yearOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className={styles.arrowButton} onClick={() => onShiftMonth(1)} aria-label="Next month">
            {'>'}
          </button>
        </div>

        <div className={styles.weekdays}>
          {weekdayLabels.map((weekday) => (
            <span key={weekday} className={styles.weekday}>
              {weekday}
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {cells.map((cell) => (
            <button
              key={cell.value}
              type="button"
              className={`${styles.dayButton} ${
                cell.currentMonth ? '' : styles.outsideMonth
              } ${cell.value === selectedValue ? styles.selectedDay : ''}`}
              onClick={() => onSelectDate(cell.value)}
            >
              {cell.day}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={[styles.actionButton, styles.secondaryAction].join(' ')}
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            className={[styles.actionButton, styles.primaryAction].join(' ')}
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

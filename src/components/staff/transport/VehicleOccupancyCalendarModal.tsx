import { useMemo, useState } from 'react'
import ModalCloseButton from '../../global/common/ModalCloseButton'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { VehicleOccupancyEntry, VehicleOption } from '../portal/types'

type VehicleOccupancyCalendarModalProps = {
  vehicles: VehicleOption[]
  occupancies: VehicleOccupancyEntry[]
  onClose: () => void
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthDate = new Date('2026-04-01T00:00:00')

function formatVehicleLabel(vehicle: VehicleOption) {
  return `${vehicle.label} (${vehicle.plateNumber})`
}

function formatMonthTitle(value: Date) {
  return value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function buildCalendarDays(value: Date) {
  const firstDay = new Date(value.getFullYear(), value.getMonth(), 1)
  const lastDay = new Date(value.getFullYear(), value.getMonth() + 1, 0)
  const leadingDays = firstDay.getDay()
  const totalDays = lastDay.getDate()
  const cells: Array<{ key: string; date: string | null; dayNumber: number | null }> = []

  for (let index = 0; index < leadingDays; index += 1) {
    cells.push({ key: `empty-start-${index}`, date: null, dayNumber: null })
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(value.getFullYear(), value.getMonth(), day)
    cells.push({
      key: date.toISOString(),
      date: date.toISOString().slice(0, 10),
      dayNumber: day,
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `empty-end-${cells.length}`, date: null, dayNumber: null })
  }

  return cells
}

export default function VehicleOccupancyCalendarModal({
  vehicles,
  occupancies,
  onClose,
}: VehicleOccupancyCalendarModalProps) {
  useBodyScrollLock()

  const [searchTerm, setSearchTerm] = useState('')
  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) =>
        formatVehicleLabel(vehicle).toLowerCase().includes(searchTerm.trim().toLowerCase()),
      ),
    [searchTerm, vehicles],
  )

  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id ?? '')
  const calendarDays = useMemo(() => buildCalendarDays(monthDate), [])

  const selectedVehicle = filteredVehicles.find((vehicle) => vehicle.id === selectedVehicleId) ??
    vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ??
    filteredVehicles[0] ??
    vehicles[0] ??
    null

  const vehicleOccupancies = useMemo(
    () => occupancies.filter((entry) => entry.vehicleId === selectedVehicle?.id),
    [occupancies, selectedVehicle],
  )

  const occupancyMap = useMemo(() => {
    const next = new Map<string, string[]>()

    for (const occupancy of vehicleOccupancies) {
      const start = new Date(`${occupancy.startDate}T00:00:00`)
      const end = new Date(`${occupancy.endDate}T00:00:00`)

      for (
        let current = new Date(start);
        current.getTime() <= end.getTime();
        current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)
      ) {
        const key = current.toISOString().slice(0, 10)
        const existing = next.get(key) ?? []
        existing.push(occupancy.requestId)
        next.set(key, existing)
      }
    }

    return next
  }, [vehicleOccupancies])

  return (
    <div className={styles.dispatchModalOverlay} onClick={onClose}>
      <div className={styles.calendarModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dispatchModalHeader}>
          <div>
            <div className={styles.reviewModalEyebrow}>Vehicle Occupancy</div>
            <h2 className={styles.dispatchModalTitle}>{formatMonthTitle(monthDate)}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close vehicle occupancy calendar"
            className={styles.dispatchModalCloseButton}
          />
        </div>

        <div className={styles.dispatchModalBody}>
          <div className={styles.calendarToolbar}>
            <label className={styles.transportSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search owned vehicles"
                placeholder="Search owned vehicles"
              />
            </label>

            <select
              className={styles.dispatchInput}
              value={selectedVehicle?.id ?? ''}
              onChange={(event) => setSelectedVehicleId(event.target.value)}
            >
              {filteredVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {formatVehicleLabel(vehicle)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.calendarGridWrap}>
            <div className={styles.calendarWeekdays}>
              {weekdayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {calendarDays.map((day) => {
                const dayOccupancies = day.date ? occupancyMap.get(day.date) ?? [] : []

                return (
                  <div
                    key={day.key}
                    className={[
                      styles.calendarCell,
                      day.date ? styles.calendarCellActive : styles.calendarCellMuted,
                      dayOccupancies.length > 0 ? styles.calendarCellOccupied : '',
                    ].join(' ')}
                  >
                    {day.dayNumber ? <span className={styles.calendarDayNumber}>{day.dayNumber}</span> : null}
                    <div className={styles.calendarOccupancyStack}>
                      {dayOccupancies.map((requestId) => (
                        <span key={`${day.key}-${requestId}`} className={styles.calendarOccupancyChip}>
                          {requestId}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

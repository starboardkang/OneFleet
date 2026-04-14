import { useState } from 'react'
import FuelLogModal, { type FuelLogFormValues } from './FuelLogModal'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'

type FuelLogItem = {
  id: string
  recordedBy: string
  plateNumber: string
  logType: string
  fuelType: string
  unitPrice: number
  quantityLiters: number
  station: string
  receiptNumber: string
  receiptFileName: string
  notes: string
}

type DepartmentFuelItem = {
  name: string
  liters: number
  colorClassName: string
}

const fuelLogs: FuelLogItem[] = [
  {
    id: 'FL-001',
    recordedBy: 'Percy',
    plateNumber: 'SAB-2132',
    logType: 'Vehicle Fuel',
    fuelType: 'Diesel',
    unitPrice: 118,
    quantityLiters: 10,
    station: 'Petron Kapitolyo',
    receiptNumber: 'RCPT-1180',
    receiptFileName: 'receipt-fl-001.jpg',
    notes: 'Routine refuel before field travel.',
  },
  {
    id: 'FL-002',
    recordedBy: 'Andrea',
    plateNumber: 'SAA-1098',
    logType: 'Vehicle Fuel',
    fuelType: 'Gasoline',
    unitPrice: 112,
    quantityLiters: 14,
    station: 'Shell Ortigas',
    receiptNumber: 'RCPT-2044',
    receiptFileName: 'receipt-fl-002.jpg',
    notes: 'Full tank after city assignment.',
  },
  {
    id: 'FL-003',
    recordedBy: 'Maria',
    plateNumber: 'NBC-4417',
    logType: 'Reserve Fuel',
    fuelType: 'Diesel',
    unitPrice: 118,
    quantityLiters: 8,
    station: 'Caltex Pasig',
    receiptNumber: 'RCPT-3109',
    receiptFileName: '',
    notes: 'Emergency reserve refill.',
  },
]

const departmentConsumption: DepartmentFuelItem[] = [
  { name: 'OOTM', liters: 1120, colorClassName: styles.fuelBarGreen },
  { name: 'OOTVM', liters: 1040, colorClassName: styles.fuelBarRed },
  { name: 'Motorpool', liters: 960, colorClassName: styles.fuelBarBlue },
  { name: 'Library', liters: 860, colorClassName: styles.fuelBarSky },
  { name: 'Motor', liters: 740, colorClassName: styles.fuelBarAmber },
  { name: 'DEP', liters: 620, colorClassName: styles.fuelBarIndigo },
  { name: 'Other', liters: 200, colorClassName: styles.fuelBarNeutral },
]

function formatPeso(value: number) {
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function createEmptyFuelLog(): FuelLogFormValues {
  return {
    recordedBy: '',
    plateNumber: '',
    logType: '',
    fuelType: '',
    unitPrice: '',
    quantity: '',
    station: '',
    receiptNumber: '',
    receiptFileName: '',
    notes: '',
  }
}

export default function FuelManagementContent() {
  const [logs, setLogs] = useState<FuelLogItem[]>(fuelLogs)
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false)
  const [editingFuelLogId, setEditingFuelLogId] = useState<string | null>(null)
  const [fuelFormDefaults, setFuelFormDefaults] = useState<FuelLogFormValues>(createEmptyFuelLog())
  const peakLiters = Math.max(...departmentConsumption.map((item) => item.liters))

  const openCreateModal = () => {
    setEditingFuelLogId(null)
    setFuelFormDefaults(createEmptyFuelLog())
    setIsFuelModalOpen(true)
  }

  const openEditModal = (log: FuelLogItem) => {
    setEditingFuelLogId(log.id)
    setFuelFormDefaults({
      recordedBy: log.recordedBy,
      plateNumber: log.plateNumber,
      logType: log.logType,
      fuelType: log.fuelType,
      unitPrice: String(log.unitPrice),
      quantity: String(log.quantityLiters),
      station: log.station,
      receiptNumber: log.receiptNumber,
      receiptFileName: log.receiptFileName,
      notes: log.notes,
    })
    setIsFuelModalOpen(true)
  }

  const handleSubmitFuelLog = (values: FuelLogFormValues) => {
    const nextLog: FuelLogItem = {
      id: editingFuelLogId ?? `FL-${String(logs.length + 1).padStart(3, '0')}`,
      recordedBy: values.recordedBy,
      plateNumber: values.plateNumber,
      logType: values.logType,
      fuelType: values.fuelType,
      unitPrice: Number.parseFloat(values.unitPrice || '0') || 0,
      quantityLiters: Number.parseFloat(values.quantity || '0') || 0,
      station: values.station,
      receiptNumber: values.receiptNumber,
      receiptFileName: values.receiptFileName,
      notes: values.notes,
    }

    setLogs((current) =>
      editingFuelLogId
        ? current.map((log) => (log.id === editingFuelLogId ? nextLog : log))
        : [nextLog, ...current],
    )
    setIsFuelModalOpen(false)
    setEditingFuelLogId(null)
    setFuelFormDefaults(createEmptyFuelLog())
  }

  return (
    <section className={styles.fuelPage}>
      <div className={styles.fuelHero}>
        <div>
          <h2 className={styles.fuelPageTitle}>Fuel Management</h2>
        </div>

        <div className={styles.fuelHeroActions}>
          <label className={styles.transportSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input type="text" value="" readOnly placeholder="Search request no., driver, destination" />
          </label>
          <button type="button" className={styles.createRequestButton} onClick={openCreateModal}>
            + Add Fuel Log
          </button>
        </div>
      </div>

      <div className={styles.fuelTopGrid}>
        <article className={styles.fuelChartCard}>
          <div className={styles.fuelCardHeader}>
            <h3 className={styles.fuelCardTitle}>Fuel consumption by department</h3>
          </div>

          <div className={styles.fuelChartScale}>
            <span>0L</span>
            <span>200L</span>
            <span>400L</span>
            <span>600L</span>
            <span>800L</span>
            <span>1000L</span>
            <span>1200L</span>
          </div>

          <div className={styles.fuelChartRows}>
            {departmentConsumption.map((item) => (
              <div key={item.name} className={styles.fuelChartRow}>
                <div className={styles.fuelChartLabel}>{item.name}</div>
                <div className={styles.fuelChartTrack}>
                  <div
                    className={[styles.fuelChartBar, item.colorClassName].join(' ')}
                    style={{ width: `${(item.liters / peakLiters) * 100}%` }}
                  />
                </div>
                <div className={styles.fuelChartValue}>{item.liters}L</div>
              </div>
            ))}
          </div>
        </article>

        <div className={styles.fuelMetricStack}>
          <article className={[styles.fuelMetricCard, styles.fuelMetricAmber].join(' ')}>
            <div className={styles.fuelMetricTitle}>Total fuel consumed</div>
            <div className={styles.fuelMetricValue}>4,820 L</div>
            <div className={styles.fuelMetricTrend}>+12% vs last month</div>
          </article>

          <article className={[styles.fuelMetricCard, styles.fuelMetricBlue].join(' ')}>
            <div className={styles.fuelMetricTitle}>Monthly Consumption</div>
            <div className={styles.fuelMetricValue}>48.2 L</div>
            <div className={styles.fuelMetricTrend}>+5% above target</div>
          </article>
        </div>
      </div>

      <article className={styles.fuelLogsCard}>
        <div className={styles.fuelCardHeader}>
          <h3 className={styles.fuelCardTitle}>Fuel Log</h3>
        </div>

        <div className={styles.fuelTableWrap}>
          <table className={styles.fuelTable}>
            <thead>
              <tr>
                <th scope="col">Fuel Log ID</th>
                <th scope="col">Recorded By</th>
                <th scope="col">Plate No.</th>
                <th scope="col">Fuel Type</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const totalPrice = log.unitPrice * log.quantityLiters

                return (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.recordedBy}</td>
                    <td>{log.plateNumber}</td>
                    <td>{log.fuelType}</td>
                    <td>{formatPeso(log.unitPrice)}</td>
                    <td>{formatPeso(totalPrice)}</td>
                    <td>{log.quantityLiters} L</td>
                    <td>
                      <div className={styles.fuelActionRow}>
                        <button
                          type="button"
                          className={styles.fuelEditButton}
                          onClick={() => openEditModal(log)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.fuelDeleteButton}
                          onClick={() => setLogs((current) => current.filter((item) => item.id !== log.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </article>

      {isFuelModalOpen ? (
        <FuelLogModal
          mode={editingFuelLogId ? 'edit' : 'create'}
          values={fuelFormDefaults}
          onClose={() => {
            setIsFuelModalOpen(false)
            setEditingFuelLogId(null)
          }}
          onReset={() => undefined}
          onSubmit={handleSubmitFuelLog}
        />
      ) : null}
    </section>
  )
}

import { useMemo, useState } from 'react'
import ModalCloseButton from '../common/ModalCloseButton'
import type { RemarkHistoryEntry } from './types'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import styles from '../../../styles/modules/global/transport/RemarksHistoryModal.module.css'

type RemarksHistoryModalProps = {
  requestId: string
  remarksHistory: RemarkHistoryEntry[]
  onClose: () => void
  onSaveEditRemark?: (remarkId: string, nextMessage: string) => void
}

const editableWindowMs = 24 * 60 * 60 * 1000

export default function RemarksHistoryModal({
  requestId,
  remarksHistory,
  onClose,
  onSaveEditRemark,
}: RemarksHistoryModalProps) {
  useBodyScrollLock()
  const [editingRemarkId, setEditingRemarkId] = useState<string | null>(null)
  const [draftMessage, setDraftMessage] = useState('')
  const now = useMemo(() => Date.now(), [])

  const canEditRemark = (entry: RemarkHistoryEntry) =>
    typeof onSaveEditRemark === 'function' &&
    Number.isFinite(Date.parse(entry.createdAt)) &&
    now - new Date(entry.createdAt).getTime() <= editableWindowMs

  const startEditing = (entry: RemarkHistoryEntry) => {
    setEditingRemarkId(entry.id)
    setDraftMessage(entry.message)
  }

  const stopEditing = () => {
    setEditingRemarkId(null)
    setDraftMessage('')
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Request Remarks</div>
            <h2 className={styles.title}>{requestId}</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close remarks history"
            className={styles.closeButton}
          />
        </div>

        <div className={styles.timeline}>
          {remarksHistory.length > 0 ? (
            remarksHistory.map((entry) => (
              <article key={entry.id} className={styles.timelineItem}>
                <div className={styles.markerColumn}>
                  <span className={styles.marker} />
                  <span className={styles.connector} />
                </div>
                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.author}>{entry.author}</span>
                    <span className={styles.date}>
                      {entry.date}
                      {entry.updatedAt ? ' | Edited' : ''}
                    </span>
                  </div>
                  {editingRemarkId === entry.id ? (
                    <>
                      <textarea
                        value={draftMessage}
                        onChange={(event) => setDraftMessage(event.target.value)}
                        className={styles.editTextarea}
                      />
                      <div className={styles.editActions}>
                        <button type="button" className={styles.secondaryAction} onClick={stopEditing}>
                          Cancel
                        </button>
                        <button
                          type="button"
                          className={styles.primaryAction}
                          onClick={() => {
                            if (draftMessage.trim().length === 0 || !onSaveEditRemark) {
                              return
                            }
                            onSaveEditRemark(entry.id, draftMessage.trim())
                            stopEditing()
                          }}
                          disabled={draftMessage.trim().length === 0}
                        >
                          Save Remark
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={styles.message}>{entry.message}</p>
                      {canEditRemark(entry) ? (
                        <div className={styles.entryActionRow}>
                          <button
                            type="button"
                            className={styles.editButton}
                            onClick={() => startEditing(entry)}
                          >
                            Edit Remark
                          </button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>No remarks have been recorded for this request yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

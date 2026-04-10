import SegmentedControl from '../../global/common/SegmentedControl'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type {
  ApprovalDispatchItem,
  RequestListView,
  StaffRequestItem,
  TransportTab,
} from '../portal/types'
import { formatDateRange } from '../portal/utils'

type StaffTransportContentProps = {
  today: string
  activeTransportTab: TransportTab
  requestListView: RequestListView
  requestCounts: {
    total: number
    approved: number
    ongoing: number
    completed: number
    processing: number
    denied: number
  }
  visibleAllRequests: StaffRequestItem[]
  dispatchRequests: StaffRequestItem[]
  approvalRequests: ApprovalDispatchItem[]
  onChangeTransportTab: (tab: TransportTab) => void
  onChangeRequestListView: (view: RequestListView) => void
  onOpenCreate: () => void
  onOpenDetails: (request: StaffRequestItem) => void
  onOpenRemarks: (request: StaffRequestItem) => void
  onOpenCalendar: () => void
  onAcceptRequest: (request: StaffRequestItem) => void
  onRejectRequest: (request: StaffRequestItem) => void
  onOpenDispatchModal: (request?: StaffRequestItem | null) => void
}

export default function StaffTransportContent({
  today,
  activeTransportTab,
  requestListView,
  requestCounts,
  visibleAllRequests,
  dispatchRequests,
  approvalRequests,
  onChangeTransportTab,
  onChangeRequestListView,
  onOpenCreate,
  onOpenDetails,
  onOpenRemarks,
  onOpenCalendar,
  onAcceptRequest,
  onRejectRequest,
  onOpenDispatchModal,
}: StaffTransportContentProps) {
  return (
    <>
      <section className={styles.transportPanel}>
        <div className={styles.transportHeader}>
          <div>
            <div className={styles.pageDate}>{today}</div>
            <h2 className={styles.pageTitle}>Requests Overview</h2>
          </div>

          <div className={styles.transportHeaderActions}>
            <label className={styles.transportSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                value=""
                readOnly
                aria-label="Search requests"
                placeholder="Search request no., driver, destination"
              />
            </label>
            <button type="button" className={styles.createRequestButton} onClick={onOpenCreate}>
              + Create Request
            </button>
            <button type="button" className={styles.calendarButton} onClick={onOpenCalendar}>
              Vehicle Calendar
            </button>
          </div>
        </div>

        <div className={styles.transportTabs}>
          <button
            type="button"
            className={[
              styles.transportTab,
              activeTransportTab === 'all' ? styles.transportTabActive : '',
            ].join(' ')}
            onClick={() => onChangeTransportTab('all')}
          >
            All Request
          </button>
          <button
            type="button"
            className={[
              styles.transportTab,
              activeTransportTab === 'dispatch' ? styles.transportTabActive : '',
            ].join(' ')}
            onClick={() => onChangeTransportTab('dispatch')}
          >
            For Dispatch
          </button>
          <button
            type="button"
            className={[
              styles.transportTab,
              activeTransportTab === 'approval' ? styles.transportTabActive : '',
            ].join(' ')}
            onClick={() => onChangeTransportTab('approval')}
          >
            For Approval
          </button>
        </div>

        {activeTransportTab === 'all' ? (
          <div className={styles.transportSummaryRow}>
            <SegmentedControl
              className={styles.transportViewToggle}
              options={[
                { label: 'ACTIVE REQUESTS', value: 'active' },
                { label: 'PAST REQUESTS', value: 'past' },
              ]}
              value={requestListView}
              onChange={onChangeRequestListView}
            />

            <div className={styles.transportStats}>
              <article className={[styles.transportStatCard, styles.transportStatNeutral].join(' ')}>
                <span className={styles.transportStatLabel}>Total</span>
                <strong className={styles.transportStatValue}>{requestCounts.total}</strong>
              </article>
              <article className={[styles.transportStatCard, styles.transportStatApproved].join(' ')}>
                <span className={styles.transportStatLabel}>Approved</span>
                <strong className={styles.transportStatValue}>{requestCounts.approved}</strong>
              </article>
              <article className={[styles.transportStatCard, styles.transportStatOngoing].join(' ')}>
                <span className={styles.transportStatLabel}>Ongoing</span>
                <strong className={styles.transportStatValue}>{requestCounts.ongoing}</strong>
              </article>
              <article className={[styles.transportStatCard, styles.transportStatCompleted].join(' ')}>
                <span className={styles.transportStatLabel}>Completed</span>
                <strong className={styles.transportStatValue}>{requestCounts.completed}</strong>
              </article>
              <article className={[styles.transportStatCard, styles.transportStatProcessing].join(' ')}>
                <span className={styles.transportStatLabel}>Processing</span>
                <strong className={styles.transportStatValue}>{requestCounts.processing}</strong>
              </article>
              <article className={[styles.transportStatCard, styles.transportStatDenied].join(' ')}>
                <span className={styles.transportStatLabel}>Denied</span>
                <strong className={styles.transportStatValue}>{requestCounts.denied}</strong>
              </article>
            </div>
          </div>
        ) : activeTransportTab === 'dispatch' ? (
          <div className={styles.transportDispatchHeader}>
            <button
              type="button"
              className={styles.newDispatchButton}
              onClick={() => onOpenDispatchModal(null)}
            >
              + New Dispatch
            </button>
          </div>
        ) : (
          <div className={styles.transportPlaceholderRow} />
        )}
      </section>

      {activeTransportTab === 'all' ? (
        <section className={styles.transportRequestList}>
          {visibleAllRequests.length > 0 ? (
            visibleAllRequests.map((request) => (
              <article key={`${request.id}-${request.status}`} className={styles.transportRequestCard}>
                <div className={styles.transportRequestTopRow}>
                  <div className={styles.transportRequestMeta}>
                    <span className={styles.transportRequestId}>{request.id}</span>
                    <span className={styles.transportRequestTag}>{request.requestType}</span>
                    {request.createdByStaffName ? (
                      <span className={styles.transportRequestCreator}>
                        Created by {request.createdByStaffName}
                      </span>
                    ) : null}
                    <span className={styles.transportRequestDate}>Requested: {request.requestedOn}</span>
                  </div>
                  <span
                    className={[
                      styles.transportStatusBadge,
                      request.status === 'Approved'
                        ? styles.transportStatusApproved
                        : request.status === 'Ongoing'
                          ? styles.transportStatusOngoing
                          : request.status === 'Completed'
                            ? styles.transportStatusCompleted
                            : request.status === 'Denied'
                              ? styles.transportStatusDenied
                              : styles.transportStatusProcessing,
                    ].join(' ')}
                  >
                    {request.status.toUpperCase()}
                  </span>
                </div>

                <div className={styles.transportRequestGrid}>
                  <div className={styles.transportInfoCard}>
                    <div className={styles.transportInfoLabel}>Driver</div>
                    <div className={styles.transportInfoValue}>{request.requester}</div>
                    <div className={styles.transportInfoSubvalue}>{request.requesterPhone}</div>
                  </div>
                  <div className={styles.transportInfoCard}>
                    <div className={styles.transportInfoLabel}>Vehicle</div>
                    <div className={styles.transportInfoValue}>{request.vehicle}</div>
                  </div>
                  <div className={styles.transportInfoCard}>
                    <div className={styles.transportInfoLabel}>Destination</div>
                    <div className={styles.transportInfoValue}>{request.destination}</div>
                  </div>
                  <div className={styles.transportInfoCard}>
                    <div className={styles.transportInfoLabel}>Dates and Time Needed</div>
                    <div className={styles.transportInfoValue}>{request.neededAt}</div>
                  </div>
                </div>

                <div className={styles.transportRequestFooter}>
                  <div className={styles.transportActions}>
                    <button type="button" className={styles.transportActionEdit}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className={[
                        styles.transportActionAccept,
                        request.status !== 'Processing' ? styles.transportActionDisabled : '',
                      ].join(' ')}
                      onClick={() => onAcceptRequest(request)}
                      disabled={request.status !== 'Processing'}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className={[
                        styles.transportActionReject,
                        request.status !== 'Processing' ? styles.transportActionDisabled : '',
                      ].join(' ')}
                      onClick={() => onRejectRequest(request)}
                      disabled={request.status !== 'Processing'}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className={styles.transportActionEdit}
                      onClick={() => onOpenRemarks(request)}
                    >
                      Remarks
                    </button>
                    <button
                      type="button"
                      className={styles.transportActionDetails}
                      onClick={() => onOpenDetails(request)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.transportEmptyState}>No requests available in this section.</div>
          )}
        </section>
      ) : activeTransportTab === 'dispatch' ? (
        <section className={styles.dispatchPanel}>
          <div className={styles.dispatchPanelTitle}>Pending Transport Request</div>
          <div className={styles.dispatchTable}>
            <div className={styles.dispatchTableHeader}>
              <span>DRN</span>
              <span>Requester</span>
              <span>Destination</span>
              <span>Date Range</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {dispatchRequests.length > 0 ? (
              dispatchRequests.map((request) => (
                <div key={`${request.id}-dispatch`} className={styles.dispatchTableRow}>
                  <span>{request.id}</span>
                  <span>{request.requester}</span>
                  <span>{request.destination}</span>
                  <span>{formatDateRange(request.dateFrom, request.dateTo)}</span>
                  <span className={styles.dispatchStatusChip}>For Dispatch</span>
                  <span className={styles.dispatchActionGroup}>
                    <button
                      type="button"
                      className={styles.dispatchApproveButton}
                      onClick={() => onOpenDispatchModal(request)}
                    >
                      Dispatch
                    </button>
                    <button type="button" className={styles.dispatchRejectButton}>
                      Reject
                    </button>
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.dispatchEmptyState}>
                No pending transport requests for dispatch.
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className={styles.dispatchPanel}>
          <div className={styles.dispatchPanelTitle}>Requests For Approval</div>
          {approvalRequests.length > 0 ? (
            <div className={styles.dispatchTable}>
              <div className={styles.dispatchTableHeader}>
                <span>DRN</span>
                <span>Driver</span>
                <span>Vehicle Type</span>
                <span>Plate No.</span>
                <span>Status</span>
                <span>Contact</span>
              </div>
              {approvalRequests.map((request) => (
                <div key={`${request.drn}-approval`} className={styles.dispatchTableRow}>
                  <span>{request.drn}</span>
                  <span>{request.assignedDriverName}</span>
                  <span>{request.vehicleType}</span>
                  <span>{request.vehiclePlateNumber}</span>
                  <span className={styles.approvalStatusChip}>{request.status}</span>
                  <span>{request.assignedDriverContact}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.dispatchEmptyState}>
              No dispatch requests are waiting for approval.
            </div>
          )}
        </section>
      )}
    </>
  )
}

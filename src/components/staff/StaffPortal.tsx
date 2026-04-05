import { type ReactNode, useMemo, useState } from 'react'
import heroLogo from '../../../assets/hero-logo.png'
import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'
import { staffPortalStyles } from '../../styles/pages/staffPortalStyles'

type StaffPortalProps = {
  onLogout: () => void
}

type StaffSection = {
  title: string
  items: Array<{
    label: string
    icon: ReactNode
  }>
}

const staffSections: StaffSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        label: 'Dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="2" />
            <rect x="13" y="3" width="8" height="5" rx="2" />
            <rect x="13" y="10" width="8" height="11" rx="2" />
            <rect x="3" y="13" width="8" height="8" rx="2" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'TRANSPORT',
    items: [
      {
        label: 'Transport Request',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3h7l5 5v13H7z" />
            <path d="M14 3v5h5" />
          </svg>
        ),
      },
      {
        label: 'Trip Management',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5v14" />
            <path d="M16 5v14" />
            <path d="M5 9h14" />
            <path d="M5 15h14" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'VEHICLE',
    items: [
      {
        label: 'Vehicles & Registration',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16l1.5-5h11L19 16" />
            <path d="M7 16h10" />
            <circle cx="8" cy="17" r="1.5" />
            <circle cx="16" cy="17" r="1.5" />
          </svg>
        ),
      },
      {
        label: 'Maintenance',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 7 3-3 3 3-3 3" />
            <path d="M4 20l8-8" />
            <path d="m10 6 8 8" />
          </svg>
        ),
      },
      {
        label: 'Fuel Management',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
            <path d="M15 10h2l2 2v5a1 1 0 0 1-1 1h-1" />
            <path d="M9 8h4" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        label: 'Users',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9.5" cy="7" r="3" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 4.13a3 3 0 0 1 0 5.74" />
          </svg>
        ),
      },
      {
        label: 'Document',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6" />
            <path d="M9 17h4" />
          </svg>
        ),
      },
    ],
  },
]

export default function StaffPortal({ onLogout }: StaffPortalProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Dashboard')

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long',
      }).format(new Date('2026-04-04T00:00:00')),
    [],
  )

  return (
    <div className={staffPortalStyles.shell}>
      <header className={requesterPortalStyles.header}>
        <div className={requesterPortalStyles.headerOverlay} />
        <div className={requesterPortalStyles.headerInner}>
          <div className={requesterPortalStyles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={requesterPortalStyles.heroLogo} />
            <div>
              <h1 className={requesterPortalStyles.portalTitle}>FLEET MANAGEMENT SYSTEM</h1>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={requesterPortalStyles.userMenuButton}
            >
              <div className={requesterPortalStyles.userAvatar}>
                <span className={requesterPortalStyles.userAvatarInitials}>JD</span>
              </div>
              <div>
                <div className={requesterPortalStyles.userName}>Juan Dela Cruz</div>
                <div className={requesterPortalStyles.userOffice}>Officer Administrator</div>
              </div>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`${requesterPortalStyles.caret} ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isMenuOpen ? (
              <div className={requesterPortalStyles.menuPanel}>
                <button type="button" onClick={onLogout} className={requesterPortalStyles.menuItemDanger}>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className={staffPortalStyles.layout}>
        <aside
          className={`${staffPortalStyles.sidebar} ${
            isSidebarCollapsed ? staffPortalStyles.sidebarCollapsed : ''
          }`}
        >
          <button
            type="button"
            className={staffPortalStyles.sidebarToggle}
            onClick={() => setIsSidebarCollapsed((current) => !current)}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${staffPortalStyles.sidebarToggleIcon} ${
                isSidebarCollapsed ? staffPortalStyles.sidebarToggleIconCollapsed : ''
              }`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={staffPortalStyles.sidebarSections}>
            {staffSections.map((section) => (
              <div key={section.title} className={staffPortalStyles.sidebarSection}>
                <div
                  className={`${staffPortalStyles.sidebarSectionTitle} ${
                    isSidebarCollapsed ? staffPortalStyles.sidebarSectionTitleHidden : ''
                  }`}
                >
                  {section.title}
                </div>

                <div className={staffPortalStyles.sidebarItems}>
                  {section.items.map((item) => {
                    const isActive = activeItem === item.label

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={`${staffPortalStyles.sidebarItem} ${
                          isActive ? staffPortalStyles.sidebarItemActive : ''
                        } ${isSidebarCollapsed ? 'justify-center px-0 py-2.5' : ''}`}
                        onClick={() => setActiveItem(item.label)}
                      >
                        <span
                          className={`${staffPortalStyles.sidebarItemIcon} ${
                            isSidebarCollapsed && isActive
                              ? 'h-8 w-8 rounded-[10px] bg-white text-slate-900 [&>svg]:h-4 [&>svg]:w-4'
                              : ''
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`${staffPortalStyles.sidebarItemLabel} ${
                            isSidebarCollapsed ? staffPortalStyles.sidebarItemLabelHidden : ''
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`${staffPortalStyles.rolePreviewCard} ${
              isSidebarCollapsed ? staffPortalStyles.rolePreviewCardCollapsed : ''
            }`}
          >
            <div className={staffPortalStyles.rolePreviewTitle}>ROLE PREVIEW</div>
            <div
              className={`${staffPortalStyles.rolePreviewText} ${
                isSidebarCollapsed ? staffPortalStyles.rolePreviewTextHidden : ''
              }`}
            >
              Switch roles to preview visibility for each module in the system.
            </div>
            <button
              type="button"
              className={`${staffPortalStyles.rolePreviewButton} ${
                isSidebarCollapsed ? staffPortalStyles.rolePreviewButtonCollapsed : ''
              }`}
            >
              <span
                className={`${staffPortalStyles.rolePreviewButtonText} ${
                  isSidebarCollapsed ? staffPortalStyles.rolePreviewTextHidden : ''
                }`}
              >
                Officer Administrator
              </span>
            </button>
          </div>

          <div
            className={`${staffPortalStyles.sidebarFooter} ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className={staffPortalStyles.sidebarFooterAvatar} />
            <div
              className={`${staffPortalStyles.sidebarFooterText} ${
                isSidebarCollapsed ? staffPortalStyles.sidebarFooterTextHidden : ''
              }`}
            >
              <div className={staffPortalStyles.sidebarFooterName}>Juan Dela Cruz</div>
              <div className={staffPortalStyles.sidebarFooterRole}>OFFICER ADMINISTRATOR</div>
            </div>
          </div>
        </aside>

        <main className={staffPortalStyles.main}>
          <div className={staffPortalStyles.pageTitleRow}>
            <div>
              <div className={staffPortalStyles.pageDate}>{today}</div>
              <h2 className={staffPortalStyles.pageTitle}>{activeItem}</h2>
            </div>
          </div>

          <section className={staffPortalStyles.contentCard}>
            <div className={staffPortalStyles.contentTitle}>Dashboard</div>
            <div className={staffPortalStyles.contentText}>
              This is the staff workspace. The left navigation is foldable and grouped by Overview,
              Transport, Vehicle, and System so the staff side can grow into multiple modules.
            </div>
          </section>

          <section className={staffPortalStyles.metricsGrid}>
            <div className={staffPortalStyles.metricCard}>
              <div className={staffPortalStyles.metricLabel}>Pending Requests</div>
              <div className={staffPortalStyles.metricValue}>08</div>
            </div>
            <div className={staffPortalStyles.metricCard}>
              <div className={staffPortalStyles.metricLabel}>Active Trips</div>
              <div className={staffPortalStyles.metricValue}>14</div>
            </div>
            <div className={staffPortalStyles.metricCard}>
              <div className={staffPortalStyles.metricLabel}>Fleet Registered</div>
              <div className={staffPortalStyles.metricValue}>32</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

import { type ReactNode, useMemo, useState } from 'react'
import heroLogo from '../../../assets/hero-logo.png'
import styles from '../../styles/modules/staff/StaffPortal.module.css'

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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
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
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={styles.heroLogo} />
            <div>
              <h1 className={styles.portalTitle}>FLEET MANAGEMENT SYSTEM</h1>
            </div>
          </div>

          <div className={styles.menuRoot}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={styles.userMenuButton}
            >
              <div className={styles.userAvatar}>
                <span className={styles.userAvatarInitials}>JD</span>
              </div>
              <div>
                <div className={styles.userName}>Juan Dela Cruz</div>
                <div className={styles.userOffice}>Officer Administrator</div>
              </div>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={[styles.caret, isMenuOpen ? styles.caretOpen : ''].join(' ')}
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
              <div className={styles.menuPanel}>
                <button type="button" onClick={onLogout} className={styles.menuItemDanger}>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside
          className={[styles.sidebar, isSidebarHovered ? styles.sidebarExpanded : styles.sidebarCollapsed].join(' ')}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <div className={styles.sidebarGlow} aria-hidden="true" />

          <div className={styles.sidebarSections}>
            {staffSections.map((section) => (
              <div key={section.title} className={styles.sidebarSection}>
                <div
                  className={[
                    styles.sidebarSectionTitle,
                    isSidebarHovered ? styles.sidebarSectionTitleVisible : styles.sidebarSectionTitleHidden,
                  ].join(' ')}
                >
                  {section.title}
                </div>

                <div className={styles.sidebarItems}>
                  {section.items.map((item) => {
                    const isActive = activeItem === item.label

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={[
                          styles.sidebarItem,
                          isActive ? styles.sidebarItemActive : '',
                          isSidebarHovered ? styles.sidebarItemExpanded : styles.sidebarItemCollapsed,
                        ].join(' ')}
                        onClick={() => setActiveItem(item.label)}
                      >
                        <span
                          className={[
                            styles.sidebarItemIcon,
                            !isSidebarHovered && isActive ? styles.sidebarItemIconCollapsedActive : '',
                          ].join(' ')}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={[
                            styles.sidebarItemLabel,
                            isSidebarHovered ? styles.sidebarItemLabelVisible : styles.sidebarItemLabelHidden,
                          ].join(' ')}
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
            className={[
              styles.rolePreviewCard,
              isSidebarHovered ? styles.rolePreviewVisible : styles.rolePreviewHidden,
            ].join(' ')}
          >
            <div className={styles.rolePreviewTitle}>ROLE PREVIEW</div>
            <div className={styles.rolePreviewText}>
              Switch roles to preview visibility for each module in the system.
            </div>
            <button type="button" className={styles.rolePreviewButton}>
              <span className={styles.rolePreviewButtonText}>Officer Administrator</span>
            </button>
          </div>

          <div
            className={[
              styles.sidebarFooter,
              isSidebarHovered ? styles.sidebarFooterExpanded : styles.sidebarFooterCollapsed,
            ].join(' ')}
          >
            <div className={styles.sidebarFooterAvatar} />
            <div
              className={[
                styles.sidebarFooterText,
                isSidebarHovered ? styles.sidebarFooterTextVisible : styles.sidebarFooterTextHidden,
              ].join(' ')}
            >
              <div className={styles.sidebarFooterName}>Juan Dela Cruz</div>
              <div className={styles.sidebarFooterRole}>OFFICER ADMINISTRATOR</div>
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.pageTitleRow}>
            <div>
              <div className={styles.pageDate}>{today}</div>
              <h2 className={styles.pageTitle}>{activeItem}</h2>
            </div>
          </div>

          <section className={styles.contentCard}>
            <div className={styles.contentTitle}>Dashboard</div>
            <div className={styles.contentText}>
              This is the staff workspace. The left navigation expands on hover and keeps the
              operational modules within easy reach while preserving space for the main dashboard.
            </div>
          </section>

          <section className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Pending Requests</div>
              <div className={styles.metricValue}>08</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Active Trips</div>
              <div className={styles.metricValue}>14</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Fleet Registered</div>
              <div className={styles.metricValue}>32</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

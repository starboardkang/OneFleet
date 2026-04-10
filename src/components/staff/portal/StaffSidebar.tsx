import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { StaffSection } from './types'

type StaffSidebarProps = {
  isSidebarOpen: boolean
  activeItem: string
  sections: StaffSection[]
  onToggleSidebar: () => void
  onSelectItem: (item: string) => void
}

export default function StaffSidebar({
  isSidebarOpen,
  activeItem,
  sections,
  onToggleSidebar,
  onSelectItem,
}: StaffSidebarProps) {
  return (
    <aside
      className={[
        styles.sidebar,
        isSidebarOpen ? styles.sidebarExpanded : styles.sidebarCollapsed,
      ].join(' ')}
    >
      <div className={styles.sidebarGlow} aria-hidden="true" />
      <div
        className={[
          styles.sidebarToggleRow,
          isSidebarOpen ? styles.sidebarToggleRowOpen : styles.sidebarToggleRowClosed,
        ].join(' ')}
      >
        <button
          type="button"
          className={styles.sidebarToggle}
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={isSidebarOpen}
        >
          <span
            className={[
              styles.sidebarToggleChevron,
              isSidebarOpen ? styles.sidebarToggleChevronOpen : '',
            ].join(' ')}
          >
            {'>'}
          </span>
        </button>
      </div>

      <div className={styles.sidebarSections}>
        {sections.map((section) => (
          <div key={section.title} className={styles.sidebarSection}>
            <div
              className={[
                styles.sidebarSectionTitle,
                isSidebarOpen
                  ? styles.sidebarSectionTitleVisible
                  : styles.sidebarSectionTitleHidden,
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
                      isSidebarOpen
                        ? styles.sidebarItemExpanded
                        : styles.sidebarItemCollapsed,
                    ].join(' ')}
                    onClick={() => onSelectItem(item.label)}
                  >
                    <span className={styles.sidebarItemIcon}>{item.icon}</span>
                    <span
                      className={[
                        styles.sidebarItemLabel,
                        isSidebarOpen
                          ? styles.sidebarItemLabelVisible
                          : styles.sidebarItemLabelHidden,
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
    </aside>
  )
}

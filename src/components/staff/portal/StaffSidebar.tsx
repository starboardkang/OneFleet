import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { StaffSection } from './types'

type StaffSidebarProps = {
  isSidebarHovered: boolean
  activeItem: string
  sections: StaffSection[]
  onMouseEnter: () => void
  onMouseLeave: () => void
  onSelectItem: (item: string) => void
}

export default function StaffSidebar({
  isSidebarHovered,
  activeItem,
  sections,
  onMouseEnter,
  onMouseLeave,
  onSelectItem,
}: StaffSidebarProps) {
  return (
    <aside
      className={[
        styles.sidebar,
        isSidebarHovered ? styles.sidebarExpanded : styles.sidebarCollapsed,
      ].join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.sidebarGlow} aria-hidden="true" />

      <div className={styles.sidebarSections}>
        {sections.map((section) => (
          <div key={section.title} className={styles.sidebarSection}>
            <div
              className={[
                styles.sidebarSectionTitle,
                isSidebarHovered
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
                      isSidebarHovered
                        ? styles.sidebarItemExpanded
                        : styles.sidebarItemCollapsed,
                    ].join(' ')}
                    onClick={() => onSelectItem(item.label)}
                  >
                    <span className={styles.sidebarItemIcon}>{item.icon}</span>
                    <span
                      className={[
                        styles.sidebarItemLabel,
                        isSidebarHovered
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

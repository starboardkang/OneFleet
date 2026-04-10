import heroLogo from '../../../../assets/hero-logo.png'
import styles from '../../../styles/modules/staff/portal/StaffPortal.module.css'
import type { Profile } from '../../global/profile/types'

type StaffHeaderProps = {
  profile: Profile
  avatarUrl: string | null
  userInitials: string
  isMenuOpen: boolean
  isRoleMenuOpen: boolean
  activeRole: string
  roleOptions: readonly string[]
  onToggleMenu: () => void
  onToggleRoleMenu: () => void
  onSelectRole: (role: string) => void
  onOpenProfile: () => void
  onLogout: () => void
}

export default function StaffHeader({
  profile,
  avatarUrl,
  userInitials,
  isMenuOpen,
  isRoleMenuOpen,
  activeRole,
  roleOptions,
  onToggleMenu,
  onToggleRoleMenu,
  onSelectRole,
  onOpenProfile,
  onLogout,
}: StaffHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerOverlay} />
      <div className={styles.headerInner}>
        <div className={styles.brandGroup}>
          <img src={heroLogo} alt="Hero logo" className={styles.heroLogo} />
          <div>
            <h1 className={styles.portalTitle}>DRIVER AND VEHICLE REQUISITION PORTAL</h1>
          </div>
        </div>

        <div className={styles.menuRoot}>
          <button type="button" onClick={onToggleMenu} className={styles.userMenuButton}>
            <div className={styles.userAvatar}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={profile.fullName} className={styles.userAvatarImage} />
              ) : (
                <span className={styles.userAvatarInitials}>{userInitials}</span>
              )}
            </div>
            <div>
              <div className={styles.userName}>{profile.fullName}</div>
              <div className={styles.userOffice}>{profile.office}</div>
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
              <div className={styles.roleMenuRoot}>
                <button type="button" onClick={onToggleRoleMenu} className={styles.roleMenuTrigger}>
                  <span>Role Preview</span>
                  <span className={styles.roleMenuTriggerValue}>{activeRole}</span>
                </button>

                {isRoleMenuOpen ? (
                  <div className={styles.roleMenuList}>
                    <div className={styles.roleMenuTitle}>Role Preview</div>
                    <div className={styles.roleMenuText}>
                      Switch roles to preview visibility for each module in the system.
                    </div>
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => onSelectRole(role)}
                        className={[
                          styles.roleMenuItem,
                          activeRole === role ? styles.roleMenuItemActive : '',
                        ].join(' ')}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <button type="button" onClick={onOpenProfile} className={styles.menuItem}>
                Profile
              </button>
              <button type="button" onClick={onLogout} className={styles.menuItemDanger}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

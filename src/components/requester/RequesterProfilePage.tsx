import heroLogo from '../../../assets/hero-logo.png'
import styles from './RequesterProfilePage.module.css'

type RequesterProfilePageProps = {
  onBack: () => void
  onLogout: () => void
}

const profile = {
  fullName: 'Vico Sotto',
  role: 'Requester',
  office: 'Office of the Mayor',
  email: 'requester@onefleet.local',
  contactNumber: '+63 912 345 6789',
  employeeId: 'REQ-2026-001',
  address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
}

export function RequesterProfilePage({ onBack, onLogout }: RequesterProfilePageProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={styles.heroLogo} />
            <div>
              <h1 className={styles.portalTitle}>
                DRIVER AND VEHICLE REQUISITION PORTAL
              </h1>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button type="button" onClick={onBack} className={styles.headerButton}>
              DASHBOARD
            </button>
            <button type="button" onClick={onLogout} className={styles.headerButton}>
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.panel}>
          <div className={styles.profileHeader}>
            <div>
              <div className={styles.profileEyebrow}>Requester Profile</div>
              <h2 className={styles.profileName}>{profile.fullName}</h2>
              <div className={styles.profileMeta}>
                {profile.role} - {profile.office}
              </div>
            </div>
            <div className={styles.initialsBadge}>VS</div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Full Name</div>
              <div className={styles.infoValue}>{profile.fullName}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Role</div>
              <div className={styles.infoValue}>{profile.role}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Office</div>
              <div className={styles.infoValue}>{profile.office}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Employee ID</div>
              <div className={styles.infoValue}>{profile.employeeId}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>{profile.email}</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Contact Number</div>
              <div className={styles.infoValue}>{profile.contactNumber}</div>
            </div>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.sectionTitle}>Office Details</div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Office Address</div>
            <div className={styles.infoValue}>{profile.address}</div>
          </div>
        </section>
      </main>
    </div>
  )
}
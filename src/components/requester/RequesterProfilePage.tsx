import heroLogo from '../../../assets/hero-logo.png'
import { requesterProfileStyles } from '../../styles/pages/requesterProfileStyles'

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
    <div className={requesterProfileStyles.shell}>
      <header className={requesterProfileStyles.header}>
        <div className={requesterProfileStyles.headerOverlay} />
        <div className={requesterProfileStyles.headerInner}>
          <div className={requesterProfileStyles.brandGroup}>
            <img src={heroLogo} alt="Hero logo" className={requesterProfileStyles.heroLogo} />
            <div>
              <h1 className={requesterProfileStyles.portalTitle}>
                DRIVER AND VEHICLE REQUISITION PORTAL
              </h1>
            </div>
          </div>

          <div className={requesterProfileStyles.headerActions}>
            <button
              type="button"
              onClick={onBack}
              className={requesterProfileStyles.headerButton}
            >
              DASHBOARD
            </button>
            <button
              type="button"
              onClick={onLogout}
              className={requesterProfileStyles.headerButton}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className={requesterProfileStyles.main}>
        <section className={requesterProfileStyles.panel}>
          <div className={requesterProfileStyles.profileHeader}>
            <div>
              <div className={requesterProfileStyles.profileEyebrow}>
                Requester Profile
              </div>
              <h2 className={requesterProfileStyles.profileName}>{profile.fullName}</h2>
              <div className={requesterProfileStyles.profileMeta}>
                {profile.role} - {profile.office}
              </div>
            </div>
            <div className={requesterProfileStyles.initialsBadge}>
              VS
            </div>
          </div>

          <div className={requesterProfileStyles.infoGrid}>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Full Name</div>
              <div className={requesterProfileStyles.infoValue}>{profile.fullName}</div>
            </div>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Role</div>
              <div className={requesterProfileStyles.infoValue}>{profile.role}</div>
            </div>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Office</div>
              <div className={requesterProfileStyles.infoValue}>{profile.office}</div>
            </div>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Employee ID</div>
              <div className={requesterProfileStyles.infoValue}>{profile.employeeId}</div>
            </div>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Email</div>
              <div className={requesterProfileStyles.infoValue}>{profile.email}</div>
            </div>
            <div className={requesterProfileStyles.infoCard}>
              <div className={requesterProfileStyles.infoLabel}>Contact Number</div>
              <div className={requesterProfileStyles.infoValue}>{profile.contactNumber}</div>
            </div>
          </div>
        </section>

        <section className={requesterProfileStyles.panel}>
          <div className={requesterProfileStyles.sectionTitle}>Office Details</div>
          <div className={requesterProfileStyles.infoCard}>
            <div className={requesterProfileStyles.infoLabel}>Office Address</div>
            <div className={requesterProfileStyles.infoValue}>{profile.address}</div>
          </div>
        </section>
      </main>
    </div>
  )
}

import styles from '../../../styles/modules/global/auth/PortalSwitch.module.css'

type Portal = 'requester' | 'staff'

type PortalSwitchProps = {
  activePortal: Portal
  onSwitch: (portal: Portal) => void
  className?: string
}

const portalOptions: Portal[] = ['requester', 'staff']

export function PortalSwitch({ activePortal, onSwitch, className = '' }: PortalSwitchProps) {
  const activeIndex = portalOptions.indexOf(activePortal)

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <div
        className={[styles.thumb, activeIndex === 0 ? styles.thumbRequester : styles.thumbStaff].join(' ')}
      />

      {portalOptions.map((portal) => {
        const isActive = activePortal === portal

        return (
          <button
            key={portal}
            type="button"
            onClick={() => onSwitch(portal)}
            className={[styles.option, isActive ? styles.optionActive : styles.optionInactive].join(' ')}
          >
            {portal === 'requester' ? 'Requester' : 'Staff'}
          </button>
        )
      })}
    </div>
  )
}

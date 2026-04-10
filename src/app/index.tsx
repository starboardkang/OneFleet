import { useState } from 'react'
import { LoginPortal } from '../components/global/auth/LoginPortal'
import RequesterPortalRoute from './requester-portal'
import StaffPortalRoute from './staff-portal'

type Portal = 'requester' | 'staff'

export default function IndexRoute() {
  const [activePortal, setActivePortal] = useState<Portal>('requester')
  const [isRequesterLoggedIn, setIsRequesterLoggedIn] = useState(false)
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false)

  const handleSwitch = (portal: Portal) => {
    setActivePortal(portal)
  }

  if (activePortal === 'requester' && isRequesterLoggedIn) {
    return <RequesterPortalRoute onLogout={() => setIsRequesterLoggedIn(false)} />
  }

  if (activePortal === 'staff' && isStaffLoggedIn) {
    return <StaffPortalRoute onLogout={() => setIsStaffLoggedIn(false)} />
  }

  const portalConfig =
    activePortal === 'staff'
      ? {
          portalLabel: 'Staff',
          title: 'FLEET MANAGEMENT SYSTEM',
          credentials: {
            email: 'staff@onefleet.local',
            password: 'Staff123!',
          },
          onSuccess: () => setIsStaffLoggedIn(true),
        }
      : {
          portalLabel: 'Requester',
          title: 'DRIVER AND VEHICLE REQUISITION PORTAL',
          credentials: {
            email: 'requester@onefleet.local',
            password: 'Requester123!',
          },
          onSuccess: () => setIsRequesterLoggedIn(true),
        }

  return (
    <LoginPortal
      activePortal={activePortal}
      onSwitch={handleSwitch}
      portalLabel={portalConfig.portalLabel}
      title={portalConfig.title}
      credentials={portalConfig.credentials}
      onSuccess={portalConfig.onSuccess}
    />
  )
}

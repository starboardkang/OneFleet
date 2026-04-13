import { useState } from 'react'
import ClientRoute from './client'
import RequesterPortalRoute from './requester-portal'
import StaffRoute from './staff'
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

  return activePortal === 'staff' ? (
    <StaffRoute onSwitch={handleSwitch} onSuccess={() => setIsStaffLoggedIn(true)} />
  ) : (
    <ClientRoute onSwitch={handleSwitch} onSuccess={() => setIsRequesterLoggedIn(true)} />
  )
}

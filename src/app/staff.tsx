import { LoginPortal } from '../components/global/auth/LoginPortal'

type StaffRouteProps = {
  onSwitch: (portal: 'requester' | 'staff') => void
  onSuccess: () => void
}

export default function StaffRoute({ onSwitch, onSuccess }: StaffRouteProps) {
  return (
    <LoginPortal
      activePortal="staff"
      onSwitch={onSwitch}
      portalLabel="Staff"
      title="FLEET MANAGEMENT SYSTEM"
      credentials={{
        email: 'staff@onefleet.local',
        password: 'Staff123!',
      }}
      onSuccess={onSuccess}
    />
  )
}

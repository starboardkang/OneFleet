import { LoginPortal } from '../components/auth/LoginPortal'

type ClientRouteProps = {
  onSwitch: (portal: 'requester' | 'staff') => void
  onSuccess: () => void
}

export default function ClientRoute({ onSwitch, onSuccess }: ClientRouteProps) {
  return (
    <LoginPortal
      activePortal="requester"
      onSwitch={onSwitch}
      portalLabel="Requester"
      title="DRIVER AND VEHICLE REQUISITION PORTAL"
      credentials={{
        email: 'requester@onefleet.local',
        password: 'Requester123!',
      }}
      onSuccess={onSuccess}
    />
  )
}

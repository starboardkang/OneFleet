import StaffPortal from '../components/staff/StaffPortal'

type StaffPortalRouteProps = {
  onLogout: () => void
}

export default function StaffPortalRoute({ onLogout }: StaffPortalRouteProps) {
  return <StaffPortal onLogout={onLogout} />
}

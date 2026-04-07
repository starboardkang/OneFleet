import { useState } from 'react'
import StaffPortal from '../components/staff/StaffPortal'
import { type RequesterProfile } from '../components/requester/RequesterProfileModal'

type StaffPortalRouteProps = {
  onLogout: () => void
}

export default function StaffPortalRoute({ onLogout }: StaffPortalRouteProps) {
  const [profile, setProfile] = useState<RequesterProfile>({
    fullName: 'Juan Dela Cruz',
    office: 'Officer Administrator',
    email: 'staff@onefleet.local',
    contactNumber: '+63 917 123 4567',
    employeeId: 'STF-2026-001',
    address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
  })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  return (
    <StaffPortal
      onLogout={onLogout}
      profile={profile}
      avatarUrl={avatarUrl}
      onSaveProfile={(nextProfile, nextAvatarUrl) => {
        setProfile(nextProfile)
        setAvatarUrl(nextAvatarUrl)
      }}
    />
  )
}

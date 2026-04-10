import { useState } from 'react'
import StaffPortalScreen from '../components/staff/portal/StaffPortalScreen'
import { type Profile } from '../components/global/profile/types'

type StaffPortalRouteProps = {
  onLogout: () => void
}

export default function StaffPortalRoute({ onLogout }: StaffPortalRouteProps) {
  const [profile, setProfile] = useState<Profile>({
    fullName: 'Juan Dela Cruz',
    office: 'Officer Administrator',
    email: 'staff@onefleet.local',
    contactNumber: '+63 917 123 4567',
    employeeId: 'STF-2026-001',
    address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
  })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  return (
    <StaffPortalScreen
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

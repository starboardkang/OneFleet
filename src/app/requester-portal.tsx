import { RequesterPortal } from '../components/requester/RequesterPortal'
import { useState } from 'react'
import { type RequesterProfile } from '../components/requester/RequesterProfileModal'

type RequesterPortalRouteProps = {
  onLogout: () => void
}

export default function RequesterPortalRoute({ onLogout }: RequesterPortalRouteProps) {
  const [profile, setProfile] = useState<RequesterProfile>({
    fullName: 'Vico Sotto',
    office: 'Office of the Mayor',
    email: 'requester@onefleet.local',
    contactNumber: '+63 912 345 6789',
    employeeId: 'REQ-2026-001',
    address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
  })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  return (
    <RequesterPortal
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

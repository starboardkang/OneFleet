import { useEffect, useRef, useState } from 'react'
import ModalCloseButton from '../common/ModalCloseButton'
import { requesterPortalStyles } from '../../styles/pages/requesterPortalStyles'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'

export type RequesterProfile = {
  fullName: string
  office: string
  email: string
  contactNumber: string
  employeeId: string
  address: string
}

type RequesterProfileModalProps = {
  profile: RequesterProfile
  avatarUrl: string | null
  onClose: () => void
  onSave: (nextProfile: RequesterProfile, nextAvatarUrl: string | null) => void
}

export default function RequesterProfileModal({
  profile,
  avatarUrl,
  onClose,
  onSave,
}: RequesterProfileModalProps) {
  useBodyScrollLock()

  const [draftProfile, setDraftProfile] = useState<RequesterProfile>(profile)
  const [draftAvatarUrl, setDraftAvatarUrl] = useState<string | null>(avatarUrl)
  const [validationMessage, setValidationMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDraftProfile(profile)
    setDraftAvatarUrl(avatarUrl)
    setValidationMessage('')
  }, [avatarUrl, profile])

  const handleFieldChange = (field: keyof RequesterProfile, value: string) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }))
    setValidationMessage('')
  }

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setDraftAvatarUrl(typeof reader.result === 'string' ? reader.result : null)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const hasEmptyField = Object.values(draftProfile).some((value) => value.trim().length === 0)

    if (hasEmptyField) {
      setValidationMessage('Please complete every profile field before saving.')
      return
    }

    onSave(draftProfile, draftAvatarUrl)
    onClose()
  }

  return (
    <div className={requesterPortalStyles.modalOverlay} onClick={onClose}>
      <div className={requesterPortalStyles.profileModal} onClick={(event) => event.stopPropagation()}>
        <div className={requesterPortalStyles.profileModalHeader}>
          <div>
            <div className={requesterPortalStyles.profileModalEyebrow}>Requester Profile</div>
            <h2 className={requesterPortalStyles.profileModalTitle}>Edit Profile</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close profile modal"
            className={requesterPortalStyles.modalCloseButton}
          />
        </div>

        <div className={requesterPortalStyles.profileModalBody}>
          <div className={requesterPortalStyles.profilePhotoColumn}>
            <div className={requesterPortalStyles.profileAvatarLarge}>
              {draftAvatarUrl ? (
                <img
                  src={draftAvatarUrl}
                  alt="Requester profile"
                  className={requesterPortalStyles.profileAvatarImage}
                />
              ) : (
                <span className={requesterPortalStyles.profileAvatarFallback}>
                  {draftProfile.fullName
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')
                    .toUpperCase() || 'VS'}
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            <button
              type="button"
              className={requesterPortalStyles.profilePhotoButton}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>

          <div className={requesterPortalStyles.profileFormGrid}>
            <input
              className={requesterPortalStyles.profileInput}
              value={draftProfile.fullName}
              onChange={(event) => handleFieldChange('fullName', event.target.value)}
              placeholder="Full Name"
            />
            <input
              className={requesterPortalStyles.profileInput}
              value={draftProfile.office}
              onChange={(event) => handleFieldChange('office', event.target.value)}
              placeholder="Office"
            />
            <input
              className={requesterPortalStyles.profileInput}
              value={draftProfile.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              placeholder="Email"
            />
            <input
              className={requesterPortalStyles.profileInput}
              value={draftProfile.contactNumber}
              onChange={(event) => handleFieldChange('contactNumber', event.target.value)}
              placeholder="Contact Number"
            />
            <input
              className={requesterPortalStyles.profileInput}
              value={draftProfile.employeeId}
              onChange={(event) => handleFieldChange('employeeId', event.target.value)}
              placeholder="Employee ID"
            />
            <textarea
              className={requesterPortalStyles.profileTextarea}
              value={draftProfile.address}
              onChange={(event) => handleFieldChange('address', event.target.value)}
              placeholder="Office Address"
            />
          </div>
        </div>

        {validationMessage ? (
          <div className={requesterPortalStyles.profileValidationMessage}>{validationMessage}</div>
        ) : null}

        <div className={requesterPortalStyles.profileModalActions}>
          <button
            type="button"
            className={requesterPortalStyles.profileSecondaryButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={requesterPortalStyles.profilePrimaryButton}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import ModalCloseButton from '../common/ModalCloseButton'
import styles from '../../../styles/modules/requester/portal/RequesterPortal.module.css'
import useBodyScrollLock from '../../../hooks/useBodyScrollLock'
import type { Profile } from './types'

type ProfileModalProps = {
  profile: Profile
  avatarUrl: string | null
  onClose: () => void
  onSave: (nextProfile: Profile, nextAvatarUrl: string | null) => void
  profileLabel?: string
}

export default function ProfileModal({
  profile,
  avatarUrl,
  onClose,
  onSave,
  profileLabel = 'Requester',
}: ProfileModalProps) {
  useBodyScrollLock()

  const [draftProfile, setDraftProfile] = useState<Profile>(profile)
  const [draftAvatarUrl, setDraftAvatarUrl] = useState<string | null>(avatarUrl)
  const [validationMessage, setValidationMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDraftProfile(profile)
    setDraftAvatarUrl(avatarUrl)
    setValidationMessage('')
  }, [avatarUrl, profile])

  const handleFieldChange = (field: keyof Profile, value: string) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }))
    setValidationMessage('')
  }

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.profileModal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.profileModalHeader}>
          <div>
            <div className={styles.profileModalEyebrow}>{profileLabel} Profile</div>
            <h2 className={styles.profileModalTitle}>Edit Profile</h2>
          </div>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Close profile modal"
            className={styles.modalCloseButton}
          />
        </div>

        <div className={styles.profileModalBody}>
          <div className={styles.profilePhotoColumn}>
            <div className={styles.profileAvatarLarge}>
              {draftAvatarUrl ? (
                <img
                  src={draftAvatarUrl}
                  alt={`${profileLabel} profile`}
                  className={styles.profileAvatarImage}
                />
              ) : (
                <span className={styles.profileAvatarFallback}>
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
              className={styles.hiddenInput}
              onChange={handlePhotoChange}
            />

            <button
              type="button"
              className={styles.profilePhotoButton}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          </div>

          <div className={styles.profileFormGrid}>
            <input
              className={styles.profileInput}
              value={draftProfile.fullName}
              onChange={(event) => handleFieldChange('fullName', event.target.value)}
              placeholder="Full Name"
            />
            <input
              className={styles.profileInput}
              value={draftProfile.office}
              disabled
              aria-label="Assigned role"
              placeholder="Assigned Role"
            />
            <input
              className={styles.profileInput}
              value={draftProfile.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              placeholder="Email"
            />
            <input
              className={styles.profileInput}
              value={draftProfile.contactNumber}
              onChange={(event) => handleFieldChange('contactNumber', event.target.value)}
              placeholder="Contact Number"
            />
            <input
              className={styles.profileInput}
              value={draftProfile.employeeId}
              disabled
              aria-label="Assigned ID number"
              placeholder="Employee ID"
            />
            <textarea
              className={styles.profileTextarea}
              value={draftProfile.address}
              onChange={(event) => handleFieldChange('address', event.target.value)}
              placeholder="Office Address"
            />
          </div>
        </div>

        {validationMessage ? (
          <div className={styles.profileValidationMessage}>{validationMessage}</div>
        ) : null}

        <div className={styles.profileModalActions}>
          <button type="button" className={styles.profileSecondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.profilePrimaryButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

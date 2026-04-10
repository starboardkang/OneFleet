import officeBackground from '../../../../assets/ogs-office.png'
import loginLogo from '../../../../assets/pasig-login-logo.png'
import { useState } from 'react'
import { useLoginForm } from '../../../hooks/useLoginForm'
import styles from '../../../styles/modules/global/auth/LoginPortal.module.css'
import { PortalSwitch } from './PortalSwitch'

type Portal = 'requester' | 'staff'

type TemporaryCredentials = {
  email: string
  password: string
}

type LoginPortalProps = {
  activePortal: Portal
  onSwitch: (portal: Portal) => void
  title: string
  portalLabel: string
  credentials: TemporaryCredentials
  onSuccess?: () => void
}

export function LoginPortal({
  activePortal,
  onSwitch,
  title,
  portalLabel,
  credentials,
  onSuccess,
}: LoginPortalProps) {
  const [helperMessage, setHelperMessage] = useState('')
  const { email, password, error, success, setEmail, setPassword, handleSubmit } = useLoginForm({
    portalLabel,
    credentials,
    onSuccess,
  })

  return (
    <div className={styles.shell}>
      <img
        src={officeBackground}
        alt="Office background"
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundOverlay} />

      <div className={styles.switcherDock}>
        <PortalSwitch
          activePortal={activePortal}
          onSwitch={onSwitch}
          className={styles.switcherPosition}
        />
      </div>

      <section className={styles.card}>
        <img src={loginLogo} alt="Pasig login logo" className={styles.logo} />

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.credentialsCard}>
          <div className={styles.credentialsTitle}>Temporary {portalLabel} credentials</div>
          <div>Email: {credentials.email}</div>
          <div>Password: {credentials.password}</div>
        </div>

        {error ? (
          <div className={styles.errorCard}>{error}</div>
        ) : null}

        {success ? (
          <div className={styles.successCard}>{success}</div>
        ) : null}

        <div className={styles.fieldWrapper}>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setHelperMessage('')
            }}
            placeholder="E-mail"
            className={styles.input}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setHelperMessage('')
            }}
            placeholder="Password"
            className={styles.input}
          />
        </div>

        {helperMessage ? <div className={styles.successCard}>{helperMessage}</div> : null}

        <button type="button" onClick={handleSubmit} className={styles.submitButton}>
          LOGIN
        </button>

        <button
          type="button"
          onClick={() =>
            setHelperMessage(
              `Use the temporary ${portalLabel.toLowerCase()} credentials above for this prototype build.`,
            )
          }
          className={styles.forgotPassword}
        >
          Forgot Password
        </button>
      </section>
    </div>
  )
}

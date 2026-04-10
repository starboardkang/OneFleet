import { useCallback, useState, type MouseEvent } from 'react'

type TemporaryCredentials = {
  email: string
  password: string
}

type UseLoginFormOptions = {
  portalLabel: string
  credentials: TemporaryCredentials
  onSuccess?: () => void
}

type UseLoginFormResult = {
  email: string
  password: string
  error: string
  success: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => void
}

export function useLoginForm({
  portalLabel,
  credentials,
  onSuccess,
}: UseLoginFormOptions): UseLoginFormResult {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (!email.trim() || !password) {
        setError('Please enter both email and password.')
        setSuccess('')
        return
      }

      if (email.trim().toLowerCase() !== credentials.email.toLowerCase() || password !== credentials.password) {
        setError(`Invalid ${portalLabel.toLowerCase()} credentials. Please use the temporary test account.`)
        setSuccess('')
        return
      }

      setError('')
      setSuccess(`${portalLabel} login successful.`)
      onSuccess?.()
    },
    [credentials.email, credentials.password, email, onSuccess, password, portalLabel],
  )

  return {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleSubmit,
  }
}

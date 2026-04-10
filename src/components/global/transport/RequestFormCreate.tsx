import RequestFormBase from './RequestFormBase'
import type { RequestFormValues } from './types'
type RequestFormCreateProps = {
  onClose: () => void
  onSubmit: (values: RequestFormValues) => void
}

export default function RequestFormCreate({ onClose, onSubmit }: RequestFormCreateProps) {
  return <RequestFormBase mode="create" onClose={onClose} onSubmit={onSubmit} />
}

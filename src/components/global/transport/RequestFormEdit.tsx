import RequestFormBase from './RequestFormBase'
import type { RequestFormValues } from './types'
type RequestFormEditProps = {
  onClose: () => void
  initialValues: RequestFormValues
  onSubmit: (values: RequestFormValues) => void
}

export default function RequestFormEdit({
  onClose,
  initialValues,
  onSubmit,
}: RequestFormEditProps) {
  return (
    <RequestFormBase
      mode="edit"
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  )
}

import { FunctionComponent } from 'react'
import RequestFormBase, { type RequestFormValues } from './RequestFormBase'

type RequestFormEditProps = {
  onClose: () => void
  initialValues: RequestFormValues
  onSubmit: (values: RequestFormValues) => void
}

const RequestFormEdit: FunctionComponent<RequestFormEditProps> = ({
  onClose,
  initialValues,
  onSubmit,
}) => <RequestFormBase mode="edit" onClose={onClose} onSubmit={onSubmit} initialValues={initialValues} />

export default RequestFormEdit

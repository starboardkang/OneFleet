import { FunctionComponent } from 'react'
import RequestFormBase, { type RequestFormValues } from './RequestFormBase'

type RequestFormCreateProps = {
  onClose: () => void
  onSubmit: (values: RequestFormValues) => void
}

const RequestFormCreate: FunctionComponent<RequestFormCreateProps> = ({ onClose, onSubmit }) => (
  <RequestFormBase mode="create" onClose={onClose} onSubmit={onSubmit} />
)

export default RequestFormCreate

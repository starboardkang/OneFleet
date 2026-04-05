import { FunctionComponent, useCallback } from 'react'
import SegmentedControl from '../common/SegmentedControl'

type RequestView = 'active' | 'past'

type Group71Props = {
  activeView: RequestView
  onChange: (view: RequestView) => void
}

const Group71: FunctionComponent<Group71Props> = ({ activeView, onChange }) => {
  const onActiveRequestsClick = useCallback(() => {
    onChange('active')
  }, [onChange])

  const onPASTREQUESTSTextClick = useCallback(() => {
    onChange('past')
  }, [onChange])

  return (
    <SegmentedControl
      options={[
        { label: 'ACTIVE REQUESTS', value: 'active' },
        { label: 'PAST REQUESTS', value: 'past' },
      ]}
      value={activeView}
      onChange={(nextValue) => {
        if (nextValue === 'active') {
          onActiveRequestsClick()
          return
        }

        onPASTREQUESTSTextClick()
      }}
    />
  )
}

export default Group71

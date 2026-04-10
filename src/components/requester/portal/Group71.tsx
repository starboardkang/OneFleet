import { useCallback } from 'react'
import SegmentedControl from '../../global/common/SegmentedControl'

type RequestView = 'active' | 'past'

type Group71Props = {
  activeView: RequestView
  onChange: (view: RequestView) => void
}

export default function Group71({ activeView, onChange }: Group71Props) {
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

import { useCallback } from 'react'
import SegmentedControl from '../../global/common/SegmentedControl'

type RequestView = 'active' | 'past'

type RequestViewTabsProps = {
  activeView: RequestView
  onChange: (view: RequestView) => void
}

export default function RequestViewTabs({ activeView, onChange }: RequestViewTabsProps) {
  const handleActiveRequestsClick = useCallback(() => {
    onChange('active')
  }, [onChange])

  const handlePastRequestsClick = useCallback(() => {
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
          handleActiveRequestsClick()
          return
        }

        handlePastRequestsClick()
      }}
    />
  )
}

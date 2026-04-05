import { useEffect } from 'react'

let activeLocks = 0
let previousOverflow = ''
let previousPaddingRight = ''

export default function useBodyScrollLock() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const { body, documentElement } = document

    if (activeLocks === 0) {
      previousOverflow = body.style.overflow
      previousPaddingRight = body.style.paddingRight

      const scrollbarWidth = window.innerWidth - documentElement.clientWidth
      body.style.overflow = 'hidden'

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    activeLocks += 1

    return () => {
      activeLocks -= 1

      if (activeLocks === 0) {
        body.style.overflow = previousOverflow
        body.style.paddingRight = previousPaddingRight
      }
    }
  }, [])
}

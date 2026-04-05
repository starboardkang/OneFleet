type ModalCloseButtonProps = {
  onClick: () => void
  ariaLabel?: string
  className: string
}

export default function ModalCloseButton({
  onClick,
  ariaLabel = 'Close modal',
  className,
}: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[className, styles.button].join(' ')}
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </svg>
    </button>
  )
}
import styles from './ModalCloseButton.module.css'

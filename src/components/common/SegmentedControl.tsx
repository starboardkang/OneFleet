type SegmentedOption<T extends string> = {
  label: string
  value: T
}

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )
  const countClass = options.length === 2 ? styles.count2 : options.length === 3 ? styles.count3 : styles.count4
  const activeClass =
    activeIndex === 0 ? styles.active0 : activeIndex === 1 ? styles.active1 : activeIndex === 2 ? styles.active2 : styles.active3

  return (
    <div className={[styles.root, countClass, className].filter(Boolean).join(' ')}>
      <div className={[styles.thumb, countClass, activeClass].join(' ')} />

      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[styles.option, isActive ? styles.optionActive : styles.optionInactive].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
import styles from './SegmentedControl.module.css'

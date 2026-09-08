import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/format'
import type { SelectGroup, SelectOption } from '@/types'

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options?: SelectOption[]
  groups?: SelectGroup[]
  placeholder?: string
  label?: string
  icon?: LucideIcon
  emptyValue?: string
  className?: string
  compact?: boolean
  align?: 'left' | 'right'
}

const ease = [0.22, 1, 0.36, 1] as const

export function Select({
  value,
  onChange,
  options = [],
  groups,
  placeholder = 'Seleziona',
  label,
  icon: Icon,
  emptyValue = '',
  className,
  compact = false,
  align = 'left',
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const flat = useMemo(() => {
    if (groups?.length) return groups.flatMap((g) => g.options)
    return options
  }, [groups, options])

  const selected = flat.find((opt) => opt.value === value)
  const display = selected?.label ?? placeholder
  const isPlaceholder = !selected || value === emptyValue

  useEffect(() => {
    if (!open) return

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        setActive((prev) => {
          const next =
            event.key === 'ArrowDown'
              ? Math.min(prev + 1, flat.length - 1)
              : Math.max(prev - 1, 0)
          return prev < 0 ? (event.key === 'ArrowDown' ? 0 : flat.length - 1) : next
        })
      }
      if (event.key === 'Enter' && active >= 0 && flat[active]) {
        event.preventDefault()
        onChange(flat[active].value)
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, active, flat, onChange])

  useEffect(() => {
    if (!open) {
      setActive(-1)
      return
    }
    const idx = flat.findIndex((opt) => opt.value === value)
    setActive(idx)
  }, [open, flat, value])

  useEffect(() => {
    if (!open || active < 0) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const pick = (next: string) => {
    onChange(next)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'group flex h-full w-full items-center gap-3 border bg-white text-left transition-all duration-300 ease-[var(--ease-out-soft)]',
          compact ? 'px-3 py-2.5' : 'px-4 py-3.5',
          open
            ? 'border-brand-navy shadow-[0_12px_32px_-18px_rgba(26,43,74,0.45)]'
            : 'border-line hover:border-brand-navy/35',
        )}
      >
        {Icon && (
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
              open ? 'bg-brand-navy text-white' : 'bg-cream text-brand-navy',
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          {label && (
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {label}
            </span>
          )}
          <span
            className={cn(
              'block truncate text-sm',
              isPlaceholder ? 'text-muted' : 'text-ink',
              label && 'mt-0.5 font-medium',
            )}
          >
            {display}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-out-soft)]',
            open && 'rotate-180 text-brand-navy',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            role="listbox"
            aria-label={label || placeholder}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            className={cn(
              'absolute z-40 mt-2 min-w-full origin-top overflow-hidden border border-line bg-white shadow-[0_28px_60px_-24px_rgba(17,17,17,0.35)]',
              align === 'right' && 'right-0',
            )}
          >
            <div
              ref={listRef}
              className="max-h-72 overflow-y-auto py-2"
            >
              {groups?.length
                ? groups.map((group, gi) => (
                    <div key={group.label} className={gi > 0 ? 'mt-1' : undefined}>
                      <p className="px-4 pb-1.5 pt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-navy/70">
                        {group.label}
                      </p>
                      {group.options.map((opt) => {
                        const index = flat.indexOf(opt)
                        return (
                          <OptionRow
                            key={opt.value}
                            option={opt}
                            index={index}
                            active={active === index}
                            selected={opt.value === value}
                            onPick={pick}
                            onHover={setActive}
                          />
                        )
                      })}
                    </div>
                  ))
                : options.map((opt, index) => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      index={index}
                      active={active === index}
                      selected={opt.value === value}
                      onPick={pick}
                      onHover={setActive}
                    />
                  ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function OptionRow({
  option,
  index,
  active,
  selected,
  onPick,
  onHover,
}: {
  option: SelectOption
  index: number
  active: boolean
  selected: boolean
  onPick: (value: string) => void
  onHover: (index: number) => void
}) {
  return (
    <button
      type="button"
      role="option"
      data-index={index}
      aria-selected={selected}
      onMouseEnter={() => onHover(index)}
      onClick={() => onPick(option.value)}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150',
        active && 'bg-cream',
        selected ? 'text-brand-navy' : 'text-ink',
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
          selected ? 'bg-brand-red' : 'bg-transparent',
        )}
      />
      <span className="min-w-0 flex-1 truncate">{option.label}</span>
      {option.hint && (
        <span className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">
          {option.hint}
        </span>
      )}
      <Check
        className={cn(
          'h-3.5 w-3.5 shrink-0 transition-opacity duration-150',
          selected ? 'opacity-100 text-brand-navy' : 'opacity-0',
        )}
      />
    </button>
  )
}

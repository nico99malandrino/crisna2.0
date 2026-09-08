import { cn } from '@/utils/format'
import type { ReactNode } from 'react'

export function Badge({
  children,
  className,
  tone = 'dark',
}: {
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light' | 'champagne' | 'outline'
}) {
  const tones = {
    dark: 'bg-ink text-white',
    light: 'bg-white/90 text-ink backdrop-blur-sm',
    champagne: 'bg-champagne/90 text-ink',
    outline: 'border border-current/30 text-current',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  light = false,
}: {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-4 text-[11px] font-medium uppercase tracking-[0.22em]',
            light ? 'text-champagne' : 'text-champagne-dark',
            align === 'center' && 'text-center',
          )}
        >
          {eyebrow}
        </p>
      ) : (
        <div
          className={cn(
            'editorial-rule mb-6',
            align === 'center' && 'mx-auto',
          )}
        />
      )}
      <h2
        className={cn(
          'font-display text-3xl leading-tight sm:text-4xl lg:text-5xl text-balance',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            light ? 'text-white/75' : 'text-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={cn('reveal-on-scroll', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

import { Link } from 'react-router-dom'
import { cn } from '@/utils/format'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'champagne'
type Size = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-white hover:bg-ink-soft border border-ink',
  secondary:
    'bg-white text-ink hover:bg-cream border border-line',
  ghost: 'bg-transparent text-white hover:bg-white/10 border border-white/40',
  outline:
    'bg-transparent text-ink hover:bg-cream border border-ink/20',
  champagne:
    'bg-champagne text-ink hover:bg-champagne-dark border border-champagne',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs tracking-[0.12em]',
  md: 'px-6 py-3 text-xs tracking-[0.14em]',
  lg: 'px-8 py-4 text-sm tracking-[0.16em]',
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium uppercase transition-all duration-300 ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne'

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

type ButtonAnchorProps = ButtonBaseProps & {
  href: string
  target?: string
  rel?: string
}

export function ButtonAnchor({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  target,
  rel,
}: ButtonAnchorProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  )
}

type ButtonLinkProps = ButtonBaseProps & {
  to: string
  onClick?: () => void
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  )
}

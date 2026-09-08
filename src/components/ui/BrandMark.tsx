import { Link } from 'react-router-dom'
import { cn } from '@/utils/format'

const LOGO_SRC = '/logo-crisna.jpg?v=2'

/**
 * Logo tipografico CrisNA.
 * - Sfondo chiaro (`light=false`): Cris blu navy + NA rosso + Immobiliare grigio
 * - Sfondo scuro (`light=true`): Cris bianco + NA rosso + Immobiliare bianco soft
 */
export function BrandMark({
  className,
  size = 'md',
  light = false,
  showSubtitle = true,
  as: Tag = 'span',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  light?: boolean
  showSubtitle?: boolean
  as?: 'span' | 'div' | 'p'
}) {
  const sizes = {
    sm: { name: 'text-lg', sub: 'text-[8px] tracking-[0.28em]' },
    md: { name: 'text-xl sm:text-2xl', sub: 'text-[9px] tracking-[0.3em] sm:text-[10px]' },
    lg: { name: 'text-3xl sm:text-4xl', sub: 'text-[10px] tracking-[0.32em] sm:text-xs' },
    xl: {
      name: 'text-4xl sm:text-5xl md:text-6xl',
      sub: 'text-[11px] tracking-[0.34em] sm:text-xs',
    },
  }[size]

  return (
    <Tag
      className={cn(
        'inline-flex flex-col items-center text-center leading-none',
        className,
      )}
    >
      <span className={cn('font-brand font-bold italic leading-none', sizes.name)}>
        <span className={light ? 'text-white' : 'text-brand-navy'}>Cris</span>
        <span className="bg-gradient-to-b from-[#ff2a2a] to-brand-red bg-clip-text text-transparent">
          NA
        </span>
      </span>
      {showSubtitle && (
        <span
          className={cn(
            'mt-2 translate-x-[0.14em] text-center font-sans font-medium uppercase',
            sizes.sub,
            light ? 'text-white/75' : 'text-brand-muted',
          )}
        >
          Immobiliare
        </span>
      )}
    </Tag>
  )
}

/**
 * Logo link header/footer.
 * - Sfondo chiaro: immagine ufficiale (blu + rosso)
 * - Sfondo scuro: versione tipografica bianco + rosso
 */
export function BrandLogoLink({
  className,
  size = 'md',
  light = false,
  onClick,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('inline-flex items-center', className)}
      aria-label="CrisNA Immobiliare — Home"
    >
      {light ? (
        <BrandMark size={size} light showSubtitle />
      ) : (
        <img
          src={LOGO_SRC}
          alt="CrisNA Immobiliare"
          className={cn(
            'h-auto w-auto object-contain object-left',
            size === 'sm' && 'max-h-10 max-w-[130px]',
            size === 'md' && 'max-h-12 max-w-[160px] sm:max-h-14 sm:max-w-[180px]',
            size === 'lg' && 'max-h-16 max-w-[220px]',
          )}
        />
      )}
    </Link>
  )
}

/** Logo immagine su sfondo chiaro (loader, pagine cream, ecc.) */
export function BrandLogoImage({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <img
      src={LOGO_SRC}
      alt="CrisNA Immobiliare"
      className={cn(
        'mx-auto h-auto w-auto object-contain',
        size === 'sm' && 'max-h-12 max-w-[140px]',
        size === 'md' && 'max-h-16 max-w-[200px]',
        size === 'lg' && 'max-h-20 max-w-[260px]',
        size === 'xl' && 'max-h-28 max-w-[340px]',
        className,
      )}
    />
  )
}

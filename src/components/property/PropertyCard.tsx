import { Heart, Bath, BedDouble, Building2, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { cn, formatPrice } from '@/utils/format'
import { useFavorites } from '@/hooks/useFavorites'

/**
 * I commerciali (magazzini, locali, palazzine) spesso non hanno camere o bagni:
 * mostriamo solo i dati realmente presenti nell'annuncio.
 */
function specsOf(property: Property) {
  const specs: Array<{ key: string; icon: typeof Maximize; label: string }> = [
    { key: 'surface', icon: Maximize, label: `${property.surface} m²` },
  ]
  if (property.bedrooms) {
    specs.push({
      key: 'bedrooms',
      icon: BedDouble,
      label: property.bedrooms === 1 ? '1 camera' : `${property.bedrooms} camere`,
    })
  }
  if (property.bathrooms) {
    specs.push({
      key: 'bathrooms',
      icon: Bath,
      label: property.bathrooms === 1 ? '1 bagno' : `${property.bathrooms} bagni`,
    })
  }
  if (specs.length < 3 && property.rooms) {
    specs.push({
      key: 'rooms',
      icon: Building2,
      label: property.rooms === 1 ? '1 locale' : `${property.rooms} locali`,
    })
  }
  return specs
}

export function PropertyCard({
  property,
  variant = 'grid',
  featuredLayout = false,
}: {
  property: Property
  variant?: 'grid' | 'list'
  featuredLayout?: boolean
}) {
  const { toggle, isFavorite } = useFavorites()
  const fav = isFavorite(property.id)
  const cover = property.thumbnails[0] ?? property.images[0]
  const second = property.thumbnails[1] ?? property.images[1]
  const specs = specsOf(property)

  if (variant === 'list') {
    return (
      <article className="group grid overflow-hidden border border-line bg-white transition duration-400 hover:border-ink/20 sm:grid-cols-[280px_1fr]">
        <Link
          to={`/immobili/${property.slug}`}
          className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[220px]"
        >
          <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge tone="light">In vendita</Badge>
            {property.featured && <Badge tone="champagne">In evidenza</Badge>}
          </div>
        </Link>
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-champagne-dark">
                  {property.typologyLabel}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  <Link
                    to={`/immobili/${property.slug}`}
                    className="transition hover:text-anthracite"
                  >
                    {property.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted">{property.location}</p>
              </div>
              <button
                type="button"
                aria-label={fav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                onClick={() => toggle(property.id)}
                className="rounded-full border border-line p-2.5 text-muted transition hover:border-champagne hover:text-champagne-dark"
              >
                <Heart
                  className={cn('h-4 w-4', fav && 'fill-champagne text-champagne')}
                />
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-anthracite">
              {specs.map((spec) => (
                <span key={spec.key} className="inline-flex items-center gap-1.5">
                  <spec.icon className="h-4 w-4 text-muted" />
                  {spec.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="font-display text-2xl text-ink">
              {formatPrice(property.price, property.status)}
            </p>
            <Link
              to={`/immobili/${property.slug}`}
              className="text-xs font-medium uppercase tracking-[0.16em] text-ink underline-offset-4 hover:underline"
            >
              Vai all&apos;annuncio
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col bg-white">
      <div className="relative overflow-hidden">
        <Link
          to={`/immobili/${property.slug}`}
          className={cn(
            'relative block overflow-hidden',
            featuredLayout ? 'aspect-[16/11]' : 'aspect-[4/5] sm:aspect-[4/3]',
          )}
        >
          <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-out-soft)]',
              second && 'group-hover:opacity-0',
              !second && 'group-hover:scale-[1.04]',
            )}
          />
          {second && (
            <img
              src={second}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 scale-105 transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-90" />
        </Link>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge tone="light">Vendita</Badge>
          {property.featured && <Badge tone="champagne">In evidenza</Badge>}
        </div>
        <button
          type="button"
          aria-label={fav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          onClick={() => toggle(property.id)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-ink backdrop-blur-sm transition hover:bg-white"
        >
          <Heart className={cn('h-4 w-4', fav && 'fill-champagne text-champagne')} />
        </button>
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <p className="min-w-0 text-[11px] uppercase leading-tight tracking-[0.16em] text-white/90">
            {property.typologyLabel}
          </p>
          <p className="shrink-0 whitespace-nowrap font-display text-lg text-white sm:text-xl">
            {formatPrice(property.price, property.status)}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col border border-t-0 border-line p-5 sm:p-6">
        <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
          <Link to={`/immobili/${property.slug}`} className="hover:text-anthracite">
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{property.location}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-anthracite">
          {specs.map((spec) => (
            <span key={spec.key} className="inline-flex items-center gap-1.5">
              <spec.icon className="h-3.5 w-3.5 text-muted" />
              {spec.label}
            </span>
          ))}
        </div>
        <Link
          to={`/immobili/${property.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition group-hover:gap-3"
        >
          Vai all&apos;annuncio
          <span aria-hidden className="text-champagne-dark">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}

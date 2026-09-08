import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { properties } from '@/data/properties'
import { priceRanges } from '@/data/site'
import { PropertyCard } from '@/components/property/PropertyCard'
import { SEO } from '@/components/seo/SEO'
import { EmptyState } from '@/components/ui/Modal'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import {
  cn,
  filterProperties,
  getTypeOptions,
  getZoneGroups,
  sortProperties,
} from '@/utils/format'
import type { PropertyFilters, PropertyType, SortOption, ViewMode } from '@/types'
import { useLockBody } from '@/hooks/useScroll'

export function PropertiesPage() {
  const { pathname } = useLocation()
  const isVenditaPath = pathname.endsWith('/vendita')
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState<ViewMode>('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  useLockBody(drawerOpen)

  const zoneGroups = useMemo(() => getZoneGroups(), [])
  const typeOptions = useMemo(() => getTypeOptions(), [])
  const priceOptions = useMemo(
    () => priceRanges.map((range) => ({ value: range.value, label: range.label })),
    [],
  )

  const filters: PropertyFilters = useMemo(
    () => ({
      zone: searchParams.get('zona') || 'tutti',
      type: (searchParams.get('tipologia') as PropertyType) || 'tutti',
      priceRange: searchParams.get('prezzo') || 'tutti',
      query: searchParams.get('q') || '',
    }),
    [searchParams],
  )

  const sort = (searchParams.get('sort') as SortOption) || 'recent'
  const featuredOnly = searchParams.get('featured') === '1'

  const results = useMemo(() => {
    let list = filterProperties(properties, filters)
    if (featuredOnly) list = list.filter((p) => p.featured)
    return sortProperties(list, sort)
  }, [filters, sort, featuredOnly])

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'tutti') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const activeCount = ['zona', 'tipologia', 'prezzo', 'q'].filter((k) =>
    searchParams.get(k),
  ).length

  const title = featuredOnly ? 'Immobili in evidenza' : 'Immobili in vendita'

  const FiltersPanel = (
    <div className="space-y-6">
      <FilterGroup label="Cerca">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            className="field !pl-10"
            placeholder="Zona, via, tipologia…"
            value={filters.query || ''}
            onChange={(e) => setFilter('q', e.target.value)}
          />
        </div>
      </FilterGroup>
      <FilterGroup label="Zona">
        <Select
          value={filters.zone || 'tutti'}
          onChange={(value) => setFilter('zona', value)}
          placeholder="Tutte le zone"
          emptyValue="tutti"
          groups={[
            { label: 'Tutte', options: [{ value: 'tutti', label: 'Tutte le zone' }] },
            ...zoneGroups,
          ]}
        />
      </FilterGroup>
      <FilterGroup label="Tipologia">
        <Select
          value={filters.type || 'tutti'}
          onChange={(value) => setFilter('tipologia', value)}
          placeholder="Tutte le tipologie"
          emptyValue="tutti"
          options={[
            { value: 'tutti', label: 'Tutte le tipologie' },
            ...typeOptions,
          ]}
        />
      </FilterGroup>
      <FilterGroup label="Prezzo">
        <Select
          value={filters.priceRange || 'tutti'}
          onChange={(value) => setFilter('prezzo', value)}
          placeholder="Qualsiasi prezzo"
          emptyValue="tutti"
          options={priceOptions}
        />
      </FilterGroup>
      {activeCount > 0 && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Azzera filtri
        </Button>
      )}
    </div>
  )

  return (
    <>
      <SEO
        title={title}
        path={isVenditaPath ? '/immobili/vendita' : '/immobili'}
        description="Immobili in vendita a Roma, in provincia e nel Lazio selezionati da CrisNA Immobiliare. Filtra per zona, tipologia e budget."
      />
      <div className="bg-cream pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-navy">
                Catalogo · Solo vendita
              </p>
            </div>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-muted">
              {results.length}{' '}
              {results.length === 1 ? 'immobile trovato' : 'immobili trovati'}
              {' · '}
              Roma, provincia e Lazio
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border border-line bg-white p-6">
                <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-ink">
                  Filtri
                </h2>
                <div className="mt-6">{FiltersPanel}</div>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-line bg-white px-4 py-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink lg:hidden"
                  onClick={() => setDrawerOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtri
                  {activeCount > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center bg-brand-red px-1.5 text-[10px] text-white">
                      {activeCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span className="text-[11px] uppercase tracking-[0.14em]">
                    Ordina per
                  </span>
                  <Select
                    compact
                    className="min-w-[200px]"
                    align="right"
                    value={sort}
                    onChange={(value) => setFilter('sort', value)}
                    options={[
                      { value: 'recent', label: 'Più recenti' },
                      { value: 'price-asc', label: 'Prezzo crescente' },
                      { value: 'price-desc', label: 'Prezzo decrescente' },
                    ]}
                  />
                </div>
                <div className="flex border border-line">
                  <button
                    type="button"
                    aria-label="Vista griglia"
                    onClick={() => setView('grid')}
                    className={cn(
                      'p-2.5',
                      view === 'grid' ? 'bg-ink text-white' : 'text-muted',
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Vista lista"
                    onClick={() => setView('list')}
                    className={cn(
                      'p-2.5',
                      view === 'list' ? 'bg-ink text-white' : 'text-muted',
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {results.length === 0 ? (
                <EmptyState
                  title="Nessun immobile trovato"
                  description="Prova a modificare i filtri o a esplorare tutte le proprietà disponibili."
                  action={
                    <ButtonLink to="/immobili" variant="outline">
                      Mostra tutti
                    </ButtonLink>
                  }
                />
              ) : (
                <div
                  className={cn(
                    view === 'grid'
                      ? 'grid gap-8 sm:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col gap-6',
                  )}
                >
                  {results.map((p) => (
                    <PropertyCard key={p.id} property={p} variant={view} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label="Chiudi filtri"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,360px)] overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-medium uppercase tracking-[0.16em]">
                Filtri
              </h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Chiudi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FiltersPanel}
            <Button className="mt-6 w-full" onClick={() => setDrawerOpen(false)}>
              Mostra risultati
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
    </div>
  )
}

import type {
  Property,
  PropertyFilters,
  SelectGroup,
  SelectOption,
  SortOption,
} from '@/types'
import { properties } from '@/data/properties'
import { agents, priceRanges, propertyTypeLabels } from '@/data/site'

export function formatPrice(price: number, _status: 'vendita' = 'vendita'): string {
  const formatted = new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: 0,
  }).format(price)
  return `€ ${formatted}`
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('it-IT').format(n)
}

export function getAgentById(id: string) {
  return agents.find((a) => a.id === id)
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getFeaturedProperties(limit = 5): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit)
}

/**
 * Zone reali del portafoglio, divise tra i quartieri di Roma e il resto del Lazio.
 */
export function getZoneGroups(): SelectGroup[] {
  const roma = new Map<string, { label: string; count: number }>()
  const fuori = new Map<string, { label: string; count: number }>()
  for (const p of properties) {
    const target = p.city === 'Roma' ? roma : fuori
    const prev = target.get(p.zone)
    target.set(p.zone, {
      label: p.zoneLabel,
      count: (prev?.count ?? 0) + 1,
    })
  }
  const toOptions = (map: Map<string, { label: string; count: number }>) =>
    [...map.entries()]
      .map(([value, item]) => ({
        value,
        label: item.label,
        hint: `${item.count}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'it'))

  return [
    { label: 'Quartieri di Roma', options: toOptions(roma) },
    { label: 'Provincia e Lazio', options: toOptions(fuori) },
  ].filter((g) => g.options.length > 0)
}

export function getTypeOptions(): SelectOption[] {
  const counts = new Map<string, number>()
  for (const p of properties) {
    counts.set(p.type, (counts.get(p.type) ?? 0) + 1)
  }
  return Object.entries(propertyTypeLabels)
    .filter(([value]) => counts.has(value))
    .map(([value, label]) => ({
      value,
      label,
      hint: String(counts.get(value) ?? 0),
    }))
}

export function getZoneLabel(zone: string): string | undefined {
  return properties.find((p) => p.zone === zone)?.zoneLabel
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters,
): Property[] {
  const range = priceRanges.find((r) => r.value === filters.priceRange)

  return list.filter((p) => {
    if (filters.zone && filters.zone !== 'tutti' && p.zone !== filters.zone) {
      return false
    }
    if (filters.type && filters.type !== 'tutti' && p.type !== filters.type) {
      return false
    }
    if (range) {
      if (range.min != null && p.price < range.min) return false
      if (range.max != null && p.price > range.max) return false
    }
    if (filters.query) {
      const q = filters.query.toLowerCase()
      const hay =
        `${p.title} ${p.typologyLabel} ${p.location} ${p.city} ${p.caption ?? ''} ${p.description}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}

export function sortProperties(list: Property[], sort: SortOption): Property[] {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'recent':
    default:
      // Gli id Immobiliare.it crescono nel tempo: id più alto = annuncio più recente.
      return sorted.sort((a, b) => Number(b.id) - Number(a.id))
  }
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

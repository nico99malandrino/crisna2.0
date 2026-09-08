export type PropertyStatus = 'vendita'
export type PropertyType = 'appartamento' | 'attico' | 'villa' | 'commerciale'
export type PropertyCategory = 'residenziale' | 'commerciale'

export type PropertyCondition =
  | 'nuovo'
  | 'ristrutturato'
  | 'buono'
  | 'da-ristrutturare'

export type ViewMode = 'grid' | 'list'
export type SortOption = 'recent' | 'price-asc' | 'price-desc'

export interface Agent {
  id: string
  name: string
  role: string
  phone: string
  phoneDisplay: string
  email: string
  image?: string
  bio?: string
}

export interface Property {
  id: string
  title: string
  slug: string
  type: PropertyType
  /** Tipologia reale dell'annuncio: Trilocale, Attico, Villa bifamiliare, Ristorante… */
  typologyLabel: string
  category: PropertyCategory
  status: PropertyStatus
  /** Titolo commerciale dell'annuncio originale (maiuscolo). */
  caption?: string
  location: string
  zone: string
  zoneLabel: string
  city: string
  province: string
  address: string
  price: number
  pricePerSqm?: string
  surface: number
  surfaceLabel: string
  rooms?: number
  bedrooms?: number
  bathrooms?: number
  floor?: string
  elevator?: boolean
  heating?: string
  yearBuilt?: number
  energyClass?: string
  condition: PropertyCondition
  description: string
  features: string[]
  /** Foto in alta risoluzione per gallery e hero. */
  images: string[]
  /** Versioni leggere delle stesse foto, per le card. */
  thumbnails: string[]
  photoTotal?: number
  sourceUrl?: string
  agentId: string
  coordinates: { lat: number; lng: number }
  featured: boolean
}

export interface PropertyFilters {
  zone?: string
  type?: PropertyType | 'tutti'
  priceRange?: string
  query?: string
}

export interface SelectOption {
  value: string
  label: string
  hint?: string
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface PriceRange extends SelectOption {
  min?: number
  max?: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  slug: string
}

export interface VideoItem {
  id: string
  title: string
  category: VideoCategory
  thumbnail: string
  videoUrl: string
  duration: string
  description: string
}

export type VideoCategory =
  | 'tour'
  | 'presentazione'
  | 'quartieri'
  | 'consigli'
  | 'crisna'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
}

export interface SiteStat {
  value: string
  label: string
}

export interface OpeningHour {
  day: string
  hours: string
}

export interface ContactInfo {
  phone: string
  phoneDisplay: string
  phoneSecondary: string
  phoneSecondaryDisplay: string
  email: string
  address: string
  city: string
  postalCode: string
  hours: string
  openingHours: OpeningHour[]
  coordinates: { lat: number; lng: number }
  mapsEmbedUrl: string
  mapsLinkUrl: string
  social: {
    instagram: string
    facebook: string
    youtube: string
    whatsapp: string
  }
}

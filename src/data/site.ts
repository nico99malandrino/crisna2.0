import type { Agent, ContactInfo, PriceRange, SiteStat } from '@/types'
import { config } from '@/config'

export const SITE_NAME = 'CrisNA Immobiliare'
export const SITE_URL = config.siteUrl
export const SITE_TAGLINE =
  'Agenzia di mediazione immobiliare a Roma, in zona Prati.'

export const stats: SiteStat[] = [
  { value: '1', label: 'referente per ogni incarico' },
]

export const contactInfo: ContactInfo = {
  phone: '+393513417915',
  phoneDisplay: '351 341 7915',
  phoneSecondary: '+390685902917',
  phoneSecondaryDisplay: '06 8590 2917',
  email: 'info@crisnaimmobiliare.it',
  address: 'Via Carlo Mirabello 19',
  city: '00195 Roma (Prati)',
  postalCode: '00195',
  hours: 'Lun – Ven 9:00 – 19:30 · Sab 9:00 – 13:00',
  openingHours: [
    { day: 'Lunedì', hours: '09:00 – 19:30' },
    { day: 'Martedì', hours: '09:00 – 19:30' },
    { day: 'Mercoledì', hours: '09:00 – 19:30' },
    { day: 'Giovedì', hours: '09:00 – 19:00' },
    { day: 'Venerdì', hours: '09:00 – 19:30' },
    { day: 'Sabato', hours: '09:00 – 13:00' },
    { day: 'Domenica', hours: 'Chiuso' },
  ],
  coordinates: { lat: 41.9168, lng: 12.4569 },
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Via%20Carlo%20Mirabello%2019%2C%2000195%20Roma&ll=41.9168,12.4569&z=16&output=embed',
  mapsLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=Via+Carlo+Mirabello+19,+00195+Roma',
  social: {
    instagram: 'https://instagram.com/crisnaimmobiliare',
    facebook: 'https://facebook.com/crisnaimmobiliare',
    youtube: 'https://youtube.com/@crisnaimmobiliare',
    whatsapp:
      'https://wa.me/393513417915?text=' +
      encodeURIComponent('Buongiorno, vorrei informazioni su CrisNA Immobiliare.'),
  },
}

export const agents: Agent[] = [
  {
    id: 'referente',
    name: 'Cristiano Riggio',
    role: 'Referente',
    phone: contactInfo.phone,
    phoneDisplay: contactInfo.phoneDisplay,
    email: contactInfo.email,
    bio: 'Referente di CrisNA Immobiliare, agenzia di mediazione in zona Prati, a Roma.',
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Immobili', href: '/immobili' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Video', href: '/video' },
  { label: 'Contatti', href: '/contatti' },
] as const

export const immobiliMenu = [
  { label: 'Tutti gli immobili', href: '/immobili', hint: 'Catalogo completo' },
  { label: 'In evidenza', href: '/immobili?featured=1', hint: 'Vetrina' },
  { label: 'Appartamenti', href: '/immobili?tipologia=appartamento' },
  { label: 'Ville', href: '/immobili?tipologia=villa' },
  { label: 'Attici', href: '/immobili?tipologia=attico' },
  { label: 'Commerciale', href: '/immobili?tipologia=commerciale' },
] as const

export const propertyTypeLabels: Record<string, string> = {
  appartamento: 'Appartamento',
  attico: 'Attico',
  villa: 'Villa',
  commerciale: 'Commerciale',
}

export const conditionLabels: Record<string, string> = {
  nuovo: 'Nuovo',
  ristrutturato: 'Ottimo / Ristrutturato',
  buono: 'Buono / Abitabile',
  'da-ristrutturare': 'Da ristrutturare',
}

export const priceRanges: PriceRange[] = [
  { value: 'tutti', label: 'Qualsiasi prezzo' },
  { value: 'fino-100', label: 'Fino a € 100.000', max: 100000 },
  { value: '100-200', label: '€ 100.000 – 200.000', min: 100000, max: 200000 },
  { value: '200-300', label: '€ 200.000 – 300.000', min: 200000, max: 300000 },
  { value: 'oltre-300', label: 'Oltre € 300.000', min: 300000 },
]

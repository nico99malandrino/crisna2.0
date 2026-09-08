/* Generates src/data/properties.ts from scraped/immobiliare-raw.json. Run: node scraped/generate.cjs */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const wrapper = JSON.parse(
  fs.readFileSync(path.join(root, 'scraped/immobiliare-raw.json'), 'utf8'),
)
const raw = JSON.parse(wrapper.result.value)

const FEATURED = new Set([
  '132086096', // vetrina San Giovanni
  '130981222',
  '129157984',
  '126730371',
  '116300321',
  '124840797',
])

const CONDITIONS = {
  'Buono / Abitabile': 'buono',
  'Ottimo / Ristrutturato': 'ristrutturato',
  'Da ristrutturare': 'da-ristrutturare',
  'Nuovo / In costruzione': 'nuovo',
}

const TYPES = {
  Appartamento: 'appartamento',
  'Attico - Mansarda': 'attico',
  Villa: 'villa',
  'Palazzo - Edificio': 'commerciale',
  'Magazzino - Deposito': 'commerciale',
  'Negozio - Locale commerciale': 'commerciale',
}

const STREET_WORDS = [
  'via',
  'viale',
  'piazza',
  'piazzale',
  'largo',
  'corso',
  'strada',
  'vicolo',
  'lungotevere',
  'circonvallazione',
]

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function cleanText(text) {
  // Ogni annuncio termina con il boilerplate dell'agenzia dopo un <hr>: già presente in "Chi siamo".
  return (text || '')
    .split('<hr>')[0]
    .replace(/<[^>]+>/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function normalizeFeature(feature) {
  const spaced = feature
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function toInt(value) {
  if (value == null) return undefined
  const match = String(value).match(/\d+/)
  return match ? Number(match[0]) : undefined
}

function parseSurface(value) {
  const first = String(value).split('|')[0]
  const match = first.replace(/\./g, '').match(/\d+/)
  return match ? Number(match[0]) : 0
}

function lowerStreet(address) {
  const [first, ...rest] = address.split(' ')
  return STREET_WORDS.includes(first.toLowerCase())
    ? [first.toLowerCase(), ...rest].join(' ')
    : address
}

function typologyLabel(listing) {
  const street = new RegExp(`^(.*?)\\s+(?:${STREET_WORDS.join('|')})\\s`, 'i')
  const fromStreet = listing.title.match(street)
  if (fromStreet) return fromStreet[1].trim()
  const fromSale = listing.title.match(/^(.*?)\s+in Vendita$/i)
  if (fromSale) return fromSale[1].trim()
  return listing.typology
}

const sales = raw.filter((l) => !l.error && l.contract === 'sale')
sales.sort((a, b) => Number(b.id) - Number(a.id))

const usedSlugs = new Set()

const properties = sales.map((listing) => {
  const loc = listing.location
  const isRome = loc.city === 'Roma'
  const zoneLabel = isRome ? loc.microzone || loc.macrozone : loc.city
  const label = typologyLabel(listing)
  const address = lowerStreet(loc.address)
  const streetNumber = loc.streetNumber ? ` ${loc.streetNumber}` : ''
  const zonePart = zoneLabel === loc.city ? '' : `${zoneLabel}, `

  let slug = slugify(
    `${label} ${address}${streetNumber} ${zonePart}${loc.city}`,
  )
  while (usedSlugs.has(slug)) slug = `${slug}-${listing.id.slice(-4)}`
  usedSlugs.add(slug)

  const type = TYPES[listing.typology] || 'commerciale'
  const surfaceLabel = String(listing.surface).replace(' | ', ' · ')

  const property = {
    id: listing.id,
    title: `${label} ${address}${streetNumber}, ${zonePart}${loc.city}`,
    slug,
    type,
    typologyLabel: label,
    category: listing.category === 'Residenziale' ? 'residenziale' : 'commerciale',
    status: 'vendita',
    caption: cleanText(listing.caption) || undefined,
    location: `${zonePart}${loc.city}`.replace(/, $/, ''),
    zone: slugify(zoneLabel),
    zoneLabel,
    city: loc.city,
    province: loc.province,
    address: `${address}${streetNumber}`,
    price: listing.price,
    pricePerSqm: listing.pricePerSqm || undefined,
    surface: parseSurface(listing.surface),
    surfaceLabel,
    rooms: toInt(listing.rooms),
    bedrooms: toInt(listing.bedrooms),
    bathrooms: toInt(listing.bathrooms),
    floor: listing.floor || undefined,
    elevator: typeof listing.elevator === 'boolean' ? listing.elevator : undefined,
    heating: listing.heating || undefined,
    yearBuilt: listing.buildingYear || undefined,
    energyClass: listing.energyClass || undefined,
    condition: CONDITIONS[listing.condition] || 'buono',
    description: cleanText(listing.description),
    features: (listing.features || []).map(normalizeFeature),
    images: listing.photos.map((p) => p.large),
    thumbnails: listing.photos.map((p) => p.medium),
    photoTotal: listing.photoTotal,
    sourceUrl: listing.url,
    agentId: 'cristiano-riggio',
    coordinates: { lat: loc.lat, lng: loc.lng },
    featured: FEATURED.has(listing.id),
  }

  return property
})

const KEY_ORDER = [
  'id',
  'title',
  'slug',
  'type',
  'typologyLabel',
  'category',
  'status',
  'caption',
  'location',
  'zone',
  'zoneLabel',
  'city',
  'province',
  'address',
  'price',
  'pricePerSqm',
  'surface',
  'surfaceLabel',
  'rooms',
  'bedrooms',
  'bathrooms',
  'floor',
  'elevator',
  'heating',
  'yearBuilt',
  'energyClass',
  'condition',
  'description',
  'features',
  'images',
  'thumbnails',
  'photoTotal',
  'sourceUrl',
  'agentId',
  'coordinates',
  'featured',
]

function serialize(property) {
  const lines = []
  for (const key of KEY_ORDER) {
    const value = property[key]
    if (value === undefined) continue
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`    ${key}: [],`)
      } else {
        lines.push(`    ${key}: [`)
        for (const item of value) lines.push(`      ${JSON.stringify(item)},`)
        lines.push('    ],')
      }
    } else if (key === 'coordinates') {
      lines.push(`    ${key}: { lat: ${value.lat}, lng: ${value.lng} },`)
    } else {
      lines.push(`    ${key}: ${JSON.stringify(value)},`)
    }
  }
  return `  {\n${lines.join('\n')}\n  },`
}

const header = `import type { Property } from '@/types'

/**
 * Portafoglio reale CrisNA Immobiliare — generato da scraped/immobiliare-raw.json
 * (profilo Immobiliare.it dell'agenzia). Rigenerare con: node scraped/generate.cjs
 */
export const properties: Property[] = [
`

fs.writeFileSync(
  path.join(root, 'src/data/properties.ts'),
  header + properties.map(serialize).join('\n') + '\n]\n',
  'utf8',
)

const zones = new Map()
for (const p of properties) {
  if (!zones.has(p.zone)) {
    zones.set(p.zone, { label: p.zoneLabel, city: p.city, count: 0 })
  }
  zones.get(p.zone).count += 1
}

console.log(`Wrote ${properties.length} properties`)
console.log(
  [...zones.entries()]
    .map(([k, v]) => `${k} (${v.label} / ${v.city}) x${v.count}`)
    .join('\n'),
)
console.log('featured:', properties.filter((p) => p.featured).map((p) => p.slug))
console.log('slugs:', properties.map((p) => p.slug).join('\n'))

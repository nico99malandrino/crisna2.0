import { useEffect } from 'react'
import { contactInfo, SITE_NAME, SITE_URL } from '@/data/site'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SEO({
  title,
  description = 'CrisNA Immobiliare: agenzia immobiliare a Roma (Prati). Immobili in vendita a Roma, in provincia e nel Lazio, valutazioni gratuite e assistenza completa fino al rogito.',
  path = '/',
  image = 'https://pwm.im-cdn.it/image/1867759345/xxl.jpg',
  type = 'website',
  jsonLd,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Agenzia immobiliare a Roma`
  const canonical = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:locale', 'it_IT')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    const scriptId = 'crisna-jsonld'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [fullTitle, description, canonical, image, type, jsonLd])

  return null
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-crisna.jpg`,
  description:
    'Agenzia immobiliare a Roma composta da agenti freelance e professionisti indipendenti: vendita, valutazioni gratuite e assistenza fino al rogito.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: contactInfo.address,
    addressLocality: 'Roma',
    addressRegion: 'RM',
    postalCode: contactInfo.postalCode,
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: contactInfo.coordinates.lat,
    longitude: contactInfo.coordinates.lng,
  },
  areaServed: ['Roma', 'Provincia di Roma', 'Lazio'],
  telephone: contactInfo.phone,
  email: contactInfo.email,
  openingHours: [
    'Mo-We 09:00-19:30',
    'Th 09:00-19:00',
    'Fr 09:00-19:30',
    'Sa 09:00-13:00',
  ],
}

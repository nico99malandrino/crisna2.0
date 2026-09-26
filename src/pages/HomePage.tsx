import { CallingCard } from '@/components/card/CallingCard'
import { organizationJsonLd, SEO } from '@/components/seo/SEO'

export function HomePage() {
  return (
    <>
      <SEO
        path="/"
        jsonLd={organizationJsonLd}
        description="CrisNA Immobiliare, agenzia di mediazione a Roma, in zona Prati. Acquisto, vendita e locazione, con un referente fino al rogito. Via Carlo Mirabello 19."
      />
      <CallingCard />
    </>
  )
}

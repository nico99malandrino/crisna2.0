import { Hero } from '@/components/home/Hero'
import { PropertySearch } from '@/components/property/PropertySearch'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { VideoBrand } from '@/components/home/VideoBrand'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { ValuationCTA } from '@/components/home/ValuationCTA'
import { ContactCTA } from '@/components/home/ContactCTA'
import { BlogPreview } from '@/components/home/BlogPreview'
import { VideoGrid } from '@/components/video/VideoGrid'
import { SEO, organizationJsonLd } from '@/components/seo/SEO'

export function HomePage() {
  return (
    <>
      <SEO
        path="/"
        jsonLd={organizationJsonLd}
        description="CrisNA Immobiliare: immobili in vendita a Roma, in provincia e nel Lazio. Valutazioni gratuite, un solo referente e assistenza completa fino al rogito notarile."
      />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <AboutPreview />
      <ServicesPreview />
      <VideoBrand />
      <VideoGrid limit={3} />
      <ValuationCTA />
      <ContactCTA />
      <BlogPreview />
    </>
  )
}

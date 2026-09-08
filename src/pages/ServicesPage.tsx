import { ServicesPreview } from '@/components/home/ServicesPreview'
import { ValuationCTA } from '@/components/home/ValuationCTA'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'

export function ServicesPage() {
  return (
    <>
      <SEO
        title="Servizi"
        path="/servizi"
        description="testo da inserire"
      />
      <div className="bg-cream pt-28 pb-4 lg:pt-32">
        <div className="container-premium">
          <SectionHeading
            title="testo da inserire"
            subtitle="testo da inserire"
          />
        </div>
      </div>
      <ServicesPreview full />
      <ValuationCTA />
    </>
  )
}

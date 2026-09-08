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
        description="Valutazioni gratuite, assistenza tecnica, notarile e legale, aste giudiziarie, servizio fotografico, consulenze mutui e traslochi: i servizi CrisNA Immobiliare."
      />
      <div className="bg-cream pt-28 pb-4 lg:pt-32">
        <div className="container-premium">
          <SectionHeading
            title="Un servizio completo, dall'incarico al rogito."
            subtitle="Otto servizi inclusi nella compravendita, gestiti da un solo referente e da una rete di professionisti indipendenti."
          />
        </div>
      </div>
      <ServicesPreview full />
      <ValuationCTA />
    </>
  )
}

import { ValuationForm } from '@/components/forms/Forms'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'
import { ImageSlideshow } from '@/components/ui/ImageSlideshow'
import { valuationSlideshowImages } from '@/data/slideshow'

export function ValuationPage() {
  return (
    <>
      <SEO
        title="Valuta il tuo immobile"
        path="/valutazione"
        description="Valutazione gratuita e senza impegno del tuo immobile a Roma, in provincia e nel Lazio, con CrisNA Immobiliare."
      />
      <div className="bg-cream pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Quanto vale davvero il tuo immobile?"
                subtitle="La valutazione è gratuita e senza impegno: analizziamo la zona e ti restituiamo una stima argomentata."
              />
              <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line">
                <ImageSlideshow
                  images={valuationSlideshowImages}
                  intervalMs={4200}
                  kenBurns
                  overlay="none"
                  alt="Immobili di riferimento"
                />
              </div>
              <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite">
                <p>
                  Analizziamo zona, stato conservativo, classe energetica e
                  compravendite recenti nel quartiere — a Roma il valore cambia
                  anche tra microzone confinanti — per restituirti una stima
                  affidabile e operativa.
                </p>
                <p>
                  Nessun impegno: dopo la richiesta, un consulente ti contatterà
                  per approfondire e, se lo desideri, fissare un sopralluogo.
                </p>
              </div>
            </div>
            <div className="border border-line bg-white p-8 shadow-sm">
              <h2 className="font-display text-2xl text-ink">
                Richiedi una valutazione
              </h2>
              <ValuationForm className="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

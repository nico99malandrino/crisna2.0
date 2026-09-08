import { ButtonLink } from '@/components/ui/Button'
import { ImageSlideshow } from '@/components/ui/ImageSlideshow'
import { valuationSlideshowImages } from '@/data/slideshow'

export function ValuationCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <ImageSlideshow
        images={valuationSlideshowImages}
        intervalMs={4800}
        kenBurns
        overlay="soft"
        alt="Valutazione immobiliare"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/40"
        aria-hidden
      />
      <div className="container-premium relative z-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
            Valutazione professionale
          </p>
          <h2 className="mt-4 font-display text-3xl text-white text-balance sm:text-4xl lg:text-5xl">
            Quanto vale davvero il tuo immobile?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Analisi di mercato, posizionamento e strategia di vendita: scopri il
            reale valore della tua proprietà con CrisNA Immobiliare.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/valutazione" variant="champagne" size="lg">
              Richiedi una valutazione
            </ButtonLink>
            <ButtonLink to="/contatti" variant="ghost" size="lg">
              Parla con un advisor
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

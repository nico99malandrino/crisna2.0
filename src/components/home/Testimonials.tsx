import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '@/data/content'
import { SectionHeading } from '@/components/ui/Badge'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Testimonianze"
          title="La fiducia dei nostri clienti"
          subtitle="Chi ha scelto CrisNA Immobiliare per vendere o acquistare a Roma e nel Lazio."
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="border border-line bg-cream/50 px-8 py-12 text-center sm:px-14"
            >
              <div
                className="flex justify-center gap-1 text-champagne-dark"
                aria-label={`${item.rating} stelle su 5`}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-8 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
                “{item.text}”
              </p>
              <footer className="mt-8">
                <cite className="not-italic text-sm font-medium text-ink">
                  {item.name}
                </cite>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {item.operation}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Recensione precedente"
              className="border border-line p-3 text-ink transition hover:bg-cream"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Vai alla recensione ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-6 transition ${
                    i === index ? 'bg-ink' : 'bg-line'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Recensione successiva"
              className="border border-line p-3 text-ink transition hover:bg-cream"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

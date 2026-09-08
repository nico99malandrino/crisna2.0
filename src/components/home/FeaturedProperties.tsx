import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/property/PropertyCard'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { cn, getFeaturedProperties } from '@/utils/format'

export function FeaturedProperties() {
  const items = getFeaturedProperties(5)

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-premium">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="In vetrina"
            title="Proprietà selezionate"
            subtitle="Una selezione degli immobili in vendita nel nostro portafoglio, tra Roma e la provincia."
          />
          <ButtonLink to="/immobili" variant="outline" className="self-start lg:self-auto">
            Vedi tutti
            <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {items.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(i < 2 ? 'lg:col-span-6' : 'lg:col-span-4')}
            >
              <PropertyCard property={property} featuredLayout={i < 2} />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-10 sm:flex-row">
          <p className="text-sm text-muted">
            Preferisci una ricerca mirata? Esplora il catalogo completo filtrando
            per zona e budget.
          </p>
          <Link
            to="/immobili"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:gap-3"
          >
            Catalogo immobili
            <span aria-hidden className="text-champagne-dark">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

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
      </div>
    </section>
  )
}

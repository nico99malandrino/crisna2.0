import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calculator,
  Camera,
  FileSignature,
  Gavel,
  Handshake,
  Percent,
  Scale,
  Wrench,
} from 'lucide-react'
import { services } from '@/data/content'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

const icons = {
  calculator: Calculator,
  wrench: Wrench,
  signature: FileSignature,
  scale: Scale,
  gavel: Gavel,
  camera: Camera,
  percent: Percent,
} as const

export function ServicesPreview({ full = false }: { full?: boolean }) {
  const items = full ? services : services.slice(0, 6)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-premium">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Servizi"
            title="testo da inserire"
            subtitle="testo da inserire"
          />
          {!full && (
            <ButtonLink to="/servizi" variant="outline">
              Tutti i servizi
            </ButtonLink>
          )}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Handshake
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link
                  to={`/servizi#${service.slug}`}
                  className="group block h-full border border-line bg-cream/40 p-8 transition duration-400 hover:border-ink/25 hover:bg-cream"
                >
                  <Icon className="h-6 w-6 text-champagne-dark transition group-hover:scale-110" />
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink">
                    Scopri di più
                    <span
                      aria-hidden
                      className="text-champagne-dark transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

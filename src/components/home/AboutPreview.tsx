import { motion } from 'framer-motion'
import { stats } from '@/data/site'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

const TEAM_IMAGE = 'https://pwm.im-cdn.it/image/1867759355/xxl.jpg'

export function AboutPreview() {
  const numbers = stats

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-premium">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 hidden h-24 w-24 border border-champagne/60 sm:block" aria-hidden />
            <img
              src={TEAM_IMAGE}
              alt="Immobile in vendita con CrisNA Immobiliare"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 right-0 hidden max-w-[220px] border border-line bg-cream p-5 shadow-lg sm:block lg:-right-6">
              <p className="font-display text-3xl text-brand-navy">Roma</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Prati · Via Carlo Mirabello 19
              </p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Chi siamo"
              title="Conosciamo il valore di una casa."
              subtitle="Un&rsquo;agenzia di agenti immobiliari freelance e professionisti indipendenti: un solo interlocutore per te, un intero team alle sue spalle."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite sm:text-base">
              <p>
                Operiamo a Roma, in provincia e nel Lazio con un metodo semplice:
                chi prende l&apos;incarico lo segue personalmente, dalla valutazione
                alla firma, senza passaggi di mano tra uffici e collaboratori.
              </p>
              <p>
                Intorno al referente lavorano tecnici, notai, legali e consulenti
                mutui di fiducia. Tutti i clienti vengono seguiti in ogni fase della
                vendita, fino al rogito notarile e oltre.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/chi-siamo" variant="primary">
                Scopri chi siamo
              </ButtonLink>
              <ButtonLink to="/servizi" variant="outline">
                I nostri servizi
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-12 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-display text-3xl text-brand-navy sm:text-4xl">
                {n.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                {n.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

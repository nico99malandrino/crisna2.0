import { motion } from 'framer-motion'
import { agents, contactInfo, stats } from '@/data/site'
import { services } from '@/data/content'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Testimonials } from '@/components/home/Testimonials'

const AGENCY_IMAGE = 'https://pwm.im-cdn.it/image/1867759491/xxl.jpg'

export function AboutPage() {
  const referente = agents[0]

  return (
    <>
      <SEO
        title="Chi siamo"
        path="/chi-siamo"
        description="CrisNA Immobiliare, agenzia di Roma in Via Carlo Mirabello 19 (Prati): agenti freelance, un solo referente e assistenza completa fino al rogito."
      />
      <div className="bg-cream pt-28 pb-8 lg:pt-32">
        <div className="container-premium">
          <SectionHeading
            title="Un solo interlocutore, un intero team."
            subtitle="CrisNA Immobiliare è un'agenzia di agenti immobiliari freelance e professionisti indipendenti che mediano l'acquisto e la vendita di immobili a Roma, in provincia e nel Lazio."
          />
        </div>
      </div>

      <section className="bg-cream pb-20 lg:pb-28">
        <div className="container-premium">
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <img
              src={AGENCY_IMAGE}
              alt="Immobile in vendita con CrisNA Immobiliare a Roma"
              className="aspect-[5/4] w-full object-cover"
              loading="lazy"
            />
            <div className="space-y-5 text-base leading-relaxed text-anthracite">
              <p>
                A differenza degli agenti che operano come dipendenti di
                un&apos;agenzia, chi lavora con noi è un professionista autonomo:
                gestisce in prima persona il proprio pacchetto clienti, redige i
                contratti e segue le pratiche burocratiche connesse alla
                compravendita.
              </p>
              <p>
                Il vantaggio è concreto. Avrai sempre un solo referente per la
                vendita del tuo immobile, affiancato da un team di professionisti
                — tecnici, notai, legali, consulenti mutui — sempre disponibili.
              </p>
              <p>
                Tutti i clienti, senza eccezioni, vengono seguiti in ogni fase
                della trattativa: dalla valutazione alla promozione, dalla
                proposta al rogito notarile e oltre.
              </p>
              <p>
                Crediamo che la mediazione immobiliare meriti la credibilità e la
                professionalità che troppo spesso le vengono negate. È il metodo
                con cui lavoriamo ogni giorno dalla nostra sede di Prati, in{' '}
                {contactInfo.address}.
              </p>
              <ButtonLink to="/contatti" className="mt-4">
                Parla con noi
              </ButtonLink>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-12 lg:grid-cols-4">
            {stats.map((n) => (
              <div key={n.label}>
                <p className="font-display text-4xl text-ink">{n.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-premium">
          <SectionHeading
            title="Il referente"
            subtitle="Una sola persona segue il tuo immobile dall'incarico alla firma."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-line bg-cream/40 p-8"
            >
              <div
                className="flex h-20 w-20 items-center justify-center bg-brand-navy font-display text-3xl text-white"
                aria-hidden
              >
                CR
              </div>
              <h3 className="mt-6 font-display text-3xl text-ink">
                {referente.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-champagne-dark">
                {referente.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-anthracite">
                {referente.bio}
              </p>
              <div className="mt-6 space-y-1 text-sm text-ink">
                <a href={`tel:${referente.phone}`} className="block hover:underline">
                  {referente.phoneDisplay}
                </a>
                <a
                  href={`tel:${contactInfo.phoneSecondary}`}
                  className="block hover:underline"
                >
                  {contactInfo.phoneSecondaryDisplay}
                </a>
                <a
                  href={`mailto:${referente.email}`}
                  className="block hover:underline"
                >
                  {referente.email}
                </a>
              </div>
            </motion.article>

            <div>
              <h3 className="font-display text-2xl text-ink">
                Il team di professionisti
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Non un organigramma, ma una rete di specialisti indipendenti
                attivata di volta in volta su ciò che serve alla tua compravendita.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="border border-line bg-white px-4 py-3 text-sm text-ink"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/servizi" variant="outline" className="mt-8">
                Dettaglio dei servizi
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  )
}

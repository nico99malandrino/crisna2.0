import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/forms/Forms'
import { contactInfo } from '@/data/site'
import { ButtonLink } from '@/components/ui/Button'

export function ContactCTA() {
  return (
    <section className="bg-brand-navy py-20 text-white lg:py-28">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
              Parliamone
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
              Cerchi un&apos;agenzia di fiducia a Roma?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
              Raccontaci cosa cerchi o cosa vuoi vendere. Ti rispondiamo con una
              consulenza chiara: valutazione gratuita, promozione dell&apos;immobile
              e assistenza fino al rogito.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-3 transition hover:text-champagne"
                >
                  <Phone className="h-4 w-4 text-champagne" />
                  {contactInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phoneSecondary}`}
                  className="inline-flex items-center gap-3 transition hover:text-champagne"
                >
                  <Phone className="h-4 w-4 text-champagne" />
                  {contactInfo.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-3 transition hover:text-champagne"
                >
                  <Mail className="h-4 w-4 text-champagne" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="pt-2 text-white/55">
                {contactInfo.address}
                <br />
                {contactInfo.city}
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/contatti" variant="champagne">
                Pagina contatti
              </ButtonLink>
              <ButtonLink to="/valutazione" variant="ghost">
                Richiedi valutazione
              </ButtonLink>
            </div>
          </div>

          <div className="border border-white/15 bg-white p-6 text-ink sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-champagne-dark">
              Richiesta rapida
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">
              Scrivici in pochi secondi
            </h3>
            <p className="mt-2 text-sm text-muted">
              Compila il modulo: ti ricontattiamo al più presto.
            </p>
            <ContactForm className="mt-6" />
            <p className="mt-4 text-[11px] leading-relaxed text-muted">
              Inviando il modulo accetti la{' '}
              <Link to="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              . Lavoriamo solo su compravendite.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

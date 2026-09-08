import { Link } from 'react-router-dom'
import { contactInfo, SITE_NAME, SITE_TAGLINE } from '@/data/site'
import { BrandLogoLink } from '@/components/ui/BrandMark'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.5 5.2 12 5.2 12 5.2s-6.5 0-8.8.5c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 2.3.5 8.8.5 8.8.5s6.5 0 8.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-premium py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogoLink size="lg" light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE_TAGLINE}
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white/60 transition hover:text-champagne"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white/60 transition hover:text-champagne"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-white/60 transition hover:text-champagne"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-white/60 transition hover:text-champagne"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-champagne">
                Navigazione
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/immobili" className="hover:text-white">
                    Immobili
                  </Link>
                </li>
                <li>
                  <Link to="/chi-siamo" className="hover:text-white">
                    Chi siamo
                  </Link>
                </li>
                <li>
                  <Link to="/servizi" className="hover:text-white">
                    Servizi
                  </Link>
                </li>
                <li>
                  <Link to="/video" className="hover:text-white">
                    Video
                  </Link>
                </li>
                <li>
                  <Link to="/contatti" className="hover:text-white">
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-champagne">
                Immobili
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                <li>
                  <Link to="/immobili" className="hover:text-white">
                    Tutti gli immobili
                  </Link>
                </li>
                <li>
                  <Link to="/immobili?featured=1" className="hover:text-white">
                    In evidenza
                  </Link>
                </li>
                <li>
                  <Link to="/immobili?tipologia=appartamento" className="hover:text-white">
                    Appartamenti
                  </Link>
                </li>
                <li>
                  <Link to="/immobili?tipologia=villa" className="hover:text-white">
                    Ville
                  </Link>
                </li>
                <li>
                  <Link to="/valutazione" className="hover:text-white">
                    Valuta il tuo immobile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-champagne">
                Contatti
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                <li>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white">
                    {contactInfo.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phoneSecondary}`}
                    className="hover:text-white"
                  >
                    {contactInfo.phoneSecondaryDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.social.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  {contactInfo.address}
                  <br />
                  {contactInfo.city}
                </li>
                <li className="text-white/50">{contactInfo.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE_NAME}. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/cookie" className="hover:text-white">
              Cookie Policy
            </Link>
            <Link to="/termini" className="hover:text-white">
              Termini e condizioni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/Forms'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'
import { contactInfo } from '@/data/site'

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contatti"
        path="/contatti"
        description="Contatta CrisNA Immobiliare: Via Carlo Mirabello 19, 00195 Roma (Prati). Telefono, email, orari e form per richieste di informazioni."
      />
      <div className="bg-cream pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium">
          <SectionHeading
            title="Parliamo del tuo prossimo progetto."
            subtitle="Siamo a disposizione per vendite, acquisti e valutazioni gratuite. Scrivici o vieni in agenzia, a Prati."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 border border-line bg-white p-8">
              <Info
                icon={Phone}
                label="Telefono"
                value={
                  <>
                    <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                      {contactInfo.phoneDisplay}
                    </a>
                    <br />
                    <a
                      href={`tel:${contactInfo.phoneSecondary}`}
                      className="text-muted hover:underline"
                    >
                      {contactInfo.phoneSecondaryDisplay}
                    </a>
                  </>
                }
              />
              <Info
                icon={Mail}
                label="Email"
                value={
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                }
              />
              <Info
                icon={MapPin}
                label="Indirizzo"
                value={
                  <a
                    href={contactInfo.mapsLinkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {contactInfo.address}
                    <br />
                    {contactInfo.city}
                  </a>
                }
              />
              <Info
                icon={Clock}
                label="Orari di apertura"
                value={
                  <dl className="space-y-1 text-sm">
                    {contactInfo.openingHours.map((entry) => (
                      <div key={entry.day} className="flex justify-between gap-8">
                        <dt className="text-muted">{entry.day}</dt>
                        <dd>{entry.hours}</dd>
                      </div>
                    ))}
                  </dl>
                }
              />
            </div>

            <div className="border border-line bg-white p-8">
              <h2 className="font-display text-2xl text-ink">Invia una richiesta</h2>
              <p className="mt-2 text-sm text-muted">
                Compila il form: ti risponderemo entro un giorno lavorativo.
              </p>
              <ContactForm className="mt-8" />
            </div>
          </div>

          <div className="mt-12 aspect-[21/9] min-h-[280px] overflow-hidden border border-line bg-white">
            <iframe
              title="Mappa sede CrisNA Immobiliare"
              src={contactInfo.mapsEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  )
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 text-champagne-dark" />
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          {label}
        </p>
        <div className="mt-1 text-ink">{value}</div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Bath,
  BedDouble,
  Building2,
  Check,
  Mail,
  MapPin,
  Maximize,
  Phone,
} from 'lucide-react'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { InquiryForm } from '@/components/forms/Forms'
import { SEO } from '@/components/seo/SEO'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { contactInfo, conditionLabels } from '@/data/site'
import { formatPrice, getAgentById, getPropertyBySlug } from '@/utils/format'
import { PropertyCard } from '@/components/property/PropertyCard'
import { properties } from '@/data/properties'

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [visitOpen, setVisitOpen] = useState(false)

  if (!property) {
    return (
      <div className="container-premium py-40 text-center">
        <SEO title="Immobile non trovato" path="/immobili" />
        <h1 className="font-display text-4xl">Immobile non trovato</h1>
        <p className="mt-4 text-muted">
          L&apos;immobile richiesto non è più disponibile o l&apos;URL non è corretto.
        </p>
        <ButtonLink to="/immobili" className="mt-8">
          Torna agli immobili
        </ButtonLink>
      </div>
    )
  }

  const agent = getAgentById(property.agentId)
  // Con poche zone e tipologie il match stretto resta spesso vuoto: allarghiamo per gradi.
  const others = properties.filter((p) => p.id !== property.id)
  const related = [
    ...others.filter((p) => p.zone === property.zone || p.type === property.type),
    ...others.filter((p) => p.category === property.category),
    ...others,
  ]
    .filter((p, i, list) => list.findIndex((o) => o.id === p.id) === i)
    .slice(0, 3)

  const paragraphs = property.description.split(/\n{2,}/).filter(Boolean)

  const specs = [
    { key: 'surface', icon: Maximize, label: property.surfaceLabel },
    property.bedrooms
      ? {
          key: 'bedrooms',
          icon: BedDouble,
          label:
            property.bedrooms === 1 ? '1 camera' : `${property.bedrooms} camere`,
        }
      : null,
    property.bathrooms
      ? {
          key: 'bathrooms',
          icon: Bath,
          label:
            property.bathrooms === 1 ? '1 bagno' : `${property.bathrooms} bagni`,
        }
      : null,
    property.rooms
      ? {
          key: 'rooms',
          icon: Building2,
          label: property.rooms === 1 ? '1 locale' : `${property.rooms} locali`,
        }
      : null,
  ].filter(Boolean) as Array<{ key: string; icon: typeof Maximize; label: string }>

  // I commerciali senza camere/bagni lascerebbero il riquadro quasi vuoto.
  if (specs.length < 2) {
    specs.push({
      key: 'condition',
      icon: Building2,
      label: conditionLabels[property.condition],
    })
  }

  const details = [
    { label: 'Tipologia', value: property.typologyLabel },
    { label: 'Superficie', value: property.surfaceLabel },
    { label: 'Prezzo al m²', value: property.pricePerSqm },
    { label: 'Piano', value: property.floor },
    {
      label: 'Ascensore',
      value:
        property.elevator == null ? undefined : property.elevator ? 'Sì' : 'No',
    },
    { label: 'Stato', value: conditionLabels[property.condition] },
    { label: 'Anno di costruzione', value: property.yearBuilt?.toString() },
    { label: 'Classe energetica', value: property.energyClass },
    { label: 'Riscaldamento', value: property.heating },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: paragraphs[0] ?? property.description,
    url: `https://www.crisnaimmobiliare.it/immobili/${property.slug}`,
    image: property.images,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.surface,
      unitCode: 'MTK',
    },
    ...(property.bedrooms ? { numberOfRooms: property.bedrooms } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressRegion: property.province,
      addressCountry: 'IT',
    },
  }

  return (
    <>
      <SEO
        title={property.title}
        description={(paragraphs[0] ?? property.description).slice(0, 155)}
        path={`/immobili/${property.slug}`}
        image={property.images[0]}
        jsonLd={jsonLd}
      />

      <article className="bg-white pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge tone="dark">In vendita</Badge>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
              {property.typologyLabel} · {conditionLabels[property.condition]}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:gap-14">
            <PropertyGallery
              images={property.images}
              title={property.title}
              thumbnails={property.thumbnails}
              photoTotal={property.photoTotal}
            />

            <aside className="border border-line bg-cream/30 p-6 lg:sticky lg:top-28 lg:self-start sm:p-8">
              <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 text-muted">
                <MapPin className="h-4 w-4" />
                {property.location}
              </p>
              <p className="mt-6 font-display text-3xl text-brand-navy sm:text-4xl">
                {formatPrice(property.price, property.status)}
              </p>
              {property.pricePerSqm && (
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {property.pricePerSqm}
                </p>
              )}

              <div className="mt-8 grid grid-cols-2 gap-4 border border-line p-5 sm:grid-cols-4 lg:grid-cols-2">
                {specs.map((spec) => (
                  <Spec key={spec.key} icon={spec.icon} label={spec.label} />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button type="button" onClick={() => setInquiryOpen(true)}>
                  Richiedi informazioni
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVisitOpen(true)}
                >
                  Prenota una visita
                </Button>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-ink transition hover:bg-cream"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="min-w-0 space-y-14">
              <section>
                <h2 className="font-display text-3xl text-ink">Descrizione</h2>
                <div className="editorial-rule mt-4" />
                {property.caption && (
                  <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-navy">
                    {property.caption}
                  </p>
                )}
                <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-anthracite">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-3xl text-ink">Scheda tecnica</h2>
                <div className="editorial-rule mt-4" />
                <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
                  {details.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex justify-between gap-6 border-b border-line py-3 text-sm"
                    >
                      <dt className="text-muted">{detail.label}</dt>
                      <dd className="text-right text-ink">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {property.features.length > 0 && (
                <section>
                  <h2 className="font-display text-3xl text-ink">
                    Caratteristiche
                  </h2>
                  <div className="editorial-rule mt-4" />
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {property.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 border border-line bg-cream/40 px-4 py-3 text-sm text-ink"
                      >
                        <Check className="h-4 w-4 shrink-0 text-champagne-dark" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="font-display text-3xl text-ink">Posizione</h2>
                <div className="editorial-rule mt-4" />
                <p className="mt-4 text-sm text-muted">
                  {property.address} — {property.location}. La posizione in mappa
                  è indicativa; i dettagli completi vengono forniti in fase di
                  richiesta.
                </p>
                <div className="mt-6 aspect-[16/10] overflow-hidden border border-line bg-cream">
                  <iframe
                    title={`Mappa — ${property.location}`}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                  />
                </div>
              </section>
            </div>

            {agent && (
              <aside>
                <div className="border border-line bg-cream/50 p-6 sm:p-8">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-champagne-dark">
                    Il tuo referente
                  </p>
                  <div className="mt-6 flex gap-5">
                    {agent.image ? (
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="h-24 w-20 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="flex h-24 w-20 shrink-0 items-center justify-center bg-brand-navy font-display text-2xl text-white"
                        aria-hidden
                      >
                        —
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-2xl text-ink">
                        {agent.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{agent.role}</p>
                      <a
                        href={`tel:${agent.phone}`}
                        className="mt-4 flex items-center gap-2 text-sm text-ink hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {agent.phoneDisplay}
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="mt-2 flex items-center gap-2 text-sm text-ink hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        {agent.email}
                      </a>
                    </div>
                  </div>
                  {agent.bio && (
                    <p className="mt-6 text-sm leading-relaxed text-anthracite">
                      {agent.bio}
                    </p>
                  )}
                  <Button
                    type="button"
                    className="mt-6 w-full"
                    onClick={() => setInquiryOpen(true)}
                  >
                    Contatta l&apos;agente
                  </Button>
                </div>
              </aside>
            )}
          </div>

          {related.length > 0 && (
            <section className="mt-20 border-t border-line pt-16">
              <h2 className="font-display text-3xl text-ink">
                Potrebbe interessarti anche
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
              <div className="mt-10">
                <Link
                  to="/immobili"
                  className="text-xs uppercase tracking-[0.16em] text-ink underline-offset-4 hover:underline"
                >
                  Torna al catalogo
                </Link>
              </div>
            </section>
          )}
        </div>
      </article>

      <Modal open={inquiryOpen} onClose={() => setInquiryOpen(false)} className="max-w-lg p-8">
        <h2 id="inquiry-title" className="font-display text-3xl text-ink">
          Richiedi informazioni
        </h2>
        <p className="mt-2 text-sm text-muted">{property.title}</p>
        <div className="mt-6">
          <InquiryForm propertyTitle={property.title} mode="info" />
        </div>
      </Modal>

      <Modal open={visitOpen} onClose={() => setVisitOpen(false)} className="max-w-lg p-8">
        <h2 className="font-display text-3xl text-ink">Prenota una visita</h2>
        <p className="mt-2 text-sm text-muted">{property.title}</p>
        <div className="mt-6">
          <InquiryForm propertyTitle={property.title} mode="visit" />
        </div>
      </Modal>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <div className="flex gap-2">
          <Button
            type="button"
            className="flex-1"
            size="sm"
            onClick={() => setInquiryOpen(true)}
          >
            Richiedi info
          </Button>
          <a
            href={`tel:${contactInfo.phone}`}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-ink bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white"
          >
            <Phone className="h-4 w-4" />
            Chiama
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </>
  )
}

function Spec({
  icon: Icon,
  label,
}: {
  icon: typeof Maximize
  label: string
}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-4 w-4 text-muted" />
      <p className="mt-2 text-xs text-ink">{label}</p>
    </div>
  )
}

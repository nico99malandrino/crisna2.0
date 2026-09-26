import { useEffect, useState } from 'react'
import { contactInfo, SITE_URL } from '@/data/site'
import { useScrolled } from '@/hooks/useScroll'
import { cn } from '@/utils/format'

const REFERENTE = 'Cristiano Riggio'

const sections = [
  { id: 'studio', label: 'Studio' },
  { id: 'referente', label: 'Referente' },
  { id: 'pratica', label: 'La pratica' },
] as const

function LogoMark() {
  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden"
      style={{ aspectRatio: '570 / 248' }}
    >
      <img
        src="/logo-crisna.jpg?v=2"
        alt="CrisNA Immobiliare"
        className="absolute h-auto max-w-none"
        style={{ width: '179.6%', left: '-44.2%', top: '-96%' }}
        draggable={false}
      />
    </div>
  )
}

function downloadVCard() {
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${REFERENTE}`,
    'N:Riggio;Cristiano;;;',
    'ORG:CrisNA Immobiliare',
    'TITLE:Referente',
    `TEL;TYPE=CELL,VOICE:${contactInfo.phone}`,
    `TEL;TYPE=WORK,VOICE:${contactInfo.phoneSecondary}`,
    `EMAIL;TYPE=INTERNET:${contactInfo.email}`,
    `ADR;TYPE=WORK:;;${contactInfo.address};Roma;;${contactInfo.postalCode};Italia`,
    `URL:${SITE_URL}`,
    'END:VCARD',
  ].join('\r\n')

  const blob = new Blob([card], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'crisna-immobiliare.vcf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function ContactActions({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Contatti diretti"
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-navy',
        className,
      )}
    >
      <a href={`tel:${contactInfo.phone}`} className="hover:underline">
        Chiama
      </a>
      <a href={`mailto:${contactInfo.email}`} className="hover:underline">
        Email
      </a>
      <a
        href={contactInfo.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        WhatsApp
      </a>
      <a
        href={contactInfo.mapsLinkUrl}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        Mappa
      </a>
      <button type="button" onClick={downloadVCard} className="hover:underline">
        Salva contatto
      </button>
    </nav>
  )
}

export function CallingCard() {
  const compact = useScrolled(280)
  const [active, setActive] = useState<(typeof sections)[number]['id']>('studio')

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target.id
        if (id === 'studio' || id === 'referente' || id === 'pratica') {
          setActive(id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div
        className={cn(
          'sticky top-0 z-30 border-b border-transparent bg-desk/95 backdrop-blur-sm transition-colors',
          compact && 'border-brand-navy/10',
        )}
      >
        {compact && (
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 pt-3 sm:px-8">
            <a href="#studio" className="font-brand text-lg font-bold italic leading-none">
              <span className="text-brand-navy">Cris</span>
              <span className="text-brand-red">NA</span>
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-sm tracking-wide text-brand-navy hover:underline"
            >
              {contactInfo.phoneDisplay}
            </a>
          </div>
        )}
        <nav
          aria-label="Sezioni"
          className={cn(
            'mx-auto flex max-w-3xl gap-5 overflow-x-auto px-5 pb-3 sm:px-8',
            compact ? 'pt-3' : 'pt-4',
          )}
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={cn(
                'shrink-0 border-b pb-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors',
                active === section.id
                  ? 'border-brand-navy text-brand-navy'
                  : 'border-transparent text-brand-navy/45 hover:text-brand-navy',
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <header className="border border-brand-navy/10 bg-card px-6 py-10 shadow-[0_28px_60px_-36px_rgba(26,43,74,0.45)] sm:px-10">
          <LogoMark />
          <div className="mx-auto mt-2 h-px w-10 bg-brand-navy" aria-hidden />
          <p className="mt-8 text-center font-display text-3xl text-brand-navy">
            {REFERENTE}
          </p>
          <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-brand-navy/60">
            Referente · Agenzia immobiliare
          </p>
          <div className="mt-6 text-center text-sm leading-relaxed text-anthracite">
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-base tracking-wide text-brand-navy hover:underline"
            >
              {contactInfo.phoneDisplay}
            </a>
            <p className="mt-1">
              <a
                href={`tel:${contactInfo.phoneSecondary}`}
                className="hover:text-brand-navy hover:underline"
              >
                {contactInfo.phoneSecondaryDisplay}
              </a>
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-3 inline-block text-brand-navy hover:underline"
            >
              {contactInfo.email}
            </a>
            <p className="mt-3 text-ink">
              {contactInfo.address}
              <span className="block text-muted">00195 Roma</span>
            </p>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-navy/60">
              Orari
            </p>
            <p className="mt-2">Lunedì – mercoledì, venerdì · 9:00 – 19:30</p>
            <p>Giovedì · 9:00 – 19:00</p>
            <p>Sabato · 9:00 – 13:00</p>
            <p>Domenica · chiuso</p>
          </div>
          <ContactActions className="mt-8 justify-center" />
        </header>

        <section id="studio" className="scroll-mt-28 py-16 sm:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-navy/60">
            Lo studio
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-brand-navy">
            Mediazione immobiliare
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-anthracite">
            <p>
              CrisNA Immobiliare si occupa di mediazione immobiliare: acquisto,
              vendita e locazione di immobili.
            </p>
            <p>
              Gli incarichi sono seguiti da agenti che gestiscono in proprio il
              rapporto con il cliente. Sulle verifiche tecniche, sugli aspetti
              legali e sull’atto notarile interviene un gruppo di professionisti
              dello stesso studio.
            </p>
            <p>
              Il cliente non viene passato da un ufficio all’altro. Dall’inizio
              alla chiusura della pratica parla con una sola persona, che tiene
              il fascicolo.
            </p>
          </div>
        </section>

        <section
          id="referente"
          className="scroll-mt-28 border-t border-brand-navy/10 py-16 sm:py-20"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-navy/60">
            Referente
          </p>
          <h2 className="mt-3 font-display text-4xl text-brand-navy">
            {REFERENTE}
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-anthracite">
            <p>
              È la persona a cui telefonare o scrivere. Conosce la pratica e
              resta il riferimento fino al rogito notarile, e anche dopo la
              firma.
            </p>
            <p>
              Valutazione, contratti e passaggi burocratici non cambiano
              interlocutore a metà percorso. Se serve un controllo tecnico, un
              parere legale o il notaio, il referente coordina chi interviene e
              rimane lui il contatto del cliente.
            </p>
          </div>
          <div className="mt-8 text-sm leading-relaxed">
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-base tracking-wide text-brand-navy hover:underline"
            >
              {contactInfo.phoneDisplay}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-2 block text-brand-navy hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>
        </section>

        <section
          id="pratica"
          className="scroll-mt-28 border-t border-brand-navy/10 py-16 sm:py-20"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-navy/60">
            La pratica
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-brand-navy">
            Cosa accade, nell’ordine
          </h2>
          <div className="mt-10 max-w-2xl">
            <div className="border-t border-brand-navy/10 py-6">
              <h3 className="text-lg text-ink">Incarico</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-anthracite">
                Si stabilisce se si tratta di acquisto, vendita o locazione.
                Quando occorre, la valutazione dell’immobile fa parte di questo
                passaggio.
              </p>
            </div>
            <div className="border-t border-brand-navy/10 py-6">
              <h3 className="text-lg text-ink">Verifica</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-anthracite">
                Prima di procedere si controllano documenti, conformità e
                aspetti tecnici. Le difformità si affrontano prima della
                trattativa, non al rogito.
              </p>
            </div>
            <div className="border-t border-brand-navy/10 py-6">
              <h3 className="text-lg text-ink">Trattativa</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-anthracite">
                Proposta, contratto e adempimenti restano seguiti dallo stesso
                referente. Per il mutuo c’è una consulenza dedicata, se il
                cliente la chiede.
              </p>
            </div>
            <div className="border-t border-b border-brand-navy/10 py-6">
              <h3 className="text-lg text-ink">Rogito</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-anthracite">
                L’assistenza notarile accompagna l’atto. L’assistenza legale si
                aggiunge quando la pratica lo richiede. Il referente resta
                reperibile anche dopo la firma.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-anthracite">
            Se l’acquisto avviene in asta giudiziaria, o se serve un servizio
            fotografico, lo studio li segue all’interno della stessa pratica.
          </p>
        </section>

      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { ButtonLink } from '@/components/ui/Button'
import { contactInfo } from '@/data/site'

export function NotFoundPage() {
  return (
    <>
      <SEO title="Pagina non trovata" path="/404" description="Pagina non trovata." />
      <div className="flex min-h-[70vh] items-center bg-cream pt-28">
        <div className="container-premium py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne-dark">
            Errore 404
          </p>
          <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
            Pagina non trovata
          </h1>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Il percorso richiesto non esiste o è stato spostato. Torna alla home
            o esplora i nostri immobili.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/">Torna alla home</ButtonLink>
            <ButtonLink to="/immobili" variant="outline">
              Vedi immobili
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  )
}

export function LegalPage({
  title,
  path,
}: {
  title: string
  path: string
}) {
  return (
    <>
      <SEO title={title} path={path} description={`${title} — CrisNA Immobiliare.`} />
      <div className="bg-cream pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium max-w-3xl">
          <h1 className="font-display text-4xl text-ink">{title}</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite">
            <p>
              Questo documento è una bozza informativa. Prima della messa online,
              i testi legali dovranno essere revisionati da un consulente legale.
            </p>
            <p>
              CrisNA Immobiliare tratta i dati personali dei visitatori nel
              rispetto del Regolamento UE 2016/679 (GDPR), utilizzando le
              informazioni esclusivamente per rispondere alle richieste inviate
              tramite i form del sito.
            </p>
            <p>
              Per esercitare i diritti di accesso, rettifica o cancellazione è
              possibile scrivere a{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="underline underline-offset-2"
              >
                {contactInfo.email}
              </a>
              .
            </p>
            <p>
              <Link to="/contatti" className="underline underline-offset-2">
                Contattaci
              </Link>{' '}
              per qualsiasi chiarimento.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

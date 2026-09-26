import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { ButtonLink } from '@/components/ui/Button'
import { contactInfo } from '@/data/site'

export function NotFoundPage() {
  return (
    <>
      <SEO title="Pagina non trovata" path="/404" description="Pagina non trovata." />
      <div className="flex flex-1 items-center px-5 py-20">
        <div className="mx-auto max-w-md text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-navy/60">
            Errore 404
          </p>
          <h1 className="mt-4 font-display text-5xl text-brand-navy">
            Pagina non trovata
          </h1>
          <p className="mt-5 text-muted">
            Il percorso richiesto non esiste. Si torna alla pagina dello studio.
          </p>
          <div className="mt-10">
            <ButtonLink to="/">Torna allo studio</ButtonLink>
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
      <div className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl text-brand-navy">{title}</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite">
            <p>
              Questo documento è una bozza informativa. Prima della messa online,
              i testi legali dovranno essere revisionati da un consulente legale.
            </p>
            <p>
              CrisNA Immobiliare tratta i dati personali nel rispetto del
              Regolamento UE 2016/679 (GDPR). I dati comunicati per email o
              telefono sono usati solo per rispondere alla richiesta.
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
              <Link to="/" className="underline underline-offset-2">
                Torna allo studio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

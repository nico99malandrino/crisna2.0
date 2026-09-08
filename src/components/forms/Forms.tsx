import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'
import { formDataToPayload, submitForm } from '@/utils/forms'
import { cn } from '@/utils/format'

const fieldClass =
  'w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-ink'

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
    </label>
  )
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  formName: string,
  push: (msg: string, type?: 'success' | 'error' | 'info') => void,
  successMessage: string,
  setLoading: (v: boolean) => void,
) {
  e.preventDefault()
  const form = e.currentTarget
  setLoading(true)
  try {
    const result = await submitForm(formDataToPayload(form), formName)
    form.reset()
    push(result.demo ? successMessage : successMessage, 'success')
  } catch {
    push('Invio non riuscito. Riprova o chiamaci direttamente.', 'error')
  } finally {
    setLoading(false)
  }
}

export function ContactForm({ className }: { className?: string }) {
  const { push } = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <form
      onSubmit={(e) =>
        void handleSubmit(
          e,
          'Contatti',
          push,
          'Richiesta inviata. Ti ricontatteremo al più presto.',
          setLoading,
        )
      }
      className={cn('space-y-5', className)}
      name="contatti"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" id="contact-name">
          <input id="contact-name" name="name" required className={fieldClass} autoComplete="name" />
        </Field>
        <Field label="Email" id="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={fieldClass}
            autoComplete="email"
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefono" id="contact-phone">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={fieldClass}
            autoComplete="tel"
          />
        </Field>
        <Field label="Oggetto" id="contact-subject">
          <input id="contact-subject" name="subject" required className={fieldClass} />
        </Field>
      </div>
      <Field label="Messaggio" id="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </Field>
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? 'Invio in corso…' : 'Invia richiesta'}
      </Button>
    </form>
  )
}

export function ValuationForm({ className }: { className?: string }) {
  const { push } = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <form
      onSubmit={(e) =>
        void handleSubmit(
          e,
          'Valutazione immobile',
          push,
          'Richiesta di valutazione ricevuta. Un consulente ti contatterà.',
          setLoading,
        )
      }
      className={cn('space-y-5', className)}
      name="valutazione"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" id="val-name">
          <input id="val-name" name="name" required className={fieldClass} autoComplete="given-name" />
        </Field>
        <Field label="Cognome" id="val-surname">
          <input id="val-surname" name="surname" required className={fieldClass} autoComplete="family-name" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" id="val-email">
          <input
            id="val-email"
            name="email"
            type="email"
            required
            className={fieldClass}
            autoComplete="email"
          />
        </Field>
        <Field label="Telefono" id="val-phone">
          <input
            id="val-phone"
            name="phone"
            type="tel"
            required
            className={fieldClass}
            autoComplete="tel"
          />
        </Field>
      </div>
      <Field label="Indirizzo immobile" id="val-address">
        <input id="val-address" name="address" required className={fieldClass} autoComplete="street-address" />
      </Field>
      <Field label="Tipologia" id="val-type">
        <select id="val-type" name="type" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Seleziona
          </option>
          <option value="appartamento">Appartamento</option>
          <option value="villa">Villa</option>
          <option value="attico">Attico</option>
          <option value="loft">Loft</option>
          <option value="altro">Altro</option>
        </select>
      </Field>
      <Field label="Messaggio" id="val-message">
        <textarea id="val-message" name="message" rows={4} className={fieldClass} />
      </Field>
      <Button type="submit" disabled={loading}>
        {loading ? 'Invio in corso…' : 'Richiedi una valutazione'}
      </Button>
    </form>
  )
}

export function InquiryForm({
  propertyTitle,
  mode = 'info',
}: {
  propertyTitle: string
  mode?: 'info' | 'visit'
}) {
  const { push } = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <form
      onSubmit={(e) =>
        void handleSubmit(
          e,
          mode === 'visit' ? `Visita — ${propertyTitle}` : `Info — ${propertyTitle}`,
          push,
          mode === 'visit'
            ? 'Richiesta di visita inviata. Ti confermeremo disponibilità a breve.'
            : 'Richiesta inviata. Un agente ti ricontatterà presto.',
          setLoading,
        )
      }
      className="space-y-4"
      name={mode === 'visit' ? 'visita' : 'informazioni'}
    >
      <input type="hidden" name="property" value={propertyTitle} />
      <Field label="Nome" id="inq-name">
        <input id="inq-name" name="name" required className={fieldClass} autoComplete="name" />
      </Field>
      <Field label="Email" id="inq-email">
        <input
          id="inq-email"
          name="email"
          type="email"
          required
          className={fieldClass}
          autoComplete="email"
        />
      </Field>
      <Field label="Telefono" id="inq-phone">
        <input
          id="inq-phone"
          name="phone"
          type="tel"
          required
          className={fieldClass}
          autoComplete="tel"
        />
      </Field>
      {mode === 'visit' && (
        <Field label="Data preferita" id="inq-date">
          <input id="inq-date" name="date" type="date" className={fieldClass} />
        </Field>
      )}
      <Field label="Messaggio" id="inq-message">
        <textarea
          id="inq-message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder={
            mode === 'visit'
              ? 'Indicaci fasce orarie preferite…'
              : 'Come possiamo aiutarti?'
          }
        />
      </Field>
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? 'Invio…'
          : mode === 'visit'
            ? 'Prenota una visita'
            : 'Richiedi informazioni'}
      </Button>
    </form>
  )
}

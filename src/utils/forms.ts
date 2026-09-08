import { config } from '@/config'

export type FormPayload = Record<string, string>

/**
 * Invio form production-ready.
 * - Con VITE_FORM_ENDPOINT: POST JSON (Formspree / Getform / webhook)
 * - Con VITE_WEB3FORMS_KEY: POST a Web3Forms
 * - Altrimenti modalità demo (risolve comunque, per UX in anteprima)
 */
export async function submitForm(
  payload: FormPayload,
  formName: string,
): Promise<{ ok: boolean; demo?: boolean; message?: string }> {
  const data = {
    ...payload,
    _subject: `[CrisNA Immobiliare] ${formName}`,
    form: formName,
  }

  if (config.web3formsKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: config.web3formsKey,
        ...data,
      }),
    })
    if (!res.ok) throw new Error('Invio non riuscito')
    return { ok: true }
  }

  if (config.formEndpoint) {
    const res = await fetch(config.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Invio non riuscito')
    return { ok: true }
  }

  // Demo locale / deploy senza endpoint configurato
  await new Promise((r) => setTimeout(r, 700))
  return {
    ok: true,
    demo: true,
    message:
      'Richiesta registrata in modalità demo. Configura VITE_FORM_ENDPOINT per ricevere le email.',
  }
}

export function formDataToPayload(form: HTMLFormElement): FormPayload {
  const fd = new FormData(form)
  const payload: FormPayload = {}
  fd.forEach((value, key) => {
    if (typeof value === 'string') payload[key] = value
  })
  return payload
}

/**
 * Config runtime da variabili Vite — sicuro da esporre al client.
 */
export const config = {
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
    /\/$/,
    '',
  ) || 'https://www.crisnaimmobiliare.it',
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '',
  web3formsKey: (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || '',
  isDemoForms: !(
    (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ||
    (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)
  ),
} as const

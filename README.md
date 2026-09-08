# Crisna Immobiliare

Sito premium per agenzia immobiliare — React, TypeScript, Vite, Tailwind CSS.

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173).

## Build produzione

```bash
npm run build
npm run preview
```

Output in `dist/` — cartella pronta per qualsiasi hosting statico.

## Deploy

Il progetto è configurato per:

| Hosting | File | Note |
|--------|------|------|
| **Vercel** | `vercel.json` | Rewrite SPA + header sicurezza |
| **Netlify** | `netlify.toml` + `public/_redirects` | Publish `dist` |
| **Altro** | cartella `dist` | Serve `index.html` su tutte le route |

### Vercel (consigliato)

1. Collega il repository o carica la cartella
2. Framework preset: **Vite**
3. Build: `npm run build` · Output: `dist`
4. Imposta le variabili d’ambiente (vedi sotto)

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Le rewrite SPA sono già in `netlify.toml`

## Variabili d’ambiente

Copia `.env.example` → `.env` (locale) o impostale nel pannello hosting:

```env
VITE_SITE_URL=https://www.tuodominio.it
VITE_BASE=/
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
# oppure
VITE_WEB3FORMS_KEY=your-access-key
```

- **Senza** endpoint form: i form funzionano in modalità demo (toast locale).
- **Con** Formspree / Web3Forms / webhook: le richieste arrivano via email/API.

## Contenuti da personalizzare

| File | Contenuto |
|------|-----------|
| `src/data/site.ts` | Contatti, stats, team, social |
| `src/data/properties.ts` | Immobili |
| `src/data/content.ts` | Servizi, video, blog, recensioni |
| `src/data/slideshow.ts` | Immagini CTA / hero |
| `public/sitemap.xml` | Sitemap SEO (aggiorna dominio/URL) |
| `public/robots.txt` | Sitemap URL |

## Struttura

```
src/
  components/   UI, layout, property, forms, seo
  pages/        Route pages
  data/         Dati demo (pronti per Supabase)
  hooks/        Scroll, toast, favorites
  utils/        Format, filtri, form, video
  config.ts     Env runtime
```

## Checklist pre-go-live

- [ ] Aggiornare telefono, email, indirizzo in `site.ts`
- [ ] Sostituire embed Google Maps con quello reale
- [ ] Configurare `VITE_SITE_URL` e form endpoint
- [ ] Aggiornare `sitemap.xml` / `robots.txt` con il dominio finale
- [ ] Revisionare testi legali (Privacy / Cookie / Termini)
- [ ] Collegare dominio e HTTPS sull’hosting

## Licenza

Progetto privato — Crisna Immobiliare.

import type { BlogPost, Service, VideoItem } from '@/types'

/**
 * Servizi dichiarati dall'agenzia sul profilo Immobiliare.it.
 */
export const services: Service[] = [
  {
    id: 'srv-valutazioni',
    slug: 'valutazioni-gratuite',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'calculator',
  },
  {
    id: 'srv-tecnica',
    slug: 'assistenza-tecnica',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'wrench',
  },
  {
    id: 'srv-notarile',
    slug: 'assistenza-notarile',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'signature',
  },
  {
    id: 'srv-legale',
    slug: 'assistenza-legale',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'scale',
  },
  {
    id: 'srv-aste',
    slug: 'aste-giudiziarie',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'gavel',
  },
  {
    id: 'srv-foto',
    slug: 'servizio-fotografico',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'camera',
  },
  {
    id: 'srv-mutui',
    slug: 'consulenze-mutui',
    title: 'testo da inserire',
    description: 'testo da inserire',
    icon: 'percent',
  },
]

export const videos: VideoItem[] = [
  {
    id: 'v-1',
    title: 'Tour — Villa storica nel cuore di Roma',
    category: 'tour',
    thumbnail: 'https://i.ytimg.com/vi/jdEYT-x9iX4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/jdEYT-x9iX4',
    duration: '6:12',
    description:
      'Un tour all’interno di una villa romana di rappresentanza: affreschi, giardini e spazi di pregio nel centro della capitale.',
  },
  {
    id: 'v-2',
    title: 'Come un video racconta una proprietà',
    category: 'crisna',
    thumbnail: 'https://i.ytimg.com/vi/v1V3QGNgT1Y/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/v1V3QGNgT1Y',
    duration: '8:40',
    description:
      'Villa del XVII secolo sulle colline toscane: un esempio di presentazione immobiliare che valorizza luce, giardino e storia della casa.',
  },
  {
    id: 'v-3',
    title: 'Vivere a Prati, Roma',
    category: 'quartieri',
    thumbnail: 'https://i.ytimg.com/vi/C4tCgaqLQ38/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/C4tCgaqLQ38',
    duration: '24:18',
    description:
      'Passeggiata nel quartiere di Prati, dove ha sede CrisNA Immobiliare: viali, palazzi e vita di zona a pochi minuti dal Vaticano.',
  },
  {
    id: 'v-4',
    title: 'Ville di pregio: luce, giardino e prima impressione',
    category: 'consigli',
    thumbnail: 'https://i.ytimg.com/vi/XfgW7wCSAXs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/XfgW7wCSAXs',
    duration: '11:05',
    description:
      'Due ville a Forte dei Marmi: come gli spazi esterni e gli interni curati influenzano la percezione di valore di una casa.',
  },
  {
    id: 'v-5',
    title: 'Proprietà storiche: cosa osservare in visita',
    category: 'consigli',
    thumbnail: 'https://i.ytimg.com/vi/0kfOXmygdFc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/0kfOXmygdFc',
    duration: '10:22',
    description:
      'Castello medievale in Toscana: struttura, restauro e contesto — gli stessi criteri con cui valutiamo immobili di carattere a Roma e nel Lazio.',
  },
  {
    id: 'v-6',
    title: 'Presentazione — Villa d’epoca sul lago',
    category: 'presentazione',
    thumbnail: 'https://i.ytimg.com/vi/WnP7FxMeokg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/WnP7FxMeokg',
    duration: '9:15',
    description:
      'Villa ottocentesca con parco e darsena: un video di presentazione che mette in scena affaccio, giardino e distribuzione degli spazi.',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Come valutare correttamente una casa a Roma',
    slug: 'come-valutare-correttamente-una-casa',
    excerpt:
      'I fattori che determinano il valore reale di un immobile: zona, stato, mercato e potenziale.',
    content: `Una valutazione corretta non si basa su stime improvvisate, ma su un’analisi strutturata del mercato e della proprietà.

**Zona e contesto**
A Roma il valore cambia sensibilmente da un quadrante all’altro e persino tra microzone confinanti. Servizi, collegamenti con il centro, vicinanza al GRA e domanda locale incidono in modo decisivo sul prezzo.

**Stato e potenzialità**
Ristrutturazioni recenti, classe energetica e layout funzionale aumentano l’attrattività. Anche i lavori necessari vanno considerati con trasparenza: un immobile da ristrutturare ha un suo mercato, purché prezzato di conseguenza.

**Dati di mercato**
Confrontiamo compravendite recenti, tempi medi di vendita e trend del quartiere per definire un range realistico.

In CrisNA Immobiliare la valutazione è gratuita, personalizzata e costruita per aiutarti a decidere con chiarezza.`,
    image: 'https://pwm.im-cdn.it/image/1970249670/xxl.jpg',
    category: 'Guida',
    date: '2026-02-12',
    readTime: '5 min',
    author: 'Cristiano Riggio',
  },
  {
    id: 'b-2',
    title: 'Cosa sapere prima di acquistare',
    slug: 'cosa-sapere-prima-di-acquistare',
    excerpt:
      'Dal budget ai documenti: una checklist essenziale per affrontare l’acquisto con serenità.',
    content: `Acquistare casa è una delle decisioni più importanti. Prepararsi bene riduce rischi e stress.

**Definisci priorità e budget**
Stabilisci il tetto massimo includendo imposte, spese notarili ed eventuali lavori. Una consulenza sul mutuo nelle prime fasi evita di innamorarsi di immobili fuori portata.

**Verifica documentale**
Planimetrie, visure, conformità urbanistica e impianti devono essere chiari prima dell’offerta.

**Visite consapevoli**
Osserva luce, rumori, stato del condominio e spese ordinarie. Un agente esperto ti guida su cosa controllare.

Ti accompagniamo in ogni passo, dalla selezione alla firma.`,
    image: 'https://pwm.im-cdn.it/image/1964440712/xxl.jpg',
    category: 'Acquisto',
    date: '2026-01-28',
    readTime: '6 min',
    author: 'Cristiano Riggio',
  },
  {
    id: 'b-3',
    title: 'Come preparare un immobile alla vendita',
    slug: 'come-preparare-un-immobile-alla-vendita',
    excerpt:
      'Ordine, fotografia e piccoli interventi: come valorizzare la casa prima delle visite.',
    content: `Il primo impatto conta. Una casa ordinata e ben presentata si vende più rapidamente e a condizioni migliori.

**Declutter e luce**
Spazi liberi e ambienti luminosi aiutano l’acquirente a immaginarsi nella proprietà.

**Riparazioni mirate**
Piccoli difetti (maniglie, pittura, rubinetti) possono generare dubbi sproporzionati.

**Fotografia professionale**
Il servizio fotografico è incluso nel nostro incarico: foto curate amplificano la qualità percepita dell’immobile e moltiplicano i contatti sui portali.

Prepariamo ogni proprietà prima di pubblicarla, mai dopo.`,
    image: 'https://pwm.im-cdn.it/image/1815914633/xxl.jpg',
    category: 'Vendita',
    date: '2026-03-02',
    readTime: '4 min',
    author: 'Cristiano Riggio',
  },
  {
    id: 'b-4',
    title: 'Mercato immobiliare a Roma: segnali del 2026',
    slug: 'mercato-immobiliare-2026',
    excerpt:
      'Una lettura sintetica di domanda, offerta e zone in crescita tra Roma, la provincia e il Lazio.',
    content: `Il mercato residenziale romano del 2026 resta selettivo: qualità e posizione guidano le scelte.

**Domanda concentrata**
I tagli funzionali (55–110 mq) nelle zone ben collegate restano i più ricercati, dal quadrante nord di Talenti e Fidene fino a Battistini e Casalotti.

**Fuori dal Raccordo**
Pomezia, Capena e i comuni della provincia intercettano chi cerca spazi esterni e metrature maggiori a parità di budget.

**Efficienza energetica**
La classe energetica influenza sempre più le decisioni di acquisto e i tempi di vendita, e pesa nella trattativa sul prezzo.

Monitoriamo i dati zona per zona per offrire consigli aggiornati e realistici.`,
    image: 'https://pwm.im-cdn.it/image/1926249890/xxl.jpg',
    category: 'Mercato',
    date: '2026-03-15',
    readTime: '7 min',
    author: 'Cristiano Riggio',
  },
  {
    id: 'b-5',
    title: 'Documenti essenziali per vendere casa',
    slug: 'documenti-essenziali-per-vendere-casa',
    excerpt:
      'Visure, planimetrie, APE e conformità: la checklist per arrivare al rogito senza intoppi.',
    content: `Una vendita fluida nasce da documenti in ordine.

**Documentazione urbanistica**
Planimetrie catastali e conformità devono coincidere con lo stato reale dell’immobile: le difformità emergono sempre, meglio prima della proposta.

**Attestato di prestazione energetica**
L’APE è obbligatorio e influenza la percezione del valore da parte degli acquirenti.

**Impianti e certificazioni**
Dichiarazioni e libretti aggiornati riducono le obiezioni in fase di trattativa.

Con l’assistenza tecnica e notarile inclusa nell’incarico verifichiamo il fascicolo documentale prima di andare sul mercato.`,
    image: 'https://pwm.im-cdn.it/image/1938161894/xxl.jpg',
    category: 'Vendita',
    date: '2026-02-20',
    readTime: '5 min',
    author: 'Cristiano Riggio',
  },
]

export const videoCategories = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'tour', label: 'Tour immobili' },
  { id: 'presentazione', label: 'Video presentazione' },
  { id: 'quartieri', label: 'Quartieri' },
  { id: 'consigli', label: 'Consigli immobiliari' },
  { id: 'crisna', label: 'CrisNA Immobiliare' },
] as const

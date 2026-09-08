import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLockBody } from '@/hooks/useScroll'
import { cn } from '@/utils/format'

export function PropertyGallery({
  images,
  title,
  thumbnails,
  photoTotal,
}: {
  images: string[]
  title: string
  thumbnails?: string[]
  photoTotal?: number
}) {
  const thumbs = thumbnails?.length === images.length ? thumbnails : images
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const touchX = useRef<number | null>(null)
  useLockBody(fullscreen)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActive((i) => (i + 1) % images.length)
      }
      if (e.key === 'ArrowLeft') {
        setActive((i) => (i - 1 + images.length) % images.length)
      }
      if (e.key === 'Escape' && fullscreen) setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen, images.length])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 48) {
      if (dx < 0) next()
      else prev()
    }
    touchX.current = null
  }

  return (
    <>
      {/* min-w-0: la striscia di miniature (fino a 14 foto) altrimenti allarga la colonna della griglia. */}
      <div className="min-w-0 space-y-3">
        <div
          className="group relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="block w-full"
            aria-label="Apri gallery a schermo intero"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[active]}
                src={images[active]}
                alt={`${title} — foto ${active + 1}`}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="aspect-[16/10] w-full object-cover"
              />
            </AnimatePresence>
          </button>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-white/90 p-2 text-ink opacity-100 shadow-sm transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-white/90 p-2 text-ink opacity-100 shadow-sm transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <p className="bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white">
              {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-ink"
            >
              Schermo intero
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative h-20 w-28 shrink-0 overflow-hidden border-2 transition',
                i === active
                  ? 'border-ink'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
              aria-label={`Mostra immagine ${i + 1}`}
            >
              <img
                src={thumbs[i]}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {photoTotal != null && photoTotal > images.length && (
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
            {images.length} di {photoTotal} foto — richiedi il servizio
            fotografico completo
          </p>
        )}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              className="absolute right-5 top-5 text-white"
              onClick={() => setFullscreen(false)}
              aria-label="Chiudi gallery"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              aria-label="Immagine precedente"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={images[active]}
              alt={`${title} — foto ${active + 1}`}
              className="max-h-[85vh] max-w-full object-contain"
            />
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <p className="absolute bottom-6 text-sm text-white/70">
              {active + 1} / {images.length}
            </p>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/format'

interface ImageSlideshowProps {
  images: string[]
  intervalMs?: number
  className?: string
  imageClassName?: string
  alt?: string
  showDots?: boolean
  kenBurns?: boolean
  overlay?: 'dark' | 'soft' | 'none'
}

export function ImageSlideshow({
  images,
  intervalMs = 5000,
  className,
  imageClassName,
  alt = '',
  showDots = false,
  kenBurns = true,
  overlay = 'dark',
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [images.length, intervalMs])

  if (!images.length) return null

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          initial={{ opacity: 0, scale: kenBurns ? 1.04 : 1 }}
          animate={{
            opacity: 1,
            scale: kenBurns ? 1.12 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: intervalMs / 1000, ease: 'linear' },
          }}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            imageClassName,
          )}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      </AnimatePresence>

      {overlay === 'dark' && (
        <>
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/35" />
        </>
      )}
      {overlay === 'soft' && (
        <>
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-ink/55" />
        </>
      )}

      {showDots && images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Scorri immagini"
        >
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Immagine ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1 w-6 transition-colors duration-300',
                i === index ? 'bg-champagne' : 'bg-white/35 hover:bg-white/60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

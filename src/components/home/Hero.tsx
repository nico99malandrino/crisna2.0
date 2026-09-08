import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { BrandMark } from '@/components/ui/BrandMark'
import { ImageSlideshow } from '@/components/ui/ImageSlideshow'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { heroSlideshowImages } from '@/data/slideshow'
import { contactInfo } from '@/data/site'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-28 pt-32 sm:items-center sm:pb-36 sm:pt-40"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <ImageSlideshow
          images={heroSlideshowImages}
          intervalMs={5500}
          showDots
          kenBurns
          overlay="dark"
          alt="Immobile in vendita"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70"
        aria-hidden
      />

      <div className="container-premium relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-champagne">
              Roma
            </p>
            <BrandMark
              size="xl"
              light
              showSubtitle
              className="mt-6"
              as="div"
            />
            <div className="mt-8 h-px w-14 bg-gradient-to-r from-champagne to-transparent" />
            <h1 className="mt-8 font-display text-4xl leading-[1.1] text-white text-balance sm:text-5xl lg:text-[3.4rem]">
              Immobili a Roma
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
              Vendita. Professionalità. Sicurezza.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:max-w-sm lg:ml-auto lg:w-[17.5rem] lg:shrink-0">
            <ButtonLink to="/immobili" variant="champagne" size="lg" className="w-full">
              Esplora gli immobili
            </ButtonLink>
            <ButtonLink to="/valutazione" variant="ghost" size="lg" className="w-full border-white/55">
              Valuta il tuo immobile
            </ButtonLink>
            <ButtonAnchor
              href={contactInfo.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              size="lg"
              className="w-full border-[#25D366]/80 text-white hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </ButtonAnchor>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

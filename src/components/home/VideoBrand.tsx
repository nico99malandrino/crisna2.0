import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/Badge'
import { ImageSlideshow } from '@/components/ui/ImageSlideshow'
import { Modal } from '@/components/ui/Modal'
import { brandSlideshowImages } from '@/data/slideshow'
import { videos } from '@/data/content'
import { youtubeAutoplayUrl } from '@/utils/video'

const featured = videos[0]

export function VideoBrand() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <ImageSlideshow
        images={brandSlideshowImages}
        intervalMs={5200}
        kenBurns
        overlay="soft"
        imageClassName="opacity-90"
        alt="Proprietà CrisNA Immobiliare"
      />
      <div className="container-premium relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Video"
            title="Non vendiamo semplicemente immobili. Raccontiamo nuovi inizi."
            light
            align="center"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex h-20 w-20 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-champagne hover:bg-white/10"
              aria-label="Guarda il video"
            >
              <Play className="h-7 w-7 fill-current transition group-hover:text-champagne" />
            </button>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <ButtonLink to="/video" variant="ghost">
                Guarda i nostri video
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="max-w-4xl bg-ink"
        labelledBy="brand-video-title"
      >
        <div className="aspect-video w-full bg-ink">
          {open && (
            <iframe
              src={youtubeAutoplayUrl(featured.videoUrl)}
              title={featured.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className="bg-white p-6">
          <h3 id="brand-video-title" className="font-display text-2xl text-ink">
            {featured.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{featured.description}</p>
          <ButtonLink to="/video" variant="outline" className="mt-5" onClick={() => setOpen(false)}>
            Vedi tutti i video
          </ButtonLink>
        </div>
      </Modal>
    </section>
  )
}

import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { videos, videoCategories } from '@/data/content'
import type { VideoCategory, VideoItem } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { SectionHeading } from '@/components/ui/Badge'
import { cn } from '@/utils/format'
import { youtubeAutoplayUrl } from '@/utils/video'

export function VideoGrid({
  showHeading = true,
  limit,
}: {
  showHeading?: boolean
  limit?: number
}) {
  const [category, setCategory] = useState<string>('tutti')
  const [active, setActive] = useState<VideoItem | null>(null)

  const filtered = useMemo(() => {
    const list =
      category === 'tutti'
        ? videos
        : videos.filter((v) => v.category === (category as VideoCategory))
    return limit ? list.slice(0, limit) : list
  }, [category, limit])

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-premium">
        {showHeading && (
          <SectionHeading
            title="Entra nelle nostre proprietà"
            subtitle="Scopri gli immobili attraverso immagini, video e tour che raccontano ogni spazio."
            align="center"
          />
        )}

        <div
          className={cn(
            'flex flex-wrap justify-center gap-2',
            showHeading ? 'mt-12' : 'mt-0',
          )}
          role="tablist"
          aria-label="Categorie video"
        >
          {videoCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                'px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition',
                category === cat.id
                  ? 'bg-ink text-white'
                  : 'border border-line text-muted hover:text-ink',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActive(video)}
              className="group relative overflow-hidden text-left"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-ink/35 transition group-hover:bg-ink/45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-ink/30 text-white backdrop-blur-sm">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-champagne">
                  {video.duration}
                </p>
                <h3 className="mt-1 font-display text-xl text-white">
                  {video.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        className="max-w-4xl bg-ink"
        labelledBy="video-modal-title"
      >
        {active && (
          <div>
            <div className="aspect-video w-full bg-ink">
              <iframe
                src={youtubeAutoplayUrl(active.videoUrl)}
                title={active.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="bg-white p-6">
              <h3 id="video-modal-title" className="font-display text-2xl text-ink">
                {active.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{active.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

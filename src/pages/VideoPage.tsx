import { VideoGrid } from '@/components/video/VideoGrid'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'

export function VideoPage() {
  return (
    <>
      <SEO
        title="Video"
        path="/video"
        description="Tour immobiliari, video presentazione e consigli: entra nelle proprietà CrisNA Immobiliare."
      />
      <div className="bg-cream pt-28 lg:pt-32">
        <div className="container-premium pb-4">
          <SectionHeading
            title="Entra nelle nostre proprietà"
            subtitle="Scopri gli immobili attraverso immagini, video e tour che raccontano ogni spazio."
            align="center"
          />
        </div>
      </div>
      <VideoGrid showHeading={false} />
    </>
  )
}

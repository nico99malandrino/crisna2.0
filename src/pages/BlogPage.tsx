import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '@/data/content'
import { SEO } from '@/components/seo/SEO'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

export function BlogPage() {
  return (
    <>
      <SEO
        title="Blog"
        path="/blog"
        description="Guide e approfondimenti sul mercato immobiliare di Roma e del Lazio, a cura di CrisNA Immobiliare."
      />
      <div className="bg-cream pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium">
          <SectionHeading
            title="Dal mondo immobiliare"
            subtitle="Approfondimenti, guide e letture per scegliere con consapevolezza."
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </Link>
                <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-champagne-dark">
                  {post.category} · {post.date}
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="container-premium py-40 text-center">
        <h1 className="font-display text-4xl">Articolo non trovato</h1>
        <ButtonLink to="/blog" className="mt-8">
          Torna al blog
        </ButtonLink>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />
      <article className="bg-white pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="container-premium max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.16em] text-champagne-dark">
            {post.category} · {post.readTime} · {post.author}
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            {post.title}
          </h1>
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 aspect-[16/9] w-full object-cover"
          />
          <div className="prose-crisna mt-10 space-y-4 text-base leading-relaxed text-anthracite">
            {post.content.split('\n\n').map((block) => {
              if (block.startsWith('**') && block.endsWith('**') === false) {
                const parts = block.split('\n')
                return (
                  <div key={block.slice(0, 24)}>
                    {parts.map((line) =>
                      line.startsWith('**') ? (
                        <h2
                          key={line}
                          className="mt-8 font-display text-2xl text-ink"
                        >
                          {line.replace(/\*\*/g, '')}
                        </h2>
                      ) : (
                        <p key={line}>{line}</p>
                      ),
                    )}
                  </div>
                )
              }
              if (block.startsWith('**')) {
                return (
                  <h2 key={block} className="mt-8 font-display text-2xl text-ink">
                    {block.replace(/\*\*/g, '')}
                  </h2>
                )
              }
              return <p key={block}>{block}</p>
            })}
          </div>
          <ButtonLink to="/blog" variant="outline" className="mt-12">
            Tutti gli articoli
          </ButtonLink>
        </div>
      </article>
    </>
  )
}

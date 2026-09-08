import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/content'
import { SectionHeading } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-premium">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Dal mondo immobiliare"
            subtitle="Approfondimenti, guide e letture per scegliere con consapevolezza."
          />
          <ButtonLink to="/blog" variant="outline">
            Tutti gli articoli
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-champagne-dark">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  <Link to={`/blog/${post.slug}`} className="hover:text-anthracite">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

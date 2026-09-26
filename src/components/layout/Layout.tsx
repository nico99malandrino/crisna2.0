import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BrandMark } from '@/components/ui/BrandMark'
import { SITE_NAME } from '@/data/site'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function PageLoader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setShow(false), reduce ? 0 : 380)
    return () => window.clearTimeout(timer)
  }, [])
  if (!show) return null
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-desk"
      role="status"
      aria-label="Caricamento"
    >
      <BrandMark size="lg" />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="px-5 pb-8 pt-2">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center text-[11px] text-brand-navy/50 sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <p>© {new Date().getFullYear()} {SITE_NAME}</p>
        <nav aria-label="Note legali" className="flex gap-4">
          <Link to="/privacy" className="hover:text-brand-navy">
            Privacy
          </Link>
          <Link to="/cookie" className="hover:text-brand-navy">
            Cookie
          </Link>
          <Link to="/termini" className="hover:text-brand-navy">
            Termini
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[210] focus:bg-card focus:px-4 focus:py-2 focus:text-ink"
      >
        Vai al contenuto
      </a>
      <PageLoader />
      <ScrollToTop />
      {!isHome && (
        <header className="border-b border-brand-navy/10 bg-desk">
          <div className="mx-auto flex h-16 max-w-3xl items-center px-5">
            <Link to="/" aria-label="CrisNA Immobiliare — Home">
              <BrandMark size="sm" />
            </Link>
          </div>
        </header>
      )}
      <main id="main-content" className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

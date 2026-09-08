import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastViewport } from '@/components/ui/Toast'
import { BrandLogoImage } from '@/components/ui/BrandMark'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { useScrollProgress } from '@/hooks/useScroll'
import { contactInfo } from '@/data/site'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] bg-champagne transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden
    />
  )
}

function PageLoader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => setShow(false), reduce ? 0 : 420)
    return () => window.clearTimeout(t)
  }, [])
  if (!show) return null
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
      role="status"
      aria-label="Caricamento"
    >
      <div className="text-center">
        <BrandLogoImage size="lg" />
        <div className="mx-auto mt-8 h-px w-16 bg-line">
          <div className="h-full w-1/2 animate-pulse bg-brand-red" />
        </div>
      </div>
    </div>
  )
}

export function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[210] focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Vai al contenuto
      </a>
      <PageLoader />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <a
        href={contactInfo.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Scrivi su WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105 hover:bg-[#1ebe5d] sm:bottom-7 sm:right-7"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <ToastViewport />
    </>
  )
}

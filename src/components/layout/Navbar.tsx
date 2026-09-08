import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { contactInfo, immobiliMenu, navLinks } from '@/data/site'
import { useScrolled, useLockBody, useMediaQuery } from '@/hooks/useScroll'
import { BrandLogoLink } from '@/components/ui/BrandMark'
import { ButtonLink } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cn } from '@/utils/format'

export function Navbar() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [immobiliOpen, setImmobiliOpen] = useState(false)
  const { pathname, search } = useLocation()
  const isHome = pathname === '/'
  const solid = scrolled || !isHome || open
  const immobiliActive = pathname.startsWith('/immobili')
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  useLockBody(open)

  useEffect(() => {
    setOpen(false)
    setImmobiliOpen(false)
  }, [pathname, search])

  useEffect(() => {
    if (isDesktop) {
      setOpen(false)
      setImmobiliOpen(false)
    }
  }, [isDesktop])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setImmobiliOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-500',
        solid
          ? 'bg-white shadow-sm shadow-ink/5'
          : 'bg-transparent',
      )}
    >
      <div className="container-premium flex h-20 items-center justify-between gap-4 lg:h-24">
        <BrandLogoLink
          size="md"
          light={!solid}
          onClick={() => setOpen(false)}
          className="relative z-10"
        />

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Navigazione principale"
        >
          {navLinks.map((link) =>
            link.href === '/immobili' ? (
              <ImmobiliDropdown
                key={link.href}
                solid={solid}
                active={immobiliActive}
              />
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
                    solid
                      ? isActive
                        ? 'text-ink'
                        : 'text-muted hover:text-ink'
                      : isActive
                        ? 'text-white'
                        : 'text-white/75 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={contactInfo.social.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className={cn(
              'flex h-10 w-10 items-center justify-center transition',
              solid ? 'text-ink hover:text-[#25D366]' : 'text-white hover:text-[#25D366]',
            )}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <ButtonLink
            to="/valutazione"
            variant={solid ? 'primary' : 'ghost'}
            size="sm"
            className={cn(!solid && 'border-white/50')}
          >
            Valuta il tuo immobile
          </ButtonLink>
        </div>

        <div className="relative z-10 flex items-center gap-1 xl:hidden">
          <a
            href={`tel:${contactInfo.phone}`}
            className={cn(
              'flex h-11 w-11 items-center justify-center',
              solid ? 'text-ink' : 'text-white',
            )}
            aria-label="Chiama l'agenzia"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={contactInfo.social.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'flex h-11 w-11 items-center justify-center',
              solid ? 'text-ink' : 'text-white',
            )}
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className={cn(
              'flex h-11 w-11 items-center justify-center',
              solid ? 'text-ink' : 'text-white',
            )}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

    </header>
    {createPortal(
      <AnimatePresence>
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-20 z-[90] xl:hidden lg:top-24">
            <motion.button
              type="button"
              aria-label="Chiudi menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-ink/60"
              onClick={() => {
                setOpen(false)
                setImmobiliOpen(false)
              }}
            />
            <motion.nav
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-white shadow-[-16px_0_40px_-24px_rgba(17,17,17,0.35)]"
            >
              <div className="border-b border-line px-5 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-navy">
                  Menu
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto py-2">
                {navLinks.map((link) =>
                  link.href === '/immobili' ? (
                    <div key={link.href} className="border-b border-line/70">
                      <button
                        type="button"
                        onClick={() => setImmobiliOpen((v) => !v)}
                        aria-expanded={immobiliOpen}
                        className={cn(
                          'flex w-full items-center justify-between px-5 py-3.5 text-left text-[13px] font-medium uppercase tracking-[0.14em] transition-colors',
                          immobiliActive ? 'text-ink' : 'text-anthracite hover:text-ink',
                        )}
                      >
                        Immobili
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-muted transition-transform duration-300 ease-[var(--ease-out-soft)]',
                            immobiliOpen && 'rotate-180 text-ink',
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {immobiliOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-0.5 bg-cream px-3 pb-3 pt-1">
                              {immobiliMenu.map((item) => (
                                <NavLink
                                  key={item.href}
                                  to={item.href}
                                  onClick={() => setOpen(false)}
                                  className={({ isActive }) =>
                                    cn(
                                      'flex items-center justify-between px-3 py-2.5 text-sm transition-colors',
                                      isActive
                                        ? 'text-brand-navy'
                                        : 'text-ink hover:text-brand-navy',
                                    )
                                  }
                                >
                                  <span>{item.label}</span>
                                  {'hint' in item && item.hint && (
                                    <span className="text-[10px] uppercase tracking-[0.12em] text-muted">
                                      {item.hint}
                                    </span>
                                  )}
                                </NavLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block border-b border-line/70 px-5 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors',
                          isActive ? 'text-ink' : 'text-anthracite hover:text-ink',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ),
                )}
              </div>
              <div className="space-y-3 border-t border-line bg-cream px-5 py-4">
                <ButtonLink
                  to="/valutazione"
                  className="w-full"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Valuta il tuo immobile
                </ButtonLink>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={contactInfo.social.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-anthracite transition hover:text-ink"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-anthracite transition hover:text-ink"
                  >
                    <Phone className="h-4 w-4 text-champagne-dark" />
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>,
      document.body,
    )}
    </>
  )
}

function ImmobiliDropdown({
  solid,
  active,
}: {
  solid: boolean
  active: boolean
}) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const rootRef = useRef<HTMLDivElement>(null)

  const show = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    if (pinned) return
    closeTimer.current = window.setTimeout(() => setOpen(false), 180)
  }
  const close = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(false)
    setPinned(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }
    const onScroll = () => close()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          window.clearTimeout(closeTimer.current)
          if (open && pinned) close()
          else {
            setOpen(true)
            setPinned(true)
          }
        }}
        className={cn(
          'inline-flex items-center gap-1 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
          solid
            ? active
              ? 'text-ink'
              : 'text-muted hover:text-ink'
            : active
              ? 'text-white'
              : 'text-white/75 hover:text-white',
        )}
      >
        Immobili
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)]',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 mt-3 w-72 origin-top-left overflow-hidden border border-line bg-white py-2 shadow-[0_28px_60px_-24px_rgba(17,17,17,0.35)]"
          >
            <p className="px-4 pb-2 pt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-navy/70">
              Cerca nel portafoglio
            </p>
            {immobiliMenu.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.22 }}
              >
                <NavLink
                  to={item.href}
                  role="menuitem"
                  className="group flex items-center justify-between px-4 py-2.5 text-sm text-ink transition-colors hover:bg-cream"
                >
                  <span>{item.label}</span>
                  {'hint' in item && item.hint && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-muted group-hover:text-brand-navy">
                      {item.hint}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

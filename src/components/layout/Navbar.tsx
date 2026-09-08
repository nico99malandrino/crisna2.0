import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { contactInfo, immobiliMenu, navLinks } from '@/data/site'
import { useScrolled, useLockBody } from '@/hooks/useScroll'
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
  useLockBody(open)

  useEffect(() => {
    setOpen(false)
    setImmobiliOpen(false)
  }, [pathname, search])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'bg-white/95 shadow-sm shadow-ink/5 backdrop-blur-md'
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-white xl:hidden lg:top-24"
          >
            <nav
              className="container-premium flex h-[calc(100svh-5rem)] flex-col overflow-y-auto py-8 lg:h-[calc(100svh-6rem)]"
              aria-label="Menu mobile"
            >
              <div className="flex flex-1 flex-col justify-center gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    {link.href === '/immobili' ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setImmobiliOpen((v) => !v)}
                          aria-expanded={immobiliOpen}
                          className={cn(
                            'flex w-full items-center justify-between py-3 font-display text-3xl sm:text-4xl',
                            immobiliActive ? 'text-ink' : 'text-muted',
                          )}
                        >
                          Immobili
                          <ChevronDown
                            className={cn(
                              'h-6 w-6 transition-transform duration-300',
                              immobiliOpen && 'rotate-180',
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {immobiliOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mb-4 space-y-1 border-l border-line pl-4">
                                {immobiliMenu.map((item) => (
                                  <NavLink
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-2 text-base text-muted transition hover:text-ink"
                                  >
                                    {item.label}
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block py-3 font-display text-3xl text-ink sm:text-4xl',
                            isActive ? 'text-ink' : 'text-muted',
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4 border-t border-line pt-8 pb-10">
                <ButtonLink
                  to="/valutazione"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Valuta il tuo immobile
                </ButtonLink>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-anthracite"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center justify-center gap-2 text-sm text-anthracite"
                >
                  <Phone className="h-4 w-4 text-champagne-dark" />
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
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

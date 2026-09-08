import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/format'

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

export function ToastViewport() {
  const { toasts, dismiss } = useToast()

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-[min(100%-2rem,380px)] flex-col gap-3"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.type]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 border bg-white px-4 py-3 shadow-lg shadow-ink/10',
                t.type === 'success' && 'border-champagne/40',
                t.type === 'error' && 'border-red-200',
                t.type === 'info' && 'border-line',
              )}
              role="status"
            >
              <Icon
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0',
                  t.type === 'success' && 'text-champagne-dark',
                  t.type === 'error' && 'text-red-600',
                  t.type === 'info' && 'text-anthracite',
                )}
              />
              <p className="flex-1 text-sm text-ink-soft">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="text-muted hover:text-ink"
                aria-label="Chiudi notifica"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Banknote, Building2, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { priceRanges } from '@/data/site'
import { cn, getTypeOptions, getZoneGroups } from '@/utils/format'

interface SearchState {
  zona: string
  tipologia: string
  prezzo: string
}

const initial: SearchState = { zona: '', tipologia: '', prezzo: '' }

export function PropertySearch({ elevated = true }: { elevated?: boolean }) {
  const navigate = useNavigate()
  const [form, setForm] = useState<SearchState>(initial)
  const zoneGroups = useMemo(() => getZoneGroups(), [])
  const typeOptions = useMemo(() => getTypeOptions(), [])
  const priceOptions = useMemo(
    () =>
      priceRanges.map((range) => ({
        value: range.value === 'tutti' ? '' : range.value,
        label: range.label,
      })),
    [],
  )

  const update = (key: keyof SearchState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(form)) {
      if (value) params.set(key, value)
    }
    const query = params.toString()
    navigate(query ? `/immobili?${query}` : '/immobili')
  }

  return (
    <section
      className={cn('relative z-20', elevated && '-mt-16 sm:-mt-20')}
      aria-labelledby="search-heading"
    >
      <div className="container-premium">
        <form
          onSubmit={onSubmit}
          className="border border-line/80 bg-white/95 p-5 shadow-[0_24px_60px_-20px_rgba(17,17,17,0.28)] backdrop-blur-sm sm:p-7"
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-navy">
                Ricerca
              </p>
              <h2
                id="search-heading"
                className="mt-1 font-display text-2xl text-ink sm:text-3xl"
              >
                Trova casa a Roma
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/immobili')}
              className="hidden text-xs uppercase tracking-[0.14em] text-muted transition hover:text-ink sm:block"
            >
              Catalogo
            </button>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-3">
              <Select
                className="min-h-[4.5rem]"
                label="Zona"
                icon={MapPin}
                value={form.zona}
                onChange={(value) => update('zona', value)}
                placeholder="Tutte le zone"
                groups={zoneGroups}
              />
              <Select
                className="min-h-[4.5rem]"
                label="Tipologia"
                icon={Building2}
                value={form.tipologia}
                onChange={(value) => update('tipologia', value)}
                placeholder="Tutte le tipologie"
                options={typeOptions}
              />
              <Select
                className="min-h-[4.5rem]"
                label="Prezzo"
                icon={Banknote}
                value={form.prezzo}
                onChange={(value) => update('prezzo', value)}
                placeholder="Qualsiasi prezzo"
                options={priceOptions}
              />
            </div>
            <Button
              type="submit"
              className="min-h-[4.5rem] shrink-0 px-10 lg:min-w-[10.5rem]"
            >
              <Search className="h-4 w-4" />
              Cerca
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

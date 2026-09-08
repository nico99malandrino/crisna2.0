import { useCallback, useState } from 'react'

const KEY = 'crisna-favorites'

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    typeof window === 'undefined' ? [] : readFavorites(),
  )

  const persist = useCallback((next: string[]) => {
    setFavorites(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* ignore quota / private mode */
    }
  }, [])

  const toggle = useCallback(
    (id: string) => {
      persist(
        favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id],
      )
    },
    [favorites, persist],
  )

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  return { favorites, toggle, isFavorite }
}

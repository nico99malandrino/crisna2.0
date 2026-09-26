import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'

const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const LegalPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.LegalPage })),
)

function PageFallback() {
  return (
    <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">
      Caricamento
    </div>
  )
}

function HomeRedirect() {
  return <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="immobili" element={<HomeRedirect />} />
            <Route path="immobili/*" element={<HomeRedirect />} />
            <Route path="chi-siamo" element={<HomeRedirect />} />
            <Route path="servizi" element={<HomeRedirect />} />
            <Route path="video" element={<HomeRedirect />} />
            <Route path="contatti" element={<HomeRedirect />} />
            <Route path="valutazione" element={<HomeRedirect />} />
            <Route path="blog" element={<HomeRedirect />} />
            <Route path="blog/*" element={<HomeRedirect />} />
            <Route path="home" element={<HomeRedirect />} />
            <Route
              path="privacy"
              element={<LegalPage title="Privacy Policy" path="/privacy" />}
            />
            <Route
              path="cookie"
              element={<LegalPage title="Cookie Policy" path="/cookie" />}
            />
            <Route
              path="termini"
              element={<LegalPage title="Termini e condizioni" path="/termini" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

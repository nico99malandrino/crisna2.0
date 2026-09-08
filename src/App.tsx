import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { SkeletonCard } from '@/components/ui/Modal'

const PropertiesPage = lazy(() =>
  import('@/pages/PropertiesPage').then((m) => ({ default: m.PropertiesPage })),
)
const PropertyDetailPage = lazy(() =>
  import('@/pages/PropertyDetailPage').then((m) => ({
    default: m.PropertyDetailPage,
  })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const VideoPage = lazy(() =>
  import('@/pages/VideoPage').then((m) => ({ default: m.VideoPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const ValuationPage = lazy(() =>
  import('@/pages/ValuationPage').then((m) => ({ default: m.ValuationPage })),
)
const BlogPage = lazy(() =>
  import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })),
)
const BlogArticlePage = lazy(() =>
  import('@/pages/BlogPage').then((m) => ({ default: m.BlogArticlePage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const LegalPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.LegalPage })),
)

function PageFallback() {
  return (
    <div className="container-premium grid gap-8 py-40 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="immobili" element={<PropertiesPage />} />
            <Route path="immobili/vendita" element={<PropertiesPage />} />
            <Route path="immobili/:slug" element={<PropertyDetailPage />} />
            <Route path="chi-siamo" element={<AboutPage />} />
            <Route path="servizi" element={<ServicesPage />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="contatti" element={<ContactPage />} />
            <Route path="valutazione" element={<ValuationPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogArticlePage />} />
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
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

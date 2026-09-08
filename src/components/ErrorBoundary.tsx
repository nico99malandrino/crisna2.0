import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[CrisNA] Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5f2ed] px-6">
          <div className="max-w-md text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#a88b5a]">
              Qualcosa non ha funzionato
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[#111]">
              Si è verificato un errore
            </h1>
            <p className="mt-4 text-[#6b6b6b]">
              Ricarica la pagina oppure torna alla home. Se il problema
              persiste, contattaci.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center border border-[#111] bg-[#111] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white"
                onClick={() => window.location.reload()}
              >
                Ricarica
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center border border-[#111]/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#111]"
              >
                Torna alla home
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

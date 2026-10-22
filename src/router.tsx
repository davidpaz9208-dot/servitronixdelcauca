import { Link, createRouter, useRouter, type ErrorComponentProps } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

function SafeErrorPage({ reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <main className="mx-auto max-w-6xl px-5 py-24">
      <p className="mono-kicker">Falla técnica</p>
      <h1 className="section-title mt-3">Esta página no pudo cargar</h1>
      <p role="alert" className="mt-4 max-w-md text-lg text-mute">
        Intenta de nuevo o vuelve al inicio del sitio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={() => {
          void router.invalidate()
          reset()
        }} className="btn-primary">
          Intentar de nuevo
        </button>
        <Link to="/" className="btn-ghost">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: SafeErrorPage,
  })

  return router
}

import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, Check, TriangleAlert } from 'lucide-react'
import services from '@/data/services'

export const Route = createFileRoute('/servicios/$servicioId')({
  loader: ({ params }) => {
    const service = services.find((candidate) => candidate.id === params.servicioId)
    if (!service) {
      throw notFound()
    }
    return service
  },
  component: ServiceDetail,
  notFoundComponent: ServiceNotFound,
})

function ServiceNotFound() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-24">
      <p className="mono-kicker">Error 404 — Orden no encontrada</p>
      <h1 className="section-title mt-3">Ese servicio no está en el tablero</h1>
      <p className="mt-4 max-w-md text-lg text-mute">
        La línea de servicio que buscas no existe o cambió de nombre. Mira las líneas que sí atendemos.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Volver al inicio
      </Link>
    </main>
  )
}

function ServiceDetail() {
  const service = Route.useLoaderData()
  const otherServices = services.filter((candidate) => candidate.id !== service.id)
  const cdn = (params: string) => `/.netlify/images?url=${encodeURIComponent(service.image)}&${params}`

  return (
    <main>
      <section className="bg-grid border-b-2 border-ink">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-10">
          <Link
            to="/"
            hash="servicios"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-mute transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            Todos los servicios
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mono-kicker">{`${service.code} — Línea de servicio`}</p>
              <h1 className="display-hero mt-3">{service.name}</h1>
              <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-signal">
                {service.tagline}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{service.description}</p>
            </div>
            <figure className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="photo-frame">
                <img
                  src={cdn('w=1200&fm=webp')}
                  alt={`Técnico reparando ${service.name.toLowerCase()}`}
                  width={1200}
                  height={896}
                  className="block h-auto w-full object-cover"
                />
              </div>
              <p className="stamp">{service.code}</p>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-2">
        <div>
          <h2 className="section-title-sm">Qué incluye</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 font-medium">
                <Check size={20} strokeWidth={2.6} className="mt-0.5 shrink-0 text-signal" />
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">
            Equipos que atendemos
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-title-sm">Fallas comunes</h2>
          <ul className="mt-6">
            {service.commonIssues.map((issue) => (
              <li
                key={issue.problem}
                className="flex items-start gap-4 border-b border-dashed border-line py-4 first:pt-0 last:border-b-0"
              >
                <TriangleAlert size={20} strokeWidth={2.4} className="mt-0.5 shrink-0 text-signal" />
                <div>
                  <p className="font-semibold">{issue.problem}</p>
                  <p className="mt-1 text-sm text-mute">{issue.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-paper-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase">¿Te pasa algo de esto con tu equipo?</h2>
            <p className="mt-1 text-mute">Cuéntanos el caso y te visitamos para revisarlo.</p>
          </div>
          <Link to="/" search={{ servicio: service.id }} hash="contacto" className="btn-primary">
            Solicitar este servicio
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-mute">Otras líneas de servicio</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {otherServices.map((candidate) => (
            <li key={candidate.id}>
              <Link
                to="/servicios/$servicioId"
                params={{ servicioId: candidate.id }}
                className="chip chip-link inline-flex items-center gap-1.5"
              >
                {candidate.name}
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

import { Link } from '@tanstack/react-router'
import services from '@/data/services'

const NAV_ITEMS = [
  { hash: 'servicios', label: 'Servicios' },
  { hash: 'proceso', label: 'Proceso' },
  { hash: 'cobertura', label: 'Cobertura' },
  { hash: 'contacto', label: 'Contacto' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-[1.65rem] font-extrabold uppercase leading-none tracking-tight">
            Servitronix
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-signal">Del Cauca</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <Link key={item.hash} to="/" hash={item.hash} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/" hash="contacto" className="btn-primary btn-sm">
          Solicitar visita
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="hazard" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold uppercase tracking-tight">Servitronix</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            Servicio técnico del Cauca
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
            Mantenimiento y reparación de televisores, equipos de sonido, neveras, lavadoras y demás
            electrodomésticos del hogar. Visita a domicilio y garantía por escrito.
          </p>
        </div>
        <nav aria-label="Servicios">
          <p className="footer-title">Servicios</p>
          <ul className="mt-3 flex flex-col gap-2">
            {services.map((service) => (
              <li key={service.id}>
                <Link to="/servicios/$servicioId" params={{ servicioId: service.id }} className="footer-link">
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/" hash="contacto" className="footer-link">
                Otro equipo
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="footer-title">Atención</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-paper/70">
            <li>Visita a domicilio en Popayán y municipios del Cauca</li>
            <li>Cotización antes de cada reparación</li>
            <li>
              <Link to="/" hash="contacto" className="footer-link">
                Solicitar una visita
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
          <span>Servitronix del Cauca — Servicio técnico de electrodomésticos</span>
          <span>Popayán · Cauca · Colombia</span>
        </div>
      </div>
    </footer>
  )
}

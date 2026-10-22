import { createFileRoute, Link } from '@tanstack/react-router'
import {
  AirVent,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Flame,
  Home,
  MapPin,
  MessageSquareText,
  Microwave,
  Plug,
  ReceiptText,
  Search,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import services from '@/data/services'
import { ContactForm } from '@/components/ContactForm'

const cdn = (path: string, params: string) => `/.netlify/images?url=${encodeURIComponent(path)}&${params}`

const TICKER_ITEMS = [
  'Televisores',
  'Equipos de sonido',
  'Neveras y congeladores',
  'Lavadoras',
  'Secadoras',
  'Microondas',
  'Estufas y hornos',
  'Aire acondicionado',
]

const HERO_CHIPS: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Home, label: 'Visita a domicilio' },
  { icon: ClipboardCheck, label: 'Cotización antes de reparar' },
  { icon: ShieldCheck, label: 'Garantía por escrito' },
]

const OTHER_SERVICES: Array<{ icon: LucideIcon; name: string; blurb: string }> = [
  { icon: Microwave, name: 'Microondas', blurb: 'Placas de control, magnetrones, puertas y candados.' },
  { icon: Flame, name: 'Estufas y hornos', blurb: 'Quemadores, termostatos, encendidos y sellos.' },
  { icon: AirVent, name: 'Aire acondicionado', blurb: 'Mantenimiento, limpieza y revisión de sistemas split.' },
  { icon: Plug, name: 'Pequeños electrodomésticos', blurb: 'Licuadoras, planchas, aspiradoras y ventiladores.' },
]

const PROCESS_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Cuéntanos el problema', text: 'Llena el formulario con lo que le pasa a tu equipo y te confirmamos la visita.' },
  { title: 'Diagnóstico a domicilio', text: 'Revisamos el equipo donde está y te explicamos la falla en claro.' },
  { title: 'Aprueba la cotización', text: 'Ningún trabajo comienza sin que conozcas el valor de antemano.' },
  { title: 'Reparación con garantía', text: 'Usamos repuestos garantizados y dejamos la garantía por escrito.' },
]

const APPROACH_POINTS = [
  'Diagnóstico honesto: si la reparación no se justifica, lo sabrás antes de gastar.',
  'Repuestos garantizados, originales o compatibles certificados.',
  'Explicaciones sin tecnicismos y detalle de cada intervención.',
]

const NEXT_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Revisamos tu solicitud', text: 'Leemos tu caso y te escribimos o llamamos en horario hábil.' },
  { title: 'Confirmamos fecha y dirección', text: 'Acordamos la visita en el horario que mejor te quede.' },
  { title: 'El técnico llega con todo', text: 'Herramientas y repuestos de uso común para resolver en la visita.' },
]

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { servicio?: string } => {
    if (typeof search.servicio === 'string' && services.some((candidate) => candidate.id === search.servicio)) {
      return { servicio: search.servicio }
    }
    return {}
  },
  component: HomePage,
})

function HomePage() {
  const { servicio } = Route.useSearch()

  return (
    <main>
      <HeroSection />
      <TickerStrip />
      <ServicesSection />
      <OtherServicesSection />
      <ProcessSection />
      <ApproachSection />
      <CoverageStrip />
      <ContactSection defaultService={servicio} />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="bg-grid relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mono-kicker rise">Servicio técnico domiciliario · Popayán — Cauca</p>
          <h1 className="display-hero rise mt-4" style={{ animationDelay: '80ms' }}>
            Reparamos lo que tu casa <span className="text-signal">no puede dejar de usar</span>.
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-mute" style={{ animationDelay: '160ms' }}>
            Mantenimiento y reparación de televisores, equipos de sonido, neveras, lavadoras y demás
            electrodomésticos del hogar. Diagnóstico en tu domicilio y cotización clara antes de trabajar.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <a href="#contacto" className="btn-primary">
              Solicitar una visita
            </a>
            <a href="#servicios" className="btn-ghost">
              Ver servicios
            </a>
          </div>
          <ul
            className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t-2 border-dashed border-line pt-5"
            style={{ animationDelay: '320ms' }}
          >
            {HERO_CHIPS.map((chip) => (
              <li key={chip.label} className="flex items-center gap-2 text-sm font-semibold">
                <chip.icon size={18} strokeWidth={2.4} className="text-signal" />
                {chip.label}
              </li>
            ))}
          </ul>
        </div>
        <figure className="rise relative mx-auto w-full max-w-lg lg:max-w-none" style={{ animationDelay: '200ms' }}>
          <div className="photo-frame">
            <img
              src={cdn('/img/hero.png', 'w=1400&fm=webp')}
              alt="Técnico de Servitronix con su maletín de herramientas junto a electrodomésticos del hogar"
              width={1376}
              height={768}
              className="block h-auto w-full object-cover"
            />
          </div>
          <p className="stamp">Orden de servicio · N.º 0472</p>
          <figcaption className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            Diagnóstico en el primer domicilio
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function TickerStrip() {
  return (
    <div aria-hidden="true">
      <div className="hazard" />
      <div className="overflow-hidden border-b-2 border-ink bg-paper-2 py-2.5">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center font-display text-lg font-bold uppercase tracking-wide"
                >
                  <span className="px-5">{item}</span>
                  <span className="text-signal">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServicesSection() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="mono-kicker">01 — Líneas de servicio</p>
        <h2 className="section-title mt-3">Lo que atendemos</h2>
        <p className="mt-4 text-lg text-mute">
          Tres líneas principales, un solo estándar: revisar bien, explicar claro y reparar con garantía.
        </p>
      </header>
      <div className="flex flex-col gap-20">
        {services.map((service, index) => (
          <article key={service.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <figure className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="photo-frame">
                <img
                  src={cdn(service.image, 'w=1000&h=750&fit=cover&fm=webp')}
                  alt={`Técnico reparando ${service.name.toLowerCase()}`}
                  width={1000}
                  height={750}
                  loading="lazy"
                  className="block aspect-[4/3] h-full w-full object-cover"
                />
              </div>
              <p className="stamp">{service.code}</p>
            </figure>
            <div className={index % 2 === 1 ? 'md:order-1' : ''}>
              <p className="mono-kicker">{`0${index + 1} — ${service.code}`}</p>
              <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none md:text-5xl">
                {service.name}
              </h3>
              <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide text-signal">
                {service.tagline}
              </p>
              <p className="mt-4 leading-relaxed text-mute">{service.shortDescription}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {service.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
                    <Check size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/servicios/$servicioId"
                params={{ servicioId: service.id }}
                className="service-link mt-7 inline-flex items-center gap-1.5"
              >
                Ver detalles del servicio
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function OtherServicesSection() {
  return (
    <section className="border-y-2 border-ink bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <header>
          <p className="mono-kicker">02 — Otros equipos</p>
          <h2 className="section-title mt-3">También dejamos andando…</h2>
          <p className="mt-4 max-w-md text-lg text-mute">
            No todo en casa se lava solo. Si un equipo se apagó, hace ruido o simplemente ya no rinde,
            escríbenos y lo revisamos.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {OTHER_SERVICES.map((item) => (
            <div key={item.name} className="other-card">
              <item.icon size={26} strokeWidth={2} className="text-signal" />
              <h3 className="mt-3 font-display text-2xl font-bold uppercase">{item.name}</h3>
              <p className="mt-1.5 text-sm text-mute">{item.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const stepIcons = [MessageSquareText, Search, ReceiptText, ShieldCheck]

  return (
    <section id="proceso" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <header className="mb-14 max-w-2xl">
        <p className="mono-kicker">03 — Proceso</p>
        <h2 className="section-title mt-3">Cómo trabajamos</h2>
      </header>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {PROCESS_STEPS.map((step, index) => {
          const Icon = stepIcons[index] ?? Home
          return (
            <li key={step.title} className="border-l-4 border-dashed border-line pl-5 lg:border-l-2">
              <span className="step-num">{`0${index + 1}`}</span>
              <h3 className="mt-3 flex items-center gap-2 font-display text-2xl font-bold uppercase">
                <Icon size={20} strokeWidth={2.4} className="text-signal" />
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.text}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function ApproachSection() {
  return (
    <section className="bg-ink py-20 text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mono-kicker" style={{ color: 'var(--color-signal)' }}>
            Nuestra forma de trabajar
          </p>
          <h2 className="section-title mt-3 text-paper">Si tu equipo no conviene repararlo, te lo decimos.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
            Nuestro trabajo empieza con un diagnóstico honesto. Preferimos que gastes poco y a tiempo,
            no mucho y dos veces.
          </p>
        </div>
        <ul className="flex flex-col justify-center">
          {APPROACH_POINTS.map((point) => (
            <li
              key={point}
              className="flex items-start gap-4 border-b border-dashed border-line-dark py-5 last:border-b-0"
            >
              <span className="mt-1.5 h-3 w-3 shrink-0 bg-signal" aria-hidden="true" />
              <span className="leading-relaxed text-paper/90">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CoverageStrip() {
  return (
    <section id="cobertura" className="scroll-mt-24 bg-signal text-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-6">
        <p className="flex items-center gap-2 font-display text-2xl font-extrabold uppercase tracking-wide">
          <MapPin size={22} strokeWidth={2.5} />
          Popayán y municipios del Cauca
        </p>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]">
          Visita a domicilio · Agenda según tu zona
        </p>
      </div>
    </section>
  )
}

function ContactSection({ defaultService }: { defaultService?: string }) {
  return (
    <section id="contacto" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mono-kicker">04 — Contacto</p>
          <h2 className="section-title mt-3">Solicita tu visita técnica</h2>
          <p className="mt-4 max-w-md text-lg text-mute">
            Cuéntanos qué está pasando con tu equipo. Te contactamos para confirmar la dirección, la hora
            y el alcance de la visita.
          </p>
          <ol className="mt-10 flex flex-col gap-5">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink font-mono text-xs font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-mute">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="ticket-card self-start">
          <div className="ticket-head">
            <span>Solicitud de servicio</span>
            <span>Form. S-01</span>
          </div>
          <div className="ticket-body">
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </section>
  )
}

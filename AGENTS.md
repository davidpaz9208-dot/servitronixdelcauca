# Servitronix del Cauca — appliance repair service site

Spanish-language marketing site for a home appliance repair service (televisores,
sonido, neveras, lavadoras, etc.) in Popayán and the Cauca department, Colombia.
Built with TanStack Start (React 19, file-based routes) and Tailwind CSS 4,
deployed on Netlify.

## Source of truth and structure

- `src/data/services.ts`: the single source for service lines — id, code, name,
  tagline, copy, image, `includes`, `commonIssues`, `items`. Adding or removing
  entries here updates the showcase, detail routes, footer, and the contact form
  select automatically (keep ids in kebab-case: they become URL segments).
- `src/routes/index.tsx`: one-page landing — hero, services ticker, alternating
  service showcase, "otros equipos" grid, process, dark approach panel, coverage
  strip, and the contact section.
- `src/routes/servicios/$servicioId.tsx`: service detail page. The loader throws
  `notFound()` for unknown ids (real 404 with a custom Spanish
  `notFoundComponent`), not a generic error.
- `src/routes/__root.tsx`: `siteName`/`siteDescription` metadata, Google Fonts,
  `lang="es"`, and the shared header/footer (`src/components/SiteChrome.tsx`).
- `src/styles.css`: Tailwind v4 `@theme` tokens (paper/ink/signal palette,
  Big Shoulders Display / Barlow / IBM Plex Mono) plus custom component classes
  (work-order ticket aesthetic: hazard stripes, stamps, dashed borders, hard
  offset shadows).

## Behavior and contracts

- The index route validates a `?servicio=<id>` search param via
  `validateSearch` (silently dropped unless it matches a service id) and
  preselects it in the contact form. Detail pages link home with that param and
  `#contacto` to preserve service context — keep both halves in sync.
- The contact form is a Netlify Form named `solicitud`. Two files must stay in
  lockstep with exactly matching field names (`form-name`, `subject`,
  `nombre`, `telefono`, `correo`, `servicio`, `zona`, `mensaje`, `bot-field`
  honeypot): the React form in `src/components/ContactForm.tsx` and the static
  registration skeleton `public/solicitud-form.html` (Netlify only detects
  forms present in the built HTML). Submissions POST to `/solicitud-form.html`,
  never `/` (the SSR catch-all would swallow them). The component shows honest
  pending/success/error states and rejects the raw registration page returned
  by plain Vite preview.
- Form submissions appear in the Netlify Forms UI; email notifications are
  configured there, not in code. There is no database, authentication, cart,
  or payment flow — do not call the site a store or claim delivery of enquiries
  beyond Netlify Forms storage.
- Images in `public/img/` are AI-generated PNGs served through the Netlify
  Image CDN (`/.netlify/images?url=...&fm=webp`, `fit=cover` crops for cards).
  Keep using the `cdn()` helpers in the routes when adding images.
- No invented phone numbers, WhatsApp links, prices, or dated guarantees: the
  copy promises a quote before any work instead of fixed rates. Add real
  contact channels only with real data.

## Development

- Node 22.13+ on the Node 22 line, or Node 24/26+. `npm run dev` (Vite on port
  3000; `netlify dev` proxies it on 8888) and `npm run build` (vite build,
  publishes `dist/client`). The build does not type-check: run a build once to
  generate `src/routeTree.gen.ts`, then `npx --no-install tsc --noEmit`.
  No lint/test scripts exist.
- Dependencies are pinned exact versions; the app depends on
  `@tanstack/react-router`, `@tanstack/react-start`, `lucide-react`,
  `react`, `react-dom`. Build tooling lives in devDependencies. Keep that split
  when refreshing versions.
- Browser APIs belong in event handlers only (the form submit uses
  `AbortSignal.timeout` inside the handler); loaders run on the server and
  during client navigation.

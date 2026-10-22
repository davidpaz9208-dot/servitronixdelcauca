import { useState, type FormEvent } from 'react'
import services from '@/data/services'

type FormState = 'idle' | 'pending' | 'success' | 'error'

const serviceOptions = [
  ...services.map((service) => ({ value: service.id, label: service.name })),
  { value: 'otro', label: 'Otro equipo o no estoy seguro' },
]

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [state, setState] = useState<FormState>('idle')
  const preselected =
    defaultService && serviceOptions.some((option) => option.value === defaultService) ? defaultService : ''

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/solicitud-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <form
      name="solicitud"
      method="POST"
      action="/solicitud-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state !== 'pending') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="solicitud" />
      <input type="hidden" name="subject" value="Nueva solicitud de servicio (%{submissionId})" />
      <p hidden>
        <label>
          No llenar este campo
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="flex flex-col gap-4 border-0 p-0">
        <div className="form-grid">
          <label className="field">
            <span>Nombre</span>
            <input name="nombre" autoComplete="name" required maxLength={100} />
          </label>
          <label className="field">
            <span>Teléfono</span>
            <input name="telefono" type="tel" autoComplete="tel" required maxLength={30} />
          </label>
          <label className="field">
            <span>
              Correo <em>(opcional)</em>
            </span>
            <input name="correo" type="email" autoComplete="email" maxLength={254} />
          </label>
          <label className="field">
            <span>Servicio</span>
            <select name="servicio" key={preselected} defaultValue={preselected} required>
              <option value="">Selecciona una línea…</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field form-wide">
            <span>
              Ciudad o barrio <em>(opcional)</em>
            </span>
            <input name="zona" maxLength={120} />
          </label>
          <label className="field form-wide">
            <span>Cuéntanos qué pasa con tu equipo</span>
            <textarea name="mensaje" required maxLength={2000} rows={4} />
          </label>
        </div>
        <button type="submit" className="btn-primary self-start">
          {state === 'pending' ? 'Enviando…' : 'Enviar solicitud'}
        </button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="form-alert">
          No pudimos confirmar el envío. Tus datos siguen en el formulario; por favor intenta de nuevo en unos minutos.
        </p>
      )}
      {state === 'success' && (
        <p role="status" className="form-ok">
          Recibimos tu solicitud. Te contactaremos para confirmar la fecha y la dirección de la visita.
        </p>
      )}
    </form>
  )
}

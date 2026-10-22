# Servitronix del Cauca — Servicio técnico de electrodomésticos

Sitio de presentación para un servicio técnico de mantenimiento y reparación de
electrodomésticos a domicilio en Popayán y el departamento del Cauca, Colombia:
televisores, equipos de sonido, neveras, lavadoras y otros equipos del hogar.

## Qué incluye

- Página principal con servicios destacados, proceso de trabajo, cobertura y
  formulario de solicitud de visita.
- Páginas de detalle por línea de servicio (`/servicios/tv-audio`,
  `/servicios/refrigeracion`, `/servicios/lavado`) con fallas comunes y llamado
  a solicitar el servicio.
- Formulario de contacto con Netlify Forms: las solicitudes quedan registradas
  en la pestaña **Forms** del proyecto en Netlify (configura las notificaciones
  por correo desde la interfaz: Forms → Submission notifications).
- Imágenes generadas con IA y servidas optimizadas mediante el Netlify Image
  CDN (formato WebP).

## Tecnologías

- [TanStack Start](https://tanstack.com/start) (React 19, enrutado por archivos)
- Tailwind CSS 4
- Netlify Forms + Netlify Image CDN
- Adapter de Netlify para Vite

## Desarrollo local

Requiere Node 22.13+ (o Node 24/26+).

```bash
npm install --no-package-lock
npm run dev        # servidor de desarrollo en el puerto 3000
npm run build      # compilación de producción en dist/client
```

Para probar el sitio completo con las funciones de la plataforma Netlify:

```bash
netlify dev --port 8888
```

## Personalización

- **Servicios y textos**: `src/data/services.ts` — editar o agregar líneas de
  servicio actualiza la portada, las páginas de detalle, el menú y las opciones
  del formulario.
- **Nombre y metadatos del sitio**: `siteName` y `siteDescription` en
  `src/routes/__root.tsx`.
- **Estilos y paleta**: `src/styles.css` (tokens de Tailwind en el bloque
  `@theme`).
- **Formulario**: los campos del formulario viven en
  `src/components/ContactForm.tsx` y deben copiarse idénticos en el archivo de
  registro `public/solicitud-form.html` para que Netlify los detecte.

## Nota

Los precios, garantías y horarios no se muestran como cifras fijas: la página
promete cotización antes de cada reparación en lugar de tarifas inventadas.
El teléfono y WhatsApp se dejaron fuera a propósito hasta tener los datos
reales de contacto del negocio.

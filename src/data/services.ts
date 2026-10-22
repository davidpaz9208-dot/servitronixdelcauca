export interface ServiceIssue {
  problem: string
  note: string
}

export interface Service {
  id: string
  code: string
  name: string
  tagline: string
  image: string
  shortDescription: string
  description: string
  includes: string[]
  commonIssues: ServiceIssue[]
  items: string[]
}

const services: Array<Service> = [
  {
    id: 'tv-audio',
    code: 'STX-01',
    name: 'Televisores y sonido',
    tagline: 'Pantallas y equipos de audio',
    image: '/img/servicio-tv.png',
    shortDescription:
      'Reparación de televisores LED y LCD, barras de sonido, receivers y minicomponentes. Fuentes de poder, tarjetas, backlight y conectores.',
    description:
      'Revisamos y reparamos televisores y equipos de audio de las principales marcas. Trabajamos a nivel de componente y de tarjeta: fuentes de poder, main, T-Con y backlight, además de conectores HDMI, secciones de audio y sintonía. Si el daño es de panel y no tiene reparación viable, te lo decimos con claridad antes de invertir en repuestos.',
    includes: [
      'Diagnóstico completo en tu domicilio o en taller',
      'Reparación de fuentes de poder, main y T-Con',
      'Cambio de backlight y componentes en placa',
      'Revisión de conectores HDMI, audio y sintonía',
    ],
    commonIssues: [
      { problem: 'El televisor no enciende o se apaga solo', note: 'Revisamos fuente de poder, fusibles y reguladores.' },
      { problem: 'Hay sonido pero la imagen se ve negra', note: 'Suele ser backlight o tarjeta T-Con en falla.' },
      { problem: 'Líneas, manchas o doble imagen', note: 'Diagnóstico de panel, matrices y flex.' },
      { problem: 'Puertos HDMI o audio que fallan', note: 'Cambio de conectores y limpieza de contactos.' },
    ],
    items: ['Televisores LED y LCD', 'Barras de sonido', 'Receivers y minicomponentes', 'Parlantes activos'],
  },
  {
    id: 'refrigeracion',
    code: 'STX-02',
    name: 'Neveras y congeladores',
    tagline: 'Refrigeración para tu cocina',
    image: '/img/servicio-nevera.png',
    shortDescription:
      'Mantenimiento y reparación de neveras, congeladores y enfriadores: termostatos, compresores, sellos y sistema de frío.',
    description:
      'Recuperamos el frío de tu cocina. Revisamos el circuito de refrigeración, compresores, termostatos, ventiladores, sellos de puerta y sistemas de deshielo. También hacemos mantenimiento preventivo para que tu nevera consuma menos energía y dure más años.',
    includes: [
      'Revisión del sistema de refrigeración y compresor',
      'Cambio de termostatos, sensores y ventiladores',
      'Reemplazo de sellos y ajuste de puertas',
      'Mantenimiento preventivo y limpieza de serpentines',
    ],
    commonIssues: [
      { problem: 'La nevera no enfría o enfría poco', note: 'Revisión de compresor, termostato y sistema de frío.' },
      { problem: 'Congela en exceso o forma escarcha', note: 'Revisión del sistema de deshielo y de los sellos.' },
      { problem: 'Gotea agua o hace ruidos extraños', note: 'Drenajes, bandeja evaporadora y motor del ventilador.' },
      { problem: 'El sello de la puerta ya no cierra bien', note: 'Cambio de empaque y alineación de puertas.' },
    ],
    items: ['Neveras de una y dos puertas', 'Congeladores horizontales', 'Enfriadores de bebidas', 'Dispensadores de agua'],
  },
  {
    id: 'lavado',
    code: 'STX-03',
    name: 'Lavadoras y secadoras',
    tagline: 'Lavado en casa, funcionando otra vez',
    image: '/img/servicio-lavadora.png',
    shortDescription:
      'Reparación de lavadoras automáticas y de dos tanques, y de secadoras: bombas, motores, bandas, rodamientos y tarjetas de control.',
    description:
      'Dejamos tu lavadora o secadora como debe ser. Reparamos sistemas de drenaje y llenado, motores, bandas, rodamientos, embragues, sensores y tarjetas de control, en cargas frontales, superiores y de dos tanques.',
    includes: [
      'Diagnóstico eléctrico y mecánico en domicilio',
      'Reparación de bombas de drenaje y llenado',
      'Cambio de bandas, rodamientos y embragues',
      'Revisión de tarjetas de control y sensores',
    ],
    commonIssues: [
      { problem: 'No desagua o deja la ropa empapada', note: 'Revisión de bomba, mangueras y filtro de drenaje.' },
      { problem: 'No centrifuga o hace ruidos fuertes', note: 'Embrague, rodamientos y balanceo de la tina.' },
      { problem: 'No enciende o los ciclos se cortan', note: 'Pruebas de tarjeta, sensores y cableado.' },
      { problem: 'Fuga de agua en la base', note: 'Sellos, mangueras y dispensador de detergente.' },
    ],
    items: ['Lavadoras automáticas', 'Lavadoras de dos tanques', 'Secadoras eléctricas', 'Lavasecadoras'],
  },
]

export default services

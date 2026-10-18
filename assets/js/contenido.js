/* =========================================================================
   MATERIAL DE LA WEB
   Cada elemento es una tarjeta. Para añadir material, copia un bloque { ... }
   y cambia sus datos. (Si configuras una hoja de Google en config.js, este
   archivo se ignora y el material se lee desde la hoja.)

   Campos:
     seccion     → "temas" | "oraciones" | "provincia"
     titulo      → texto corto
     descripcion → una o dos frases
     tipo        → "pdf" | "video" | "audio" | "presentacion" | "documento"
                   | "carpeta" | "enlace" | "texto"
     url         → enlace de Google Drive, YouTube, Docs... o ruta local
     fecha       → "AAAA-MM-DD"
     curso       → "2026-27"
     etiquetas   → ["Formación", "Adviento"...]
     destacado   → true para mostrarlo grande arriba
     texto       → (solo tipo "texto" y avisos) el contenido completo; separa párrafos con \n\n
     caduca      → (solo avisos) "AAAA-MM-DD": a partir del día siguiente pasa a «Avisos anteriores»

   CALENDARIO: usa seccion "calendario" con fecha, hora ("18:00"), lugar y
   descripcion. Aparecen en el calendario y en «Próximos encuentros».

   AVISOS: usa seccion "avisos". Con destacado: true sale como «Importante»,
   aparece primero y se muestra una notificación al entrar en la web.
   ========================================================================= */
window.SSCC_CONTENIDO = [
  /* -------------------------- CALENDARIO -------------------------- */
  // Primer trimestre del curso 2026-27 (calendario «Impulsados a actuar»)
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-10-05", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-10-05", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-10-05", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-10-09", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Esther)", fecha: "2026-10-11", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-10-11", hora: "18:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-10-19", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-10-19", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-10-19", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-10-23", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Esther)", fecha: "2026-10-25", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Misa María Auxiliadora", fecha: "2026-10-25", hora: "19:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-11-06", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Convivencia Centro SSCC", fecha: "2026-11-08", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Eucaristía con Hogares Don Bosco", fecha: "2026-11-08", hora: "19:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-16", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-11-16", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-16", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-11-20", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Esther)", fecha: "2026-11-22", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-22", hora: "18:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-23", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-11-23", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-23", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Adoración + Misa María Auxiliadora", fecha: "2026-11-24", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-30", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-11-30", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-30", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-12-04", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Retiro de Adviento", fecha: "2026-12-13", hora: "16:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Eucaristía (incluida en el retiro)", fecha: "2026-12-13", hora: "19:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-12-14", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-12-14", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-12-14", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-12-18", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Convivencia de Navidad", fecha: "2026-12-20", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Esther)", fecha: "2026-12-20", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-12-20", hora: "18:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Nochebuena", fecha: "2026-12-24", curso: "2026-27" },
  { seccion: "calendario", titulo: "Navidad", fecha: "2026-12-25", curso: "2026-27" },

  /* ---------------------------- AVISOS --------------------------- */
  {
    seccion: "avisos",
    titulo: "¡Estrenamos web!",
    fecha: "2026-10-18",
    texto: "Ya tenemos nuestro propio espacio en internet. Aquí encontrarás los temas de formación, las oraciones de los encuentros y todo lo que nos envía el Consejo Provincial.\n\nSi tienes material que quieras compartir con el centro, háblalo con el consejo local."
  },
  {
    seccion: "avisos",
    titulo: "La Misa del sábado 24 pasa al domingo 25 a las 19:30",
    fecha: "2026-10-18",
    caduca: "2026-10-25",
    destacado: true,
    texto: "Este mes la Misa de María Auxiliadora no será el sábado 24: la celebramos el domingo 25 de octubre a las 19:30."
  },
  {
    seccion: "avisos",
    titulo: "Calendario del primer trimestre",
    fecha: "2026-10-13",
    caduca: "2026-12-25",
    texto: "Ya tenéis las fechas de octubre, noviembre y diciembre del curso 2026-27 «Impulsados a actuar». Están todas en el calendario de la web y podéis añadirlas a vuestro móvil con un clic.",
    url: "material/calendario/primer-trimestre-2026-27.jpg"
  },

  /* ---------------------------- TEMAS ---------------------------- */
  {
    seccion: "temas",
    titulo: "Santos de la puerta de al lado",
    descripcion: "La santidad salesiana, un camino para todos. Dos sesiones: «Una llamada para todos» y «Una familia de santos».",
    tipo: "pdf",
    url: "material/temas/santos-de-la-puerta-de-al-lado.pdf",
    fecha: "2026-10-15",
    curso: "2026-27",
    etiquetas: ["Formación", "Santidad"],
    destacado: true
  },
  {
    seccion: "temas",
    titulo: "Proyecto de Vida Apostólica (ejemplo)",
    descripcion: "Lectura comentada del PVA. Sustituye este ejemplo por el enlace de Drive del documento.",
    tipo: "documento",
    url: "",
    fecha: "2026-09-20",
    curso: "2026-27",
    etiquetas: ["Formación", "PVA"]
  },
  {
    seccion: "temas",
    titulo: "Vídeo: el sueño de los nueve años (ejemplo)",
    descripcion: "Material audiovisual para el encuentro. Pega aquí el enlace de YouTube o de Drive.",
    tipo: "video",
    url: "",
    fecha: "2026-09-10",
    curso: "2026-27",
    etiquetas: ["Don Bosco"]
  },
  {
    seccion: "temas",
    titulo: "Presentación del curso (ejemplo)",
    descripcion: "Diapositivas del primer encuentro del curso en Presentaciones de Google.",
    tipo: "presentacion",
    url: "",
    fecha: "2026-09-05",
    curso: "2026-27",
    etiquetas: ["Curso"]
  },

  /* -------------------------- ORACIONES -------------------------- */
  {
    seccion: "oraciones",
    titulo: "Oración para comenzar el encuentro",
    descripcion: "Una oración breve para abrir cada reunión del centro.",
    tipo: "texto",
    fecha: "2026-10-01",
    curso: "2026-27",
    etiquetas: ["Encuentros"],
    destacado: true,
    texto: "Señor Jesús, aquí estamos, reunidos en tu nombre como familia de Don Bosco.\n\nAbre nuestros oídos para escucharnos, nuestro corazón para acogernos y nuestras manos para servir a los jóvenes que nos confías.\n\nQue María Auxiliadora nos acompañe en este rato y nos enseñe a vivir con alegría lo que hoy compartimos.\n\nAmén."
  },
  {
    seccion: "oraciones",
    titulo: "Oración de envío",
    descripcion: "Para terminar el encuentro y volver a la vida cotidiana.",
    tipo: "texto",
    fecha: "2026-10-01",
    curso: "2026-27",
    etiquetas: ["Encuentros"],
    texto: "Gracias, Padre, por este tiempo compartido.\n\nEnvíanos a nuestras casas, trabajos y parroquias como sal y fermento, con el estilo sencillo y alegre de Don Bosco.\n\nQue sepamos ver tu rostro en cada joven y en cada persona que encontremos esta semana.\n\nAmén."
  },
  {
    seccion: "oraciones",
    titulo: "Oración de Adviento (ejemplo)",
    descripcion: "Plantilla en PDF para la oración de los domingos de Adviento.",
    tipo: "pdf",
    url: "",
    fecha: "2026-11-28",
    curso: "2026-27",
    etiquetas: ["Adviento"]
  },
  {
    seccion: "oraciones",
    titulo: "Canción para la oración (ejemplo)",
    descripcion: "Audio o vídeo para acompañar un momento de silencio.",
    tipo: "audio",
    url: "",
    fecha: "2026-10-05",
    curso: "2026-27",
    etiquetas: ["Música"]
  },

  /* -------------------------- PROVINCIA -------------------------- */
  {
    seccion: "provincia",
    titulo: "Carta de inicio de curso del Consejo Provincial (ejemplo)",
    descripcion: "Comunicado enviado por el Consejo Provincial. Sustituye por el PDF recibido.",
    tipo: "pdf",
    url: "",
    fecha: "2026-09-15",
    curso: "2026-27",
    etiquetas: ["Comunicado"],
    destacado: true
  },
  {
    seccion: "provincia",
    titulo: "Calendario provincial 2026-27 (ejemplo)",
    descripcion: "Fechas de encuentros, retiros y Consulta del curso.",
    tipo: "documento",
    url: "",
    fecha: "2026-09-01",
    curso: "2026-27",
    etiquetas: ["Calendario"]
  },
  {
    seccion: "provincia",
    titulo: "Materiales de la Asamblea Provincial (ejemplo)",
    descripcion: "Carpeta compartida de Drive con todos los documentos de la Asamblea.",
    tipo: "carpeta",
    url: "",
    fecha: "2026-06-10",
    curso: "2025-26",
    etiquetas: ["Asamblea"]
  }
];

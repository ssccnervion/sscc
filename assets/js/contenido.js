/* =========================================================================
   MATERIAL DE LA WEB
   Cada elemento es una tarjeta. Para añadir material, copia un bloque { ... }
   y cambia sus datos. (Si configuras una hoja de Google en config.js, este
   archivo se ignora y el material se lee desde la hoja.)

   Campos:
     seccion     → "temas" | "oraciones" | "provincia" | "documentos" | "avisos" | "calendario"
                   | "grupos" | "elenco" | "novedades" | "provincia-web"
     titulo      → texto corto
     descripcion → una o dos frases
     tipo        → "pdf" | "video" | "audio" | "presentacion" | "documento"
                   | "carpeta" | "enlace" | "texto"
     url         → enlace de Google Drive, YouTube, Docs... o ruta local
     fecha       → "AAAA-MM-DD"
     curso       → "2026-27"  (sin curso = permanente: se ve siempre; con curso, los
                   anteriores quedan como histórico y se consultan con el selector)
     etiquetas   → ["Formación", "Adviento"...]
     destacado   → true para mostrarlo grande arriba
     texto       → (solo tipo "texto" y avisos) el contenido completo; separa párrafos con \n\n
     caduca      → (solo avisos) "AAAA-MM-DD": a partir del día siguiente pasa a «Avisos anteriores»

   WEB DE LA PROVINCIA: usa seccion "provincia-web" para enlazar lo que publica
   cooperadores-pma.org. En etiquetas va la categoría ("Proyecto anual",
   "Formación"...), en url la página del curso y en archivo la página con los
   cursos anteriores. Cada curso nuevo basta con cambiar titulo, curso y url.

   DOCUMENTOS DEL CENTRO: usa seccion "documentos" y en etiquetas la categoría:
   "Proyecto de centro", "Actas" o "Memoria".

   CALENDARIO: usa seccion "calendario" con fecha, hora ("18:00"), lugar y
   descripcion. fin: "AAAA-MM-DD" para eventos de varios días.
   ambito: "centro" (por defecto) | "provincia" | "region". Aparecen en el calendario y en «Próximos encuentros».

   AVISOS: usa seccion "avisos". Con destacado: true sale como «Importante» y
   aparece primero; con emergente: true sale además como ventana emergente.
   imagen: cartel del aviso · url: enlace (p. ej. formulario de inscripción).
   evento: fecha de lo que anuncia (y fin si dura varios días): es la que se ve en el aviso.
   Sin «caduca» ni «evento», el aviso pasa a «Fechas anteriores» al mes de su fecha.
   ========================================================================= */
window.SSCC_CONTENIDO = [
  /* ---------------------- WEB DE LA PROVINCIA ---------------------- */
  {
    seccion: "provincia-web",
    titulo: "«Impulsados a actuar»",
    descripcion: "El lema de los Salesianos Cooperadores de la Provincia María Auxiliadora para el curso 2026-2027.",
    url: "https://youtu.be/_PS2MoAvcPI",
    curso: "2026-27",
    etiquetas: ["Lema"]
  },
  {
    seccion: "provincia-web",
    titulo: "Plan trienal 2024-2027",
    descripcion: "Las prioridades de la Provincia para estos tres cursos, que orientan el proyecto de cada año.",
    url: "https://cooperadores-pma.org/Documentos/Planes-Trienales/Plan-Trienal-2024-2027/",
    archivo: "https://cooperadores-pma.org/Documentos/Planes-Trienales/",
    curso: "2024-27",
    etiquetas: ["Plan trienal"]
  },
  {
    seccion: "provincia-web",
    titulo: "Proyecto anual 2026-2027",
    descripcion: "El proyecto de la Provincia María Auxiliadora para este curso: objetivos y líneas de acción para todos los centros.",
    url: "https://cooperadores-pma.org/Documentos/Proyectos-Anuales/Proyecto-2026-2027/",
    archivo: "https://cooperadores-pma.org/Documentos/Proyectos-Anuales/",
    curso: "2026-27",
    etiquetas: ["Proyecto anual"]
  },
  {
    seccion: "provincia-web",
    titulo: "Plan de formación 2026-2027",
    descripcion: "Los temas y materiales de formación que propone el Consejo Provincial para este curso.",
    url: "https://cooperadores-pma.org/Consejo-Provincial/Formacion/Plan-de-formacion-2026-2027/",
    archivo: "https://cooperadores-pma.org/Consejo-Provincial/Formacion/",
    curso: "2026-27",
    etiquetas: ["Formación"]
  },

  /* --------------------- DOCUMENTOS DEL CENTRO --------------------- */
  {
    seccion: "documentos",
    titulo: "Propuestas y compromisos para el curso 2026-2027",
    descripcion: "Las cinco líneas del curso: fe y espiritualidad, Doctrina Social de la Iglesia, formación salesiana, realidad social actual y más espacios de convivencia.",
    tipo: "imagen",
    url: "material/documentos-centro/proyecto/propuestas-y-compromisos-2026-27.jpg",
    fecha: "2026-10-19",
    curso: "2026-27",
    etiquetas: ["Proyecto de centro"],
    destacado: true
  },
  {
    seccion: "documentos",
    titulo: "Acta del encuentro de centro · 19 de septiembre",
    descripcion: "Evaluación del curso anterior, grupos de formación y acompañamiento, acuerdos y prioridades del curso 2026-27.",
    tipo: "pdf",
    url: "material/documentos-centro/actas/2026-09-19-acta-encuentro-de-centro.pdf",
    fecha: "2026-09-19",
    curso: "2026-27",
    etiquetas: ["Actas"],
    destacado: true
  },

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
  { seccion: "calendario", titulo: "Encuentro de centro: convivencia SSCC", fecha: "2026-11-08", hora: "18:00", curso: "2026-27", descripcion: "Merienda compartida y «¿Dónde desarrollo mi misión como salesiano cooperador?»" },
  { seccion: "calendario", titulo: "Eucaristía con Hogares Don Bosco", fecha: "2026-11-08", hora: "19:30", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-16", hora: "18:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (May)", fecha: "2026-11-16", hora: "19:00", curso: "2026-27" },
  { seccion: "calendario", titulo: "Grupo referencia", fecha: "2026-11-16", hora: "19:15", curso: "2026-27" },
  { seccion: "calendario", titulo: "Aspirantes (Antonio)", fecha: "2026-11-20", hora: "17:00", curso: "2026-27" },
  { seccion: "calendario", ambito: "provincia", titulo: "Encuentros Pinardi", fecha: "2026-11-21", fin: "2026-11-22", lugar: "Casa de Espiritualidad «El Pilar», Sanlúcar la Mayor", curso: "2026-27", descripcion: "Tres encuentros en uno: aspirantes, coordinadores y todos los SSCC. Inscripción hasta el 8 de noviembre." },
  { seccion: "calendario", ambito: "provincia", titulo: "Fin del plazo de inscripción a Pinardi", fecha: "2026-11-08", curso: "2026-27" },
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

  /* ------------------- CALENDARIO: PROVINCIA Y REGIÓN ------------------- */
  // Del «Calendario de eventos 2026-2027» de la Provincia y del calendario del Consejo Provincial y la Región.
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Primera toma de contacto", "fecha": "2026-08-26", "lugar": "Online", "descripcion": "Reunión del Consejo Provincial para iniciar el curso 2026-27.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Presentación del Lema 2026-27", "fecha": "2026-08-28", "lugar": "Correo y redes", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Envío de la Propuesta de Formación 2026-27", "fecha": "2026-08-29", "lugar": "Correo y redes", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Envío del Proyecto Anual 2026-27", "fecha": "2026-08-29", "lugar": "Correo y redes", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Ejercicios Espirituales de Discernimiento", "fecha": "2026-09-04", "fin": "2026-09-06", "lugar": "Canarias", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Reuniones online con los Consejos Locales", "fecha": "2026-09-09", "fin": "2026-09-10", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Seguimiento mensual", "fecha": "2026-09-16", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Recepción de expedientes de Promesas para Canarias", "fecha": "2026-09-29", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Ejercicios Espirituales de Discernimiento", "fecha": "2026-10-02", "fin": "2026-10-04", "lugar": "Córdoba", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejos Locales FASA", "fecha": "2026-10-03", "lugar": "Sevilla", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Consulta Regional", "fecha": "2026-10-03", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Seguimiento mensual", "fecha": "2026-10-07", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Musical Getsemaní (ensayo)", "fecha": "2026-10-11", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "XXXVII Encuentro Canario", "fecha": "2026-10-24", "lugar": "Canarias", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Preparación de Promesas", "fecha": "2026-11-04", "lugar": "Online", "descripcion": "Aprobación de expedientes de promesas.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Congreso Regional", "fecha": "2026-11-07", "fin": "2026-11-08", "lugar": "El Escorial", "descripcion": "Encuentro que reúne a los consejos provinciales de toda la Región.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Musical Getsemaní", "fecha": "2026-11-28", "lugar": "Puertollano", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Recepción de expedientes de Promesas para los Encuentros de Zona", "fecha": "2026-11-29", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Pleno", "fecha": "2026-12-18", "fin": "2026-12-20", "lugar": "Málaga", "descripcion": "Aprobación de expedientes de promesas y revisión del primer trimestre.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Extremadura", "fecha": "2027-01-09", "lugar": "Extremadura", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Escuela de Dinamizadores", "fecha": "2027-01-09", "fin": "2027-01-10", "lugar": "Madrid", "descripcion": "Formación y liderazgo de los animadores de centros.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Gestión", "fecha": "2027-01-13", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Huelva-Sevilla", "fecha": "2027-01-16", "lugar": "Huelva-Sevilla", "descripcion": "Nuestra zona.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Cádiz", "fecha": "2027-01-17", "lugar": "Cádiz", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Proyecto SOLERA y Jornadas de Espiritualidad de la FASA", "fecha": "2027-01-18", "fin": "2027-01-25", "lugar": "Turín", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Corazones Arremangados", "fecha": "2027-01-23", "lugar": "Online", "descripcion": "Servicio y acción social.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Tras las huellas de Don Bosco", "fecha": "2027-02-05", "fin": "2027-02-07", "lugar": "Barcelona", "descripcion": "Encuentro formativo sobre el carisma salesiano.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Córdoba", "fecha": "2027-02-13", "lugar": "Córdoba", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Jaén", "fecha": "2027-02-13", "lugar": "Jaén", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Encuentro de Zona · Granada-Málaga", "fecha": "2027-02-14", "lugar": "Granada-Málaga", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Gestión", "fecha": "2027-02-17", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Ejercicios Espirituales · Extremadura", "fecha": "2027-02-19", "fin": "2027-02-21", "lugar": "Villagonzalo", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Ejercicios Espirituales y EE.EE. de Discernimiento", "fecha": "2027-02-26", "fin": "2027-02-28", "lugar": "Chipiona", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Musical Getsemaní", "fecha": "2027-02-27", "fin": "2027-02-28", "lugar": "León", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Musical Getsemaní (por confirmar)", "fecha": "2027-03-06", "lugar": "Córdoba", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Reunión", "fecha": "2027-03-10", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Consulta Regional", "fecha": "2027-03-15", "lugar": "Online", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Entrega de expedientes de Promesas para la Asamblea", "fecha": "2027-03-21", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Fin de la presentación de candidaturas al Consejo Provincial", "fecha": "2027-03-23", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Promesas", "fecha": "2027-04-07", "lugar": "Online", "descripcion": "Aprobación de expedientes de cara a la Asamblea Provincial.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Envío de la papeleta electoral a los Consejos Locales", "fecha": "2027-04-09", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Congreso y Asamblea Provincial", "fecha": "2027-04-23", "fin": "2027-04-25", "lugar": "Pilas", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Aquí estoy", "fecha": "2027-04-30", "fin": "2027-05-02", "lugar": "Oporto", "descripcion": "Encuentro internacional de jóvenes cooperadores de toda la Región.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Consulta Regional", "fecha": "2027-06-05", "lugar": "Madrid", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "provincia", "titulo": "Consejo Provincial · Relevo y programación", "fecha": "2027-07-02", "fin": "2027-07-04", "lugar": "Antequera", "descripcion": "Relevo de cargos y programación del próximo curso.", "curso": "2026-27"},
  {"seccion": "calendario", "ambito": "region", "titulo": "Ejercicios Espirituales", "fecha": "2027-07-14", "fin": "2027-07-18", "lugar": "El Paular", "curso": "2026-27"},

  /* ---------------------------- AVISOS --------------------------- */
  {
    seccion: "avisos",
    titulo: "Nos vemos en Pinardi · 21 y 22 de noviembre",
    fecha: "2026-10-19",
    evento: "2026-11-21",
    fin: "2026-11-22",
    caduca: "2026-11-08",
    destacado: true,
    emergente: true,
    texto: "Encuentro provincial en la Casa de Espiritualidad «El Pilar» (Sanlúcar la Mayor) para aspirantes, coordinadores con administradores y secretarios, y todos los Salesianos Cooperadores. *Inscripción y pago hasta el 8 de noviembre.*",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSch8nPPChSLaKBMGfxXY0OtssD_XUNujXCfschZ7vxSjFqgOQ/viewform",
    imagen: "material/provincia/encuentro-pinardi-2026.jpg"
  },
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
    evento: "2026-10-25",
    caduca: "2026-10-25",
    destacado: true,
    emergente: true,
    texto: "Este mes la Misa de María Auxiliadora no será el sábado 24: la celebramos el domingo 25 de octubre a las 19:30."
  },
  {
    seccion: "avisos",
    titulo: "Encuentro de centro · 8 de noviembre",
    fecha: "2026-10-18",
    evento: "2026-11-08",
    caduca: "2026-11-08",
    texto: "¡Tenemos encuentro de centro! Todos los detalles, en el cartel.",
    url: "material/calendario/encuentro-de-centro-8nov26.jpg"
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

  /* -------------------------- ORACIONES -------------------------- */

  /* ----------------------------- GRUPOS ---------------------------- */
  // Del acta del encuentro de centro del 19 de septiembre de 2026.
  // descripcion = día y hora · lugar = quién acompaña · texto = miembros (uno por línea)
  {"seccion": "grupos", "titulo": "Grupo 1", "descripcion": "Lunes · 18:00 h", "lugar": "", "texto": "Angela Triviño\nEva\nCarolina\nMarian\nElisa\nCristina\nCharo", "etiquetas": ["Formación"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "Grupo 2", "descripcion": "Lunes · 19:15 h", "lugar": "", "texto": "May\nLoli\nLidia\nAngela Carranza\nElena\nAntonio\nSusana\nEsther\nChari\nMª José", "etiquetas": ["Formación"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "Grupo 3", "descripcion": "Domingo · 18:30 h", "lugar": "", "texto": "Sandra\nBlanca\nRocío\nIsa Santana\nLaura\nCarmen María", "etiquetas": ["Formación"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "SSCC sin grupo asignado", "descripcion": "", "lugar": "", "texto": "Carmen Seda\nMariló\nAuxi\nMarina", "etiquetas": ["Formación"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "Aspirantes · Grupo 1", "descripcion": "Jueves", "lugar": "May", "texto": "", "etiquetas": ["Aspirantes"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "Aspirantes · Grupo 2", "descripcion": "Viernes · 17:00 h", "lugar": "Antonio / Cristina", "texto": "", "etiquetas": ["Aspirantes"], "curso": "2026-27", "fecha": "2026-09-19"},
  {"seccion": "grupos", "titulo": "Aspirantes · Grupo 3", "descripcion": "Domingos · 18:00 h", "lugar": "Esther", "texto": "", "etiquetas": ["Aspirantes"], "curso": "2026-27", "fecha": "2026-09-19"},

  /* ----------------------------- ELENCO ---------------------------- */
  // Cada persona: { seccion: "elenco", titulo: "Nombre", descripcion: "Salesiana cooperadora desde 2015", imagen: "ruta o enlace de la foto", url: "vídeo (opcional)" }
  // Del censo del centro (solo nombre, primer apellido y año de la Promesa). Las fotos se añaden desde el panel con el mismo nombre.
  {"seccion": "elenco", "titulo": "Laura Iris Márquez", "descripcion": "Salesiana cooperadora desde 2022"},
  {"seccion": "elenco", "titulo": "Mª Ángeles Carranza", "descripcion": "Salesiana cooperadora desde 2019"},
  {"seccion": "elenco", "titulo": "Eva Mª Carrillo", "descripcion": "Salesiana cooperadora desde 2016"},
  {"seccion": "elenco", "titulo": "María Angeles Chavez", "descripcion": "Salesiana cooperadora desde 2012"},
  {"seccion": "elenco", "titulo": "Maria Auxiliadora Duque", "descripcion": "Salesiana cooperadora desde 1998"},
  {"seccion": "elenco", "titulo": "María Dolores Galan", "descripcion": "Salesiana cooperadora desde 1988"},
  {"seccion": "elenco", "titulo": "Rosario García", "descripcion": "Salesiana cooperadora desde 2016"},
  {"seccion": "elenco", "titulo": "Antonio García", "descripcion": "Salesiano cooperador desde 2011"},
  {"seccion": "elenco", "titulo": "Susana González", "descripcion": "Salesiana cooperadora desde 1984"},
  {"seccion": "elenco", "titulo": "María Elena González", "descripcion": "Salesiana cooperadora desde 2003"},
  {"seccion": "elenco", "titulo": "María José Hoyos", "descripcion": "Salesiana cooperadora desde 1997"},
  {"seccion": "elenco", "titulo": "María Dolores Jimenez", "descripcion": "Salesiana cooperadora desde 2003"},
  {"seccion": "elenco", "titulo": "María Angeles Martínez", "descripcion": "Salesiana cooperadora desde 2005"},
  {"seccion": "elenco", "titulo": "Lidia Medina", "descripcion": "Salesiana cooperadora desde 1998"},
  {"seccion": "elenco", "titulo": "Carmen María Muñoz", "descripcion": "Salesiana cooperadora desde 2011"},
  {"seccion": "elenco", "titulo": "Cristina Quiros", "descripcion": "Salesiana cooperadora desde 2012"},
  {"seccion": "elenco", "titulo": "Elisa Sanchez", "descripcion": "Salesiana cooperadora desde 2012"},
  {"seccion": "elenco", "titulo": "Carmen Sedas", "descripcion": "Salesiana cooperadora desde 2016"},
  {"seccion": "elenco", "titulo": "Marina Tascón", "descripcion": "Salesiana cooperadora desde 2018"},
  {"seccion": "elenco", "titulo": "Sandra Tolmo", "descripcion": "Salesiana cooperadora desde 2005"},
  {"seccion": "elenco", "titulo": "Angela Triviño", "descripcion": "Salesiana cooperadora desde 1999"},
  {"seccion": "elenco", "titulo": "Esther Uruñuela", "descripcion": "Salesiana cooperadora desde 2001"},
  {"seccion": "elenco", "titulo": "Rosario Uruñuela", "descripcion": "Salesiana cooperadora desde 2006"},
  {"seccion": "elenco", "titulo": "Blanca Vázquez", "descripcion": "Salesiana cooperadora desde 2018"},
  {"seccion": "elenco", "titulo": "Carolina Alfaro", "descripcion": "Salesiana cooperadora desde 2026"},
  {"seccion": "elenco", "titulo": "Isabel Santana", "descripcion": "Salesiana cooperadora desde 2026"},
  {"seccion": "elenco", "titulo": "Rocío Vázquez", "descripcion": "Salesiana cooperadora desde 2026"},

  /* --------------------------- NOVEDADES -------------------------- */
  // Para anunciar en el tablón cambios de la web que no son material (nueva sección, Quiénes somos…)
  { seccion: "novedades", titulo: "Nueva sección: Proyecto de Vida Apostólica (PVA)", descripcion: "Léelo con índice, descárgalo o recórrelo con los vídeos del PVA ¡vivo!", url: "pva.html", fecha: "2026-10-19" },

  /* ----------------------------- HIMNO ----------------------------- */
  {
    seccion: "oraciones",
    titulo: "Himno «Soñadores de vida» · canción",
    descripcion: "Himno de los Salesianos Cooperadores de la Provincia María Auxiliadora. Letra y música: Javi Bernal.",
    tipo: "audio",
    url: "material/himno/himno-sscc-pma-sonadores-de-vida.mp3",
    fecha: "2026-10-18",
    etiquetas: ["Himno", "Música"]
  },
  {
    seccion: "oraciones",
    titulo: "Himno «Soñadores de vida» · letra",
    descripcion: "La letra del himno con el formato corporativo, lista para imprimir.",
    tipo: "pdf",
    url: "material/himno/himno-sscc-pma-letra.pdf",
    fecha: "2026-10-18",
    etiquetas: ["Himno"]
  },
  {
    seccion: "oraciones",
    titulo: "Himno «Soñadores de vida» · acordes",
    descripcion: "Letra con los acordes para guitarra.",
    tipo: "pdf",
    url: "material/himno/himno-sscc-pma-acordes.pdf",
    fecha: "2026-10-18",
    etiquetas: ["Himno", "Música"]
  },

  /* -------------------------- PROVINCIA -------------------------- */
  {
    seccion: "provincia",
    titulo: "Nos vemos en Pinardi · Encuentro provincial 21-22 de noviembre",
    descripcion: "Comunicado del Consejo Provincial: tres encuentros en uno para aspirantes, coordinadores y todos los SSCC. Inscripción hasta el 8 de noviembre.",
    tipo: "texto",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSch8nPPChSLaKBMGfxXY0OtssD_XUNujXCfschZ7vxSjFqgOQ/viewform",
    imagen: "material/provincia/encuentro-pinardi-2026.jpg",
    fecha: "2026-10-19",
    curso: "2026-27",
    etiquetas: ["Comunicado", "Encuentros"],
    destacado: true,
    texto: "En este año, en que somos impulsados a actuar como nos marca nuestro Proyecto de Vida Apostólica y nuestra fe, somos invitados a vivir la experiencia del *Encuentro Pinardi durante los días 21 y 22 de noviembre*. Este es un encuentro que hace realidad que somos una casa que acoge, como Pinardi, y que se llena de tres encuentros donde mostrar la grandeza de nuestra vocación. Estamos invitados a disfrutarlo: somos invitados tres grupos de hermanos para vivir este momento de Pinardi.\n\n- Quienes están en la *etapa de formación inicial, los/las ASPIRANTES*. Especialmente para quienes están en los primeros tres años del proceso como aspirantes a Salesianos Cooperadores.\n- Quienes *prestáis el servicio de COORDINACIÓN junto a los ADMINISTRADORES y/o SECRETARIOS*. Para profundizar en aspectos organizativos y de gestión dentro de la Asociación y de nuestra Provincia.\n- Quienes vivís la grandeza de nuestro carisma, es decir, *todos los Salesianos Cooperadores para disfrutar del centro de nuestra vocación: el encuentro personal y comunitario con Dios*.\n\nLo celebraremos en la *Casa de Espiritualidad de las Salesianas «El Pilar» en Sanlúcar la Mayor*.\n\nTodos *nos inscribiremos por medio del formulario que aparece capturando el QR* que hay en el cartel o en este enlace: https://docs.google.com/forms/d/e/1FAIpQLSch8nPPChSLaKBMGfxXY0OtssD_XUNujXCfschZ7vxSjFqgOQ/viewform\n\nRecuerda que el *plazo para inscribirse y formalizar el pago* se abre desde hoy *hasta el 8 de noviembre*.\n\n*Te esperamos para impulsarnos a actuar* y seguir creciendo como salesianos en el mundo."
  },
  {
    seccion: "provincia",
    titulo: "Calendario de eventos 2026-2027 de la Provincia",
    descripcion: "Todas las fechas provinciales del curso. También están en el calendario de la web, con el símbolo morado.",
    tipo: "imagen",
    url: "material/calendario/calendario-provincia-2026-27.jpg",
    fecha: "2026-10-19",
    curso: "2026-27",
    etiquetas: ["Calendario"]
  },
  {
    seccion: "provincia",
    titulo: "Calendario 2026-2027 del Consejo Provincial y de la Región",
    descripcion: "Reuniones del Consejo Provincial y eventos de la Región Ibérica. En el calendario de la web, la Región lleva el símbolo naranja.",
    tipo: "imagen",
    url: "material/calendario/calendario-region-2026-27.jpg",
    fecha: "2026-10-19",
    curso: "2026-27",
    etiquetas: ["Calendario"]
  }
];

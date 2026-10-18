/* =========================================================================
   CONFIGURACIÓN GENERAL DE LA WEB
   Edita este archivo para conectar la web con la cuenta de Google del centro.
   (Ver GUIA.md para el paso a paso.)
   ========================================================================= */
window.SSCC_CONFIG = {
  centro: "Centro Nervión",
  ciudad: "Sevilla",
  provincia: "Provincia María Auxiliadora",

  // Webs oficiales de la Asociación
  webProvincia: "https://cooperadores-pma.org/Inicio/",
  webRegion: "https://cooperadores.org/",

  // Correo de contacto (la cuenta de Google que vais a crear).
  // También es donde llega el formulario «Enviar material» (servicio gratuito
  // FormSubmit: el primer envío manda un correo de activación que hay que confirmar).
  email: "",

  // (Opcional) Si preferís usar un Formulario de Google, pega aquí su enlace
  // "insertar" (…/viewform?embedded=true) y sustituirá al formulario de la web.
  formularioGoogle: "",

  // Redes sociales (dejar "" si no se usan)
  instagram: "",
  youtube: "",

  /* Hoja de cálculo de Google publicada como CSV.
     Si se rellena, la web carga TODO el material desde la hoja
     (y deja de usar assets/js/contenido.js).
     Archivo > Compartir > Publicar en la web > Hoja 1 > CSV  → pega aquí el enlace. */
  hojaCalculoCSV: "",

  /* (Opcional) ID de un Google Calendar público. Si se rellena, sustituye
     al calendario de la web por el de Google.
     ID del Google Calendar del centro (Configuración del calendario >
     Integrar el calendario > ID del calendario). Ej: "abc123@group.calendar.google.com" */
  calendarioGoogle: "",

  // Carpetas de Google Drive compartidas (enlace "Cualquier persona con el enlace")
  carpetas: {
    temas: "",
    oraciones: "",
    provincia: ""
  },

  // Dirección para el mapa de "Quiénes somos"
  direccionMapa: "Salesianos Nervión, Sevilla",

  // Encuentros extra (opcional). Lo normal es ponerlos en contenido.js
  // o en la hoja de Google con seccion "calendario".
  proximosEncuentros: []
};

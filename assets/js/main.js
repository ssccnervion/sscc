/* =========================================================================
   Salesianos Cooperadores · Centro Nervión — comportamiento de la web
   ========================================================================= */
(function () {
  "use strict";

  const CFG = window.SSCC_CONFIG || {};
  const PAGINA = document.body.dataset.pagina || "inicio";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------- Iconos */
  const I = {
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    flechaDiag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    buscar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    externo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    presentacion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    documento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 4h14M5 9h14M5 14h14M5 19h9"/></svg>',
    carpeta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    enlace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>',
    texto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3v18M6 9h12"/></svg>',
    correo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    lugar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    imagen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-9 8"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  const TIPOS = {
    pdf: "PDF", video: "Vídeo", audio: "Audio", presentacion: "Presentación",
    documento: "Documento", carpeta: "Carpeta", enlace: "Enlace", texto: "Texto", imagen: "Imagen"
  };

  const NAV = [
    { id: "inicio", texto: "Inicio", href: "index.html" },
    { id: "material", texto: "Material", href: "material.html", hijos: [
      { id: "temas", cod: "1A", texto: "Temas", href: "temas.html", desc: "Formación de cada curso" },
      { id: "oraciones", cod: "1B", texto: "Oraciones", href: "oraciones.html", desc: "Oraciones e himno" },
      { id: "documentos", cod: "1C", texto: "Documentos del centro", href: "documentos.html", desc: "Proyecto, actas y memoria" }
    ] },
    { id: "calendario", texto: "Calendario", href: "calendario.html", hijos: [
      { id: "calendario-mes", cod: "2A", texto: "Calendario", href: "calendario.html#mes", desc: "Vista del mes con símbolos" },
      { id: "calendario-prox", cod: "2B", texto: "Próximos encuentros", href: "calendario.html#proximos", desc: "La lista de lo que viene" }
    ] },
    { id: "quienes-somos", texto: "Quiénes somos", href: "quienes-somos.html" },
    { id: "provincia", texto: "Provincia", href: "provincia.html" },
    { id: "avisos", texto: "Avisos", href: "avisos.html" },
    { id: "enviar", texto: "Enviar material", href: "enviar.html", cta: true }
  ];

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const fechaLarga = (f) => {
    const d = new Date(f + "T12:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  };

  /* ----------------------------------------------------- Cabecera y pie */
  function pintarCabecera() {
    const header = document.createElement("header");
    header.className = "cabecera";
    header.innerHTML = `
      <div class="contenedor">
        <a class="marca" href="index.html" aria-label="Inicio">
          <img class="logo-blanco" src="assets/img/logo-blanco.png" alt="">
          <img class="logo-azul" src="assets/img/logo-color.png" alt="">
          <span><b>Salesianos Cooperadores</b><small>${esc(CFG.centro || "")} · ${esc(CFG.ciudad || "")}</small></span>
        </a>
        <nav aria-label="Principal">
          <ul class="menu" id="menu">
            ${NAV.map((n) => {
              const activo = n.id === PAGINA || (n.hijos || []).some((h) => h.id === PAGINA);
              if (!n.hijos) return `<li><a href="${n.href}"${n.cta ? ' class="menu-cta"' : ""}${activo ? ' aria-current="page"' : ""}>${n.texto}</a></li>`;
              return `<li class="con-sub"><a href="${n.href}"${activo ? ' aria-current="page"' : ""}>${n.texto}<svg class="flechita" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></a>
                <div class="submenu">${n.hijos.map((h) => `<a href="${h.href}"${h.id === PAGINA ? ' aria-current="true"' : ""}><b>${h.cod ? `<span class="cod">${h.cod}</span> ` : ""}${h.texto}</b><small>${h.desc}</small></a>`).join("")}</div></li>`;
            }).join("")}
          </ul>
        </nav>
        <button class="btn-app-cab" data-instalar hidden aria-label="Descargar la app">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span>App</span>
        </button>
        <button class="hamburguesa" aria-label="Abrir menú" aria-controls="menu" aria-expanded="false"><i></i><i></i><i></i></button>
      </div>`;
    document.body.prepend(header);

    const barra = document.createElement("div");
    barra.className = "progreso";
    document.body.prepend(barra);

    const btn = $(".hamburguesa", header);
    btn.addEventListener("click", () => {
      const abierto = document.body.classList.toggle("menu-abierto");
      btn.setAttribute("aria-expanded", abierto);
      btn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
      document.body.style.overflow = abierto ? "hidden" : "";
    });

    const alScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("solida", y > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      barra.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    addEventListener("scroll", alScroll, { passive: true });
    alScroll();
  }

  function pintarPie() {
    const pie = document.createElement("footer");
    pie.className = "pie";
    const anio = new Date().getFullYear();
    pie.innerHTML = `
      <div class="contenedor">
        <div>
          <a class="marca" href="index.html"><img src="assets/img/logo-blanco.png" alt=""><span><b>Salesianos Cooperadores</b><small>${esc(CFG.centro)} · ${esc(CFG.ciudad)}</small></span></a>
          <p class="lema">Hijos e hijas de un soñador. Somos Iglesia con el estilo de Don Bosco, sal y fermento en medio del mundo.</p>
        </div>
        <div>
          <h4>Secciones</h4>
          <ul>${NAV.slice(1).flatMap((n) => [n, ...(n.hijos || [])]).map((n) => `<li><a href="${n.href}">${n.texto}</a></li>`).join("")}<li><a href="#" data-instalar hidden>📲 Descargar la app</a></li></ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            ${CFG.email ? `<li><a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a></li>` : ""}
            <li>${CFG.webProvincia ? `<a href="${esc(CFG.webProvincia)}" target="_blank" rel="noopener">${esc(CFG.provincia)}</a>` : esc(CFG.provincia)}</li>
            <li>${CFG.webRegion ? `<a href="${esc(CFG.webRegion)}" target="_blank" rel="noopener">Región Ibérica</a>` : "Región Ibérica"}</li>
            ${CFG.instagram ? `<li><a href="${esc(CFG.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : ""}
            ${CFG.youtube ? `<li><a href="${esc(CFG.youtube)}" target="_blank" rel="noopener">YouTube</a></li>` : ""}
          </ul>
        </div>
        <div class="final">
          <span>© ${anio} Asociación de Salesianos Cooperadores · ${esc(CFG.centro)} · <a href="panel.html">Gestión</a></span>
          <span><img src="assets/img/logo-csjm.png" alt="Cooperación Salesiana para los Jóvenes del Mundo"></span>
        </div>
      </div>
      <div class="gigante" aria-hidden="true">Da mihi animas</div>`;
    document.body.append(pie);
  }

  /* --------------------------------------- Fondo animado de hexágonos */
  function campoHexagonos(canvas, opciones = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const colores = ["255,255,255", "255,185,74", "13,162,220", "255,255,255"];
    let w, h, dpr, hexes = [];
    const raton = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const densidad = opciones.densidad || 26;

    function crear() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(densidad * Math.min(1.4, (w * h) / (1400 * 800)) + 8);
      hexes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 8 + Math.random() * 46,
        z: 0.2 + Math.random() * 0.9,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.004,
        vy: -(0.08 + Math.random() * 0.25),
        lleno: Math.random() < 0.28,
        c: colores[Math.floor(Math.random() * colores.length)],
        a: 0.06 + Math.random() * 0.22
      }));
    }
    function hex(x, y, r, rot) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = rot + (Math.PI / 3) * i + Math.PI / 6;
        ctx.lineTo(x + r * Math.cos(ang), y + r * Math.sin(ang));
      }
      ctx.closePath();
    }
    function dibujar() {
      ctx.clearRect(0, 0, w, h);
      raton.x += (raton.tx - raton.x) * 0.05;
      raton.y += (raton.ty - raton.y) * 0.05;
      for (const p of hexes) {
        if (!reduceMotion) { p.y += p.vy * p.z; p.rot += p.vr; }
        if (p.y < -60) { p.y = h + 60; p.x = Math.random() * w; }
        const ox = (raton.x - 0.5) * 60 * p.z;
        const oy = (raton.y - 0.5) * 40 * p.z;
        hex(p.x + ox, p.y + oy, p.r * p.z, p.rot);
        if (p.lleno) { ctx.fillStyle = `rgba(${p.c},${p.a * 0.6})`; ctx.fill(); }
        else { ctx.strokeStyle = `rgba(${p.c},${p.a})`; ctx.lineWidth = 1.5; ctx.stroke(); }
      }
      if (!reduceMotion) requestAnimationFrame(dibujar);
    }
    crear(); dibujar();
    addEventListener("resize", () => { crear(); if (reduceMotion) dibujar(); });
    canvas.parentElement.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      raton.tx = (e.clientX - r.left) / r.width;
      raton.ty = (e.clientY - r.top) / r.height;
    });
  }

  /* ------------------------------------------------- Revelar al scroll */
  const observador = "IntersectionObserver" in window
    ? new IntersectionObserver((entradas) => {
        entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observador.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  function revelar(raiz = document) {
    $$(".revelar:not(.visible)", raiz).forEach((el) => observador ? observador.observe(el) : el.classList.add("visible"));
  }

  /* -------------------------------------- Tarjetas con luz e inclinación */
  function efectosTarjetas() {
    $$(".acceso").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", x * 100 + "%");
        el.style.setProperty("--my", y * 100 + "%");
        if (!reduceMotion) el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* --------------------------------------------- Transición de páginas */
  function transiciones() {
    const cortina = document.createElement("div");
    cortina.className = "cortina";
    cortina.innerHTML = '<img src="assets/img/logo-blanco.png" alt="">';
    document.body.append(cortina);
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || /^https?:/.test(href) || !href.endsWith(".html")) return;
      e.preventDefault();
      cortina.style.setProperty("--cx", e.clientX + "px");
      cortina.style.setProperty("--cy", e.clientY + "px");
      cortina.classList.add("cerrando");
      setTimeout(() => (location.href = href), 550);
    });
    addEventListener("pageshow", () => cortina.classList.remove("cerrando"));
  }

  /* ========================================================= CONTENIDO */
  function parseCSV(txt) {
    const filas = []; let fila = [], campo = "", comillas = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (comillas) {
        if (c === '"' && txt[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') comillas = false;
        else campo += c;
      } else if (c === '"') comillas = true;
      else if (c === ",") { fila.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && txt[i + 1] === "\n") i++;
        fila.push(campo); filas.push(fila); fila = []; campo = "";
      } else campo += c;
    }
    if (campo || fila.length) { fila.push(campo); filas.push(fila); }
    const cab = (filas.shift() || []).map((h) => h.trim().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, ""));
    return filas.filter((f) => f.some((v) => v.trim())).map((f) => {
      const o = {}; cab.forEach((h, i) => (o[h] = (f[i] || "").trim())); return o;
    });
  }

  function normalizar(it) {
    const etiquetas = Array.isArray(it.etiquetas) ? it.etiquetas
      : String(it.etiquetas || "").split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    const destacado = it.destacado === true || /^(si|sí|true|x|1)$/i.test(String(it.destacado || ""));
    const tipo = String(it.tipo || "enlace").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return {
      seccion: String(it.seccion || "").toLowerCase().trim(),
      titulo: it.titulo || "Sin título",
      descripcion: it.descripcion || "",
      tipo: TIPOS[tipo] ? tipo : "enlace",
      url: (it.url || "").trim(),
      fecha: it.fecha || "",
      curso: it.curso || "",
      etiquetas, destacado,
      texto: it.texto || "",
      caduca: it.caduca || "",
      id: it.id || "",
      hora: it.hora || "",
      archivo: /^https?:/.test(it.archivo || "") ? it.archivo.trim() : "",
      lugar: it.lugar || ""
    };
  }

  /* Conexión con Google (Apps Script): lectura y escritura */
  async function llamarAPI(datos) {
    if (!CFG.apiGoogle) throw new Error("La web aún no está conectada con Google (config.js → apiGoogle).");
    const r = await fetch(CFG.apiGoogle, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(datos)
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "Error del servidor");
    return j;
  }

  function archivoABase64(file) {
    return new Promise((ok, mal) => {
      const lector = new FileReader();
      lector.onload = () => ok({ nombre: file.name, tipo: file.type || "application/octet-stream", base64: String(lector.result).split(",")[1] });
      lector.onerror = () => mal(lector.error);
      lector.readAsDataURL(file);
    });
  }

  async function contenidoGoogle() {
    const CLAVE_CACHE = "sscc-contenido-google";
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const r = await fetch(CFG.apiGoogle + (CFG.apiGoogle.includes("?") ? "&" : "?") + "accion=contenido", { signal: ctrl.signal });
      clearTimeout(t);
      const j = await r.json();
      if (j.ok) { lsSet(CLAVE_CACHE, JSON.stringify(j.items)); return j.items; }
    } catch (err) { console.warn("No se pudo leer el contenido de Google; uso la última copia", err); }
    try { return JSON.parse(lsGet(CLAVE_CACHE) || "[]"); } catch (e) { return []; }
  }

  async function cargarContenido() {
    let datos = window.SSCC_CONTENIDO || [];
    if (CFG.apiGoogle) datos = [...(await contenidoGoogle()), ...datos];
    if (CFG.hojaCalculoCSV) {
      try {
        const r = await fetch(CFG.hojaCalculoCSV, { cache: "no-store" });
        if (r.ok) datos = parseCSV(await r.text());
      } catch (err) { console.warn("No se pudo leer la hoja de Google; uso contenido.js", err); }
    }
    return datos.map(normalizar).sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  }

  /* --------------------------------------------- Enlaces incrustables */
  function aIncrustado(url, tipo) {
    if (!url) return null;
    let m;
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/)))
      return { src: `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0`, video: true };
    if ((m = url.match(/vimeo\.com\/(\d+)/))) return { src: `https://player.vimeo.com/video/${m[1]}`, video: true };
    if ((m = url.match(/drive\.google\.com\/drive\/(?:u\/\d\/)?folders\/([\w-]+)/)))
      return { src: `https://drive.google.com/embeddedfolderview?id=${m[1]}#grid` };
    if ((m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/)))
      return { src: `https://drive.google.com/file/d/${m[1]}/preview`, video: tipo === "video" };
    if ((m = url.match(/docs\.google\.com\/(document|presentation|spreadsheets|forms)\/d\/([\w-]+)/))) {
      const fin = m[1] === "presentation" ? "embed?start=false&loop=false" : m[1] === "forms" ? "viewform?embedded=true" : "preview";
      return { src: `https://docs.google.com/${m[1]}/d/${m[2]}/${fin}`, video: m[1] === "presentation" };
    }
    if (/\.(mp3|m4a|ogg|wav)($|\?)/i.test(url)) return { audio: url };
    if (/\.(jpe?g|png|webp|gif)($|\?)/i.test(url)) return { img: url };
    if (/\.(mp4|webm)($|\?)/i.test(url)) return { mp4: url };
    if (!/^https?:/.test(url) || /\.pdf($|\?)/i.test(url)) return { src: url };
    return null; // enlace externo que probablemente no se deja incrustar
  }

  /* ------------------------------------------------------------- Visor */
  let visor;
  function crearVisor() {
    visor = document.createElement("div");
    visor.className = "visor";
    visor.setAttribute("role", "dialog");
    visor.setAttribute("aria-modal", "true");
    visor.innerHTML = `<div class="caja"><div class="barra"><h3></h3><a class="btn btn--sm abrir" target="_blank" rel="noopener">${I.externo}<span>Abrir</span></a><button class="cerrar" aria-label="Cerrar">${I.cerrar}</button></div><div class="contenido"></div></div>`;
    document.body.append(visor);
    const cerrar = () => {
      visor.classList.remove("abierto");
      document.body.style.overflow = "";
      setTimeout(() => ($(".contenido", visor).innerHTML = ""), 400);
    };
    $(".cerrar", visor).addEventListener("click", cerrar);
    visor.addEventListener("click", (e) => { if (e.target === visor) cerrar(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && visor.classList.contains("abierto")) cerrar(); });
  }

  function abrir(it) {
    if (!visor) crearVisor();
    $("h3", visor).textContent = it.titulo;
    const cont = $(".contenido", visor);
    const btn = $(".abrir", visor);
    btn.style.display = it.url ? "" : "none";
    btn.href = it.url || "#";

    if (it.tipo === "texto" && it.texto) {
      cont.innerHTML = `<div class="lectura">${it.texto.split(/\n\s*\n/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("")}</div>`;
    } else if (!it.url) {
      cont.innerHTML = `<div class="sin-enlace"><div class="vacio"><div class="hexvacio"></div><h3>Material de ejemplo</h3><p>Aún no tiene enlace. Añade la dirección de Google Drive o YouTube en <b>contenido.js</b> o en la hoja de cálculo.</p></div></div>`;
    } else {
      const e = aIncrustado(it.url, it.tipo);
      if (!e) { window.open(it.url, "_blank", "noopener"); return; }
      if (e.img) cont.innerHTML = `<div class="marco" style="height:auto;max-height:80vh;overflow:auto;background:#fff"><img src="${esc(e.img)}" alt="${esc(it.titulo)}" style="width:100%;height:auto"></div>`;
      else if (e.audio) cont.innerHTML = `<div class="lectura"><audio controls style="width:100%" src="${esc(e.audio)}"></audio></div>`;
      else if (e.mp4) cont.innerHTML = `<div class="marco video"><video controls style="width:100%;height:100%" src="${esc(e.mp4)}"></video></div>`;
      else cont.innerHTML = `<div class="marco${e.video ? " video" : ""}"><iframe src="${esc(e.src)}" title="${esc(it.titulo)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
    }
    visor.classList.add("abierto");
    document.body.style.overflow = "hidden";
    $(".cerrar", visor).focus();
  }

  /* ------------------------------------------------------------ Tarjeta */
  function tarjeta(it, i = 0) {
    const fecha = it.fecha ? new Date(it.fecha + "T12:00:00") : null;
    const b = document.createElement("button");
    b.className = "tarjeta";
    b.type = "button";
    b.dataset.tipo = it.tipo;
    b.style.animationDelay = Math.min(i, 10) * 0.06 + "s";
    b.innerHTML = `
      <div class="portada">
        ${!it.url && it.tipo !== "texto" ? '<span class="aviso">Ejemplo</span>' : ""}
        <span class="tipo-icono">${I[it.tipo] || I.enlace}</span>
        <span class="etiqueta-tipo">${TIPOS[it.tipo]}</span>
      </div>
      <div class="cuerpo">
        <h3>${esc(it.titulo)}</h3>
        ${it.descripcion ? `<p>${esc(it.descripcion)}</p>` : ""}
        <div class="meta">
          ${fecha && !isNaN(fecha) ? `<span class="fecha">${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}</span>` : ""}
          ${it.etiquetas.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>`;
    b.addEventListener("click", () => abrir(it));
    return b;
  }

  function destacado(it, etiqueta) {
    const d = document.createElement("article");
    d.className = "destacado revelar";
    d.innerHTML = `
      <div class="arte"><span class="anillo"></span><span class="anillo"></span><div class="hexgrande">${I[it.tipo] || I.enlace}</div></div>
      <div class="info">
        <span class="kicker">${esc(etiqueta)}</span>
        <h3>${esc(it.titulo)}</h3>
        <p>${esc(it.descripcion)}</p>
        <div class="meta">${TIPOS[it.tipo]}${it.fecha ? " · " + fechaLarga(it.fecha) : ""}</div>
        <button class="btn btn--oro" type="button">${it.tipo === "texto" ? "Leer" : "Ver material"} ${I.flecha}</button>
      </div>`;
    $("button", d).addEventListener("click", () => abrir(it));
    return d;
  }

  /* --------------------------------------------------------- Biblioteca */
  function biblioteca(raiz, items) {
    const secciones = raiz.dataset.seccion.split(",").map((x) => x.trim());
    const conDestacado = raiz.dataset.destacado !== "no";
    let lista = items.filter((it) => secciones.includes(it.seccion));
    const estado = { q: "", tipo: "", tag: "", curso: "", sec: "" };
    const NOMBRE_SEC = { temas: "Temas", oraciones: "Oraciones", documentos: "Documentos del centro", provincia: "Provincia" };

    if (conDestacado) {
      const top = lista.find((it) => it.destacado);
      if (top) raiz.before(destacado(top, raiz.dataset.etiquetaDestacado || "Destacado"));
    }

    const tipos = [...new Set(lista.map((it) => it.tipo))];
    const tags = [...new Set(lista.flatMap((it) => it.etiquetas))].sort((a, b) => a.localeCompare(b, "es"));
    const cursos = [...new Set(lista.map((it) => it.curso).filter(Boolean))].sort().reverse();
    const modoLinea = raiz.dataset.vista === "linea";

    raiz.innerHTML = `
      ${secciones.length > 1 ? `<div class="filtros filtro-secciones" role="group" aria-label="Sección"><button class="chip" aria-pressed="true" data-sec="">Todo el material</button>${secciones.map((x) => `<button class="chip" aria-pressed="false" data-sec="${x}">${NOMBRE_SEC[x] || x} <span class="cuenta">${lista.filter((i) => i.seccion === x).length}</span></button>`).join("")}</div>` : ""}
      ${modoLinea && cursos.length > 1 ? `<div class="cursos" role="group" aria-label="Curso"><button class="chip" aria-pressed="true" data-curso="">Todos</button>${cursos.map((c) => `<button class="chip" aria-pressed="false" data-curso="${esc(c)}">Curso ${esc(c)}</button>`).join("")}</div>` : ""}
      <div class="biblioteca-controles">
        <label class="buscador"><span class="sr-only">Buscar</span>${I.buscar}<input type="search" placeholder="Buscar ${esc(raiz.dataset.nombre || "material")}…"></label>
        <div class="filtros" role="group" aria-label="Tipo">
          <button class="chip" aria-pressed="true" data-tipo="">Todo <span class="cuenta">${lista.length}</span></button>
          ${tipos.map((t) => `<button class="chip" aria-pressed="false" data-tipo="${t}">${TIPOS[t]} <span class="cuenta">${lista.filter((x) => x.tipo === t).length}</span></button>`).join("")}
        </div>
      </div>
      ${tags.length ? `<div class="filtros etiquetas-filtro" role="group" aria-label="Etiquetas">${tags.map((t) => `<button class="chip" aria-pressed="false" data-tag="${esc(t)}"># ${esc(t)}</button>`).join("")}</div>` : ""}
      <div class="${modoLinea ? "linea-tiempo" : "rejilla"}" aria-live="polite"></div>`;

    const rejilla = $(modoLinea ? ".linea-tiempo" : ".rejilla", raiz);

    function pintar() {
      const q = estado.q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      const r = lista.filter((it) =>
        (!estado.tipo || it.tipo === estado.tipo) &&
        (!estado.sec || it.seccion === estado.sec) &&
        (!estado.tag || it.etiquetas.includes(estado.tag)) &&
        (!estado.curso || it.curso === estado.curso) &&
        (!q || (it.titulo + " " + it.descripcion + " " + it.etiquetas.join(" ") + " " + it.texto)
          .toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q)));
      rejilla.innerHTML = "";
      if (!r.length) {
        rejilla.innerHTML = `<div class="vacio"><div class="hexvacio"></div><p>No hay material que coincida.</p></div>`;
        return;
      }
      r.forEach((it, i) => {
        const t = tarjeta(it, i);
        if (modoLinea) { const h = document.createElement("div"); h.className = "hito revelar"; h.append(t); rejilla.append(h); }
        else rejilla.append(t);
      });
      revelar(rejilla);
    }

    $("input", raiz).addEventListener("input", (e) => { estado.q = e.target.value; pintar(); });
    raiz.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c) return;
      const grupo = c.parentElement;
      if ("tag" in c.dataset) {
        const activo = c.getAttribute("aria-pressed") === "true";
        $$(".chip", grupo).forEach((x) => x.setAttribute("aria-pressed", "false"));
        c.setAttribute("aria-pressed", String(!activo));
        estado.tag = activo ? "" : c.dataset.tag;
      } else {
        $$(".chip", grupo).forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
        if ("tipo" in c.dataset) estado.tipo = c.dataset.tipo;
        if ("curso" in c.dataset) estado.curso = c.dataset.curso;
        if ("sec" in c.dataset) estado.sec = c.dataset.sec;
      }
      pintar();
    });
    pintar();
  }

  /* ---------------------------------------------- Últimos (portada) */
  function ultimos(raiz, items) {
    const n = Number(raiz.dataset.cantidad || 6);
    const material = items.filter((it) => !["avisos", "calendario", "provincia-web"].includes(it.seccion));
    const lista = material.filter((it) => it.url || it.texto).slice(0, n);
    raiz.innerHTML = "";
    (lista.length ? lista : material.slice(0, n)).forEach((it, i) => raiz.append(tarjeta(it, i)));
  }




  /* --------------------------------------------- Reproductor del himno */
  function reproductor(raiz) {
    const audio = $("audio", raiz), btn = $(".rep-play", raiz), barra = $(".rep-barra", raiz), relleno = $(".rep-relleno", raiz), tiempo = $(".rep-tiempo", raiz);
    const mmss = (t) => isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00";
    const pintar = () => {
      relleno.style.width = (audio.duration ? (audio.currentTime / audio.duration) * 100 : 0) + "%";
      tiempo.textContent = `${mmss(audio.currentTime)} / ${mmss(audio.duration)}`;
    };
    btn.addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
    audio.addEventListener("play", () => raiz.classList.add("sonando"));
    audio.addEventListener("pause", () => raiz.classList.remove("sonando"));
    audio.addEventListener("timeupdate", pintar);
    audio.addEventListener("loadedmetadata", pintar);
    barra.addEventListener("click", (e) => {
      const r = barra.getBoundingClientRect();
      if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
  }

  /* -------------------------------- Enlaces a la web de la Provincia */
  function enlacesProvincia(raiz, items) {
    const porCat = {};
    items.filter((it) => it.seccion === "provincia-web" && it.url).forEach((it) => {
      const cat = (it.etiquetas[0] || it.titulo).toLowerCase();
      const clave = (x) => (x.curso || "") + (x.fecha || "");
      if (!porCat[cat] || clave(it) > clave(porCat[cat])) porCat[cat] = it;   // el curso más reciente sustituye al anterior
    });
    const todos = Object.values(porCat);
    const esVideo = (it) => /youtu\.?be|vimeo/.test(it.url);
    const lema = todos.find((it) => esVideo(it) || /lema/i.test(it.etiquetas[0] || ""));
    const lista = todos.filter((it) => it !== lema);
    const bloqueLema = $("[data-lema-provincia]");
    if (bloqueLema && lema) {
      const id = (lema.url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/) || [])[1];
      bloqueLema.innerHTML = `
        <div class="lema-video revelar">
          <button class="lema-reproducir" type="button" aria-label="Reproducir el vídeo del lema" ${id ? `style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"` : ""}>
            <span class="lema-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg></span>
          </button>
        </div>
        <div class="lema-texto revelar" style="--d:.1s">
          <span class="kicker">${esc(lema.etiquetas[0] || "Lema")}${lema.curso ? ` · Curso ${esc(lema.curso)}` : ""}</span>
          <h2>${esc(lema.titulo)}</h2>
          ${lema.descripcion ? `<p>${esc(lema.descripcion)}</p>` : ""}
          <a class="btn btn--linea" href="${esc(lema.url)}" target="_blank" rel="noopener">Ver en YouTube ${I.externo}</a>
        </div>`;
      $(".lema-reproducir", bloqueLema).addEventListener("click", (e) => {
        if (!id) { window.open(lema.url, "_blank", "noopener"); return; }
        e.currentTarget.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(lema.titulo)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      });
      revelar(bloqueLema);
    } else if (bloqueLema) bloqueLema.closest("section").hidden = true;
    const sec = raiz.closest("section");
    if (!lista.length) { sec.hidden = true; return; }
    const ICONOS = {
      "proyecto anual": '<path d="M9 4h6M9 4a1 1 0 0 0-1 1v1h8V5a1 1 0 0 0-1-1M8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2"/><path d="m9 13 2 2 4-4"/>',
      "formación": '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>'
    };
    const ico = (cat) => ICONOS[(cat || "").toLowerCase()] || '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>';
    raiz.innerHTML = lista.map((it, i) => {
      const cat = it.etiquetas[0] || "Provincia";
      return `
      <article class="enlace-prov revelar" style="--d:${Math.min(i, 6) * 0.08}s">
        <a class="enlace-prov-principal" href="${esc(it.url)}" target="_blank" rel="noopener">
          <span class="ep-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ico(cat)}</svg></span>
          <span class="ep-cat">${esc(cat)}${it.curso ? ` · Curso ${esc(it.curso)}` : ""}</span>
          <h3>${esc(it.titulo)}</h3>
          ${it.descripcion ? `<p>${esc(it.descripcion)}</p>` : ""}
          <span class="ep-ir">Ver en cooperadores-pma.org ${I.flechaDiag}</span>
        </a>
        ${it.archivo ? `<a class="ep-archivo" href="${esc(it.archivo)}" target="_blank" rel="noopener">Cursos anteriores</a>` : ""}
      </article>`;
    }).join("");
    revelar(raiz);
  }

  /* ------------------------------------- Categorías de documentos */
  function categoriasDocs(raiz, items) {
    const docs = items.filter((it) => it.seccion === "documentos");
    $$(".categoria-doc", raiz).forEach((c) => {
      const n = docs.filter((d) => d.etiquetas.includes(c.dataset.cat)).length;
      $(".cat-cuenta", c).textContent = n ? `${n} documento${n > 1 ? "s" : ""}` : "Próximamente";
      c.classList.toggle("vacia", !n);
      c.addEventListener("click", () => {
        const chip = $$('.biblioteca[data-seccion="documentos"] .etiquetas-filtro .chip').find((x) => x.dataset.tag === c.dataset.cat);
        $$(".categoria-doc", raiz).forEach((x) => x.setAttribute("aria-pressed", "false"));
        if (chip) {
          if (chip.getAttribute("aria-pressed") !== "true") chip.click();
          c.setAttribute("aria-pressed", "true");
        }
        $('.biblioteca[data-seccion="documentos"]').scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    const ancla = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    const inicial = ancla && $$(".categoria-doc", raiz).find((c) => c.dataset.cat.toLowerCase().startsWith(ancla));
    if (inicial) setTimeout(() => inicial.click(), 400);
  }

  /* ------------------------------------------------------------- Avisos */
  const HOY = new Date().toISOString().slice(0, 10);
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const ssGet = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  function avisos(items) {
    const todos = items.filter((it) => it.seccion === "avisos");
    const vigente = (it) => !it.caduca || it.caduca >= HOY;
    const orden = (a, b) => (b.destacado - a.destacado) || (b.fecha || "").localeCompare(a.fecha || "");
    return {
      activos: todos.filter(vigente).sort(orden),
      pasados: todos.filter((it) => !vigente(it)).sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""))
    };
  }

  function avisoHTML(it, i = 0) {
    const d = new Date((it.fecha || HOY) + "T12:00:00");
    const cuerpo = (it.texto || it.descripcion || "").split(/\n\s*\n/).filter(Boolean)
      .map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
    const caduca = it.caduca ? new Date(it.caduca + "T12:00:00") : null;
    return `
      <article class="aviso-item${it.destacado ? " importante" : ""} revelar" style="--d:${Math.min(i, 6) * 0.06}s">
        <div class="aviso-fecha"><b>${d.getDate()}</b><small>${MESES[d.getMonth()]}</small></div>
        <div class="aviso-cuerpo">
          ${it.destacado ? '<span class="aviso-badge">Importante</span>' : ""}
          <h3>${esc(it.titulo)}</h3>
          ${cuerpo}
          <div class="aviso-pie">
            ${it.url ? `<a class="btn btn--sm" href="${esc(it.url)}" target="_blank" rel="noopener">${/\.(jpe?g|png|webp|gif)($|\?)/i.test(it.url) ? "Ver cartel" : "Más información"} ${I.flechaDiag}</a>` : ""}
            ${caduca && !isNaN(caduca) ? `<span class="aviso-caduca">${it.caduca < HOY ? "Finalizó" : "Hasta"} el ${caduca.getDate()} de ${caduca.toLocaleDateString("es-ES", { month: "long" })}</span>` : ""}
          </div>
        </div>
      </article>`;
  }

  function paginaAvisos(raiz, items) {
    const { activos, pasados } = avisos(items);
    raiz.innerHTML = `
      <div class="avisos-lista">${activos.length ? activos.map(avisoHTML).join("") : '<div class="vacio"><div class="hexvacio"></div><p>No hay avisos en este momento.</p></div>'}</div>
      ${pasados.length ? `<details class="avisos-pasados"><summary>Avisos anteriores <span class="cuenta">${pasados.length}</span></summary><div class="avisos-lista">${pasados.map(avisoHTML).join("")}</div></details>` : ""}`;
    // marca los avisos como vistos
    const ultimo = activos.map((a) => a.fecha).sort().pop();
    if (ultimo) lsSet("sscc-avisos-visto", ultimo);
    $$(".menu .punto").forEach((p) => p.remove());
    revelar(raiz);
    $$("details", raiz).forEach((d) => d.addEventListener("toggle", () => revelar(d)));
  }

  function avisosInicio(raiz, items) {
    const { activos } = avisos(items);
    const sec = raiz.closest("section");
    if (!activos.length) { sec.hidden = true; return; }
    raiz.innerHTML = activos.slice(0, Number(raiz.dataset.cantidad || 3)).map(avisoHTML).join("");
    revelar(raiz);
  }

  function puntoAvisos(items) {
    if (PAGINA === "avisos") return;
    const visto = lsGet("sscc-avisos-visto") || "";
    const nuevos = avisos(items).activos.filter((a) => (a.fecha || "") > visto).length;
    if (!nuevos) return;
    $$('.menu > li > a[href="avisos.html"]').forEach((a) => {
      a.insertAdjacentHTML("beforeend", `<span class="punto" aria-label="${nuevos} avisos nuevos">${nuevos}</span>`);
    });
  }

  function toastAviso(items) {
    if (PAGINA === "avisos") return;
    const it = avisos(items).activos.find((a) => a.destacado);
    if (!it) return;
    const clave = "sscc-toast-" + it.titulo;
    if (ssGet(clave)) return;
    const t = document.createElement("aside");
    t.className = "toast-aviso";
    t.setAttribute("role", "status");
    t.innerHTML = `
      <span class="toast-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg></span>
      <div><small>Aviso importante</small><b>${esc(it.titulo)}</b><a href="avisos.html">Ver aviso →</a></div>
      <button class="toast-cerrar" aria-label="Cerrar aviso">${I.cerrar}</button>`;
    document.body.append(t);
    setTimeout(() => t.classList.add("visible"), 1200);
    $(".toast-cerrar", t).addEventListener("click", () => {
      ssSet(clave, "1");
      t.classList.remove("visible");
      setTimeout(() => t.remove(), 600);
    });
  }

  /* ------------------------------------------------------------ Agenda */
  function eventos(items) {
    const deHoja = items.filter((it) => it.seccion === "calendario");
    const deConfig = (CFG.proximosEncuentros || []).map((e) => normalizar({ ...e, seccion: "calendario" }));
    return [...deHoja, ...deConfig].filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.fecha))
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }

  // Enlace "Añadir a mi Google Calendar"
  function enlaceGoogleCal(e) {
    const f = e.fecha.replace(/-/g, "");
    let fechas;
    if (/^\d{1,2}:\d{2}$/.test(e.hora)) {
      const [h, m] = e.hora.split(":").map(Number);
      const ini = `${f}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
      const fin = `${f}T${String(Math.min(h + 2, 23)).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
      fechas = `${ini}/${fin}`;
    } else {
      const d = new Date(e.fecha + "T12:00:00"); d.setDate(d.getDate() + 1);
      fechas = `${f}/${d.toISOString().slice(0, 10).replace(/-/g, "")}`;
    }
    const q = new URLSearchParams({ action: "TEMPLATE", text: e.titulo, dates: fechas, details: e.descripcion || e.texto || "", location: e.lugar || "", ctz: "Europe/Madrid" });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  }

  /* Tipos de encuentro: un símbolo para cada uno en el calendario */
  const TIPOS_EVENTO = [
    { k: "misa", re: /misa|eucarist/i, nombre: "Eucaristía", color: "#c98a12",
      svg: '<path d="M7 3h10l-1 6a4 4 0 0 1-8 0z"/><path d="M12 13v6M8 21h8"/>' },
    { k: "adoracion", re: /adoraci/i, nombre: "Adoración", color: "#b7791f",
      svg: '<circle cx="12" cy="9" r="3"/><path d="M12 2v2M12 14v2M5 9h2M17 9h2M7.1 4.1l1.4 1.4M15.5 12.5l1.4 1.4M16.9 4.1l-1.4 1.4M8.5 12.5l-1.4 1.4M12 16v5M9 21h6"/>' },
    { k: "retiro", re: /retiro/i, nombre: "Retiro", color: "#2f9e6b",
      svg: '<path d="m3 20 6-10 4 6 3-4 5 8z"/><circle cx="17" cy="6" r="2"/>' },
    { k: "navidad", re: /navidad|noche ?buena|reyes/i, nombre: "Navidad", color: "#d0533f",
      svg: '<path d="m12 3 2.2 4.6 5 .7-3.6 3.5.9 5L12 14.4 7.5 16.8l.9-5L4.8 8.3l5-.7z"/>' },
    { k: "convivencia", re: /convivencia|encuentro de centro|fiesta|merienda/i, nombre: "Convivencia", color: "#e8590c",
      svg: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>' },
    { k: "aspirantes", re: /aspirante/i, nombre: "Aspirantes", color: "#0da2dc",
      svg: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5z"/>' },
    { k: "grupo", re: /grupo|formaci/i, nombre: "Grupo de referencia", color: "#006a92",
      svg: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.3"/><path d="M16 14.3a4.5 4.5 0 0 1 5.5 4.7"/>' }
  ];
  const OTRO_EVENTO = { k: "otro", nombre: "Otro encuentro", color: "#34546d", svg: '<circle cx="12" cy="12" r="4"/>' };
  const tipoEvento = (e) => TIPOS_EVENTO.find((t) => t.re.test(e.titulo + " " + (e.descripcion || ""))) || OTRO_EVENTO;
  const simbolo = (t, extra = "") => `<span class="simb ${extra}" style="--c:${t.color}" title="${esc(t.nombre)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t.svg}</svg></span>`;

  function eventoHTML(e, i = 0) {
    const d = new Date(e.fecha + "T12:00:00");
    const t = tipoEvento(e);
    return `<div class="evento revelar" style="--d:${Math.min(i, 6) * 0.06}s; --c:${t.color}">
      <div class="dia"><b>${d.getDate()}</b><small>${MESES[d.getMonth()]}</small></div>
      <div><span class="evento-tipo">${simbolo(t, "mini")} ${esc(t.nombre)}</span><h3>${esc(e.titulo)}</h3><p>${esc([e.lugar, e.descripcion].filter(Boolean).join(" · "))}</p>
        <a class="anadir-cal" href="${enlaceGoogleCal(e)}" target="_blank" rel="noopener">+ Añadir a mi calendario</a></div>
      <span class="hora">${esc(e.hora || "")}</span></div>`;
  }

  function agenda(raiz, items) {
    const ev = eventos(items).filter((e) => e.fecha >= HOY).slice(0, Number(raiz.dataset.cantidad || 4));
    raiz.innerHTML = ev.length ? ev.map(eventoHTML).join("")
      : `<div class="vacio"><div class="hexvacio"></div><p>No hay encuentros programados.</p></div>`;
    revelar(raiz);
  }

  function calendario(raiz, items) {
    if (CFG.calendarioGoogle) {
      const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CFG.calendarioGoogle)}&ctz=Europe%2FMadrid&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&hl=es`;
      raiz.innerHTML = `<iframe class="calendario-google" src="${src}" title="Calendario del centro" loading="lazy"></iframe>`;
      return;
    }
    const lista = eventos(items);
    const porDia = lista.reduce((m, e) => ((m[e.fecha] = m[e.fecha] || []).push(e), m), {});
    const hoy = new Date(HOY + "T12:00:00");
    let anio = hoy.getFullYear(), mes = hoy.getMonth(), sel = null;
    const NOMBRES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const iso = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    raiz.innerHTML = `
      <div class="cal-mes">
        <div class="cal-cabeza">
          <button class="cal-nav" data-dir="-1" aria-label="Mes anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg></button>
          <h3 class="cal-titulo" aria-live="polite"></h3>
          <button class="cal-nav" data-dir="1" aria-label="Mes siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></button>
          <button class="chip cal-hoy">Hoy</button>
        </div>
        <div class="cal-semana">${["L", "M", "X", "J", "V", "S", "D"].map((d) => `<span>${d}</span>`).join("")}</div>
        <div class="cal-dias"></div>
        <div class="cal-leyenda">${[...new Map(lista.map((e) => [tipoEvento(e).k, tipoEvento(e)])).values()].map((t) => `<span>${simbolo(t, "mini")} ${esc(t.nombre)}</span>`).join("")}</div>
      </div>
      <div class="cal-lado"><h4 class="cal-lado-titulo"></h4><div class="agenda cal-lista"></div></div>`;

    const dias = $(".cal-dias", raiz), titulo = $(".cal-titulo", raiz);
    const ladoT = $(".cal-lado-titulo", raiz), ladoL = $(".cal-lista", raiz);

    function lado() {
      let ev, t;
      if (sel) {
        ev = porDia[sel] || [];
        const d = new Date(sel + "T12:00:00");
        t = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
      } else {
        const pref = iso(anio, mes, 1).slice(0, 7);
        ev = lista.filter((e) => e.fecha.startsWith(pref));
        t = `${NOMBRES[mes]} ${anio}`;
        if (!ev.length) { ev = lista.filter((e) => e.fecha >= HOY).slice(0, 4); t = "Próximos encuentros"; }
      }
      ladoT.textContent = t;
      ladoL.innerHTML = ev.length ? ev.map(eventoHTML).join("") : `<div class="vacio"><div class="hexvacio"></div><p>Ningún encuentro este día.</p></div>`;
      revelar(ladoL);
    }

    function pintar() {
      titulo.textContent = `${NOMBRES[mes]} ${anio}`;
      const primero = (new Date(anio, mes, 1).getDay() + 6) % 7;
      const total = new Date(anio, mes + 1, 0).getDate();
      let html = "";
      for (let i = 0; i < primero; i++) html += '<span class="cal-dia vacio-dia"></span>';
      for (let d = 1; d <= total; d++) {
        const f = iso(anio, mes, d), ev = porDia[f] || [];
        html += `<button class="cal-dia${f === HOY ? " hoy" : ""}${ev.length ? " con-evento" : ""}${f === sel ? " sel" : ""}" data-f="${f}" aria-label="${d} de ${NOMBRES[mes]}${ev.length ? ", " + ev.length + " encuentro(s)" : ""}">
          <span class="num-dia">${d}</span>
          ${ev.length ? `<span class="cal-simbolos">${[...new Map(ev.map((e) => [tipoEvento(e).k, tipoEvento(e)])).values()].slice(0, 3).map((t) => simbolo(t)).join("")}</span>` : ""}
          ${ev.length ? `<span class="cal-ev">${esc(ev[0].titulo)}${ev.length > 1 ? ` <em>+${ev.length - 1}</em>` : ""}</span>` : ""}
        </button>`;
      }
      dias.innerHTML = html;
      dias.classList.remove("anim"); void dias.offsetWidth; dias.classList.add("anim");
      lado();
    }

    raiz.addEventListener("click", (e) => {
      const nav = e.target.closest(".cal-nav");
      if (nav) {
        mes += Number(nav.dataset.dir);
        if (mes < 0) { mes = 11; anio--; } else if (mes > 11) { mes = 0; anio++; }
        sel = null; pintar(); return;
      }
      if (e.target.closest(".cal-hoy")) { anio = hoy.getFullYear(); mes = hoy.getMonth(); sel = HOY; pintar(); return; }
      const dia = e.target.closest(".cal-dia[data-f]");
      if (dia) { sel = sel === dia.dataset.f ? null : dia.dataset.f; pintar(); }
    });
    pintar();
  }



  /* ------------------------------------- Suscripción al calendario (.ics) */
  function suscripcion(raiz) {
    const https = location.origin + "/calendario.ics";
    const webcal = https.replace(/^https?:/, "webcal:");
    const nombre = "SSCC " + (CFG.centro || "Nervión");
    const enlaces = {
      google: "https://calendar.google.com/calendar/r?cid=" + encodeURIComponent(webcal),
      apple: webcal,
      outlook: "https://outlook.live.com/calendar/0/addfromweb?url=" + encodeURIComponent(https) + "&name=" + encodeURIComponent(nombre)
    };
    $$("[data-sus]", raiz).forEach((b) => { if (enlaces[b.dataset.sus]) b.href = enlaces[b.dataset.sus]; });
    const copiar = $('[data-sus="copiar"]', raiz);
    copiar.addEventListener("click", async () => {
      const txt = $(".sus-copiado", copiar);
      try { await navigator.clipboard.writeText(https); txt.textContent = "¡Enlace copiado!"; }
      catch (e) { prompt("Copia este enlace:", https); }
      setTimeout(() => (txt.textContent = "Para otras aplicaciones"), 2500);
    });
  }

  /* --------------------------------------- Próximos encuentros (lista) */
  function proximos(raiz, items) {
    const N = Number(raiz.dataset.cantidad || 12);
    const ev = eventos(items).filter((e) => e.fecha >= HOY);
    if (!ev.length) { raiz.innerHTML = `<div class="vacio"><div class="hexvacio"></div><p>No hay encuentros programados.</p></div>`; return; }
    const NOMBRES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let mostrados = N;
    function pintar() {
      const grupos = {};
      ev.slice(0, mostrados).forEach((e) => (grupos[e.fecha.slice(0, 7)] = grupos[e.fecha.slice(0, 7)] || []).push(e));
      raiz.innerHTML = Object.entries(grupos).map(([m, l]) => {
        const [a, mm] = m.split("-");
        return `<div class="prox-mes"><h3 class="prox-titulo">${NOMBRES[Number(mm) - 1]} <span>${a}</span></h3><div class="agenda">${l.map(eventoHTML).join("")}</div></div>`;
      }).join("") + (mostrados < ev.length ? `<div class="prox-mas"><button class="btn btn--linea" type="button">Ver más encuentros (${ev.length - mostrados})</button></div>` : "");
      const b = $(".prox-mas button", raiz);
      if (b) b.addEventListener("click", () => { mostrados += N; pintar(); });
      revelar(raiz);
    }
    pintar();
  }

  /* ---------------------------------------------- Formulario de envío */
  function formularioEnvio(form) {
    const params = new URLSearchParams(location.search);
    const caja = form.closest(".formulario");

    if (params.get("enviado") === "1") {
      caja.innerHTML = `<div class="form-ok">
        <div class="ok-hex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div>
        <h2>¡Gracias!</h2>
        <p>Hemos recibido tu material. Le daremos el formato corporativo y lo publicaremos en la web.</p>
        <a class="btn" href="enviar.html">Enviar otro material</a></div>`;
      return;
    }

    if (CFG.formularioGoogle) {
      caja.innerHTML = `<iframe src="${esc(CFG.formularioGoogle)}" title="Formulario de envío" style="width:100%;min-height:1100px;border:0" loading="lazy"></iframe>`;
      return;
    }

    const enviar = $("[type=submit]", form);
    if (CFG.apiGoogle) {
      form.removeAttribute("action");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const fd = new FormData(form);
        const archivo = $("input[type=file]", form).files[0];
        enviar.disabled = true;
        enviar.firstChild.textContent = archivo ? "Subiendo archivo… " : "Enviando… ";
        try {
          await llamarAPI({
            accion: "proponer",
            _honey: fd.get("_honey") || "",
            propuesta: {
              nombre: fd.get("nombre"), correo: fd.get("correo"), tipo_material: fd.get("tipo_material"),
              titulo: fd.get("titulo"), texto: fd.get("texto"), fecha: fd.get("fecha"), enlace: fd.get("enlace")
            },
            archivo: archivo ? await archivoABase64(archivo) : null
          });
          history.replaceState(null, "", "enviar.html?enviado=1");
          formularioEnvio(form);
        } catch (err) {
          enviar.disabled = false;
          enviar.firstChild.textContent = "Enviar material ";
          alert("No se ha podido enviar: " + err.message + "\nInténtalo de nuevo o escribe a " + (CFG.email || "el centro") + ".");
        }
      });
    } else if (!CFG.email) {
      form.insertAdjacentHTML("afterbegin", '<p class="aviso-config"><b>Formulario pendiente de activar:</b> escribe el correo del centro en <code>assets/js/config.js</code> → <code>email</code>.</p>');
      enviar.disabled = true;
    } else {
      form.action = "https://formsubmit.co/" + encodeURIComponent(CFG.email);
    }
    $("[name=_next]", form).value = location.origin + location.pathname + "?enviado=1";
    $("[name=_url]", form).value = location.origin;

    const tipo = params.get("tipo");
    if (tipo) { const r = $(`[name=tipo_material][value="${CSS.escape(tipo)}"]`, form); if (r) r.checked = true; }

    // Zona para soltar archivos
    const zona = $(".soltar", form), input = $("input[type=file]", zona), nombre = $(".archivo-nombre", zona);
    const MAX = (CFG.apiGoogle ? 15 : 5) * 1024 * 1024;
    const mostrar = () => {
      const f = input.files[0];
      if (!f) { nombre.textContent = ""; return; }
      if (f.size > MAX) {
        input.value = "";
        nombre.textContent = `El archivo supera ${MAX / 1024 / 1024} MB: súbelo a Drive y pega el enlace arriba.`;
        return;
      }
      nombre.textContent = `${f.name} · ${(f.size / 1024 / 1024).toFixed(1)} MB`;
    };
    input.addEventListener("change", mostrar);
    ["dragenter", "dragover"].forEach((ev) => zona.addEventListener(ev, () => zona.classList.add("arrastrando")));
    ["dragleave", "drop"].forEach((ev) => zona.addEventListener(ev, () => zona.classList.remove("arrastrando")));

    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) return;
      const t = $("[name=tipo_material]:checked", form)?.value || "Material";
      $("[name=_subject]", form).value = `[Web SSCC] ${t}: ${$("[name=titulo]", form).value}`;
      $("[name=_replyto]", form).value = $("[name=correo]", form).value;
      enviar.disabled = true;
      enviar.firstChild.textContent = "Enviando… ";
    });
  }


  /* ------------------------------------------------- App instalable (PWA) */
  let promptInstalar = null;
  const esStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const esIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  function registrarSW() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch((e) => console.warn("SW:", e)));
  }

  function modalApp() {
    let m = $(".modal-app");
    if (m) return m;
    m = document.createElement("div");
    m.className = "visor modal-app";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.setAttribute("aria-labelledby", "modal-app-titulo");
    const ios = esIOS();
    m.innerHTML = `
      <div class="caja">
        <button class="cerrar" aria-label="Cerrar">${I.cerrar}</button>
        <div class="app-modal-cuerpo">
          <img class="app-modal-icono" src="assets/img/icon-192.png" alt="">
          <h3 id="modal-app-titulo">Instala la app SSCC Nervión</h3>
          <p>Tendrás los temas, oraciones, avisos y el calendario a un toque, también sin conexión.</p>
          <ol class="pasos-app">
            ${ios ? `
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg></span><div>Abre esta web en <b>Safari</b> y pulsa el botón <b>Compartir</b>.</div></li>
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/></svg></span><div>Elige <b>Añadir a pantalla de inicio</b>.</div></li>
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></span><div>Pulsa <b>Añadir</b>. ¡Ya la tienes junto a tus apps!</div></li>` : `
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg></span><div>Abre el <b>menú del navegador</b> (los tres puntos ⋮).</div></li>
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></span><div>Pulsa <b>Instalar aplicación</b> o <b>Añadir a pantalla de inicio</b>.</div></li>
              <li><span class="paso-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></span><div>Confirma y la app aparecerá con el logo del centro.</div></li>`}
          </ol>
        </div>
      </div>`;
    document.body.append(m);
    const cerrar = () => { m.classList.remove("abierto"); document.body.style.overflow = ""; };
    $(".cerrar", m).addEventListener("click", cerrar);
    m.addEventListener("click", (e) => { if (e.target === m) cerrar(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });
    return m;
  }

  function instalable() {
    const botones = () => $$("[data-instalar]");
    if (esStandalone()) {
      botones().forEach((b) => b.remove());
      $$("[data-seccion-app]").forEach((x) => x.remove());
      document.body.classList.add("modo-app");
      return;
    }
    botones().forEach((b) => (b.hidden = false));
    addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); promptInstalar = e; });
    addEventListener("appinstalled", () => {
      promptInstalar = null;
      botones().forEach((b) => b.remove());
      $$("[data-seccion-app]").forEach((s) => s.remove());
    });
    document.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-instalar]");
      if (!b) return;
      e.preventDefault();
      if (promptInstalar) {
        promptInstalar.prompt();
        await promptInstalar.userChoice;
        promptInstalar = null;
      } else {
        const m = modalApp();
        m.classList.add("abierto");
        document.body.style.overflow = "hidden";
        $(".cerrar", m).focus();
      }
    });
  }

  /* -------------------------------------------- Citas de Don Bosco */
  function citas(raiz) {
    const lista = JSON.parse(raiz.dataset.citas || "[]");
    if (!lista.length) return;
    const bq = $("blockquote", raiz), cite = $("cite", raiz), puntos = $(".puntos", raiz);
    let i = 0, timer;
    puntos.innerHTML = lista.map((_, k) => `<button aria-label="Cita ${k + 1}"></button>`).join("");
    function mostrar(k) {
      i = k;
      bq.classList.remove("visible");
      setTimeout(() => {
        bq.innerHTML = lista[i].t.split(" ").map((p, j) => `<span class="palabra" style="transition-delay:${j * 0.04}s">${esc(p)}</span>`).join(" ");
        cite.textContent = lista[i].a;
        $$("button", puntos).forEach((b, j) => b.setAttribute("aria-current", String(j === i)));
        requestAnimationFrame(() => requestAnimationFrame(() => bq.classList.add("visible")));
      }, 350);
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => mostrar((i + 1) % lista.length), 7000);
    }
    puntos.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) mostrar($$("button", puntos).indexOf(b)); });
    mostrar(0);
  }

  /* -------------------------------------------- Rellenos desde config */
  function rellenarConfig() {
    $$("[data-cfg]").forEach((el) => {
      const v = CFG[el.dataset.cfg];
      if (v) el.textContent = v;
    });
    $$("[data-cfg-email]").forEach((el) => {
      if (CFG.email) { el.href = "mailto:" + CFG.email; el.querySelector("span").textContent = CFG.email; }
      else el.closest("li")?.remove();
    });
    $$("[data-mapa]").forEach((el) => {
      el.src = `https://www.google.com/maps?q=${encodeURIComponent(CFG.direccionMapa || "Sevilla")}&output=embed`;
    });
    $$("[data-enlace]").forEach((el) => {
      const url = CFG[el.dataset.enlace];
      if (url) { el.href = url; el.hidden = false; }
      else if (el.tagName === "A") el.removeAttribute("href");
    });
    $$("[data-carpeta]").forEach((el) => {
      const url = (CFG.carpetas || {})[el.dataset.carpeta];
      if (url) { el.href = url; el.hidden = false; }
    });
  }

  /* =============================================================== Inicio */
  async function iniciar() {
    pintarCabecera();
    pintarPie();
    transiciones();
    rellenarConfig();
    registrarSW();
    instalable();
    $$(".hero canvas, .page-hero canvas").forEach((c) => campoHexagonos(c, { densidad: c.closest(".hero") ? 30 : 16 }));
    efectosTarjetas();
    revelar();
    $$("[data-citas]").forEach(citas);
    $$("form[data-envio]").forEach(formularioEnvio);
    $$("[data-reproductor]").forEach(reproductor);
    $$("[data-suscripcion]").forEach(suscripcion);
    if (PAGINA === "panel") return; // el panel carga sus propios datos

    const items = await cargarContenido();
    $$(".biblioteca[data-seccion]").forEach((r) => biblioteca(r, items));
    $$("[data-ultimos]").forEach((r) => ultimos(r, items));
    $$("[data-avisos]").forEach((r) => paginaAvisos(r, items));
    $$("[data-categorias-docs]").forEach((r) => categoriasDocs(r, items));
    $$("[data-enlaces-provincia]").forEach((r) => enlacesProvincia(r, items));
    $$("[data-avisos-inicio]").forEach((r) => avisosInicio(r, items));
    $$("[data-agenda]").forEach((r) => agenda(r, items));
    $$("[data-calendario]").forEach((r) => calendario(r, items));
    $$("[data-proximos]").forEach((r) => proximos(r, items));
    puntoAvisos(items);
    toastAviso(items);
    revelar();
  }

  // Herramientas compartidas con el panel de gestión
  window.SSCC = { CFG, I, TIPOS, MESES, esc, $, $$, normalizar, tarjeta, avisoHTML, eventoHTML, tipoEvento, abrir, llamarAPI, archivoABase64, revelar, cargarContenido };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();

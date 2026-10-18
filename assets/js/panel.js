/* =========================================================================
   PANEL DE GESTIÓN · publicar material sin tocar código
   ========================================================================= */
(function () {
  "use strict";
  const S = window.SSCC;
  const { CFG, I, TIPOS, esc, $, $$ } = S;
  const raiz = $("#panel");
  const CLAVE_SESION = "sscc-panel-clave";
  const ss = {
    get: () => { try { return sessionStorage.getItem(CLAVE_SESION); } catch (e) { return null; } },
    set: (v) => { try { sessionStorage.setItem(CLAVE_SESION, v); } catch (e) {} },
    del: () => { try { sessionStorage.removeItem(CLAVE_SESION); } catch (e) {} }
  };
  let clave = ss.get();
  let datos = { items: [], propuestas: [] };
  let prefijo = null; // propuesta desde la que se publica

  /* ---------------------------------------------------------- Secciones */
  const SECCIONES = {
    temas:      { nombre: "Tema", desc: "Tema de formación", pagina: "temas.html", ico: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7M8 11h5"/>',
                  campos: ["titulo", "descripcion", "material", "fecha", "etiquetas", "destacado"] },
    oraciones:  { nombre: "Oración", desc: "Texto, PDF, audio o vídeo", pagina: "oraciones.html", ico: '<path d="M12 2v20M7 7h10"/>',
                  campos: ["titulo", "descripcion", "texto", "material", "fecha", "etiquetas", "destacado"] },
    avisos:     { nombre: "Aviso", desc: "Para el tablón de avisos", pagina: "avisos.html", ico: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
                  campos: ["titulo", "textoAviso", "importante", "caduca", "material"] },
    calendario: { nombre: "Fecha", desc: "Encuentro en el calendario", pagina: "calendario.html", ico: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
                  campos: ["titulo", "fechaEvento", "hora", "lugar", "descripcion"] },
    documentos: { nombre: "Documento del centro", desc: "Proyecto, acta o memoria", pagina: "documentos.html", ico: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
                  campos: ["titulo", "categoria", "descripcion", "material", "fecha", "destacado"] },
    "provincia-web": { nombre: "Enlace de la web provincial", desc: "Proyecto anual, plan de formación…", pagina: "provincia.html", ico: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
                  campos: ["titulo", "categoriaProv", "descripcion", "enlace", "archivoProv", "fecha"] },
    provincia:  { nombre: "Comunicado de la Provincia", desc: "Lo que envía el Consejo", pagina: "provincia.html", ico: '<path d="M12 2.5 20.5 7.3v9.4L12 21.5l-8.5-4.8V7.3z"/>',
                  campos: ["titulo", "descripcion", "material", "fecha", "etiquetas", "destacado"] }
  };

  const hoy = () => new Date().toISOString().slice(0, 10);
  const curso = (f) => { const m = /^(\d{4})-(\d{2})/.exec(f || ""); if (!m) return ""; const a = +m[1], ini = +m[2] >= 9 ? a : a - 1; return `${ini}-${String(ini + 1).slice(2)}`; };

  function tipoDe(archivo, url, texto) {
    if (archivo) {
      const n = archivo.name.toLowerCase();
      if (n.endsWith(".pdf")) return "pdf";
      if (/\.(mp4|mov|webm|m4v)$/.test(n)) return "video";
      if (/\.(mp3|m4a|wav|ogg)$/.test(n)) return "audio";
      if (/\.(pptx?|key|odp)$/.test(n)) return "presentacion";
      if (/\.(jpe?g|png|webp|gif|heic)$/.test(n)) return "imagen";
      return "documento";
    }
    if (url) {
      if (/youtu\.?be|vimeo/.test(url)) return "video";
      if (/drive\.google\.com\/drive\/.*folders/.test(url)) return "carpeta";
      if (/docs\.google\.com\/presentation/.test(url)) return "presentacion";
      if (/docs\.google\.com\/(document|spreadsheets)/.test(url)) return "documento";
      if (/\.pdf($|\?)/i.test(url)) return "pdf";
      if (/\.(jpe?g|png|webp)($|\?)/i.test(url)) return "imagen";
      if (/drive\.google\.com\/file/.test(url)) return "pdf";
      return "enlace";
    }
    return texto ? "texto" : "enlace";
  }

  /* ------------------------------------------------------------ Ayudas UI */
  function cargando(btn, texto) {
    btn.disabled = true;
    btn.dataset.txt = btn.innerHTML;
    btn.innerHTML = `<span class="girando"></span> ${texto}`;
  }
  function listo(btn) { btn.disabled = false; if (btn.dataset.txt) btn.innerHTML = btn.dataset.txt; }
  function toast(msg, tipo = "ok") {
    const t = document.createElement("div");
    t.className = "panel-toast " + tipo;
    t.textContent = msg;
    document.body.append(t);
    requestAnimationFrame(() => t.classList.add("visible"));
    setTimeout(() => { t.classList.remove("visible"); setTimeout(() => t.remove(), 500); }, 3500);
  }
  const api = (d) => S.llamarAPI({ clave, ...d });

  /* ------------------------------------------------------------ Pantallas */
  function sinConexion() {
    raiz.innerHTML = `
      <div class="panel-caja panel-estrecho">
        <img class="panel-logo" src="assets/img/icon-192.png" alt="">
        <h2>Falta conectar con Google</h2>
        <p>El panel necesita el «servidor» de la cuenta del centro. Se instala una sola vez siguiendo la guía <b>GUIA-GESTION</b> (unos 10 minutos).</p>
        <p class="nota">Cuando esté instalado, pega su dirección en <code>assets/js/config.js</code> → <code>apiGoogle</code>.</p>
      </div>`;
  }

  function pantallaEntrar(error) {
    raiz.innerHTML = `
      <form class="panel-caja panel-estrecho" id="entrar">
        <img class="panel-logo" src="assets/img/icon-192.png" alt="">
        <h2>Panel de gestión</h2>
        <p>Publica temas, oraciones, avisos y documentos en la web del centro.</p>
        <label class="campo"><span>Clave del panel</span><input type="password" name="clave" required autocomplete="current-password" autofocus></label>
        ${error ? `<p class="panel-error">${esc(error)}</p>` : ""}
        <button class="btn btn--grande" type="submit">Entrar ${I.flecha}</button>
      </form>`;
    $("#entrar").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("button", e.target);
      clave = e.target.clave.value.trim();
      cargando(btn, "Comprobando…");
      try { await api({ accion: "entrar" }); ss.set(clave); await escritorio(); }
      catch (err) { clave = null; pantallaEntrar(err.message === "Clave incorrecta" ? "Clave incorrecta. Pregunta a quien gestiona la web." : err.message); }
    });
  }

  async function recargar() {
    const j = await api({ accion: "listar" });
    datos = j;
    return j;
  }

  async function escritorio(pestana = "publicar") {
    raiz.innerHTML = `<div class="panel-caja"><p class="panel-cargando"><span class="girando"></span> Cargando…</p></div>`;
    try { await recargar(); } catch (err) { if (err.message === "Clave incorrecta") { ss.del(); return pantallaEntrar(); } return raiz.innerHTML = `<div class="panel-caja"><p class="panel-error">${esc(err.message)}</p></div>`; }
    const pendientes = datos.propuestas.filter((p) => p.estado === "pendiente").length;
    raiz.innerHTML = `
      <div class="panel-barra">
        <nav class="panel-tabs" role="tablist">
          <button role="tab" data-tab="publicar">${I.flecha.replace("M5 12h14M13 6l6 6-6 6", "M12 5v14M5 12h14")} Publicar</button>
          <button role="tab" data-tab="publicado">Publicado <span class="cuenta">${datos.items.length}</span></button>
          <button role="tab" data-tab="propuestas">Propuestas ${pendientes ? `<span class="burbuja">${pendientes}</span>` : ""}</button>
          <button role="tab" data-tab="ayuda">Ayuda</button>
        </nav>
        <div class="panel-enlaces">
          <a href="${esc(datos.carpeta || "#")}" target="_blank" rel="noopener">Drive</a>
          <a href="${esc(datos.hoja || "#")}" target="_blank" rel="noopener">Hoja</a>
          <button class="salir" type="button">Salir</button>
        </div>
      </div>
      <div class="panel-cuerpo"></div>`;
    $(".salir", raiz).addEventListener("click", () => { ss.del(); clave = null; pantallaEntrar(); });
    $$(".panel-tabs button", raiz).forEach((b) => b.addEventListener("click", () => abrirPestana(b.dataset.tab)));
    abrirPestana(pestana);
  }

  function abrirPestana(t) {
    $$(".panel-tabs button", raiz).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === t)));
    const cuerpo = $(".panel-cuerpo", raiz);
    ({ publicar: vistaPublicar, publicado: vistaPublicado, propuestas: vistaPropuestas, ayuda: vistaAyuda })[t](cuerpo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------ Publicar */
  function vistaPublicar(cuerpo, seccionInicial, datosIniciales) {
    cuerpo.innerHTML = `
      <section class="paso">
        <h3><span class="paso-num">1</span> ¿Qué quieres publicar?</h3>
        <div class="elige-seccion">
          ${Object.entries(SECCIONES).map(([k, v]) => `
            <button type="button" class="opcion-seccion" data-sec="${k}">
              <span class="os-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${v.ico}</svg></span>
              <b>${v.nombre}</b><small>${v.desc}</small>
            </button>`).join("")}
        </div>
      </section>
      <div class="formulario-publicar"></div>`;
    $$(".opcion-seccion", cuerpo).forEach((b) => b.addEventListener("click", () => {
      $$(".opcion-seccion", cuerpo).forEach((x) => x.classList.toggle("activa", x === b));
      formularioPublicar($(".formulario-publicar", cuerpo), b.dataset.sec, datosIniciales);
      datosIniciales = null;
    }));
    if (seccionInicial) $(`.opcion-seccion[data-sec="${seccionInicial}"]`, cuerpo).click();
  }

  function formularioPublicar(caja, sec, ini = {}) {
    ini = ini || {};
    const cfg = SECCIONES[sec];
    const tiene = (c) => cfg.campos.includes(c);
    const tagsExistentes = [...new Set(datos.items.filter((i) => i.seccion === sec).flatMap((i) => String(i.etiquetas || "").split(",").map((t) => t.trim()).filter(Boolean)))];
    caja.innerHTML = `
      <form class="paso" id="publicar" novalidate>
        <h3><span class="paso-num">2</span> Rellena los datos</h3>
        <div class="form-rejilla">
          ${tiene("categoria") ? `
          <fieldset class="campo ancho"><legend>Tipo de documento</legend>
            <div class="tipos-material">
              ${["Proyecto de centro", "Actas", "Memoria"].map((c, i) => `<input type="radio" id="cat${i}" name="categoria" value="${c}" ${i === 1 ? "checked" : ""}><label for="cat${i}">${c}</label>`).join("")}
            </div></fieldset>` : ""}
          ${tiene("categoriaProv") ? `<label class="campo"><span>Categoría *</span><input name="categoria" required list="cats-prov" placeholder="Ej.: Proyecto anual"><datalist id="cats-prov"><option value="Lema"><option value="Proyecto anual"><option value="Plan trienal"><option value="Formación"><option value="Asamblea"></datalist><small class="ayuda-campo">Al publicar uno nuevo de la misma categoría, sustituye al del curso anterior.</small></label>` : ""}
          <label class="campo ancho"><span>Título *</span><input name="titulo" required maxlength="120" value="${esc(ini.titulo || "")}" placeholder="${sec === "avisos" ? "Ej.: Cambio de hora del encuentro" : sec === "calendario" ? "Ej.: Retiro de Cuaresma" : "Ej.: Tema 3 · El Sistema Preventivo"}"></label>
          ${tiene("fechaEvento") ? `<p class="nota ancho">El símbolo del calendario se pone solo según el título: Grupo, Aspirantes, Misa/Eucaristía, Adoración, Retiro, Convivencia o Navidad.</p>
          <label class="campo"><span>Día *</span><input type="date" name="fecha" required value="${esc(ini.fecha || "")}"></label>
          <label class="campo"><span>Hora</span><input type="time" name="hora"></label>
          <label class="campo ancho"><span>Lugar</span><input name="lugar" placeholder="Ej.: Salesianos Nervión"></label>` : ""}
          ${tiene("textoAviso") ? `<label class="campo ancho"><span>Texto del aviso * <small>(corto: una o dos frases)</small></span><textarea name="texto" required maxlength="400" rows="3">${esc(ini.texto || "")}</textarea></label>` : ""}
          ${tiene("descripcion") ? `<label class="campo ancho"><span>Descripción <small>(opcional, una frase)</small></span><input name="descripcion" maxlength="200"></label>` : ""}
          ${tiene("texto") ? `<label class="campo ancho"><span>Texto de la oración <small>(si no subes archivo)</small></span><textarea name="texto" rows="6">${esc(ini.texto || "")}</textarea></label>` : ""}
          ${tiene("material") ? `
          <div class="campo ancho">
            <span class="etq">${sec === "avisos" ? "Cartel o enlace <small>(opcional)</small>" : "Archivo o enlace"}</span>
            <div class="dos-opciones">
              <label class="soltar">
                <input type="file" name="archivo">
                <span class="ico-subir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M6 10l6-6 6 6M5 20h14"/></svg></span>
                <span><b>Arrastra el archivo</b> o pulsa para elegirlo</span>
                <small>PDF, Word, PowerPoint, imagen, audio… (máx. 25 MB)</small>
                <span class="archivo-nombre"></span>
              </label>
              <div class="o">o</div>
              <label class="campo"><span>Pega un enlace</span><input name="url" type="url" placeholder="Drive, YouTube, Docs…" value="${esc(ini.url || "")}"><small class="ayuda-campo">Si es de Drive, compártelo como «Cualquier persona con el enlace».</small></label>
            </div>
          </div>` : ""}
          ${tiene("enlace") ? `<label class="campo ancho"><span>Enlace * <small>(página de cooperadores-pma.org o, para el lema, el vídeo de YouTube)</small></span><input name="url" type="url" required placeholder="https://cooperadores-pma.org/… o vídeo de YouTube"></label>` : ""}
          ${tiene("archivoProv") ? `<label class="campo ancho"><span>Enlace a los cursos anteriores <small>(opcional)</small></span><input name="archivo" type="url" placeholder="https://cooperadores-pma.org/…"></label>` : ""}
          ${tiene("caduca") ? `<label class="campo"><span>Visible hasta <small>(después pasa a «anteriores»)</small></span><input type="date" name="caduca" min="${hoy()}"></label>` : ""}
          ${tiene("importante") ? `<label class="check-grande"><input type="checkbox" name="destacado"><span><b>Importante</b><small>Sale primero y con aviso al entrar en la web</small></span></label>` : ""}
          ${tiene("fecha") ? `<label class="campo"><span>Fecha</span><input type="date" name="fecha" value="${esc(ini.fecha || hoy())}"></label>` : ""}
          ${tiene("etiquetas") ? `<label class="campo"><span>Etiquetas <small>(separadas por comas)</small></span><input name="etiquetas" list="tags-${sec}" placeholder="Ej.: Adviento, Formación"><datalist id="tags-${sec}">${tagsExistentes.map((t) => `<option value="${esc(t)}">`).join("")}</datalist></label>` : ""}
          ${tiene("destacado") ? `<label class="check-grande"><input type="checkbox" name="destacado"><span><b>Destacar</b><small>Aparece grande arriba de su sección</small></span></label>` : ""}
        </div>

        <h3><span class="paso-num">3</span> Así se verá</h3>
        <div class="vista-previa"></div>

        <div class="publicar-acciones">
          <p class="panel-error" hidden></p>
          <button class="btn btn--grande btn--oro" type="submit">Publicar en la web ${I.flecha}</button>
        </div>
      </form>`;
    const form = $("#publicar", caja);
    const fileIn = $("input[type=file]", form);
    const MAX = 25 * 1024 * 1024;

    function leer() {
      const fd = new FormData(form);
      const archivo = fileIn && fileIn.files[0];
      const url = (fd.get("url") || "").trim();
      const texto = (fd.get("texto") || "").trim();
      const fecha = fd.get("fecha") || hoy();
      const etiquetas = sec === "documentos" || sec === "provincia-web" ? [String(fd.get("categoria") || "").trim()].filter(Boolean) : String(fd.get("etiquetas") || "").split(",").map((t) => t.trim()).filter(Boolean);
      return {
        archivo,
        item: {
          seccion: sec, titulo: (fd.get("titulo") || "").trim(), descripcion: (fd.get("descripcion") || "").trim(),
          tipo: sec === "calendario" || sec === "avisos" ? "" : sec === "provincia-web" ? "enlace" : tipoDe(archivo, url, texto),
          archivo: sec === "provincia-web" ? String(fd.get("archivo") || "").trim() : "",
          url: archivo ? "" : url, fecha, curso: curso(fecha), etiquetas,
          destacado: !!fd.get("destacado"), texto, caduca: fd.get("caduca") || "",
          hora: fd.get("hora") || "", lugar: (fd.get("lugar") || "").trim()
        }
      };
    }

    function vista() {
      const { item, archivo } = leer();
      const it = S.normalizar({ ...item, titulo: item.titulo || "Título del material", url: item.url || (archivo ? "#archivo" : "") });
      const pv = $(".vista-previa", form);
      pv.innerHTML = "";
      if (sec === "provincia-web") pv.innerHTML = `<p class="nota">Aparecerá como una tarjeta en la página Provincia, con el botón «Ver en cooperadores-pma.org».</p>`;
      else if (sec === "avisos") pv.innerHTML = `<div class="avisos-lista">${S.avisoHTML({ ...it, texto: it.texto || "Texto del aviso" })}</div>`;
      else if (sec === "calendario") pv.innerHTML = `<div class="agenda">${S.eventoHTML({ ...it, fecha: it.fecha || hoy() })}</div>`;
      else { const t = S.tarjeta(it); t.disabled = true; pv.append(t); }
      $$(".revelar", pv).forEach((x) => x.classList.add("visible"));
      const aviso = $(".aviso", pv); if (aviso && (archivo || item.texto)) aviso.remove();
    }

    if (fileIn) {
      const zona = fileIn.closest(".soltar"), nom = $(".archivo-nombre", zona);
      fileIn.addEventListener("change", () => {
        const f = fileIn.files[0];
        if (f && f.size > MAX) { fileIn.value = ""; nom.textContent = "Demasiado grande (máx. 25 MB). Súbelo a Drive y pega el enlace."; }
        else nom.textContent = f ? `✓ ${f.name} · ${(f.size / 1024 / 1024).toFixed(1)} MB` : "";
        zona.classList.toggle("con-archivo", !!fileIn.files[0]);
        vista();
      });
      ["dragenter", "dragover"].forEach((ev) => zona.addEventListener(ev, () => zona.classList.add("arrastrando")));
      ["dragleave", "drop"].forEach((ev) => zona.addEventListener(ev, () => zona.classList.remove("arrastrando")));
    }
    form.addEventListener("input", vista);
    vista();
    caja.scrollIntoView({ behavior: "smooth", block: "start" });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = $(".panel-error", form);
      const { item, archivo } = leer();
      let fallo = "";
      if (!item.titulo) fallo = "Falta el título.";
      else if (sec === "avisos" && !item.texto) fallo = "Escribe el texto del aviso.";
      else if (sec === "calendario" && !form.fecha.value) fallo = "Elige el día.";
      else if (["temas", "documentos", "provincia"].includes(sec) && !archivo && !item.url) fallo = "Sube un archivo o pega un enlace.";
      else if (sec === "provincia-web" && (!item.url || !item.etiquetas.length)) fallo = "Indica la categoría y el enlace.";
      else if (sec === "oraciones" && !archivo && !item.url && !item.texto) fallo = "Escribe la oración, sube un archivo o pega un enlace.";
      if (fallo) { err.textContent = fallo; err.hidden = false; return; }
      err.hidden = true;
      const btn = $("button[type=submit]", form);
      cargando(btn, archivo ? "Subiendo el archivo…" : "Publicando…");
      try {
        await api({ accion: "publicar", item, archivo: archivo ? await S.archivoABase64(archivo) : null, propuesta: prefijo });
        prefijo = null;
        await recargar();
        caja.innerHTML = `
          <div class="paso publicado-ok">
            <div class="ok-hex"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></div>
            <h3>¡Publicado!</h3>
            <p>«${esc(item.titulo)}» ya está en la web. Puede tardar hasta 5 minutos en verse para todo el mundo.</p>
            <div class="publicar-acciones centrado">
              <a class="btn" href="${cfg.pagina}" target="_blank" rel="noopener">Verlo en la web ${I.externo}</a>
              <button class="btn btn--linea otro" type="button">Publicar otra cosa</button>
            </div>
          </div>`;
        $(".otro", caja).addEventListener("click", () => escritorio("publicar"));
        const cuenta = $('.panel-tabs [data-tab="publicado"] .cuenta', raiz); if (cuenta) cuenta.textContent = datos.items.length;
      } catch (ex) {
        listo(btn);
        err.textContent = "No se ha podido publicar: " + ex.message;
        err.hidden = false;
      }
    });
  }

  /* ------------------------------------------------------------ Publicado */
  function vistaPublicado(cuerpo) {
    const lista = [...datos.items].reverse();
    cuerpo.innerHTML = `
      <section class="paso">
        <div class="publicado-cab">
          <h3>Lo que has publicado desde el panel</h3>
          <select class="filtro-sec"><option value="">Todas las secciones</option>${Object.entries(SECCIONES).map(([k, v]) => `<option value="${k}">${v.nombre}</option>`).join("")}</select>
        </div>
        <p class="nota">Ocultar lo quita de la web pero lo guarda. Borrar lo elimina también de Drive (va a la papelera).</p>
        <div class="lista-publicado"></div>
      </section>`;
    const cont = $(".lista-publicado", cuerpo);
    function pintar() {
      const f = $(".filtro-sec", cuerpo).value;
      const l = lista.filter((i) => !f || i.seccion === f);
      cont.innerHTML = l.length ? l.map((i) => `
        <article class="fila-pub${i.visible === "no" ? " oculto" : ""}" data-id="${esc(i.id)}">
          <span class="fp-sec">${esc((SECCIONES[i.seccion] || {}).nombre || i.seccion)}</span>
          <div class="fp-info"><b>${esc(i.titulo)}</b><small>${esc(i.fecha || "")}${i.visible === "no" ? " · Oculto" : ""}${i.url ? ` · <a href="${esc(i.url)}" target="_blank" rel="noopener">abrir</a>` : ""}</small></div>
          <div class="fp-acciones">
            <button class="btn btn--sm btn--linea" data-acc="visible">${i.visible === "no" ? "Mostrar" : "Ocultar"}</button>
            <button class="btn btn--sm btn--peligro" data-acc="eliminar">Borrar</button>
          </div>
        </article>`).join("") : `<div class="vacio"><div class="hexvacio"></div><p>Todavía no hay nada publicado desde el panel.</p></div>`;
    }
    $(".filtro-sec", cuerpo).addEventListener("change", pintar);
    cont.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-acc]");
      if (!b) return;
      const fila = b.closest(".fila-pub"), id = fila.dataset.id, it = datos.items.find((x) => x.id === id);
      if (b.dataset.acc === "eliminar" && !confirm(`¿Borrar «${it.titulo}» de la web? También se enviará su archivo a la papelera de Drive.`)) return;
      cargando(b, "");
      try {
        if (b.dataset.acc === "visible") { await api({ accion: "visible", id, visible: it.visible === "no" }); it.visible = it.visible === "no" ? "" : "no"; toast(it.visible === "no" ? "Oculto de la web" : "Visible de nuevo"); }
        else { await api({ accion: "eliminar", id }); datos.items = datos.items.filter((x) => x.id !== id); lista.splice(lista.indexOf(it), 1); toast("Borrado"); }
        pintar();
      } catch (ex) { listo(b); toast(ex.message, "mal"); }
    });
    pintar();
  }

  /* ----------------------------------------------------------- Propuestas */
  const MAPA_TIPO = { "Tema": "temas", "Oración": "oraciones", "Aviso": "avisos", "Provincia": "provincia", "Documento del centro": "documentos" };

  function vistaPropuestas(cuerpo) {
    const l = datos.propuestas;
    cuerpo.innerHTML = `
      <section class="paso">
        <h3>Material enviado desde «Enviar material»</h3>
        <p class="nota">Cada propuesta llega también al correo. Dale el formato corporativo y pulsa «Publicar» para subir la versión final.</p>
        <div class="lista-prop">${l.length ? l.map((p) => `
          <article class="prop ${esc(p.estado)}" data-id="${esc(p.id)}">
            <div class="prop-cab"><span class="fp-sec">${esc(p.tipo_material || "Material")}</span><span class="estado">${esc(p.estado)}</span><small>${esc(p.recibido)}</small></div>
            <h4>${esc(p.titulo)}</h4>
            <p class="prop-de">De <b>${esc(p.nombre)}</b>${p.correo ? ` · <a href="mailto:${esc(p.correo)}?subject=${encodeURIComponent("Tu material para la web: " + p.titulo)}">${esc(p.correo)}</a>` : ""}${p.fecha ? ` · Fecha: ${esc(p.fecha)}` : ""}</p>
            ${p.texto ? `<details><summary>Ver texto</summary><p class="prop-texto">${esc(p.texto)}</p></details>` : ""}
            <div class="fp-acciones">
              ${p.archivo ? `<a class="btn btn--sm btn--linea" href="${esc(p.archivo)}" target="_blank" rel="noopener">Abrir archivo</a>` : ""}
              ${p.enlace ? `<a class="btn btn--sm btn--linea" href="${esc(p.enlace)}" target="_blank" rel="noopener">Abrir enlace</a>` : ""}
              ${p.estado !== "publicada" ? `<button class="btn btn--sm btn--oro" data-acc="publicar">Publicar</button>` : ""}
              ${p.estado === "pendiente" ? `<button class="btn btn--sm btn--linea" data-acc="revisada">Marcar como revisada</button>` : ""}
            </div>
          </article>`).join("") : `<div class="vacio"><div class="hexvacio"></div><p>No hay propuestas por ahora.</p></div>`}
        </div>
      </section>`;
    cuerpo.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-acc]");
      if (!b) return;
      const p = datos.propuestas.find((x) => x.id === b.closest(".prop").dataset.id);
      if (b.dataset.acc === "revisada") {
        cargando(b, "");
        try { await api({ accion: "estado-propuesta", id: p.id, estado: "revisada" }); p.estado = "revisada"; vistaPropuestas(cuerpo); }
        catch (ex) { listo(b); toast(ex.message, "mal"); }
      } else {
        prefijo = p.id;
        $$(".panel-tabs button", raiz).forEach((x) => x.setAttribute("aria-selected", String(x.dataset.tab === "publicar")));
        vistaPublicar(cuerpo, MAPA_TIPO[p.tipo_material] || "temas", { titulo: p.titulo, texto: p.texto, fecha: p.fecha, url: p.enlace || p.archivo });
        toast("Revisa los datos. Si le has dado formato, sube el archivo final.");
      }
    }, { once: false });
  }

  /* ---------------------------------------------------------------- Ayuda */
  function vistaAyuda(cuerpo) {
    cuerpo.innerHTML = `
      <section class="paso ayuda">
        <h3>Publicar en 3 pasos</h3>
        <ol class="pasos">
          <li><div><b>Elige qué es</b><span>Tema, oración, aviso, fecha, documento o comunicado.</span></div></li>
          <li><div><b>Rellena el título y sube el archivo</b><span>Arrástralo o pega un enlace de Drive o YouTube. Abajo ves cómo quedará.</span></div></li>
          <li><div><b>Pulsa «Publicar»</b><span>El archivo se guarda en el Drive del centro y aparece en la web en unos minutos.</span></div></li>
        </ol>
        <h3>Preguntas frecuentes</h3>
        <details><summary>¿Me he equivocado, cómo lo cambio?</summary><p>En «Publicado», bórralo y vuelve a publicarlo bien. También puedes corregirlo directamente en la Hoja (botón «Hoja» arriba).</p></details>
        <details><summary>¿Dónde están los archivos?</summary><p>En Google Drive de la cuenta del centro, carpeta «Web SSCC Nervión», ordenados por sección (botón «Drive» arriba).</p></details>
        <details><summary>Me llegan propuestas por correo, ¿qué hago?</summary><p>Ábrelas en «Propuestas», dales el formato corporativo con las plantillas y pulsa «Publicar». Si no se publican, márcalas como revisadas.</p></details>
        <details><summary>¿Cómo quito un aviso pasado?</summary><p>No hace falta: si pusiste «Visible hasta», pasa solo a «Avisos anteriores». También puedes ocultarlo en «Publicado».</p></details>
        <details><summary>He olvidado la clave</summary><p>Está al principio del código del servidor en script.google.com (cuenta del centro), en la línea <code>const CLAVE</code>.</p></details>
      </section>`;
  }

  /* --------------------------------------------------------------- Inicio */
  if (!CFG.apiGoogle) sinConexion();
  else if (clave) escritorio();
  else pantallaEntrar();
})();

/* =========================================================================
   PVA · lector tipo libro con índice lateral y vídeos del «PVA ¡vivo!»
   Usa PDF.js para mostrar el documento original página a página.
   ========================================================================= */
(function () {
  "use strict";
  const D = window.SSCC_PVA;
  const S = window.SSCC;
  if (!D || !S) return;
  const { esc, $, $$, I } = S;
  const lector = $("#pva-lector");
  if (!lector) return;

  const ICO_VIDEO = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  const verVideo = (a) => S.abrir({ titulo: `Estatuto · Artículo ${a.n} · ${a.t}`, url: `https://youtu.be/${a.v}`, tipo: "video" });

  /* ---------------------------------------------------------- Índice */
  const marcas = []; // {p, y, el}
  function filaArticulo(a) {
    return `<li><button class="ind-art" data-p="${a.p}" data-y="${a.y}" type="button"><span class="ind-n">${a.n}</span><span class="ind-t">${esc(a.t)}</span></button>${a.v ? `<button class="ind-video" data-v="${a.k}" type="button" aria-label="Ver el vídeo del artículo ${a.n}" title="Ver vídeo">${ICO_VIDEO}</button>` : ""}</li>`;
  }
  const todosArt = [];
  D.indice.forEach((s) => { (s.caps || []).forEach((c) => todosArt.push(...c.arts)); (s.arts || []).forEach((a) => todosArt.push(a)); });

  const indice = $(".pva-indice-lista", lector);
  indice.innerHTML = D.indice.map((s) => {
    if (s.caps) {
      return `<li class="ind-grupo"><button class="ind-sec" data-p="${s.p}" data-y="${s.y}" type="button">${esc(s.t)}</button>
        <ul>${(s.pre || []).map((x) => `<li><button class="ind-sec ind-pre" data-p="${x.p}" data-y="${x.y}" type="button">${esc(x.t)}</button></li>`).join("")}${s.caps.map((c) => `
          <li class="ind-cap">
            <details${c.id === "cI" || c.id === "rcI" ? " open" : ""}>
              <summary><button class="ind-capbtn" data-p="${c.p}" data-y="${c.y}" type="button"><b>${esc(c.t)}</b><small>${esc(c.sub)}</small></button></summary>
              <ul>${c.arts.map(filaArticulo).join("")}</ul>
            </details>
          </li>`).join("")}</ul></li>`;
    }
    return `<li><button class="ind-sec" data-p="${s.p}" data-y="${s.y}" type="button">${esc(s.t)}</button>${s.arts ? `<ul>${s.arts.map(filaArticulo).join("")}</ul>` : ""}</li>`;
  }).join("") + (D.extra || []).map((x) => `<li><button class="ind-sec ind-extra" data-p="${x.p}" data-y="${x.y}" type="button">${esc(x.t)}</button></li>`).join("");
  $$("[data-p]", indice).forEach((el) => marcas.push({ p: +el.dataset.p, y: +el.dataset.y, el }));
  marcas.sort((a, b) => a.p - b.p || a.y - b.y);

  /* Buscador del índice */
  $(".pva-buscar", lector).addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
    $$("li", indice).forEach((li) => {
      const t = li.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      li.hidden = q && !t.includes(q);
    });
    $$("details", indice).forEach((d) => { if (q) d.open = true; });
  });

  /* --------------------------------------------------------- Páginas */
  const cont = $(".pva-paginas", lector);
  const estado = $(".pva-pagina-actual", lector);
  const N = D.paginas;
  cont.innerHTML = Array.from({ length: N }, (_, i) => `<div class="pva-pagina" data-n="${i + 1}" id="pva-pag-${i + 1}"><span class="pva-cargando">Página ${i + 1}</span></div>`).join("");
  const paginas = $$(".pva-pagina", cont);
  let pdf = null, zoom = 1;

  function irA(p, y = 0, suave = true) {
    const el = paginas[p - 1];
    if (!el) return;
    const destino = el.offsetTop + el.offsetHeight * y - 12;
    cont.scrollTo({ top: Math.max(0, destino), behavior: suave ? "smooth" : "auto" });
    lector.classList.remove("indice-abierto");
  }

  async function pintarPagina(el) {
    if (!pdf || el.dataset.hecha === String(zoom) + "|" + cont.clientWidth) return;
    const n = +el.dataset.n;
    const pagina = await pdf.getPage(n);
    const ancho = Math.min(cont.clientWidth - 24, 900) * zoom;
    const vp1 = pagina.getViewport({ scale: 1 });
    const escala = ancho / vp1.width;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vp = pagina.getViewport({ scale: escala * dpr });
    const canvas = document.createElement("canvas");
    canvas.width = vp.width; canvas.height = vp.height;
    canvas.style.width = ancho + "px";
    canvas.setAttribute("aria-label", `Página ${n} del Proyecto de Vida Apostólica`);
    await pagina.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
    el.innerHTML = "";
    el.append(canvas);
    el.dataset.hecha = String(zoom) + "|" + cont.clientWidth;
  }

  function dimensionar() {
    const ancho = Math.min(cont.clientWidth - 24, 900) * zoom;
    paginas.forEach((el) => { el.style.width = ancho + "px"; el.style.height = ancho * (842 / 595.22) + "px"; });
  }

  const obs = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) pintarPagina(e.target); }), { root: cont, rootMargin: "800px 0px" });

  // página visible + resaltar sección del índice
  let tic = false;
  cont.addEventListener("scroll", () => {
    if (tic) return;
    tic = true;
    requestAnimationFrame(() => {
      tic = false;
      const mitad = cont.scrollTop + cont.clientHeight * 0.3;
      let actual = 1;
      for (const el of paginas) { if (el.offsetTop <= mitad) actual = +el.dataset.n; else break; }
      estado.textContent = `${actual} / ${N}`;
      const el = paginas[actual - 1];
      const yRel = Math.min(1, Math.max(0, (mitad - el.offsetTop) / el.offsetHeight));
      let marca = marcas[0];
      for (const m of marcas) { if (m.p < actual || (m.p === actual && m.y <= yRel)) marca = m; }
      $$(".activo", indice).forEach((x) => x.classList.remove("activo"));
      if (marca) {
        marca.el.classList.add("activo");
        const det = marca.el.closest("details"); if (det && !det.open) det.open = true;
        const caja = $(".pva-indice", lector);
        const r = marca.el.getBoundingClientRect(), rc = caja.getBoundingClientRect();
        if (r.top < rc.top + 60 || r.bottom > rc.bottom - 20) caja.scrollTop += r.top - rc.top - rc.height / 3;
      }
    });
  });

  /* ------------------------------------------------------- Controles */
  lector.addEventListener("click", (e) => {
    const v = e.target.closest(".ind-video");
    if (v) { verVideo(todosArt.find((a) => a.k === v.dataset.v)); return; }
    const b = e.target.closest("[data-p]");
    if (b && indice.contains(b)) { e.preventDefault(); irA(+b.dataset.p, +b.dataset.y); return; }
    const acc = e.target.closest("[data-pva]");
    if (!acc) return;
    const actual = parseInt(estado.textContent, 10) || 1;
    if (acc.dataset.pva === "ant") irA(Math.max(1, actual - 1));
    if (acc.dataset.pva === "sig") irA(Math.min(N, actual + 1));
    if (acc.dataset.pva === "mas" || acc.dataset.pva === "menos") {
      const prop = cont.scrollTop / cont.scrollHeight;
      zoom = Math.min(2, Math.max(0.6, zoom + (acc.dataset.pva === "mas" ? 0.2 : -0.2)));
      dimensionar(); cont.scrollTop = prop * cont.scrollHeight;
      paginas.forEach((el) => { const r = el.getBoundingClientRect(), rc = cont.getBoundingClientRect(); if (r.bottom > rc.top - 800 && r.top < rc.bottom + 800) pintarPagina(el); });
    }
    if (acc.dataset.pva === "indice") lector.classList.toggle("indice-abierto");
    if (acc.dataset.pva === "completa") {
      if (document.fullscreenElement) document.exitFullscreen();
      else (lector.requestFullscreen || lector.webkitRequestFullscreen || (() => {})).call(lector);
    }
  });
  addEventListener("keydown", (e) => {
    if (!lector.matches(":hover") && !document.fullscreenElement) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); $('[data-pva="sig"]', lector).click(); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); $('[data-pva="ant"]', lector).click(); }
  });
  let rz;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { dimensionar(); }, 200); });

  /* ------------------------------------------------- Cargar el documento */
  dimensionar();
  const lib = window.pdfjsLib;
  if (!lib) { cont.innerHTML = `<div class="vacio"><p>No se ha podido cargar el lector. <a href="${esc(D.pdf)}" target="_blank" rel="noopener">Abre el PDF aquí</a>.</p></div>`; }
  else {
    lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    lib.getDocument(D.pdf).promise.then((doc) => {
      pdf = doc;
      lector.classList.add("listo");
      paginas.forEach((el) => obs.observe(el));
      const h = location.hash.match(/^#art-([er]?\d+)$/);
      if (h) { const k = /^\d/.test(h[1]) ? "e" + h[1] : h[1]; const a = todosArt.find((x) => x.k === k); if (a) setTimeout(() => irA(a.p, a.y, false), 300); }
    }).catch(() => { cont.innerHTML = `<div class="vacio"><p>No se ha podido abrir el documento. <a href="${esc(D.pdf)}" target="_blank" rel="noopener">Descárgalo aquí</a>.</p></div>`; });
  }

  /* ---------------------------------------------- PVA ¡vivo! (desplegable) */
  const vivo = $("#pva-vivo-lista");
  if (vivo) {
    const caps = D.indice.find((s) => s.caps).caps;
    vivo.innerHTML = caps.map((c, i) => {
      const conVideo = c.arts.filter((a) => a.v).length;
      return `<details class="vivo-cap"${i === 0 ? " open" : ""}>
        <summary>
          <span class="vivo-num">${c.t.replace("Capítulo ", "")}</span>
          <span class="vivo-tit"><b>${esc(c.t)}</b><small>${esc(c.sub)}</small></span>
          <span class="vivo-cuenta">${conVideo ? `${conVideo} vídeo${conVideo > 1 ? "s" : ""}` : "Próximamente"}</span>
          <svg class="vivo-flecha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </summary>
        <ul>${c.arts.map((a) => `
          <li class="vivo-art${a.v ? "" : " sin-video"}">
            ${a.v ? `<button class="vivo-mini" data-v="${a.k}" type="button" style="background-image:url('https://i.ytimg.com/vi/${a.v}/mqdefault.jpg')" aria-label="Ver el vídeo del artículo ${a.n}"><span>${ICO_VIDEO}</span></button>` : `<span class="vivo-mini vacio-mini">Sin vídeo<br>todavía</span>`}
            <div><b>Artículo ${a.n}</b><span>${esc(a.t)}</span></div>
            <div class="vivo-acc">
              ${a.v ? `<button class="btn btn--sm" data-v="${a.k}" type="button">${ICO_VIDEO} Ver vídeo</button>` : ""}
              <button class="btn btn--sm btn--linea" data-leer="${a.k}" type="button">Leer</button>
            </div>
          </li>`).join("")}</ul>
      </details>`;
    }).join("");
    vivo.addEventListener("click", (e) => {
      const v = e.target.closest("[data-v]");
      if (v) { verVideo(todosArt.find((a) => a.k === v.dataset.v)); return; }
      const l = e.target.closest("[data-leer]");
      if (l) {
        const a = todosArt.find((x) => x.k === l.dataset.leer);
        lector.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => irA(a.p, a.y), 450);
      }
    });
  }
})();

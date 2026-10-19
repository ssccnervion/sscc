/* =========================================================================
   Calendario para suscribirse (formato iCalendar .ics)
   Vercel lo sirve en https://sscc-nervion.vercel.app/calendario.ics
   Junta las fechas de assets/js/contenido.js y las publicadas desde el panel
   (servidor de Google). Los móviles lo vuelven a leer cada pocas horas.
   ========================================================================= */
const vm = require("vm");

async function leerJS(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo leer " + url);
  const ctx = { window: {} };
  vm.runInNewContext(await r.text(), ctx, { timeout: 1000 });
  return ctx.window;
}

const esc = (t) => String(t || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// Las líneas de un .ics no deben pasar de 75 bytes
function plegar(linea) {
  const bytes = Buffer.from(linea, "utf8");
  if (bytes.length <= 75) return linea;
  const partes = [];
  let actual = "";
  for (const ch of linea) {
    if (Buffer.byteLength(actual + ch, "utf8") > (partes.length ? 74 : 75)) { partes.push(actual); actual = ""; }
    actual += ch;
  }
  partes.push(actual);
  return partes.join("\r\n ");
}

function uid(e) {
  let h = 0;
  const s = `${e.fecha}|${e.hora}|${e.titulo}`;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return `${e.fecha.replace(/-/g, "")}-${(h >>> 0).toString(36)}@sscc-nervion`;
}

function sumarMinutos(fecha, hora, min) {
  const [y, m, d] = fecha.split("-").map(Number);
  const [hh, mm] = hora.split(":").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, hh, mm + min));
  const p = (n) => String(n).padStart(2, "0");
  return `${t.getUTCFullYear()}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}T${p(t.getUTCHours())}${p(t.getUTCMinutes())}00`;
}

function diaSiguiente(fecha) {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10).replace(/-/g, "");
}

module.exports = async (req, res) => {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const base = `${proto}://${req.headers.host}`;
  let eventos = [];
  let cfg = {};
  try {
    const w = await leerJS(`${base}/assets/js/contenido.js`);
    eventos = (w.SSCC_CONTENIDO || []).filter((x) => x.seccion === "calendario");
  } catch (e) { /* sin contenido local */ }
  try { cfg = (await leerJS(`${base}/assets/js/config.js`)).SSCC_CONFIG || {}; } catch (e) {}
  if (cfg.apiGoogle) {
    try {
      const r = await fetch(cfg.apiGoogle + "?accion=contenido", { redirect: "follow" });
      const j = await r.json();
      if (j.ok) eventos = eventos.concat((j.items || []).filter((x) => x.seccion === "calendario"));
    } catch (e) { /* si Google no responde, se sirven las fechas locales */ }
  }

  // ?ambitos=centro,provincia → solo esas fechas
  const q = new URL(req.url || "/", base).searchParams.get("ambitos");
  const elegidos = q ? q.split(",").map((x) => x.trim().toLowerCase()) : null;
  const ambitoDe = (e) => ({ "región": "region", region: "region", provincia: "provincia" })[String(e.ambito || "").toLowerCase()] || "centro";
  if (elegidos) eventos = eventos.filter((e) => elegidos.includes(ambitoDe(e)));
  const PREFIJO = { provincia: "[Provincia] ", region: "[Región] ", centro: "" };

  const ahora = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const nombre = `Salesianos Cooperadores · ${cfg.centro || "Centro Nervión"}`;
  const L = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SSCC Nervion//Calendario//ES", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(nombre)}`, "X-WR-TIMEZONE:Europe/Madrid",
    `X-WR-CALDESC:${esc("Encuentros del Centro de Salesianos Cooperadores de Nervión (Sevilla)")}`,
    "REFRESH-INTERVAL;VALUE=DURATION:PT6H", "X-PUBLISHED-TTL:PT6H",
    "BEGIN:VTIMEZONE", "TZID:Europe/Madrid",
    "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
    "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
    "END:VTIMEZONE"
  ];
  const vistos = new Set();
  for (const e of eventos) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.fecha || "")) continue;
    const id = uid(e);
    if (vistos.has(id)) continue;
    vistos.add(id);
    L.push("BEGIN:VEVENT", `UID:${id}`, `DTSTAMP:${ahora}`);
    const fin = /^\d{4}-\d{2}-\d{2}$/.test(e.fin || "") ? e.fin : "";
    if (/^\d{1,2}:\d{2}$/.test(e.hora || "") && !fin) {
      const ini = sumarMinutos(e.fecha, e.hora, 0);
      L.push(`DTSTART;TZID=Europe/Madrid:${ini}`, `DTEND;TZID=Europe/Madrid:${sumarMinutos(e.fecha, e.hora, 90)}`);
    } else {
      L.push(`DTSTART;VALUE=DATE:${e.fecha.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${diaSiguiente(fin || e.fecha)}`);
    }
    L.push(`SUMMARY:${esc(PREFIJO[ambitoDe(e)] + e.titulo)}`, `CATEGORIES:${ambitoDe(e) === "region" ? "Región" : ambitoDe(e) === "provincia" ? "Provincia" : "Centro"}`);
    if (e.lugar) L.push(`LOCATION:${esc(e.lugar)}`);
    const desc = [e.descripcion, `${base}/calendario.html`].filter(Boolean).join("\n\n");
    L.push(`DESCRIPTION:${esc(desc)}`, `URL:${base}/calendario.html`, "END:VEVENT");
  }
  L.push("END:VCALENDAR");

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", 'inline; filename="sscc-nervion.ics"');
  res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
  res.status(200).send(L.map(plegar).join("\r\n") + "\r\n");
};

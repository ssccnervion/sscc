/* =========================================================================
   WEB SSCC NERVIÓN · SERVIDOR EN GOOGLE (Apps Script)
   -------------------------------------------------------------------------
   Este código vive en la cuenta sscc.nervion@gmail.com y hace tres cosas:
     1. Guarda el material de la web en una Hoja de cálculo y sus archivos
        en Google Drive (carpeta «Web SSCC Nervión»).
     2. Recibe lo que la gente manda desde «Enviar material» y avisa por correo.
     3. Atiende al panel de gestión de la web (publicar, ocultar, borrar…).

   INSTALACIÓN (una sola vez, ver GUIA-GESTION):
     1. Cambia la CLAVE de abajo por una que solo sepa el equipo de la web.
     2. Ejecuta la función «instalar» y acepta los permisos.
     3. Implementar → Nueva implementación → Aplicación web
        (Ejecutar como: yo · Acceso: cualquier usuario) y copia la URL.
   ========================================================================= */

const CLAVE = "cambia-esta-clave";   // ← ESCRIBE AQUÍ LA CLAVE DEL PANEL (entre las comillas)
const CORREO_AVISOS = "sscc.nervion@gmail.com";  // dónde llegan las propuestas
const URL_WEB = "https://sscc-nervion.vercel.app/";
const NOMBRE_CARPETA = "Web SSCC Nervión";

const HOJA = "Material";
const HOJA_PROP = "Propuestas";
const COLUMNAS = ["id", "seccion", "titulo", "descripcion", "tipo", "url", "fecha", "curso", "etiquetas",
  "destacado", "texto", "caduca", "hora", "lugar", "archivo", "visible", "creado", "emergente", "imagen", "ambito", "fin", "evento"];
const COL_PROP = ["id", "recibido", "nombre", "correo", "tipo_material", "titulo", "texto", "fecha",
  "enlace", "archivo", "estado"];
const SUBCARPETAS = { temas: "Temas", oraciones: "Oraciones", provincia: "Provincia", documentos: "Documentos del centro", elenco: "Elenco", consejo: "Consejo local", grupos: "Grupos",
  avisos: "Avisos", calendario: "Calendario", "provincia-web": "Provincia", propuestas: "Propuestas recibidas" };
const TEXTO_PLANO = ["fecha", "curso", "hora", "caduca", "recibido", "creado", "fin", "evento"];

/* ------------------------------------------------------------- Instalar */
function instalar() {
  const ss = libro();
  Object.values(SUBCARPETAS).forEach((n) => carpeta(n));
  Logger.log("✅ Instalado.");
  Logger.log("Hoja de cálculo: " + ss.getUrl());
  Logger.log("Carpeta de Drive: " + carpeta().getUrl());
  Logger.log("Ahora: Implementar → Nueva implementación → Aplicación web.");
}

function libro() {
  const props = PropertiesService.getScriptProperties();
  let ss = null;
  const id = props.getProperty("LIBRO");
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create("Web SSCC Nervión · Contenido");
    props.setProperty("LIBRO", ss.getId());
    try { DriveApp.getFileById(ss.getId()).moveTo(carpeta()); } catch (e) {}
  }
  hoja(ss, HOJA, COLUMNAS);
  hoja(ss, HOJA_PROP, COL_PROP);
  const sobrante = ss.getSheets().find((h) => h.getName() !== HOJA && h.getName() !== HOJA_PROP && h.getLastRow() === 0);
  if (sobrante && ss.getSheets().length > 2) ss.deleteSheet(sobrante);
  return ss;
}

function hoja(ss, nombre, cols) {
  let h = ss.getSheetByName(nombre);
  if (h) {
    // Añade las columnas nuevas que falten (al actualizar el código)
    const cab = h.getRange(1, 1, 1, Math.max(1, h.getLastColumn())).getValues()[0];
    cols.filter((c) => cab.indexOf(c) < 0).forEach((c) => {
      const col = h.getLastColumn() + 1;
      h.getRange(1, col).setValue(c).setFontWeight("bold").setBackground("#006a92").setFontColor("#ffffff");
    });
  }
  if (!h) {
    h = ss.insertSheet(nombre);
    h.getRange(1, 1, 1, cols.length).setValues([cols])
      .setFontWeight("bold").setBackground("#006a92").setFontColor("#ffffff");
    h.setFrozenRows(1);
    cols.forEach((c, i) => { if (TEXTO_PLANO.includes(c)) h.getRange(2, i + 1, h.getMaxRows() - 1, 1).setNumberFormat("@"); });
  }
  return h;
}

function carpeta(sub) {
  const props = PropertiesService.getScriptProperties();
  let raiz = null;
  const id = props.getProperty("CARPETA");
  if (id) { try { raiz = DriveApp.getFolderById(id); } catch (e) { raiz = null; } }
  if (!raiz) { raiz = DriveApp.createFolder(NOMBRE_CARPETA); props.setProperty("CARPETA", raiz.getId()); }
  if (!sub) return raiz;
  const it = raiz.getFoldersByName(sub);
  return it.hasNext() ? it.next() : raiz.createFolder(sub);
}

/* ------------------------------------------------------------ Utilidades */
function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function celda(v, col) {
  if (v instanceof Date) {
    if (col === "hora") return Utilities.formatDate(v, "Europe/Madrid", "HH:mm");
    if (col === "creado" || col === "recibido") return Utilities.formatDate(v, "Europe/Madrid", "yyyy-MM-dd HH:mm");
    return Utilities.formatDate(v, "Europe/Madrid", "yyyy-MM-dd");
  }
  return v === null || v === undefined ? "" : String(v);
}

function filas(nombre) {
  const h = libro().getSheetByName(nombre);
  const datos = h.getDataRange().getValues();
  const cab = datos.shift() || [];
  return datos.filter((f) => f.some((v) => v !== "")).map((f, i) => {
    const o = { _fila: i + 2 };
    cab.forEach((c, j) => (o[c] = celda(f[j], c)));
    return o;
  });
}

function anadir(nombre, cols, obj) {
  const h = libro().getSheetByName(nombre);
  const cab = h.getRange(1, 1, 1, h.getLastColumn()).getValues()[0];   // respeta el orden real de la hoja
  h.appendRow(cab.map((c) => (obj[c] === undefined ? "" : obj[c])));
}

function buscarFila(nombre, id) {
  return filas(nombre).find((r) => r.id === id);
}

function cambiar(nombre, id, campo, valor) {
  const h = libro().getSheetByName(nombre);
  const cab = h.getRange(1, 1, 1, h.getLastColumn()).getValues()[0];
  const r = buscarFila(nombre, id);
  if (!r) throw new Error("No encontrado");
  h.getRange(r._fila, cab.indexOf(campo) + 1).setValue(valor);
}

function guardarArchivo(archivo, sub) {
  if (!archivo || !archivo.base64) return null;
  const blob = Utilities.newBlob(Utilities.base64Decode(archivo.base64), archivo.tipo || "application/octet-stream", archivo.nombre || "archivo");
  const f = carpeta(SUBCARPETAS[sub] || sub).createFile(blob);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return f;
}

function limpiarCache() { CacheService.getScriptCache().remove("contenido"); }

function curso(fecha) {
  const m = /^(\d{4})-(\d{2})/.exec(fecha || "");
  if (!m) return "";
  const a = Number(m[1]), mes = Number(m[2]);
  const ini = mes >= 9 ? a : a - 1;
  return ini + "-" + String(ini + 1).slice(2);
}

function comprobarClave(d) {
  const clave = String(CLAVE || "").trim();
  if (clave.length < 4 || /^cambia/i.test(clave)) throw new Error("Falta poner la clave en el servidor (línea const CLAVE)");
  if (!d || String(d.clave || "").trim() !== clave) throw new Error("Clave incorrecta");
}

/* ------------------------------------------------------- Lectura pública */
function doGet(e) {
  const accion = (e && e.parameter && e.parameter.accion) || "contenido";
  if (accion === "contenido") {
    const cache = CacheService.getScriptCache();
    const guardado = cache.get("contenido");
    if (guardado) return ContentService.createTextOutput(guardado).setMimeType(ContentService.MimeType.JSON);
    const items = filas(HOJA).filter((r) => r.visible !== "no").map((r) => { delete r._fila; delete r.visible; return r; });
    const importado = PropertiesService.getScriptProperties().getProperty("IMPORTADO") === "si";
    const json = JSON.stringify({ ok: true, importado: importado, items: items });
    try { cache.put("contenido", json, 300); } catch (err) {}
    return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
  }
  return respuesta({ ok: true, servicio: "Web SSCC Nervión" });
}

/* --------------------------------------------- Escritura (web y panel) */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    switch (d.accion) {
      case "proponer": return respuesta(proponer(d));
      case "entrar": comprobarClave(d); return respuesta({ ok: true });
      case "listar": comprobarClave(d); return respuesta({ ok: true, importado: PropertiesService.getScriptProperties().getProperty("IMPORTADO") === "si", items: filas(HOJA), propuestas: filas(HOJA_PROP).reverse(), hoja: libro().getUrl(), carpeta: carpeta().getUrl() });
      case "publicar": comprobarClave(d); return respuesta(publicar(d));
      case "visible": comprobarClave(d); cambiar(HOJA, d.id, "visible", d.visible ? "" : "no"); limpiarCache(); return respuesta({ ok: true });
      case "eliminar": comprobarClave(d); return respuesta(eliminar(d));
      case "editar": comprobarClave(d); return respuesta(editar(d));
      case "importar": comprobarClave(d); return respuesta(importar(d));
      case "estado-propuesta": comprobarClave(d); cambiar(HOJA_PROP, d.id, "estado", d.estado || "revisada"); return respuesta({ ok: true });
      default: return respuesta({ ok: false, error: "Acción desconocida" });
    }
  } catch (err) {
    return respuesta({ ok: false, error: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function publicar(d) {
  const it = d.item || {};
  if (!it.titulo || !it.seccion) throw new Error("Faltan el título o la sección");
  const f = guardarArchivo(d.archivo, it.seccion);
  const esImagen = f && /^image\//.test(f.getMimeType());
  const cartel = ["avisos", "elenco", "consejo"].indexOf(it.seccion) >= 0 && esImagen;   // cartel del aviso o foto de la persona
  const fila = {
    id: Utilities.getUuid(),
    seccion: it.seccion,
    titulo: it.titulo,
    descripcion: it.descripcion || "",
    tipo: it.tipo || "",
    url: f && !cartel ? f.getUrl() : (it.url || ""),
    fecha: it.fecha || Utilities.formatDate(new Date(), "Europe/Madrid", "yyyy-MM-dd"),
    curso: it.curso || curso(it.fecha),
    etiquetas: Array.isArray(it.etiquetas) ? it.etiquetas.join(", ") : (it.etiquetas || ""),
    destacado: it.destacado ? "sí" : "",
    texto: it.texto || "",
    caduca: it.caduca || "",
    hora: it.hora || "",
    lugar: it.lugar || "",
    archivo: f ? f.getId() : (it.archivo || ""),
    visible: "",
    creado: Utilities.formatDate(new Date(), "Europe/Madrid", "yyyy-MM-dd HH:mm"),
    emergente: it.emergente ? "sí" : "",
    imagen: cartel ? "https://drive.google.com/thumbnail?id=" + f.getId() + "&sz=w1200" : (it.imagen || ""),
    ambito: it.ambito || "",
    fin: it.fin || "",
    evento: it.evento || ""
  };
  anadir(HOJA, COLUMNAS, fila);
  if (d.propuesta) { try { cambiar(HOJA_PROP, d.propuesta, "estado", "publicada"); } catch (e) {} }
  limpiarCache();
  return { ok: true, item: fila };
}

/* Modifica una fila ya publicada. Si llega un archivo nuevo, sustituye al anterior. */
function editar(d) {
  const r = buscarFila(HOJA, d.id);
  if (!r) throw new Error("No encontrado");
  const it = d.item || {};
  const h = libro().getSheetByName(HOJA);
  const cab = h.getRange(1, 1, 1, h.getLastColumn()).getValues()[0];
  const valores = {};
  ["titulo", "descripcion", "tipo", "url", "fecha", "etiquetas", "texto", "caduca", "hora", "lugar", "ambito", "fin", "imagen", "evento", "archivo"].forEach((c) => {
    if (it[c] === undefined || (c === "archivo" && !it[c])) return;
    valores[c] = Array.isArray(it[c]) ? it[c].join(", ") : it[c];
  });
  if (it.destacado !== undefined) valores.destacado = it.destacado ? "sí" : "";
  if (it.emergente !== undefined) valores.emergente = it.emergente ? "sí" : "";
  if (valores.fecha) valores.curso = it.curso || curso(valores.fecha);
  const seccion = it.seccion || r.seccion;
  const f = guardarArchivo(d.archivo, seccion);
  if (f) {
    const foto = ["avisos", "elenco", "consejo"].indexOf(seccion) >= 0 && /^image\//.test(f.getMimeType());
    if (foto) valores.imagen = "https://drive.google.com/thumbnail?id=" + f.getId() + "&sz=w1200";
    else valores.url = f.getUrl();
    if (r.archivo && !/^https?:/.test(r.archivo)) { try { DriveApp.getFileById(r.archivo).setTrashed(true); } catch (e) {} }
    valores.archivo = f.getId();
  }
  Object.keys(valores).forEach((c) => {
    const col = cab.indexOf(c);
    if (col >= 0) h.getRange(r._fila, col + 1).setValue(valores[c]);
  });
  limpiarCache();
  return { ok: true };
}

/* Pasa a la hoja una lista de elementos (p. ej. el elenco del censo) para poder editarlos desde el panel. */
function importar(d) {
  const lista = d.items || [];
  const ahora = Utilities.formatDate(new Date(), "Europe/Madrid", "yyyy-MM-dd HH:mm");
  lista.forEach((it) => {
    const fila = { id: Utilities.getUuid(), creado: ahora, visible: "" };
    COLUMNAS.forEach((c) => {
      if (c === "id" || c === "creado" || c === "visible" || it[c] === undefined || it[c] === null) return;
      fila[c] = Array.isArray(it[c]) ? it[c].join(", ") : (it[c] === true ? "sí" : it[c] === false ? "" : it[c]);
    });
    if (!fila.curso && fila.fecha) fila.curso = curso(fila.fecha);
    anadir(HOJA, COLUMNAS, fila);
  });
  if (d.final) PropertiesService.getScriptProperties().setProperty("IMPORTADO", "si");
  limpiarCache();
  return { ok: true, n: lista.length, importado: !!d.final };
}

function eliminar(d) {
  const r = buscarFila(HOJA, d.id);
  if (!r) throw new Error("No encontrado");
  if (r.archivo && !/^https?:/.test(r.archivo)) { try { DriveApp.getFileById(r.archivo).setTrashed(true); } catch (e) {} }
  libro().getSheetByName(HOJA).deleteRow(r._fila);
  limpiarCache();
  return { ok: true };
}

function proponer(d) {
  if (d._honey) return { ok: true };                       // robot
  const p = d.propuesta || {};
  if (!p.titulo || !p.nombre) throw new Error("Faltan datos");
  const f = guardarArchivo(d.archivo, "propuestas");
  const fila = {
    id: Utilities.getUuid(),
    recibido: Utilities.formatDate(new Date(), "Europe/Madrid", "yyyy-MM-dd HH:mm"),
    nombre: p.nombre, correo: p.correo || "", tipo_material: p.tipo_material || "",
    titulo: p.titulo, texto: p.texto || "", fecha: p.fecha || "", enlace: p.enlace || "",
    archivo: f ? f.getUrl() : "", estado: "pendiente"
  };
  anadir(HOJA_PROP, COL_PROP, fila);
  try {
    const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    MailApp.sendEmail({
      to: CORREO_AVISOS,
      replyTo: p.correo || CORREO_AVISOS,
      subject: "[Web SSCC] " + (p.tipo_material || "Material") + ": " + p.titulo,
      htmlBody:
        '<div style="font-family:Arial,sans-serif;max-width:560px">' +
        '<div style="background:#006a92;color:#fff;padding:18px 22px;border-radius:12px 12px 0 0"><b style="font-size:18px">Nuevo material para la web</b><br>' + esc(p.tipo_material) + '</div>' +
        '<div style="border:1px solid #dde7ee;border-top:0;padding:18px 22px;border-radius:0 0 12px 12px">' +
        "<p><b>" + esc(p.titulo) + "</b></p>" +
        "<p>De: " + esc(p.nombre) + (p.correo ? " (" + esc(p.correo) + ")" : "") + "</p>" +
        (p.fecha ? "<p>Fecha: " + esc(p.fecha) + "</p>" : "") +
        (p.texto ? '<p style="white-space:pre-wrap;background:#f5f8fa;padding:12px;border-radius:8px">' + esc(p.texto) + "</p>" : "") +
        (p.enlace ? '<p>Enlace: <a href="' + esc(p.enlace) + '">' + esc(p.enlace) + "</a></p>" : "") +
        (f ? '<p>Archivo: <a href="' + f.getUrl() + '">' + esc(f.getName()) + "</a></p>" : "") +
        '<p style="margin-top:20px"><a href="' + URL_WEB + 'panel.html" style="background:#ffb94a;color:#0d2533;padding:10px 18px;border-radius:20px;text-decoration:none;font-weight:bold">Abrir el panel de gestión</a></p>' +
        "<p style=\"color:#6d8191;font-size:12px\">Dale el formato corporativo y publícalo desde el panel → Propuestas.</p></div></div>"
    });
  } catch (e) {}
  return { ok: true };
}

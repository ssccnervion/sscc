/* Service worker · Salesianos Cooperadores Nervión
   Cambia VERSION cada vez que publiques cambios en el diseño para que la app se actualice. */
const VERSION = "sscc-v2";
const NUCLEO = [
  "./", "index.html", "temas.html", "oraciones.html", "quienes-somos.html", "provincia.html",
  "avisos.html", "enviar.html", "documentos.html", "offline.html", "manifest.webmanifest",
  "assets/css/styles.css", "assets/js/config.js", "assets/js/contenido.js", "assets/js/main.js",
  "assets/fonts/Gilroy-Light.woff2", "assets/fonts/Gilroy-ExtraBold.woff2",
  "assets/img/logo-blanco.png", "assets/img/logo-color.png", "assets/img/logo-csjm.png",
  "assets/img/icon-192.png", "assets/img/favicon-32.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(NUCLEO)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const guardar = (req, res) => {
  if (res && res.ok && res.type !== "opaque") caches.open(VERSION).then((c) => c.put(req, res));
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url);

  // Páginas: primero la red (contenido al día), si no hay conexión la copia guardada
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => { guardar(req, res.clone()); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("offline.html")))
    );
    return;
  }

  // Hoja de cálculo de Google (material): red y, sin conexión, la última copia
  if (url.hostname === "docs.google.com" && url.pathname.includes("/pub")) {
    e.respondWith(fetch(req).then((res) => { guardar(req, res.clone()); return res; }).catch(() => caches.match(req)));
    return;
  }

  // Datos que cambian a menudo (material y ajustes): primero la red
  if (url.origin === location.origin && /(contenido|config)\.js$/.test(url.pathname)) {
    e.respondWith(fetch(req).then((res) => { guardar(req, res.clone()); return res; }).catch(() => caches.match(req)));
    return;
  }

  // Archivos de la propia web: copia guardada al instante y actualización en segundo plano
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then((cache) => {
        const red = fetch(req).then((res) => { guardar(req, res.clone()); return res; }).catch(() => cache);
        return cache || red;
      })
    );
  }
});

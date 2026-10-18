# Web · Salesianos Cooperadores · Centro Nervión

Web estática (HTML + CSS + JS, sin instalar nada) con la identidad del *Manual de identidad corporativa SSCC Región Ibérica*: azul `#006A92`, paleta secundaria (`#ffb94a`, `#0da2dc`, `#2498ab`, `#34546d`), tipografía **Gilroy** y logotipo oficial.

## Estructura

```
sscc-nervion-web/
├── index.html            Inicio
├── temas.html            Temas
├── oraciones.html        Oraciones
├── quienes-somos.html    Quiénes somos
├── provincia.html        Provincia María Auxiliadora
├── avisos.html           Avisos y calendario
├── enviar.html           Formulario «Enviar material»
├── documentos.html       Documentos del centro (proyecto, actas, memoria)
├── offline.html          Página que se ve sin conexión
├── manifest.webmanifest  Datos de la app (nombre, iconos, colores)
├── sw.js                 Funcionamiento sin conexión de la app
├── assets/
│   ├── js/config.js      ← AJUSTES (correo, Google, encuentros…)
│   ├── js/contenido.js   ← MATERIAL (si no usáis la hoja de Google)
│   ├── js/main.js        comportamiento (no hace falta tocarlo)
│   ├── css/styles.css    estilos
│   ├── fonts/            Gilroy (web)
│   └── img/              logos
├── material/             archivos locales (opcional)
├── plantilla-hoja-google.csv
└── README.md             cómo publicarla en GitHub
```

## Ver la web en tu ordenador

Abre una terminal en esta carpeta y ejecuta `python3 -m http.server 8000`. Después visita http://localhost:8000.

---

## Conectarlo todo con Google (paso a paso)

### 1. Crear la cuenta
Crea una cuenta de Gmail para el centro (p. ej. `sscc.nervion@gmail.com`, si está libre) y pon ese correo en `config.js` → `email`.

### ¿Dónde guardar los archivos? (recomendado: Google Drive)
La web **no necesita guardar los PDF ni los vídeos**: basta con poner su enlace de Drive o YouTube y la web los muestra en su visor. Así, subir material es solo subirlo a Drive y pegar el enlace (en la hoja o en `contenido.js`), sin volver a publicar la web. La carpeta `material/` del proyecto es solo para casos puntuales.

Ojo con los datos personales: lo que se enlaza desde la web lo puede ver cualquiera. Si algún documento no debe ser público, compártelo en Drive **solo con los miembros del centro** en lugar de «cualquier persona con el enlace».

### 2. Google Drive: el material
1. En Drive (cuenta `sscc.nervion@gmail.com`), crea las carpetas **Temas**, **Oraciones**, **Provincia** y **Documentos del centro** (con subcarpetas *Proyecto de centro*, *Actas* y *Memoria*).
2. Sube allí los PDF, vídeos, presentaciones…
3. Compártelas: botón derecho → *Compartir* → *Acceso general* → **Cualquier persona con el enlace** (Lector).
4. Pega el enlace de cada carpeta en `config.js` → `carpetas`. Aparecerá un botón «Abrir carpeta en Drive» en cada sección.

La web convierte sola los enlaces de **Drive, Docs, Presentaciones, YouTube y Vimeo** en un visor dentro de la página. Solo tienes que pegar el enlace normal de «Compartir».

### 3. Hoja de cálculo de Google: añadir material sin tocar código (recomendado)
1. Crea una Hoja de cálculo en la cuenta y en la fila 1 pon estas columnas (o importa `plantilla-hoja-google.csv`):
   `seccion | titulo | descripcion | tipo | url | fecha | curso | etiquetas | destacado | texto | caduca | hora | lugar`
2. Cada fila es una tarjeta de la web:
   - **seccion**: `temas`, `oraciones`, `provincia`, `documentos`, `avisos` o `calendario`
   - **etiquetas** en `documentos`: `Proyecto de centro`, `Actas` o `Memoria` (es la categoría)
   - **tipo**: `pdf`, `video`, `audio`, `presentacion`, `documento`, `carpeta`, `enlace` o `texto`
   - **fecha**: `2026-11-07` (año-mes-día)
   - **etiquetas**: separadas por comas (`Adviento, Formación`)
   - **destacado**: `sí` para mostrarlo grande arriba de su sección
   - **texto**: oraciones escritas (tipo `texto`) y cuerpo de los avisos; deja una línea en blanco entre párrafos
   - **caduca** (avisos): fecha a partir de la cual el aviso pasa a «Avisos anteriores»
   - **hora** y **lugar** (calendario): p. ej. `18:00` y `Salesianos Nervión`
3. *Archivo → Compartir → Publicar en la web* → elige la hoja → formato **CSV** → *Publicar*.
4. Copia el enlace y pégalo en `config.js` → `hojaCalculoCSV`.

A partir de ahí, quien tenga acceso a la hoja puede añadir material desde el móvil y la web se actualiza sola (Google puede tardar unos minutos en refrescar el CSV).

### 4. Avisos y calendario
- **Avisos**: filas con `seccion` = `avisos`. Con `destacado` = `sí` salen como «Importante», van primero y aparece una notificación al entrar en la web. El menú muestra un número cuando hay avisos nuevos desde la última visita.
- **Calendario**: filas con `seccion` = `calendario` (fecha, hora, lugar). Se ven en el calendario mensual de *Avisos*, en «Próximos encuentros» de la portada y en *Provincia*. Cada evento tiene el botón «Añadir a mi calendario».
- **(Opcional) Google Calendar**: si preferís gestionar las fechas en Google Calendar, hacedlo público (*Configuración → Permisos de acceso*), copiad el **ID del calendario** en `config.js` → `calendarioGoogle` y el calendario de la web se sustituirá por el de Google.

### 5. Formulario «Enviar material»
Los envíos llegan al correo de `config.js` → `email`, con el archivo adjunto (máx. 5 MB; para archivos mayores se pide un enlace de Drive). Funciona con el servicio gratuito **FormSubmit**:
1. Pon el correo del centro en `email` y publica la web.
2. Haz un primer envío de prueba: llegará un correo de FormSubmit para **activar** el formulario. Confírmalo.
3. Desde entonces, cada envío llega como una tabla con todos los datos y el adjunto. Solo hay que darle el formato corporativo con las plantillas y añadirlo a la hoja o a `contenido.js`.

Alternativa: crea un Formulario de Google y pega su enlace de inserción en `config.js` → `formularioGoogle` (los archivos subidos irán a vuestro Drive, aunque Google pedirá iniciar sesión a quien suba archivos).

---

## Publicar la web (gratis)

- **Netlify Drop** (lo más fácil): entra en https://app.netlify.com/drop con la cuenta de Google y arrastra esta carpeta. Te da una dirección pública al momento.
- **GitHub Pages**: sube la carpeta a un repositorio y activa *Settings → Pages*.
- **Dominio propio** (opcional): ambos permiten conectar uno tipo `ssccnervion.org`.

## App (PWA) e imagen al compartir

- **App instalable**: la web se puede instalar como app desde el botón «App» de la cabecera, la sección «Llévanos en el bolsillo» de la portada o el pie. En Android y ordenador abre la instalación directa; en iPhone muestra los pasos (Safari → Compartir → Añadir a pantalla de inicio). La app funciona sin conexión con las páginas ya visitadas.
- **Al publicar cambios de diseño**, sube el número de `VERSION` en `sw.js` (p. ej. `sscc-v2`) para que las apps instaladas se actualicen.
- **Icono de la app**: `assets/img/icon-*.png` (diseño original en `app-icon-1024.png`).
- **Imagen al compartir por WhatsApp**: `assets/img/compartir.jpg` (1200×630). Las páginas ya apuntan a la dirección pública `https://sscc-nervion.vercel.app/`; si algún día cambia, busca y sustituye esa dirección en todos los `.html`. WhatsApp guarda la vista previa un tiempo; si no cambia, prueba a compartir el enlace añadiendo `?v=2` al final.

## Personalizar

- **Consejo local** (`quienes-somos.html`): cambia nombres y cargos. Para poner foto, sustituye la letra por `<img src="assets/img/nombre.jpg" alt="Nombre">`.
- **Citas de la portada**: en `index.html`, atributo `data-citas`.
- **Dirección del mapa**: `config.js` → `direccionMapa`.

## Licencia de la tipografía
Gilroy (versión gratuita, Radomir Tinkov) permite generar formatos web y usarla con `@font-face`, como hace esta web.

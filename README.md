# Salesianos Cooperadores · Centro Nervión (Sevilla)

Web del Centro de Salesianos Cooperadores de Nervión: **Temas**, **Oraciones**, **Quiénes somos**, **Provincia María Auxiliadora**, **Avisos y calendario** y un formulario para **enviar material**.
Es una web estática (HTML, CSS y JavaScript), sin instalaciones ni base de datos, con la identidad corporativa de la Región Ibérica.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `sscc-nervion-web`. Puede ser público o privado; GitHub Pages gratis necesita que sea **público**.
2. Sube el contenido de esta carpeta:
   - **Desde la web:** en el repositorio, *Add file → Upload files* y arrastra todos los archivos y carpetas.
   - **Desde la terminal**, dentro de esta carpeta:
     ```bash
     git init
     git add .
     git commit -m "Primera versión de la web"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/sscc-nervion-web.git
     git push -u origin main
     ```
3. En el repositorio: *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save*.
4. En uno o dos minutos la web estará en `https://TU_USUARIO.github.io/sscc-nervion-web/`.

## Actualizar el contenido

- **Ajustes** (correo, Google Drive, Hoja de cálculo, Calendar): `assets/js/config.js`
- **Material** (si no usáis la Hoja de Google): `assets/js/contenido.js`
- Guía completa: [GUIA.md](GUIA.md)

Si conectáis la Hoja de cálculo de Google, el material se añade desde la hoja y **no hace falta volver a subir nada** a GitHub.

## Probar en local

```bash
python3 -m http.server 8000
```

Y abre http://localhost:8000

## Créditos

- Identidad visual: *Manual de identidad corporativa SSCC Región Ibérica*.
- Tipografía Gilroy (versión gratuita) © Radomir Tinkov, usada como fuente web según su licencia.

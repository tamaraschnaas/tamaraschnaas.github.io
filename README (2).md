# Tamara Terroba Schnaas — Personal Site

Tarjeta personal en la web. Estática, sin frameworks, sin build step.

**Stack:** HTML + CSS + JS vanilla. Tres fuentes de Google Fonts (Instrument Serif, Inter Tight, JetBrains Mono).

## Estructura

```
.
├── index.html      # marcado del sitio
├── styles.css      # sistema visual
├── app.js          # interacciones (mouse magnético, idioma, reloj, vCard)
├── i18n.js         # diccionario ES / EN
└── README.md
```

## Probar localmente

Cualquier servidor estático sirve. La forma más simple:

```bash
# python 3
python3 -m http.server 8000
# o npx
npx serve .
```

Abre `http://localhost:8000`.

## Desplegar en GitHub Pages

1. Crea el repo en GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/tamaraschnaas/tamaraschnaas.github.io.git
   git push -u origin main
   ```

   > **Truco:** si el repo se llama `<usuario>.github.io` (en este caso `tamaraschnaas.github.io`), GitHub Pages lo publica automáticamente en la raíz: `https://tamaraschnaas.github.io`.

2. En GitHub: **Settings → Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main` · `/ (root)`
   - Guardar.

3. En 1–2 minutos el sitio queda en línea.

## Idioma

El toggle ES/EN en la esquina superior derecha cambia el contenido en vivo. Las traducciones viven en `i18n.js`.

## Personalizar

- **Color de acento:** `--accent` en `styles.css`.
- **Fuentes:** import en `<head>` de `index.html` + variables `--serif`, `--sans`, `--mono`.
- **Texto:** edita `i18n.js`. Las claves deben existir en `es` y `en`.

---

© 2026 Tamara Terroba Schnaas

# MYMS Video Hero

Hero full-screen en React + TypeScript + Tailwind + Vite, inspirado en la referencia VEX y adaptado para MYMS.

## Cómo correrlo

```bash
npm install
npm run dev
```

Luego abrí la URL local que muestre Vite.

## Variantes incluidas

- Default: versión MYMS.
- Versión literal de referencia VEX: agregá `?variant=vex` al final de la URL local.

Ejemplo:

```txt
http://localhost:5173/?variant=vex
```

## Personalización rápida

En `src/App.tsx` podés editar:

- `MYMS_COPY`: logo, navegación, heading, subtítulo, CTAs y tag.
- `VIDEO_URL`: video de fondo.
- Links de WhatsApp: actualmente están con placeholder `5491100000000`.

## Specs respetadas

- Video full-screen con `object-cover`, autoplay, loop, muted y playsInline.
- Sin overlay oscuro, sin gradient overlay y sin capa semitransparente global sobre el video.
- Fuente Inter importada desde Google Fonts en `index.html`.
- `body` con `font-family: 'Inter', sans-serif`, font smoothing y Tailwind `fontFamily.sans` extendido.
- Navbar liquid-glass con padding responsive.
- Hero bottom-aligned con grid de dos columnas en desktop.
- Heading con animación character-by-character.
- FadeIn component con delay y duration configurables.
- Liquid glass CSS global.

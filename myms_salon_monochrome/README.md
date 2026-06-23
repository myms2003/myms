# MYMS Salon — Dark Monochrome Landing

Landing page para salones de belleza, creada con React + Vite + TypeScript + Tailwind CSS + shadcn/ui-style components + Framer Motion + hls.js.

## Cómo correr

```bash
npm install
npm run dev
```

## Cómo compilar

```bash
npm run build
npm run preview
```

## Qué incluye

- Navbar fixed transparente con logo de círculos concéntricos.
- Hero full-screen con video MP4, estética dark monochrome y formulario a WhatsApp.
- Liquid glass global reutilizable.
- Animaciones con Framer Motion y patrón fadeUp.
- Sección de canales de reserva: Instagram, WhatsApp y Google.
- Sección de misión con reveal palabra por palabra controlado por scroll.
- Sección de solución con video, features y grid responsive.
- CTA final con video HLS usando hls.js y fallback nativo para Safari.
- Assets locales en `public/`: avatares e íconos monocromáticos.

## Configuración rápida

Reemplazar el número de WhatsApp placeholder en `src/App.tsx`:

```ts
const WHATSAPP_NUMBER = "5491100000000";
```

Podés cambiar el nombre de marca desde el componente `Logo` y el contenido de cada sección dentro de `src/App.tsx`.

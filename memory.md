# MYMS Platform Memory

## What MYMS is

MYMS is a digital platform and sales system for beauty salons. The positioning in the current assets is not generic SaaS; it is a premium, conversion-focused product for salons that need:

- a high-converting landing page
- online appointment booking
- a client CRM
- WhatsApp-driven follow-up and reminders
- an internal management panel for staff, services, pricing, and operations

The core promise repeated across the current work is:

> help salons look premium, respond faster, organize better, and convert more inquiries into bookings

## Target user

Primary audience:

- salon owners
- beauty studio operators
- teams managing appointments, stylists, and repeat clients

Customer pain points reflected in the current copy:

- leads arrive from Instagram, WhatsApp, Google, and referrals in a fragmented way
- bookings are lost when reservation flow is slow or unclear
- staff relies on memory, screenshots, or manual chat handling
- weak digital presence reduces trust and conversion

## Product language currently in use

Current MYMS messaging is centered on:

- "agenda llena sin perder el control"
- "productos digitales que venden por vos"
- "landing, turnero online, CRM de clientas, WhatsApp y panel de gestión"
- premium brand presence plus operational order

Important tone:

- commercial
- modern
- premium
- direct
- beauty-industry-specific

## Workspace structure

This workspace currently contains three relevant MYMS artifacts:

### `myms_salon_monochrome/`

Main React/Vite landing for salons.

Stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Framer Motion
- `hls.js`

Current sections and behavior from `src/App.tsx`:

- fixed transparent navbar
- fullscreen video hero
- WhatsApp demo capture form
- platform/channel section for Instagram, WhatsApp, and Google
- mission/solution storytelling sections
- features for booking, CRM, team/services, and reminders
- CTA section with HLS video playback

Key product features already named in code:

- turnero online
- CRM de clientas
- team and services management
- WhatsApp confirmations and reminders

Operational note:

- WhatsApp number is still a placeholder: `5491100000000`

### `hero-MYMS/mnt/data/myms_video_hero/`

Secondary React/Vite concept focused on a fullscreen hero.

Purpose:

- a brand/pitch-style MYMS hero experience
- includes a MYMS variant and a literal VEX-inspired reference variant via query param

Current MYMS copy frames the platform as:

- landings
- CRM
- turneros
- panels
- digital business cards

This artifact is more brand-forward and less salon-specific than `myms_salon_monochrome`.

### `MYMS-Landing/`

Contains a static HTML landing artifact:

- `MyMs-landing.html`

### Supporting assets

- `Logos/LogoMYMS.png`
- local social/channel icons and avatars inside `myms_salon_monochrome/public/`

## Brand and UX direction already established

The current MYMS direction is:

- monochrome / dark premium visual system
- cinematic video-first hero
- liquid glass UI treatment
- high-end salon aesthetic
- conversion-first CTAs

The experience should feel premium and operationally sharp, not playful or generic startup.

## Technical memory

Current implementation details worth preserving:

- both frontend projects are Vite apps
- the salon landing uses local assets plus hosted MP4/HLS video
- Framer Motion is used for reveal and entrance animation
- WhatsApp is the primary conversion action
- the salon landing is the clearest expression of the actual product positioning

## Best current source of truth

If future work needs one primary reference for MYMS positioning, use:

1. `myms_salon_monochrome/src/App.tsx`
2. `myms_salon_monochrome/README.md`
3. `hero-MYMS/mnt/data/myms_video_hero/src/App.tsx`

Reason:

- the salon monochrome app is the most complete and product-specific asset in the workspace

## Open items / placeholders

- replace placeholder WhatsApp numbers
- confirm final MYMS brand name rendering: `MYMS` vs `MYMS Salon`
- define whether MYMS is exclusively for salons or for broader service businesses
- decide whether the hero concept and the salon landing should converge into one canonical product site

## Working assumption for future edits

Until product direction changes, treat MYMS as:

> a premium digital growth and operations platform for beauty salons, combining acquisition, booking, CRM, and client communication in one brand-led experience

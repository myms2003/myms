# AGENTS.md

## 1. What MYMS Is

MYMS is a premium SaaS-style commercial digital platform.

It turns local businesses and independent professionals into digital systems that generate:

- trust
- inquiries
- bookings
- sales

MYMS is product-first, commercially focused and grounded in real operating problems: fragmented lead capture, manual follow-up, unstructured reservations and low digital trust.

## 2. What MYMS Is Not

MYMS is not:

- a generic web design agency
- a visual-only branding studio
- a decorative brochure-site builder
- a trendy no-code experiment
- a product for startups looking for abstract innovation language

Future agents must avoid agency language like:

- "we design beautiful websites"
- "elevate your brand presence"
- "custom digital experiences"

The product is a business system, not a design service.

## 3. Core Positioning

Canonical line:

> MYMS turns local businesses and independent professionals into digital systems that generate trust, inquiries, bookings and sales.

Supporting positioning:

- Instagram shows. A landing converts.
- WhatsApp alone is not a system.
- A website is not decoration. It is trust.
- Less manual follow-up. More visible demand.
- Real businesses need structure, not more message chaos.

## 4. Target Customers

Primary segments:

- beauty salons
- barbershops
- aesthetic clinics
- doctors
- dentists
- psychologists
- lawyers
- accountants
- consultants
- restaurants
- cafes
- local stores
- fitness studios
- home service professionals
- car sellers
- real estate sellers
- insurance sellers
- commercial teams
- suppliers and distributors

## 5. Main Customer Pains

- leads arrive via WhatsApp, Instagram, referrals and manual follow-up
- no clear digital structure to convert interest into a next step
- trust depends too much on chat conversations
- booking and follow-up are often manual
- businesses repeat the same explanation over and over
- owners cannot clearly measure what source, service or seller converts
- teams lose leads because information lives in chats, memory or screenshots

## 6. Product Packs

### Presencia Pro

For professionals, service providers and small businesses that need trust and a serious digital presence.

Includes:

- professional landing page
- WhatsApp button
- contact form
- digital business card
- services section
- about section
- testimonials
- photos
- location or working area
- Google Maps
- social links
- basic local SEO
- basic analytics

Resolves:

- low trust
- weak conversion from referrals and Instagram
- repeated manual explanations in chat

### Turnos Pro

For appointment-based businesses.

Includes:

- landing page
- online booking
- services with duration and price
- staff selection
- availability calendar
- client form
- WhatsApp confirmation
- appointment reminders
- booking dashboard
- customer database
- visit history
- appointment status tracking
- optional deposits or payments

Resolves:

- WhatsApp back-and-forth
- schedule chaos
- no-shows
- lack of 24/7 reservation capability
- poor visibility into staff and service demand

### Ventas Pro

For businesses with sellers, leads and structured commercial follow-up.

Includes:

- commercial landing page
- quote or contact form
- WhatsApp contact flow
- CRM
- sales pipeline
- lead status management
- seller assignment
- digital card per seller
- optional landing per seller
- internal notes
- follow-up reminders
- sales dashboard
- metrics by source
- metrics by seller
- export to Google Sheets

Resolves:

- lost inquiries
- weak follow-up discipline
- poor commercial presentation
- low visibility into conversion performance

### Local Pro

For restaurants, cafes, physical stores and local businesses with a location-driven commercial model.

Includes:

- local landing page
- opening hours
- Google Maps
- WhatsApp button
- reservations or inquiries
- menu, catalog or services
- photos
- promotions
- social and Google Business links
- QR code
- digital business card
- reviews or testimonials
- basic analytics
- optional reservations
- optional catalog

Resolves:

- weak local trust
- dispersed business information
- low conversion from Google and Instagram traffic
- friction in getting people to contact or visit the business

## 7. Brand Personality

MYMS should feel:

- premium
- sharp
- commercially intelligent
- minimal
- trustworthy
- modern
- calm under pressure

It should not feel:

- playful
- childish
- trendy for the sake of trend
- overhyped
- loud
- "agency cool"

## 8. Tone Of Voice

Tone:

- direct
- modern
- clear
- slightly provocative
- business-oriented
- non-technical in outward-facing copy

Examples:

- "Tu WhatsApp no es un sistema."
- "Instagram muestra. Una landing convierte."
- "Menos mensajes. Más turnos."
- "Cada consulta perdida es plata que no volvió."
- "Convertí tu negocio en un sistema digital."

Avoid:

- vague startup abstractions
- fluffy branding terms
- overexplaining technical implementation in marketing copy

## 9. Visual Direction

Visual reference profile:

- premium SaaS
- black and electric blue
- product-first
- minimal
- futuristic without childish effects
- high trust

Reference brands:

- Revolut
- Linear
- Framer
- Stripe
- Vercel
- Arc Browser

Visual rules:

- dark scenes with depth
- subtle glow
- restrained glass effects
- elegant motion
- clean spacing
- product surfaces over decorative illustration

## 10. Color System

Canonical colors:

- black: `#000000`
- deep navy: `#050A12`
- dark blue: `#09111D`
- primary electric blue: `#2D7FF9`
- soft blue: `#7AB8FF`
- white: `#FFFFFF`
- muted text: `#A7B0BE`
- border: `rgba(255,255,255,0.12)`
- glass: `rgba(255,255,255,0.06)`

Never introduce:

- purple gradients
- neon rainbow palettes
- warm playful tones unless a future brand system explicitly changes

## 11. Typography

Primary typeface:

- Inter

Typography should feel:

- compact
- confident
- high-legibility
- product-grade

## 12. Technical Stack

Preferred stack for the landing:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui style primitives
- Framer Motion
- GSAP
- ScrollTrigger
- Three.js
- React Three Fiber
- Drei
- Lucide React

## 13. Folder Structure Rules

Repository structure:

```txt
apps/
  landing/

packages/
  ui/
  utils/
  types/

docs/
  strategy/
  branding/
  content/
  research/

agents/
```

Within `apps/landing/src`:

```txt
components/
  ui/
  layout/
  sections/
  animation/
  three/
  cards/
  forms/
data/
lib/
hooks/
styles/
assets/
```

Rules:

- section copy should live in `data/` when practical
- reusable visual primitives belong in `components/ui`
- layout shells belong in `components/layout`
- Three.js scenes belong in `components/three`
- GSAP hooks belong in `components/animation`
- avoid dumping everything into `App.tsx`

## 14. Component Rules

- components must be composable and single-purpose
- content-heavy sections should accept structured data
- avoid monolithic page files
- preserve semantic HTML
- prefer explicit props over hidden side effects
- keep client-side logic shallow and readable

## 15. Animation Rules

Motion must feel premium, not theatrical.

Required characteristics:

- subtle depth
- smooth easing
- precise stagger
- clear hierarchy
- low-noise parallax

Avoid:

- bouncy cartoon motion
- dramatic overshoot
- excessive rotation
- flashy gaming aesthetics
- animation for its own sake

Respect:

- `prefers-reduced-motion`
- mobile performance limits

## 16. Mobile / Responsive Rules

- mobile is first-class, not a compressed desktop afterthought
- hero must remain legible and balanced on small screens
- cards stack cleanly
- CTAs remain visible and tappable
- dense grids must degrade into readable vertical flows
- 3D scenes should reduce complexity on smaller devices

## 17. Accessibility Rules

- maintain semantic landmarks and heading order
- ensure strong contrast on dark backgrounds
- interactive elements must have visible focus states
- forms need labels or accessible names
- motion must respect reduced-motion preferences
- decorative 3D or visual layers should not block content access

## 18. Performance Rules

- optimize for fast first paint and smooth interaction
- reduce particle counts and 3D complexity on mobile
- avoid unnecessary rerenders
- clean up GSAP timelines, listeners and Three.js-related effects
- do not load heavy assets without purpose
- treat 60fps as a target, especially in hero scenes

## 19. Copywriting Rules

- speak to business pain, not generic aspiration
- mention trust, inquiries, bookings, follow-up, sales and order
- emphasize outcomes over feature jargon
- sound like MYMS understands local business reality
- be concise and directional

Copy should often contrast:

- manual vs system
- visibility vs chaos
- trust vs doubt
- inquiry vs lost lead

## 20. Forbidden Patterns

Do not ship MYMS work that:

- frames the product as a generic agency
- uses purple-heavy startup gradients
- sounds childish or playful
- relies on lorem ipsum or random placeholder content
- buries the commercial value under decorative language
- overcomplicates the UI with novelty interactions
- adds motion that harms readability or performance
- treats WhatsApp as the product itself instead of one channel inside the system

## Default Working Assumption For Future Agents

Until strategy changes, assume:

> MYMS is a premium digital commercial system for real businesses that need more trust, more structured inquiries, more organized bookings and more measurable sales.

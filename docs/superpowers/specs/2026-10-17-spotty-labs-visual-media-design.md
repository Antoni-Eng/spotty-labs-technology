# Spotty Labs Technology — Visual Media Design

**Date:** 2026-10-17  
**Status:** Approved for implementation planning  
**Product:** Add royalty-free craft photography and original service icons to the existing multi-page site

## Goal

Make the site feel more alive with editorial photos and simple icons, without copying any live studio layout and without turning sections into generic image cards.

## Approach

**Chosen:** Editorial cropped photos + original service marks.

**Rejected:**
- Icon-first (too quiet)
- Photo cards on every block (reads as a stock agency template)

## Visual treatment

Keep the current page structure, type, and cyan-on-near-black system. Photos are cropped hard and sit under a dark + cyan wash so type stays first.

| Surface | Media |
| --- | --- |
| Home hero | One full-bleed craft still under the existing grid and spot motif |
| Home teasers | One cropped still per tile (build / story / conversation) |
| Services | Four original line icons beside the existing numbers — no photo grid |
| About | One wide workshop/teaching photo beside the origin copy |
| Contact | No photo |

Inspiration taken from live studio sites (full-bleed crop, dark overlay, one accent) — not their grids, type, or copy.

## Images

Download once. Store locally. Do not hotlink.

| File | Subject | Source (Unsplash License) |
| --- | --- | --- |
| `public/images/hero-craft.jpg` | Hands / laptop / code, dark, cool light | [Bn4L8oSTIjc](https://unsplash.com/photos/Bn4L8oSTIjc) — Rahul Mishra |
| `public/images/teaser-services.jpg` | Person coding at night | [M1yPeeHZ08w](https://unsplash.com/photos/M1yPeeHZ08w) — Chirayu Trivedi |
| `public/images/teaser-about.jpg` | Person at a laptop in a dark room | [zxhzpAXY58Y](https://unsplash.com/photos/zxhzpAXY58Y) |
| `public/images/teaser-contact.jpg` | Blank notebook and pen on a dark surface | [XH0VCNKhEkM](https://unsplash.com/photos/XH0VCNKhEkM) — Kelly Sikkema |
| `public/images/about-workshop.jpg` | Teaching / education / laptop work | [Zi0GmYPm88M](https://unsplash.com/photos/Zi0GmYPm88M) — Sigmund |

Download at roughly 1600–2000px on the long edge, JPEG. If a listed photo is later marked Unsplash+, substitute another free still of the same subject and update the credit.

**Treatment:** `object-fit: cover`; dark gradient or `brightness` + cyan tint overlay; `alt` describes the scene, not the brand.

## Icons

Original 24×24 viewBox stroke SVGs in `src/components/ServiceIcon.tsx`. One mark per service:

| Service | Mark |
| --- | --- |
| Websites | Two offset rectangles (a frame in front of a frame) |
| Custom Applications | Three stacked rounded bars of uneven width |
| AI Integrations | One node with three short spokes |
| Computer Education | Open chevron over a short baseline (lesson, not a book logo) |

Stroke ~1.5, `currentColor` (cyan). `aria-hidden` on the decorative SVG; the heading remains the accessible name. Do not use Lucide, Font Awesome, Heroicons, or copied path data.

## Architecture

### Data (`src/data/content.ts`)

```ts
type MediaRef = { src: string; alt: string; credit: { name: string; href: string } }

HERO_IMAGE: MediaRef
ABOUT_IMAGE: MediaRef
HOME_TEASERS[].image: MediaRef
MEDIA_CREDITS: readonly MediaRef['credit'][]
```

### Components

| Unit | Change |
| --- | --- |
| `Hero` | Decorative `<img>` behind content; existing grid/spots stay |
| `HomePage` | Teaser `<img>` above title |
| `Services` | `ServiceIcon` in the number column or beside it |
| `About` | Photo column next to copy on wide screens; stacked on small |
| `Footer` | One line: `Photos: Author / Unsplash` (comma-separated, unique authors) |
| `ServiceIcon` | New; `name` prop is a service `id` |

### Tests

- Home hero image is present with the hero `alt`
- Each teaser has an image
- Each service row exposes an SVG
- About page has the workshop image
- Footer still shows brand + year and includes `Unsplash`

## Out of scope

- Dog-origin photography
- Contact page photo
- Icon packs, Lottie, or extra motion libraries
- Copying any live site’s layout or identity
- Hotlinked CDNs as the only source

## Success criteria

- First viewport still reads as Spotty Labs type-first, with a photo underneath rather than a stock banner
- Services feel marked, not carded
- All images are local files under a free license
- Photographers are credited in the footer
- `npm test` and `npm run build` still pass

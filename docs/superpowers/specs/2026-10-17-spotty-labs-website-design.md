# Spotty Labs Technology — Marketing Website Design

**Date:** 2026-10-17  
**Status:** Approved for implementation planning  
**Product:** Static single-page React marketing site for Spotty Labs Technology

## Goal

Ship a futuristic, brand-forward static website that presents Spotty Labs Technology’s four specialties and makes it easy for a visitor to start a conversation via email.

## Brand

- **Name:** Spotty Labs Technology
- **Origin:** Named after the founder’s dogs — a Dalmatian and a Labrador. The site tells this story clearly in About and uses a subtle Dalmatian-spot motif in the visuals.
- **Specialties:** Websites, custom applications programming, AI integrations, computer education.

## Approach

**Chosen:** Vite + React + TypeScript + custom CSS (CSS variables; co-located or modular CSS).

**Rejected:**
- Vite + Tailwind — faster scaffolding, higher risk of generic AI aesthetics.
- Next.js static export — unnecessary for a one-page marketing site.

## Site structure

Single-page scroll with sticky minimal navigation and section anchors:

1. **Hero** — Brand as the dominant first-viewport signal; one headline; one supporting sentence; CTA group (View services / Get in touch); full-bleed atmospheric background. No cards, badges, or overlays on hero media.
2. **Services** — Four specialty blocks (title + short description each). Open layout, not a card grid unless interaction requires a container.
3. **About** — Origin story (Dalmatian + Labrador) and what Spotty Labs builds and teaches. Spot motif continues quietly.
4. **Contact** — Form fields: name, email, message. Submit opens the user’s email client via `mailto:hello@spottylabs.tech` with subject and body prefilled from the form.
5. **Footer** — Brand + copyright year.

## Visual system

| Token | Value / direction |
| --- | --- |
| Base | Near-black `#070A0F` |
| Panels / secondary surfaces | Graphite / deep slate |
| Accent | Electric cyan `#3DE0FF` |
| Text | Soft white / muted slate for secondary copy |
| Motif | Sparse white/cyan spots; faint technical grid in hero only |
| Display type | Syne (Google Fonts) for brand and section headlines |
| Body type | IBM Plex Sans (Google Fonts) for supporting copy and UI |

**Avoid:** Purple-on-white / purple–indigo gradients; warm cream + terracotta AI defaults; Inter/Roboto/Arial; heavy multi-layer glow; pill clusters; dashboard clutter in the first viewport.

**Motion (intentional, 2–3):**
1. Hero brand/headline fade-rise on load.
2. Soft spot/grid drift in the hero background.
3. Service items reveal on scroll.

**Layout rules:** One composition in the first viewport; brand-first; full-bleed hero; mobile-responsive; one job per section.

## Architecture

### Stack

- Vite
- React
- TypeScript
- Plain CSS with CSS custom properties
- Static output via `vite build`

### Components

| Component | Responsibility |
| --- | --- |
| `App` | Page shell, section composition |
| `Nav` | Sticky nav: brand + section links |
| `Hero` | Brand, headline, CTAs, atmosphere |
| `Services` | Four specialty blocks from local data |
| `About` | Origin story + positioning |
| `Contact` | Mailto form |
| `Footer` | Brand + copyright |

### Data

- Services copy lives in a small local constant array (easy to edit).
- Contact email constant: `hello@spottylabs.tech` (placeholder; swap later without structural changes).
- No backend, CMS, or external form service in v1.

### Mailto behavior

On valid submit:
- `to`: `hello@spottylabs.tech`
- `subject`: derived from name/intent (e.g. `Spotty Labs inquiry from {name}`)
- `body`: name, email, and message fields

Client-side required-field validation before opening mailto. No server persistence.

## Out of scope (v1)

- Blog, case studies, or portfolio gallery
- Booking / calendar
- Real form API (Netlify Forms, Formspree, etc.)
- Multi-language
- Auth, dashboards, or app product UI

## Draft copy (editable)

**Hero headline:** Build what’s next.  
**Hero support:** Websites, custom apps, AI integrations, and computer education — from a lab named after a Dalmatian and a Labrador.  
**Primary CTA:** Get in touch  
**Secondary CTA:** View services  

**Services (short lines):**
- **Websites** — Fast, distinctive sites that carry your brand.
- **Custom Applications** — Software shaped around how you actually work.
- **AI Integrations** — Practical AI wired into tools and workflows.
- **Computer Education** — Clear teaching that turns curiosity into skill.

**About:** Spotty Labs Technology is named after two dogs — a Dalmatian and a Labrador. That mix of pattern and loyalty shows up in the work: careful craft, modern tech, and teaching that sticks.

## Success criteria

- First viewport reads as Spotty Labs Technology even without the nav.
- All four specialties are clear within one scroll path.
- About communicates the dog origin without becoming a pet brand.
- Contact form successfully opens a prefilled mailto on desktop browsers that support it.
- `npm run build` produces a deployable static site with no runtime backend.

## Implementation notes

- Prefer Google Fonts (or similar) loaded for the chosen type pairing.
- Keep CSS variables centralized for palette/type scale.
- Prefer CSS animations / Intersection Observer for scroll reveals over heavy animation libraries unless motion becomes hard to maintain.
- Accessible structure: semantic landmarks, focusable controls, sufficient contrast on cyan-on-dark.

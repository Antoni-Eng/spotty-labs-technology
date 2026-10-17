# Spotty Labs Technology — Multi-page Site Design

**Date:** 2026-10-17  
**Status:** Approved for implementation planning  
**Product:** Static Vite + React marketing site, split from one scroll page into routed pages

## Goal

Turn the header destinations into real pages, keep the existing visual system, and add enough copy so Home, Services, About, and Contact each stand on their own.

## Approach

**Chosen:** `react-router-dom` with path routes (`/`, `/services`, `/about`, `/contact`).

**Rejected:**
- Hash routes (`/#/services`) — uglier URLs, weaker “separate page” feel.
- Separate HTML files — duplicates the React shell and shared chrome.

## Site structure

Shared chrome on every page: sticky `Nav` + `Footer`. Brand in the nav links to `/`. The current path is highlighted with `aria-current="page"`.

| Path | Page | Contents |
| --- | --- | --- |
| `/` | Home | Existing hero, then three teasers (Services, About, Contact). No full services list, origin story, or form. |
| `/services` | Services | Intro plus the four specialties, each with a longer blurb. |
| `/about` | About | Expanded origin story: the dogs, the name, and how that shows up in the work. |
| `/contact` | Contact | Short invite, then the existing mailto form. |
| `*` | Redirect | Unknown URLs redirect to `/`. |

Hero CTAs: primary → `/contact`, secondary → `/services`. Teaser links match those paths.

## Architecture

### Stack

- Vite + React + TypeScript + existing CSS tokens
- `react-router-dom` for client routing
- Static output via `vite build`
- Hosts must fall back unknown paths to `index.html`

### Components

| Unit | Responsibility |
| --- | --- |
| `App` | Shell: `Nav`, `<Outlet />`, `Footer` |
| `Nav` | Sticky nav using `<Link>`; current route marked `aria-current="page"` |
| `HomePage` | Hero + teaser row |
| `ServicesPage` | Intro + four expanded specialty blocks; reuse scroll reveal |
| `AboutPage` | Expanded origin story |
| `ContactPage` | Invite copy + existing `Contact` form |
| `Hero` | Unchanged composition; CTAs become route links |
| `Contact` | Existing mailto form with injectable `navigate` |
| `Footer` | Brand + copyright |

Existing section CSS is reused. Home teasers get a small new style block.

### Data

All copy lives in `src/data/content.ts`:

- Keep `BRAND`, `CONTACT_EMAIL`, `HERO`, short `SERVICES` lines
- Add `HOME_TEASERS` (title, sentence, href)
- Add `blurb` on each service
- Expand `ABOUT` with a short title plus two or three paragraphs
- Add `CONTACT_INTRO` (eyebrow, title, support sentence)

No backend, CMS, or form API.

### Mailto

Unchanged: required name/email/message, then `mailto:hello@spottylabs.tech` with subject and body from the form.

### Error handling

- Contact: client-side required-field validation; no navigation if invalid
- Router: unknown paths redirect home
- No 404 page in this pass

## Draft copy

**Home teasers**
- **Services** — Websites, custom apps, AI, and teaching — four ways to build what’s next. → `/services`
- **About** — Named after a Dalmatian and a Labrador. Pattern and loyalty, in software. → `/about`
- **Contact** — Tell us what you’re trying to make. We’ll write back. → `/contact`

**Services intro:** What we make and teach. Four specialties, one lab.

**Service blurbs**
- **Websites** — Fast, distinctive sites that carry your brand. Structure, type, and motion chosen so the first screen already feels like you — not a template with the logo swapped in.
- **Custom Applications** — Software shaped around how you actually work. We map the real steps, then build the smallest tool that removes the friction — a dashboard, a booking flow, an internal app.
- **AI Integrations** — Practical AI wired into tools and workflows. Not a chatbot bolted on the side: retrieval, drafting, and classification where they save time, with a human still in the loop.
- **Computer Education** — Clear teaching that turns curiosity into skill. Lessons paced for the person in the room, from first principles to a project you can keep using.

**About**
- Title: About the lab
- Spotty Labs Technology is named after two dogs — a Dalmatian and a Labrador. One for pattern, one for loyalty. The name stuck because it described the work we wanted to do.
- Careful craft and modern tech belong together. We design and build websites, custom applications, and AI integrations that stay understandable after launch.
- Teaching is part of the same job. Computer education here means sitting with the problem until it is clear enough to pass on — so the skill stays with you, not with the lab.

**Contact intro:** Start a conversation. What can we build together? A short note is enough — name, email, and what you have in mind.

## Visual system

Unchanged from the existing site: near-black base, cyan accent, Syne + IBM Plex Sans, sparse spot motif, hero atmosphere on Home only. Services keep the scroll-reveal. No new motion besides route changes.

## Testing

- Wrap routed tests in `MemoryRouter`
- Nav and hero CTAs use `/services`, `/about`, `/contact` (not hash anchors)
- Home shows teasers and does not render the full about body or contact form
- Services page renders every specialty title and blurb
- About page renders the expanded origin copy
- Contact page keeps validation and mailto coverage

## Out of scope

- Per-service subpages
- Blog, case studies, portfolio
- Real form API
- Dedicated 404 page
- Auth or app UI

## Success criteria

- Each header destination is its own URL and page.
- Home still reads as Spotty Labs in the first viewport, then offers three teasers.
- Services, About, and Contact have enough copy to feel finished without scrolling a single long landing page.
- Contact still opens a prefilled mailto after valid submit.
- `npm run build` still produces a static site.

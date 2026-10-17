# Spotty Labs Technology Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a futuristic single-page static React site for Spotty Labs Technology with hero, services, about (dog origin), and mailto contact.

**Architecture:** Vite + React + TypeScript SPA. Page sections as focused components under `src/components/`. Shared copy/constants in `src/data/`. Mailto URL builder as a pure util with unit tests. Global design tokens and motion in CSS. No backend.

**Tech Stack:** Vite, React 19, TypeScript, Vitest, React Testing Library, plain CSS (custom properties), Google Fonts (Syne + IBM Plex Sans)

## Global Constraints

- Spec: `docs/superpowers/specs/2026-10-17-spotty-labs-website-design.md`
- Contact email constant: `hello@spottylabs.tech`
- Display font: Syne; body font: IBM Plex Sans
- Palette: base `#070A0F`, accent `#3DE0FF`
- No Tailwind, no Next.js, no form API, no animation library
- No purple/indigo AI-default look; no cards in hero
- Git commits require `user.name` / `user.email` configured in this repo; if commit fails with “Author identity unknown”, stop and ask the human to set identity (do not run `git config` yourself unless they ask)

## File Structure

| Path | Responsibility |
| --- | --- |
| `package.json` | Scripts: `dev`, `build`, `preview`, `test` |
| `index.html` | Root HTML, font preconnect, `#root` |
| `vite.config.ts` | Vite + React + Vitest config |
| `src/main.tsx` | React mount |
| `src/App.tsx` | Page shell: Nav + sections + Footer |
| `src/App.css` | Page layout spacing |
| `src/index.css` | CSS variables, reset, base type, spot utilities |
| `src/data/content.ts` | Brand, services, about, contact email, hero copy |
| `src/utils/mailto.ts` | `buildMailtoHref(to, fields)` |
| `src/utils/mailto.test.ts` | Unit tests for mailto builder |
| `src/hooks/useInView.ts` | Intersection Observer for scroll reveal |
| `src/components/Nav.tsx` + `Nav.css` | Sticky nav |
| `src/components/Hero.tsx` + `Hero.css` | Brand hero + atmosphere |
| `src/components/Services.tsx` + `Services.css` | Four specialties |
| `src/components/About.tsx` + `About.css` | Origin story |
| `src/components/Contact.tsx` + `Contact.css` | Mailto form |
| `src/components/Footer.tsx` + `Footer.css` | Footer |
| `src/components/Contact.test.tsx` | Form validation + mailto open smoke test |
| `public/favicon.svg` | Simple spotted mark |

---

### Task 1: Scaffold Vite React TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`, `src/App.tsx`, `src/index.css`, `public/favicon.svg`
- Delete: default Vite boilerplate assets not used (`src/assets/react.svg`, etc.) if generated

**Interfaces:**
- Produces: runnable Vite app with `npm run dev` and `npm run build`

- [ ] **Step 1: Scaffold in the project root**

Run from `c:\Users\anton\OneDrive\Source\Spotty Labs Technology` (workspace already has `docs/`; scaffold into current dir carefully):

```bash
npm create vite@latest . -- --template react-ts
```

If the tool refuses a non-empty directory, scaffold to a temp folder and move files, preserving `docs/`.

- [ ] **Step 2: Install dependencies and Vitest tooling**

```bash
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Configure Vitest in `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

- [ ] **Step 4: Add `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Add scripts to `package.json`**

Ensure scripts include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 6: Replace `index.html` head for fonts and title**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Spotty Labs Technology — websites, custom applications, AI integrations, and computer education." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
    <title>Spotty Labs Technology</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Verify scaffold**

Run: `npm run build`  
Expected: build succeeds (placeholder App OK)

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json index.html src public
git commit -m "chore: scaffold Vite React TypeScript app with Vitest"
```

---

### Task 2: Design tokens, content data, and mailto util (TDD)

**Files:**
- Create: `src/index.css`, `src/data/content.ts`, `src/utils/mailto.ts`, `src/utils/mailto.test.ts`
- Modify: `src/App.tsx` (minimal stub using brand name only)

**Interfaces:**
- Produces:
  - `CONTACT_EMAIL: string` = `'hello@spottylabs.tech'`
  - `SERVICES: ReadonlyArray<{ id: string; title: string; description: string }>`
  - `buildMailtoHref(to: string, fields: { name: string; email: string; message: string }): string`

- [ ] **Step 1: Write failing mailto tests**

Create `src/utils/mailto.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildMailtoHref } from './mailto'

describe('buildMailtoHref', () => {
  it('builds subject and body with encoded fields', () => {
    const href = buildMailtoHref('hello@spottylabs.tech', {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Need an AI integration',
    })

    expect(href.startsWith('mailto:hello@spottylabs.tech?')).toBe(true)
    expect(href).toContain('subject=Spotty%20Labs%20inquiry%20from%20Ada%20Lovelace')
    expect(href).toContain('Name%3A%20Ada%20Lovelace')
    expect(href).toContain('Email%3A%20ada%40example.com')
    expect(href).toContain('Need%20an%20AI%20integration')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/mailto.test.ts`  
Expected: FAIL (module or function missing)

- [ ] **Step 3: Implement `src/utils/mailto.ts`**

```ts
export type MailtoFields = {
  name: string
  email: string
  message: string
}

export function buildMailtoHref(to: string, fields: MailtoFields): string {
  const subject = `Spotty Labs inquiry from ${fields.name}`
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
  const params = new URLSearchParams({ subject, body })
  return `mailto:${to}?${params.toString()}`
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/utils/mailto.test.ts`  
Expected: PASS

- [ ] **Step 5: Add `src/data/content.ts`**

```ts
export const BRAND = 'Spotty Labs Technology'
export const CONTACT_EMAIL = 'hello@spottylabs.tech'

export const HERO = {
  headline: 'Build what’s next.',
  support:
    'Websites, custom apps, AI integrations, and computer education — from a lab named after a Dalmatian and a Labrador.',
  primaryCta: 'Get in touch',
  secondaryCta: 'View services',
} as const

export const SERVICES = [
  {
    id: 'websites',
    title: 'Websites',
    description: 'Fast, distinctive sites that carry your brand.',
  },
  {
    id: 'custom-applications',
    title: 'Custom Applications',
    description: 'Software shaped around how you actually work.',
  },
  {
    id: 'ai-integrations',
    title: 'AI Integrations',
    description: 'Practical AI wired into tools and workflows.',
  },
  {
    id: 'computer-education',
    title: 'Computer Education',
    description: 'Clear teaching that turns curiosity into skill.',
  },
] as const

export const ABOUT = {
  title: 'About the lab',
  body: 'Spotty Labs Technology is named after two dogs — a Dalmatian and a Labrador. That mix of pattern and loyalty shows up in the work: careful craft, modern tech, and teaching that sticks.',
} as const
```

- [ ] **Step 6: Write global tokens in `src/index.css`**

```css
:root {
  --color-base: #070a0f;
  --color-surface: #10151e;
  --color-graphite: #1a2230;
  --color-accent: #3de0ff;
  --color-text: #f2f5f8;
  --color-muted: #9aa7b8;
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --space-section: clamp(4.5rem, 10vw, 7.5rem);
  --max-width: 1120px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-base);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/data/content.ts src/utils/mailto.ts src/utils/mailto.test.ts src/test
git commit -m "feat: add design tokens, content data, and mailto helper"
```

---

### Task 3: Nav + Hero

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Nav.css`, `src/components/Hero.tsx`, `src/components/Hero.css`, `public/favicon.svg`
- Modify: `src/App.tsx`, `src/App.css`

**Interfaces:**
- Consumes: `BRAND`, `HERO` from `src/data/content.ts`
- Produces: `#services`, `#about`, `#contact` anchor targets used by later sections

- [ ] **Step 1: Implement `Nav`**

`src/components/Nav.tsx`:

```tsx
import { BRAND } from '../data/content'
import './Nav.css'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top">{BRAND}</a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

`Nav.css`: sticky bar, transparent-to-base, compact links, brand in Syne, no pill cluster.

- [ ] **Step 2: Implement `Hero` with atmosphere + load motion**

Requirements from spec:
- Brand is hero-level dominant text (larger than headline if needed)
- Headline: `HERO.headline`
- Support: `HERO.support`
- CTAs: primary → `#contact`, secondary → `#services`
- Full-bleed background: near-black gradient + faint grid + sparse spots (CSS only)
- Animations: fade-rise for brand/headline; slow spot/grid drift
- No cards, badges, or overlay chips

- [ ] **Step 3: Wire into `App.tsx`**

```tsx
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import './App.css'

export default function App() {
  return (
    <div id="top" className="app">
      <Nav />
      <main>
        <Hero />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Manual check**

Run: `npm run dev`  
Expected: first viewport shows Spotty Labs Technology as dominant brand; CTAs scroll to placeholders/ids

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.css src/components/Hero.tsx src/components/Hero.css src/App.tsx src/App.css public/favicon.svg
git commit -m "feat: add sticky nav and atmospheric hero"
```

---

### Task 4: Services with scroll reveal

**Files:**
- Create: `src/hooks/useInView.ts`, `src/components/Services.tsx`, `src/components/Services.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SERVICES` from `src/data/content.ts`
- Produces: `<section id="services">` with four items

- [ ] **Step 1: Add `useInView` hook**

```ts
import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
```

- [ ] **Step 2: Implement `Services`**

- Section heading: “Services”
- Map `SERVICES` to open layout blocks (not card grid): title + description
- Apply `is-visible` class via `useInView` for staggered fade-rise CSS

- [ ] **Step 3: Mount in `App` after `Hero`**

- [ ] **Step 4: Manual check**

Run: `npm run dev`  
Expected: four specialties; items animate in on scroll

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useInView.ts src/components/Services.tsx src/components/Services.css src/App.tsx
git commit -m "feat: add services section with scroll reveal"
```

---

### Task 5: About + Footer

**Files:**
- Create: `src/components/About.tsx`, `src/components/About.css`, `src/components/Footer.tsx`, `src/components/Footer.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `ABOUT`, `BRAND` from `src/data/content.ts`
- Produces: `<section id="about">`, site footer

- [ ] **Step 1: Implement `About`**

Use `ABOUT.title` and `ABOUT.body`. Keep spot motif subtle in background. One headline + one paragraph — no secondary promo blocks.

- [ ] **Step 2: Implement `Footer`**

```tsx
import { BRAND } from '../data/content'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__brand">{BRAND}</p>
      <p className="footer__copy">© {year}</p>
    </footer>
  )
}
```

- [ ] **Step 3: Mount About + Footer in `App`**

- [ ] **Step 4: Manual check**

Expected: About names Dalmatian and Labrador; footer shows brand + year

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/About.css src/components/Footer.tsx src/components/Footer.css src/App.tsx
git commit -m "feat: add about origin story and footer"
```

---

### Task 6: Contact form (mailto) with tests

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Contact.css`, `src/components/Contact.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `CONTACT_EMAIL`, `buildMailtoHref`
- Produces: `<section id="contact">` form that opens mailto on valid submit

- [ ] **Step 1: Write failing Contact tests**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  beforeEach(() => {
    vi.stubGlobal('location', { ...window.location, href: '' })
  })

  it('does not navigate when required fields are empty', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.click(screen.getByRole('button', { name: /send/i }))
    expect(window.location.href).toBe('')
  })

  it('opens mailto when fields are valid', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText(/name/i), 'Ada')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send/i }))
    expect(window.location.href).toContain('mailto:hello@spottylabs.tech')
    expect(window.location.href).toContain('Ada')
  })
})
```

Note: if assigning `window.location.href` is awkward in jsdom, implement Contact to call an injectable `navigate` defaulting to `href => { window.location.href = href }`, and assert on a mock in tests instead.

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm test -- src/components/Contact.test.tsx`  
Expected: FAIL (Contact missing)

- [ ] **Step 3: Implement `Contact`**

- Fields: name, email, message (all required)
- On submit: `preventDefault`, validate non-empty trim, then set `window.location.href = buildMailtoHref(CONTACT_EMAIL, fields)` (or `navigate(...)`)
- Show inline validation message when invalid
- Form is the interactive container (card-like surface allowed here)

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- src/components/Contact.test.tsx`  
Expected: PASS

- [ ] **Step 5: Mount Contact before Footer in `App`**

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.tsx src/components/Contact.css src/components/Contact.test.tsx src/App.tsx
git commit -m "feat: add mailto contact form with validation"
```

---

### Task 7: Page polish, accessibility, production build

**Files:**
- Modify: `src/App.tsx`, `src/App.css`, section CSS files as needed
- Create: `public/favicon.svg` if not already present

**Interfaces:**
- Consumes: all prior components
- Produces: complete single-page site passing build + tests

- [ ] **Step 1: Finalize `App` composition**

Order: `Nav`, `Hero`, `Services`, `About`, `Contact`, `Footer`.

- [ ] **Step 2: Responsive pass**

- Mobile: stacked nav or compact brand + links wrap
- Hero brand remains dominant under 480px
- Services stack to one column

- [ ] **Step 3: Accessibility pass**

- Landmarks: `header`, `main`, `footer`, labeled `nav`
- Form labels associated with inputs
- Accent buttons meet contrast on dark base
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables drift/reveal transforms

- [ ] **Step 4: Add simple `public/favicon.svg`**

Dark square with a few cyan/white spots (Dalmatian nod).

- [ ] **Step 5: Verify**

```bash
npm test
npm run build
```

Expected: all tests pass; `dist/` emitted with no errors

- [ ] **Step 6: Commit**

```bash
git add src public
git commit -m "feat: polish responsive layout and ship static build"
```

---

## Spec coverage checklist

| Spec requirement | Task |
| --- | --- |
| Single-page Hero → Services → About → Contact → Footer | 3–7 |
| Sticky nav with section links | 3 |
| Brand-first hero, full-bleed atmosphere, no hero cards | 3 |
| Four specialties from local data | 2, 4 |
| About dog origin (Dalmatian + Labrador) | 2, 5 |
| Mailto form to `hello@spottylabs.tech` | 2, 6 |
| Syne + IBM Plex Sans, `#070A0F` / `#3DE0FF` | 1, 2 |
| Motions: load fade-rise, spot drift, scroll reveal | 3, 4 |
| Static Vite build | 1, 7 |
| No Tailwind / form API / blog | All tasks respect out-of-scope |

## Self-review notes

- No TBD placeholders in tasks
- Mailto subject format matches tests and util
- Content strings match the approved design spec draft copy

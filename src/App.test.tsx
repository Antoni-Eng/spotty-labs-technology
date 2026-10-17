import { existsSync } from 'node:fs'
import path from 'node:path'
import { act, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ABOUT,
  ABOUT_IMAGE,
  BRAND,
  CONTACT_INTRO,
  HERO,
  HERO_IMAGE,
  HOME_TEASERS,
  MEDIA_CREDITS,
  SERVICES,
  SERVICES_INTRO,
} from './data/content'
import { renderApp } from './test/renderApp'

let intersectionCallback: IntersectionObserverCallback

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback
  }

  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

describe('Nav', () => {
  it('renders path links and marks the current page', () => {
    renderApp('/about')

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: BRAND })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('Routes', () => {
  it('renders the services heading on /services', () => {
    renderApp('/services')
    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument()
  })

  it('renders the about title on /about', () => {
    renderApp('/about')
    expect(screen.getByRole('heading', { level: 2, name: 'About the lab' })).toBeInTheDocument()
  })

  it('renders the contact form on /contact', () => {
    renderApp('/contact')
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('redirects unknown paths home', () => {
    renderApp('/nope')
    expect(screen.getByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
  })
})

describe('Home', () => {
  it('presents the brand, hero copy, route CTAs, and teasers', () => {
    renderApp('/')

    expect(screen.getByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: HERO.headline })).toBeInTheDocument()
    expect(screen.getByText(HERO.support)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: HERO.primaryCta })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: HERO.secondaryCta })).toHaveAttribute('href', '/services')

    for (const teaser of HOME_TEASERS) {
      expect(screen.getByRole('heading', { name: teaser.title })).toBeInTheDocument()
      expect(screen.getByText(teaser.body)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: `Read more about ${teaser.title}` })).toHaveAttribute(
        'href',
        teaser.href,
      )
    }
  })

  it('does not render the full about body or contact form on home', () => {
    renderApp('/')

    expect(screen.queryByText(ABOUT.paragraphs[0])).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
  })

  it('shows the hero still and a photo on each teaser', () => {
    renderApp('/')

    expect(screen.getByRole('img', { name: HERO_IMAGE.alt })).toBeInTheDocument()

    for (const teaser of HOME_TEASERS) {
      expect(screen.getByRole('img', { name: teaser.image.alt })).toBeInTheDocument()
    }
  })
})

describe('Services page', () => {
  it('renders the intro and every specialty blurb, then reveals items', () => {
    renderApp('/services')

    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument()
    expect(screen.getByText(SERVICES_INTRO)).toBeInTheDocument()

    const serviceItems = SERVICES.map((service) => {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument()
      expect(screen.getByText(service.blurb)).toBeInTheDocument()
      return screen.getByRole('heading', { level: 3, name: service.title }).closest('article')
    })

    expect(serviceItems.every((item) => !item?.classList.contains('is-visible'))).toBe(true)

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(serviceItems.every((item) => item?.classList.contains('is-visible'))).toBe(true)
  })
})

describe('About page', () => {
  it('renders the origin story as one heading and multiple paragraphs', () => {
    renderApp('/about')

    const about = document.querySelector('#about')

    expect(about).toBeInTheDocument()
    expect(about?.querySelectorAll('h2')).toHaveLength(1)
    expect(about?.querySelectorAll('p')).toHaveLength(ABOUT.paragraphs.length)
    expect(screen.getByRole('heading', { level: 2, name: ABOUT.title })).toBeInTheDocument()

    for (const paragraph of ABOUT.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
  })
})

describe('Contact page', () => {
  it('renders the invite copy and the mailto form', () => {
    renderApp('/contact')

    expect(screen.getByText(CONTACT_INTRO.eyebrow)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: CONTACT_INTRO.title })).toBeInTheDocument()
    expect(screen.getByText(CONTACT_INTRO.support)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })
})

describe('Media data', () => {
  it('points every still at a local public image with a credit', () => {
    const stills = [HERO_IMAGE, ABOUT_IMAGE, ...HOME_TEASERS.map((teaser) => teaser.image)]

    for (const still of stills) {
      expect(still.src.startsWith('/images/')).toBe(true)
      expect(still.src.endsWith('.jpg')).toBe(true)
      expect(still.alt.length).toBeGreaterThan(8)
      expect(still.credit.name.length).toBeGreaterThan(2)
      expect(still.credit.href).toMatch(/^https:\/\/unsplash\.com\//)
    }

    expect(MEDIA_CREDITS.length).toBeGreaterThan(0)
    expect(new Set(MEDIA_CREDITS.map((credit) => credit.href)).size).toBe(MEDIA_CREDITS.length)
  })

  it('maps every still src to a file under public/', () => {
    const stills = [HERO_IMAGE, ABOUT_IMAGE, ...HOME_TEASERS.map((teaser) => teaser.image)]

    for (const still of stills) {
      const filePath = path.join(process.cwd(), 'public', still.src)
      expect(existsSync(filePath)).toBe(true)
    }
  })
})

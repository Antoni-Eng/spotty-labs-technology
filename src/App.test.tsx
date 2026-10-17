import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { ABOUT, BRAND, HERO, SERVICES } from './data/content'

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

describe('Nav and hero', () => {
  it('renders the primary navigation with section links', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute(
      'href',
      '#services',
    )
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '#about',
    )
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact',
    )
  })

  it('presents the brand, hero copy, and CTA destinations', () => {
    render(<App />)

    expect(screen.getAllByText(BRAND)).toHaveLength(3)
    expect(
      screen.getByRole('heading', { level: 1, name: BRAND }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: HERO.headline })).toBeInTheDocument()
    expect(screen.getByText(HERO.support)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: HERO.primaryCta })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.getByRole('link', { name: HERO.secondaryCta })).toHaveAttribute(
      'href',
      '#services',
    )
  })
})

describe('Services', () => {
  it('renders every service and reveals them when the section enters view', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument()

    const serviceItems = SERVICES.map((service) => {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument()
      expect(screen.getByText(service.description)).toBeInTheDocument()
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

describe('About and footer', () => {
  it('renders the origin story as one heading and one paragraph', () => {
    render(<App />)

    const about = document.querySelector('#about')

    expect(about).toBeInTheDocument()
    expect(about?.querySelectorAll('h2')).toHaveLength(1)
    expect(about?.querySelectorAll('p')).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 2, name: ABOUT.title })).toBeInTheDocument()
    expect(screen.getByText(ABOUT.body)).toBeInTheDocument()
  })

  it('renders the brand and current year in the footer while retaining contact target', () => {
    render(<App />)

    const footer = screen.getByRole('contentinfo')

    expect(footer).toHaveTextContent(BRAND)
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()}`)
    expect(document.querySelector('#contact')).toBeInTheDocument()
  })
})

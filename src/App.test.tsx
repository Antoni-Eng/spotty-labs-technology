import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BRAND } from './data/content'
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

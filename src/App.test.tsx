import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { BRAND, HERO } from './data/content'

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

    expect(screen.getAllByText(BRAND)).toHaveLength(2)
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

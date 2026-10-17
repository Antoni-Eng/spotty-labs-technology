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

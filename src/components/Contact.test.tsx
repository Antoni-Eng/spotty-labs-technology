import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('shows validation and does not navigate when required fields are blank', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()

    render(<Contact navigate={navigate} />)
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      /name, email, and message are required/i,
    )
    expect(navigate).not.toHaveBeenCalled()
  })

  it('opens a mailto link when trimmed fields are valid', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()

    render(<Contact navigate={navigate} />)
    await user.type(screen.getByLabelText(/name/i), '  Ada  ')
    await user.type(screen.getByLabelText(/email/i), '  ada@example.com  ')
    await user.type(screen.getByLabelText(/message/i), '  Hello  ')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(navigate).toHaveBeenCalledOnce()
    expect(navigate).toHaveBeenCalledWith(
      expect.stringContaining('mailto:hello@spottylabs.tech'),
    )
    expect(navigate).toHaveBeenCalledWith(expect.stringContaining('Ada'))
    expect(navigate).toHaveBeenCalledWith(
      expect.not.stringContaining('%20%20Ada%20%20'),
    )
  })
})

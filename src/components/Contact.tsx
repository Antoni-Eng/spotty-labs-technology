import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '../data/content'
import { buildMailtoHref } from '../utils/mailto'
import './Contact.css'

type ContactProps = {
  navigate?: (href: string) => void
}

const defaultNavigate = (href: string) => {
  window.location.href = href
}

export function Contact({ navigate = defaultNavigate }: ContactProps) {
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const fields = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      message: String(form.get('message') ?? '').trim(),
    }

    if (!fields.name || !fields.email || !fields.message) {
      setError('Name, email, and message are required.')
      return
    }

    setError('')
    navigate(buildMailtoHref(CONTACT_EMAIL, fields))
  }

  return (
    <section
      id="contact"
      className="contact app__section-target"
      aria-labelledby="contact-title"
    >
      <div className="contact__inner">
        <div className="contact__intro">
          <p className="contact__eyebrow">Start a conversation</p>
          <h2 id="contact-title" className="contact__title">
            What can we build together?
          </h2>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <label className="contact__field">
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>

          <label className="contact__field">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label className="contact__field">
            <span>Message</span>
            <textarea name="message" rows={6} required />
          </label>

          {error && (
            <p className="contact__error" role="alert">
              {error}
            </p>
          )}

          <button className="contact__submit" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}

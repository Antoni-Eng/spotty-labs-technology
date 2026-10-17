import { Contact } from '../components/Contact'
import { CONTACT_INTRO } from '../data/content'
import '../components/Contact.css'

export function ContactPage() {
  return (
    <section
      id="contact"
      className="contact app__section-target"
      aria-labelledby="contact-title"
    >
      <div className="contact__inner">
        <div className="contact__intro">
          <p className="contact__eyebrow">{CONTACT_INTRO.eyebrow}</p>
          <h2 id="contact-title" className="contact__title">
            {CONTACT_INTRO.title}
          </h2>
          <p className="contact__support">{CONTACT_INTRO.support}</p>
        </div>
        <Contact />
      </div>
    </section>
  )
}

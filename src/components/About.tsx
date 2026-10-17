import { ABOUT } from '../data/content'
import './About.css'

export function About() {
  return (
    <section
      id="about"
      className="about app__section-target"
      aria-labelledby="about-title"
    >
      <div className="about__inner">
        <h2 id="about-title" className="about__title">
          {ABOUT.title}
        </h2>
        <p className="about__body">{ABOUT.body}</p>
      </div>
    </section>
  )
}

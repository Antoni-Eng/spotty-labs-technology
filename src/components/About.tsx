import { ABOUT, ABOUT_IMAGE } from '../data/content'
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
        <div className="about__copy">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about__body">
              {paragraph}
            </p>
          ))}
        </div>
        <img
          className="about__photo"
          src={ABOUT_IMAGE.src}
          alt={ABOUT_IMAGE.alt}
        />
      </div>
    </section>
  )
}

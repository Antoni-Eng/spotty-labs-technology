import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { HOME_TEASERS } from '../data/content'
import './HomePage.css'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="teasers" aria-labelledby="teasers-title">
        <div className="teasers__inner">
          <h2 id="teasers-title" className="teasers__title">Explore</h2>
          <div className="teasers__list">
            {HOME_TEASERS.map((teaser) => (
              <article key={teaser.id} className="teasers__item">
                <img
                  className="teasers__photo"
                  src={teaser.image.src}
                  alt={teaser.image.alt}
                />
                <h3 className="teasers__item-title">{teaser.title}</h3>
                <p className="teasers__body">{teaser.body}</p>
                <Link className="teasers__link" to={teaser.href}>
                  Read more about {teaser.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

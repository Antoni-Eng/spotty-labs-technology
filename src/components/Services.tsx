import type { CSSProperties } from 'react'
import { SERVICES } from '../data/content'
import { useInView } from '../hooks/useInView'
import './Services.css'

export function Services() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="services"
      className="services app__section-target"
      aria-labelledby="services-title"
    >
      <div className="services__inner">
        <div className="services__intro">
          <h2 id="services-title" className="services__title">
            Services
          </h2>
        </div>

        <div className="services__list">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className={`services__item${inView ? ' is-visible' : ''}`}
              style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
            >
              <span className="services__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="services__item-title">{service.title}</h3>
                <p className="services__description">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

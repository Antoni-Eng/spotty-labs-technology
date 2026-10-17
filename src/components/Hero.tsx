import { BRAND, HERO } from '../data/content'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-brand">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__spots" aria-hidden="true" />
      <div className="hero__content">
        <h1 id="hero-brand" className="hero__brand">{BRAND}</h1>
        <h2 className="hero__headline">{HERO.headline}</h2>
        <p className="hero__support">{HERO.support}</p>
        <div className="hero__actions">
          <a className="hero__cta hero__cta--primary" href="#contact">
            {HERO.primaryCta}
          </a>
          <a className="hero__cta hero__cta--secondary" href="#services">
            {HERO.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}

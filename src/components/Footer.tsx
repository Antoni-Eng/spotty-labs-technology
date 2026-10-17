import { BRAND, MEDIA_CREDITS } from '../data/content'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">{BRAND}</p>
      <p className="footer__credits">
        Photos:{' '}
        {MEDIA_CREDITS.map((credit, index) => (
          <span key={credit.href}>
            {index > 0 && ', '}
            <a href={credit.href} rel="noreferrer">
              {credit.name}
            </a>
          </span>
        ))}
        {' / Unsplash'}
      </p>
      <p className="footer__copy">© {CURRENT_YEAR}</p>
    </footer>
  )
}

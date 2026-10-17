import { BRAND } from '../data/content'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">{BRAND}</p>
      <p className="footer__copy">© {CURRENT_YEAR}</p>
    </footer>
  )
}

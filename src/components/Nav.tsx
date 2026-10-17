import { BRAND } from '../data/content'
import './Nav.css'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top">{BRAND}</a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

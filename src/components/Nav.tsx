import { Link, NavLink } from 'react-router-dom'
import { BRAND } from '../data/content'
import './Nav.css'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <Link className="nav__brand" to="/">{BRAND}</Link>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

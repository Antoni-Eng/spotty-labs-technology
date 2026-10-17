import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import './App.css'

export default function App() {
  return (
    <div id="top" className="app">
      <Nav />
      <main>
        <Hero />
        <Services />
        <section id="about" className="app__section-target" aria-label="About" />
        <section id="contact" className="app__section-target" aria-label="Contact" />
      </main>
    </div>
  )
}

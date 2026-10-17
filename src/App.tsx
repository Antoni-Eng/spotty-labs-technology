import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  return (
    <div id="top" className="app">
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <section id="contact" className="app__section-target" aria-label="Contact" />
      </main>
      <Footer />
    </div>
  )
}

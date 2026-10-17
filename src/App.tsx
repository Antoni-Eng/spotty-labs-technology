import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import './App.css'

export default function App() {
  return (
    <div id="top" className="app">
      <Nav />
      <main>
        <Hero />
      </main>
    </div>
  )
}

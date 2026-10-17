import { Navigate, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import './App.css'

export default function App() {
  return (
    <div id="top" className="app">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

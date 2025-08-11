import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import CookieConsent from './components/CookieConsent'
import Gallery from './components/Gallery'

export default function App(){
  const [route, setRoute] = useState('home')

  const sections = new Set(['home','about','services','contact'])
  const scrollToSection = (id) => {
    if (!id || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const parseHash = () => {
    const hash = window.location.hash.replace('#','')
    const [path] = hash.split('?')
    // Only treat gallery as a separate route; all other paths are on the home page
    if (path === 'gallery') return 'gallery'
    return 'home'
  }

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#','')
      const [path] = hash.split('?')
      if (path === 'gallery') {
        setRoute('gallery')
      } else {
        setRoute('home')
        if (sections.has(path)) {
          // Defer scrolling slightly to ensure elements are present
          requestAnimationFrame(() => scrollToSection(path))
        }
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (to) => {
    if (to === 'gallery') {
      setRoute('gallery')
      window.location.hash = 'gallery'
      return
    }
    if (sections.has(to)) {
      setRoute('home')
      window.location.hash = to
      scrollToSection(to)
      return
    }
    // Fallback to home top
    setRoute('home')
    window.location.hash = 'home'
    scrollToSection('home')
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black antialiased">
      <Navbar onNavigate={navigate} />
      <main>
        {route === 'home' && <><Hero onExplore={() => navigate('services')} /><About /><Services /><Contact /></>}
        {/* About/Services/Contact are sections inside home; only Gallery is a separate view */}
        {route === 'gallery' && <Gallery />}
      </main>
      <CookieConsent />
      <footer className="py-8 text-center text-midGray">© {new Date().getFullYear()} Photography Studio</footer>
    </div>
  )
}

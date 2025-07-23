import { useState, useEffect } from 'react'
import EnhancedParticleBackground from './components/EnhancedParticleBackground'
import SpaceParticleBackground from './components/SpaceParticleBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import EventsWidget from './components/EventsWidget'
import TeamSpotlight from './components/TeamSpotlight'
import UsefulResources from './components/UsefulResources'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      <SpaceParticleBackground />
      <EnhancedParticleBackground />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-20 relative z-10">
        <HeroSection />
        <EventsWidget />
        <TeamSpotlight />
        <UsefulResources />
      </main>
      <Footer />
    </div>
  )
}

export default App


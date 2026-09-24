import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackToTop from '../components/BackToTop.jsx'
import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Skills from '../sections/Skills.jsx'
import Projects from '../sections/Projects.jsx'
import Experience from '../sections/Experience.jsx'
import Certifications from '../sections/Certifications.jsx'
import Education from '../sections/Education.jsx'
import ResumeSection from '../sections/ResumeSection.jsx'
import CurrentlyLearning from '../sections/CurrentlyLearning.jsx'
import WhatICanBuild from '../sections/WhatICanBuild.jsx'
import Contact from '../sections/Contact.jsx'
import { useTheme } from '../hooks/useTheme.js'

export default function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WhatICanBuild />
        <Experience />
        <Certifications />
        <Education />
        <ResumeSection />
        <CurrentlyLearning />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

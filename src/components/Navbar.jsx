import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download, Eye } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { resumePath } from '../data/portfolioData.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { trackEvent } from '../utils/analytics.js'

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' }
]

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink-50/85 dark:bg-ink-950/85 backdrop-blur-md border-b border-ink-100 dark:border-ink-800'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#home" className="focus-ring rounded-md font-display text-lg font-semibold tracking-tight">
          Zoyanaaz<span className="text-amber-500">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={`focus-ring relative rounded-md text-sm font-medium transition-colors ${
                  activeId === link.id
                    ? 'text-ink-950 dark:text-white'
                    : 'text-ink-600 dark:text-ink-300 hover:text-ink-950 dark:hover:text-white'
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-amber-500"
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_viewed', { location: 'navbar' })}
            aria-label="View resume"
            title="View Resume"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 transition-colors hover:border-amber-400 hover:text-amber-500"
          >
            <Eye size={15} strokeWidth={2} />
          </a>
          <a
            href={resumePath}
            download="Zoyanaaz_Maldar_Resume.pdf"
            onClick={() => trackEvent('resume_downloaded', { location: 'navbar' })}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-4 py-2 text-sm font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            <Download size={15} strokeWidth={2} />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-200"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-b border-ink-100 dark:border-ink-800 bg-ink-50 dark:bg-ink-950"
          >
            <ul className="container-content flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`focus-ring block rounded-md px-2 py-2.5 text-base font-medium ${
                      activeId === link.id
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-ink-700 dark:text-ink-200'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex items-center gap-3">
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 px-4 py-2.5 text-sm font-medium text-ink-700 dark:text-ink-200"
                >
                  <Eye size={15} strokeWidth={2} />
                  View Resume
                </a>
                <a
                  href={resumePath}
                  download="Zoyanaaz_Maldar_Resume.pdf"
                  onClick={handleNavClick}
                  className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-4 py-2.5 text-sm font-medium text-white dark:text-ink-950"
                >
                  <Download size={15} strokeWidth={2} />
                  Download
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

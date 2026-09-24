import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { contactInfo, personalData, resumePath } from '../data/portfolioData.js'
import ExternalLink from './ExternalLink.jsx'
import { trackEvent } from '../utils/analytics.js'

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-100 dark:border-ink-800">
      <div className="container-content py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-lg font-semibold text-ink-950 dark:text-white">{personalData.name}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{personalData.title}</p>
            <div className="mt-4 flex items-center gap-3">
              <ExternalLink
                href={contactInfo.github}
                ariaLabel="GitHub"
                fallbackLabel="Add GitHub URL"
                onClick={() => trackEvent('github_clicked', { location: 'footer' })}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
                disabledClassName="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-ink-200 dark:border-ink-700 text-ink-400 dark:text-ink-600"
              >
                <Github size={15} />
              </ExternalLink>
              <ExternalLink
                href={contactInfo.linkedin}
                ariaLabel="LinkedIn"
                fallbackLabel="Add LinkedIn URL"
                onClick={() => trackEvent('linkedin_clicked', { location: 'footer' })}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
                disabledClassName="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-ink-200 dark:border-ink-700 text-ink-400 dark:text-ink-600"
              >
                <Linkedin size={15} />
              </ExternalLink>
              <a
                href={`mailto:${contactInfo.email}`}
                aria-label="Email"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <nav aria-label="Quick navigation">
            <p className="text-sm font-medium text-ink-900 dark:text-white">Quick Links</p>
            <ul className="mt-3 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring text-sm text-ink-500 dark:text-ink-400 hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-white">Resume</p>
            <a
              href={resumePath}
              download="Zoyanaaz_Maldar_Resume.pdf"
              onClick={() => trackEvent('resume_downloaded', { location: 'footer' })}
              className="focus-ring mt-3 inline-flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <FileText size={14} /> Download Resume
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-ink-100 dark:border-ink-800 pt-6">
          <p className="text-sm text-ink-500 dark:text-ink-400 text-center">
            © {year} {personalData.name}. Built with React.
          </p>
        </div>
      </div>
    </footer>
  )
}

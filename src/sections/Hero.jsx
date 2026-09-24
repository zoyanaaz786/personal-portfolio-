import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { personalData, contactInfo, resumePath } from '../data/portfolioData.js'
import ExternalLink from '../components/ExternalLink.jsx'
import { trackEvent } from '../utils/analytics.js'

function RotatingRole() {
  const roles = personalData.rotatingRoles
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          initial={false}
          animate={{
            y: i === index ? 0 : i < index ? '-100%' : '100%',
            opacity: i === index ? 1 : 0
          }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0 text-amber-500 dark:text-amber-400"
        >
          {role}
        </motion.span>
      ))}
      <span className="invisible">{roles[0]}</span>
    </span>
  )
}

function CodePanel() {
  const lines = [
    { indent: 0, text: 'const developer = {' },
    { indent: 1, text: `name: 'Zoyanaaz Maldar',` },
    { indent: 1, text: `role: 'Software Developer',` },
    { indent: 1, text: `stack: ['Python', 'React', 'SQL'],` },
    { indent: 1, text: `focus: ['Web', 'Backend', 'AI/ML'],` },
    { indent: 1, text: `openTo: 'internships',` },
    { indent: 0, text: '}' }
  ]

  return (
    <div className="relative rounded-2xl border border-ink-150 dark:border-ink-700 bg-ink-950 dark:bg-ink-900 p-6 shadow-cardDark">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="ml-2 text-xs text-ink-400">profile.js</span>
      </div>
      <pre className="mt-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => (
            <div key={i} style={{ paddingLeft: `${line.indent * 1.1}rem` }} className="text-ink-200">
              {line.text}
            </div>
          ))}
          <span className="text-amber-400 animate-blink">_</span>
        </code>
      </pre>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl"
      />
      <div className="container-content grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-base text-ink-500 dark:text-ink-400">Hi, I'm {personalData.name}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-semibold leading-[1.1] tracking-tight text-ink-950 dark:text-white">
            Computer Science Engineering Student
            <br />
            <span className="text-ink-500 dark:text-ink-300">Software Developer</span>
          </h1>

          <p className="mt-5 text-lg text-ink-600 dark:text-ink-300">
            Building with <RotatingRole />
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 dark:text-ink-400">
            {personalData.tagline}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {personalData.availability}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-5 py-2.5 text-sm font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5"
            >
              View My Projects <ArrowRight size={15} />
            </a>
            <a
              href={resumePath}
              download="Zoyanaaz_Maldar_Resume.pdf"
              onClick={() => trackEvent('resume_downloaded', { location: 'hero' })}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 px-5 py-2.5 text-sm font-medium text-ink-700 dark:text-ink-200 transition-colors hover:border-amber-400 hover:text-amber-600"
            >
              <Download size={15} /> Download Resume
            </a>
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('resume_viewed', { location: 'hero' })}
              className="focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink-600 dark:text-ink-300 transition-colors hover:text-amber-600"
            >
              <Eye size={15} /> View Resume
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <ExternalLink
              href={contactInfo.github}
              ariaLabel="GitHub"
              onClick={() => trackEvent('github_clicked', { location: 'hero' })}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
              disabledClassName="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-ink-200 dark:border-ink-700 text-ink-400 dark:text-ink-600"
              fallbackLabel="Add GitHub URL"
            >
              <Github size={16} />
            </ExternalLink>
            <ExternalLink
              href={contactInfo.linkedin}
              ariaLabel="LinkedIn"
              onClick={() => trackEvent('linkedin_clicked', { location: 'hero' })}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
              disabledClassName="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-ink-200 dark:border-ink-700 text-ink-400 dark:text-ink-600"
              fallbackLabel="Add LinkedIn URL"
            >
              <Linkedin size={16} />
            </ExternalLink>
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label="Email"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
            >
              <Mail size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <CodePanel />
        </motion.div>
      </div>
    </section>
  )
}

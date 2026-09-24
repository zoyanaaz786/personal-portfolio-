import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Eye, Download, AlertCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { resumePath } from '../data/portfolioData.js'
import { trackEvent } from '../utils/analytics.js'

export default function ResumeSection() {
  // Optimistic by default (avoids a loading flicker for the common case);
  // flips to false only if the file genuinely can't be found.
  const [status, setStatus] = useState('checking') // 'checking' | 'available' | 'missing'

  useEffect(() => {
    let cancelled = false
    fetch(resumePath, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return
        setStatus(res.ok ? 'available' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow="Resume" title="My resume" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="card-surface flex flex-col sm:flex-row sm:items-center gap-6 p-7 max-w-2xl"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/12 text-amber-600 dark:text-amber-400">
            <FileText size={24} strokeWidth={1.6} />
          </span>

          <div className="flex-1">
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              View my latest resume for a detailed overview of my education, technical skills, projects, and
              certifications.
            </p>

            {status === 'missing' ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-400">
                <AlertCircle size={15} />
                Resume not uploaded yet
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('resume_viewed', { location: 'resume_section' })}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 hover:border-amber-400 hover:text-amber-600"
                >
                  <Eye size={15} /> View Resume
                </a>
                <a
                  href={resumePath}
                  download="Zoyanaaz_Maldar_Resume.pdf"
                  onClick={() => trackEvent('resume_downloaded', { location: 'resume_section' })}
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-4 py-2 text-sm font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5"
                >
                  <Download size={15} /> Download Resume
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

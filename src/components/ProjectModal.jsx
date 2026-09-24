import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, ExternalLink as ExternalLinkIcon, CircleCheck } from 'lucide-react'
import ExternalLink from './ExternalLink.jsx'
import Lightbox from './Lightbox.jsx'
import { trackEvent } from '../utils/analytics.js'

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (!project) return
    closeButtonRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose, lightboxIndex])

  const hasScreenshots = project?.screenshots?.length > 0

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto bg-ink-950/60 backdrop-blur-sm p-4 py-10"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-900 p-6 sm:p-9 shadow-cardDark"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                      Featured Project
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 px-2.5 py-1 text-[11px] font-medium text-ink-500 dark:text-ink-400">
                      <CircleCheck size={11} /> {project.status}
                    </span>
                  )}
                </div>
                <h3 id="project-modal-title" className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink-950 dark:text-white">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{project.tagline}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Overview</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Problem</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.problem}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Solution</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Features</h4>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Technology Stack</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ink-150 dark:border-ink-700 px-2.5 py-1 text-xs font-medium text-ink-600 dark:text-ink-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink-950 dark:text-white">My Contribution</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.myWork}</p>
              </div>

              {hasScreenshots && (
                <div>
                  <h4 className="text-sm font-semibold text-ink-950 dark:text-white">Screenshots</h4>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {project.screenshots.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxIndex(i)}
                        className="focus-ring overflow-hidden rounded-lg border border-ink-100 dark:border-ink-700"
                      >
                        <img
                          src={src}
                          alt={`${project.name} screenshot ${i + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.closest('button').style.display = 'none'
                          }}
                          className="h-20 w-full object-cover transition-transform hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 pt-5 border-t border-ink-100 dark:border-ink-800">
              <ExternalLink
                href={project.github}
                fallbackLabel="Coming Soon"
                onClick={() => trackEvent('github_clicked', { project: project.id, location: 'modal' })}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 hover:border-amber-400 hover:text-amber-600"
                disabledClassName="inline-flex items-center gap-2 rounded-full border border-dashed border-ink-200 dark:border-ink-700 px-4 py-2 text-sm font-medium text-ink-400 dark:text-ink-600"
              >
                <Github size={15} /> GitHub
              </ExternalLink>
              <ExternalLink
                href={project.liveDemo}
                fallbackLabel="Coming Soon"
                onClick={() => trackEvent('project_opened', { project: project.id, type: 'live_demo', location: 'modal' })}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-4 py-2 text-sm font-medium text-white dark:text-ink-950"
                disabledClassName="inline-flex items-center gap-2 rounded-full border border-dashed border-ink-200 dark:border-ink-700 px-4 py-2 text-sm font-medium text-ink-400 dark:text-ink-600"
              >
                <ExternalLinkIcon size={15} /> Live Demo
              </ExternalLink>
            </div>
          </motion.div>

          <Lightbox
            images={project.screenshots || []}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

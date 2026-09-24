import { motion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink as ExternalLinkIcon, Clock } from 'lucide-react'
import ExternalLink from './ExternalLink.jsx'
import { trackEvent } from '../utils/analytics.js'

export default function ProjectCard({ project, onViewDetails, featured = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`card-surface flex flex-col p-6 sm:p-7 transition-shadow hover:shadow-lg ${
        featured ? 'lg:p-9' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {featured && (
            <span className="mb-3 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              Featured Project
            </span>
          )}
          <h3 className={`font-display font-semibold text-ink-950 dark:text-white ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{project.tagline}</p>
        </div>
        {project.status && (
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-ink-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 px-2.5 py-1 text-[11px] font-medium text-ink-500 dark:text-ink-400">
            <Clock size={11} /> {project.status}
          </span>
        )}
      </div>

      <p className={`mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300 ${featured ? 'sm:text-base' : ''}`}>
        {project.description}
      </p>

      {featured && (
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {project.features.slice(0, 8).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, featured ? 8 : 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-ink-150 dark:border-ink-700 px-2.5 py-1 text-xs font-medium text-ink-600 dark:text-ink-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-ink-100 dark:border-ink-800">
        <ExternalLink
          href={project.github}
          fallbackLabel="Coming Soon"
          onClick={() => trackEvent('github_clicked', { project: project.id })}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 transition-colors hover:border-amber-400 hover:text-amber-600"
          disabledClassName="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-200 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-400 dark:text-ink-600"
        >
          <Github size={13} /> GitHub
        </ExternalLink>
        <ExternalLink
          href={project.liveDemo}
          fallbackLabel="Coming Soon"
          onClick={() => trackEvent('project_opened', { project: project.id, type: 'live_demo' })}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 transition-colors hover:border-amber-400 hover:text-amber-600"
          disabledClassName="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-200 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-400 dark:text-ink-600"
        >
          <ExternalLinkIcon size={13} /> Live Demo
        </ExternalLink>
        <button
          type="button"
          onClick={() => {
            onViewDetails(project)
            trackEvent('project_opened', { project: project.id, type: 'details' })
          }}
          className="focus-ring ml-auto inline-flex items-center gap-1 rounded-full bg-ink-950 dark:bg-amber-500 px-3.5 py-1.5 text-xs font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5"
        >
          View Details <ArrowUpRight size={13} />
        </button>
      </div>
    </motion.article>
  )
}

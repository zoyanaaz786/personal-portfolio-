import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import { projects } from '../data/portfolioData.js'

const FILTERS = ['All', 'Web', 'Python', 'AI/ML', 'Backend', 'Other']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  const filteredRest = useMemo(() => {
    if (filter === 'All') return rest
    return rest.filter((p) => p.tags.includes(filter))
  }, [filter, rest])

  return (
    <section id="projects" className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Practical projects across web, backend, and AI/ML — built end to end, not just tutorials followed."
        />

        {featured && (
          <div className="mb-8">
            <ProjectCard project={featured} onViewDetails={setActiveProject} featured />
          </div>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`focus-ring rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-ink-950 dark:bg-amber-500 text-white dark:text-ink-950'
                  : 'border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-amber-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredRest.map((project) => (
              <ProjectCard key={project.id} project={project} onViewDetails={setActiveProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRest.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-500 dark:text-ink-400">
            No other projects in this category yet.
          </p>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

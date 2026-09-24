import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import { projects } from '../data/portfolioData.js'

export default function Experience() {
  return (
    <section id="experience" className="section-pad bg-ink-50/60 dark:bg-ink-900/40">
      <div className="container-content">
        <SectionHeading
          eyebrow="Experience"
          title="Project experience"
          description="I'm a fresher without formal work experience yet — this is the practical experience I've built through independent projects."
        />

        <div className="relative border-l border-ink-150 dark:border-ink-700 pl-8 space-y-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-amber-500 bg-ink-50 dark:bg-ink-950" />
              <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">{project.name}</h3>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{project.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300 max-w-2xl">
                {project.myWork}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-ink-150 dark:border-ink-700 px-2.5 py-1 text-xs font-medium text-ink-600 dark:text-ink-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

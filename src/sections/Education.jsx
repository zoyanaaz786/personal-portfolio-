import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { education } from '../data/portfolioData.js'

export default function Education() {
  return (
    <section id="education" className="section-pad bg-ink-50/60 dark:bg-ink-900/40">
      <div className="container-content">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="Replace the bracketed placeholders below with your real school names, years, and scores."
        />

        <div className="relative border-l border-ink-150 dark:border-ink-700 pl-8 space-y-6 max-w-2xl">
          {education.timeline.map((item, i) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
              className="card-surface relative p-6"
            >
              <span className="absolute -left-[2.65rem] top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-amber-500 bg-ink-50 dark:bg-ink-950">
                <GraduationCap size={12} className="text-amber-600 dark:text-amber-400" strokeWidth={2} />
              </span>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">{item.level}</h3>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{item.institution}</p>
                  <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                    {item.duration}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-500/12 px-3.5 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400">
                  {item.scoreLabel}: {item.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

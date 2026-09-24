import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import { personalData } from '../data/portfolioData.js'

export default function About() {
  const { about } = personalData

  return (
    <section id="about" className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow="About" title="A bit about how I work" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="text-base leading-relaxed text-ink-600 dark:text-ink-300">{about.intro}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {about.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-ink-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 px-3.5 py-1.5 text-sm text-ink-600 dark:text-ink-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {about.cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.05 }}
                className="card-surface p-5"
              >
                <p className="text-xs font-medium text-ink-400 dark:text-ink-500">{card.label}</p>
                <p className="mt-2 text-sm font-medium text-ink-900 dark:text-white leading-snug">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

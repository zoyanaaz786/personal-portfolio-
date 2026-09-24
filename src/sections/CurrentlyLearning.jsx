import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { currentlyLearning } from '../data/portfolioData.js'

export default function CurrentlyLearning() {
  return (
    <section className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Growth"
          title="Currently exploring"
          description="Not claiming expertise here — just what I'm actively learning right now."
        />
        <div className="flex flex-wrap gap-3">
          {currentlyLearning.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.03 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-amber-400/60 dark:border-amber-400/40 bg-amber-500/5 px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200"
            >
              <Sparkles size={13} className="text-amber-500" />
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Database,
  Wrench,
  Blocks
} from 'lucide-react'

const ICON_MAP = {
  Programming: Code2,
  Frontend: Layout,
  Backend: Server,
  'AI / ML': BrainCircuit,
  Database: Database,
  Tools: Wrench,
  Other: Blocks
}

export default function SkillCard({ category, skills, index }) {
  const Icon = ICON_MAP[category] ?? Code2

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.04 }}
      className="card-surface p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/12 text-amber-600 dark:text-amber-400">
          <Icon size={17} strokeWidth={1.8} />
        </span>
        <h3 className="font-display text-base font-semibold text-ink-950 dark:text-white">{category}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-ink-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 px-3 py-1 text-xs font-medium text-ink-600 dark:text-ink-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

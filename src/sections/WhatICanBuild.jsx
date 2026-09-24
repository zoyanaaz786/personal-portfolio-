import { motion } from 'framer-motion'
import { Code2, Globe, Terminal, BrainCircuit } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { whatICanBuild } from '../data/portfolioData.js'

const ICONS = [Code2, Globe, Terminal, BrainCircuit]

export default function WhatICanBuild() {
  return (
    <section className="section-pad bg-ink-50/60 dark:bg-ink-900/40">
      <div className="container-content">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I can build"
          description="A quick way to see which areas match the role you're hiring for."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whatICanBuild.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
                className="card-surface p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/12 text-amber-600 dark:text-amber-400">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

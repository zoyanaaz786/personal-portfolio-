import { motion } from 'framer-motion'
import { Award, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import ExternalLink from './ExternalLink.jsx'
import { trackEvent } from '../utils/analytics.js'

export default function CertificateCard({ certificate, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
      className="card-surface flex flex-col p-6"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/12 text-amber-600 dark:text-amber-400">
        <Award size={18} strokeWidth={1.8} />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-950 dark:text-white">{certificate.name}</h3>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        {certificate.issuer}
        {certificate.date ? ` · ${certificate.date}` : ''}
      </p>
      <ExternalLink
        href={certificate.url}
        fallbackLabel="Certificate not added yet"
        onClick={() => trackEvent('certificate_viewed', { certificate: certificate.name })}
        className="focus-ring mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-3.5 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 hover:border-amber-400 hover:text-amber-600"
        disabledClassName="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-ink-200 dark:border-ink-700 px-3.5 py-1.5 text-xs font-medium text-ink-400 dark:text-ink-600"
      >
        View Certificate <ExternalLinkIcon size={12} />
      </ExternalLink>
    </motion.div>
  )
}

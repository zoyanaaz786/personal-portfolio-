import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { isValidEmail } from '../utils/validators.js'

export default function CopyEmailButton({ email, className = '' }) {
  const [copied, setCopied] = useState(false)

  if (!isValidEmail(email)) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - fail silently,
      // the mailto: link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className={`focus-ring relative inline-flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-3.5 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 transition-colors hover:border-amber-400 hover:text-amber-600 ${className}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Email copied!' : 'Copy Email'}
    </button>
  )
}

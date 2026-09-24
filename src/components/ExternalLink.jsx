import { AlertCircle } from 'lucide-react'

/**
 * Returns true if `value` is a real, usable https:// URL rather than an
 * unfilled placeholder like "[YOUR GITHUB URL]", an empty string, "#",
 * "undefined", "null", or "javascript:void(0)".
 */
export function isValidExternalUrl(value) {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()

  if (!trimmed) return false
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false // "[YOUR ... URL]"
  if (/^(#|undefined|null)$/i.test(trimmed)) return false
  if (/^javascript:/i.test(trimmed)) return false

  try {
    const url = new URL(trimmed)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * A safe external link. If `href` is missing or still a placeholder, it
 * renders a disabled, clearly-labeled control instead of a broken link -
 * never a bare "#", never a silently dead button.
 *
 * Props:
 *  - href: the target URL (or a placeholder string)
 *  - children: label content
 *  - fallbackLabel: text shown when the link isn't configured yet
 *  - className / disabledClassName: styling for each state
 *  - as: optional wrapper Component override (defaults to <a>)
 */
export default function ExternalLink({
  href,
  children,
  fallbackLabel = 'Not configured yet',
  className = '',
  disabledClassName = '',
  ariaLabel,
  ...rest
}) {
  const valid = isValidExternalUrl(href)

  if (!valid) {
    return (
      <span
        role="note"
        aria-label={ariaLabel ? `${ariaLabel} - ${fallbackLabel}` : fallbackLabel}
        title={fallbackLabel}
        className={`cursor-not-allowed opacity-50 ${disabledClassName || className}`}
        {...rest}
      >
        {children ?? (
          <span className="inline-flex items-center gap-1.5">
            <AlertCircle size={13} /> {fallbackLabel}
          </span>
        )}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}


/** True if `value` looks like a real, filled-in email address (not a placeholder). */
export function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

/** True if `value` looks like a real, filled-in phone number (not a placeholder). */
export function isValidPhone(value) {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false
  return /^[+()\-\s\d]{7,}$/.test(trimmed)
}

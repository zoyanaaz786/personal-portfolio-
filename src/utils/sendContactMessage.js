/**
 * Sends the contact form. No email service is connected by default, so this
 * intentionally rejects rather than pretending to succeed - the UI shows an
 * honest "not connected yet" message instead of a fake success state.
 *
 * To make the form actually send messages, replace the body below with one
 * of these (both are drop-in - just fill in your own IDs/keys):
 *
 * --- EmailJS -----------------------------------------------------------
 *   mport emailjs from '@emailjs/browser'

export async function sendContactMessage(form) {
  const result = await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: form.Name,
      from_email: form.Email,
      subject: form.Subject,
      message: form.Message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )

  return result
}
 *
 * --- Formspree -----------------------------------------------------------
 *   export async function sendContactMessage(form) {
 *     const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *       body: JSON.stringify(form)
 *     })
 *     if (!res.ok) throw new Error('Formspree request failed')
 *   }
 * -------------------------------------------------------------------------
 *
 * Keep any real API key/public key in an environment variable (e.g.
 * import.meta.env.VITE_EMAILJS_PUBLIC_KEY) - never commit it directly.
 */
export async function sendContactMessage(_form) {
  throw new Error('NOT_CONFIGURED')
}

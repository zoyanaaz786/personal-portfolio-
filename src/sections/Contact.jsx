import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import ExternalLink from '../components/ExternalLink.jsx'
import CopyEmailButton from '../components/CopyEmailButton.jsx'
import { contactInfo, personalData } from '../data/portfolioData.js'
import { isValidEmail, isValidPhone } from '../utils/validators.js'
import { sendContactMessage } from '../utils/sendContactMessage.js'
import { trackEvent } from '../utils/analytics.js'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }
const MESSAGE_MAX = 1000

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  else if (form.name.trim().length > 100) errors.name = 'Name is too long.'

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  else if (form.subject.trim().length > 150) errors.subject = 'Subject is too long.'

  if (!form.message.trim()) {
    errors.message = 'Message is required.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  } else if (form.message.trim().length > MESSAGE_MAX) {
    errors.message = `Message must be under ${MESSAGE_MAX} characters.`
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | not_configured

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('sending')
    try {
      await sendContactMessage(form)
      setStatus('success')
      trackEvent('contact_submitted', { subject: form.subject })
      setForm(INITIAL_FORM)
    } catch (err) {
      // Never expose the raw error - show a clear, honest message instead.
      if (err instanceof Error && err.message === 'NOT_CONFIGURED') {
        setStatus('not_configured')
      } else {
        setStatus('error')
      }
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contact" className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="I'm open to internship and entry-level opportunities in software development, web development, Python, backend development, and AI/ML."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-4"
          >
            {isValidEmail(contactInfo.email) ? (
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="focus-ring flex flex-1 items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-400"
                >
                  <Mail size={16} className="text-amber-500" /> {contactInfo.email}
                </a>
                <CopyEmailButton email={contactInfo.email} />
              </div>
            ) : (
              <p className="flex items-center gap-3 rounded-xl border border-dashed border-ink-200 dark:border-ink-700 p-4 text-sm text-ink-400 dark:text-ink-600">
                <Mail size={16} /> Add your email in portfolioData.js
              </p>
            )}

            {isValidPhone(contactInfo.phone) ? (
              <a
                href={`tel:${contactInfo.phone}`}
                className="focus-ring flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-400"
              >
                <Phone size={16} className="text-amber-500" /> {contactInfo.phone}
              </a>
            ) : (
              <p className="flex items-center gap-3 rounded-xl border border-dashed border-ink-200 dark:border-ink-700 p-4 text-sm text-ink-400 dark:text-ink-600">
                <Phone size={16} /> Add your phone number in portfolioData.js
              </p>
            )}

            <ExternalLink
              href={contactInfo.github}
              fallbackLabel="Add GitHub URL in portfolioData.js"
              onClick={() => trackEvent('github_clicked', { location: 'contact' })}
              className="focus-ring flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-400"
              disabledClassName="flex items-center gap-3 rounded-xl border border-dashed border-ink-200 dark:border-ink-700 p-4 text-sm text-ink-400 dark:text-ink-600"
            >
              <Github size={16} className="text-amber-500" /> {contactInfo.github}
            </ExternalLink>

            <ExternalLink
              href={contactInfo.linkedin}
              fallbackLabel="Add LinkedIn URL in portfolioData.js"
              onClick={() => trackEvent('linkedin_clicked', { location: 'contact' })}
              className="focus-ring flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 text-sm text-ink-600 dark:text-ink-300 hover:border-amber-400"
              disabledClassName="flex items-center gap-3 rounded-xl border border-dashed border-ink-200 dark:border-ink-700 p-4 text-sm text-ink-400 dark:text-ink-600"
            >
              <Linkedin size={16} className="text-amber-500" /> {contactInfo.linkedin}
            </ExternalLink>

            <p className="pt-2 text-xs text-ink-400 dark:text-ink-500">{personalData.location}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={sending}
            className="card-surface p-6 sm:p-8 space-y-5"
          >
            {status === 'success' && (
              <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400" role="status">
                <CheckCircle2 size={16} />
                Message sent successfully.
              </div>
            )}
            {status === 'not_configured' && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400" role="status">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                This form isn't connected to an email service yet, so your message wasn't actually sent. Reach out
                directly using the email or phone details, or connect EmailJS / Formspree in sendContactMessage.js.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400" role="alert">
                <AlertTriangle size={16} />
                Unable to send your message. Please try again or contact me directly.
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                disabled={sending}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="focus-ring w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent px-3.5 py-2.5 text-sm text-ink-900 dark:text-white placeholder:text-ink-400 disabled:opacity-60"
                placeholder="Your full name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={sending}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="focus-ring w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent px-3.5 py-2.5 text-sm text-ink-900 dark:text-white placeholder:text-ink-400 disabled:opacity-60"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                disabled={sending}
                maxLength={150}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="focus-ring w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent px-3.5 py-2.5 text-sm text-ink-900 dark:text-white placeholder:text-ink-400 disabled:opacity-60"
                placeholder="Internship opportunity"
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-xs text-red-500">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="message" className="block text-sm font-medium text-ink-700 dark:text-ink-200">
                  Message
                </label>
                <span className="text-xs text-ink-400 dark:text-ink-500">
                  {form.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                disabled={sending}
                maxLength={MESSAGE_MAX}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="focus-ring w-full resize-none rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent px-3.5 py-2.5 text-sm text-ink-900 dark:text-white placeholder:text-ink-400 disabled:opacity-60"
                placeholder="Tell me a bit about the role..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-5 py-2.5 text-sm font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {sending ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

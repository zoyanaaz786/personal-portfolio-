/**
 * Lightweight, provider-agnostic event tracking.
 *
 * No analytics service is connected by default - trackEvent() only logs to
 * the console in development so you can see events firing. To wire up a
 * real provider (Plausible, GA4, PostHog, etc.), replace the body of
 * trackEvent with a call to that provider's SDK. Every call site in this
 * project already passes a consistent event name + payload, so this is the
 * only file you need to touch.
 *
 * Suggested events already instrumented in this project:
 *   resume_viewed, resume_downloaded, project_opened, github_clicked,
 *   linkedin_clicked, certificate_viewed, contact_submitted
 */
export function trackEvent(name, payload = {}) {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', name, payload)
  }
  // Example real integration (uncomment and configure when ready):
  // window.plausible?.(name, { props: payload })
  // window.gtag?.('event', name, payload)
}

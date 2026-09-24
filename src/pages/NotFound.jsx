import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-semibold text-ink-950 dark:text-white">404</p>
      <h1 className="mt-3 text-xl font-semibold text-ink-900 dark:text-white">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-ink-950 dark:bg-amber-500 px-5 py-2.5 text-sm font-medium text-white dark:text-ink-950 transition-transform hover:-translate-y-0.5"
      >
        <Home size={15} /> Back to Home
      </Link>
    </div>
  )
}

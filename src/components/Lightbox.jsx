import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, images, onClose, onNavigate])

  if (!images || images.length === 0) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="focus-ring absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((index - 1 + images.length) % images.length)
              }}
              aria-label="Previous screenshot"
              className="focus-ring absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <motion.img
            key={images[index]}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[index]}
            alt={`Screenshot ${index + 1} of ${images.length}`}
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((index + 1) % images.length)
              }}
              aria-label="Next screenshot"
              className="focus-ring absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

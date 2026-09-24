import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillCard from '../components/SkillCard.jsx'
import { skillCategories } from '../data/portfolioData.js'

const CATEGORY_FILTERS = ['All', ...skillCategories.map((c) => c.category)]

export default function Skills() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skillCategories
      .filter((cat) => activeCategory === 'All' || cat.category === activeCategory)
      .map((cat) => ({
        ...cat,
        skills: q ? cat.skills.filter((s) => s.toLowerCase().includes(q)) : cat.skills
      }))
      .filter((cat) => cat.skills.length > 0)
  }, [query, activeCategory])

  return (
    <section id="skills" className="section-pad bg-ink-50/60 dark:bg-ink-900/40">
      <div className="container-content">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="Grouped by area rather than ranked by number — I'd rather show breadth honestly than invent a percentage."
        />

        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills..."
              aria-label="Search skills"
              className="focus-ring w-full rounded-full border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 py-2 pl-10 pr-4 text-sm text-ink-900 dark:text-white placeholder:text-ink-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-ink-950 dark:bg-amber-500 text-white dark:text-ink-950'
                    : 'border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((cat, i) => (
              <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-ink-500 dark:text-ink-400">
            No skills match "{query}".
          </p>
        )}
      </div>
    </section>
  )
}

import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { todayKey } from './streak'

interface CompletedSectionProps {
  habits: Habit[]
}

export function CompletedSection({ habits }: CompletedSectionProps) {
  const { t } = useLanguage()
  const today = todayKey()
  const completed = habits.filter((h) => h.completedDates.includes(today))
  const total = habits.length
  const pct = total === 0 ? 0 : Math.round((completed.length / total) * 100)

  if (total === 0) return null

  return (
    <section className="completed-section" aria-label={t('completedSection')}>
      <p className="completed-summary-inline">
        {t('statsDoneToday')}: {completed.length}/{total} ({pct}%)
      </p>
    </section>
  )
}

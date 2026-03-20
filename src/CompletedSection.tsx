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

  if (completed.length === 0) return null

  return (
    <section className="completed-section" aria-label={t('completedSection')}>
      <h2 className="completed-heading">{t('completedSection')}</h2>
      <ul className="completed-ul">
        {completed.map((habit) => (
          <li key={habit.id} className="completed-item">
            <span className="completed-name">{habit.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

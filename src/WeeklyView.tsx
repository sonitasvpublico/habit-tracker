import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { getWeeklyCount } from './streak'
import { AnimatedEmptyState } from './AnimatedEmptyState'

interface WeeklyViewProps {
  habits: Habit[]
}

export function WeeklyView({ habits }: WeeklyViewProps) {
  const { t } = useLanguage()

  if (habits.length === 0) {
    return (
      <AnimatedEmptyState
        animationPath="/empty-states/weekly.json"
        fallbackEmoji="📊"
        title={t('weeklyEmptyTitle')}
        line1={t('weeklyEmptyLine1')}
        line2={t('weeklyEmptyLine2')}
      />
    )
  }

  const sortedHabits = [...habits].sort((a, b) => {
    const aCount = getWeeklyCount(a.completedDates)
    const bCount = getWeeklyCount(b.completedDates)
    if (bCount !== aCount) return bCount - aCount
    return a.name.localeCompare(b.name)
  })

  return (
    <section className="habit-list view-panel">
      <h2 className="today-heading">{t('last7Days')}</h2>
      <ul className="habit-ul weekly-summary-ul">
        {sortedHabits.map((habit) => {
          const count = getWeeklyCount(habit.completedDates)
          const pct = Math.round((count / 7) * 100)
          return (
            <li key={habit.id} className="habit-item habit-item--readonly weekly-summary-item">
              <div className="habit-item-top">
                <span className="habit-name">{habit.name}</span>
                <span className="habit-streak" aria-hidden>
                  {count === 0 ? t('noCompletions') : t('weeklyCount', { n: count })}
                </span>
              </div>
              <div className="weekly-summary-progress" aria-hidden>
                <div className="weekly-summary-track">
                  <div className="weekly-summary-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="weekly-summary-pct">{pct}%</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

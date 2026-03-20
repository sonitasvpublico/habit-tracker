import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { getWeeklyCount } from './streak'
import { WeekRow } from './WeekRow'

interface WeeklyViewProps {
  habits: Habit[]
  onToggleDate?: (habitId: string, dateKey: string) => void
}

export function WeeklyView({ habits, onToggleDate }: WeeklyViewProps) {
  const { t } = useLanguage()

  if (habits.length === 0) {
    return <p className="empty-list">{t('emptyList')}</p>
  }

  return (
    <section className="habit-list view-panel">
      <h2 className="today-heading">{t('last7Days')}</h2>
      <ul className="habit-ul">
        {habits.map((habit) => {
          const count = getWeeklyCount(habit.completedDates)
          return (
            <li key={habit.id} className="habit-item habit-item--readonly">
              <div className="habit-item-top">
                <span className="habit-name">{habit.name}</span>
                <span className="habit-streak" aria-hidden>
                  {count === 0 ? t('noCompletions') : t('weeklyCount', { n: count })}
                </span>
              </div>
              {onToggleDate && (
                <WeekRow habit={habit} onToggleDate={onToggleDate} />
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

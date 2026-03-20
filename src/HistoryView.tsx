import type { Habit } from './types'
import { useLanguage } from './LanguageContext'

interface HistoryViewProps {
  habits: Habit[]
}

function formatDateKey(key: string): string {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function HistoryView({ habits }: HistoryViewProps) {
  const { t } = useLanguage()

  if (habits.length === 0) {
    return <p className="empty-list">{t('emptyList')}</p>
  }

  const hasAnyCompletions = habits.some((h) => h.completedDates.length > 0)

  return (
    <section className="habit-list view-panel history-view">
      <p className="history-intro">{t('historyIntro')}</p>
      {!hasAnyCompletions ? (
        <p className="empty-list">{t('historyEmpty')}</p>
      ) : (
        <ul className="history-ul">
          {habits.map((habit) => {
            const dates = [...habit.completedDates].sort().reverse()
            return (
              <li key={habit.id} className="history-habit">
                <h3 className="history-habit-name">{habit.name}</h3>
                {dates.length === 0 ? (
                  <p className="history-empty">{t('noCompletions')}</p>
                ) : (
                  <ul className="history-dates">
                    {dates.map((dateKey) => (
                      <li key={dateKey}>{formatDateKey(dateKey)}</li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

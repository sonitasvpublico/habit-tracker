import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { AnimatedEmptyState } from './AnimatedEmptyState'

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
    return (
      <AnimatedEmptyState
        animationPath="/empty-states/history.json"
        fallbackEmoji="🗂️"
        title={t('historyEmptyTitle')}
        line1={t('historyEmptyLine1')}
        line2={t('historyEmptyLine2')}
      />
    )
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
                <h3 className="history-habit-name">
                  <span className="history-habit-name-wrap">
                    <span className="history-habit-emoji" aria-hidden>👏</span>
                    <span>{habit.name}</span>
                  </span>
                </h3>
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

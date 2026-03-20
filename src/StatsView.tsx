import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { getStreak, getWeeklyCount } from './streak'

interface StatsViewProps {
  habits: Habit[]
}

export function StatsView({ habits }: StatsViewProps) {
  const { t } = useLanguage()

  if (habits.length === 0) {
    return (
      <section className="stats-view">
        <p className="empty-list">{t('emptyList')}</p>
      </section>
    )
  }

  const totalStreak = habits.reduce((sum, h) => sum + getStreak(h.completedDates), 0)
  const completedToday = habits.filter((h) => {
    const today = new Date().toISOString().slice(0, 10)
    return h.completedDates.includes(today)
  }).length
  const weekTotals = habits.map((h) => getWeeklyCount(h.completedDates))
  const bestWeek = Math.max(0, ...weekTotals)

  return (
    <section className="stats-view">
      <div className="stats-cards">
        <div className="stats-card">
          <span className="stats-card-value">{completedToday}</span>
          <span className="stats-card-label">{t('statsDoneToday')}</span>
        </div>
        <div className="stats-card">
          <span className="stats-card-value">{totalStreak}</span>
          <span className="stats-card-label">{t('statsTotalStreak')}</span>
        </div>
        <div className="stats-card">
          <span className="stats-card-value">{bestWeek}</span>
          <span className="stats-card-label">{t('statsBestWeek')}</span>
        </div>
      </div>
      <div className="stats-habits">
        <h3 className="stats-habits-heading">{t('statsPerHabit')}</h3>
        <ul className="stats-habits-ul">
          {habits.map((habit) => {
            const streak = getStreak(habit.completedDates)
            const weekCount = getWeeklyCount(habit.completedDates)
            return (
              <li key={habit.id} className="stats-habit-row">
                <span className="stats-habit-name">{habit.name}</span>
                <span className="stats-habit-meta">
                  {t('streakDays', { n: streak })}
                  {' · '}
                  {t('weeklyCount', { n: weekCount })}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { getStreak, getWeeklyCount, todayKey } from './streak'
import { AnimatedEmptyState } from './AnimatedEmptyState'

interface StatsViewProps {
  habits: Habit[]
}

function getMedal(rank: number): string | null {
  if (rank === 0) return '/levels-medals-3d/1-lugar.png'
  if (rank === 1) return '/levels-medals-3d/2-lugar.png'
  if (rank === 2) return '/levels-medals-3d/3-lugar.png'
  return null
}

export function StatsView({ habits }: StatsViewProps) {
  const { t } = useLanguage()

  if (habits.length === 0) {
    return (
      <section className="stats-view">
        <AnimatedEmptyState
          animationPath="/empty-states/data.json"
          fallbackEmoji="📈"
          title={t('statsEmptyTitle')}
          line1={t('statsEmptyLine1')}
          line2={t('statsEmptyLine2')}
        />
      </section>
    )
  }

  const today = todayKey()
  const completedToday = habits.filter((h) => {
    return h.completedDates.includes(today)
  }).length
  const weekTotals = habits.map((h) => getWeeklyCount(h.completedDates))
  const bestWeek = Math.max(0, ...weekTotals)
  const averageWeeklyCompletion = Math.round(
    (weekTotals.reduce((sum, n) => sum + n, 0) / (habits.length * 7)) * 100
  )
  const sortedHabits = [...habits].sort((a, b) => {
    const aWeek = getWeeklyCount(a.completedDates)
    const bWeek = getWeeklyCount(b.completedDates)
    if (bWeek !== aWeek) return bWeek - aWeek
    return a.name.localeCompare(b.name)
  })

  return (
    <section className="stats-view">
      <div className="stats-cards">
        <div className="stats-card">
          <span className="stats-card-value">{completedToday}</span>
          <span className="stats-card-label">{t('statsDoneToday')}</span>
        </div>
        <div className="stats-card">
          <span className="stats-card-value">{averageWeeklyCompletion}%</span>
          <span className="stats-card-label">{t('statsWeeklyAvg')}</span>
        </div>
        <div className="stats-card">
          <span className="stats-card-value">{bestWeek}</span>
          <span className="stats-card-label">{t('statsBestWeek')}</span>
        </div>
      </div>
      <details className="stats-info">
        <summary className="stats-info-summary">{t('statsInfoButton')}</summary>
        <div className="stats-info-panel" role="note">
          <p><strong>{t('statsDoneToday')}:</strong> {t('statsDoneTodayHint')}</p>
          <p><strong>{t('statsWeeklyAvg')}:</strong> {t('statsHowCalcHint')}</p>
          <p><strong>{t('statsBestWeek')}:</strong> {t('statsBestWeekHint')}</p>
          <p><strong>Medals:</strong> {t('statsMedalsHint')}</p>
          <p><strong>History:</strong> {t('statsHistoryLevelsHint')}</p>
          <p><strong>Profile level:</strong> {t('statsProfileLevelHint')}</p>
        </div>
      </details>
      <div className="stats-habits">
        <h3 className="stats-habits-heading">{t('statsPerHabit')}</h3>
        <ul className="stats-habits-ul">
          {sortedHabits.map((habit, index) => {
            const streak = getStreak(habit.completedDates)
            const weekCount = getWeeklyCount(habit.completedDates)
            const weekPct = Math.round((weekCount / 7) * 100)
            const medal = getMedal(index)
            return (
              <li key={habit.id} className="stats-habit-row">
                <span className="stats-habit-name-wrap">
                  {medal && (
                    <img
                      className="stats-habit-medal"
                      src={medal}
                      alt=""
                      aria-hidden
                    />
                  )}
                  <span className="stats-habit-name">{habit.name}</span>
                </span>
                <span className="stats-habit-meta">
                  {t('weeklyCount', { n: weekCount })} ({weekPct}%)
                  {' · '}
                  {t('streakDays', { n: streak })}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

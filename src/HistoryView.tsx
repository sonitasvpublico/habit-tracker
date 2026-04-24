import type { Habit } from './types'
import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { AnimatedEmptyState } from './AnimatedEmptyState'
import { getStreak, getWeeklyCount } from './streak'

interface HistoryViewProps {
  habits: Habit[]
}

type HistoryBadge = {
  emoji: string
  text: string
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

function getLastNDaysKeys(n: number): string[] {
  const out: string[] = []
  const d = new Date()
  for (let i = 0; i < n; i++) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    out.push(`${y}-${m}-${day}`)
    d.setDate(d.getDate() - 1)
  }
  return out.reverse()
}

function getHistoryBadge(streak: number, weekCount: number, t: ReturnType<typeof useLanguage>['t']): HistoryBadge {
  if (weekCount >= 7) return { emoji: '🚀', text: t('historyBadgePerfectWeek') }
  if (streak >= 5) return { emoji: '🔥', text: t('historyBadgeOnFire') }
  if (weekCount >= 3) return { emoji: '🌟', text: t('historyBadgeMomentum') }
  return { emoji: '🌱', text: t('historyBadgeStarting') }
}

export function HistoryView({ habits }: HistoryViewProps) {
  const { t } = useLanguage()
  const [expandedHabits, setExpandedHabits] = useState<Record<string, boolean>>({})
  const [showAllDates, setShowAllDates] = useState<Record<string, boolean>>({})

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
  const sortedHabits = [...habits].sort((a, b) => {
    const aLatest = a.completedDates.length ? [...a.completedDates].sort().reverse()[0] : ''
    const bLatest = b.completedDates.length ? [...b.completedDates].sort().reverse()[0] : ''
    if (aLatest !== bLatest) return bLatest.localeCompare(aLatest)
    return a.name.localeCompare(b.name)
  })

  function toggleExpanded(habitId: string) {
    setExpandedHabits((prev) => ({ ...prev, [habitId]: !prev[habitId] }))
  }

  function toggleShowAllDates(habitId: string) {
    setShowAllDates((prev) => ({ ...prev, [habitId]: !prev[habitId] }))
  }

  return (
    <section className="habit-list view-panel history-view">
      <p className="history-intro">{t('historyIntro')}</p>
      {!hasAnyCompletions ? (
        <p className="empty-list">{t('historyEmpty')}</p>
      ) : (
        <ul className="history-ul">
          {sortedHabits.map((habit) => {
            const dates = [...habit.completedDates].sort().reverse()
            const streak = getStreak(dates)
            const weekCount = getWeeklyCount(dates)
            const badge = getHistoryBadge(streak, weekCount, t)
            const recentKeys = getLastNDaysKeys(14)
            const doneSet = new Set(dates)
            const isExpanded = Boolean(expandedHabits[habit.id])
            const shouldShowAll = Boolean(showAllDates[habit.id])
            const visibleDates = shouldShowAll ? dates : dates.slice(0, 6)
            const hiddenDatesCount = Math.max(0, dates.length - visibleDates.length)
            return (
              <li key={habit.id} className="history-habit">
                <button
                  type="button"
                  className="history-habit-toggle"
                  onClick={() => toggleExpanded(habit.id)}
                  aria-expanded={isExpanded}
                >
                  <h3 className="history-habit-name">
                    <span className="history-habit-name-wrap">
                      <span className="history-habit-emoji" aria-hidden>👏</span>
                      <span>{habit.name}</span>
                    </span>
                  </h3>
                  <span className="history-habit-summary">
                    {dates.length === 0 ? t('noCompletions') : `${dates.length} ${t('historyCompletionsLabel')}`}
                  </span>
                </button>
                {isExpanded && (
                  dates.length === 0 ? (
                    <p className="history-empty">{t('noCompletions')}</p>
                  ) : (
                    <>
                      <div className="history-badge-row">
                        <span className="history-badge-pill" aria-label={badge.text}>
                          <span aria-hidden>{badge.emoji}</span>
                          <span>{badge.text}</span>
                        </span>
                      </div>
                      <div className="history-heatmap-header">
                        <span className="history-heatmap-title">{t('historyHeatmapTitle')}</span>
                        <span className="history-heatmap-legend">
                          <span className="history-legend-item">
                            <span className="history-legend-dot is-done" aria-hidden />
                            {t('historyHeatmapDone')}
                          </span>
                          <span className="history-legend-item">
                            <span className="history-legend-dot is-missed" aria-hidden />
                            {t('historyHeatmapMissed')}
                          </span>
                        </span>
                      </div>
                      <div className="history-heatmap" role="img" aria-label={t('historyHeatmapAria')}>
                        {recentKeys.map((key) => {
                          const isDone = doneSet.has(key)
                          return (
                            <span
                              key={key}
                              className={`history-heatmap-cell ${isDone ? 'is-done' : ''}`}
                              title={formatDateKey(key)}
                            />
                          )
                        })}
                      </div>
                      <div className="history-heatmap-scale">
                        <span>{t('historyHeatmapStart')}</span>
                        <span>{t('historyHeatmapEnd')}</span>
                      </div>
                      <ul className="history-dates">
                        {visibleDates.map((dateKey) => (
                          <li key={dateKey}>{formatDateKey(dateKey)}</li>
                        ))}
                      </ul>
                      {hiddenDatesCount > 0 && (
                        <button
                          type="button"
                          className="history-more-btn"
                          onClick={() => toggleShowAllDates(habit.id)}
                        >
                          {shouldShowAll ? t('close') : t('historyMore', { n: hiddenDatesCount })}
                        </button>
                      )}
                    </>
                  )
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

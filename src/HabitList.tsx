import { useState, useRef } from 'react'
import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { todayKey, yesterdayKey, getWeeklyCount } from './streak'
import { WeekRow } from './WeekRow'

interface HabitListProps {
  habits: Habit[]
  onDelete: (id: string) => void
  onAddPastDate?: (id: string, dateKey: string) => void
  onToggleDate?: (id: string, dateKey: string) => void
}

function formatTodayLabel(): string {
  const d = new Date()
  const formatted = d.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return formatted.replace(/,\s(\d{4})$/, ' $1')
}

const SWIPE_THRESHOLD = 80

function HabitList({ habits, onDelete, onAddPastDate, onToggleDate }: HabitListProps) {
  const { t } = useLanguage()
  const today = todayKey()
  const yesterday = yesterdayKey()
  const [swipingId, setSwipingId] = useState<string | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const touchStartX = useRef(0)

  if (habits.length === 0) {
    return <p className="empty-list">{t('emptyList')}</p>
  }

  function handleTouchStart(e: React.TouchEvent, id: string) {
    touchStartX.current = e.touches[0].clientX
    setSwipingId(id)
    setSwipeOffset(0)
  }

  function handleTouchMove(e: React.TouchEvent, id: string) {
    if (swipingId !== id) return
    const dx = touchStartX.current - e.touches[0].clientX
    setSwipeOffset(Math.max(0, Math.min(dx, 120)))
  }

  function handleTouchEnd(id: string) {
    if (swipingId !== id) return
    setSwipingId(null)
    if (swipeOffset >= SWIPE_THRESHOLD) {
      const habit = habits.find((h) => h.id === id)
      if (habit && window.confirm(t('deleteConfirm', { name: habit.name }))) {
        onDelete(id)
      }
    }
    setSwipeOffset(0)
  }

  return (
    <section className="habit-list">
      <h2 className="today-heading">
        {t('today')} <span className="today-date">{formatTodayLabel()}</span>
      </h2>
      <ul className="habit-ul">
        {habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today)
          const doneYesterday = habit.completedDates.includes(yesterday)
          const weeklyCount = getWeeklyCount(habit.completedDates)
          const showAddYesterday = onAddPastDate && !doneToday && !doneYesterday
          const isSwiping = swipingId === habit.id
          return (
            <li
              key={habit.id}
              className="habit-item"
              style={isSwiping ? { transform: `translateX(-${swipeOffset}px)` } : undefined}
              onTouchStart={(e) => handleTouchStart(e, habit.id)}
              onTouchMove={(e) => handleTouchMove(e, habit.id)}
              onTouchEnd={() => handleTouchEnd(habit.id)}
            >
              <div className="habit-item-top">
                <div className="habit-row">
                  <span className="habit-name">{habit.name}</span>
                  {weeklyCount > 0 && (
                    <span className="habit-streak" aria-hidden>
                      {t('weeklyCount', { n: weeklyCount })}
                    </span>
                  )}
                </div>
                <div className="habit-actions">
                {showAddYesterday && (
                  <button
                    type="button"
                    className="add-yesterday-btn"
                    onClick={() => onAddPastDate!(habit.id, yesterday)}
                    aria-label={t('addYesterdayAria', { name: habit.name })}
                  >
                    {t('addYesterday')}
                  </button>
                )}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(habit.id)}
                  aria-label={t('deleteAria', { name: habit.name })}
                >
                  {t('deleteButton')}
                </button>
              </div>
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

export default HabitList
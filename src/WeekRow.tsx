import type { Habit } from './types'
import { useLanguage } from './LanguageContext'
import { getCurrentWeekDateKeys, getDayShortLabel, todayKey } from './streak'

interface WeekRowProps {
  habit: Habit
  onToggleDate: (habitId: string, dateKey: string) => void
}

export function WeekRow({ habit, onToggleDate }: WeekRowProps) {
  const { t, language } = useLanguage()
  const weekKeys = getCurrentWeekDateKeys()
  const today = todayKey()

  return (
    <div className="week-row" role="group" aria-label={t('doneToday')}>
      <div className="week-row-days">
        {weekKeys.map((dateKey) => {
          const done = habit.completedDates.includes(dateKey)
          const isToday = dateKey === today
          const isFuture = dateKey > today
          const label = getDayShortLabel(dateKey, language)
          return (
            <button
              key={dateKey}
              type="button"
              className={`week-day ${done ? 'week-day--done' : ''} ${isToday ? 'week-day--today' : ''} ${isFuture ? 'week-day--future' : ''}`}
              onClick={() => !isFuture && onToggleDate(habit.id, dateKey)}
              aria-label={`${label}${done ? ', completed' : ''}${isToday ? ', today' : ''}${isFuture ? ', future day (locked)' : ''}`}
              aria-pressed={done}
              disabled={isFuture}
            >
              <span className="week-day-label">{label}</span>
              <span className="week-day-circle">
                {done ? '✓' : ''}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

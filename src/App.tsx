import { useState, useEffect, useRef } from 'react'
import type { Habit } from './types'
import AddHabitForm from './AddHabitForm'
import HabitList from './HabitList'
import { CompletedSection } from './CompletedSection.tsx'
import { WeeklyView } from './WeeklyView.tsx'
import { HistoryView } from './HistoryView.tsx'
import { StatsView } from './StatsView'
import { MoreView } from './MoreView'
import { useLanguage } from './LanguageContext'
import { loadHabits, saveHabits } from './storage'
import { todayKey } from './streak'
import './App.css'

type View = 'today' | 'weekly' | 'history' | 'stats' | 'more'

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())
  const [view, setView] = useState<View>('today')
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [jellyPressed, setJellyPressed] = useState(false)
  const addInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  useEffect(() => {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  }, [])

  useEffect(() => {
    if (addFormOpen && addInputRef.current) {
      addInputRef.current.focus()
    }
  }, [addFormOpen])

  useEffect(() => {
    if (!addFormOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setAddFormOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [addFormOpen])

  function handleAdd(habit: Habit) {
    setHabits((prev) => [...prev, habit])
    setAddFormOpen(false)
  }

  function handleDelete(id: string) {
    const habit = habits.find((h) => h.id === id)
    if (!habit) return
    if (window.confirm(t('deleteConfirm', { name: habit.name }))) {
      setHabits((prev) => prev.filter((h) => h.id !== id))
    }
  }

  function handleAddPastDate(id: string, dateKey: string) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id !== id
          ? h
          : {
              ...h,
              completedDates: h.completedDates.includes(dateKey)
                ? h.completedDates
                : [...h.completedDates, dateKey].sort().reverse(),
            }
      )
    )
  }

  function handleToggleDate(id: string, dateKey: string) {
    if (dateKey > todayKey()) return
    setHabits((prev) =>
      prev.map((h) =>
        h.id !== id
          ? h
          : {
              ...h,
              completedDates: h.completedDates.includes(dateKey)
                ? h.completedDates.filter((d) => d !== dateKey)
                : [...h.completedDates, dateKey].sort().reverse(),
            }
      )
    )
  }

  return (
    <main>
      <header className="app-header">
        <button
          type="button"
          className="app-header-logo"
          onClick={() => setView('today')}
          aria-label={t('home')}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="10" r="6" fill="currentColor" opacity="0.9" />
            <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M4 18l4-4 6 6 8-8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
          </svg>
        </button>
        {(view === 'more' || view === 'stats') ? (
          <span className="app-header-title app-header-title--current">
            {view === 'more' ? t('settings') : t('tabStats')}
          </span>
        ) : (
          <button
            type="button"
            className="app-header-title"
            onClick={() => setView('today')}
          >
            {t('home')}
          </button>
        )}
        {view === 'more' ? (
          <span className="app-header-spacer" aria-hidden />
        ) : (
          <button
            type="button"
            className="app-header-menu"
            onClick={() => setView('more')}
            aria-label={t('settings')}
          >
            <span className="app-header-menu-dots" aria-hidden>⋮</span>
          </button>
        )}
      </header>
      {(view === 'today' || view === 'weekly' || view === 'history') && (
        <nav className="view-tabs" role="tablist" aria-label="View">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'today'}
            className={view === 'today' ? 'active' : ''}
            onClick={() => setView('today')}
          >
            {t('tabToday')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'weekly'}
            className={view === 'weekly' ? 'active' : ''}
            onClick={() => setView('weekly')}
          >
            {t('tabWeekly')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'history'}
            className={view === 'history' ? 'active' : ''}
            onClick={() => setView('history')}
          >
            {t('tabHistory')}
          </button>
        </nav>
      )}
      {view === 'today' && (
        <>
          <HabitList
            habits={habits}
            onDelete={handleDelete}
            onAddPastDate={handleAddPastDate}
            onToggleDate={handleToggleDate}
          />
          <CompletedSection habits={habits} />
        </>
      )}
      {view === 'weekly' && (
        <WeeklyView habits={habits} onToggleDate={handleToggleDate} />
      )}
      {view === 'history' && <HistoryView habits={habits} />}
      {view === 'stats' && <StatsView habits={habits} />}
      {view === 'more' && <MoreView />}
      {addFormOpen && (
        <div
          className="add-modal-backdrop"
          onClick={() => setAddFormOpen(false)}
          role="presentation"
        >
          <div
            className="add-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t('habitPlaceholder')}
          >
            <AddHabitForm onAdd={handleAdd} inputRef={addInputRef} />
            <button
              type="button"
              className="add-modal-close"
              onClick={() => setAddFormOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <nav className="tabbar" role="tablist" aria-label="Main">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'today' || view === 'weekly' || view === 'history'}
          className={`tabbar-item ${view !== 'stats' && view !== 'more' ? 'active' : ''}`}
          onClick={() => setView('today')}
          aria-label={t('home')}
        >
          <svg className="tabbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L4 9v12h5v-7h6v7h5V9L12 3z" />
          </svg>
          <span className="tabbar-label">{t('home')}</span>
        </button>
        <div className="tabbar-center">
          <button
            type="button"
            className={`tabbar-jelly ${addFormOpen ? 'tabbar-jelly--active' : ''} ${jellyPressed ? 'tabbar-jelly--pressed' : ''}`}
            onClick={() => setAddFormOpen((prev) => !prev)}
            onPointerDown={() => setJellyPressed(true)}
            onPointerUp={() => setJellyPressed(false)}
            onPointerLeave={() => setJellyPressed(false)}
            onPointerCancel={() => setJellyPressed(false)}
            aria-label={addFormOpen ? t('close') : t('addButton')}
          >
            <span className="tabbar-jelly-icon" aria-hidden>
              {addFormOpen ? (
                <svg className="tabbar-jelly-glyph tabbar-jelly-glyph--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg className="tabbar-jelly-glyph tabbar-jelly-glyph--plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round">
                  <line x1="12" y1="4.5" x2="12" y2="19.5" />
                  <line x1="4.5" y1="12" x2="19.5" y2="12" />
                </svg>
              )}
            </span>
          </button>
        </div>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'stats'}
          className={`tabbar-item ${view === 'stats' ? 'active' : ''}`}
          onClick={() => setView('stats')}
          aria-label={t('tabStats')}
        >
          <svg className="tabbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
          <span className="tabbar-label">{t('tabStats')}</span>
        </button>
      </nav>
    </main>
  )
}

export default App
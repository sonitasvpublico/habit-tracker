import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageContext'

interface MoreViewProps {
  totalHabits: number
}

const LEVEL_THRESHOLDS = [3, 6, 10, 15] as const

function getLevelFromHabitCount(totalHabits: number): number {
  if (totalHabits >= 15) return 5
  if (totalHabits >= 10) return 4
  if (totalHabits >= 6) return 3
  if (totalHabits >= 3) return 2
  return 1
}

function getLevelName(level: number, t: ReturnType<typeof useLanguage>['t']): string {
  switch (level) {
    case 5:
      return t('levelNameOrbitMaster')
    case 4:
      return t('levelNameConsistentPro')
    case 3:
      return t('levelNameSteadyBuilder')
    case 2:
      return t('levelNameRisingStarter')
    default:
      return t('levelNameNewExplorer')
  }
}

function getLevelEmoji(level: number): string {
  switch (level) {
    case 5:
      return '👑'
    case 4:
      return '🌟'
    case 3:
      return '🔥'
    case 2:
      return '🚀'
    default:
      return '🌱'
  }
}

function getLevelIconPath(level: number): string {
  switch (level) {
    case 5:
      return '/levels-medals-3d/crown_3d.png'
    case 4:
      return '/levels-medals-3d/glowing_star_3d.png'
    case 3:
      return '/levels-medals-3d/fire_3d.png'
    case 2:
      return '/levels-medals-3d/rocket_3d.png'
    default:
      return '/levels-medals-3d/seedling_3d.png'
  }
}

function getNextLevelRequirement(totalHabits: number): number | null {
  for (const threshold of LEVEL_THRESHOLDS) {
    if (totalHabits < threshold) return threshold
  }
  return null
}

export function MoreView({ totalHabits }: MoreViewProps) {
  const { t, language, setLanguage } = useLanguage()
  const level = getLevelFromHabitCount(totalHabits)
  const levelName = getLevelName(level, t)
  const levelEmoji = getLevelEmoji(level)
  const levelIconPath = getLevelIconPath(level)
  const nextLevelRequirement = getNextLevelRequirement(totalHabits)
  const habitsToNextLevel = nextLevelRequirement === null ? 0 : nextLevelRequirement - totalHabits
  const nextLevelName =
    nextLevelRequirement === null ? '' : getLevelName(getLevelFromHabitCount(nextLevelRequirement), t)
  const [showLevelUp, setShowLevelUp] = useState(false)

  useEffect(() => {
    const storageKey = 'habit-tracker-last-level'
    let previousLevel = 1
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = Number(stored)
        if (Number.isFinite(parsed) && parsed >= 1) previousLevel = parsed
      }
    } catch {
      // ignore storage errors
    }

    if (level > previousLevel) {
      setShowLevelUp(true)
      void import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 70,
          spread: 70,
          startVelocity: 32,
          origin: { y: 0.32 },
        })
      }).catch(() => {
        // Keep emoji celebration if confetti import fails.
      })
      const timer = window.setTimeout(() => setShowLevelUp(false), 2100)
      try {
        localStorage.setItem(storageKey, String(level))
      } catch {
        // ignore storage errors
      }
      return () => window.clearTimeout(timer)
    }

    try {
      localStorage.setItem(storageKey, String(level))
    } catch {
      // ignore storage errors
    }
  }, [level])

  return (
    <section className="more-view">
      <header className="settings-header">
        <p className="settings-header-kicker">{t('levelSectionTitle')}</p>
        <h2 className="settings-header-title settings-header-title--level">
          <img className="settings-header-level-icon" src={levelIconPath} alt="" aria-hidden />
          {t('levelLabel')} {level} - {levelName}
        </h2>
        <p className="settings-header-level-rule">
          {nextLevelRequirement === null
            ? t('levelRuleMax')
            : t('levelRuleNext', { n: habitsToNextLevel, name: nextLevelName })}
        </p>
        {showLevelUp && (
          <p className="settings-levelup-burst" aria-live="polite">
            🎉 {t('levelUpText')} 🎉
          </p>
        )}
      </header>
      <div className="more-block">
        <h3 className="more-label">{t('moreLanguage')}</h3>
        <div className="language-switcher more-switcher">
          <button
            type="button"
            className={language === 'en' ? 'active' : ''}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            className={language === 'es' ? 'active' : ''}
            onClick={() => setLanguage('es')}
            aria-pressed={language === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            className={language === 'fi' ? 'active' : ''}
            onClick={() => setLanguage('fi')}
            aria-pressed={language === 'fi'}
          >
            FI
          </button>
        </div>
      </div>
      <div className="more-brand-card" aria-label={t('settings')}>
        <img
          className="more-brand-logo"
          src="/logos/orbital-original-1024.png"
          alt="Habit Orbit logo"
        />
        <p className="more-brand-name">Habit Orbit</p>
        <p className="more-brand-level">
          <span className="more-brand-level-emoji" aria-hidden>{levelEmoji}</span>
          <span>{t('levelLabel')}: {level} - {levelName}</span>
        </p>
        <p className="more-brand-meta">
          {t('versionLabel')}: 1.0
        </p>
        <p className="more-brand-meta">
          {t('developerLabel')}: SonitaSV
        </p>
      </div>
    </section>
  )
}

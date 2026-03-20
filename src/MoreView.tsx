import { useLanguage } from './LanguageContext'

export function MoreView() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <section className="more-view">
      <header className="settings-header">
        <h2 className="settings-header-title">{t('settings')}</h2>
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
    </section>
  )
}

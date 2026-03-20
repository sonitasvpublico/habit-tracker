import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  getTranslation,
  type Language,
} from './translations'

type TranslateFn = (
  key: keyof typeof import('./translations').translations.en,
  replace?: { name?: string; n?: number }
) => string

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslateFn
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const LANGUAGE_STORAGE_KEY = 'habit-tracker-language'

function loadLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored === 'en' || stored === 'es' || stored === 'fi') {
      return stored
    }
  } catch {
    // ignore
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => loadLanguage())
  const t: TranslateFn = useCallback(
    (key, replace) => getTranslation(language, key, replace),
    [language]
  )

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return value
}

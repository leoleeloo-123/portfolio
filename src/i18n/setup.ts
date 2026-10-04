import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

export type Locale = 'en' | 'zh'
export const languageFor = (locale: Locale) => locale === 'zh' ? 'zh-CN' : 'en'
export const localeFromPath = (): Locale | null => {
  const segment = window.location.pathname.split('/')[1]
  return segment === 'en' || segment === 'zh' ? segment : null
}

function initialLocale(): Locale {
  const pathLocale = localeFromPath()
  if (pathLocale) return pathLocale
  try {
    const saved = localStorage.getItem('leo-portfolio-locale')
    if (saved === 'en' || saved === 'zh') return saved
  } catch { /* Preferences are optional when storage is unavailable. */ }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export const startingLocale = initialLocale()
if (!localeFromPath()) {
  history.replaceState(null, '', `/${startingLocale}/${location.search}${location.hash}`)
}

void i18n.use(initReactI18next).init({
  resources,
  lng: languageFor(startingLocale),
  fallbackLng: 'en',
  supportedLngs: ['en', 'zh-CN'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n

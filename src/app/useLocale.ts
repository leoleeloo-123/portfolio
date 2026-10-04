import { useCallback, useEffect, useState } from 'react'
import i18n, { languageFor, localeFromPath, startingLocale } from '../i18n/setup'
import type { Locale } from '../i18n/setup'

interface ReadingPosition { id: string; fraction: number }
const readingIds = ['intro', 'work', 'tax-engine', 'deloitte', 'navi-crm', 'about']

function readingOffset() {
  const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 86
  return headerBottom + 28
}

function capturePosition(): ReadingPosition {
  const offset = readingOffset()
  const elements = readingIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
  const element = [...elements].reverse().find(el => el.getBoundingClientRect().top <= offset) ?? elements[0]
  if (!element) return { id: 'intro', fraction: 0 }
  return { id: element.id, fraction: Math.max(0, Math.min(1, (offset - element.getBoundingClientRect().top) / element.offsetHeight)) }
}

function restorePosition(position: ReadingPosition) {
  const element = document.getElementById(position.id)
  if (!element) return
  const target = scrollY + element.getBoundingClientRect().top + element.offsetHeight * position.fraction - readingOffset()
  window.scrollTo({ top: Math.max(0, target), behavior: 'instant' })
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(startingLocale)

  const applyLocale = useCallback((next: Locale, position: ReadingPosition) => {
    void i18n.changeLanguage(languageFor(next)).then(() => {
      setLocale(next)
      requestAnimationFrame(() => requestAnimationFrame(() => restorePosition(position)))
    })
  }, [])

  const switchLocale = useCallback((next: Locale) => {
    if (next === locale) return
    const position = capturePosition()
    history.replaceState({ ...history.state, position }, '', location.href)
    history.pushState({ position }, '', `/${next}/${location.search}${location.hash}`)
    try { localStorage.setItem('leo-portfolio-locale', next) } catch { /* Storage failure must not block navigation. */ }
    applyLocale(next, position)
  }, [applyLocale, locale])

  useEffect(() => {
    const pop = (event: PopStateEvent) => {
      const next = localeFromPath() ?? startingLocale
      // Fragment navigation also emits popstate. Let the browser reach its anchor.
      if (next === locale) return
      applyLocale(next, (event.state?.position as ReadingPosition | undefined) ?? capturePosition())
    }
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [applyLocale, locale])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : 'en'
    document.title = i18n.t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'))
  }, [locale])

  return { locale, switchLocale }
}

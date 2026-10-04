import { useTranslation } from 'react-i18next'
import type { Locale } from '../i18n/setup'

export function Header({ locale, switchLocale }: { locale: Locale; switchLocale: (next: Locale) => void }) {
  const { t } = useTranslation()
  return (
    <>
      <a className="skip-link" href="#main">{t('a11y.skip')}</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#intro" aria-label={t('nav.home')}><span className="brand-mark" aria-hidden="true">l<span>l</span></span></a>
          <nav className="main-nav" aria-label={t('nav.menuLabel')}>
            <a href="#work">{t('nav.work')}</a>
            <a href="#about">{t('nav.about')}</a>
          </nav>
          <nav className="locale-switch" aria-label={t('nav.languageLabel')}>
            {(['en', 'zh'] as const).map(next => (
              <a key={next} href={`/${next}/${location.search}${location.hash}`} lang={next === 'zh' ? 'zh-Hans' : 'en'} hrefLang={next === 'zh' ? 'zh-Hans' : 'en'} aria-current={locale === next ? 'true' : undefined}
                onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); switchLocale(next) }}>
                {next === 'en' ? 'EN' : '中文'}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}

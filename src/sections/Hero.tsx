import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow hero-eyebrow">{t('hero.eyebrow')}</p>
      <h1 id="hero-title" className="hero-name"><span>{t('hero.name')}</span><span className="hero-alternate-name">{t('hero.alternateName')}</span></h1>
      <p className="hero-description">{t('hero.description')}</p>
      <a className="text-link hero-link" href="#work">{t('hero.cta')}<span className="link-circle" aria-hidden="true">↓</span></a>
    </section>
  )
}

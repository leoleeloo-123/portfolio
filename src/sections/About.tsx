import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="about section-shell" aria-labelledby="about-title">
      <p className="eyebrow">{t('about.eyebrow')}</p>
      <div className="about-grid"><h2 id="about-title">{t('about.title')}</h2><div><p className="body-copy">{t('about.body')}</p><p className="education">{t('about.education')}</p></div></div>
    </section>
  )
}

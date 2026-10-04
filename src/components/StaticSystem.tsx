import { useTranslation } from 'react-i18next'

/** Still typography and prism; the portrait is a separate DOM layer. */
export function StaticSystem() {
  const { t } = useTranslation()
  return (
    <div className="static-system" aria-hidden="true">
      <div className="static-headline"><span>{t('scene.word1')}</span><span>{t('scene.word2')}</span><span>{t('scene.word3')}</span></div>
      <div className="static-glass">
        <div className="static-atmosphere" />
        <div className="static-glass-light" />
      </div>
    </div>
  )
}

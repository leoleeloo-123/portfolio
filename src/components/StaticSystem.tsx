import { useTranslation } from 'react-i18next'

/** A deliberate still alternative for reduced motion or unavailable WebGL. */
export function StaticSystem() {
  const { t } = useTranslation()
  return (
    <div className="static-portrait" aria-hidden="true">
      <div className="static-headline"><span>{t('scene.word1')}</span><span>{t('scene.word2')}</span><span>{t('scene.word3')}</span></div>
      <div className="static-glass">
        <div className="static-atmosphere" />
        <img src="/images/leo-portrait.png" alt="" width="1122" height="1402" />
        <div className="static-glass-light" />
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLocale } from './app/useLocale'
import { useNarrativeProgress } from './motion/useNarrativeProgress'
import { Header } from './components/Header'
import { SceneStage } from './components/SceneStage'
import { Hero } from './sections/Hero'
import { Timeline } from './sections/Timeline'
import { About } from './sections/About'

export default function App() {
  const { t } = useTranslation()
  const { locale, switchLocale } = useLocale()
  const { progress, activeStage } = useNarrativeProgress(locale)
  const reduced = useReducedMotion()
  useEffect(() => {
    document.documentElement.dataset.calm = String(!!reduced || new URLSearchParams(location.search).get('motion') === 'reduce')
  }, [reduced])
  return (
    <>
      <Header locale={locale} switchLocale={switchLocale} />
      <main id="main" tabIndex={-1}>
        <div id="intro" className="portrait-intro">
          <SceneStage progress={progress} activeStage={activeStage} />
          <Hero />
        </div>
        <Timeline />
        <About />
      </main>
      <footer className="site-footer page-width"><div><span>{t('footer.name')}</span><p>{t('footer.note')}</p></div><a href="#intro" className="text-link">{t('footer.backTop')}<span aria-hidden="true">↑</span></a></footer>
    </>
  )
}

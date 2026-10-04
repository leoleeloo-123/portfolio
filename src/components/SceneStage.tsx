import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { StaticSystem } from './StaticSystem'
import { HeroPortrait } from './HeroPortrait'
import { FlowField } from './FlowField'
import type { GlassCommand } from '../scene/config'

const SceneCanvas = lazy(() => import('../scene/SceneCanvas'))

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export function SceneStage({ progress, activeStage }: { progress: MotionValue<number>; activeStage: number }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [active, setActive] = useState(true)
  const stageRef = useRef<HTMLElement>(null)
  const command = useRef<GlassCommand | null>(null)
  const loadingBudget = useRef(30_000)
  const forcedFallback = new URLSearchParams(location.search).get('scene') === 'static'
  const forcedReduced = new URLSearchParams(location.search).get('motion') === 'reduce'
  const calm = reduced || forcedReduced
  const onFailure = useCallback(() => setFailed(true), [])
  const onReady = useCallback(() => setReady(true), [])
  const alternative = calm || failed || timedOut || forcedFallback
  const mode = calm ? 'reduced-motion' : alternative ? 'fallback' : 'webgl'

  useEffect(() => {
    let visible = true
    const sync = () => setActive(visible && document.visibilityState === 'visible')
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    }, { rootMargin: '80px' })
    if (stageRef.current) observer.observe(stageRef.current)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  // Count only visible loading time: opening a background tab must not consume
  // the scene's budget before its demand-rendered first frame can run.
  useEffect(() => {
    if (alternative || ready || !active) return
    const started = performance.now()
    const timeout = window.setTimeout(() => setTimedOut(true), loadingBudget.current)
    return () => {
      window.clearTimeout(timeout)
      loadingBudget.current = Math.max(0, loadingBudget.current - (performance.now() - started))
    }
  }, [active, alternative, ready])

  const staticView = <StaticSystem />
  return (
    <aside ref={stageRef} className="scene-stage" data-active-stage={activeStage} data-scene-active={active ? 'true' : 'false'} data-scene-mode={mode} data-scene-ready={alternative || ready ? 'true' : 'false'} aria-label={t('scene.label')}>
      <HeroPortrait />
      <FlowField />
      <p className="sr-only">{t('scene.word1')} / {t('scene.word2')} / {t('scene.word3')}</p>
      {!alternative && ready ? <p id="scene-keyboard" className="sr-only">{t('scene.keyboard')}</p> : null}
      <div className="scene-center">
        <div className="scene-viewport" role="group" aria-label={t('scene.label')}
          tabIndex={!alternative && ready ? 0 : undefined}
          aria-describedby={!alternative && ready ? 'scene-keyboard' : undefined}
          aria-keyshortcuts={!alternative && ready ? 'ArrowLeft ArrowRight Home' : undefined}
          onKeyDown={event => {
            if (alternative || !ready) return
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault()
              const angle = event.key === 'ArrowLeft' ? -Math.PI / 2 : Math.PI / 2
              command.current = { type: 'turn', angle: angle + (command.current?.type === 'turn' ? command.current.angle : 0) }
            } else if (event.key === 'Home') {
              event.preventDefault()
              command.current = { type: 'reset' }
            }
          }}>
          {alternative ? staticView : (
            <SceneBoundary fallback={staticView} onFailure={onFailure}>
              <div className="scene-live" aria-hidden="true" data-ready={ready ? 'true' : 'false'}>
                <Suspense fallback={null}>
                  <SceneCanvas progress={progress} command={command}
                    active={active} onFailure={onFailure} onReady={onReady} />
                </Suspense>
              </div>
            </SceneBoundary>
          )}
        </div>
        {!alternative && !ready ? <p className="scene-loading" role="status">{t('scene.loading')}</p> : null}
        {alternative ? <p className="scene-fallback-note" role="status">
          {calm ? t('scene.reduced') : t('scene.fallback')}
          {failed || timedOut ? <button className="scene-retry" onClick={() => location.reload()}>{t('scene.retry')}</button> : null}
        </p> : null}
      </div>
    </aside>
  )
}

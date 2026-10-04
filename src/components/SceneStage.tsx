import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { StaticSystem } from './StaticSystem'
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
  const [active, setActive] = useState(true)
  const stageRef = useRef<HTMLElement>(null)
  const command = useRef<GlassCommand | null>(null)
  const forcedFallback = new URLSearchParams(location.search).get('scene') === 'static'
  const forcedReduced = new URLSearchParams(location.search).get('motion') === 'reduce'
  const calm = reduced || forcedReduced
  const onFailure = useCallback(() => setFailed(true), [])
  const onReady = useCallback(() => setReady(true), [])
  const alternative = calm || failed || forcedFallback
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

  const staticView = <StaticSystem />
  return (
    <aside ref={stageRef} className="scene-stage" data-scene-mode={mode} data-scene-ready={alternative || ready ? 'true' : 'false'} aria-label={t('scene.label')}>
      <div className="scene-viewport" aria-hidden="true">
        {alternative ? staticView : (
          <SceneBoundary fallback={staticView} onFailure={onFailure}>
            <div className="scene-live" data-ready={ready ? 'true' : 'false'}>
              <Suspense fallback={null}>
                <SceneCanvas progress={progress} command={command}
                  active={active} onFailure={onFailure} onReady={onReady} />
              </Suspense>
            </div>
          </SceneBoundary>
        )}
      </div>
      <div className="scene-bottomline">
        {!alternative && ready ? <>
          <button className="scene-control" aria-label={t('scene.previous')} title={t('scene.previous')}
            onClick={() => { command.current = { type: 'turn', angle: -Math.PI / 2 + (command.current?.type === 'turn' ? command.current.angle : 0) } }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button className="scene-control scene-reset" aria-label={t('scene.reset')} title={t('scene.reset')}
            onClick={() => { command.current = { type: 'reset' } }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></svg>
          </button>
          <button className="scene-control" aria-label={t('scene.next')} title={t('scene.next')}
            onClick={() => { command.current = { type: 'turn', angle: Math.PI / 2 + (command.current?.type === 'turn' ? command.current.angle : 0) } }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </> : null}
        <span className="scene-state" data-active-stage={activeStage}>{!alternative && !ready ? t('scene.loading') : t('scene.hint')}</span>
      </div>
      {alternative ? <p className="scene-fallback-note">{calm ? t('scene.reduced') : t('scene.fallback')}</p> : null}
    </aside>
  )
}

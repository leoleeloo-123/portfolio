import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent } from 'motion/react'

/** Small reversible poses while the portrait leaves ordinary page flow. */
export function useNarrativeProgress(locale: string) {
  const progress = useMotionValue(0)
  const [activeStage, setActiveStage] = useState(0)
  const stage = useRef(0)
  useMotionValueEvent(progress, 'change', value => {
    const next = value < 0.28 ? 0 : value < 0.77 ? 1 : 2
    if (stage.current !== next) { stage.current = next; setActiveStage(next) }
  })
  useEffect(() => {
    let frame = 0
    const element = document.querySelector<HTMLElement>('.portrait-intro')
    const update = () => {
      frame = 0
      if (!element) return
      const bounds = element.getBoundingClientRect()
      progress.set(Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height * 0.7))))
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(request)
    if (element) observer.observe(element)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    void document.fonts.ready.then(request)
    update()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [locale, progress])
  return { progress, activeStage }
}

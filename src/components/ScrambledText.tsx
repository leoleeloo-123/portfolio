import { useEffect, useMemo, useState } from 'react'

const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-/:;<=>?[]{}'

/** A moving ten-character scramble window; the original text owns layout and accessibility. */
export function ScrambledText({ text, start, disabled, delay = 0 }: {
  text: string
  start: boolean
  disabled: boolean
  delay?: number
}) {
  const glyphs = useMemo(() => Array.from(text), [text])
  const [frame, setFrame] = useState(-1)
  const complete = disabled || frame >= glyphs.length

  useEffect(() => {
    if (!start || disabled) return
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      let next = 0
      interval = window.setInterval(() => {
        setFrame(next++)
        if (next > glyphs.length && interval !== undefined) window.clearInterval(interval)
      }, 30)
    }, delay * 1000)
    return () => { window.clearTimeout(timeout); if (interval !== undefined) window.clearInterval(interval) }
  }, [delay, disabled, glyphs.length, start])

  return (
    <span className="scramble-text" data-scramble-state={complete ? 'complete' : frame < 0 ? 'pending' : 'active'}>
      <span className="sr-only">{text}</span>
      <span className="scramble-visual" aria-hidden="true">
        {glyphs.map((glyph, index) => {
          const fixed = complete || index < frame || /\s/u.test(glyph)
          const visible = complete || frame >= 0 && index < frame + 10
          // Deterministic per-tick noise keeps React render pure and the motion irregular.
          const noise = Math.abs(Math.sin((frame + 3) * (index + 7) * 12.9898) * 43758.5453)
          const character = fixed ? glyph : symbols[Math.floor(noise) % symbols.length]
          return <span className="scramble-glyph" key={index}>
            <span className="scramble-measure">{glyph === ' ' ? '\u00a0' : glyph}</span>
            <span className="scramble-letter" style={{ visibility: visible ? 'visible' : 'hidden' }}>{character === ' ' ? '\u00a0' : character}</span>
          </span>
        })}
      </span>
    </span>
  )
}

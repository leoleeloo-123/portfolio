import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { timelineEntries } from '../content/portfolio'
import type { TimelineEntry } from '../content/portfolio'
import { ScrambledText } from '../components/ScrambledText'

type TimelineGroup = { year: number | null; entries: TimelineEntry[] }
const groups = timelineEntries.reduce<TimelineGroup[]>((result, entry) => {
  const previous = result.at(-1)
  if (previous && previous.year === entry.year) previous.entries.push(entry)
  else result.push({ year: entry.year, entries: [entry] })
  return result
}, [])

function TimelineRow({ entry, index, reduced }: { entry: TimelineEntry; index: number; reduced: boolean }) {
  const { t, i18n } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.4 })
  const title = t(`timeline.${entry.translationKey}.title`)
  const kind = t(`timeline.${entry.kind}`)
  return (
    <article ref={ref} id={entry.id} className="timeline-entry" aria-labelledby={`${entry.id}-title`}>
      <details>
        <summary className="timeline-item">
          <h3 id={`${entry.id}-title`} className="timeline-item-line">
            <span className="timeline-item-title"><ScrambledText key={`${i18n.language}-${title}`}
              text={title} start={visible} disabled={reduced} delay={index * 0.08} /></span>
            <span className="timeline-kind"><ScrambledText key={`${i18n.language}-${kind}`}
              text={kind} start={visible} disabled={reduced} delay={index * 0.08 + 0.10} /></span>
            <span className="timeline-arrow" aria-hidden="true">↗</span>
          </h3>
        </summary>
        <p className="timeline-summary">{t(`timeline.${entry.translationKey}.summary`)}</p>
      </details>
    </article>
  )
}

export function Timeline() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const reduced = !!prefersReducedMotion || new URLSearchParams(window.location.search).get('motion') === 'reduce'
  return (
    <section id="work" className="timeline section-shell" aria-labelledby="timeline-title">
      <span id="journey" className="timeline-anchor" aria-hidden="true" />
      <div className="timeline-heading">
        <h2 id="timeline-title">{t('timeline.title')}</h2>
        <p className="body-copy timeline-intro">{t('timeline.intro')}</p>
      </div>
      <div className="timeline-list">
        {groups.map((group, groupIndex) => (
          <div className="timeline-group" key={`${group.year ?? 'undated'}-${groupIndex}`}>
            <div className="timeline-year-label">
              {group.year === null
                ? <><span aria-hidden="true">—</span><span className="sr-only">{t('timeline.yearPending')}</span></>
                : <time dateTime={String(group.year)}>{group.year}</time>}
            </div>
            <ul className="timeline-group-items">
              {group.entries.map((entry, index) => <li key={entry.id}>
                <TimelineRow entry={entry} index={index} reduced={reduced} />
              </li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

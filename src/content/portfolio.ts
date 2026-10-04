export type ProjectId = 'tax-engine' | 'deloitte' | 'navi-crm' | 'fitness-os'
export type ProjectTranslationKey = 'taxEngine' | 'deloitte' | 'naviCrm' | 'fitnessOs'

export interface TimelineEntry {
  readonly id: ProjectId
  readonly translationKey: Exclude<ProjectTranslationKey, 'fitnessOs'>
  /** Dates are intentionally unset until the owner supplies a public chronology. */
  readonly year: number | null
  readonly kind: 'project' | 'experience' | 'exploration'
}

/** This review slice establishes visual rhythm, not a confirmed chronology. */
export const timelineEntries = [
  { id: 'tax-engine', translationKey: 'taxEngine', year: null, kind: 'project' },
  { id: 'deloitte', translationKey: 'deloitte', year: null, kind: 'experience' },
  { id: 'navi-crm', translationKey: 'naviCrm', year: null, kind: 'exploration' },
] as const satisfies readonly TimelineEntry[]

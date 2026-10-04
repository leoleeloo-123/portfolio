export type Vec3 = [number, number, number]
export type GlassPose = {
  rotation: Vec3
  scale: number
  atmosphere: number
}

export type GlassCommand = { type: 'turn'; angle: number } | { type: 'reset' }

export const SCENE = {
  shell: { edge: 2.65, radius: 0.30, segments: 8 },
  camera: { fov: 30, minHeight: 4.65, compactHeight: 4.7, minWidth: 4.5 },
  dpr: [1, 2] as [number, number],
  refraction: { desktopEdge: 2048, phoneEdge: 1024, desktopSamples: 16, phoneSamples: 8, chromatic: 0.35 },
  damping: 14, pointerDamping: 8, pointerAmplitude: 0.025,
  rotation: { drag: 0.008, idleY: 0.21, idleX: 0.072, inertia: 0.94, resumeDelay: 0.6 },
  settleThreshold: 0.00025, maxDelta: 1 / 20,
  colors: { background: '#101114' },
} as const

// The prompt's corner-first composition, with three related scroll poses.
export const GLASS_POSES: [GlassPose, GlassPose, GlassPose] = [
  { rotation: [-0.42, 0.62, 0.18], scale: 1, atmosphere: 0.24 },
  { rotation: [-0.28, 0.90, 0.08], scale: 0.985, atmosphere: 0.32 },
  { rotation: [-0.38, 0.48, -0.12], scale: 0.965, atmosphere: 0.26 },
]

export function clampProgress(value: number): number {
  return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0))
}
export function smoothRange(value: number, start: number, end: number): number {
  const t = clampProgress((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

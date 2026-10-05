// Keep the existing two-input / branch / merge arrangement, with flat circles.
const nodes = [
  { x: 73, y: 133, r: 32 },
  { x: 73, y: 315, r: 32 },
  { x: 217, y: 205, r: 32 },
  { x: 217, y: 367, r: 32 },
  { x: 365, y: 258, r: 34 },
]
const connections = [
  'M6 133 H41',
  'M6 315 H41',
  'M105 133 H144 V205 H185',
  'M105 315 H144 V205',
  'M249 205 H290 V258 H331',
  'M217 237 V335',
  'M249 367 H290 V258',
  'M399 258 H434',
]

/** The stage-wide screen dots these paths and nodes in the portrait's grid. */
export function FlowField() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg viewBox="0 0 440 480" fill="none">
        <g className="workflow-connections" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" opacity=".8">
          {connections.map(path => <path key={path} d={path} />)}
        </g>
        <g className="workflow-nodes" stroke="#d5e0ff" strokeWidth="4.5" fill="none">
          {nodes.map(({ x, y, r }) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}
        </g>
      </svg>
    </div>
  )
}

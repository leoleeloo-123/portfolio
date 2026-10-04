const nodes = [
  { x: 34, y: 100, w: 78, h: 66 },
  { x: 34, y: 282, w: 78, h: 66 },
  { x: 178, y: 172, w: 78, h: 66 },
  { x: 178, y: 334, w: 78, h: 66 },
  { x: 326, y: 222, w: 78, h: 72 },
]
const connections = [
  'M112 133 H144 V205 H178',
  'M112 315 H144 V205',
  'M256 205 H290 V258 H326',
  'M217 238 V334',
  'M256 367 H290 V258',
  'M404 258 H434',
]
const anchors = [[112, 133], [112, 315], [178, 205], [256, 205], [217, 238], [217, 334], [256, 367], [326, 258], [404, 258]]

// A stable sparse field gains density near processing nodes, then dissolves.
const particles = Array.from({ length: 25 * 27 }, (_, index) => {
  const column = index % 25
  const row = Math.floor(index / 25)
  const x = 10 + column * 17.4 + Math.sin(index * 2.3) * 2.2
  const y = 16 + row * 17.2 + Math.cos(index * 1.7) * 2.2
  const distance = Math.min(...nodes.map(n => Math.hypot((x - n.x - n.w / 2) / 1.15, y - n.y - n.h / 2)))
  const density = Math.exp(-distance * distance / 7800)
  return { x, y, r: .65 + density * .65, opacity: .025 + density * .19 }
})

/** Dotted processing blocks and branch/merge logic emerge from a shared light field. */
export function FlowField() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg viewBox="0 0 440 480" fill="none">
        <defs>
          <pattern id="workflow-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.65" fill="white" />
          </pattern>
          <mask id="workflow-screen" x="0" y="0" width="440" height="480" maskUnits="userSpaceOnUse">
            <rect width="440" height="480" fill="url(#workflow-dots)" />
          </mask>
          <filter id="workflow-haze" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <g id="workflow-logic">
            <g stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
              {connections.map(path => <path key={path} d={path} />)}
            </g>
            {nodes.map(({ x, y, w, h }) => <g key={`${x}-${y}`}>
              <rect x={x} y={y} width={w} height={h} rx="12" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth="3" />
              <path d={`M${x + 20} ${y + 26} h${w - 40} M${x + 20} ${y + 40} h${w - 52}`} stroke="currentColor" strokeWidth="4" opacity=".6" />
            </g>)}
            {anchors.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="currentColor" />)}
          </g>
        </defs>
        <g fill="currentColor" className="workflow-particles">
          {particles.map(({ x, y, r, opacity }, index) => <circle key={index} cx={x} cy={y} r={r} opacity={opacity} />)}
        </g>
        <use href="#workflow-logic" opacity=".22" filter="url(#workflow-haze)" transform="translate(4 7)" />
        <g mask="url(#workflow-screen)">
          <use href="#workflow-logic" opacity=".82" />
          <g stroke="currentColor" strokeWidth="7" strokeLinejoin="round">
            {[connections[0], connections[2], connections[4]].map((path, index) => (
              <path key={path} d={path} pathLength="100" className={`flow-signal flow-signal-${index}`} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  )
}

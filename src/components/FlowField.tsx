const routes = [
  'M8 86 H108 L180 158 H304 L374 88 H430',
  'M8 214 H142 L214 286 H352 L430 364',
  'M8 398 H92 L180 310 V158 L250 88 V18',
  'M68 458 V366 L142 292 V214 L228 128 H370 L430 188',
]
const stations = [
  [48, 86], [108, 86], [238, 158], [304, 158], [398, 88],
  [48, 214], [142, 214], [214, 286], [300, 286], [390, 324],
  [42, 398], [92, 398], [180, 310], [180, 236], [250, 56],
  [68, 428], [106, 328], [142, 292], [292, 128], [370, 128],
]
const interchanges = [[180, 158], [142, 214], [214, 286]]

/** Straight routes, diagonal turns and circular stations suggest connected workflows. */
export function FlowField() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg viewBox="0 0 440 480" fill="none">
        <defs>
          <linearGradient id="flow-ink" x1="0" y1="0" x2="440" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a9c6fa" stopOpacity=".75" />
            <stop offset="1" stopColor="#a99cda" stopOpacity=".4" />
          </linearGradient>
        </defs>
        <g stroke="url(#flow-ink)" strokeWidth="1.6" strokeLinejoin="miter">
          {routes.map(path => <path key={path} d={path} />)}
        </g>
        <g stroke="#d0dfff" strokeWidth="2" strokeLinecap="round">
          {[routes[0], routes[1], routes[3]].map((path, index) => (
            <path key={path} d={path} pathLength="100" className={`flow-signal flow-signal-${index}`} />
          ))}
        </g>
        <g fill="#273251" stroke="#abc2ef" strokeWidth="1.6">
          {stations.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />)}
        </g>
        <g fill="#273251" stroke="#c3d2f4" strokeWidth="2">
          {interchanges.map(([x, y]) => <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" />
            <circle cx={x} cy={y} r="3" fill="#b0c5ef" stroke="none" />
          </g>)}
        </g>
      </svg>
    </div>
  )
}

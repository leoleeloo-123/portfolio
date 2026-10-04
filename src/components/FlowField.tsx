const traces = [
  'M12 60 C110 60 90 190 170 190 S245 110 328 110',
  'M12 120 C95 120 115 211 174 211 S257 186 328 186',
  'M12 188 C92 188 120 232 174 232 S244 260 328 260',
  'M12 272 C90 272 105 254 174 254 S248 326 328 326',
  'M12 348 C99 348 91 275 174 275 S257 378 328 378',
]

// A deterministic field narrows into an organized channel, then branches again.
const points = Array.from({ length: 22 * 18 }, (_, index) => {
  const column = index % 22
  const row = Math.floor(index / 22)
  const x = 12 + column * 14.4
  const width = 44 + 116 * Math.pow(Math.abs((x - 174) / 174), 1.35)
  const y = 232 + (row / 17 - .5) * width * 2
  return { x, y, opacity: .12 + .32 * (1 - Math.abs(row / 17 - .5) * 1.5), r: column % 5 === 0 ? 1.25 : .85 }
})

/** Supporting geometry, without labels, dashboard widgets or a glowing hub. */
export function FlowField() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg viewBox="0 0 340 440" fill="none">
        <defs>
          <linearGradient id="flow-ink" x1="12" y1="232" x2="328" y2="232" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7e9ee8" stopOpacity=".1" />
            <stop offset=".5" stopColor="#b3c4ff" stopOpacity=".7" />
            <stop offset="1" stopColor="#aca0e2" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <g fill="#aabfff">
          {points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r={point.r} opacity={point.opacity} />)}
        </g>
        <g stroke="url(#flow-ink)" strokeWidth=".8">
          {traces.map(path => <path key={path} d={path} />)}
        </g>
        <g stroke="#c0ceff" strokeWidth="1.4" strokeLinecap="round">
          {[traces[0], traces[2], traces[4]].map((path, index) => (
            <path key={path} d={path} pathLength="100" className={`flow-signal flow-signal-${index}`} />
          ))}
        </g>
      </svg>
    </div>
  )
}

/** Local cutout with a clean face and a progressively screened silhouette. */
export function HeroPortrait() {
  return (
    <div className="hero-portrait" aria-hidden="true">
      <svg className="portrait-filter" width="0" height="0">
        <defs>
          <filter id="portrait-cool" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues=".06 .76" />
              <feFuncG type="table" tableValues=".10 .84" />
              <feFuncB type="table" tableValues=".24 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <img className="portrait-base" src="/images/leo-portrait-professional.png" alt="" width="1122" height="1402" fetchPriority="high" />
      <img className="portrait-screen" src="/images/leo-portrait-professional.png" alt="" width="1122" height="1402" />
    </div>
  )
}

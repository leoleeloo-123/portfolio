# Leo Li — Interactive Systems Portfolio

A bilingual personal portfolio with a screened portrait, central refractive typography/prism and an abstract data-flow field. A blue/indigo atmosphere fades into a compact single-column project index. The current hero refinement is ready for visual review; project copy and chronology remain provisional.

## Run locally

Use Node.js 24 (tested), or Node >=22.12, and npm. From the project folder in PowerShell:

```powershell
npm ci
npm run dev
```

Open `/en/` or `/zh/` at the loopback URL printed by Vite (normally `http://127.0.0.1:5173`). Assets and fonts are local; the website uses no backend or live APIs.

```powershell
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production preview normally uses port 4173. `dist/` is generated and ignored. The existing Vercel project `leo-li` builds the GitHub `main` branch with the Vite preset and Node 24. `vercel.json` serves the app shell for `/en/` and `/zh/` direct visits and refreshes; asset paths remain ordinary static files.

## Current experience

- A cool portrait sits outside the glass on the left; a minimal point/trace field supports the right. Mobile places these supporting layers beneath the central prism rather than shrinking the desktop layout.
- Six-band typography/atmosphere refraction, drag with inertia, idle rotation, accessible left/right/reset controls and three reversible scroll poses.
- Compact project rows with character-scramble reveals, hover/focus dimming and native expandable summaries. Dates stay unset until verified.
- English and Simplified Chinese routes preserve the reading anchor and scene identity on language switches.
- Refresh reveals the prism after its localized type texture and complete first frame are ready. The portrait loads independently in the DOM. Reduced motion, unavailable WebGL and 30 seconds of visible loading show a static prism with the same supporting portrait. Failed or timed-out loads offer a reload action; hidden/offscreen time does not consume the loading budget.
- Keyboard focus, DOM text and ordinary vertical scrolling remain available. Review alternatives: `?scene=static` and `?motion=reduce`.

## Where to edit

| Area | File or folder |
| --- | --- |
| Colors, typography, spacing | `src/styles/tokens.css` |
| Camera, glass, rotation, scroll poses | `src/scene/config.ts` |
| Optical shader | `src/scene/glassMaterial.ts` |
| Scroll progression | `src/motion/useNarrativeProgress.ts` |
| Project IDs and verified years | `src/content/portfolio.ts` |
| English and Chinese copy | `src/i18n/resources.ts` |
| Page sections | `src/sections/` |
| Locale and reading position | `src/app/useLocale.ts` |
| Public portrait and font license | `public/` |

## Documentation

- [Project brief](docs/project-brief.md): scope, facts and deferred content.
- [Visual direction](docs/visual-direction.md): design system, references and motion.
- [Progress](docs/progress.md): current checks, cleanup and remaining limits.
- [Hero review](docs/hero-composition-review.md): current desktop/mobile composition and interaction checks, with [screenshots](evidence/atmosphere-hero/).
- [Portrait provenance](docs/asset-processing.md): image processing and fidelity limits.

Historical drafts, unused sections, raw recordings and the original photograph are retained locally under `archive/`, excluded from Git and the app build. Only the transparent portrait derivative is served by the website. Manrope's OFL license is included in `public/licenses/`.

Repository: [leoleeloo-123/portfolio](https://github.com/leoleeloo-123/portfolio). Production: [leo-li.vercel.app](https://leo-li.vercel.app/). The owner authorized repair of this existing deployment. Detailed case-study expansion, physical-phone/GPU performance and SEO remain separate review items.

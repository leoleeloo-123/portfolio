# Leo Li — Interactive Systems Portfolio

A bilingual personal portfolio with a portrait inside an interactive crystal cube, a compact navigation dock and a single-column project index. The current visual base is approved; project copy and chronology remain provisional.

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

The production preview normally uses port 4173. `dist/` is generated and ignored. No deployment is configured.

## Current experience

- Six-band glass refraction, portrait depth, drag with inertia, idle rotation, accessible left/right/reset controls and three reversible scroll poses.
- Compact project rows with character-scramble reveals, hover/focus dimming and native expandable summaries. Dates stay unset until verified.
- English and Simplified Chinese routes preserve the reading anchor and scene identity on language switches.
- Refresh reserves the scene area and reveals the cube only after the portrait texture and complete first frame are ready. Static portraits are reserved for reduced motion and unavailable WebGL.
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
- [Visual review](docs/reference-alignment-review.md): detailed interaction observations and [screenshots/recording](evidence/reference-alignment/).
- [Portrait provenance](docs/asset-processing.md): image processing and fidelity limits.

Historical drafts, unused sections, raw recordings and the original photograph are retained locally under `archive/`, excluded from Git and the app build. Only the transparent portrait derivative is served by the website. Manrope's OFL license is included in `public/licenses/`.

Repository: [leoleeloo-123/portfolio](https://github.com/leoleeloo-123/portfolio). Repository synchronization is authorized; deployment and detailed case-study expansion remain separate decisions. Physical-phone/GPU performance and production hosting/SEO still need review.

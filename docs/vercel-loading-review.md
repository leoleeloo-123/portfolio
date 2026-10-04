# Existing Vercel deployment repair — 2026-10-04

The owner deployed `leo-li.vercel.app` and authorized repair. Project `prj_U85UfGLAFVubJTOgsoh4p6S2P3Rr` uses Vite and Node 24. Initial production deployment `dpl_FAbZ6Pf2z2TQGvmjERfHr7czc3j4` was READY but contained Git commit `51b748f`, preceding the atmospheric hero refinement.

## Observed issues

- Direct `/en/` returned Vercel NOT_FOUND. The repository lacked locale rewrites. From `/`, the SPA initialized and changed the address to `/zh/`; client navigation alone did not validate server routing.
- The old scene initially showed Preparing the visualization without a canvas. It subsequently completed rendering with no application errors, so a persistent shader failure was not reproduced. The Three Clock deprecation warning remains.
- The loader had no deadline for a module/network or first-frame stall. The rest of the page's DOM content remained independent of 3D.

## Changes

`vercel.json` rewrites only the two locale namespaces to the app shell; missing JS/images retain genuine 404s. `trailingSlash: true` matches the app's canonical `/en/` and `/zh/` links. Initial namespace rewrites alone worked for `/en` and `/zh` but left their slash variants at 404 in production, so the explicit slash policy was added. No framework, cloud project, secrets or protection settings are changed. The previously requested atmospheric hero and new portrait are included in the repository sync.

Scene initialization gets a cumulative 30-second visible loading budget. Offscreen/hidden time pauses it. A stall replaces the hidden canvas with the static prism and a localized manual reload action. This preserves the first-frame reveal and avoids resurfacing the old central portrait.

## Verification

TypeScript production build and ESLint passed. The built preview loaded real WebGL in both locales, with one canvas and a fully loaded supporting portrait; English keyboard rotation and Chinese direct navigation passed, without application errors or horizontal overflow. A loopback HTTP fixture deliberately left the scene JS request pending: the actual 30-second watchdog reached fallback mode, showed a static prism and a 44px reload button, and left all DOM content readable. Evidence: `evidence/vercel-fix/loading-timeout.jpg`.

Production checks will be recorded after repository synchronization. Vercel metadata/project listing works, but the connector cannot read build events under the project's team scope (403); production status and browser observations are used instead.

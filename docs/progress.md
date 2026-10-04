# Current progress — 2026-10-04

The owner approved the crystal/index visual base and requested a refresh fix, local organization and synchronization to `leoleeloo-123/portfolio`. Detailed case studies and deployment remain deferred.

## Refresh fix

The briefly visible portrait was the current loading fallback, not a stale asset. Normal loading now reserves the existing scene dimensions without displaying the static portrait. The live canvas stays transparent and noninteractive until the portrait texture and full multipass frame are ready, then appears over 180ms. Reduced-motion and renderer-failure alternatives retain their intentional static portrait.

## Local organization

- Removed unused Journey/SelectedWork sections and their motion tokens from active source; retained them in the ignored local archive.
- Trimmed their unused bilingual dictionaries and content records. Future project IDs remain available independently of UI.
- Archived historical reviews/screenshots, recording scratch files, previous documentation and the original photograph under `archive/2026-10-04/`.
- Condensed README and portrait provenance; kept the active brief, design system and current detailed visual review.
- Git and ESLint exclude archive; TypeScript includes only src. Generated dist, node_modules and build metadata remain ignored.
- Initialized the local Git repository for the explicitly authorized GitHub synchronization. The target repository was verified empty with push access; no previous remote history needed replacement. The public PNG derivative is included; the original portrait and local archive are excluded.

## Actual verification of this cleanup

| Check | Result |
| --- | --- |
| TypeScript, lint, production build | Passed |
| Development refresh | Loading had no static portrait and opacity 0; ready scene had one canvas and opacity 1 |
| Production Chinese / English refresh | Captured loading ready=false with zero static portraits and hidden live scene, followed by ready=true, one canvas and three controls |
| Responsive spot checks | 390 × 844 Chinese and 1440 × 900 English: no horizontal overflow |
| Localization and index | English/Chinese links translate the page; Enter opens Deloitte's native disclosure |
| Forced static / reduced motion | Each retains one static portrait, zero canvases and zero rotation controls; reduced branch disables smooth scrolling |
| Console | No application errors; existing Three Clock dependency deprecation warning remains |

Evidence: `evidence/refresh-cleanup/` contains current desktop/mobile screenshots and DOM observations. Prior full responsive/interaction checks of the approved visual base remain in [reference-alignment-review.md](reference-alignment-review.md); they were not rerun wholesale for this small loading and cleanup change.

## Remaining limits

The roughly 2MB portrait is not yet optimized. Main JS is now 293.82kB / 93.31kB gzip after removing unused copy; the lazy scene remains 926.27kB / 246.83kB gzip. These are build sizes, not load-time or frame-rate measurements. Loading can leave a reserved empty scene area while assets arrive. A neutral loading hint is present on wider views.

Physical phone/GPU performance, real context loss, live OS preference changes and production hosting/SEO remain untested. Project dates, exact public titles, contribution details and contact information remain owner-supplied future content. Repository synchronization does not configure deployment or public hosting.

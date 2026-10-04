# Crystal and project index — reference alignment

Date: 2026-10-04, Asia/Shanghai. The owner requested that the cube and list recover their reference signatures before tuning content. This is the current visual checkpoint, superseding the gentle portrait prototype. Detailed demos remain deferred.

## Result

- One rounded crystal shell with six-band front/back refraction: front/back power 0.30/0.22, chromatic parameter 0.5, saturation 1.08, white Fresnel edges and brighter specular highlights. The local rounded geometry now has a 0.30 bevel radius on a 2.65 edge, closer to the supplied fallback proportions. It does not use the remote GLB.
- Large localized BUSINESS / DATA / SYSTEMS or 业务 / 数据 / 系统 words are drawn inside WebGL so the glass can refract them. A soft atmosphere remains behind the transparent portrait. The photographic plane faces the camera inside the rotating shell; it is not a reconstructed 3D head.
- Face protection uses a small projected ellipse to lower distortion and highlight intensity. The previous low-dispersion clear window across the entire front was removed. Grazing angles can still distort or obscure the portrait, as glass should; the final balance remains a visual decision for the owner.
- Real world-space drag rotation, release inertia, slow idle rotation, smooth ±90° turns and reset. Three related, reversible scroll poses remain within the ordinary-flow hero. The canvas uses `pan-y`; mouse wheel scrolling continues normally. Native touch performance has not been tested.
- Compact grouped index: Tax Engine, Deloitte and Navi Material CRM. Titles and short kind labels resolve from random-looking characters in a ten-character moving window, at 30ms per character with a small stagger. Glyph slots reserve their final size and original text stays available to screen readers. Hover/focus dims other rows. Native disclosures reveal the existing summaries and work with Enter.
- Year fields remain null. One shared em dash occupies the year column, with an accessible pending-year label. The current order is provisional. Future verified years group adjacent rows without changing the component structure.
- Fixed dock, bilingual DOM copy, stable reading anchors and portrait fallback remain. The imperative background texture subscribes to language changes and replaces/disposes its texture, preserving scene orientation while translating the background.

## Actual verification

| Check | Observation |
| --- | --- |
| Strict TypeScript, lint, production build | `npm run typecheck`, `npm run lint`, `npm run build` passed after the texture-sync fix |
| Development and production | Loopback 5173 and 4173 served the local app; real 3D loaded in both locales |
| Responsive matrix | Both locales at 320, 360, 390, 768, 1024, 1440 and 1920px: no horizontal overflow or checked heading/control bounds outside the page; index titles remained single-line |
| Targets | Main navigation, language and rotation controls measured at least 44 × 44px |
| Drag and controls | Real native mouse drag changed the shell; release left cursor at grab with no dragging class. Left/right/reset controls were operated and the pose changed in screenshots |
| Scroll | Mobile-size wheel scroll over the canvas: scrollY 0 → 253.33 → 0; DOM scene phase 0 → 1 → 0 |
| Scramble | Actual captures observed pending → active → complete and random letters resolving into the original titles; the shortest titles resolve quickly by design |
| Hover | Deloitte hovered/expanded: row opacities 0.5 / 1 / 0.5 |
| Native disclosure | Mouse opened the summary; Enter closed then reopened it |
| Keyboard scene control | Enter activated the left-rotation button; it retained a visible focus outline. Default 327 × 604 dev panel had one ready WebGL canvas and no overflow |
| Locale state | Expanded Deloitte remained open. At 390 × 600, Chinese/English reading fractions were 0.55670 / 0.55584. One canvas remained present |
| Near page bottom | At 390 × 844 the shorter Chinese page reached its scroll limit. Restoration was clamped at the bottom; identical pixel position cannot be maintained without adding empty page length |
| Background localization | Fresh Chinese render, Chinese → English and English → Chinese were visually checked after the texture-sync fix |
| Static override | `?scene=static`: portrait and localized alternative, no canvas or rotation controls, no overflow |
| Reduced override | `?motion=reduce`: still portrait, no canvas or rotation controls, all six title/label spans complete, smooth scrolling disabled |
| Production console | No application error entries; the existing Fiber/Three Clock deprecation warning remains |

Browser checks used viewport overrides in the Codex in-app browser on Windows, not physical phones. Configured desktop/mobile views were 1440 × 900 and 390 × 844; captured JPEG rasters are typically 1425 × 891 and 375 × 812 on this host.

## Evidence

Current evidence lives in `evidence/reference-alignment/`:

- `desktop-en.jpg`, `desktop-zh.jpg`, `mobile-en.jpg`, `mobile-zh.jpg`: opening composition.
- `desktop-list-en.jpg`, `desktop-list-zh.jpg`, and expanded variants: compact index and disclosure/hover treatment.
- `mobile-list-expanded-en.jpg`, `mobile-list-expanded-zh.jpg`: narrow-view disclosure observations, including the bottom clamp case.
- `mobile-fallback-zh.jpg`, `mobile-reduced-en.jpg`: static alternatives.
- `keyboard-left-zh.jpg`, `keyboard-checks.json`: keyboard rotation/focus in the restored default panel.
- `interaction.gif`: 26 real browser screenshots of cube controls/drag and index settlement, assembled as two observed episodes at a review playback pace. GIF encoding merged duplicates into 21 frames at 960 × 600, about 1.17MB. No generated/interpolated UI frames or frame-rate claim.
- `layout-checks.json`, `locale-checks.json`, `fallback-checks.json`, `runtime-checks.json`, `capture-checks.json`, `list-capture-checks.json`: actual observations. Raw capture frames are retained in the ignored local archive.

## Current limits and next review

The optical model is a screen-space approximation. The local geometry, photographic content and graphite single-column composition intentionally differ from the supplied full-screen Design World page. The photo remains a flat plane; it does not acquire unseen facial geometry when the shell rotates. White highlights and spectral separation are now deliberately stronger, and the owner should review their balance before any content expansion.

Desktop uses 16 spectral samples per pass; narrow canvases use 8, with render-target edges capped at 2048/1024 and DPR capped at 2. Visible idle rotation requires continuous rendering; source visibility guards pause it offscreen/hidden. FPS, battery, real iOS/Android behavior, live OS reduced-motion changes, physical GPU context loss and non-float rendering were not measured. Forced alternatives exercise the available UI branches rather than those hardware mechanisms.

The portrait PNG is about 2MB and remains unoptimized. Build sizes are approximately 300.18kB / 95.63kB gzip for main JS and 926.27kB / 246.83kB gzip for the lazy scene. These are bundle sizes, not load-time measurements. Source photo processing and fidelity limits remain in [asset-processing.md](asset-processing.md).

Review crystal/refraction identity, drag and idle tempo, face readability, compact index rhythm and phone composition next. The owner will supply content and chronology later. Detailed Deloitte, Tax Engine, CRM and Fitness OS demos remain deferred. Repository synchronization was separately authorized after visual approval; deployment remains outside scope. See [progress.md](progress.md) for the subsequent refresh fix and cleanup.

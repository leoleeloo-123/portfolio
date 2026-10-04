# Atmospheric hero review — 2026-10-04

The owner supplied a new arms-crossed portrait and requested a three-part composition: left portrait, central typography/prism, right abstract workflow. This local refinement supersedes the portrait-inside-glass hero. The project index and its content remain unchanged.

## Interpretation

- The central prism bends business/data/systems typography and a blue/indigo environment. No portrait texture, photographic plane or face protection mask remains in the WebGL scene. Six-band front/back optics remain; front/back displacement is 0.24/0.18 and chromatic intensity 0.35 for a calmer treatment.
- The new PNG is copied unchanged. An SVG cool-tone filter and CSS masks create a screened silhouette, with a broader unscreened face region and a gradual lower fade. Both crossed arms remain visible. The portrait is a supporting DOM layer rather than a face reconstructed in 3D.
- The right SVG field narrows into a channel and branches again. Five fine curves and three small traveling segments echo the portrait's dots. There are no labels, dashboard widgets or glowing hub. Flow animation pauses when the hero is offscreen/hidden and stops for reduced motion.
- The CSS atmosphere spans the full hero and fades into graphite. An opaque gradient is included only in the optical capture; the final canvas stays transparent around the prism/type. This avoids a rectangular black canvas covering the atmosphere.
- Below 760px, the central object/type retain a dedicated full-width stage. The smaller portrait and flow form a supporting pair beneath it; below 600px their height is approximately 158/162px. This retains posture and shared texture at the expense of photographic detail on narrow screens.

## Actual verification

| Check | Result |
| --- | --- |
| Strict TypeScript / lint / production build | Passed |
| Development and production | New composition loaded at loopback 5173 / 4173 |
| Both locales, 320 / 360 / 390 / 768 / 1024 / 1440 / 1920px | No horizontal overflow or checked headings/portrait/flow/controls outside viewport; one ready canvas; new portrait loaded |
| Controls | Navigation/language/rotation targets at least 44 × 44px |
| Photo placement | No image element inside the central scene; source review also confirms no portrait loader/mesh/face uniforms in WebGL |
| Interaction | Native mouse drag released without a stuck dragging class; Enter operated the right-turn button with visible focus |
| Scroll and pause | Wheel over mobile canvas reached scrollY 772, phase 2 and active=false; flow animation paused. Reverse scroll returned to 0, phase 0 and active=true |
| Project index and locale | Enter opened Deloitte; expanded state and one canvas persisted through Chinese → English |
| Forced static branch | Static prism, supporting portrait loaded, no canvas, no central photo and no overflow |
| Reduced-motion branch | Static prism, no canvas or central photo; flow animation none; scrolling auto |
| Production console | No application errors; existing Three Clock dependency warning remains |

`evidence/atmosphere-hero/` contains desktop/mobile screenshots in both languages, keyboard rotation, mobile static fallback, and `checks.json`. Tests use the Windows in-app browser with viewport overrides, not physical phones. Current screenshots are captured at the top of the page; interaction poses can differ because rotation continues during capture.

## Limits

The portrait is approximately 1.75MB and not optimized. The scene remains a screen-space refraction approximation, with bounded render targets and 16/8 desktop/narrow samples. Main JS is 296.30kB (94.24kB gzip), lazy scene 925.13kB (246.46kB gzip); these are bundle sizes, not speed measurements. FPS, battery and real iOS/Android behavior remain unmeasured. Forced fallbacks exercise UI branches rather than real context loss or OS preference changes.

Review the relative brightness of the face/flow and the prism's typography next. No detailed case-study expansion or deployment is part of this refinement. Earlier crystal/index and refresh evidence describes earlier revisions and remains historical.

# Continuous hero field review — 2026-10-04

## Treatment

One decorative surface contains ambient light, the unchanged portrait and the workflow SVG. A shared circular mask gives all three the same grid origin: 6px desktop, 5px compact. Two broad feathered envelopes dissolve the material at its perimeter. Ambient contrast is 0.30 desktop / 0.28 compact, reduced smoothly at the center to retain a visible bridge without competing with the headline. The blue/purple page gradient continues underneath.

The existing two-input / branch / merge workflow becomes five flat open circles with single dotted contours. Connections stay predominantly orthogonal; input/output continuations fade with the shared field. No labels, halos, spheres, random particles or decorative traveling effects remain.

Artwork width caps at 1440px. Mobile keeps both supporting shapes behind the cube and allows peripheral cropping. Its foreground width changes from 90% to 80% of the stage to expose supporting details. The stage heights remain 300px at 320px, 351px at 390px, 460px at 768px and 540px on wide screens. No extra stacked row or enlarged hero height is introduced. The portrait's face and crossed-arm silhouette remain the original asset; compact overlap deliberately reveals only parts of them and the graph.

## Verification

- Production build (strict TypeScript) and ESLint passed after final refinements.
- English and Chinese checked in the local production preview at 320, 390, 768, 1440 and 2560px. No horizontal overflow; one ready WebGL canvas, five circles, zero rectangular nodes and one shared screen.
- At every width the navigation ends before the artwork starts, and the introduction begins after it ends. Supporting elements overlap the central artwork; the decorative surface has no new pointer targets.
- 2560px viewports retain a 1440px artwork region with quiet margins outside it. Screenshots inspected for gradual perimeter dissolution and readable central text.
- Native drag released cleanly; ArrowRight/Home kept scene focus visible. A mobile wheel over the canvas reached scrollY 768.7, pose 2 and offscreen WebGL pause without overflow. The expanded Deloitte disclosure persisted across locale switching with one canvas.
- Chinese static fallback kept all three lines, loaded portrait and five circles with zero canvas. Reduced motion kept zero canvas, a stationary field and automatic scrolling. No application console errors were captured. Observations are recorded in evidence/continuous-field/interaction-checks.json.

Screenshots and responsive DOM observations are under [evidence/continuous-field](../evidence/continuous-field/). These are Windows browser viewport checks, not physical-phone/GPU measurements. Live cube rotation can give screenshots different poses.

The 2560px evidence uses full-page captures to include both margins beyond the in-app browser's physical window width. Standard desktop/mobile captures show the hero and its introduction.

## Scope

The owner initially requested local implementation only, then approved GitHub commit/push and production publication on 2026-10-05. Deployment through the existing main-branch integration is pending; actual production checks will be recorded below. The prior published revision is 07a29fd. Detailed content stays at the existing visual checkpoint. Earlier active docs are retained under archive/hero-before-continuous-field/docs/ and Git history.

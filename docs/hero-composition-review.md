# Hero composition review — 2026-10-04

The owner confirmed full-face coarse screening, larger desktop supporting layers, metro-style routes, overlapping mobile composition, and removal of visible turn/reset controls.

## Current composition

One image layer renders the supplied cutout with a cool filter and a circular dot mask across the entire face/body. There is no continuous photo base or clean-face mask. Dots repeat at 6px desktop and 5px compact. The source image is unchanged.

Desktop portrait and routes fill more of the 1440px-bounded scene. The workflow has four straight horizontal/vertical/45-degree routes, circular stations and larger interchange rings. On compact screens both layers remain behind the central prism and are clipped within the scene, rather than becoming a row beneath it.

English: Business / Workflows / Systems. Chinese: 业务 x 财务 x 税务 / 自动化工作流 / 数字化系统. The optical texture fits each line independently on stable baselines. The CSS still prism has matching copy and responsive type.

Visible rotation/reset buttons and the idle drag hint are removed. Direct drag/inertia/scroll remain. The focusable scene supports ArrowLeft/ArrowRight/Home with localized instructions and a visible focus outline. Failure-only reload remains available when initialization actually fails or times out.

## Verification

- TypeScript production build and ESLint passed.
- Chinese checked at 320, 360, 390, 768, 1024, 1440, 1920px; English at 320, 390, 768, 1024, 1440, 1920px. No horizontal overflow; zero central buttons in normal mode; one portrait image and an active WebGL scene.
- DOM geometry confirms both supporting layers overlap the central scene vertically and horizontally at compact widths. Their intentional edge cropping stays local to the hero.
- Native desktop drag released cleanly. Keyboard arrows/Home operated from the scene focus target; focus-visible and shortcut metadata were present.
- Wheel over mobile canvas reached scrollY 768 and phase 2, paused WebGL and route signals offscreen. Native Deloitte disclosure and its expanded state persisted across locale switching with one canvas.
- Mobile forced-static branch: no canvas, all three Chinese lines within the viewport, supporting image loaded. Forced reduced-motion branch: zero canvas, no route animation, scrolling auto.
- No application console errors; the existing dependency-level Three Clock deprecation warning remains.

Evidence: evidence/metro-hero/ contains desktop/mobile screenshots in both languages, a mobile static fallback, and responsive DOM observations. Tests use the Windows in-app browser; real phones/GPU/battery behavior remains unmeasured. Screenshots capture different authored interaction poses because rotation continues.

The previous three-part hero review/documents are retained in Git history and locally under archive/hero-before-metro/docs/. Earlier atmosphere and Vercel repair evidence describes its own revision.

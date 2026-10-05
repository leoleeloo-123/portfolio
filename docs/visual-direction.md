# Visual direction — Person, prism, information

Current refinement: 2026-10-04. The owner requested a blue/indigo/violet hero with the portrait outside the cube, central refractive typography and a minimal supporting data-flow field. Detailed project content remains deferred.

## Principles and composition

One bounded digital field surrounds the optical focal point. The portrait and workflow emerge through local brightness within the same orderly dot rhythm; the center remains the strongest contrast and largest gesture. A softly asymmetric envelope dissolves the decorative material before the navigation and introduction, without altering the page gradient.

Desktop keeps the portrait left, workflow right and optical scene in front. The artwork caps at 1440px, retaining quiet space on extra-wide screens. Below 760px the supporting shapes remain behind the center and are partly cropped. The center uses 80% of the available stage width to expose more of the supporting silhouette and circular nodes. The stage height is unchanged. Ordinary browser scrolling is preserved.

## References

Maxime Heckel's homepage informs the fixed compact dock, whitespace, narrow project index, character-scramble titles, hover dimming and stronger upper color. The owner-supplied cube prompt informs six-band optics, rounded geometry and drag/inertia/idle rotation. Workflow/node-editor concepts inform branch/merge structure only, without importing a software interface. Reference branding, article content, images and particle ring are not imported.

## Design system

- Typography: local Manrope variable with system Chinese fallbacks. DOM text retains semantic headings and independent Chinese rhythm; WebGL words are bold at 800, supported by stable DOM equivalents.
- Color: graphite #101114 continues below the hero; hero top #183b91 and middle #131c37 support vivid upper-left blue and upper-right purple. A vertical graphite overlay gradually absorbs the color toward the introduction and lower page. Hero tokens live beside existing type, spacing and surface tokens in src/styles/tokens.css.
- Spacing: 4px foundation, responsive gutters, 720px reading column and hero scene bounded to 1440px. The center occupies half the broad scene; larger portrait and routes fill either side.
- Materials: fine borders, one translucent dock, flat content and a rounded refractive prism. Coarse circular dots cover the entire portrait, including the face, with a lower fade.
- Components: stable project IDs, native details/summary, minimum 44px controls, visible focus, real locale links, no fabricated dates or contact information.

## Portrait, optics and flow

The owner-supplied 1122 × 1402 transparent PNG is served unchanged in one image layer with its cool filter. A single stage-origin circular screen is applied to the combined ambient light, portrait and workflow. The face and crossed-arm silhouette are not regenerated. Desktop dots repeat every 6px; compact dots every 5px. Individual portrait/workflow screens are removed to avoid competing grid origins. No photographic content is sampled by the glass.

The local rounded cube keeps a 2.65 edge and 0.30 bevel. Six spectral bands use front/back power 0.24/0.18 and chromatic intensity 0.35. English lines are Business / Workflows / Systems; Chinese lines are 业财税 / 工作流 / 数字化. Each line fits independently on stable baselines in the optical texture; the static alternative uses the same compact three-line wording.

An opaque cool gradient fills the offscreen optical capture. The final canvas is transparent around the object/type and blends with the full-width CSS atmosphere. This is a composed screen-space approximation, not physical ray tracing. Two render targets remain capped at 2048/1024 and samples at 16/8 with DPR 1–2.

The workflow retains five processing positions with input convergence, branching and an output merge. Each flat circular node has one brighter screened perimeter and an open interior. Horizontal/vertical paths include short incoming/outgoing continuations. The shared ambient dots remain visible through the node interiors and behind the center, with a broad reduction in central contrast. The earlier random-offset particles, independent haze and traveling accents are removed; no software labels, spheres, multiple rings or controls are introduced.

Adjust artwork width, dot spacing/radius, color, contrast, central attenuation and fade stops in src/styles/tokens.css. Responsive offsets, layer opacity, envelope width and center inset are centralized in src/styles/hero-field.css. Two broad feathered mask lobes create a softly varying perimeter; no panel/background rectangle or center cutout is drawn. The optical shaders and interaction code are unchanged.

The viewport uses viewport-fit=cover. Root color fills exposed background, the hero extends to the screen edge, and env(safe-area-inset-*) offsets the dock and reading gutters. A blue theme-color supports Safari chrome. This follows [WebKit's safe-area guidance](https://webkit.org/blog/7929/designing-websites-for-iphone-x/); desktop viewport tests cannot establish actual Dynamic Island/browser-chrome behavior.

## Motion

Drag rotates the prism, release adds inertia and slow idle rotation resumes. Visible turn/reset buttons are removed. The focusable scene supports left/right keys for quarter-turns and Home for reset, with a visible focus outline and localized instructions. Scroll reversibly blends three related poses in ordinary flow; small pointer parallax remains secondary.

The shared field and workflow are static. The hero visibility guard still pauses WebGL offscreen/when hidden. Reduced motion presents a still prism, the same field and complete index text. Renderer failure preserves the same supporting field and readable content. Normal loading reveals the central scene only after localized type and its complete first render are ready; it never substitutes a portrait inside the cube. A 30-second visible loading budget switches to the static prism and offers a reload action if initialization stalls.

Index animation is unchanged: a ten-character resolving window at 30ms per character, brief row staggering, stable glyph slots and original screen-reader text. Hover/focus dims surrounding rows; native disclosures expose provisional summaries.

## Intentionally avoided

Portrait containment in glass, facial deformation, neon outlines, full-screen dashboard decoration, subway maps, large glowing hubs, software widgets, extra workflow labels, ornamental floating animations, generic title fades, invented chronology, remote assets/APIs and detailed demos.

Current review and limits: [continuous-field-review.md](continuous-field-review.md). The owner approved publication on 2026-10-05; production verification is recorded with the current review. Earlier production evidence describes its own revision.

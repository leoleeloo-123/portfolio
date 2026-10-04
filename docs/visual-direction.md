# Visual direction — Person, prism, information

Current refinement: 2026-10-04. The owner requested a blue/indigo/violet hero with the portrait outside the cube, central refractive typography and a minimal supporting data-flow field. Detailed project content remains deferred.

## Principles and composition

The person establishes identity; the prism makes structure and transformation tangible; the right field suggests organized information. The center remains the strongest contrast and largest gesture. The two supporting layers share cool color, dots and gradual blending, with neither competing through text or bright focal spheres.

Desktop uses a broad three-part composition above the centered name/introduction. Below 760px the prism/type keeps its own full-width stage, with a smaller portrait/flow pair beneath. The page then continues into the existing narrow editorial index. Ordinary browser scrolling is preserved.

## References

Maxime Heckel's homepage informs the fixed compact dock, whitespace, narrow project index, character-scramble titles and hover dimming. The owner-supplied cube prompt informs six-band optics, rounded geometry, drag/inertia/idle rotation and quarter-turn controls. The latest supplied portrait and composition prompt establish this new atmosphere and separation of person/object. Reference branding, article content, images and particle ring are not imported.

## Design system

- Typography: local Manrope variable with system Chinese fallbacks. DOM text retains semantic headings and independent Chinese rhythm; WebGL words are bold at 800, supported by stable DOM equivalents.
- Color: graphite #101114 continues below the hero; hero top #192749 and middle #151d31 combine restrained blue and violet radial light. Hero tokens live beside existing type, spacing and surface tokens in src/styles/tokens.css.
- Spacing: 4px foundation, responsive gutters, 720px reading column and hero scene bounded to 1360px. The center occupies half the broad scene; portrait and flow support either side.
- Materials: fine borders, one translucent dock, flat content and a rounded refractive prism. Screened portrait texture is strongest on the silhouette, with a clean face region and lower fade.
- Components: stable project IDs, native details/summary, minimum 44px controls, visible focus, real locale links, no fabricated dates or contact information.

## Portrait, optics and flow

The owner-supplied 1122 × 1402 transparent PNG is served unchanged in two compositing image layers. A cool SVG filter and CSS masks preserve face structure while adding a restrained dot-screen silhouette. Both arms remain recognizable. No photographic content is sampled by the glass.

The local rounded cube keeps a 2.65 edge and 0.30 bevel. Six spectral bands use front/back power 0.24/0.18 and chromatic intensity 0.35, reducing visual noise against the richer atmosphere. The former projected face mask is removed. Localized business/data/systems words remain inside the render pipeline so their contours genuinely refract.

An opaque cool gradient fills the offscreen optical capture. The final canvas is transparent around the object/type and blends with the full-width CSS atmosphere. This is a composed screen-space approximation, not physical ray tracing. Two render targets remain capped at 2048/1024 and samples at 16/8 with DPR 1–2.

The right deterministic point field converges and branches through five fine paths. Three short traveling segments suggest direction without introducing UI widgets, labels or an orb.

## Motion

Drag rotates the prism, release adds inertia and slow idle rotation resumes. Buttons turn ±90° or reset to the current authored pose. Scroll reversibly blends three related poses in ordinary flow; small pointer parallax remains secondary.

The hero visibility guard pauses WebGL and flow animation offscreen/when hidden. Reduced motion presents a still prism, stationary flow and complete index text. Renderer failure preserves the same DOM portrait and readable content. Normal loading reveals the central scene only after localized type and its complete first render are ready; it never substitutes a portrait inside the cube. A 30-second visible loading budget switches to the static prism and offers a reload action if initialization stalls.

Index animation is unchanged: a ten-character resolving window at 30ms per character, brief row staggering, stable glyph slots and original screen-reader text. Hover/focus dims surrounding rows; native disclosures expose provisional summaries.

## Intentionally avoided

Portrait containment in glass, facial deformation, saturated neon, full-screen dashboard decoration, large glowing hubs, extra workflow labels, ornamental floating animations, generic title fades, invented chronology, remote assets/APIs and detailed demos.

Current review and limits: [hero-composition-review.md](hero-composition-review.md). The owner can next tune the brightness balance, portrait screening and mobile supporting scale.

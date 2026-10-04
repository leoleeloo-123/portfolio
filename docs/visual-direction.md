# Visual direction — Person, prism, information

Current refinement: 2026-10-04. The owner requested a blue/indigo/violet hero with the portrait outside the cube, central refractive typography and a minimal supporting data-flow field. Detailed project content remains deferred.

## Principles and composition

The person establishes identity; the prism makes structure and transformation tangible; the right field suggests organized information. The center remains the strongest contrast and largest gesture. The two supporting layers share cool color, dots and gradual blending, with neither competing through text or bright focal spheres.

Desktop uses a broad three-part composition with larger supporting layers above the centered name/introduction. Below 760px the portrait and routes keep their left/right positions behind the central prism. Their edges deliberately extend past the stage and are clipped locally; they never become a separate row below it. Ordinary browser scrolling is preserved.

## References

Maxime Heckel's homepage informs the fixed compact dock, whitespace, narrow project index, character-scramble titles, hover dimming and stronger upper color. The owner-supplied cube prompt informs six-band optics, rounded geometry and drag/inertia/idle rotation. Workflow/node-editor concepts inform branch/merge structure only, without importing a software interface. Reference branding, article content, images and particle ring are not imported.

## Design system

- Typography: local Manrope variable with system Chinese fallbacks. DOM text retains semantic headings and independent Chinese rhythm; WebGL words are bold at 800, supported by stable DOM equivalents.
- Color: graphite #101114 continues below the hero; hero top #183b91 and middle #131c37 support vivid upper-left blue and upper-right purple. A vertical graphite overlay gradually absorbs the color toward the introduction and lower page. Hero tokens live beside existing type, spacing and surface tokens in src/styles/tokens.css.
- Spacing: 4px foundation, responsive gutters, 720px reading column and hero scene bounded to 1440px. The center occupies half the broad scene; larger portrait and routes fill either side.
- Materials: fine borders, one translucent dock, flat content and a rounded refractive prism. Coarse circular dots cover the entire portrait, including the face, with a lower fade.
- Components: stable project IDs, native details/summary, minimum 44px controls, visible focus, real locale links, no fabricated dates or contact information.

## Portrait, optics and flow

The owner-supplied 1122 × 1402 transparent PNG is served unchanged in one image layer. A cool SVG filter and a single repeating circular mask cover face and body uniformly. The former continuous base and clear-face mask are removed. Desktop dots repeat every 6px; compact dots every 5px. No photographic content is sampled by the glass.

The local rounded cube keeps a 2.65 edge and 0.30 bevel. Six spectral bands use front/back power 0.24/0.18 and chromatic intensity 0.35. English lines are Business / Workflows / Systems; Chinese lines are 业财税 / 工作流 / 数字化. Each line fits independently on stable baselines in the optical texture; the static alternative uses the same compact three-line wording.

An opaque cool gradient fills the offscreen optical capture. The final canvas is transparent around the object/type and blends with the full-width CSS atmosphere. This is a composed screen-space approximation, not physical ray tracing. Two render targets remain capped at 2048/1024 and samples at 16/8 with DPR 1–2.

The right field has five abstract processing blocks with input convergence, branching and an output merge. Horizontal/vertical connections and small ports establish workflow logic. A 6px circular screen breaks both blocks and links into dots; a sparse stable particle field gains density around nodes and dissolves at the edges. A softly blurred offset layer adds depth. Three slow traveling dotted accents suggest activity. There are no station rings, transit routes, interface labels or software screenshots. The right element shares cool light, screening and gradual fade with the portrait.

The viewport uses viewport-fit=cover. Root color fills exposed background, the hero extends to the screen edge, and env(safe-area-inset-*) offsets the dock and reading gutters. A blue theme-color supports Safari chrome. This follows [WebKit's safe-area guidance](https://webkit.org/blog/7929/designing-websites-for-iphone-x/); desktop viewport tests cannot establish actual Dynamic Island/browser-chrome behavior.

## Motion

Drag rotates the prism, release adds inertia and slow idle rotation resumes. Visible turn/reset buttons are removed. The focusable scene supports left/right keys for quarter-turns and Home for reset, with a visible focus outline and localized instructions. Scroll reversibly blends three related poses in ordinary flow; small pointer parallax remains secondary.

The hero visibility guard pauses WebGL and flow animation offscreen/when hidden. Reduced motion presents a still prism, stationary flow and complete index text. Renderer failure preserves the same DOM portrait and readable content. Normal loading reveals the central scene only after localized type and its complete first render are ready; it never substitutes a portrait inside the cube. A 30-second visible loading budget switches to the static prism and offers a reload action if initialization stalls.

Index animation is unchanged: a ten-character resolving window at 30ms per character, brief row staggering, stable glyph slots and original screen-reader text. Hover/focus dims surrounding rows; native disclosures expose provisional summaries.

## Intentionally avoided

Portrait containment in glass, facial deformation, neon outlines, full-screen dashboard decoration, subway maps, large glowing hubs, software widgets, extra workflow labels, ornamental floating animations, generic title fades, invented chronology, remote assets/APIs and detailed demos.

Current review and limits: [hero-composition-review.md](hero-composition-review.md). The owner can next tune the brightness balance, portrait screening and mobile supporting scale.

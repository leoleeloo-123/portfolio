# Visual direction — Crystal portrait and editorial index

Current revision: 2026-10-04. The owner asked to restore the supplied cube's optical/interaction signature and Maxime's compact animated list before changing content. This supersedes the gentler portrait/parallax version. The first milestone remains a local visual checkpoint before detailed case studies.

## Visual principles

One distinctive object anchors a quiet, single-column page. Technology should be tangible in the crystal and character transitions, while typography, side space and straightforward scrolling keep the page professional. The current revision gives those two signature effects more presence; it does not expand the number of sections.

A centered fixed dock, cube, name and short introduction lead into a narrow project index. Desktop and phone share the same reading order. The design system continues to use local Manrope, independent Chinese type sizing, graphite surfaces and a restrained cool accent. The crystal alone can produce brighter white highlights and blue/yellow optical fringes.

## Reference rationale

[Maxime Heckel's homepage](https://blog.maximeheckel.com/) informs the narrow reading column, floating navigation, generous side space and compact chronological index. Its [list implementation](https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/main/core/features/ArticlesSection/ArticleSection.tsx) and [character component](https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/main/core/components/ScrambledText.tsx) confirm a character-scramble reveal and hover dimming. These are now implemented as our own small bilingual component rather than substituted with upward fading. Reference branding, articles and particle ring are not imported.

The supplied Design World prompt defines the glass optical recipe and manipulation: six spectral bands, front/back refraction, luminous rounded edges, corner-first composition, drag/inertia, slow idle rotation and quarter-turn buttons. Its large background typography is part of WebGL so it can visibly refract. We preserve these mechanisms in the React/Vite app, adapting the background words and portrait to Leo's page rather than importing the prompt's entire full-screen navigation/slider layout.

## Design system

- Type: locally bundled Manrope variable, system Simplified Chinese fallbacks. Body 400; index titles 450; labels 400–500; the refracted background is deliberately bold at 800. Main name and essential copy remain ordinary DOM text.
- Palette: graphite #101114, surface #181a1f, foreground #f1f2f4, muted #a4a8b2, fine border #30333a and cool accent #b4c7ec. Strong white and spectral color belong primarily to the glass.
- Spacing: 4px base rhythm, responsive gutters, 720px reading column, opening bounded to 1100px and scene to 820px. Index rows are approximately 56–58px tall when closed. Mobile retains a single line per tested title.
- Surface: one translucent navigation dock, flat text content, few hairline separators. The index uses a small year column, title, short kind label and disclosure arrow; it avoids card backgrounds and connecting timeline rules.
- Conventions: stable project IDs, semantic headings, native details/summary, real navigation/locale links, minimum 44px controls and visible focus. No invented dates, contact links or outcomes.

## Crystal and portrait

A locally generated rounded cube has a 2.65 edge and 0.30 bevel radius. The initial Euler pose is [-0.42, 0.62, 0.18], matching the prompt's stronger multi-face angle. Two related scroll poses change angle, scale and portrait depth reversibly within the opening.

The owner's transparent image remains a camera-facing flat photographic plane inside the rotating shell. A soft procedural blue atmosphere complements large localized BUSINESS / DATA / SYSTEMS or 业务 / 数据 / 系统 words behind the object. Clear typographic contours provide optical detail that a blurred background alone could not show.

The two-target screen-space material now uses six spectral bands, refraction power 0.30/0.22, chromatic 0.5, saturation 1.08 and white Fresnel/specular light. Face protection is a small projected ellipse that reduces displacement and highlights around the face. The previous global clear window is removed so the other surfaces retain stronger distortion. The material is an approximation rather than physical ray tracing.

Desktop/narrow canvases use 16/8 samples and target edges bounded to 2048/1024, with DPR 1–2. Intermediate render color remains linear, output sRGB, and non-float buffers remain a fallback. Texture creation/disposal and language-change subscriptions are owned at the imperative scene boundary, so translated words update without resetting the object.

## Animation philosophy

Motion should reveal the object's volume and make short text feel as if it is resolving into information. Mouse drag uses world-space quaternion rotation; release continues with damped angular velocity. After 0.6 seconds the prompt's slow idle rotation blends back in. Buttons smoothly turn ±90° or return to the current scroll pose. Small pointer parallax remains secondary to manipulation.

Ordinary browser scrolling drives three related poses while the hero leaves normal flow. There is no scroll interception or long empty animation runway. The visible scene renders for its intentional idle rotation; visibility guards pause it offscreen or while the document is hidden. Physical-device performance remains unmeasured.

Index titles and short labels use a moving ten-character scramble window at 30ms per character, with a small row stagger. Completed characters stay fixed. Each original glyph reserves its layout slot, and screen readers receive only the stable original text. Short prototype titles naturally resolve faster than long article headlines. Hover/focus dims surrounding rows to 50%; native disclosures reveal existing brief summaries.

On phones, horizontal manipulation and button controls coexist with pan-y vertical scrolling. Mouse wheel scrolling over the canvas was tested; real touch behavior still needs device review. Reduced motion shows the static portrait and complete list text immediately. Renderer failure alternatives preserve the portrait, background words and accessible content. Normal loading reserves the scene area without a static portrait; the complete first 3D frame fades in over 180ms once ready.

## Content and future growth

Tax Engine, Deloitte and Navi Material CRM remain the three provisional entries. All year fields remain null and one shared em dash occupies the year column with an accessible pending label. Verified years can group adjacent rows later. The current order is not a confirmed chronology.

Typed content records, translated strings, index components and the scene remain separate. Future Deloitte workflows, Tax Engine demos, CRM and Fitness OS can grow from their stable IDs after visual approval. The original source photograph and image-processing record remain unchanged.

## Intentionally avoided

Adding more sections before the signature effects are reviewed; replacing scramble with generic fading; weakening the entire material to protect the face; decorative motion unrelated to interaction; importing reference branding or content; fabricated chronology; fake contact/demo links; private records or project access; external model/font/CDN dependencies; backend, deployment or public previews. Repository synchronization was separately authorized on 2026-10-04.

## Review checkpoint

The owner should review crystal identity, drag/idle tempo, face clarity, compact index rhythm and deliberate phone composition. Current verification and limitations are in [reference-alignment-review.md](reference-alignment-review.md); evidence is under evidence/reference-alignment/. Previous portrait, abstract-glass and nine-module captures are retained only in the local ignored archive. The owner has approved the current visual base; future design refinements remain possible. Detailed case studies continue to wait for visual approval.

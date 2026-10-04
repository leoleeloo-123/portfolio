# Portrait asset provenance

The owner supplied a professional headshot and authorized cropping and background removal on 2026-10-03.

- Public derivative: `public/images/leo-portrait.png`, 1122 × 1402, RGBA, 2,034,462 bytes. Actual transparent and partially transparent pixels were inspected.
- Method: built-in imagegen background-removal edit with transparency enabled. The runtime serves the resulting local image; it calls no image service.
- The portrait retains hair, shoulders and upper torso. This was a generative edit; fine edges and facial fidelity should be compared with the original, rather than assumed to be pixel-identical.
- The unchanged original and full edit record are retained in the Git-ignored local archive. They are not website assets.
- The cube's diffuse blue/teal atmosphere is generated in code at a separate depth from the portrait.

Manrope is bundled locally from `@fontsource-variable/manrope`. Its OFL-1.1 notice is retained at `public/licenses/manrope-OFL.txt`. Chinese uses system font fallbacks.

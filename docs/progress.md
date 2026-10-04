# Progress — 2026-10-04

## Current checkpoint: coarse portrait and metro-style hero

Implemented the owner's confirmed adjustments: full face/body dot mask, larger desktop portrait and workflow, straight metro-style lines with circular stations, and compact overlapping side layers behind the Cube. Removed visible rotation/reset buttons while preserving direct manipulation, keyboard arrows/Home, idle/inertia and reversible scroll poses.

Scene text now matches the owner's supplied English and Chinese lines. Longer copy fits independently per line in the refractive texture and the static alternative. The 30-second visible loading budget and Vercel locale/slash repair remain.

Build and lint passed. Responsive, real WebGL, keyboard focus, native drag/scroll, offscreen pause, disclosure/locale retention and static/reduced branches were checked. See hero-composition-review.md and evidence/metro-hero/ for the actual sizes and evidence. Physical-phone/GPU performance remains unmeasured. Detailed case studies remain deferred.

## Repository and hosting history

The owner authorized GitHub synchronization and repair of their existing Vercel project leo-li. Prior production routing/loading revision be66308 passed HTTP and browser checks; evidence-only commit 76f1fa0 also deployed READY. The current design commit 0e23b38 deployed READY as dpl_5a2iRXiNTykAU8zQJ5QPnpwMro8A. Both locale URLs and the current JS/CSS/scene/portrait assets returned 200 with correct MIME types; missing JS remained 404. Live English desktop and Chinese 390px WebGL scenes reached ready with the new copy, one dotted photo, no central buttons or horizontal overflow, and no application console errors. See evidence/metro-hero/production-* for screenshots and HTTP results. No additional cloud projects or backend were created.

The earlier crystal/index base is preserved at 51b748f. Drafts, unused source and original assets remain archived and ignored. Previous active documents are copied under archive/hero-before-metro/docs/. README remains the run/edit/documentation index; older screenshot folders describe their historical revisions.

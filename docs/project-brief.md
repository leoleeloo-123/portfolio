# Project brief

Leo Li / 李存弘宇 — Professional Interactive Systems Portfolio.

Narrative: Finance & Accounting → Data → Automation → Tax Technology → AI-enabled Systems. Communicate business understanding, individual contribution and usable, maintainable systems without invented engineering titles or self-deprecating framing. Experience balance approximately 80% professional communication and 20% distinctive interaction.

## Milestone 1 — current authorized direction

Build a polished local portrait prototype: compact fixed navigation, one centered interactive crystal cube containing the owner's portrait, a simple bilingual introduction, three provisional index rows and a minimal closing. The page uses one vertical reading column with generous side space. On 2026-10-04 the owner requested closer fidelity to the supplied cube prompt and Maxime's list: stronger spectral refraction, bright refracted background type, drag/inertia/idle rotation, and a compact index with character-scramble reveals and hover dimming. Three related reversible scroll poses remain within the opening hero. This replaces the earlier gentle portrait treatment and long sticky narrative.

Validate overall visual language, portrait clarity and interaction quality before adding detailed content. Keep essential text in the DOM, show a portrait by default on phones, and retain ordinary scrolling. Protect face readability locally without weakening the whole glass material. Titles and short labels resolve from scrambled characters once in view; rows can expand to show existing provisional summaries. Stop for visual review before detailed demos or case studies.

Required stack: React, strict TypeScript, Vite, Tailwind, i18next/react-i18next, Motion, Three.js/React Three Fiber. Small modular app with separate UI, scene configuration, content and translations. No monorepo or backend. npm lockfile only. Check dev and production preview.

## Localization and accessibility

`/en/`, `/zh/` (`zh-Hans` document metadata), explicit URL priority, saved preference then browser language at `/`, English fallback. Locale switch preserves the intro/timeline row/about reading position, recalculates layout, and does not remount the canvas. Stable anchors, keyboard controls, ordinary scroll, reduced motion and WebGL failure alternatives retain the portrait and DOM text. Target widths 320, 360, 390, 768, 1024, 1440, 1920 in both languages; actual checks for each revision belong in its review record and browser emulation must be distinguished from real phones.

## Content status

Owner-supplied background: USC Accounting and Business Administration, Applied Analytics minor; Deloitte tax technology consulting, automation and review workflows; current Tax Engine work; Navi Material CRM and Fitness OS project directions. Prototype copy is concise and provisional. No private project access is authorized.

The current index has Tax Engine, Deloitte and Navi Material CRM entries. Their typed `year` fields remain `null`; one shared em dash occupies the year column, with an accessible unconfirmed-year label. Verified years will group adjacent entries automatically. The order establishes visual rhythm and is not a confirmed chronology. Fitness OS remains a future module.

The owner supplied `professional headshot.jpg` for cropping and background removal. Its unchanged original is retained in the Git-ignored local archive; `public/images/leo-portrait.png` is the local transparent derivative used in the prototype. Processing details belong in asset-processing.md.

Pending: public chronology for the timeline; Deloitte final transition date; current public job title/dates; credentials' active status; quantitative outcome publication context; contact details. Do not show Deloitte as current employer or invent missing details. No real business, customer, employee, financial or health data. No credentials in client assets.

## Boundaries and future growth

On 2026-10-04 the owner approved the current visual base and authorized syncing this project to `leoleeloo-123/portfolio`. Preserve repository history, keep the archive local and ignored, and do not change repository visibility. Deployment, public previews, cloud resources, backend and live APIs remain outside scope.

Future modules: Deloitte workflow visualization, Tax Engine synthetic SaaS demonstration, Navi Material CRM showcase, Fitness OS AI interaction demo. Future publication review: both locales on both hosting targets, route fallback, localized metadata, discoverable language links, prerender/SEO, domain and mainland hosting requirements. No production domain assumed.

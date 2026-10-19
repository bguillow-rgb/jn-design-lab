# richroll.com — Structural & Design Anatomy (Recon Spec)

Recon date: 2026-10-19. Method: live inspection in browser (desktop ~1026px viewport + 768px tablet emulation), computed styles via `getComputedStyle`, DOM/network inspection. This documents PATTERNS, measurements and behaviors only — no code, text, or assets were copied. All quoted strings below are cited as observations, not content to reuse. We will build an original implementation with different fonts, colors, imagery and copy.

Platform context (for pattern translation only): WordPress + Salient theme + WPBakery + "Nectar Slider" + WooCommerce + Smart Podcast Player. We are NOT replicating the stack — just the patterns, in our own static build.

---

## 1. Homepage section order (top to bottom)

| # | Section | Purpose | Bleed | Background | Height (desktop) |
|---|---------|---------|-------|------------|------------------|
| 0 | Persistent audio player bar | Latest podcast episode, always playable | full-bleed, fixed to bottom of viewport, all pages | dark gray (#2A2A2A), thumbnail left, green play button center | ~64px fixed bar |
| 1 | Hero (video) | Brand statement + route to podcast | full-bleed, 100vh | muted looping video reel, near-black overlay | 100vh (~878px) |
| 2 | Latest episodes grid | Funnel to podcast | contained grid on full-width band | white → very light gray vertical gradient (#FFF → #F7F7F7) | ~508px |
| 3 | Latest book feature | Sell the current book | full-bleed | near-black with large B&W photo of the person at work + diagonal gradient wash | ~693px |
| 4 | Pull-quote band | Credibility/mission statement + 2 CTAs | full-bleed | solid brand-bright yellow with a faint tone-on-tone topographic/contour line pattern | ~525px |
| 5 | About teaser | Who he is, route to full bio | full-bleed dark; content is a floating white card | black textured background (dark paper-grain image) with subtle dark gradient overlay (#232323 → #000, 80% opacity); white 2-col card floats centered with visible dark margin all around | ~1100px |
| 6 | Product feature (meal planner) | Sell the subscription product | contained on full-width band | white → light gray gradient | ~712px |
| 7 | Footer | Logo, newsletter, social, legal | full-bleed | faded landscape photo (desert/Joshua trees) washed to ~15–20% opacity under a near-white veil | ~700px |

Rhythm to copy: **dark (hero) → light → dark → saturated accent color → dark-with-white-card → light → light-with-photo-wash footer.** Strict alternation; every dark section uses photography, every light section is flat/gradient.

## 2. Hero

- **Media**: HTML5 `<video>`, two sources: WebM first, MP4 fallback. Single file served at all breakpoints. Intrinsic size 1800×700, scaled to cover 100vh (object-cover behavior via JS sizing). File is a "reel": multiple short scenes cut together (swimming, trail running tying a shoe, podcast studio), desaturated/moody grade. Compressed ("-compressed" filename); served from same origin, not a video CDN, no HLS.
- **Attributes**: `autoplay loop muted playsinline preload="auto"`. No poster attribute set (a gap — our build should always set `poster`).
- **Overlay**: a separate overlay div over the video, solid #0A0A0A at **opacity 0.6**. No gradient on the home hero (gradients are used on inner-page heroes instead).
- **Caption**: centered horizontally and vertically (x-centered block starting ~45% down the viewport). Stack, all centered:
  1. H2 headline, white, 46.4px/54.4px, weight 600, letter-spacing 0.4px, sentence case.
  2. Sub-line, white, 18px, weight 500, letter-spacing wide (~2px rendered), ALL CAPS.
  3. Ghost button: transparent bg, 2px solid rgba(255,255,255,0.7) border, white text 15px, padding 16px 40px, square corners (0 radius).
- **Slider config** (behavioral spec): fade transition, autorotate every 8000ms, fullscreen height, caption animates "fade in from bottom" on load, Ken Burns slow zoom on image slides, parallax on background only (bg scrolls slower than caption as you leave the hero). Only one slide was live at recon — the "slider" machinery is there but used as a single rotating-scene video hero.
- **Scroll cue**: a down-arrow element exists at hero bottom.
- **Mobile (≤999px CSS)**: parallax and Ken Burns transforms disabled; caption persists; H2 forced to 33px/57px with -0.5px letter-spacing; sub-line 13px/26px; buttons shrink. Video is NOT swapped to a poster via CSS — playsinline muted video keeps playing on mobile. **Our build: same inline video on mobile but with a real poster frame fallback and `prefers-reduced-motion` honoring.**

## 3. Navigation

Two distinct header states:

**State A — top of page (transparent over hero):**
- Header is `position: fixed`, fully transparent, white content, sits over the hero.
- Desktop ≥1000px layout = "centered logo, menu on a bar below" format, total ~177px tall:
  - Row 1: social icon links far left (6 small line icons ~14px), centered logo (white mark, ~100px wide), search icon + account icon far right.
  - Row 2: centered horizontal menu — 6 items, ALL CAPS, 16px... rendered ~13–14px, weight 600, letter-spacing 1px, white, ~30px gaps. Last item ("ABOUT") has a chevron + dropdown with 4 child links.
- **State B — scrolled**: same fixed header collapses to a single compact white bar (~60px): logo becomes a black square tile flush left (white mark on black box), menu items turn dark gray/black, bar gets a subtle shadow. Transition is a quick fade/slide. (Theme flag: user-set bg #ffffff, not permanently transparent.)
- **Mobile/tablet ≤999px**: logo moves to the left corner (stays white over hero), desktop menu hidden; right cluster = search icon, account icon, 3-line hamburger. Hamburger opens an **off-canvas panel sliding in from the right**, ~360px wide (~half of a 768px screen), solid black, full height; the page content itself shifts/scales left behind it ("material" style push). Panel contents: big left-aligned white links (Title Case, ~28px, weight 600, generous ~20px vertical rhythm), expandable About row with chevron, row of white circled social icons below, X close icon top-right. 
- Search = full-screen overlay triggered from the magnifier icon ("hit enter to search / ESC to close" pattern).

## 4. Type system

Two-family system — **one geometric sans for all display/UI, one serif for all reading prose**:

- Display/UI sans: **Montserrat** (weights seen: 500, 600, 700).
- Prose serif: **Source Serif Pro** (400).

For Joe we choose different-but-equivalent Google Fonts, e.g. sans: Archivo / Figtree / Sora / Manrope (geometric-grotesque with a 600–700 that holds at 60px); serif: Source Serif 4 sibling alternatives — Lora, PT Serif, Spectral, or Newsreader.

Measured scale (desktop):

| Role | Family | Size/Line | Weight | Case/Spacing | Color |
|---|---|---|---|---|---|
| Hero H2 | sans | 46.4/54.4 | 600 | sentence case, +0.4px | #FFF |
| Page-title H1 (archive, episode) | sans | 62/64 | 600 | — | #000 or #FFF on photo |
| Section H2 (feature sections) | sans | 45/52 | 700 | sentence case | #000 or #FFF |
| Section H2 (band intro, e.g. episodes) | sans | 36/46.8 | 700 | — | #000 |
| Pull-quote | sans | 27/37.8 | 600 | sentence case | #000 on yellow |
| Card title (archive) | sans | 27/37.8 | 600 | — | #000 |
| Card title (home episode grid) | sans | 20/30 | 600 | — | #000 |
| Eyebrow/label (H5) | sans | 15.2/22.8 (17px on episode hero) | 600 | ALL CAPS, +1px | accent color (yellow on dark, green on light) |
| Episode hero sub (H4) | sans | 18/27 | 500 | caps, +2px | #FFF |
| Body prose | serif | 18/29 | 400 | — | #000 |
| Card date / fine print | serif | 13/18 | 400 | — | #000 |
| Footer legal | serif | 14/22 | 400 | — | #0A0A0A |
| Nav links | sans | ~13–16 | 600 | ALL CAPS, +1px | #FFF / #000 |
| Buttons | sans | 14–15 | 600 | none (sentence/title case) | varies |

Notes: headings are never letter-spaced except the hero (+0.4) and eyebrows (+1 to +2). Body copy is 100% serif sitewide — that serif/sans split is the core typographic identity. Bullet lists inside articles render serif italic.

## 5. Color system

- **Paper**: #FFFFFF, with frequent subtle vertical gradient to #F7F7F7 on light bands.
- **Ink**: #000000 body text (true black), #0A0A0A for near-black surfaces/overlays.
- **Dark sections**: #000 base + photographic texture (paper-grain image on about band; B&W photo on book band) + gradient overlays (linear #232323→#000 at 0.8; diagonal 135° rgba(84,84,84,.57)→transparent at 0.8 on photo sections).
- **Accent 1 — green #0ED068**: functional accent. Inline text links in prose, category labels on cards, light-section eyebrows, circular platform buttons (Apple/Spotify/YouTube), commerce buttons (View product, cart, 404 button), audio play button, hand-drawn signature SVG, animated title highlight bars.
- **Accent 2 — coral #FB6449**: primary CTA fill (About bio button, meal-planner Learn More). Used sparingly — one coral button per section max.
- **Accent 3 — bright yellow (#FEF400 family)**: eyebrow text on dark photo sections AND a full section background (quote band) with a tone-on-tone contour-line pattern.
- Buttons on yellow: solid black fill (white text) + black 2px outline ghost — the yellow band swaps the palette to black-on-yellow.
- Grays: #2A2A2A player bar, #333 cart text, #DDD empty states, rgba borders at 0.7–0.75.

Pattern to copy: **one hero accent per surface-type** (green = interactive/UI, coral = conversion, yellow = editorial shout), never all three in one section; dark sections always get photographic texture rather than flat black.

## 6. Component patterns

**Episode/post card (home grid, 3×2):**
- Image: wide branded episode graphic, 1280×525 source (2.44:1), rendered ~257×105 in grid. The graphic itself carries: B&W/duotone guest still, show wordmark small top-left, guest name in big condensed white caps along the bottom. Below image: title (20/30, sans 600). No border, no radius, no shadow; whitespace-separated. Hover: subtle `all` transition on item + image (opacity/translate nudge).
- Archive variant (podcast page, 3-col masonry): image on top; green category label (serif 18, green); title 27/37.8 sans 600; serif excerpt 18/29; serif date 13px. Cards fade/slide in on scroll with stagger. Pagination: numbered + "Next".

**Buttons (square-cornered, 0 radius sitewide):**
- Ghost on dark: 2px solid rgba(255,255,255,0.7), white text, padding 16px 40px.
- Ghost on light/yellow: 2px solid rgba(0,0,0,0.75) (or rgba(35,35,35,.75)), dark text, padding 13px 35–46px.
- Solid dark: #000 fill, white text, padding 15px ~40px, with a small **arrow (→) that sits to the right and slides in on hover** (asymmetric padding 39px right / 46px left reserves arrow space; arrow + label shift on hover).
- Solid coral: #FB6449 fill, white text, same arrow treatment.
- Commerce green: #0ED068-family fill, white text, slightly rounded (~4px), full card width ("View product"), also used on 404 "Back Home".
- Circular platform buttons: 64–72px green circles with white brand glyphs (podcast platforms), row of 3, centered.

**Eyebrow/label**: H5, ALL CAPS, +1px tracking, 15.2px, 600, colored (yellow on dark / green on light), 1 line, sits 8–16px above its headline. Variant: "animated title" — a green highlight bar wipes across/behind the label text on scroll-into-view (used for page titles and the About chip).

**Image treatments**: no rounded corners anywhere except product buttons; photography is either (a) full-bleed section background in B&W/desaturated grade with dark overlay, (b) straight rectangular inline image, or (c) white-card split where the photo fills the right half of the card edge-to-edge. Book covers get light-gray studio-shot backgrounds. One signature flourish: a hand-drawn green autograph/scribble SVG as an article sign-off.

**Footer anatomy (all pages):**
1. Centered logo (black version, ~140px).
2. Centered uppercase letterspaced label line ("subscribe" prompt).
3. Embedded newsletter card (3rd-party embed, ~480px wide): avatar, name, blurb, subscriber count, inline email input + green rounded Subscribe button, legal fine print.
4. Row of 6 social icons, each a ~40px circle with 1px dark outline, transparent fill.
5. Serif Terms link + serif copyright line.
Background: landscape photo faded under near-white wash; everything centered, generous vertical padding (~700px total).

**Floating elements**: round share FAB bottom-right on article pages (green on hover); green cart tab fixed to right edge on commerce pages; persistent bottom audio player bar on every page (episode art 48px, show label gray, title white bold, skip ±15/60 buttons, green circular play, progress rail).

## 7. Imagery style

- Hero/section photography is **cinematic, desaturated-to-B&W, candid in-action** (training, studio work) — never posed headshots on white.
- Dark bands: person shown mid-task, cropped tight, face often partially out of frame; headline text sits in the photo's negative space (left-aligned against a dark area).
- Text-over-image always gets an overlay: solid near-black 0.6 on video; gradient washes (diagonal or vertical) on stills.
- The About card splits: left 50% white with text, right 50% photo full-bleed to the card edge (portrait crop, subject facing into the text).
- Episode art is a manufactured template: wide 2.44:1, duotone/B&W still + white condensed caps name — makes a grid of disparate guests look uniform.
- Footer uses a *light* photo wash (opposite of hero) — same photo-as-texture idea at both ends of the page.

## 8. Motion

- Hero: autorotating scenes (8s), fade transitions, caption fades in from bottom on load, Ken Burns slow zoom, parallax background-only scroll. All disabled ≤999px.
- Scroll-triggered entrances: ~24 elements per page with fade-in-from-bottom animations, staggered per grid column (cards rise ~30px + fade, ~0.6–0.8s ease, anime.js-class easing).
- Animated title highlight: green bar wipes behind page titles / section chips when they enter viewport.
- Header morph on scroll: transparent-tall → white-compact.
- Button hover: arrow slide-in + background/color transition (~0.2–0.3s); card hover: slight lift/opacity.
- Image fade-in on lazy load ("img-with-animation").
- Nothing scroll-jacked; no horizontal scroll sections.

## 9. Page templates

**Archive template (podcast listing):** flat white; small "Category" kicker over a 62/64 black H1; full-width hairline rule; 3-col card grid (anatomy above); numbered pagination; standard footer. No hero image — the typography IS the hero.

**Article/episode template:** 
1. Full-bleed photo hero (~675px): color guest photo, light darkening, centered stack = outlined circular play button (opens video lightbox) → eyebrow "EPISODE #N" (17px caps white +1px) → H1 62/64 caps white → sub-line 18px caps +2px white → row of 3 green circular platform buttons.
2. Single centered text column ~727px: serif 18/29 prose, green inline links, bold sans intro labels, serif-italic bullet lists.
3. Sign-off: green signature scribble.
4. Centered "Listen, Watch, & Subscribe" H3 between hairline rules + 3 green platform circles again.
5. Full-width product cross-promo image + code/CTA.
6. Tab set: Sponsors / Show Notes / Related Episodes / Support — tabbed content block, serif prose inside.
7. Share FAB floating bottom-right. Standard footer.

**About/bio template:** dark photo page-title hero (title with green animated highlight) → white band with big left-aligned sans H2 kicker ("full story" headline) → **two-column magazine layout of serif prose** (CSS columns, ~45/45 split), green inline links, bold pull-lines and a centered quote-with-attribution break mid-page. Press mentions woven into prose as green links. Standard footer.

**Commerce template (books):** dark photo page-title hero → white "Book Selection" centered H2 → 3-col product grid: studio-shot cover, thumbnail strip, serif title 20px, serif price, full-width green button; orange "SOLD OUT" badge variant; floating cart tab right edge → "Listen Watch Subscribe" cross-promo band → footer.

**404:** giant black 62px+ numerals, sans "Page Not Found", single green button. Charming, on-system.

---

## Build notes / gaps to improve on (not copy)

- They ship no `poster` on the hero video and autoplay can be blocked → render first video frame as poster + respect `prefers-reduced-motion`.
- Site sits behind a bot-challenge (mobile UA tripped a "confirm you are human" interstitial during recon) — irrelevant to our static build.
- Their H1 structure is inconsistent (hero headline is an H2). Ours: one H1 per page.
- Their nav is 177px tall at top — we can get the same two-row feel in ~120px.
- The persistent audio player is a plugin; for Joe we'd only build an equivalent if/when there's recurring audio content.

---

## Mapping suggestions for Joe

| Rich Roll pattern | Joe Neiman application |
|---|---|
| **100vh video hero** (muted looping reel of him *doing things*, dark overlay, 1-line identity statement + 1 ghost CTA) | Joe's reel: aviation footage (his photography + flying), dealership/auction floor, stage moments from speaking. The **IDA commercial is the ready-made hero reel source** — cut a 30–45s muted loop from it. Headline = Joe's one-line identity; CTA → Speaking. |
| **Latest episodes grid** (uniform branded 2.44:1 cards, 3-col, "view all") | **Ventures grid** — one card per venture/company with a templated duotone graphic + wordmark treatment so disparate logos look uniform. Alternatively "Latest writing" if the blog becomes the cadence engine. |
| **Latest book dark feature band** (B&W photo of him at work, yellow eyebrow, huge title, product shot, play button) | **The book/writing feature** — same anatomy: B&W photo of Joe speaking or at the auction block, accent eyebrow ("NEW TALK" / "THE BOOK"), embedded play button opening the IDA commercial or a keynote sizzle. |
| **Yellow pull-quote band with 2 CTAs** | Joe's philosophy/mission quote (the giving thesis or the operator credo) in an accent-color band with contour/topo pattern — CTAs → Giving + Speaking. Topo pattern maps nicely to aviation charts. |
| **Dark band + floating white About card (text left / photo right, chip label, coral CTA)** | **About Joe teaser** — his arc (Copart → entrepreneur → investor/philanthropist), portrait right, "Full Story" CTA to /about. Use an aviation photo as the dark textured backdrop instead of paper grain. |
| **Product feature (meal planner) split: photo+play left, big H2 + serif bullets + coral CTA right** | **Speaking offer** — keynote topics as the 3 serif bullets, sizzle-clip play button on the photo, CTA → booking. (This is the money section; keep the coral/accent fill exclusive to it.) |
| **Photo-washed footer with newsletter embed + circled social icons** | Footer with one of Joe's own **aviation photographs** as the faded wash (signature move: his art literally underpins every page), newsletter signup, socials, legal. |
| **Episode page template** (photo hero + centered eyebrow/H1/platform buttons, 727px serif column, tabs, signature sign-off) | **Essay/talk detail page** — photo hero from the event, "TALK #/ESSAY" eyebrow, serif reading column, tabs become "Watch / Slides / Related / Press", and a real signature scribble sign-off for Joe. |
| **Two-column serif bio page** | Joe's full story page — same magazine 2-col serif treatment; press/deal mentions as accent-colored inline links (Copart, Cars.com, etc. as factual history). |
| **Commerce/books grid** | **Aviation photography gallery/prints** — studio-matted product cards, price, accent button; or a non-commerce variant as a pure photo grid with lightbox. |
| **Persistent audio player** | Skip unless Joe ships a podcast; the slot's equivalent is a slim persistent "Now booking 2027 keynotes" bar if we ever want one. |
| **Green/coral/yellow tri-accent logic** | Pick Joe's equivalents: one UI accent (links/labels/icons), one conversion accent (speaking CTAs only), one editorial shout color (quote band + eyebrows on dark). Derive from IDA brand or aviation palette (e.g. nav-light green, signal orange, chart yellow). |

Section order proposal for joeneiman.com homepage, mirroring the rhythm: video hero (dark) → ventures grid (light) → book/talk feature (dark) → mission quote band (accent) → about card (dark+white card) → speaking offer (light) → photo-washed footer.

# Design assets - joeneiman.com

Everything you need is in this folder or linked from it. The live content
wireframe (structure + final copy, deliberately unstyled) serves at
https://bguillow-rgb.github.io/joeneiman.com/ - you own everything visual.

## Start here
- BRIEF.md - positioning, reference sites, direction, what to avoid.
- The copy on the live pages is final-draft voice (Joe's own words); design
  around it, don't rewrite it. Questions about copy go to Bob.

## Photos (design/photos/ - full resolution, EXIF stripped)
| File | Size | Currently used as |
|---|---|---|
| cockpit-fullres.jpg | 1808x1646 | Homepage hero (web/public/assets/photos/cockpit.jpg) |
| porsche-lean-fullres.jpg | 8256x5504 | About hero + Ventures (processed versions in assets) |
| headshot-studio-1.jpg | 8256x5504 | unused - Porsche shoot series |
| headshot-studio-2.jpg | 5504x8256 | source of joe-portrait.jpg (About split) |
| headshot-studio-4.jpg | 1290x2796 | unused |
| headshot-studio-5.jpg | 5504x8256 | unused (near-dupe of studio-2) |
| headshot-brick.jpg | 754x754 | unused - corporate headshot, brick wall |
| tbm-door-fullres.jpg | 3024x4032 | Giving page (TBM thumbs-up) |
| ipo-day-nasdaq.jpg | 568x696 | unused - ACV IPO day at the Nasdaq; candidate for About/ACV section |
| web/public/assets/photos/*.jpg | web-sized | what the wireframe serves today (incl. waco.jpg, avanti.jpg, joe-headshot.jpg, joe-porsche-wide.jpg) |

Added 2026-10-16 (texted by Joe): 43north-win.jpg (ACV's 43North win on stage,
cropped from a screenshot - low res, used small), nada-cars-commerce.jpg (the
acquisition announcement), studio-set.jpg (video set - Speaking), wing-sunset.jpg
(home band), cessna-ttx.jpg + epic-e1000.jpg + cirrus-hangar.jpg + fbo-sunset.jpg
+ flying-headset.jpg (aviation), ski-selfie.jpg + backcountry-ski.jpg +
experts-only-sign.jpg (About health/life row; sign unused). Still wanted: legal
pad, dealership-era stills, bookshelf.

## Video
- In Demand Auto commercial (2014): https://vimeo.com/84672070 - embedded on
  About under the dealership story. More archive video may follow (Startup
  Grind, NEXT interview) pending rights.

## Ground rules
- Zero em dashes anywhere, including image alt text and UI microcopy.
- Off-limits topics and the approval flow are Bob's department; if a design
  idea needs new copy or new facts, ask Bob rather than writing around it.
- The draft gate: SITE.launched=false in web/src/consts.ts keeps everything
  noindex until launch. Don't flip it.
- Build/deploy: cd web && npm run build && bash scripts/deploy-to-docs.sh,
  commit and push (serves from /docs on main).

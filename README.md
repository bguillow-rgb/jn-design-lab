# joeneiman.com

Joe Neiman's personal site. Astro static site in `web/`, built into `docs/`, served
by GitHub Pages.

**Live preview:** https://bguillow-rgb.github.io/joeneiman.com/
(The real domain gets pointed at launch; until then the site is noindexed and
wears a draft ribbon.)

## For Kurt

The content wireframe is done: every page, all the words, real photos in
`web/public/assets/photos/`. The current CSS is a deliberate placeholder.
**The design is yours**: replace `web/src/styles/global.css`, restructure the
layouts and pages however you want. Two things to keep:

1. The words. Copy is drafted from Joe's own answers and is pending his
   approval; the yellow `pending` marks and "wireframe note" boxes flag open
   questions. Leave those visible until launch review.
2. Internal links go through the `url()` helper from `src/consts.ts` so they
   work on the preview URL and on joeneiman.com later.

### Working on it

```bash
cd web
npm install
npm run dev                        # http://localhost:4321
bash scripts/deploy-to-docs.sh     # build the preview into ../docs
cd .. && git add -A && git commit -m "design: ..." && git push
```

The push updates the live preview in about a minute.

## Launch (later, one time)

1. Joe approves the copy; remove the pending marks and wireframe notes.
2. Set `launched: true` in `web/src/consts.ts`.
3. `LAUNCH=1 bash web/scripts/deploy-to-docs.sh` (drops the preview base path
   and adds the CNAME from `CNAME.launch`), commit, push.
4. Point DNS for joeneiman.com at GitHub Pages, bind the domain in repo
   settings, enforce HTTPS.

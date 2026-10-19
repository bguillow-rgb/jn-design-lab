#!/usr/bin/env bash
# Build the Astro site and replace ../docs with the build. GitHub Pages
# serves /docs from main.
#
# Default: PREVIEW build for https://bguillow-rgb.github.io/joeneiman.com/
# (base path set, no CNAME).
# Launch:  LAUNCH=1 bash scripts/deploy-to-docs.sh
# (root base, copies ../CNAME.launch in as CNAME to bind joeneiman.com).
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "${LAUNCH:-}" = "1" ]; then
  echo "==> LAUNCH build (joeneiman.com)"
  npm run build
else
  echo "==> PREVIEW build (bguillow-rgb.github.io/joeneiman.com)"
  PREVIEW=1 npm run build
fi

DOCS_DIR="../docs"
rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"
cp -R dist/. "$DOCS_DIR"/

if [ "${LAUNCH:-}" = "1" ]; then
  cp ../CNAME.launch "$DOCS_DIR/CNAME"
fi

echo "==> /docs ready. Commit and push to publish."

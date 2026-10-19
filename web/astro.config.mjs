import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// PREVIEW=1 builds for the GitHub Pages preview URL
// (https://bguillow-rgb.github.io/jn-design-lab/). LAUNCH builds drop the
// base so the site lives at the domain root. scripts/deploy-to-docs.sh
// sets these; plain `npm run dev` uses neither.
const preview = !!process.env.PREVIEW;

// https://astro.build/config
export default defineConfig({
  site: preview ? 'https://bguillow-rgb.github.io' : 'https://jn-design-lab',
  base: preview ? '/jn-design-lab' : undefined,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx(),
  ],
});

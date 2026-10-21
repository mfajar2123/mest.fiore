import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Dynamic site & base configuration for GitHub Pages deployment
const site = process.env.SITE || 'https://mestierefiolet.com';
const base = process.env.BASE_PATH || undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});

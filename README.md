# Mestiere Fiolet

Astro static storefront for Mestiere Fiolet, a handmade bouquet and bag charm studio in Jatinangor.

## Routes

- `/` — brand introduction and paths to the catalogues
- `/buket/` — bouquet packages
- `/gantungan/` — bag charms
- `/rangkai/` — client-side order estimate and WhatsApp message builder
- `/info/` — FAQ, service area, and order privacy

Catalog prices and brand contact details live in `src/data/mestFioreData.ts`. Product illustrations are original SVG components. Replace them with owner-provided photography only after recording permission and provenance in `public/asset-sources.md`.

## Development

```sh
pnpm install
pnpm dev
pnpm build
pnpm test:e2e
pnpm preview
```

The production build runs Astro checks, creates the static site, and writes a host `_headers` file with content security hashes generated from the built Astro pages. Deploy the contents of `dist/` to a static host that supports the `_headers` convention, such as Netlify or Cloudflare Pages, so the security headers are applied.

Playwright covers desktop and 390px mobile routes, catalogue selection, order totals and WhatsApp URLs, reduced motion, and horizontal overflow. The site does not persist customer names, notes, or photos; customers send order details directly to WhatsApp.

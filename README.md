# WellnessPicks — Affiliate Review Site

A Next.js 16 (App Router) site publishing 14 SEO-optimized affiliate review articles
for ClickBank health/wellness products.

## How it works

- **Article source of truth:** `app/lib/raw/*.json` — one JSON file per product, each
  containing the full review (`html_content`) plus SEO fields (title, meta description,
  keywords, image alt text, affiliate link, main image URL).
- **Build step:** `node scripts/build-products.js` reads every file in `app/lib/raw/`,
  adds `slug`/`category`/`tagline` metadata, and generates the self-contained
  `app/lib/products.ts` (typed data + `getProductBySlug` / `getAllSlugs` helpers).
  Re-run it after editing any raw article, then rebuild.
- **Routes:**
  - `/` — homepage grid linking to every review (`app/page.tsx`).
  - `/reviews/[slug]` — statically generated review page with per-page SEO metadata
    via `generateMetadata` (`app/reviews/[slug]/page.tsx`). All 14 slugs are
    pre-rendered through `generateStaticParams`.
- **Styling:** plain CSS in `app/globals.css` (article typography + `.buy-button`
  affiliate CTA styling). Product images use plain `<img>` tags pointing at each
  vendor's CDN, so no `next.config` `remotePatterns` are required.

## The 14 reviews

Mitolyn, ProDentim, SleepLean, Belly Flush, ProvaDent, Dentolyn, DentalPrime,
Pineal XT, ProstaVive, Joint Genesis, Sugar Defender, ZenCortex, Biome, GlucoBerry.

## Editing or adding an article

1. Edit/create a file in `app/lib/raw/` (copy the shape of an existing one).
2. If adding a new product, register its `slug`/`category`/`tagline` and filename in
   `scripts/build-products.js` (`meta` map + `order` array).
3. Run `node scripts/build-products.js`.
4. Run `npm run build`.

## Commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build (re-run the data script first if articles changed)
npm run start    # serve the production build
```

## Compliance note

Every article uses only H1/H2 headings (H3 for FAQ questions), includes an FDA
disclaimer, avoids unsupported disease claims, and discloses the affiliate
relationship in both the article and the global site footer/banner.
"# web-us" 

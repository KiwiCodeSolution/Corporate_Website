---
name: seo-skill
description: SEO requirements to implement and maintain for the KiwiCode Solutions corporate website (Next.js App Router + next-intl, locales ua/en). Use when adding or changing any public page, metadata, sitemap/robots, news or portfolio routes.
---

# SEO Skill — KiwiCode Corporate Website

Apply whenever building or touching a public route under `src/app/[locale]`. Titles and
descriptions live in `public/locales/{ua,en}.json` (static pages) or `src/data/*.json`
(news, cases). There is no CMS.

## 1. Technical foundation
- Base metadata in `src/app/[locale]/layout.tsx` via `generateMetadata`: `metadataBase` from
  `NEXT_PUBLIC_SITE_URL` (never hard-coded), title template `%s | KiWiCode Solutions`,
  translated default description.
- `<html lang>` uses the ISO code: `uk` for the `ua` route segment, `en` for `en`. The URL
  segment stays `/ua` (changing it breaks indexed links).
- Every page sets `alternates.canonical` and `alternates.languages` (`uk`, `en`,
  `x-default` → `/ua`).
- Dynamic pages (`news/[slug]`, `portfolio/[slug]`) implement `generateMetadata()` with the
  item's title/description **for the current locale** (`title_en` for `en`), and
  `generateStaticParams()` for all locales × slugs. Unknown slug → `notFound()` (real 404),
  never `return null` (soft 404 with status 200).
- Static rendering: call `setRequestLocale(locale)` in layouts/pages and export
  `generateStaticParams` returning `routing.locales`.
- `src/app/sitemap.ts` lists every public page in both locales plus all news/cases slugs,
  with `alternates.languages`. `src/app/robots.ts` references the sitemap and disallows `/api`.
- `/privacy` and `/terms` are indexable but low priority; the `@modal` intercepting routes
  share metadata with the full pages.

## 2. Structured data (JSON-LD)
- `Organization` on the layout (name, url, logo, sameAs → social links from `SocIconsList`).
- `Article`/`NewsArticle` on `news/[slug]` (headline, datePublished, image).
- Server component rendering `<script type="application/ld+json">`, escaped for the
  `<script>` context (see `structured-output-escaping`).

## 3. Core Web Vitals
- `next/image` with correct `sizes`; `priority` only on the single LCP image of a page
  (see `nextjs-image-weight`). Source files in `public/images` ≤ 500 KB.
- Keep sections server components unless interactive; animation wrappers stay leaf-level.
- Avoid layout shift: reserve image dimensions; avoid fixed section heights that clip
  translated text.

## 4. Content rules
- Distinct title/description per page and per locale — no shared placeholder copy.
- Meaningful `alt` on content images (portfolio, news); `alt=""` only for decoration.
- One `h1` per page.

## 5. When adding a new route
- [ ] `generateMetadata` with translated `title` + `description`, canonical + languages
- [ ] Both `ua.json` and `en.json` updated
- [ ] Added to `sitemap.ts`
- [ ] `setRequestLocale` + `generateStaticParams` (static where possible)
- [ ] Unknown params → `notFound()`
- [ ] Images via `next/image` with `alt` and `sizes`

---
name: nextjs-image-weight
description: What an image actually costs in the browser with the Next.js App Router — `next/image` vs a raw `<img>`, the mandatory `sizes`, SVG, the source-size ceiling, and the self-hosted optimizer (sharp, CPU on a cold deploy, a volume for `.next/cache/images`). Use when adding any image to a page, putting design assets into `public/`, rendering uploaded media, debugging "optimization is on but the page still weighs the same", a poor LCP on mobile, or a slow first paint right after a redeploy.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# An image's weight in the browser is not the weight of the file

## What it does and does not affect

Images are **not** bundled: they never enter the JS bundle, they are separate requests.
What the source file's size does affect:

| Source file size | Affects |
|---|---|
| The JS bundle | **No.** Never. Do not "optimize the bundle" by touching images |
| Page weight / LCP / traffic | **Yes — but only through what the optimizer produces**, not byte for byte |
| The Docker image and deploy time | **Yes**, for anything under `public/` — it is baked into the layer |
| CPU on the first request for that size | **Yes** — the derivative is generated at request time |

A 4 MB source through `next/image` reaches a phone as roughly 60–150 KB of WebP. The same
4 MB through a plain `<img>` reaches it as 4 MB.

## Three conditions, without which none of this works

### 1. `next/image`, not `<img>`

`<img src="/hero.jpg">` is served by the static handler byte for byte: no WebP, no resize,
no `srcset`, no lazy loading. There is no partial credit here — either the component or the
original file.

### 2. `sizes` is mandatory for `fill` and for responsive widths

Without `sizes`, Next assumes `100vw` and picks the `srcset` entry for the **viewport**,
so a phone downloads the desktop-sized derivative. This is the single most common cause of
"optimization is clearly on, and the page weighs exactly what it did before".

```tsx
// a card in a 3-column grid on desktop, full width on a phone
<Image src={portrait} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" />
```

`sizes` describes the **rendered CSS width of the slot**, not the file. With explicit
`width`/`height` props and no responsive CSS, `sizes` is not needed — Next builds a 1x/2x
`srcset` from those numbers.

### 3. A local image goes in through a static `import`

```tsx
import hero from './hero.jpg';
<Image src={hero} alt="" priority placeholder="blur" />
```

This buys three things a string path does not: `width`/`height` are read at build time
(no CLS and no hand-written numbers), the URL carries a content hash (**replacing the file
changes the URL**, so no stale derivative anywhere in the chain), and `placeholder="blur"`
gets its `blurDataURL` for free. A string path (`src="/hero.jpg"`, or a path out of the
database) has none of that — see "Replacing a file" below.

## The rules

- **The LCP image gets `priority`.** Everything above the fold, the hero in particular.
  Without it the image is lazy-loaded, discovered late, and LCP suffers exactly where it is
  measured.
- **SVG is not optimized.** `next/image` refuses it unless `dangerouslyAllowSVG` is on, and
  with it on the file is passed through untouched. For icons and logos the file size **is**
  the wire size: run SVGO, or inline the icon into the component.
- **Cap the source at ~2000px on the long side.** Nothing wider is ever served; past that
  point you are only paying in Docker layers, deploy time and optimizer RAM.
- **`quality` defaults to 75 — leave it.** Raising it to 90 "for sharpness" adds tens of
  percent to the wire for no visible gain at a phone's DPR.
- **AVIF is opt-in, and it is not free.** `images.formats` defaults to WebP. AVIF encodes
  several times slower; on a VPS limited by `cpus` that shows up as a stall on the first
  request, not as a saving.
- **Never `unoptimized`** to "fix" an image that does not render. It always means a
  misconfigured loader, `remotePatterns`, or a path — fix the cause.

## Self-hosted: the optimizer runs on the VPS (PM2)

This project runs `next start` under PM2 on a VPS, so `/_next/image` is served by your own
process, on your own CPU.

- **`sharp` must be installed in production** (`npm ci` installs it as Next's optional
  dependency — check that npm's install-script approval didn't block it).
- **The derivative cache lives in `.next/cache/images`.** The deploy does `git reset --hard`
  + `npm run build` in place, which keeps the gitignored `.next/cache`; if the deploy is
  ever changed to a fresh checkout/standalone copy, carry `.next/cache/images` over,
  otherwise the first visitors after every deploy pay for the conversion again.
- **Carry over `cache/images` only, never the whole `.next/cache`.** The fetch/ISR cache is
  its neighbour, and that one must *not* survive a code change.
- **This cache is not backup material.** Every byte in it is reproducible from the
  originals; back up the originals instead.

## Replacing a file

The cache key is the **URL** (path + `w` + `q`), not the file's contents. Overwrite
`public/hero.jpg` keeping the name and the old derivative is still served — from the server
cache, and from every browser and CDN that holds it — until its TTL expires. Use a static
import (content-hashed) or a versioned name (`hero-2.jpg`). For uploaded media, store each
upload under a fresh UUID and never overwrite in place.

## Verify, do not assume

```bash
# What is actually on the wire: type, size, and whether the cache was hit
curl -sI 'http://localhost:3020/_next/image?url=%2Fhero.jpg&w=640&q=75' \
  | grep -i 'content-type\|content-length\|x-nextjs-cache'
```

Expected: `content-type: image/webp`, a plausible `content-length`, and `x-nextjs-cache:
MISS` on the first call turning into `HIT` on the second. A `HIT` that never appears means
the cache directory is not writable — check the mount point's owner.

```bash
# Raw <img> on a raster file — each hit is an unoptimized original
grep -rn "<img" src --include=*.tsx | grep -v "\.svg"

# fill without sizes — eyeball every hit
grep -rn "fill" src --include=*.tsx
```

In DevTools → Network, sort by size with the phone preset on: any raster over ~200 KB is a
bug, not a heavy picture.

## Do not do this

- **Do not pre-generate `@1x/@2x/@3x` variants by hand** and switch them with `srcset` or in
  JS. That is precisely the pipeline `next/image` already is.
- **Do not put a `<picture>`/`<source type="image/webp">` around `next/image`** — format
  negotiation is done by the optimizer via `Accept`.
- **Do not compress uploads twice.** If the upload path already normalizes to WebP with a
  dimension ceiling, `next/image` resizes from that derivative; a second quality pass at the
  same `q` only smears the image.
- **Do not measure weight on a desktop viewport.** Everything is fine at 1440px by
  construction; `sizes` bugs only show at 390px.

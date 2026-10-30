---
name: nodejs-performance
description: Runtime performance for this project — Next.js bundle size and Core Web Vitals (framer-motion, swiper, client components), Node process memory under PM2 on the VPS, in-memory caches/rate-limit maps in route handlers. Use when a page ships a heavy bundle, LCP/CLS is poor, adding a client-side dependency, or the PM2 process restarts/grows in memory.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Performance (Next.js on a VPS under PM2)

## 1. Bundle size & Core Web Vitals

- **Keep `'use client'` at the leaf.** About half the components here are client ones;
  a section that only renders text and images must not be a client component just because
  it wraps an animation — put the animation in a small client wrapper (`FadeInWrapper`) and
  pass server-rendered children.
- **Heavy client libs** (`framer-motion`, `swiper`) — import only the modules used
  (`swiper/modules`), use `LazyMotion` + `m` from framer-motion where a component only needs
  basic animations; `next/dynamic` for below-the-fold carousels if bundle analysis shows it pays.
- **Check bundle impact before adding a dependency** — `npx @next/bundle-analyzer` or the
  build output's First Load JS; a large dependency for one small feature is a red flag
  (e.g. full `lodash` for one `debounce`).
- **Images** — see `nextjs-image-weight`: `sizes`, one `priority` per page, sources ≤ 500 KB.
- **Fonts** — `next/font` (already in `src/app/[locale]/fonts.ts`), no `<link>` to Google Fonts.
- **`prefers-reduced-motion`** — decorative animations respect it (framer-motion
  `useReducedMotion` / `MotionConfig reducedMotion="user"`).

## 2. Node process memory (PM2)

- **Unbounded in-memory maps are a slow leak** — e.g. a per-IP rate-limit `Map` in a route
  handler must evict expired entries; never a `Map` that only grows.
- **Never buffer a large upstream response** when it can be streamed.
- **Diagnose, don't guess** — `pm2 monit` / `pm2 show kiwi-frontend` for RSS and restarts;
  `node --inspect` + heap snapshot locally.
- If memory is tight on the VPS, set `--max-old-space-size` via PM2
  (`node_args`) so Node fails with a logged error instead of being killed by the OS.

## MUST NOT
- Add monitoring/profiling tooling "just in case" without a concrete symptom.
- Introduce Redis or another caching layer for a problem a bounded in-process map solves.

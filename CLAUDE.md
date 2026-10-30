
## Project Guidelines & Agent Skills

### Skills Location
Skills live in `.claude/skills/*` (copied from the shared `claude-skills` collection and adapted
to this project), the settings in `.claude/settings.json`. Both are committed to the repository.
Do not re-enable `attribution.commit`/`pr` in settings — they are empty on purpose.

A skill that names this project's files or services is project-specific; add a line to
Available Skills below for every new skill.

### Available Skills
Use exclusively local skills from `.claude/skills/`. Before working on a task, identify every
skill that's relevant — more than one often applies at once (e.g. `nextjs-developer` +
`nextjs-anti-patterns` + `react-expert` for a single frontend feature) — and read their
SKILL.md before writing code.

- `behind-a-reverse-proxy` — behind nginx the app sees the proxy's IP, not the client's. Read
  for any work on rate limiting or IP logging (the contact form API)
- `external-call-safety` — outbound calls to third-party services (Telegram Bot API): timeouts,
  never leaking the upstream error body, idempotency
- `input-bounds-and-ownership` — a bound on every client-supplied value; a Route Handler is a
  public endpoint
- `nextjs-anti-patterns` — App Router anti-pattern detection (useEffect misuse, waterfalls, etc.)
- `nextjs-developer` — App Router structure, metadata, route handlers, deployment checks
- `nextjs-image-weight` — what an image really weighs in the browser: `next/image`, mandatory
  `sizes`, SVG, a ceiling on source size, self-hosted optimizer. Read when adding any image,
  putting assets in `public/`, or debugging a poor LCP
- `nodejs-performance` — bundle size / Core Web Vitals (framer-motion, swiper, client
  components), Node memory under PM2, bounded in-memory maps
- `pre-commit-review` — pre-commit review of the whole branch against `dev`: CLAUDE.md,
  overcoding, types/lint/prettier, reuse, i18n, semantics, a11y, SEO, merge dev, then commit.
  Only on an explicit request ("перевір перед комітом", "готуємо коміт/ПР")
- `react-expert` — component/hook implementation, Server Components, React 19 patterns
- `responsive-shell-single-source` — shell content (header menu, footer, nav links) that sits
  in different DOM locations on desktop vs mobile must have one source component and must not
  ship a CSS-hidden duplicate
- `reuse-before-build` — before writing new code, check what already exists (`src/components`,
  `ui/`, hooks, utils, icons, tokens, translations) and reuse it; shared components are never
  duplicated
- `seo-skill` — SEO requirements for public pages (metadata per locale, hreflang, sitemap,
  robots, JSON-LD, 404s)
- `seo-technical` — technical SEO audit of a live site (crawlability, indexability, CWV,
  rendering, structured data). Needs a public URL; treat it as a manual checklist
- `structure-and-element-anti-patterns` — markup/element construction anti-patterns: fixed-px
  sizing in flow layout, `index` as React key, div-soup vs semantic HTML, invalid nesting,
  magic numbers vs design tokens, redundant wrappers. Read whenever building or reviewing any
  JSX structure/element
- `structured-output-escaping` — escaping for the insertion context: JSON-LD in a `<script>`,
  HTML in Telegram messages (`parse_mode: 'HTML'`), `dangerouslySetInnerHTML`
- `tailwind-token-naming` — tokens live in `src/styles/globals.css` (`@theme inline`); never
  redefine a stock Tailwind class or scale key. Read before adding a token or replacing a raw hex
- `task-planner` — decides whether a multi-step task needs a `PLAN.md` and executes it step by
  step
- `termination-guards` — a provable stopping condition for redirects (locale middleware),
  recursion, retries and effects
- `typescript-pro` — type guards, discriminated unions, strict tsconfig, deriving types from
  their single source (project fork)
- `ui-focus-no-layout-shift` — hover/focus/active states must not change geometry
  (border-width, padding, size); use box-shadow/outline

If a task's requirements conflict between two skills, or between a skill and this document,
this document (CLAUDE.md) wins.

Act as a senior frontend developer who works on a team and values their own time and
everyone else's. You have nothing to prove — so write simple code, not complex code.

## Project Stack
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + next-intl 4 (locales `ua`,
`en`) + next-themes (light/dark) + framer-motion + swiper + react-hook-form/yup. npm, Node ≥ 20.9.
Propose solutions strictly within this stack unless explicitly asked otherwise.

## This Project Specifically
- **KiwiCode Solutions corporate website** — a single Next.js app (not a monorepo), no database,
  no CMS, no authentication.
- **Content:** UI strings in `public/locales/ua.json` and `en.json` (loaded by
  `src/i18n/request.ts`); news and portfolio cases in `src/data/*.json` with `title`/`title_en`
  style fields, read via `src/utils/api.ts`.
- **Routing:** everything under `src/app/[locale]`; `src/proxy.ts` (next-intl middleware)
  handles locale detection; news/portfolio open as modals via intercepting routes in
  `src/app/[locale]/@modal`. Navigation helpers (`Link`, `useRouter`, `usePathname`) come from
  `src/i18n/navigation.ts`, never from `next/link`/`next/navigation` directly.
- **The only API route:** `src/app/api/send-contact/route.ts` — contact form → Telegram Bot API
  (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` from env).
- **Deployment:** push to `dev` → GitHub Actions (`.github/workflows/ci.yml`) builds and deploys
  over SSH to a VPS, where the app runs as `next start` under PM2 (`kiwi-frontend`) behind
  nginx. No Docker.
- **Branches:** feature branches from `dev`, PR into `dev`. Never push directly to `dev` — it
  triggers a deploy.
- **Ports:** dev and prod both on 3000.

## Main Rule: KISS / YAGNI
- Write code for the specific task being asked right now. Don't design "for the future" and
  don't add capabilities nobody requested.
- If a task can be solved with 5 lines using built-in framework features — don't invent an
  abstraction.
- Overengineering is a mistake, not a quality. Simple working code beats "flexible" complex code.

## Forbidden Without an Explicit Request
- **Don't re-analyze the whole project structure every time.** Only look at files directly
  relevant to the task. Don't read the entire repo "just in case."
- **Don't add a second implementation of something that exists** — modals
  (`src/components/ui/modal/*`, `ui/ModalOverlay.tsx`), scroll lock (`useScrollLockV2`),
  buttons/links (`src/components/ui/buttons`, `ui/links`). See `reuse-before-build`.
- **Don't duplicate data shapes.** Types for news/cases come from one place (next to the data
  accessor), locale type is `AppLocale` from `src/i18n/routing.ts`.
- Don't add new dependencies when the platform or an existing dependency already covers it.

## Frontend (Next.js App Router)
- Default to Server Components. Add `'use client'` only at the lowest component that genuinely
  needs interactivity — not to the whole section/page.
- Never use `useEffect` + `useState` for: data fetching, translations, browser detection, or URL
  reads. Translations: `getTranslations` (server) / `useTranslations` (client) — never
  `fetch('/locales/…json')`.
- `useState` is for client-side UI state only (form inputs, toggles, open/closed).
- Every user-visible string goes to **both** `ua.json` and `en.json`. No hard-coded text in JSX.
- Dates/numbers through next-intl's formatter (`useFormatter`/`getFormatter`) so server and
  client render the same string (time zone is set in `src/i18n/request.ts`).
- Unknown slug → `notFound()`, never `return null`.
- Route handlers (`app/api/...`) only for client-triggered mutations and third-party
  integrations, not for reads a Server Component can do directly.
- `any` is forbidden (`@typescript-eslint/no-explicit-any`) — type props, events, and handlers
  explicitly.
- Navigation items and other "shell" content have a single source — don't duplicate them in the
  header, burger menu and the footer.
- Colours, radii, shadows — tokens from `src/styles/globals.css`; no new raw hex in JSX
  (`tailwind-token-naming`).

## Validation & Security
- Every Route Handler validates its body on the server (yup schema shared with the client form
  where possible), bounds every string length, and never trusts client validation.
- Outbound calls (Telegram) have a timeout; upstream error bodies go to the log, the client gets
  a neutral error (`external-call-safety`).
- Public POST endpoints are rate-limited per client IP taken from the nginx header, and have a
  honeypot against bots (`behind-a-reverse-proxy`).
- User input inserted into HTML (Telegram `parse_mode: 'HTML'`) is escaped
  (`structured-output-escaping`).
- Secrets only from env, never hard-coded, never logged, never `NEXT_PUBLIC_*`.

## Performance
- `useMemo`/`useCallback` — only when the value/function is passed to a `React.memo` component
  or used in a hook's dependency array. Don't wrap plain renders "just in case."
- Images: `next/image` with `sizes`, `priority` only on the LCP image, source files in
  `public/images` ≤ 500 KB (`nextjs-image-weight`).

## Response Format
- No intros or outros like "sure, here's the code."
- Show only the changed/new code, not the entire file again.
- If the task lacks context (design, copy, specific requirements) — ask a clarifying question
  first instead of guessing.

## CRITICAL: No Over-Verification & Strict Task Scope
- **Do not over-verify:** When asked to create, update, or write code in a specific file, do
  **not** run full builds (`npm run build`) or full lints unless the change touches
  dependencies, config, or routing. `npm run typecheck` on the changed code is enough.
- **Stop at the task:** Once the requested code or file change is successfully written, finish
  the task immediately. Do not audit git status or run global checks unless explicitly requested.
- **Zero Extra Scope:** If the task is "add a section", only add the section. Do not refactor
  neighbouring components or perform audits on files you weren't asked to touch.

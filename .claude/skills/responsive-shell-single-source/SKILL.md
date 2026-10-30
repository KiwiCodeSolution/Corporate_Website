---
name: responsive-shell-single-source
description: Site "shell" content (footer, /more, header menu, newsletter, legal links) that sits in different DOM locations on desktop and mobile must have one source component and must not ship a hidden duplicate. Use when editing the footer, a mobile header menu / tab bar, a shared nav-links module, or when the same block (heading + form, link list, CTA) appears both in the desktop layout and on a separate mobile page/sheet.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# The site shell: one source, no hidden duplicate

## The problem it solves

Typical case: on desktop the footer is a separate `<footer>` after `<main>`, while on mobile its
role is played by a **separate route** (here called `/more`, reached from a tab bar). The same
content (newsletter block, link columns, legal) then lives in two files. The file names below
are illustrative — none of these components exist in this project yet.

Three ways this breaks:

1. **The markup is duplicated and drifts apart.** The link data is shared
   (`lib/nav-links.ts`), the wrapper is not. There was a
   `<Heading as="h3" className="text-[48px]…">` in the footer and a `<Heading as="h4">` on
   `/more`; the logo appeared only on `/more`. You edit one place and the other quietly goes
   stale.

2. **A hidden duplicate in the DOM.** Wrapping in
   `<div className="hidden md:block"><Footer/></div>` is `display:none`, not conditional
   rendering. On mobile `/more` the DOM ended up with **two copies** of the newsletter form (a
   client component with `useState`), two copies of the links, and potentially two `<footer>`
   landmarks — one of them invisible and useful to nobody.

3. **Lost parity.** Content that on desktop exists only in the footer (`© year`, developer
   credits, `CookiePreferencesLink`) is missing from `/more` — so mobile users cannot reach it
   at all.

## The rule

**A. One source component.** If a block appears both in the desktop layout and on a mobile
page/sheet, it lives in **one** component with responsive classes, imported by both places.
Do not rewrite the markup per breakpoint.

- Example: `footer/footer-newsletter.tsx` — `<FooterNewsletter logoUrl={…} className?>`,
  imported by both `footer.tsx` and `more/page.tsx`. The responsive work happens inside the
  component: `text-[28px] … md:text-[48px] md:leading-[56px]`.
- Link data always comes from `lib/nav-links.ts` (`footerColumns`, `legalLinks`,
  `mainNavLinks`). Never hard-code a link list inside a component.

**B. No hidden duplicate in the DOM.** A block that is not needed at one breakpoint **is not
rendered**, rather than hidden with `hidden` / `md:hidden`.

- Wrap desktop-only shell in `layout.tsx` in a path-aware client slot that returns `null` on
  the route where mobile shows the same content differently:

  ```tsx
  // footer/footer-desktop-slot.tsx
  'use client';
  import { usePathname } from '@/i18n/navigation'; // returns the path WITHOUT /en, /fr
  export function FooterDesktopSlot({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    if (pathname === '/more') return null;
    return <div className="hidden md:block">{children}</div>;
  }
  ```
  `<Footer>` stays a Server Component and is passed as `children` — RSC allows this; the
  client slot only decides whether to mount it.

- `hidden md:block` / `md:hidden` as the **only** mechanism is acceptable only when both
  versions are cheap, static and free of client state (two different headings, say). A form, a
  list of dozens of items, a component with `useState`/`useEffect`, a `<footer>`/`<nav>`
  landmark — no; those need conditional rendering.

**C. Parity when moving content to `/more`.** When footer content is mirrored on `/more`, walk
the desktop footer top to bottom and decide deliberately for each block whether it moves.
Especially:

| Footer block | Must be reachable on mobile |
|---|---|
| `CookiePreferencesLink` | yes — otherwise consent cannot be changed once the banner is dismissed (it is also on `/privacy-policy`, but that is buried) |
| `legalLinks` (privacy, terms) | yes |
| `© {year}` + developer credits | preferably |
| newsletter + logo | yes |

## The canonical state (after the refactor)

```
footer/footer-newsletter.tsx      ← <FooterNewsletter logoUrl className?>  the shared source
footer/footer.tsx                 ← takes logoUrl, renders <FooterNewsletter/> + columns
footer/footer-desktop-slot.tsx    ← 'use client', hides the footer on /more (conditional render)
app/layout.tsx                    ← <FooterDesktopSlot><Footer logoUrl={…}/></FooterDesktopSlot>
app/more/page.tsx                ← <FooterNewsletter/> + accordion lists from nav-links
```

## Do not do this

- **Do not leave `hidden md:block` around `<Footer>` without a path check** when a mobile route
  with the same content exists — that is precisely the redundant render.
- **Do not copy the newsletter block / link list JSX into `/more`.** Import the component.
- **Do not make `FooterNewsletter` (or any shared shell component) a client component** for the
  sake of responsiveness — responsiveness is CSS classes, no client needed. Only the thin slot
  wrapper with `usePathname` is a client component.
- **Do not move the whole app tree into a route group** just to remove one duplicate — that
  is a large migration. The path-aware slot is cheaper.
- **Do not leave orphaned copy/data on `/more` when the block moved into a shared
  component** — whatever it fetched or translated travels with it; remove the leftovers.

## How to verify

```bash
# 1. Shared shell components wrapped ONLY in a CSS hide (bug candidates):
grep -rn "hidden md:block\|md:hidden" <web-app>/src/app/layout.tsx \
  <web-app>/src/components/layout/

# 2. Duplicated markup: the same Footer i18n key used in the footer and on /more
grep -rn "newsletterTitle\|newsletterSubtitle\|newsletterCta" <web-app>/src

# 3. The DOM on /more (dev server on :3020): there must be no two <footer>s,
#    no two input[name=email]. Open localhost:3020/more in a mobile viewport, console:
#    document.querySelectorAll('footer').length            // expected: 0
#    document.querySelectorAll('input[name=email]').length // expected: 1
```

Expected: `/more` in a mobile viewport shows exactly one newsletter form and zero hidden
`<footer>`s; desktop `/en` still has its footer with the logo; and editing the text or styling
of the newsletter block in `footer-newsletter.tsx` shows up in both places at once.

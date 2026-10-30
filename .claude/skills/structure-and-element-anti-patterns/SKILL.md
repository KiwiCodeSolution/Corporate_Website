---
name: structure-and-element-anti-patterns
description: Technical markup and element-construction anti-patterns in a React/Next.js app — fixed pixel sizes in flow layout, `index` as a React key, div soup instead of semantics (`<div onClick>`, heading classes on `<p>`), invalid HTML nesting, magic numbers instead of design-system tokens, redundant wrapper elements. Use ALWAYS when writing or reviewing any JSX/TSX component, page, section, card, form or list — that is, whenever you are building DOM structure or an element.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Anti-patterns in building structure and elements

Complements `nextjs-anti-patterns` (which covers data fetching, `useEffect`, waterfalls) and
`react-expert` (hook/component implementation). This one is about **markup, element
semantics, sizing and nesting**. The rules below are prohibitions; fix a violation the first
time you touch the file.

---

## 1. Fixed pixel sizes in flow layout — FORBIDDEN

`w-[520px]`, `w-[245px]`, `w-[340px]`, `w-[481px]`, `min-w-[300px]`, `h-[360px]` on blocks
with **text or dynamic content** cause horizontal scrolling, clipped text when a translation
is longer (FR runs longer than EN), and layout jumps inside content-width containers (see
`ui-focus-no-layout-shift`, which explains how a content-width ancestor catches every stray
pixel).

**Instead of a fixed width:**
- constrain with `max-w-*` (`max-w-sm`, `max-w-[560px]`), not `w-*`;
- heights are `min-h-*`, not `h-*` (text may wrap to two lines);
- a flex column's width is `flex-1` / `basis-*` / a `grid` with `minmax(0,1fr)`, not `w-[Npx]`;
- spacing and sizes are tokens (`gap-4`, `p-6`, `rounded-28`), not `gap-[13px]`.

**Allowed exceptions (a fixed px is correct here):**
- icons, avatars, the logo box — `size-5`, `h-8 w-auto`;
- UI elements with an exact, deliberate size and **non-textual** content: tab bar height
  `h-[76px]`, field height `h-12`/`h-[52px]`, a square button `h-[52px] w-[52px]`;
- `min-w-[520px]` on a `<table>` inside an `overflow-x-auto` wrapper (deliberate horizontal
  table scrolling) — BUT only together with that wrapper.

**Never:** `clamp()` hell with three breakpoints matched pixel for pixel
(`w-[clamp(350px,45.57vw,466px)]` × each of md/lg/xl) for an ordinary section. That is a
Figma export, not responsive design. The one exception is `hero-slider` (deliberately
positioned artwork); new code is not written that way.

---

## 2. `index` from `.map()` as a `key` — FORBIDDEN for dynamic lists

`{items.map((item, index) => <X key={index} />)}` breaks React reconciliation on filtering,
sorting, insertion and deletion: state and DOM end up glued to the wrong element.

- **Use:** `key={item.id}` / `key={item.slug}` / `key={item.href}` — a stable identifier of
  the entity.
- **`key={index}` is acceptable only** when the list is static, never reordered, and its items
  hold no state or inputs (rendering rating stars, decorative skeletons). When in doubt, do
  not use it.
- For a key coming from an i18n array, use `key={key}` (the translation key itself), not
  `index`.

---

## 3. Div soup instead of semantics — FORBIDDEN

- **`<div onClick>` / `<span onClick>` as a button** → `<button type="button">`, or
  `IconButton`/`Button` from the shared UI package. A clickable div has no focus, no role, no
  Enter/Space handling, and is unreachable from the keyboard.
- **Navigation** uses `<Link>` from `@/i18n/navigation` or `useRouter()`. NOT
  `<a href="/...">` for internal paths (it loses client navigation), and
  NOT `window.location.href`. External links are
  `<a href target="_blank" rel="noopener noreferrer">`.
- **Heading classes (`text-heading-h*`, `text-display-*`) on `<p>` / `<div>` / `<span>`** →
  `<Heading as="hN">` or a real `<hN>`. And the reverse: do not force `<Heading>` where the
  thing is not a section heading.
- **Do not skip or jump heading levels** for the sake of size: one `<h1>` per page, then
  `h2 → h3` following nesting. Need a small heading under a large one? Use
  `<Heading as="h3" className="text-body-md">`, not an `<h5>` chosen for its font size. (The
  footer had an `h3` while `/more` used an `h4` for the same block — that is exactly a level
  jump.)
- **Lists** of links or items are `<ul><li>`, not a pile of `<div>`s. Icon-and-text menus too.
- **Landmarks** — exactly one `<main>`, one `<header>`, one `<footer>`, one primary `<nav>`
  per page. A CSS-hidden duplicate `<footer>` is a violation too (see
  `responsive-shell-single-source`).
- **`alt` on `<img>` is mandatory** (an empty `alt=""` for purely decorative images).

---

## 4. Invalid HTML nesting — FORBIDDEN

React hydration silently "repairs" these, breaking markup and styles as it goes:

- `<a>` inside `<a>`, `<button>` inside `<button>`, an `<a>`/`<button>` inside one another —
  interactive elements are never nested in interactive elements.
- `<div>` (or any block) inside `<p>` — a `<p>` holds inline content only. A card inside a
  paragraph is a bug.
- `<ul>`/`<ol>` as a direct child of a non-`<li>` container inside an `<li>` without a wrapper
  — a nested list goes inside the parent `<li>`.
- `<td>`/`<th>` only inside `<tr>`, `<tr>` only inside `<thead>`/`<tbody>`; do not draw a table
  out of `<div>`s when the data is tabular.
- A form control with no associated label (`<label htmlFor>` or `aria-label`).

---

## 5. Magic numbers instead of design-system tokens — FORBIDDEN

Theme tokens (colours, radii, shadows) live in `src/styles/globals.css` (`:root`, `.dark`,
`@theme inline`) — see `tailwind-token-naming`. Do not invent a scale yourself; a missing
token is a question to the user.

- **Not** arbitrary values like `text-[28px] leading-[34px] tracking-[-0.72px]` when a token
  or a standard Tailwind step is close. If the design genuinely calls for an in-between size,
  that is a decision to discuss, not a quiet arbitrary class.
- **No** hex or `rgb()` in a className (`text-[#171718]`, `bg-[#fff]`) once colour tokens
  exist — tokens only. The exception is a colour that has no token and is used once (a
  partner's brand colour, say); then leave a comment explaining why.
- **No** `shadow-[0_12px_32px_...]` scattered across components — if a shadow repeats, it
  should be a token or a class.
- A value that repeats across components belongs in the preset, not copied into classNames.

---

## 6. Redundant wrappers and over-nesting — FORBIDDEN

- `<div><div><div className="flex">…</div></div></div>` where the outer ones do nothing (no
  classes, or duplicated ones). Every level needs a reason: spacing, background, a flex
  context, a scroll boundary.
- A wrapper around a single child just to hang one class on it — put the class on the child.
- A `<Fragment>` where one element would do; and conversely, a redundant `<div>` where `<>`
  belongs.
- `flex flex-col` on a container with a single child.
- A wrapper component that only forwards props to another component with no logic of its own
  (see CLAUDE.md — "service wrappers over services"; the same applies in React).

---

## 7. Smaller things, still no

- `style={{…}}` holding constants instead of Tailwind classes (inline styles are for genuinely
  computed values only — a progress bar percentage, drag coordinates).
- `{...props}` spread onto a native DOM element (invalid attributes leak into the HTML).
- `dangerouslySetInnerHTML` without sanitisation and without a real need.
- `<br/>` used for vertical spacing — that is `gap`/`margin`.
- Placeholder alt text like `alt="image"`, `alt="img"`.
- `tabIndex={1}` or any positive value — only `0` or `-1`.

---

## How to check (quick grep signals)

```bash
cd <web-app>/src
# fixed sizes in flow (review each one — is it an exception under §1?)
grep -rEn "(^|[\" ])(w|min-w|h)-\[[0-9]+px\]" --include=*.tsx components app | grep -v node_modules
# index as key
grep -rEn "key=\{(index|i|idx)\}" --include=*.tsx components app
# div/span used as a button
grep -rEn "<(div|span)[^>]*\bonClick=" --include=*.tsx components app
# arbitrary font sizes / default radii / hex in classes
grep -rEn "text-\[[0-9]+px\]|rounded-(xl|2xl|md|lg)\b|(bg|text|border)-\[#" --include=*.tsx components app
# an internal <a> instead of <Link>
grep -rEn "<a [^>]*href=\"/" --include=*.tsx components app
```

These greps are starting suspicions, not verdicts: check every hit against the allowed
exceptions in the relevant section. New code must not add hits; old ones get fixed as you
pass by.

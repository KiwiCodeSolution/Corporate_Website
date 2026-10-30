---
name: tailwind-token-naming
description: Rule for naming design tokens in src/styles/globals.css (Tailwind 4 `@theme inline`) — never reuse Tailwind's own scale keys or redefine a stock class; our tokens get our own names, as close as possible to the Figma variable names. Use before adding or reviewing any `--color-*`/`--radius-*`/`--shadow-*` token, when replacing a raw hex like `bg-[#E0F5ED]`, or when a Tailwind class behaves unexpectedly.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Never redefine a Tailwind class — custom tokens get custom names

**The rule:** no overrides, no "adapting" a stock Tailwind name to mean something else. If a
token is ours, its key must be a name Tailwind doesn't already use in that category, so a
developer who knows vanilla Tailwind is never surprised by what a class does here. Names
follow the Figma variables as closely as possible.

## How this repo does it (Tailwind 4, no config file)

All tokens live in `src/styles/globals.css`:

1. Raw values as CSS variables in `:root` (light) and `.dark` (dark theme, toggled by
   `next-themes` with `attribute="class"`; the `dark:` variant is declared with
   `@custom-variant dark`).
2. Exposed to Tailwind in `@theme inline` as `--color-<name>: var(--<name>)`,
   `--radius-<name>`, `--shadow-<name>`.

Existing tokens: colours `bgColor`, `dark`, `light-grey`, `main-title`, `main-text`, `accent`,
`bright-green`, `turquoise`, `grey`, `services-blue`, `disabled`, `error`, `blue`;
`rounded-base`; `shadow-base`.

**Known violation:** `--color-blue` overrides Tailwind's stock `blue-*` family name. Don't
add more like it; rename it (e.g. `brand-blue`) when touching the places that use it.

## Before adding a token

1. grep `globals.css` for the exact value first — it may already exist (see `reuse-before-build`).
2. Check Tailwind's default theme for that category (colour families: slate/gray/zinc/
   neutral/stone/red/…/blue/…; radius: xs/sm/md/lg/xl/2xl/3xl/4xl/full; shadow: 2xs…2xl).
   If the name collides, pick a different one (prefix it).
3. A colour that differs between themes is defined in **both** `:root` and `.dark`, so
   components don't need `dark:` pairs of raw hex.
4. No value in Figma for what you need? Ask the user — don't invent a token.

## Raw values in components

`bg-[#3f3030]`, `from-[#E0F5ED]`, `shadow-[...var(--accent)]` in JSX are tech debt: when you
touch such a line, replace it with an existing token or ask whether to add one. Don't
mass-rewrite unrelated files.

---
name: ui-focus-no-layout-shift
description: Hover/focus/active states on fields and buttons must not change geometry (border-width, padding, width/height, margin, font-size). Use when adding or fixing a focus indicator in a shared field component (text field, select, search field and friends), when a form "jumps" or resizes as you click into a field, or when reviewing a new UI component with a border.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# A focus indicator must not move the layout

## The problem it solves

Field components often show focus via `focus:border-2` — a `1px → 2px` border. With
`box-sizing: border-box` (Tailwind preflight) this does **not** change the outer box of the
`<input>` itself, but it does change its **contribution to max-content**: +1px on each side.

That is harmless until some ancestor is sized by **content** rather than stretched — for
example a flex-column container with `mx-auto` (an auto margin on the cross axis cancels
`align-items: stretch`, so the container shrinks to its content's max-content). Then the extra
pixels propagate upward through grids and wrappers, the container re-centres, and the whole
form jumps by a couple of pixels when a field gets focus. Elsewhere, where content naturally
fills the width, the same bug is invisible — which is why it slips through review.

## The rule

In `:hover` / `:focus` / `:focus-within` / `:focus-visible` / `:active` / `:checked` states
it is **forbidden** to change any property that affects geometry:

- `border-width` (`border`, `border-2`, `border-4`…)
- `padding`, `margin`
- `width`, `height`, `min-*`, `max-*`
- `font-size`, `letter-spacing`, `line-height`
- `box-sizing`

Allowed (zero layout impact):

- **`box-shadow`** — inset for a "border" inside the radius, outer for a "ring". A shadow
  never enters layout, `scrollWidth`, or intrinsic sizing.
- **`outline`** plus `outline-offset` — also outside layout (though the viewport scrollbar
  can twitch if the element sits right at the edge of an overflow container; `box-shadow` is
  safer).
- Colour: `border-color`, `background-color`, `color`.

## The canonical fix

Before:
```
border border-<color> … focus:border-2 focus:outline-none
```
After:
```
border border-<color> … focus:shadow-[inset_0_0_0_1px_<color>] focus:outline-none
```

A 1px border plus a 1px inset shadow in the same colour looks exactly like a 2px border
following the same radius, **with no reflow**. `focus:outline-none` stays — the shadow is the
visible indicator. Use the same colour (a theme token from `src/styles/globals.css`) for both the border and the shadow so they match.

If you need a 2px ring without the 1px base border: `focus:border-transparent
focus:shadow-[inset_0_0_0_2px_<color>]`.

## Where the pattern hides (grep on first touch of a field component)

```bash
grep -rn "focus:border-2\|focus-within:border-2\|focus:p-\|hover:p-" src
```

Every hit is a geometry change on focus. On a field whose border lives on a wrapping
`<div>` (a search field with an icon, for example) put the shadow on that wrapper, not on
the `<input>`. Radix-based components are usually already correct —
`focus-visible:ring-1 focus-visible:ring-ring` compiles to a box-shadow.

## Do not do this

- **Do not mask the symptom with `w-full` on one page's container.** It removes the jump on
  that page but changes its layout width and leaves the same bug in every other
  content-width context.
- **Do not touch the shared layout container** to fix it. Fix the focus indicator, not the
  layout primitive.
- **Do not switch `box-sizing` to `content-box`** to "compensate" for the border — that
  breaks fixed heights across the whole UI.
- **Do not leave a `transition` on a geometry property** to "make the jump smooth" — a smooth
  jump is still a jump.

## How to verify

In a browser, measure the form's `getBoundingClientRect().width` and `x` before and after
focusing a field (scripted `.focus()` is enough; use real focus for `:focus-visible`). They
must be identical. On the field, `getComputedStyle(el).boxShadow` should contain the inset
shadow and `borderTopWidth` must stay unchanged.

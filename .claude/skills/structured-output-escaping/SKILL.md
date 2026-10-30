---
name: structured-output-escaping
description: A document assembled by string concatenation (HTML, script, XML/SOAP, SQL, CSV, email) needs escaping for the INSERTION CONTEXT — a general-purpose serialiser does not provide it. Use when writing JSON-LD or any inline `<script>`, dangerouslySetInnerHTML, an XML/SOAP envelope, a CSV export, an HTML email, or when building a query as a string. Trigger words: JSON.stringify inside markup, dangerouslySetInnerHTML, innerHTML, `<script type="application/ld+json">`, a template string containing `<`, $queryRawUnsafe.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Escape for the insertion context, not for the data type

`JSON.stringify` produces valid JSON. It does **not** produce safe `<script>` content.
`String()` produces a string. It does **not** produce valid XML text. The insertion context
determines which characters must be neutralised — and the serialiser knows nothing about
that context.

## 1. JSON inside a `<script>`

```tsx
// ❌ JSON.stringify does not escape "<".
//    A product name or FAQ answer containing "</script><img src=x onerror=…>"
//    closes the tag, and everything after it is parsed as markup.
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

// ✅ one helper for the whole project
export function serializeJsonLd(jsonLd: unknown): string {
  return JSON.stringify(jsonLd)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
```

A `<` inside a JSON string is transparent to the parser — the value is unchanged, and the
tag can no longer be closed.

**The source of the data does not make this safe.** Here the content comes from the admin
panel, so the vector is a compromised or malicious content manager rather than an anonymous
visitor. It is still stored XSS across the whole storefront: the difference is who loads the
gun, not what it does.

The same helper is needed for any inline script carrying state: `window.__DATA__ = …`,
hydration payloads, analytics config.

## 2. The context table

| Insertion point | Neutralise | With |
|---|---|---|
| HTML text | `< > &` | JSX does it; manual `innerHTML` does not |
| HTML attribute | `< > & " '` | JSX does it |
| `<script>` body | `< > &` in the already-serialised JSON | your own `serializeJsonLd` |
| XML/SOAP text | `< > & " '` | your own `escapeXml`, at every interpolation |
| SQL | everything | parameterisation only, never concatenation |
| CSV cell | leading `= + - @`, quotes | prefix with `'`, double the quotes |
| HTML email | as HTML | the same escaper as the site |
| `Set-Cookie`, headers | `\r\n` | never let a user write into a header |

## 3. XML/SOAP assembled from a template string

If the envelope is built with `${}` interpolation, **every** value goes through `escapeXml` —
including the ones that are "ours" (account number, warehouse postal code from an env var).
A single missed field breaks the envelope, and the upstream returns an error nobody can
interpret.

```ts
// ✅ no bare ${value} anywhere in the envelope
<v2:City>${escapeXml(destination.city)}</v2:City>
<v2:Province>${escapeXml(province)}</v2:Province>
```

Better than escaping is a builder library that cannot produce an invalid document. A
hand-written template is acceptable for one simple request — but then the escaping is not
negotiable.

## 4. `dangerouslySetInnerHTML` — three legitimate cases

1. Serialised JSON in a `<script>`, through the helper above.
2. HTML that has been allowlist-sanitised (`sanitize-html`, DOMPurify) **on the server**.
3. A static string containing no external values at all.

Everything else is a bug. In particular: rich text from the admin panel without
sanitisation, a product `description` containing HTML tags, anything from `?query=`.

## 5. SQL is parameterised, always

`$queryRawUnsafe` and concatenation with user input are forbidden. If raw SQL is genuinely
needed, use placeholders only (`Prisma.sql`, `?`). A template string with `${}` in SQL is an
injection regardless of how "internal" the value feels.

## 6. Paths and filenames are a context too

A client-supplied filename never becomes the name on disk (`crypto.randomUUID()` plus a
fixed extension). Any path assembled from input goes through a `safeJoin` that does
`path.resolve` and verifies the result stayed inside the base directory — and the base must
be the **specific subdirectory**, not the storage root.

## Checklist

- [ ] No `JSON.stringify` passed directly to `dangerouslySetInnerHTML` — always the helper
- [ ] One escaping helper per project, used by every insertion point
- [ ] No bare `${value}` in an XML/SOAP template
- [ ] Rich text from the database is sanitised on the server before insertion
- [ ] No concatenation of user input into SQL
- [ ] Filenames on disk are generated, never taken from the client

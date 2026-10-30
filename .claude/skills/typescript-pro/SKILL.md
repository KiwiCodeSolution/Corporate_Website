---
name: typescript-pro
description: TypeScript type-safety patterns for this project — type guards, discriminated unions, strict tsconfig, types derived from data/schemas (JSON data, yup schemas, next-intl routing). Use when typing props, form values, route params, JSON data, narrowing types, or configuring tsconfig. Advanced generics, branded types, and tRPC are out of scope here — apply only when a task explicitly needs them, not by default.
license: MIT (forked/trimmed)
metadata:
  version: "1.2.0-project-fork"
---

# TypeScript Pro (project fork)

Trimmed version. Use the patterns below as the everyday toolkit; reach for anything heavier
only when a task genuinely requires it, and say so explicitly when you do (KISS/YAGNI, see
CLAUDE.md).

## Core Workflow

1. Write types as simply as possible — plain `type` aliases for props first.
2. Derive instead of duplicating:
   - locale → `AppLocale` from `src/i18n/routing.ts` (never `'ua' | 'en'` by hand);
   - form values → `yup.InferType<typeof schema>`;
   - JSON data (`src/data/*.json`) → `(typeof allNews)[number]` or one exported type next
     to the data accessor in `src/utils/api.ts`, not a second hand-written copy in a component;
   - App Router params → `params: Promise<{ locale: string; slug: string }>` (Next 15+).
3. Use discriminated unions + type guards for state/variant modeling.
4. Run `npm run typecheck` before considering a change done; fix errors, don't suppress
   with `as`/`any`.

## Everyday Patterns

### Discriminated Unions & Type Guards
```typescript
type SubmitState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success' }
  | { status: 'error'; message: string };
```

### tsconfig for this Next.js app
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "skipLibCheck": true
  }
}
```
`strict` is the goal; while the codebase is being migrated it may still be off — don't add
new code that would break under `strict`.

## Out of scope by default

- **Branded types** — only with a real risk of mixing up IDs across a large surface.
- **Deep/conditional/mapped utility types** — only for a specific, justified need.
- **tRPC** — not part of this project's stack; don't introduce it without an explicit request.

References in `references/` are the upstream originals — reference only, not default guidance.

## Constraints

### MUST DO
- Use `satisfies` where it clarifies intent without widening a type
- Derive types from their single source (see Core Workflow 2)

### MUST NOT DO
- Use explicit `any`
- Reach for branded types / advanced generics / tRPC by default
- Duplicate a data shape as a second hand-written interface
- Use `as` assertions to silence type errors instead of fixing the actual type

---
name: termination-guards
description: Every redirect, recursion, retry, scheduler and effect needs a stopping condition you can point at. Use when writing or reviewing redirect middleware, a redirect table, parent-child/tree data, a parser for a nested or binary format, cron/setInterval, retry logic, useEffect with setState, or infinite scroll. Trigger words: NextResponse.redirect, fromPath/toPath, parentId, recursive function, @Cron, while, useEffect deps.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# The stopping condition must be provable, not assumed

Ask of every cyclic construct: **what exactly guarantees that this terminates?** If the
answer is "the data is never like that", that is not a guarantee — it is an assumption about
data.

## 1. Normalise before comparing

An "a ≠ b" check only prevents a loop when both sides are in the same form.

```ts
// ❌ '/x' ≠ '/x/' → the check passes.
//    The middleware looks up redirects with the trailing slash already stripped:
//    /x → 308 → /x/ → strip slash → matches again → ERR_TOO_MANY_REDIRECTS
if (fromPath === toPath) throw new BadRequestException('must differ');

// ✅ normalise to the exact form the value will be looked up in
function normalizePath(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}
```

Normalisation lives in **one place** (the service), not at every entry point — otherwise the
next write path (an import, an automatic redirect on slug change) bypasses it.

## 2. Guard at the point of use, not only at the point of write

Write-time validation does not protect you from rows that entered the database earlier, by
hand, or through a migration.

```ts
// ✅ last line of defence: the target equals the current path — do not redirect
if (url.pathname !== request.nextUrl.pathname) {
  return NextResponse.redirect(url, redirect.permanent ? 308 : 307);
}
```

For chains (A→B→C) either collapse them on write or cap the number of hops with a number.
An uncapped chain is a loop that has not closed yet.

## 3. A bulk operation during an edit must exclude the row being edited

```ts
// ❌ swapping the paths of an existing redirect (A→B becomes B→A): deleteMany removes
//    the very row being edited, and the following update fails with P2025 → 500
await tx.redirect.deleteMany({ where: { fromPath: toPath, toPath: fromPath } });
await tx.redirect.update({ where: { id }, data });

// ✅ excludeId in EVERY bulk query, not just the one where somebody remembered
await tx.redirect.deleteMany({
  where: { fromPath: toPath, toPath: fromPath, ...(excludeId && { id: { not: excludeId } }) },
});
```

Rule: if a helper accepts `excludeId`, it applies it to **all** of its queries. A partially
applied exclusion is worse than none — it creates the illusion of protection.

## 4. Recursion needs a depth cap, even for "impossible" depths

```ts
// ❌ a box with size 0 runs to the end of the file; nested ones give a depth of
//    ~filesize/8 → on 50 MB that is a stack overflow
function findBox(buffer: Buffer, start: number, end: number) { /* ... */ }

// ✅
const MAX_DEPTH = 32; // real files are never deeper
function findBox(buffer: Buffer, start: number, end: number, depth = 0) {
  if (depth > MAX_DEPTH) return null;
  /* ... */
}
```

This applies to any traversal of data whose shape you do not control: parsers, JSON from a
third-party API, category/model trees with a `parentId` (where an A→B→A cycle is entirely
possible unless the database forbids it), recursive menu rendering.

For parent-child data keep a `visited: Set<string>` during traversal — nothing bounds the
chain length in the database.

## 5. A retry needs a maximum and a growing delay

`while (!ok)` with no counter is an infinite loop with network latency inside it. If an
external provider already handles retries (webhooks), do not stack your own loop on top —
return the right status code and let it retry.

## 6. A scheduler must not overlap itself

```ts
// ❌ sweeping the volume can take longer than an hour — the next tick starts on top
@Cron(CronExpression.EVERY_HOUR)
async sweep() { for (const t of this.targets()) await this.sweepDirectory(t); }

// ✅
@Cron(CronExpression.EVERY_HOUR)
async sweep() {
  if (this.sweeping) {
    this.logger.warn('Previous sweep still running — skipping this tick');
    return;
  }
  this.sweeping = true;
  try { for (const t of this.targets()) await this.sweepDirectory(t); }
  finally { this.sweeping = false; }
}
```

`finally` is mandatory: without it, the first error wedges the job forever.

## 7. An effect that writes the state it depends on

```tsx
// ❌ if `filters` is an object the parent recreates on every render, the effect fires
//    every time → new state object → render → effect → …
useEffect(() => { setDraft(draftFromFilters(filters)); }, [open, filters]);
```

This is only safe as long as `filters` arrives from a Server Component (a reference that is
stable across client renders). In other words, the safety here is **a property of the
parent**, and it disappears silently the moment the parent becomes a client component.
More robust:

- derive the value during render rather than in an effect
  (`if (prev !== next) setPrev(next)`);
- or put primitives in the deps (`filters.model`, `filters.q`), not the object;
- or memoise the object in the parent.

For infinite scroll the stopping condition is `data.length >= total`, plus the separate case
where a page returns zero items — without it the fetch repeats forever.

## Checklist

- [ ] Both sides of a comparison are normalised by one function in one place
- [ ] The point of use (middleware/render) guards against self-referential data
- [ ] Chains are collapsed on write or capped by a hop count
- [ ] `excludeId` is applied to **all** of a helper's bulk queries
- [ ] Recursion has a depth cap; parent-child traversal keeps a `visited` set
- [ ] Retries have a maximum; a provider's retries are not duplicated by your own loop
- [ ] Cron jobs have an "already running" flag, reset in `finally`
- [ ] No `useEffect` writes state it depends on through an unstable reference

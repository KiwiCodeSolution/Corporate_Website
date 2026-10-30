---
name: input-bounds-and-ownership
description: Every client-supplied value needs an upper bound, and every id that arrives in a request needs an ownership check. Use when writing or reviewing a DTO / request schema / query params, any handler with `:id` in the path, a Server Action, or when adding a new public endpoint. Trigger words: limit, page, quantity, sessionId, ids[], findUnique({ where: { id } }), @IsString(), @Public().
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Bound the value, check the owner

Two questions for **every** field that comes from outside:

1. **What is its upper bound?** If there is no answer, there is no bound — and an attacker
   will find that out before you do.
2. **Who owns the resource it addresses?** If the answer is "whoever knows the id", that is
   an IDOR.

## 1. No `@Max` means no bound

Type validation (`@IsInt()`, `@IsString()`) is **not** range validation. `@Min(1)` without
`@Max` is a declaration that infinity is allowed.

```ts
// ❌ ?limit=200000 pulls the whole catalogue with its relations into process memory
@IsInt() @Min(1)
limit?: number = 20;

// ❌ quantity: 2_000_000_000 overflows Decimal(10,2), wrecks the parcel weight sent to
//    the carrier, and blows past the payment provider's amount ceiling
@IsInt() @Min(1)
quantity?: number;

// ✅
@IsInt() @Min(1) @Max(100)
limit?: number = 20;

@IsInt() @Min(1) @Max(99)
quantity?: number;
```

Bounds that are never optional:

| Field | Bound | Why |
|---|---|---|
| `limit` / `pageSize` | `@Max(100)` | a page carries relations — cost is linear in limit |
| array `ids[]`, `tags[]` | `@ArrayMaxSize(100)` | becomes an `IN (...)` of arbitrary length |
| `search`, free text | `@MaxLength(100…191)` | `LIKE %…%` across unindexed columns |
| quantity, amount, weight | `@Max(<business ceiling>)` | gets multiplied by price/weight downstream |
| session id, token | `@IsUUID()`, not `@IsString()` | format is the cheapest bound there is |
| retention window in days | both `@Min` and `@Max` | `olderThanDays=0` in a purge means "delete everything" |

Rule for destructive parameters: **the lower bound is a safeguard too.** If an endpoint
deletes things "older than N", the minimum N must be deliberately large — otherwise a typo
wipes live data.

## 2. Authentication is not authorisation

`findUnique({ where: { id } })` with an id from the URL proves the resource exists, not
that it is yours.

```ts
// ❌ anyone who knows an item id edits someone else's cart
const item = await prisma.cartItem.findUnique({ where: { id } });

// ✅ the owner is part of the lookup, not a separate check afterwards
const item = await prisma.cartItem.findFirst({
  where: { id, cart: { sessionId } },
  select: { id: true },
});
if (!item) throw new NotFoundException();
```

Look it up **as a pair**, not in two steps: `findUnique` followed by
`if (item.ownerId !== me)` is easy to forget in the next method you write, whereas
`where: { id, ownerId }` cannot be skipped by accident.

The owner is not necessarily a logged-in user. In guest flows the owner is a secret held in
an httpOnly cookie (`sessionId`). The rule is unchanged.

**Return 404, not 403** for someone else's resource — a 403 confirms that the id exists.

## 3. A capability key never comes back in the response

When access is granted by knowing a secret (`sessionId`, invite token, capability id), that
secret must **not** appear in any response body. Otherwise a single missed ownership check
turns into full takeover of the object.

```ts
// ❌ sessionId ships in the response — one leaked item id hands the attacker the key
//    to the whole cart, including the ability to place an order from it
return { ...cart, partsTotal, total };

// ✅ return only what the client renders
return { promoCode: cart.promoCode, items: cart.items, partsTotal, total };
```

Check the consumers before keeping a field "just in case": `grep -r "cart.id"` — if nothing
reads it, it does not belong in the payload.

## 4. Closed by default

Register the guard globally and make public access an explicit opt-out (`@Public()`), never
the other way round. Reviewing a new endpoint starts with "why is `@Public()` here?", not
"did we remember the guard?".

**A Server Action / Route Handler is a public HTTP endpoint.** The fact that your own button
calls it guarantees nothing: the arguments travel over the network and anything can be
substituted.

```ts
// ❌ itemId comes from the client and nobody checks who owns it
export async function removeCartItem(itemId: string) {
  await apiFetch(`/cart/items/${itemId}`, { method: "DELETE" });
}

// ✅ take the owner from the httpOnly cookie on the server, pass it as a lookup criterion
export async function removeCartItem(itemId: string) {
  const sessionId = cookies().get(CART_SESSION_COOKIE)?.value;
  if (!sessionId) return;
  await apiFetch(`/cart/items/${itemId}?sessionId=${encodeURIComponent(sessionId)}`, {
    method: "DELETE",
  });
}
```

## 5. Mass assignment

`whitelist: true` plus `forbidNonWhitelisted: true` in the global ValidationPipe is
mandatory — but it is only the first line. The second: a field the client must not change is
**simply absent from the DTO** (`role`, `isAdmin`, `status`, `price`, `usedCount`). Do not
rely on "nobody will guess it".

And never write a whole DTO into a record when it carries lookup fields:

```ts
// ❌ sessionId is a lookup criterion, not a column on the item
await prisma.cartItem.update({ where: { id }, data: dto });

// ✅
const { sessionId, ...data } = dto;
await prisma.cartItem.update({ where: { id }, data });
```

## Checklist

- [ ] Every numeric field has `@Max`, every string `@MaxLength`, every array `@ArrayMaxSize`
- [ ] Session ids / tokens are validated by format (`@IsUUID`), not `@IsString`
- [ ] Every `:id` from a request is looked up as a pair `{ id, <owner> }`
- [ ] Someone else's resource returns 404, not 403
- [ ] The access secret never appears in a response
- [ ] A new endpoint stays closed until `@Public()` is added deliberately
- [ ] Server Actions take the owner from a cookie, not from their arguments
- [ ] Privileged fields are absent from the DTO, not filtered out "somewhere later"

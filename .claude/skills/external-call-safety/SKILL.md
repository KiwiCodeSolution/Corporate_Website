---
name: external-call-safety
description: Every outbound call to a third-party service needs a timeout, must never forward its error body to the client, and must never sit after a local state commit. Use when integrating a payment gateway, carrier, mail/SMS provider or any external API, and when receiving a webhook. Trigger words: fetch to a third party, axios, SOAP, Stripe, getRates, sendMail, webhook, constructEvent, idempotencyKey.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Calling someone else's service safely

A third-party service means "slow, sometimes never, sometimes nonsense in the body". Write
the code for all three.

## 1. No timeout means no bound on waiting

`fetch` in Node without a signal waits **forever**. One hanging carrier holds the customer's
HTTP request open until you run out of workers.

```ts
// ❌
const response = await fetch(this.ratesUrl, { method: 'POST', headers, body });

// ✅ one entry point for every outbound call this service makes
private async post(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, {
      ...init,
      method: 'POST',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS), // 10_000 is a sane default
    });
  } catch (error) {
    this.logger.error(`Request to ${url} failed: ${String(error)}`);
    throw this.unavailable();
  }
}
```

Timeouts matter most when the call sits **on the conversion path** (placing an order,
paying). There, a fast failure beats a slow success.

`Promise.allSettled` does not save you: it waits until **all** promises settle. Without a
timeout inside each one, it waits forever just the same.

## 2. The upstream error body does not reach the client

```ts
// ❌ a public endpoint hands back the carrier's raw error text — which can contain
//    the account number, contract details, internal SOAP or a stack trace
throw new InternalServerErrorException(`Rating error: ${await response.text()}`);

// ✅ the full text goes to the log, the client gets one neutral answer
this.logger.error(`Rating error (${response.status}): ${await response.text()}`);
throw new ServiceUnavailableException('Rating is temporarily unavailable');
```

One private `unavailable()` per service, so the response shape cannot drift between methods.
Use 503, not 500: this is a dependency being temporarily unavailable, and that is how both
clients and monitoring will read it.

Same on the front end: never show the user an upstream `error.message` — it can be a
gateway's raw HTML. Log it and show translated copy.

## 3. The unreliable call goes BEFORE the local commit

The most expensive mistake on this list. If the order is "write, then call the third party",
a failure of that third party leaves state you can no longer roll back.

```ts
// ❌ the cart is already deleted and the promo code already consumed when the
//    payment gateway fails. Customer without a cart, order that cannot be paid.
const order = await prisma.$transaction(async (tx) => {
  await tx.promoCode.updateMany({ ..., data: { usedCount: { increment: 1 } } });
  const created = await tx.order.create({ data: {...} });
  await tx.cart.delete({ where: { id: cart.id } });
  return created;
});
const intent = await stripe.paymentIntents.create({ ... });   // ← fails here

// ✅ generate the id yourself, make the external call first, and let the transaction
//    commit a finished result. If the gateway fails, nothing in the database changed.
const orderId = randomUUID();
const intent = dto.paymentMethod === 'CARD'
  ? await paymentService.createPaymentIntent(orderId, total, currency)
  : null;

const order = await prisma.$transaction(async (tx) => {
  /* ... */
  return tx.order.create({ data: { id: orderId, stripePaymentIntentId: intent?.id, ... } });
});
```

A welcome side effect of the correct order: the extra `UPDATE` that back-filled the payment
id disappears.

The cost of failure in the new order is an "orphaned" object at the provider that nobody
confirms. Providers cancel those themselves, and it is orders of magnitude cheaper than a
lost cart.

**An external call never sits inside an open database transaction** — HTTP would hold row
locks for seconds.

## 4. Idempotency on every mutating operation

Network retries, double clicks and repeated webhooks are normal, not exceptional.

- Outbound calls: an `idempotencyKey` derived deterministically from the business object
  (`order-intent-${orderId}`, `order-refund-${orderId}`), never random.
- Inbound webhooks: the handler must be safe under repetition. The simplest form is a
  conditional update that does nothing when the state is already the target:

```ts
// the transition is idempotent, and a terminal state is not rolled back by a late retry
await prisma.order.updateMany({
  where: {
    paymentIntentId,
    paymentStatus: status === 'REFUNDED' ? { not: 'REFUNDED' } : { notIn: [status, 'REFUNDED'] },
  },
  data: { paymentStatus: status },
});
```

- Gate side effects (email, credit) on **the fact of the effect** (`invoiceSentAt`), not on
  the status transition — then a retry can still deliver what failed last time.

## 5. Webhooks: verify the signature, and a bad signature is 4xx

```ts
// ❌ the verification exception escapes → Nest returns 500 → the provider retries
//    for three days a request that can never succeed
const event = paymentService.constructWebhookEvent(req.rawBody, signature);

// ✅
let event: Stripe.Event;
try {
  event = paymentService.constructWebhookEvent(req.rawBody, signature);
} catch (error) {
  this.logger.warn(`Rejected webhook: ${String(error)}`);
  throw new BadRequestException('Invalid signature');
}
```

Distinguish two classes of failure inside a webhook:
- **permanently invalid request** (signature, schema) → 4xx, retrying is pointless;
- **temporary failure on our side** (database, mail) → 5xx, and the provider's retry *is*
  your retry queue. Do not swallow those for the sake of a tidy 200.

The webhook secret is a separate environment variable from the API key.

## 6. Never trust amounts or rates from the client

Price, discount, delivery cost, tax and weight are recomputed server-side from the database
and from a live carrier response. The client sends only a **choice** (product id, service
code, promo code) — never a number.

## Checklist

- [ ] Every outbound `fetch` carries an `AbortSignal.timeout`
- [ ] Upstream error bodies go to the log; the client gets a neutral 503
- [ ] The unreliable call precedes the local commit and sits outside the transaction
- [ ] Mutating operations carry a deterministic `idempotencyKey`
- [ ] Webhook handlers are repeat-safe, signatures are verified, bad signature → 400
- [ ] Side effects are gated on a fact flag, not on a status transition
- [ ] No monetary amount arrives from the client

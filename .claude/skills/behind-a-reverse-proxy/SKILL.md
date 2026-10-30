---
name: behind-a-reverse-proxy
description: Behind a reverse proxy an app sees the proxy's address instead of the client's by default, so everything that relies on IP (rate limiting, geo, audit trails, secure cookies) is wrong and silently so. Use when configuring rate limiting, logging or storing IPs, putting an app behind nginx/Traefik/Cloudflare, or when a rate limit starts firing "for everyone at once". Trigger words: trust proxy, X-Forwarded-For, req.ip, ThrottlerGuard, express behind proxy, rate limit 429.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Proxy trust: one line, without which the IP is fiction

## The symptom you cannot reproduce locally

Locally the client talks to the server directly — `req.ip` is correct and everything works.
In production nginx sits in between, and `req.ip` becomes nginx's address. Nothing throws,
nothing fails at boot, and it only shows up under load.

Consequences, in ascending order of unpleasantness:

1. **The rate limit becomes shared across the entire internet.** A limit of
   "100 requests/min" turns into 100 requests/min **in total** — the storefront starts
   returning 429 to everyone at the slightest traffic.
2. **Brute-force protection turns into a DoS.** `@Throttle(5/60s)` on `/auth/login`: anyone
   can lock every administrator out with five requests.
3. **Audit records lie.** An "immutable record of consent" holding an IP that is really the
   proxy's — or worse, taken from the raw `X-Forwarded-For`, which the client sets itself.
4. Geo, anti-fraud, protocol detection for `secure` — all built on the same data.

## The rule

```ts
// One trusted proxy — the host's nginx.
// Without this, req.ip equals the proxy's address on EVERY request.
const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.set('trust proxy', 1);
```

The number is the **count of trusted hops on the server side**, not an on/off switch:

| Topology | Value |
|---|---|
| direct access, no proxy | do not set it at all |
| one nginx on the same host | `1` |
| Cloudflare → nginx | `2` |
| unknown / variable | a list of subnets, not a number |

`trust proxy: true` (trust everyone) is a mistake: the client's own `X-Forwarded-For` is then
taken as truth, and spoofing an IP becomes trivial.

After that:

```ts
// ✅ Express has already parsed the chain: req.ip is the client, and it cannot be forged
const ipAddress = req.ip ?? null;

// ❌ parsing the header by hand — the client sends that header itself
const forwarded = req.headers['x-forwarded-for'];
const ipAddress = String(forwarded).split(',')[0].trim();
```

Why hand-parsing is worse: nginx **appends** the real IP to the end of the chain
(`$proxy_add_x_forwarded_for`). Taking the first element gives you exactly what the client
sent. `trust proxy: N` takes the right element from the right end.

## nginx must send the headers

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:4020/;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    client_max_body_size 60m;   # must match the real upload limit, or the default 1 MB
                                # produces a baffling 413
}
```

## Internal calls are a separate case

In a monorepo with SSR, the front end calls the API **inside the network**, bypassing the
proxy. That is a second "client" whose entire traffic shares one IP. Consequences:

- all SSR traffic shares a single rate-limit bucket;
- a service forwarding the end user's IP must send `X-Forwarded-For` explicitly — and then
  `trust proxy` on the receiving side parses it correctly.

If SSR traffic is significant, take internal calls out from under the shared limit (a
separate tracker, a separate key, an internal-subnet allowlist) rather than raising the
limit for everyone.

## Cookies behind a proxy

`secure: true` requires the app to know the outside connection is TLS. Without
`trust proxy` plus `X-Forwarded-Proto` it sees plain http from the proxy and may refuse to
set the cookie. And the mirror rule: **`clearCookie` must receive the same attributes**
(`httpOnly`, `secure`, `sameSite`, `path`, `domain`) as `cookie` did when setting it —
otherwise the browser will not delete it in production and logout silently does nothing.

## Verify, do not hope

```bash
# from two different addresses — only the one that exceeded should be limited
for i in $(seq 1 10); do curl -s -o /dev/null -w "%{http_code}\n" https://site/api/v1/health; done

# a forged header must not override the IP in logs / audit records
curl -H 'X-Forwarded-For: 1.2.3.4' https://site/api/v1/…
```

## Checklist

- [ ] `trust proxy` set to a number matching the real proxy count
- [ ] Not `trust proxy: true` without a subnet list
- [ ] No hand-parsing of `X-Forwarded-For` anywhere
- [ ] nginx sends `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`
- [ ] `client_max_body_size` matches the app's upload limit
- [ ] Internal SSR traffic does not eat the shared rate limit
- [ ] `clearCookie` attributes match the `cookie` attributes
- [ ] The limit was verified from two different addresses, not assumed

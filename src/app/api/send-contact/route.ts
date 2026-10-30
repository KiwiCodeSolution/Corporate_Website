import { escapeHTML } from '@/utils/helpers';
import { ContactFormValues, contactFormSchema } from '@/utils/schemas/contactForm.validation';

const TELEGRAM_TIMEOUT_MS = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;

// Per-process, per-IP request timestamps. Expired entries are evicted on every call,
// so the map stays bounded by the number of clients seen within one window.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  for (const [key, times] of hits) {
    if (times[times.length - 1] < windowStart) hits.delete(key);
  }

  const recent = (hits.get(ip) ?? []).filter((time) => time > windowStart);
  const limited = recent.length >= RATE_LIMIT;
  if (!limited) recent.push(now);
  hits.set(ip, recent);

  return limited;
}

// nginx sets X-Real-IP and appends the client to X-Forwarded-For; the first XFF entry is
// client-controlled, so only the last one is trusted.
function getClientIp(req: Request) {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return req.headers.get('x-forwarded-for')?.split(',').pop()?.trim() || null;
}

function buildMessage({ name, email, phone, description }: ContactFormValues) {
  return [
    '<b><i>-------Нова заявка з сайту KiWiCode-------</i></b>',
    '',
    `<b>Ім’я:</b> ${escapeHTML(name)}`,
    `<b>Електронна пошта:</b> ${escapeHTML(email)}`,
    `<b>Телефон:</b> ${escapeHTML(phone ?? '')}`,
    `<b>Опис проєкту:</b> ${escapeHTML(description ?? '')}`,
  ].join('\n');
}

const fail = (status: number) => Response.json({ success: false }, { status });

export async function POST(req: Request) {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env;
  if (!token || !chatId) {
    console.error('send-contact: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set');
    return fail(503);
  }

  // Without a client IP (no proxy headers) a shared bucket would block everyone, so skip.
  const ip = getClientIp(req);
  if (ip && isRateLimited(ip)) return fail(429);

  let values: ContactFormValues;
  try {
    // strict: no type coercion — `name: 123` is rejected instead of becoming "123"
    values = await contactFormSchema().validate(await req.json(), { strict: true });
  } catch {
    return fail(400);
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: buildMessage(values), parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    const result = await res.json();

    if (!result.ok) {
      console.error(`send-contact: Telegram error (${res.status}): ${result.description}`);
      return fail(503);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('send-contact: request to Telegram failed:', error);
    return fail(503);
  }
}

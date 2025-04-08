import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = requestLocale;

  const locale = hasLocale(routing.locales, requestedLocale);

  return {
    locale,
    messages: await import(`../../public/locales/${locale}.json`).default,
  };
});

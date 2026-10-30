import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing, TIME_ZONE } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    timeZone: TIME_ZONE,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});

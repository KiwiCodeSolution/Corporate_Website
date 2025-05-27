import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ua', 'en'],
  defaultLocale: 'ua',
});

export type AppLocale = (typeof routing)['locales'][number];

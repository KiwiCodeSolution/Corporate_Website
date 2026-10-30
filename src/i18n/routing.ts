import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
});

export type AppLocale = (typeof routing)['locales'][number];

export const TIME_ZONE = 'Europe/Kyiv';

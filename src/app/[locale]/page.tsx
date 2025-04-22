import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
// import OurServicesSection from '@/components/sections/OurServices';

export default async function Home() {
  // throw Error('test error');

  const t = await getTranslations('Home');

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Title tag={'h1'}>{t('title')}</Title>
      <LocaleToggle />
      <ThemeToggle />
      {/* <OurServicesSection locale={locale} /> */}
    </main>
  );
}

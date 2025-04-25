import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
import PaginationButton from '@/components/ui/buttons/PaginationButton';
// import OurServicesSection from '@/components/sections/OurServices';

export default async function Home() {
  // throw Error('test error');
  // console.log('icon: ', Icon);

  const t = await getTranslations('Home');

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Title tag={'h1'}>{t('title')}</Title>
      <LocaleToggle />
      <ThemeToggle />
      <PaginationButton variant="number" direction="left" />
      {/* <OurServicesSection locale={locale} /> */}
    </main>
  );
}

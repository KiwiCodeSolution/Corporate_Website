import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
import HowWeWorkSection from '@/components/sections/HowWeWork';
import OurServicesSection from '@/components/sections/OurServices';

export default async function Home({ params }) {
  const { locale } = await params;

  // throw Error('test error');

  const t = await getTranslations('Home');

  return (
    <main className="">
      <Title tag={'h1'}>{t('title')}</Title>
      <LocaleToggle />
      <ThemeToggle />
      <OurServicesSection locale={locale} />
      <HowWeWorkSection />
    </main>
  );
}

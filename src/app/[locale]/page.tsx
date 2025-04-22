import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

export default async function Home({ params }) {
  const { locale } = await params;

  // throw Error('test error');

  const t = await getTranslations('Home');

  return (
    <>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Title tag={'h1'}>{t('title')}</Title>
        <LocaleToggle />
        <ThemeToggle />
      </main>
      <Footer locale={locale} />
    </>
  );
}

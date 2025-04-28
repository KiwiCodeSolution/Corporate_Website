import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
import PaginationButton from '@/components/ui/buttons/PaginationButton';
import IconButton from '@/components/ui/buttons/IconButton';
// import OurServicesSection from '@/components/sections/OurServices';

import HowWeWorkSection from '@/components/sections/HowWeWork';
import OurServicesSection from '@/components/sections/OurServices';

export default async function Home({ params }) {
  const { locale } = await params;

  // throw Error('test error');
  // console.log('icon: ', Icon);

  const t = await getTranslations('Home');

  return (
    <main className="overflow-hidden mx-auto relative">
      <Title tag={'h1'}>{t('title')}</Title>
      <LocaleToggle />
      <ThemeToggle />
      {/* <PaginationButton variant="number" direction="left" /> */}
      {/* <IconButton label="Learn more"> */}
      {/* </IconButton> */}
      {/* <OurServicesSectio  n locale={locale} /> */}

      <OurServicesSection locale={locale} />
      <HowWeWorkSection />
    </main>
  );
}

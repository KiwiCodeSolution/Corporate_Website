import PaginationButton from '@/components/ui/buttons/PaginationButton';
import OurServicesSection from '@/components/sections/OurServices';
import PortfolioSection from '@/components/sections/Portfolio';
// import OurServicesSection from '@/components/sections/OurServices';
import HowWeWorkSection from '@/components/sections/HowWeWork';
import IconButton from '@/components/ui/buttons/IconButton';
import AboutSection from '@/components/sections/About';
import NewsSection from '@/components/sections/News';
import LocaleToggle from '@/components/LocaleToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';

// import PortfolioPageTest from '@/components/sections/OurPrincipes';

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
      <AboutSection />
      {/* <PortfolioPageTest locale={locale} /> */}
      <OurServicesSection locale={locale} />
      <PortfolioSection locale={locale} />
      <HowWeWorkSection />

      <NewsSection locale={locale} page="home" />
    </main>
  );
}

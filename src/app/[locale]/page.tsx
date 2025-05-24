import OurServicesSection from '@/components/sections/OurServices';
import PortfolioSection from '@/components/sections/Portfolio';
import HowWeWorkSection from '@/components/sections/HowWeWork';
import AboutSection from '@/components/sections/About';
import NewsSection from '@/components/sections/News';

export default async function Home({ params }) {
  const { locale } = await params;

  return (
    <main className="relative mx-auto overflow-hidden">
      <AboutSection />
      <OurServicesSection locale={locale} />
      <PortfolioSection locale={locale} />
      <HowWeWorkSection />
      <NewsSection locale={locale} page="home" />
    </main>
  );
}

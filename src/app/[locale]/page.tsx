import OurServicesSection from '@/components/sections/OurServices';
import PortfolioSection from '@/components/sections/Portfolio';
import HowWeWorkSection from '@/components/sections/HowWeWork';
import AboutSection from '@/components/sections/About';
import NewsSection from '@/components/sections/News';
import Hero from '@/components/sections/Hero';
import OurPrinciplesSection from '@/components/sections/OurPrinciples';

export default async function Home({ params }) {
  const { locale } = await params;

  return (
    <main className="relative mx-auto overflow-hidden">
      <Hero />
      <AboutSection />
      <OurServicesSection locale={locale} />
      <OurPrinciplesSection />
      <PortfolioSection locale={locale} />
      <HowWeWorkSection />
      <NewsSection locale={locale} page="home" />
    </main>
  );
}

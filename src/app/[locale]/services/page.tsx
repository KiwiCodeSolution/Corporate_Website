import { getTranslations } from 'next-intl/server';
import HeroServicesPage from '@/components/sections/HeroServicesPage';
import Title from '@/components/Title';
import ServicesDetails from '@/components/ServicesDetails';
import RunningLine from '@/components/RunningLine';
import OurProcess from '@/components/sections/OurProcess';

export default async function Services({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const t = await getTranslations('Services_Page');
  const { locale } = await params;

  return (
    <main className="relative z-[1] mx-auto overflow-hidden w-full min-h-screen pt-16  xl:py-[104px]">
      <section className="w-full ">
        <div className="wrapper mx-auto">
          <Title tag="h1" styles="mb-10 xl:mb-12">
            {t('title')}
          </Title>
        </div>
      </section>
      <HeroServicesPage />
      <ServicesDetails numbers={[0, 1]} />
      <RunningLine />
      <ServicesDetails numbers={[2, 3]} />
      <OurProcess />
      <ServicesDetails numbers={[4, 5]} />
    </main>
  );
}

import PortfolioPageBaseSection from '@/components/PortfolioPageBaseSection';

export default async function Portfolio({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { locale } = await params;

  return (
    <main className="relative z-[1] mx-auto overflow-hidden w-full min-h-screen portfolio-page-main">
      <PortfolioPageBaseSection locale={locale} />
    </main>
  );
}

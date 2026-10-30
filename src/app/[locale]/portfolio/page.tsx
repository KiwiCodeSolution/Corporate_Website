import PortfolioPageBaseSection from '@/components/PortfolioPageBaseSection';
import { AppLocale } from '@/i18n/routing';

export default async function Portfolio({
  params,
}: {
  params: Promise<{ slug: string; locale: AppLocale }>;
}) {
  const { locale } = await params;

  return (
    <main className="relative z-[1] mx-auto overflow-hidden w-full min-h-screen portfolio-page-main">
      <PortfolioPageBaseSection locale={locale} />
    </main>
  );
}

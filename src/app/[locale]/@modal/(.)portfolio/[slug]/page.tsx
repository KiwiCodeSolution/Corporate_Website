import { PortfolioItem } from '@/components/PortfolioCard';
import PortfolioPageComponent from '@/components/PortfolioPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';
import allCases from '@/data/cases.json';

export default async function PortfolioModalSlotPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentCase = allCases.find((item) => item.slug === slug) as PortfolioItem;

  if (!currentCase) return null;

  return (
    <RouteModal type="modalOnPage">
      <PortfolioPageComponent item={currentCase} locale={locale} />
    </RouteModal>
  );
}

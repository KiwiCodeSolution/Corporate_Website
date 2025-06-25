import { PortfolioItem } from '@/components/PortfolioCard';
import PortfolioPageComponent from '@/components/PortfolioPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';
import { getCase } from '@/utils/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'ua' | 'en' }>;
}) {
  const { slug } = await params;
  const findCase = getCase(slug);

  return {
    title: findCase?.title || 'Case',
    description: findCase?.description || '',
  };
}

export default async function PortfolioModalSlotPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentPortfolio = getCase(slug) as PortfolioItem;

  if (!currentPortfolio) return null;

  return (
    <RouteModal type="modalOnPage">
      <PortfolioPageComponent item={currentPortfolio} locale={locale} />
    </RouteModal>
  );
}

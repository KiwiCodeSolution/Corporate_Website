import NewsPageComponent from '@/components/NewsPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';
import { getNews } from '@/utils/api';
import { AppLocale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: AppLocale }>;
}) {
  const { slug } = await params;
  const findNews = getNews(slug);

  return {
    title: findNews?.title || 'News',
    description: findNews?.description || '',
  };
}

export default async function NewsModalSlotPage({
  params,
}: {
  params: Promise<{ slug: string; locale: AppLocale }>;
}) {
  const { slug, locale } = await params;
  const currentNews = getNews(slug);

  if (!currentNews) return null;

  return (
    <RouteModal type="modalOnPage">
      <NewsPageComponent news={currentNews} locale={locale} />
    </RouteModal>
  );
}

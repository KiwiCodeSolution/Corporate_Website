import NewsPageComponent from '@/components/NewsPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';
import { getNews } from '@/utils/api';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const findNews = getNews(params.slug);

  return {
    title: findNews.title,
    description: findNews.description,
  };
}

export default async function NewsModalSlotPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
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

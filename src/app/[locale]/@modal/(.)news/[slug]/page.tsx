import { NewsItem } from '@/components/NewsCard';
import NewsPageComponent from '@/components/NewsPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';

import allNews from '@/data/news.json';

export default async function NewsModalSlotPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentNews = allNews.find((news) => news.slug === slug) as NewsItem;

  if (!currentNews) return null;

  return (
    <RouteModal type="modalOnPage">
      <NewsPageComponent news={currentNews} locale={locale} />
    </RouteModal>
  );
}

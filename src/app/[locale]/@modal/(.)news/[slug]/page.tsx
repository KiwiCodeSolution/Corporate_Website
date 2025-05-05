import NewsModalComponent from '@/components/NewsPageComponent';
import { RouteModal } from '@/components/ui/modal/RouteModal';

import allNews from '@/data/news.json';

export default async function NewsModalSlotPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const currentNews = allNews.find((news) => news.slug === slug);

  if (!currentNews) return null;

  return (
    <RouteModal>
      <NewsModalComponent news={currentNews} />
    </RouteModal>
  );
}

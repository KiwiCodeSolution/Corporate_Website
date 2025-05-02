import NewsModal from '@/components/NewsModal';

import allNews from '@/data/news.json';

export default async function NewsModalSlotPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const currentNews = allNews.find((news) => news.slug === slug);

  // console.log('hi i am Intercepting NewsModalPage', currentNews);
  if (!currentNews) return null;

  return <NewsModal news={currentNews} />;
}

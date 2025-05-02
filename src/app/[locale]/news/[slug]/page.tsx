import NewsPageComponent from '@/components/NewsPageComponent';
import allNews from '@/data/news.json';

export default async function NewsModalPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const currentNews = allNews.find((news) => news.slug === slug);
  if (!currentNews) return null;

  return <NewsPageComponent id={slug} />;
}

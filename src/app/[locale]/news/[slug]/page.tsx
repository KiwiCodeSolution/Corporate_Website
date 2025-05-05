import NewsPageComponent from '@/components/NewsPageComponent';
import allNews from '@/data/news.json';
import { Link } from '@/i18n/navigation';

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const currentNews = allNews.find((news) => news.slug === slug);
  if (!currentNews) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
      <h1 className="text-2xl font-bold">Test Link Modal</h1>
      <NewsPageComponent news={currentNews} />
      <h1>Now we are here, page </h1>
      <Link href="/">Go to Home</Link>
      <div className="w-full h-2 bg-red-500" />
    </div>
  );
}

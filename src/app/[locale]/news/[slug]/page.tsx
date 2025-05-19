import NewsPageComponent from '@/components/NewsPageComponent';
import NewsSection from '@/components/sections/News';
import { Link } from '@/i18n/navigation';
import { getNews } from '@/utils/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'ua' | 'en' }>;
}) {
  const { slug } = await params;
  const findNews = getNews(slug);

  return {
    title: findNews?.title || 'News',
    description: findNews?.description || '',
  };
}

export default async function NewsPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentNews = getNews(slug);
  if (!currentNews) return null;

  return (
    <main className="w-full items-center justify-center bg-bgColor relative">
      <Link href="/" className="text-accent text-xl font-extrabold absolute top-2 left-2">
        Go to Home
      </Link>
      <section className="w-full py-10">
        <div className="wrapper mx-auto">
          <NewsPageComponent news={currentNews} locale={locale} />
        </div>
      </section>
      <NewsSection locale={locale} page="newsPage" />
    </main>
  );
}

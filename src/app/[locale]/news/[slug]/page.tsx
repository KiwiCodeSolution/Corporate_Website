import NewsPageComponent from '@/components/NewsPageComponent';
import AllCasesLink from '@/components/ui/links/AllCasesLink';
import allNews from '@/data/news.json';
import { Link } from '@/i18n/navigation';

export default async function NewsPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentNews = allNews.find((news) => news.slug === slug);
  if (!currentNews) return null;

  return (
    <main className="w-full h-screen flex items-center justify-center bg-light dark:bg-dark relative">
      <Link href="/" className="text-accent text-xl font-extrabold absolute top-2 left-2">
        Go to Home
      </Link>
      <section className="w-full py-10">
        <div className="wrapper mx-auto">
          <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
            <NewsPageComponent news={currentNews} locale={locale} />
            <AllCasesLink
              href="/news"
              locale={locale}
              className={'w-fit mx-auto mb-10'}
              section="news"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

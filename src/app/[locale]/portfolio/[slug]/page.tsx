import { PortfolioItem } from '@/components/PortfolioCard';
import PortfolioPageComponent from '@/components/PortfolioPageComponent';
import { Link } from '@/i18n/navigation';
import { getCase } from '@/utils/api';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const findCase = await getCase(params.slug);

  return {
    title: findCase.title,
    description: findCase.description,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: { slug: string; locale: 'ua' | 'en' };
}) {
  const { slug, locale } = await params;
  const currentPortfolio = getCase(slug) as PortfolioItem;

  if (!currentPortfolio) return null;

  return (
    <main className="w-full items-center justify-center bg-bgColor relative">
      <Link href="/" className="text-accent text-xl font-extrabold absolute top-2 left-2">
        Go to Home
      </Link>
      <section className="w-full py-10">
        <div className="wrapper mx-auto">
          <PortfolioPageComponent item={currentPortfolio} locale={locale} />
        </div>
      </section>
    </main>
  );
}

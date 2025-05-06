import { useTranslations } from 'next-intl';
import allNews from '@/data/news.json';
import Title from '../Title';
import NewsCarrouselComponent from '../NewsCarrouselComponent';

const NewsSection = ({ locale, page }: { locale: 'ua' | 'en'; page: 'home' | 'newsPage' }) => {
  const t = useTranslations('News');
  const title = page === 'home' ? t('title_home') : t('title_page_by_slug');
  return (
    <section className="w-full h-[749px] md:min-h-[710px] news mb-[100px]">
      <div className="wrapper mx-auto h-full">
        <Title tag={'h2'} styles="mb-10">
          {title}
        </Title>
        <NewsCarrouselComponent locale={locale} newsArray={allNews} />
      </div>
    </section>
  );
};

export default NewsSection;

// import { useTranslations } from 'next-intl';
import allNews from '@/data/news.json';
import Title from '../Title';
import NewsCarrouselComponent from '../NewsCarrouselComponent';

const NewsSection = ({ locale }: { locale: 'ua' | 'en' }) => {
  return (
    <section className="w-full h-[710px] relative news">
      <div className="wrapper mx-auto">
        <Title tag={'h2'} styles="mb-10">
          News
        </Title>
        <NewsCarrouselComponent locale={locale} newsArray={allNews} />
      </div>
    </section>
  );
};

export default NewsSection;

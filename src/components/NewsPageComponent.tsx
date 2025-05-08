import NewsCard, { NewsItem } from './NewsCard';

export type NewsPageComponentProps = {
  news: NewsItem;
  locale: 'ua' | 'en';
};

const NewsPageComponent = ({ news, locale }: NewsPageComponentProps) => {
  return <NewsCard news={news} locale={locale} section="modal" />;
};

export default NewsPageComponent;

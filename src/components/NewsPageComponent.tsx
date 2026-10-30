import { AppLocale } from '@/i18n/routing';
import NewsCard, { NewsItem } from './NewsCard';

export type NewsPageComponentProps = {
  news: NewsItem;
  locale: AppLocale;
};

const NewsPageComponent = ({ news, locale }: NewsPageComponentProps) => {
  return <NewsCard news={news} locale={locale} section="modal" />;
};

export default NewsPageComponent;

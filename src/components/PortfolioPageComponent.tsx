import { AppLocale } from '@/i18n/routing';
import PortfolioCard, { PortfolioItem } from './PortfolioCard';

export type PortfolioPageComponentProps = {
  item: PortfolioItem;
  locale: AppLocale;
};

const PortfolioPageComponent = ({ item, locale }: PortfolioPageComponentProps) => {
  return <PortfolioCard item={item} locale={locale} section="modal" />;
};

export default PortfolioPageComponent;

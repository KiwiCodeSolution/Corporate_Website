export type PortfolioType =
  | 'UI/UX Design'
  | 'Development'
  | 'SMM'
  | 'Marketing'
  | 'Branding'
  | 'Optimisation'
  | 'Creative Solutions';

export type PortfolioItem = {
  id: number;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image: string;
  date: string;
  slug: string;
  type: PortfolioType[];
};

type PortfolioCardProps = {
  item: PortfolioItem;
  locale: 'ua' | 'en';
  section: 'card' | 'modal' | 'page';
};

const PortfolioCard = ({ item, locale, section }: PortfolioCardProps) => {
  return (
    <article>
      <h1>{item.title}</h1>
    </article>
  );
};

export default PortfolioCard;

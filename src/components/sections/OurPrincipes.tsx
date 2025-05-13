import allCases from '@/data/cases.json';

import PortfolioCasePreview from '../PortfolioCasePreview';
import { PortfolioType } from '../PortfolioCard';

const allowedTypes: PortfolioType[] = [
  'UI/UX Design',
  'Development',
  'SMM',
  'Marketing',
  'Branding',
  'Optimisation',
  'Creative Solutions',
];

const PortfolioPageTest = ({ locale }: { locale: 'ua' | 'en' }) => {
  const castedCases = allCases.map((el) => ({
    ...el,
    type: Array.isArray(el.type)
      ? el.type.filter((t: string): t is PortfolioType => allowedTypes.includes(t as PortfolioType))
      : allowedTypes.includes(el.type as PortfolioType)
        ? [el.type as PortfolioType]
        : [],
  }));

  return (
    <section>
      <div className="wrapper mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {castedCases.map((el) => (
          <PortfolioCasePreview key={el.id} item={el} locale={locale} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioPageTest;

import { PortfolioType } from '@/components/PortfolioCard';
import PortfolioCasePreview from '@/components/PortfolioCasePreview';
import allCases from '@/data/cases.json';

const allowedTypes: PortfolioType[] = [
  'UI/UX Design',
  'Development',
  'SMM',
  'Marketing',
  'Branding',
  'Optimisation',
  'Creative Solutions',
];

export default function Portfolio({ locale }: { locale: 'ua' | 'en' }) {
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
        {castedCases.map((el, index) => (
          <PortfolioCasePreview key={el.id} item={el} locale={locale} index={index} />
        ))}
      </div>
    </section>
  );
}

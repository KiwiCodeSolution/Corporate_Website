import { useTranslations } from 'next-intl';
import casesRaw from '@/data/cases.json';

import PortfolioCarrouselComponent from '../PortfolioCarrouselComponent';
import { PortfolioItem } from '../PortfolioCard';
import Title from '../Title';

const PortfolioSection = ({ locale }) => {
  const t = useTranslations('Cases');
  const cases: PortfolioItem[] = casesRaw as PortfolioItem[];

  return (
    <section className="w-full h-[576px] portfolio relative mb-[120px]">
      <div className="wrapper">
        <Title tag="h2" styles="mb-10">
          {t('title_home')}
        </Title>
      </div>

      <PortfolioCarrouselComponent portfolioArray={cases} locale={locale} />
    </section>
  );
};

export default PortfolioSection;

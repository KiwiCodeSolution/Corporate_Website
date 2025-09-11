import { getTranslations } from 'next-intl/server';
import companyStats from '@/data/company-stats.json';
import CompanyStatsList from '../ui/CompanyStatsList';
import Title from '../Title';

export default async function AboutSection() {
  const t = await getTranslations('About');

  return (
    <section className="w-full" id="about">
      <div className="wrapper mx-auto bg-bgColor">
        <Title tag="h2">About company</Title>
        <div className="flex flex-col gap-2  xl:flex-row mt-[40px] md:mt-[60px]">
          <CompanyStatsList
            data={companyStats}
            className="grid grid-cols-2 auto-rows-fr gap-4 md:gap-6 xl:gap-4 flex-1"
          />
          <div
            className="flex flex-col gap-10 mt-10 xl:mt-0 pl-0 xl:pl-20 bg-bgColor flex-1 xl:max-w-1/2
                          text-[18px] md:text-[24px] leading-[1.3] xl:leading-[1.4] font-semibold"
          >
            <p>
              <span className="inline-block bg-linear-to-b from-[#5BD187] to-blue leading-[0.85] bg-clip-text text-transparent">
                KiWiCode Solutions
              </span>{' '}
              {t('description.paragraph-1')}
            </p>
            <p>{t('description.paragraph-2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

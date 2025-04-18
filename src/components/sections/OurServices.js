import { useTranslations } from 'next-intl';
import Development from '@/assets/icons/development.svg';
import Design from '@/assets/icons/design.svg';
import Marketing from '@/assets/icons/marketing.svg';
import Ba from '@/assets/icons/ba.svg';
import Startup from '@/assets/icons/startup.svg';
import Projects from '@/assets/icons/projects.svg';
import { Link } from '@/i18n/navigation';
import ServicesList from '../ServicesList';
import Title from '../Title';

const OurServicesSection = ({ locale }) => {
  const t = useTranslations('OurServices');
  const SERVICES = [
    {
      id: 'ncRJ8473rB',
      title: t('services.0.title'),
      details: t('services.0.details'),
      icon: Development,
    },
    {
      id: 'i78T9Dze4Y',
      title: t('services.1.title'),
      details: t('services.1.details'),
      icon: Design,
    },
    {
      id: '5r454MvxBN',
      title: t('services.2.title'),
      details: t('services.2.details'),
      icon: Marketing,
    },
    {
      id: 'Kn23X26xjF',
      title: t('services.3.title'),
      details: t('services.3.details'),
      icon: Ba,
    },
    {
      id: '6gYki44FZ7',
      title: t('services.4.title'),
      details: t('services.4.details'),
      icon: Startup,
    },
    {
      id: 'j9HG26uZy5',
      title: t('services.5.title'),
      details: t('services.5.details'),
      icon: Projects,
    },
  ];
  return (
    <>
      {/* <div className="w-[597px] h-[597px] pb-[30px] rounded-br-full bg-[linear-gradient(180deg,_#65B6F3_0%,_#7365F3_100%)] blur-[1000px] absolute left-[828px] z-0" /> */}

      <section className="w-full h-fit relative">
        <div className="w-full px-[15px] md:px-8 xl:px-0 xl:w-[1066px] mx-auto min-h-[603px]">
          <div className="flex items-center justify-between">
            <Title tag={'h2'}>{t('title')}</Title>
            <Link href={'/services'} locale={locale}>
              {t('btn')}
            </Link>
          </div>
          <ServicesList items={SERVICES} />
        </div>
      </section>
    </>
  );
};

export default OurServicesSection;

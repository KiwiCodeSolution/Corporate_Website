import { useTranslations } from 'next-intl';
import DevelopmentIcon from '@/assets/icons/development.svg?url';
import DesignIcon from '@/assets/icons/design.svg?url';
import MarketingIcon from '@/assets/icons/marketing.svg?url';
import BaIcon from '@/assets/icons/ba.svg?url';
import StartupIcon from '@/assets/icons/startup.svg?url';
import ProjectsIcon from '@/assets/icons/projects.svg?url';
import ServicesList from '../ServicesList';
import Title from '../Title';
import LearnMoreLink from '../LearnMoreLink';

export type IService = {
  id: string;
  title: string;
  details: string;
  icon: string;
};

const OurServicesSection = ({ locale }: { locale: 'ua' | 'en' }) => {
  const t = useTranslations('OurServices');
  const SERVICES: IService[] = [
    {
      id: 'ncRJ8473rB',
      title: t('services.0.title'),
      details: t('services.0.details'),
      icon: DevelopmentIcon,
    },
    {
      id: 'i78T9Dze4Y',
      title: t('services.1.title'),
      details: t('services.1.details'),
      icon: DesignIcon,
    },
    {
      id: '5r454MvxBN',
      title: t('services.2.title'),
      details: t('services.2.details'),
      icon: MarketingIcon,
    },
    {
      id: 'Kn23X26xjF',
      title: t('services.3.title'),
      details: t('services.3.details'),
      icon: BaIcon,
    },
    {
      id: '6gYki44FZ7',
      title: t('services.4.title'),
      details: t('services.4.details'),
      icon: StartupIcon,
    },
    {
      id: 'j9HG26uZy5',
      title: t('services.5.title'),
      details: t('services.5.details'),
      icon: ProjectsIcon,
    },
  ];
  return (
    <>
      <div className="w-[597px] h-[597px] pb-[30px] rounded-br-full bg-[linear-gradient(180deg,_#65B6F3_0%,_#7365F3_100%)] blur-[1000px] absolute left-[828px] z-0" />

      <section className="w-full min-h-[603px] relative">
        <div className="wrapper mx-auto">
          <div className="flex items-center justify-between">
            <Title tag={'h2'}>{t('title')}</Title>
            <LearnMoreLink href={'/services'} locale={locale} label={t('btn')} />
          </div>
          <ServicesList items={SERVICES} />
        </div>
      </section>
    </>
  );
};

export default OurServicesSection;

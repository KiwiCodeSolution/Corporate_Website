import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import * as Icons from '@/assets/icons/icons';
import ServicesList from '../ServicesList';
import Title from '../Title';
import LearnMoreLink from '../LearnMoreLink';

export type IService = {
  id: string;
  title: string;
  details: string;
  icon: JSX.Element;
};

const OurServicesSection = ({ locale }: { locale: 'ua' | 'en' }) => {
  const t = useTranslations('OurServices');
  const SERVICES: IService[] = [
    {
      id: 'ncRJ8473rB',
      title: t('services.0.title'),
      details: t('services.0.details'),
      icon: <Icons.DevelopmentIcon />,
    },
    {
      id: 'i78T9Dze4Y',
      title: t('services.1.title'),
      details: t('services.1.details'),
      icon: <Icons.DesignIcon />,
    },
    {
      id: '5r454MvxBN',
      title: t('services.2.title'),
      details: t('services.2.details'),
      icon: <Icons.MarketingIcon />,
    },
    {
      id: 'Kn23X26xjF',
      title: t('services.3.title'),
      details: t('services.3.details'),
      icon: <Icons.BusinessAnalyticsIcon />,
    },
    {
      id: '6gYki44FZ7',
      title: t('services.4.title'),
      details: t('services.4.details'),
      icon: <Icons.StartupIcon />,
    },
    {
      id: 'j9HG26uZy5',
      title: t('services.5.title'),
      details: t('services.5.details'),
      icon: <Icons.ProjectsIcon />,
    },
  ];
  return (
    <section className="w-full min-h-[603px] relative pb-[60px] md:pb-0 mb-16 md:mb-[72px] xl:mb-12">
      <div className="wrapper mx-auto pb-[90px] md:pb-[73px]">
        <div className="mb-10 flex items-center justify-between">
          <Title tag={'h2'}>{t('title')}</Title>
          <LearnMoreLink href={'/services'} locale={locale} label={t('btn')} />
        </div>
        <ServicesList items={SERVICES} />
      </div>
    </section>
  );
};

export default OurServicesSection;

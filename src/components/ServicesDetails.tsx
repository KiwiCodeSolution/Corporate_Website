import { useTranslations } from 'next-intl';
import Image from 'next/image';

import {
  BusinessAnalyticsIcon,
  DesignIcon,
  DevelopmentIcon,
  MarketingIcon,
  StartupIcon,
  ProjectsIcon,
} from '@/assets/icons/icons';
import Title from './Title';

type Service = {
  id: number;
  title: string;
  img: string;
  icon: React.ReactNode;
  description: string;
};

type ServicesDetailsProps = {
  numbers: Service['id'][];
};

const ServicesDetails = ({ numbers }: ServicesDetailsProps) => {
  const t = useTranslations('Services_Page');
  const allServices: Service[] = [
    {
      id: 0,
      title: t('services_details.0.title'),
      img: '/images/services/services_page_dev.png',
      icon: <DevelopmentIcon />,
      description: t('services_details.0.description'),
    },
    {
      id: 1,
      title: t('services_details.1.title'),
      img: '/images/services/services_page_smm.jpg',
      icon: <DesignIcon />,
      description: t('services_details.1.description'),
    },
    {
      id: 2,
      title: t('services_details.2.title'),
      img: '/images/services/services_page_marketing.jpg',
      icon: <MarketingIcon />,
      description: t('services_details.2.description'),
    },
    {
      id: 3,
      title: t('services_details.3.title'),
      img: '/images/services/services_page_business.jpg',
      icon: <BusinessAnalyticsIcon />,
      description: t('services_details.3.description'),
    },
    {
      id: 4,
      title: t('services_details.4.title'),
      img: '/images/services/services_page_startup.jpg',
      icon: <StartupIcon />,
      description: t('services_details.4.description'),
    },
    {
      id: 5,
      title: t('services_details.5.title'),
      img: '/images/services/services_page_projects.jpg',
      icon: <ProjectsIcon />,
      description: t('services_details.5.description'),
    },
  ];

  const selectedServices = allServices.filter((service) => numbers.includes(service.id));
  return (
    <section className="w-full">
      <ul className="flex flex-col gap-y-20 wrapper mx-auto">
        {selectedServices.map((service) => (
          <li
            key={service.id}
            className={`flex gap-x-20 items-start ${service.id % 2 !== 0 ? 'flex-row-reverse' : ''}`}
          >
            <div className="services-page__img-container relative shrink-0">
              <Image
                src={service.img}
                alt={service.title}
                width={492}
                height={492}
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 94, 120, 0.2) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(42, 0, 120, 0.2) 100%)
      `,
                }}
              />
            </div>
            <div>
              <Title tag="h2">{service.title}</Title>
              <p className="mt-8 text-2xl font-medium leading-[1.3] text-dark dark:text-main-text">
                <span className="inline-block bg-linear-to-b from-[#5BD187] to-blue leading-[0.85] bg-clip-text text-transparent">
                  KiWiCode Solutions
                </span>
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesDetails;

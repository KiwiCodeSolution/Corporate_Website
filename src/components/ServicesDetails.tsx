'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import '@/styles/portfolio.css';

import { useEffect, useState } from 'react';
import {
  BusinessAnalyticsIcon,
  DesignIcon,
  DevelopmentIcon,
  MarketingIcon,
  StartupIcon,
  ProjectsIcon,
} from '@/assets/icons/icons';
import useWindowWidth from '@/hooks/useWindowWidth';
import Title from './Title';

type Service = {
  id: number;
  title: string;
  img: string;
  icon: (size: number) => React.ReactNode;
  description: string;
  styles?: string;
};

type ServicesDetailsProps = {
  numbers: Service['id'][];
};

const ServicesDetails = ({ numbers }: ServicesDetailsProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const t = useTranslations('Services_Page');
  const width = useWindowWidth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // Calculate iconSize as a variable, not inside useEffect
  const iconSize = width <= 1024 ? 44 : 64;

  const allServices: Service[] = [
    {
      id: 0,
      title: t('services_details.0.title'),
      img: '/images/services/services_page_dev_1.jpg',
      icon: (size) => <DevelopmentIcon width={size} height={size} />,
      description: t('services_details.0.description'),
    },
    {
      id: 1,
      title: t('services_details.1.title'),
      img: '/images/services/services_page_smm.jpg',
      icon: (size) => <DesignIcon width={size} height={size} />,
      description: t('services_details.1.description'),
    },
    {
      id: 2,
      title: t('services_details.2.title'),
      img: '/images/services/services_page_marketing.jpg',
      icon: (size) => <MarketingIcon width={size} height={size} />,
      description: t('services_details.2.description'),
    },
    {
      id: 3,
      title: t('services_details.3.title'),
      img: '/images/services/services_page_business.jpg',
      icon: (size) => <BusinessAnalyticsIcon width={size} height={size} />,
      description: t('services_details.3.description'),
    },
    {
      id: 4,
      title: t('services_details.4.title'),
      img: '/images/services/services_page_startup.jpg',
      icon: (size) => <StartupIcon width={size} height={size} />,
      description: t('services_details.4.description'),
    },
    {
      id: 5,
      title: t('services_details.5.title'),
      img: '/images/services/services_page_projects.jpg',
      icon: (size) => <ProjectsIcon width={size} height={size} />,
      description: t('services_details.5.description'),
    },
  ];

  const selectedServices = allServices.filter((service) => numbers.includes(service.id));

  return (
    <section className="w-full">
      <ul className="flex flex-col gap-y-16 xl:gap-y-20 wrapper mx-auto">
        {selectedServices.map((service) => {
          const isReverse = service.id % 2 !== 0;

          return (
            <li
              key={service.id}
              className={`flex gap-x-6 xl:gap-x-20 items-start ${isReverse ? 'flex-row-reverse' : ''}`}
            >
              {/* Зображення з fade-in */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative w-full md:w-[340px] md:h-[340px] xl:w-[492px] h-[258px] xl:h-[492px] shrink-0"
              >
                <div
                  className={`overflow-hidden services-page_image-with-svg-mask w-full h-full ${isReverse ? 'services-page_image-with-svg-mask-direct' : 'services-page_image-with-svg-mask-reverse'}`}
                  style={{
                    backgroundImage: `url(${service.img})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <div
                  className={`absolute inset-0 pointer-events-none services-page_image-with-svg-mask ${isReverse ? 'services-page_image-with-svg-mask-direct' : 'services-page_image-with-svg-mask-reverse'}`}
                  style={{
                    background: `
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 94, 120, 0.2) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(42, 0, 120, 0.2) 100%)
      `,
                  }}
                />
                <div
                  className={`w-[44px] h-[44px] xl:w-16 xl:h-16 link-wrapper flex items-end justify-end absolute top-0 z-[3] ${isReverse ? 'left-0' : 'right-0'}`}
                >
                  {service.icon(iconSize)}
                </div>
              </motion.div>

              {/* Текст з fade-in */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              >
                <Title tag="h2">{service.title}</Title>
                <p className="mt-6 xl:mt-8 text-base xl:text-2xl font-semibold xl:font-medium leading-[1.3] text-dark dark:text-main-text">
                  <span className="inline-block bg-linear-to-b from-[#5BD187] to-blue leading-[0.85] bg-clip-text text-transparent md:font-bold xl:font-semibold">
                    KiWiCode Solutions
                  </span>
                  {service.description}
                </p>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ServicesDetails;

'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Arrow } from '@/assets/icons/icons';
import { BASEURLFORIMAGE } from '@/configs/API';
import { PortfolioItem } from './PortfolioCard';
import ServicePoint from './ServicePoint';
import Title from './Title';
import IconLink from './ui/links/IconLink';

import '@/styles/portfolio.css';

type PortfolioCasePreviewProps = {
  item: PortfolioItem;
  locale: 'ua' | 'en';
  index: number;
};

type Messages = {
  technologies: {
    [key: string]: string;
  };
};

const PortfolioCasePreview = ({ item, locale, index }: PortfolioCasePreviewProps) => {
  const [messages, setMessages] = useState<Messages | null>(null);
  const titleByLocale = locale === 'ua' ? item.title : item.title_en;
  const descriptionByLocale = locale === 'ua' ? item.description : item.description_en;

  useEffect(() => {
    fetch(`/locales/${locale}.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [locale]);

  if (!messages) return null;

  const imgUrl = `${BASEURLFORIMAGE}${item.image}` || '/images/not-found.png';

  return (
    <article
      className={clsx(
        'w-full min-h-[530px] md:min-h-[555px] xl:min-h-[634px] flex flex-col gap-y-6 xl:gap-y-8 group case',
        index % 2 === 1 && 'md:mt-[120px] xl:mt-[200px]' // для непарних
      )}
    >
      <div className="relative w-full xl:w-[512px] h-[258px] xl:h-[400px]">
        <div
          className={`overflow-hidden card-image-with-svg-mask w-full h-full`}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="w-14 h-14 xl:w-16 xl:h-16 link-wrapper flex items-end justify-end absolute bottom-0 right-0 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-500 ease-out transform z-[3]">
          <IconLink
            size="m"
            className=""
            icon={Arrow}
            iconProps={{ s: false, base: true }}
            locale={locale}
            href={`${locale}/portfolio/${item.slug}`}
          />
        </div>
      </div>
      <ul className="flex flex-wrap items-center gap-4">
        {item.type.map((el) => (
          <ServicePoint key={item.title + el} label={messages.technologies[el] || el} />
        ))}
      </ul>
      <div className="flex flex-col gap-y-2">
        <Title tag="h3" styles="font-semibold">
          {titleByLocale}
        </Title>
        <p>{descriptionByLocale}</p>
      </div>
    </article>
  );
};

export default PortfolioCasePreview;

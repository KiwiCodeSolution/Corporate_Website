'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Arrow } from '@/assets/icons/icons';
import { PortfolioItem } from './PortfolioCard';
import ServicePoint from './ServicePoint';
import Title from './Title';
import IconLink from './ui/links/IconLink';
import '../styles/portfolio.css';

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

  return (
    <article
      className={clsx(
        'w-full min-h-[634px] flex flex-col gap-y-8 group',
        index % 2 === 1 && 'mt-[200px]' // для непарних
      )}
    >
      <div className="relative">
        <div className="w-full rounded-[40px] overflow-hidden h-[400px]">
          <Image
            src={item.image || '/images/not-found.png'}
            alt={`Image for ${item.title}`}
            width={512}
            height={400}
            className="object-cover w-[512px] h-[400px] "
          />
        </div>
        <div className="link w-16 h-16 link-wrapper bg-bgColor flex items-end justify-end absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform">
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

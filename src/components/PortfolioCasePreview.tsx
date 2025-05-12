'use client';

import Image from 'next/image';
import { PortfolioItem } from './PortfolioCard';
import ServicePoint from './ServicePoint';
import Title from './Title';
import IconLink from './ui/links/IconLink';
import { Arrow } from '@/assets/icons/icons';
import '../styles/portfolio.css';

type PortfolioCasePreviewProps = {
  item: PortfolioItem;
  locale: 'ua' | 'en';
};

const PortfolioCasePreview = ({ item, locale }: PortfolioCasePreviewProps) => {
  const titleByLocale = locale === 'ua' ? item.title : item.title_en;
  const descriptionByLocale = locale === 'ua' ? item.description : item.description_en;
  return (
    <article className="w-full min-h-[634px] flex flex-col gap-y-8 group">
      <div className="relative">
        <div className="w-full rounded-[40px] overflow-hidden h-[400px] group-hover:rounded-br-[70px]">
          <Image
            src={item.image || '/images/not-found.png'}
            alt={`Image for ${item.title}`}
            width={512}
            height={400}
            className="object-cover w-[512px] h-[400px]"
          />
        </div>
        <div className="link w-16 h-16 rounded-full bg-bgColor flex items-end justify-end opacity-0 group-hover:opacity-100 absolute bottom-[0px] right-[0px]">
          <IconLink
            size="m"
            className="group-hover:shadow-2xl group-hover:shadow-bgColor"
            icon={Arrow}
            iconProps={{ s: false, base: true }}
            locale={locale}
            href={item.slug}
          />
        </div>
      </div>
      <ul className="flex flex-wrap items-center gap-x-4">
        {item.type.map((type) => (
          <ServicePoint key={item.title + type} label={type} />
        ))}
      </ul>
      <div className="flex flex-col gap-y-2">
        <Title tag="h3">{titleByLocale}</Title>
        <p>{descriptionByLocale}</p>
      </div>
    </article>
  );
};

export default PortfolioCasePreview;

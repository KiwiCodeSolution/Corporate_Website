import Image from 'next/image';
import { PortfolioItem } from './PortfolioCard';
import ServicePoint from './ServicePoint';
import Title from './Title';

type PortfolioCasePreviewProps = {
  item: PortfolioItem;
  locale: 'ua' | 'en';
};

const PortfolioCasePreview = ({ item, locale }: PortfolioCasePreviewProps) => {
  const titleByLocale = locale === 'ua' ? item.title : item.title_en;
  const descriptionByLocale = locale === 'ua' ? item.description : item.description_en;
  return (
    <article className="w-full min-h-[634px] flex flex-col gap-y-8">
      <div className="w-full rounded-base overflow-hidden h-[400px]">
        <Image
          src={item.image || '/images/not-found.png'}
          alt={`Image for ${item.title}`}
          width={512}
          height={400}
          className="object-cover w-[512px] h-[400px]"
        />
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

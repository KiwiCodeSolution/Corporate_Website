import Image from 'next/image';
import { format } from 'date-fns';
import LearnMoreAnchorLink from './ui/links/LearnMoreAnchorLink';

export type NewsItem = {
  id: number;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image: string;
  date: string;
  slug: string;
};

export type NewsCardProps = {
  news: NewsItem;
  locale: 'ua' | 'en';
};

const NewsCard = ({ news, locale }: NewsCardProps) => {
  const { title, title_en, description, description_en, image, date, slug } = news;
  const titleByLocale = locale === 'ua' ? title : title_en;
  const descriptionByLocale = locale === 'ua' ? description : description_en;

  const formattedDate = format(new Date(date), 'hh:mm a · MMM dd, yyyy');

  return (
    <article className="flex flex-col h-[501px]">
      <div className="w-full h-[277px] rounded-base overflow-hidden image-wrapper-news mb-6">
        <Image
          src={image}
          alt={`Image for ${titleByLocale}`}
          width={328}
          height={270}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-2 mb-4">
        <h2 className="text-lg font-semibold leading-[1.4] tracking-[-2%] line-clamp-2">
          {titleByLocale}
        </h2>
        <p className="text-base font-medium text-main-grey leading-[1.35] tracking-[-3%]">
          {formattedDate}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-base font-medium leading-[1.35] tracking-[-3%] line-clamp-3">
          {descriptionByLocale}
        </p>
        <LearnMoreAnchorLink href={`/news/${slug}`} locale={locale} className="w-fit" />
      </div>
    </article>
  );
};

export default NewsCard;

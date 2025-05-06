import { format } from 'date-fns';
import LearnMoreAnchorLink from './ui/links/LearnMoreAnchorLink';
import NewsCardImgBlock from './NewsCardImgBlock';

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
  section: 'card' | 'modal' | 'page';
};

const NewsCard = ({ news, locale, section }: NewsCardProps) => {
  const { title, title_en, description, description_en, image, date, slug } = news;
  const titleByLocale = locale === 'ua' ? title : title_en;
  const descriptionByLocale = locale === 'ua' ? description : description_en;

  const formattedDate = format(new Date(date), 'hh:mm a · MMM dd, yyyy');

  return section === 'card' ? (
    <article className="w-full md:w-[340px] xl:w-[328px] flex flex-col h-[493px] md:h-[501px] mx-auto box-border">
      <NewsCardImgBlock image={image} title={titleByLocale} />

      <div className="flex flex-col gap-y-2 mb-4">
        <h2 className="text-lg font-semibold leading-[1.4] tracking-[-2%] line-clamp-2 min-h-[50px]">
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
  ) : (
    <article className="w-full md:w-[340px] xl:w-full mx-auto">
      <h2 className="text-xl font-semibold leading-[1.4] mb-10 text-center">{titleByLocale}</h2>
      <div className="w-full flex flex-col xl:flex-row gap-x-10">
        <div className="flex flex-col">
          <NewsCardImgBlock
            image={image}
            title={titleByLocale}
            className="float-left mr-4 mb-2 w-[340px]"
          />
        </div>
        <div className=" flex flex-col gap-y-5 text-left">
          <p className="text-lg font-medium text-main-grey leading-[1.35]">{formattedDate}</p>
          <p className="text-lg font-medium leading-[1.35]">{descriptionByLocale}</p>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;

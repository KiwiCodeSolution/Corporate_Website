import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { TitleFooter } from './Footer';
import FAQModalFooter from './FAQModalFooter';

type PointType = 'link' | 'modal' | 'download';

interface IPoint {
  id: string;
  label: string;
  link: string;
  type: PointType;
}

const UsefulLinks = ({ locale }: { locale: 'ua' | 'en' }) => {
  const t = useTranslations('Footer');

  const USEFULLINKS: IPoint[] = [
    { id: '1125455', label: t('useful_links.0'), link: '/terms', type: 'link' },
    { id: '8565478', label: t('useful_links.1'), link: '/privacy', type: 'link' },
    { id: '6635987', label: t('useful_links.2'), link: '/faq', type: 'modal' },
    { id: '0245876', label: t('useful_links.3'), link: '/files/integration.pdf', type: 'download' },
  ];

  return (
    <div className={`w-[197px] md:w-[188px] xl:w-[192px] flex flex-col gap-y-6`}>
      <TitleFooter text={t('useful_links_title')} />

      <div className="flex flex-col gap-y-3">
        {USEFULLINKS.map((el) => {
          const commonContent = (
            <p className="relative text-main after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100 text-lg font-medium leading-[1.4] cursor-pointer tracking-normal">
              {el.label}
            </p>
          );

          return (
            <div className="relative group w-fit" key={el.id}>
              {(() => {
                switch (el.type) {
                  case 'link':
                    return (
                      <Link href={el.link} locale={locale}>
                        {commonContent}
                      </Link>
                    );
                  case 'modal':
                    return <FAQModalFooter commonContent={commonContent} />;
                  case 'download':
                    return (
                      <a href={el.link} download className="focus:outline-none">
                        {commonContent}
                      </a>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsefulLinks;

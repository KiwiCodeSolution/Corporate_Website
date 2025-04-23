import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IPoint } from './Footer';

const UsefulLinks = ({ locale }: { locale: string }) => {
  const t = useTranslations('Footer');

  const USEFULLINKS: IPoint[] = [
    { id: '1125455', label: t('useful_links.0'), link: '/terms' },
    { id: '8565478', label: t('useful_links.1'), link: '/privacy' },
    { id: '6635987', label: t('useful_links.2'), link: '/faq' },
    { id: '0245876', label: t('useful_links.3'), link: '/integration' },
  ];
  return (
    <div className={`w-[188px] xl:w-[192px] flex flex-col gap-y-6`}>
      <h3 className="text-sm font-medium leading-[1.2] uppercase">{t('useful_links_title')}</h3>
      <div className="flex flex-col gap-y-3">
        {USEFULLINKS.map((el) => (
          <Link href={el.link} locale={locale} key={el.label}>
            <div className="relative group w-fit">
              <p className="relative text-main after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                {el.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;

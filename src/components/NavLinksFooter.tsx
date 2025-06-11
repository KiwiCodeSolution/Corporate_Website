import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CommonContent, TitleFooter } from './Footer';
import { navItems } from './Nav';

const NavLinksFooter = ({ locale }: { locale: 'ua' | 'en' }) => {
  const t = useTranslations('');

  return (
    <div className={`w-[140px] md:w-[128px] xl:w-[140px] flex flex-col gap-y-6`}>
      <TitleFooter text={t('Footer.nav_links_title')} />

      <div className="flex flex-col gap-y-3">
        {navItems.map((el) => (
          <div className="relative group w-fit " key={el.label}>
            <Link href={el.href} locale={locale}>
              <CommonContent text={t(`Nav.${el.label}`)} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLinksFooter;

import clsx from 'clsx';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AppLocale } from '@/i18n/routing';

const Logo = ({
  locale,
  className,
  section,
}: {
  locale: AppLocale;
  className: string;
  section?: string;
}) => {
  const sizeClass =
    section === 'header' ? 'w-[117px] h-[48px] xl:w-[132px] xl:h-[54px]' : 'w-[132px] h-[54px]';

  return (
    <Link href={'/'} locale={locale} className={`${className}`}>
      {/* both variants are in the HTML; CSS picks one, so there is no theme flash or empty slot */}
      <Image
        src="/images/Logo_light.svg"
        alt="KiWiCode Solutions"
        width={132}
        height={54}
        className={clsx(sizeClass, 'dark:hidden')}
      />
      <Image
        src="/images/Logo_dark.svg"
        alt="KiWiCode Solutions"
        width={132}
        height={54}
        className={clsx(sizeClass, 'hidden dark:block')}
      />
    </Link>
  );
};

export default Logo;

'use client';

import clsx from 'clsx';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/assets/icons/icons';

export type AllCasesLinkProps = {
  href: string;
  locale: 'ua' | 'en';
  className?: string;
  section: 'news' | 'portfolio';
};

export default function AllCasesLink({ href, locale, className = '', section }: AllCasesLinkProps) {
  const t = useTranslations('links');

  const text = section === 'news' ? t('allNews') : t('allCases');
  return (
    <Link
      href={href}
      locale={locale}
      className={clsx(
        'h-12 flex items-center gap-3 px-[30px] xl:px-0 rounded-full bg-accent hover:shadow-base base-transition',
        'outline-[2px] outline-offset-[2px] outline-transparent focus-within:outline-blue',
        className
      )}
    >
      <span className="text-[18px] font-semibold text-white leading-[1.2]">{text}</span>
      <Arrow l />
    </Link>
  );
}

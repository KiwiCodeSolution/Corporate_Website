'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Bracket } from '@/assets/icons/icons';

type LearMorePageLinkProps = {
  href: string;
  locale: 'ua' | 'eng';
  className?: string;
};

export default function LearnMorePageLink({ href, locale, className = '' }: LearMorePageLinkProps) {
  const t = useTranslations('links');

  return (
    <Link
      href={href}
      locale={locale}
      className={clsx('group h-9 px-2 flex items-center gap-4', className)}
    >
      <span className="text-[18px] text-main font-medium border-b-[2px] border-b-transparent group-focus:border-b-blue">
        {t('learnMore')}
      </span>
      <Bracket className="group-focus:fill-blue base-transition" />
    </Link>
  );
}

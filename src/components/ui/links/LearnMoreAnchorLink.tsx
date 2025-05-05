'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Arrow } from '@/assets/icons/icons';

type LearnMoreAnchorLinkProps = {
  href: string;
  locale: 'ua' | 'en';
  className?: string;
};

export default function LearnMoreAnchorLink({
  href,
  locale,
  className = '',
}: LearnMoreAnchorLinkProps) {
  const t = useTranslations('links');
  return (
    <Link
      href={href}
      locale={locale}
      // className={clsx('group h-12 px-2 flex items-center gap-4', className)}
      className={clsx('group h-fit flex items-center gap-4', className)}
    >
      <span
        className="text-4 box-content font-medium text-accent border-b-[1px] border-b-transparent base-transition
                    group-hover:border-b-accent  group-focus:border-b-blue"
      >
        {t('learnMore')}
      </span>
      <Arrow
        m={true}
        s={false}
        className="fill-transparent group-hover:fill-accent group-focus:fill-blue base-transition"
      />
    </Link>
  );
}

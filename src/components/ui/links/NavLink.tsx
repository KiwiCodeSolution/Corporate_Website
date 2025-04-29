'use client';

import clsx from 'clsx';
import { Link } from '@/i18n/navigation';

export type NavLinkType = {
  locale: 'ua' | 'en';
  href: string;
  isActive?: boolean;
  children: string;
};

export default function NavLink({ locale, href, isActive = false, children }: NavLinkType) {
  return (
    <Link href={href} locale={locale} className="group flex items-center h-full">
      <span
        className={clsx(
          isActive ? 'border-b-accent text-accent' : 'text-main border-b-transparent',
          'text-[20px] border-b-[2px] base-transition',
          'group-hover:border-b-accent group-focus:border-b-blue'
        )}
      >
        {children}
      </span>
    </Link>
  );
}

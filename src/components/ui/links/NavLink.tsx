'use client';

import clsx from 'clsx';
import { Link } from '@/i18n/navigation';

export type NavLinkType = {
  locale: 'ua' | 'en';
  href: string;
  isActive?: boolean;
  clickFn: () => void;
  children: string;
};

export default function NavLink(props: NavLinkType) {
  const { locale, href, isActive = false, clickFn, children } = props;

  function clickHandler() {
    if (!clickFn) return;
    clickFn();
  }

  return (
    <Link href={href} locale={locale} className="group flex items-center h-full">
      <span
        role="link"
        onClick={clickHandler}
        className={clsx(
          isActive ? 'border-b-accent text-accent' : 'text-main border-b-transparent',
          'text-[20px] leading-[100%] font-normal border-b-[2px] base-transition',
          'group-hover:border-b-accent group-focus:border-b-blue'
        )}
      >
        {children}
      </span>
    </Link>
  );
}

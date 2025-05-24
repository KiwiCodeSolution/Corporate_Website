'use client';

import clsx from 'clsx';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AppLocale } from '@/i18n/routing';
import NavLink from './ui/links/NavLink';

const navItems = [
  { label: 'about', href: '/about' },
  { label: 'services', href: '/services' },
  { label: 'portfolio', href: '/portfolio' },
  { label: 'news', href: 'news' },
];

type NavProps = {
  orientation: 'vertical' | 'horizontal';
  className?: string;
  onNavLinkClick?: () => void;
};

export default function Nav(props: NavProps) {
  const { orientation = 'horizontal', className = '', onNavLinkClick } = props;

  const locale = useLocale() as AppLocale;
  const t = useTranslations('Nav');

  function navLinkclickHandler() {
    if (!onNavLinkClick) return;
    onNavLinkClick();
  }

  const navigationItems = navItems.map(({ label, href }: { label: string; href: string }) => (
    <li key={href}>
      <NavLink locale={locale} href={href} clickFn={navLinkclickHandler}>
        {t(label)}
      </NavLink>
    </li>
  ));

  return (
    <nav className={clsx('h-full', className)}>
      <ul
        className={clsx('h-full flex justify-center items-center gap-4', {
          'flex-row gap-x-10': orientation === 'horizontal',
          'flex-col gap-y-6 items-start': orientation === 'vertical',
        })}
      >
        {navigationItems}
      </ul>
    </nav>
  );
}

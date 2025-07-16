'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

import { useScrollLockV2 } from '@/hooks/useScrollBlockV2';
import { AppLocale } from '@/i18n/routing';
import BurgerMenuButton from './ui/buttons/BurgerMenuButton';
import Logo from './Logo';
import Nav from './Nav';
import BurgerMenu from './BurgerMenu';
import LocaleToggle from './LocaleToggle';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const locale = useLocale() as AppLocale;

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  useScrollLockV2(isBurgerMenuOpen);

  function toggleMenu() {
    setIsBurgerMenuOpen((prevState) => !prevState);
  }

  return (
    <header
      className={`fixed top-0 w-full h-24 z-20 md:h-20 rounded-b-[45px] px-[1px] pb-[1px] base-gradient`}
    >
      <div className="w-full h-full rounded-b-[45px] bg-bgColor">
        <div
          className="w-full h-full rounded-b-[45px] 
                              bg-linear-to-b from-[#E0F5ED] via-[#E7F7F1E5] to-[#FDFEFECC]
                              dark:from-[#15473D] dark:via-[#08100BD9] dark:to-[#08100BB2]"
        >
          <div className="wrapper  relative h-full flex items-center justify-between">
            <div className="w-[117px] xl:w-[132px]">
              <Logo section="header" locale={locale} className="" />
            </div>

            <Nav orientation="horizontal" className="hidden xl:block" />
            {isBurgerMenuOpen && <BurgerMenu onMenuLinkClick={toggleMenu} onClose={toggleMenu} />}
            <div className="h-full flex items-center gap-x-6">
              <LocaleToggle className="sr-only md:not-sr-only" />
              <ThemeToggle />
              <BurgerMenuButton clickFn={toggleMenu} className="xl:hidden" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

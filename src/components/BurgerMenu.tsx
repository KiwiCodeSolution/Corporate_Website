import clsx from 'clsx';

import Nav from './Nav';
import LocaleToggle from './LocaleToggle';
import Portal from './ui/Portal';

type BurgerMenu = {
  className?: string;
  onMenuLinkClick?: () => void;
};

export default function BurgerMenu({ className = '', onMenuLinkClick }: BurgerMenu) {
  function clickMenuLinkHandler() {
    if (!onMenuLinkClick) return;
    onMenuLinkClick();
  }

  return (
    <Portal>
      <div className="fixed z-20 left-0 right-0 top-24 bottom-0 md:top-20 bg-[#000000cc]">
        <div className="wrapper flex flex-row-reverse pt-2">
          <div
            className={clsx(
              'w-[288px] p-[1px] rounded-[20px] base-gradient shadow-[0px_4px_12px_0px_#00000024]',
              className
            )}
          >
            <div className="w-full h-full px-10 py-12 rounded-[20px] bg-bgColor">
              <Nav orientation="vertical" onNavLinkClick={clickMenuLinkHandler} />
              <LocaleToggle className="mt-8 md:hidden" />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

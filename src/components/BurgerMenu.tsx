import clsx from 'clsx';
import { MouseEvent } from 'react';

import Nav from './Nav';
import LocaleToggle from './LocaleToggle';
import Portal from './ui/Portal';
import CloseBurgerMenuButton from './ui/buttons/CloseBurgerMenuButton';

type BurgerMenu = {
  className?: string;
  onMenuLinkClick?: () => void;
  onClose: () => void;
};

export default function BurgerMenu({ className = '', onMenuLinkClick, onClose }: BurgerMenu) {
  function clickMenuLinkHandler() {
    if (!onMenuLinkClick) return;
    onMenuLinkClick();
  }

  function clickOverlayHandler(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!onClose) return;

    onClose();
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-20 bg-[#0C171999]" onClick={clickOverlayHandler}>
        <div className="wrapper flex flex-col items-end gap-2">
          <div className="w-full h-24 md:h-20 flex flex-row-reverse items-center ">
            <CloseBurgerMenuButton clickFn={onClose} />
          </div>
          <div
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
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

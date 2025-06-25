import clsx from 'clsx';
import { ReactNode, useEffect, MouseEvent } from 'react';
import { useScrollLockV2 } from '@/hooks/useScrollBlockV2';
import Portal from './Portal';

type ModalOverlayProps = {
  closeByClickOnOverlay?: boolean; // true if you need it
  closeByPressEsc?: boolean; // true if you need it
  onClose: () => void;
  className?: string;
  children: ReactNode;
};

export default function ModalOverlay(props: ModalOverlayProps) {
  const {
    closeByClickOnOverlay = true,
    closeByPressEsc = true,
    onClose,
    className = '',
    children,
  } = props;

  const [blockScroll, unblockScroll] = useScrollLockV2();

  function OverlayClickHandler(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!closeByClickOnOverlay) {
      return;
    }

    const isClickOnTheOverlay = e.target === e.currentTarget;

    if (isClickOnTheOverlay) {
      onClose();
    }
  }

  useEffect(() => {
    if (!closeByPressEsc) {
      return;
    }

    const onPressEsc = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onPressEsc);

    return () => {
      window.removeEventListener('keydown', onPressEsc);
    };
  }, [closeByPressEsc, onClose]);

  useEffect(() => {
    blockScroll();

    return () => {
      unblockScroll();
    };
  }, [blockScroll, unblockScroll]);

  return (
    <Portal>
      <div
        onClick={OverlayClickHandler}
        className={clsx(
          'fixed inset-0 z-21 backdrop-blur-xs bg-[rgba(0,0,0,0.3)] overflow-scroll',
          'flex justify-center items-center',
          closeByClickOnOverlay && 'cursor-pointer',
          className
        )}
      >
        {children}
      </div>
    </Portal>
  );
}

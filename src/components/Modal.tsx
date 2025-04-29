'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cross } from '@/assets/icons/icons';
import useScrollBlock from '@/hooks/useScrollBlock';

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  type?: 'lets_work' | 'news' | 'portfolio' | 'faq' | 'notification';
  mode?: 'url' | 'local';
};

const Modal = ({ children, isOpen, onClose, type, mode = 'local' }: ModalProps) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const router = useRouter();

  function closeModal() {
    allowScroll();
    if (mode === 'url') {
      router.back();
    } else {
      onClose();
    }
  }

  useEffect(() => {
    setMounted(true);
    setModalRoot(document.getElementById('modal-root'));

    if (isOpen) {
      blockScroll();
      if (mode === 'local') {
        history.pushState({ modal: true }, '');
      }
    } else {
      allowScroll();
    }

    const keyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeModal();
    };

    const handlePopState = () => {
      if (isOpen) closeModal();
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('popstate', handlePopState);
      allowScroll();
    };
  }, [isOpen, blockScroll, allowScroll, mode]);

  if (!mounted || !isOpen || !modalRoot) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className="fixed w-full h-screen top-0 left-0 bg-main/60 flex items-center justify-center z-[19]"
      onClick={handleOverlayClick}
    >
      <div className="flex flex-col min-w-3/5 max-w-4/5 bg-white rounded-base mx-auto relative py-12 px-20">
        <button
          onClick={closeModal}
          className="absolute top-8 right-8 w-[44px] h-[44px] rounded-full bg-accent flex items-center justify-center"
        >
          <Cross />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

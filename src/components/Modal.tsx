'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Cross } from '@/assets/icons/icons';
import useScrollBlock from '@/hooks/useScrollBlock';
import { useRouter } from '@/i18n/navigation';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  type?: 'lets_work' | 'news' | 'portfolio' | 'faq' | 'notification';
};

const Modal = ({ children, isOpen, onClose, type }: ModalProps) => {
  const router = useRouter();
  const [blockScroll, allowScroll] = useScrollBlock();
  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] = useState(null);

  function closeModal() {
    allowScroll();
    onClose();
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      setModalRoot(document.getElementById('modal-root'));
    }

    if (isOpen) {
      blockScroll();
      history.pushState({ modal: true }, '');
    } else {
      allowScroll();
    }

    function keyDown(e) {
      if (e.code === 'Escape') closeModal();
    }

    function handlePopState() {
      if (isOpen) closeModal();
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('popstate', handlePopState);
      allowScroll();
    };
  }, [isOpen, blockScroll, allowScroll, onClose]);

  if (!mounted || !isOpen || !modalRoot) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return typeof window !== 'undefined' && modalRoot
    ? createPortal(
        <div
          className="fixed w-full h-screen top-0 left-0 bg-main/60 flex items-center justify-center z-[19]"
          onClick={handleOverlayClick}
        >
          <div
            className={`flex flex-col min-w-3/5 max-w-4/5 bg-white rounded-base mx-auto relative py-12 px-20`}
          >
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
      )
    : null;
};

export default Modal;

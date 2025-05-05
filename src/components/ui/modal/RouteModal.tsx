'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import useScrollBlock from '@/hooks/useScrollBlock';
import useEscapeClose from '@/hooks/useEscapeClose';
import Overlay from './Overlay';
import ModalWrapper from './ModalWrapper';

export function RouteModal({
  children,
  type = 'baseModal',
}: {
  children: React.ReactNode;
  type?: 'baseModal' | 'notification'; // 'baseModal'  - буде стилізовано як звичайну мадалку великого розміру| 'notification' - для сповіщень, маленька мадалка
}) {
  const router = useRouter();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, [blockScroll, allowScroll]);

  const closeModal = useCallback(() => {
    allowScroll();
    router.back();
  }, [allowScroll, router]);

  useEscapeClose(closeModal);

  return (
    <Overlay closeModal={closeModal}>
      <ModalWrapper closeModal={closeModal} type={type}>
        {children}
      </ModalWrapper>
    </Overlay>
  );
}
